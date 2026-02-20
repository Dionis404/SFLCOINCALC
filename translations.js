// Словари переводов для калькулятора SFL
const translations = {
  ru: {
    // Заголовки
    title: 'Калькулятор стоимости добычи ресурсов SFL',
    
    // Форма
    form: {
      farmIdLabel: 'Farm ID:',
      farmIdPlaceholder: 'Введите ID фермы',
      skillsTitle: 'Навыки',
      axeSkill: 'Навык топора',
      pickaxeSkill: 'Навык кирки',
      freeSeeds: 'Бесплатные семена',
      nftTitle: 'NFT Предметы',
      woodNFT: 'NFT для дерева (бесплатная добыча)',
      stoneNFT: 'NFT для камня (бесплатная добыча)',
      calculateButton: 'Рассчитать'
    },
    
    // Результаты
    results: {
      cropCostTitle: 'Стоимость выращивания 1 единицы урожая в монетах (Coins):',
      cropHeader: 'Урожай',
      minYield: 'Мин. урожай',
      avgYield: 'Сред. урожай',
      resourceCostTitle: 'Стоимость добычи 1 единицы каждого ресурса в монетах(Coins):',
      resourceHeader: 'Ресурс',
      minDrop: 'Мин. значение добычи',
      avgDrop: 'Сред. значение добычи',
      toolCostTitle: 'Себестоимость инструментов:',
      toolHeader: 'Инструмент',
      costHeader: 'Стоимость (монет)'
    },
    
    // Ресурсы
    resources: {
      wood: 'Дерево',
      stone: 'Камень',
      iron: 'Железо',
      gold: 'Золото',
      crimstone: 'Кримстоун',
      oil: 'Нефть'
    },
    
    // Урожай
    crops: {
      sunflower: 'Подсолнечник',
      potato: 'Картофель',
      rhubarb: 'Ревень',
      pumpkin: 'Тыква',
      zucchini: 'Цуккини',
      carrot: 'Морковь',
      yam: 'Ямс',
      cabbage: 'Капуста',
      broccoli: 'Брокколи',
      soybean: 'Соя',
      beetroot: 'Свекла',
      pepper: 'Перец',
      cauliflower: 'Цветная капуста',
      parsnip: 'Пастернак',
      eggplant: 'Баклажан',
      corn: 'Кукуруза',
      onion: 'Лук',
      radish: 'Редис',
      wheat: 'Пшеница',
      turnip: 'Репа',
      kale: 'Кале',
      artichoke: 'Артишок',
      barley: 'Ячмень',
      rice: 'Рис',
      olive: 'Олива'
    },
    
    // Инструменты
    tools: {
      axe: 'Топор',
      pickaxe: 'Кирка',
      stone_pickaxe: 'Каменная кирка',
      iron_pickaxe: 'Железная кирка',
      gold_pickaxe: 'Золотая кирка',
      oil_drill: 'Бур для нефти',
      fishing_rod: 'Удочка',
      sand_shovel: 'Лопата для песка',
      sand_drill: 'Бур для песка'
    },
    
    // Сообщения
    messages: {
      enterFarmId: 'Введите Farm ID',
      apiError: 'Ошибка при получении данных из API',
      loading: 'Загрузка данных...'
    }
  },
  
  en: {
    // Headers
    title: 'SFL Resource Mining Cost Calculator',
    
    // Form
    form: {
      farmIdLabel: 'Farm ID:',
      farmIdPlaceholder: 'Enter Farm ID',
      skillsTitle: 'Skills',
      axeSkill: 'Axe Skill',
      pickaxeSkill: 'Pickaxe Skill',
      freeSeeds: 'Free Seeds',
      nftTitle: 'NFT Items',
      woodNFT: 'Wood NFT (free mining)',
      stoneNFT: 'Stone NFT (free mining)',
      calculateButton: 'Calculate'
    },
    
    // Results
    results: {
      cropCostTitle: 'Cost to grow 1 unit of crop in Coins:',
      cropHeader: 'Crop',
      minYield: 'Min. Yield',
      avgYield: 'Avg. Yield',
      resourceCostTitle: 'Cost to mine 1 unit of each resource in Coins:',
      resourceHeader: 'Resource',
      minDrop: 'Min. Drop',
      avgDrop: 'Avg. Drop',
      toolCostTitle: 'Tool Costs:',
      toolHeader: 'Tool',
      costHeader: 'Cost (Coins)'
    },
    
    // Resources
    resources: {
      wood: 'Wood',
      stone: 'Stone',
      iron: 'Iron',
      gold: 'Gold',
      crimstone: 'Crimstone',
      oil: 'Oil'
    },
    
    // Crops
    crops: {
      sunflower: 'Sunflower',
      potato: 'Potato',
      rhubarb: 'Rhubarb',
      pumpkin: 'Pumpkin',
      zucchini: 'Zucchini',
      carrot: 'Carrot',
      yam: 'Yam',
      cabbage: 'Cabbage',
      broccoli: 'Broccoli',
      soybean: 'Soybean',
      beetroot: 'Beetroot',
      pepper: 'Pepper',
      cauliflower: 'Cauliflower',
      parsnip: 'Parsnip',
      eggplant: 'Eggplant',
      corn: 'Corn',
      onion: 'Onion',
      radish: 'Radish',
      wheat: 'Wheat',
      turnip: 'Turnip',
      kale: 'Kale',
      artichoke: 'Artichoke',
      barley: 'Barley',
      rice: 'Rice',
      olive: 'Olive'
    },
    
    // Tools
    tools: {
      axe: 'Axe',
      pickaxe: 'Pickaxe',
      stone_pickaxe: 'Stone Pickaxe',
      iron_pickaxe: 'Iron Pickaxe',
      gold_pickaxe: 'Gold Pickaxe',
      oil_drill: 'Oil Drill',
      fishing_rod: 'Fishing Rod',
      sand_shovel: 'Sand Shovel',
      sand_drill: 'Sand Drill'
    },
    
    // Messages
    messages: {
      enterFarmId: 'Enter Farm ID',
      apiError: 'Error fetching data from API',
      loading: 'Loading data...'
    }
  }
};
