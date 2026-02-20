// Структура данных для инструментов
const tools = {
  axe: { cost: { coins: 20 }, components: {} },
  pickaxe: { cost: { wood: 3, coins: 20 }, components: { wood: 3 } },
  stone_pickaxe: { cost: { wood: 3, stone: 5, coins: 20 }, components: { wood: 3, stone: 5 } },
  iron_pickaxe: { cost: { wood: 3, iron: 5, coins: 80 }, components: { wood: 3, iron: 5 } },
  gold_pickaxe: { cost: { wood: 3, gold: 3, coins: 100 }, components: { wood: 3, gold: 3 } },
  oil_drill: { cost: { coins: 100 }, components: { wood: 20, iron: 9, leather: 10 } },
  fishing_rod: { cost: { coins: 20 }, components: { wood: 3, stone: 1 } },
  sand_shovel: { cost: { coins: 20 }, components: { wood: 2, stone: 1 } },
  sand_drill: { cost: { coins: 40 }, components: { oil: 1, crimstone: 1, wood: 3, leather: 1 } }
};

// Цены семян
const seedPrices = {
  sunflower: 0.01,
  potato: 0.1,
  rhubarb: 0.15,
  pumpkin: 0.2,
  zucchini: 0.2,
  carrot: 0.5,
  yam: 0.5,
  cabbage: 1,
  broccoli: 1,
  soybean: 1.5,
  beetroot: 2,
  pepper: 2,
  cauliflower: 3,
  parsnip: 5,
  eggplant: 6,
  corn: 7,
  onion: 7,
  radish: 7,
  wheat: 5,
  turnip: 5,
  kale: 7,
  artichoke: 7,
  barley: 10,
  rice: 240,
  olive: 320
};

// Связь ресурсов с инструментами
const resourceToTool = {
  wood: 'axe',
  stone: 'pickaxe',
  iron: 'stone_pickaxe',
  gold: 'iron_pickaxe',
  crimstone: 'gold_pickaxe',
  oil: 'oil_drill'
};

// Список ресурсов
const resources = ['wood', 'stone', 'iron', 'gold', 'crimstone', 'oil'];

// Функции для получения переведенных названий
function getResourceName(resource) {
  return i18n.t(`resources.${resource}`);
}

function getCropName(crop) {
  return i18n.t(`crops.${crop}`);
}

function getToolName(tool) {
  return i18n.t(`tools.${tool}`);
}

// Список урожаев (все культуры из seedPrices)
const crops = Object.keys(seedPrices);

// Кэши для оптимизации
const toolCostCache = {};
const resourceCostCache = {};

// Функция для получения drop rates из API
async function getDropRates(farmId) {
  try {
    const url = `https://cors-anywhere.herokuapp.com/https://sfl.world/api/v1/land/${farmId}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(i18n.t('messages.apiError'));
    const data = await response.json();
    return { crops: data.crops, resources: data.resources };
  } catch (error) {
    // Mock данные для тестирования (реальные для фермы 62559)
    return {
      crops: {
        artichoke: { avg: 3.53151515, max: 23.1, min: 2.3 },
        barley: { avg: 3.53151515, max: 23.1, min: 2.3 },
        beetroot: { avg: 2.03151515, max: 21.6, min: 0.8 },
        broccoli: { avg: 2.03151515, max: 21.6, min: 0.8 },
        cabbage: { avg: 2.28151515, max: 21.85, min: 1.05 },
        carrot: { avg: 2.58751515, max: 24.1, min: 1.14 },
        cauliflower: { avg: 2.03151515, max: 21.6, min: 0.8 },
        corn: { avg: 3.63151515, max: 23.2, min: 2.4 },
        eggplant: { avg: 3.83151515, max: 23.4, min: 2.6 },
        kale: { avg: 3.73151515, max: 23.3, min: 2.5 },
        onion: { avg: 3.53151515, max: 23.1, min: 2.3 },
        parsnip: { avg: 2.03151515, max: 21.6, min: 0.8 },
        pepper: { avg: 2.03151515, max: 21.6, min: 0.8 },
        potato: { avg: 1.78, max: 11.5, min: 0.7 },
        pumpkin: { avg: 2.236, max: 13.9, min: 0.94 },
        radish: { avg: 3.53151515, max: 23.1, min: 2.3 },
        rhubarb: { avg: 1.78, max: 11.5, min: 0.7 },
        soybean: { avg: 2.13151515, max: 21.7, min: 0.9 },
        sunflower: { avg: 2.008, max: 12.7, min: 0.82 },
        turnip: { avg: 3.53151515, max: 23.1, min: 2.3 },
        wheat: { avg: 3.53151515, max: 23.1, min: 2.3 },
        yam: { avg: 2.03151515, max: 21.6, min: 0.8 },
        zucchini: { avg: 1.78, max: 11.5, min: 0.7 }
      },
      resources: {
        wood: { min: 1.3, max: 4.3, avg: 1.7 },
        stone: { min: 1.55, max: 4.65, avg: 1.98478261 },
        iron: { min: 1.65, max: 2.65, avg: 1.85 },
        gold: { min: 1.7, max: 2.7, avg: 1.9 },
        crimstone: { min: 1.1, max: 4.1, avg: 1.7 },
        oil: { min: 10.1, max: 30.1, avg: 16.767 }
      }
    };
  }
}

// Функция для расчета стоимости инструмента (с учетом recursive затрат)
function getToolCost(toolName, dropRates, axeSkill, pickaxeSkill, woodNFT, stoneNFT) {
  if (toolCostCache[toolName]) return toolCostCache[toolName];
  const tool = tools[toolName];
  let cost = tool.cost.coins || 0;
  // Применить навыки
  if (toolName === 'axe' && axeSkill) {
    cost = 16;
  } else if (['pickaxe', 'stone_pickaxe', 'iron_pickaxe', 'gold_pickaxe'].includes(toolName) && pickaxeSkill) {
    cost = 16;
  }
  // Применить NFT
  if (toolName === 'axe' && woodNFT) {
    cost = 0;
  } else if (toolName === 'pickaxe' && stoneNFT) {
    cost = 0;
  } else {
    for (const [res, qty] of Object.entries(tool.components)) {
      cost += qty * getResourceCost(res, dropRates, axeSkill, pickaxeSkill, woodNFT, stoneNFT);
    }
  }
  toolCostCache[toolName] = cost;
  return cost;
}

// Функция для расчета стоимости 1 единицы ресурса
function getResourceCost(resource, dropRates, axeSkill, pickaxeSkill, woodNFT, stoneNFT, dropType) {
  if (resource === 'coins') return 1;
  if (resource === 'leather' || resource === 'wool') return 0;
  if (resourceCostCache[resource]) return resourceCostCache[resource];
  const toolName = resourceToTool[resource];
  const drop = dropRates[resource][dropType];
  let totalCost;
  if (!drop || drop <= 0) {
    const costPerNode = getToolCost(toolName, dropRates, axeSkill, pickaxeSkill, woodNFT, stoneNFT);
    totalCost = costPerNode === 0 ? 0 : Infinity;
  } else {
    const nodes = 1 / drop;
    const costPerNode = getToolCost(toolName, dropRates, axeSkill, pickaxeSkill, woodNFT, stoneNFT);
    totalCost = nodes * costPerNode;
  }
  resourceCostCache[resource] = totalCost;
  return totalCost;
}

// Основная функция расчета стоимости
function calculateCost(resource, quantity, dropRates) {
  const costPerUnit = getResourceCost(resource, dropRates);
  return costPerUnit * quantity;
}

// Функция для расчета стоимости выращивания 1 единицы урожая
function getCropCost(crop, yieldType, cropYields, freeSeeds = false) {
  const seedPrice = freeSeeds ? 0 : seedPrices[crop];
  const yield = cropYields[crop][yieldType];
  if (!yield || yield <= 0) return Infinity;
  return seedPrice / yield;
}

// Функция для обработки формы
async function handleCalculate() {
  const farmId = document.getElementById('farmId').value.trim();
  const axeSkill = document.getElementById('axeSkill').checked;
  const pickaxeSkill = document.getElementById('pickaxeSkill').checked;
  const woodNFT = document.getElementById('woodNFT').checked;
  const stoneNFT = document.getElementById('stoneNFT').checked;
  const freeSeeds = document.getElementById('freeSeeds').checked;
  const resultDiv = document.getElementById('result');

  // Валидация
  if (!farmId) {
    resultDiv.textContent = i18n.t('messages.enterFarmId');
    return;
  }

  try {
    // Очистить кэши для нового расчета
    Object.keys(toolCostCache).forEach(key => delete toolCostCache[key]);
    Object.keys(resourceCostCache).forEach(key => delete resourceCostCache[key]);

    const dropRates = await getDropRates(farmId);
    const cropYields = dropRates.crops;
    const resourceDrops = dropRates.resources;

    // Рассчитать стоимость урожая для min
    const cropCostsMin = {};
    crops.forEach(crop => {
      cropCostsMin[crop] = getCropCost(crop, 'min', cropYields);
    });

    // Рассчитать стоимость урожая для avg
    const cropCostsAvg = {};
    crops.forEach(crop => {
      cropCostsAvg[crop] = getCropCost(crop, 'avg', cropYields);
    });

    // Рассчитать для ресурсов min
    Object.keys(toolCostCache).forEach(key => delete toolCostCache[key]);
    Object.keys(resourceCostCache).forEach(key => delete resourceCostCache[key]);
    const costsMin = {};
    resources.forEach(res => {
      costsMin[res] = getResourceCost(res, resourceDrops, axeSkill, pickaxeSkill, woodNFT, stoneNFT, 'min');
    });

    // Рассчитать для ресурсов avg
    Object.keys(toolCostCache).forEach(key => delete toolCostCache[key]);
    Object.keys(resourceCostCache).forEach(key => delete resourceCostCache[key]);
    const costsAvg = {};
    resources.forEach(res => {
      costsAvg[res] = getResourceCost(res, resourceDrops, axeSkill, pickaxeSkill, woodNFT, stoneNFT, 'avg');
    });

    let resultHTML = '<div class="results-container">';
    resultHTML += '<div class="left-column">';
    resultHTML += `<h2>${i18n.t('results.cropCostTitle')}</h2>`;
    resultHTML += '<table>';
    resultHTML += `<thead><tr><th>${i18n.t('results.cropHeader')}</th><th>${i18n.t('results.minYield')}</th><th>${i18n.t('results.avgYield')}</th></tr></thead>`;
    resultHTML += '<tbody>';
    crops.forEach(crop => {
      const minVal = cropCostsMin[crop] === Infinity ? '∞' : cropCostsMin[crop].toFixed(4);
      const avgVal = cropCostsAvg[crop] === Infinity ? '∞' : cropCostsAvg[crop].toFixed(4);
      const minClass = cropCostsMin[crop] === Infinity ? '' : (cropCostsMin[crop] > seedPrices[crop] ? 'loss' : 'profit');
      const avgClass = cropCostsAvg[crop] === Infinity ? '' : (cropCostsAvg[crop] > seedPrices[crop] ? 'loss' : 'profit');
      resultHTML += `<tr><td>${getCropName(crop)}</td><td class="${minClass}">${minVal}</td><td class="${avgClass}">${avgVal}</td></tr>`;
    });
    resultHTML += '</tbody></table>';
    resultHTML += '</div>';

    resultHTML += '<div class="right-column">';
    resultHTML += `<h2>${i18n.t('results.resourceCostTitle')}</h2>`;
    resultHTML += '<table>';
    resultHTML += `<thead><tr><th>${i18n.t('results.resourceHeader')}</th><th>${i18n.t('results.minDrop')}</th><th>${i18n.t('results.avgDrop')}</th></tr></thead>`;
    resultHTML += '<tbody>';
    resources.forEach(res => {
      const minVal = costsMin[res] === Infinity ? '∞' : costsMin[res].toFixed(2);
      const avgVal = costsAvg[res] === Infinity ? '∞' : costsAvg[res].toFixed(2);
      resultHTML += `<tr><td>${getResourceName(res)}</td><td>${minVal}</td><td>${avgVal}</td></tr>`;
    });
    resultHTML += '</tbody></table>';

    // Рассчитать себестоимость инструментов
    const toolKeys = Object.keys(tools);
    const toolCosts = {};
    toolKeys.forEach(tool => {
      toolCosts[tool] = getToolCost(tool, resourceDrops, axeSkill, pickaxeSkill, woodNFT, stoneNFT);
    });

    resultHTML += `<h2>${i18n.t('results.toolCostTitle')}</h2>`;
    resultHTML += '<table>';
    resultHTML += `<thead><tr><th>${i18n.t('results.toolHeader')}</th><th>${i18n.t('results.costHeader')}</th></tr></thead>`;
    resultHTML += '<tbody>';
    toolKeys.forEach(tool => {
      const costVal = toolCosts[tool] === Infinity ? '∞' : toolCosts[tool].toFixed(2);
      resultHTML += `<tr><td>${getToolName(tool)}</td><td>${costVal}</td></tr>`;
    });
    resultHTML += '</tbody></table>';
    resultHTML += '</div>'; // close right-column
    resultHTML += '</div>'; // close results-container

    resultDiv.innerHTML = resultHTML;
  } catch (error) {
    resultDiv.textContent = error.message;
  }
}