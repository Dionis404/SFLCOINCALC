# План реализации интернационализации (i18n)

## Цель
Добавить поддержку двух языков (русский и английский) с возможностью переключения в интерфейсе.

---

## Архитектура решения

### Структура файлов (после реализации)
```
SFLCOINCALC/
├── index.html
├── script.js
├── i18n.js              # НОВЫЙ: Система переводов
├── translations.js      # НОВЫЙ: Словари переводов
└── ...
```

### Принцип работы

1. **Словари переводов** (`translations.js`):
   - Объект с ключами языков (ru, en)
   - Вложенные объекты для группировки переводов
   - Все тексты из HTML и JS

2. **i18n система** (`i18n.js`):
   - Функция получения перевода по ключу
   - Функция смены языка
   - Функция обновления DOM
   - Работа с localStorage

3. **Интеграция**:
   - HTML: data-атрибуты для переводимых элементов
   - JS: использование функции перевода вместо хардкода
   - UI: переключатель языка

---

## Этап 1: Инвентаризация текстов

### Тексты в HTML (index.html)

**Заголовки:**
- "Калькулятор стоимости добычи ресурсов SFL"

**Форма:**
- "Farm ID:"
- "Введите ID фермы" (placeholder)
- "Навыки" (заголовок группы)
- "Навык топора"
- "Навык кирки"
- "Бесплатные семена"
- "NFT Предметы" (заголовок группы)
- "NFT для дерева (бесплатная добыча)"
- "NFT для камня (бесплатная добыча)"
- "Рассчитать" (кнопка)

**Результаты:**
- "Стоимость выращивания 1 единицы урожая в монетах (Coins):"
- "Урожай"
- "Мин. урожай"
- "Сред. урожай"
- "Стоимость добычи 1 единицы каждого ресурса в монетах(Coins):"
- "Ресурс"
- "Мин. значение добычи"
- "Сред. значение добычи"
- "Себестоимость инструментов:"
- "Инструмент"
- "Стоимость (монет)"

### Тексты в JS (script.js)

**Названия ресурсов (resourceNames):**
- wood: 'Дерево' → 'Wood'
- stone: 'Камень' → 'Stone'
- iron: 'Железо' → 'Iron'
- gold: 'Золото' → 'Gold'
- crimstone: 'Кримстоун' → 'Crimstone'
- oil: 'Нефть' → 'Oil'

**Названия урожая (cropNames):**
- sunflower: 'Подсолнечник' → 'Sunflower'
- potato: 'Картофель' → 'Potato'
- rhubarb: 'Ревень' → 'Rhubarb'
- pumpkin: 'Тыква' → 'Pumpkin'
- zucchini: 'Цуккини' → 'Zucchini'
- carrot: 'Морковь' → 'Carrot'
- yam: 'Ямс' → 'Yam'
- cabbage: 'Капуста' → 'Cabbage'
- broccoli: 'Брокколи' → 'Broccoli'
- soybean: 'Соя' → 'Soybean'
- beetroot: 'Свекла' → 'Beetroot'
- pepper: 'Перец' → 'Pepper'
- cauliflower: 'Цветная капуста' → 'Cauliflower'
- parsnip: 'Пастернак' → 'Parsnip'
- eggplant: 'Баклажан' → 'Eggplant'
- corn: 'Кукуруза' → 'Corn'
- onion: 'Лук' → 'Onion'
- radish: 'Редис' → 'Radish'
- wheat: 'Пшеница' → 'Wheat'
- turnip: 'Репа' → 'Turnip'
- kale: 'Кале' → 'Kale'
- artichoke: 'Артишок' → 'Artichoke'
- barley: 'Ячмень' → 'Barley'

**Названия инструментов (toolNames):**
- axe: 'Топор' → 'Axe'
- pickaxe: 'Кирка' → 'Pickaxe'
- stone_pickaxe: 'Каменная кирка' → 'Stone Pickaxe'
- iron_pickaxe: 'Железная кирка' → 'Iron Pickaxe'
- gold_pickaxe: 'Золотая кирка' → 'Gold Pickaxe'
- oil_drill: 'Бур для нефти' → 'Oil Drill'
- fishing_rod: 'Удочка' → 'Fishing Rod'
- sand_shovel: 'Лопата для песка' → 'Sand Shovel'
- sand_drill: 'Бур для песка' → 'Sand Drill'

**Сообщения об ошибках:**
- "Введите Farm ID" → "Enter Farm ID"
- "Ошибка при получении данных из API" → "Error fetching data from API"

---

## Этап 2: Создание структуры переводов

### Файл: translations.js

```javascript
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
      barley: 'Ячмень'
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
      apiError: 'Ошибка при получении данных из API'
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
      barley: 'Barley'
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
      apiError: 'Error fetching data from API'
    }
  }
};
```

---

## Этап 3: Создание i18n системы

### Файл: i18n.js

```javascript
// i18n система
const i18n = {
  currentLanguage: 'ru',
  
  // Инициализация
  init() {
    // Загрузить язык из localStorage или использовать браузерный
    const savedLang = localStorage.getItem('sfl-calc-language');
    const browserLang = navigator.language.split('-')[0];
    
    if (savedLang && translations[savedLang]) {
      this.currentLanguage = savedLang;
    } else if (translations[browserLang]) {
      this.currentLanguage = browserLang;
    }
    
    this.updateDOM();
    this.updateLanguageSwitcher();
  },
  
  // Получить перевод по ключу
  t(key) {
    const keys = key.split('.');
    let value = translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        console.warn(`Translation missing for key: ${key}`);
        return key;
      }
    }
    
    return value;
  },
  
  // Сменить язык
  setLanguage(lang) {
    if (translations[lang]) {
      this.currentLanguage = lang;
      localStorage.setItem('sfl-calc-language', lang);
      this.updateDOM();
      this.updateLanguageSwitcher();
    }
  },
  
  // Обновить DOM
  updateDOM() {
    // Обновить элементы с data-i18n атрибутом
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      element.textContent = this.t(key);
    });
    
    // Обновить placeholder'ы
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      element.placeholder = this.t(key);
    });
    
    // Обновить HTML атрибут lang
    document.documentElement.lang = this.currentLanguage;
  },
  
  // Обновить переключатель языка
  updateLanguageSwitcher() {
    document.querySelectorAll('.lang-btn').forEach(btn => {
      if (btn.dataset.lang === this.currentLanguage) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }
};
```

---

## Этап 4: Модификация HTML

### Изменения в index.html

1. **Добавить подключение новых скриптов** (в `<head>` или перед `</body>`):
```html
<script src="translations.js"></script>
<script src="i18n.js"></script>
<script src="script.js"></script>
```

2. **Добавить переключатель языка** (после `<h1>`):
```html
<div class="language-switcher">
  <button class="lang-btn" data-lang="ru" onclick="i18n.setLanguage('ru')">RU</button>
  <button class="lang-btn" data-lang="en" onclick="i18n.setLanguage('en')">EN</button>
</div>
```

3. **Добавить data-i18n атрибуты** ко всем текстовым элементам:
```html
<h1 data-i18n="title">Калькулятор стоимости добычи ресурсов SFL</h1>

<label for="farmId" data-i18n="form.farmIdLabel">Farm ID:</label>
<input type="text" id="farmId" data-i18n-placeholder="form.farmIdPlaceholder" required>

<h3 data-i18n="form.skillsTitle">Навыки</h3>
<label for="axeSkill" class="skill-label" data-i18n="form.axeSkill">Навык топора</label>
<!-- и т.д. для всех элементов -->
```

4. **Добавить инициализацию** в конце `<body>`:
```html
<script>
  // Инициализировать i18n при загрузке страницы
  document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
  });
</script>
```

---

## Этап 5: Модификация JavaScript

### Изменения в script.js

1. **Заменить хардкод названий на функции перевода**:

```javascript
// БЫЛО:
const resourceNames = {
  wood: 'Дерево',
  stone: 'Камень',
  // ...
};

// СТАЛО:
function getResourceName(resource) {
  return i18n.t(`resources.${resource}`);
}
```

2. **Обновить функцию handleCalculate**:

```javascript
// Заменить все хардкод тексты на:
resultHTML += `<h2 data-i18n="results.cropCostTitle">${i18n.t('results.cropCostTitle')}</h2>`;
resultHTML += `<th data-i18n="results.cropHeader">${i18n.t('results.cropHeader')}</th>`;
// и т.д.
```

3. **Обновить сообщения об ошибках**:

```javascript
// БЫЛО:
resultDiv.textContent = 'Введите Farm ID';

// СТАЛО:
resultDiv.textContent = i18n.t('messages.enterFarmId');
```

---

## Этап 6: Стилизация переключателя языка

### Добавить в CSS (или в отдельный файл):

```css
.language-switcher {
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 10px;
}

.lang-btn {
  padding: 8px 16px;
  background: white;
  border: 2px solid #e4a672;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  color: #333;
  transition: all 0.3s;
  min-width: 50px;
  min-height: auto;
  background-image: none;
}

.lang-btn:hover {
  background-color: #f4e4bc;
  opacity: 1;
}

.lang-btn.active {
  background-color: #e4a672;
  color: white;
}
```

---

## Этап 7: Тестирование

### Чек-лист тестирования:

- [ ] Переключение языка работает
- [ ] Язык сохраняется в localStorage
- [ ] При перезагрузке страницы язык восстанавливается
- [ ] Все тексты в форме переведены
- [ ] Все тексты в результатах переведены
- [ ] Названия ресурсов переведены
- [ ] Названия урожая переведены
- [ ] Названия инструментов переведены
- [ ] Сообщения об ошибках переведены
- [ ] Placeholder'ы переведены
- [ ] Переключатель языка визуально корректен
- [ ] Активный язык подсвечивается
- [ ] Нет console.warn о недостающих переводах

---

## Порядок реализации (пошаговый)

### Шаг 1: Создать translations.js
- Создать файл с полной структурой переводов
- Проверить все ключи

### Шаг 2: Создать i18n.js
- Реализовать систему переводов
- Добавить функции init, t, setLanguage, updateDOM

### Шаг 3: Модифицировать index.html
- Подключить новые скрипты
- Добавить data-i18n атрибуты
- Добавить переключатель языка
- Добавить инициализацию

### Шаг 4: Модифицировать script.js
- Заменить все хардкод тексты на i18n.t()
- Обновить функции генерации HTML
- Обновить сообщения об ошибках

### Шаг 5: Добавить стили
- Стилизовать переключатель языка
- Проверить адаптивность

### Шаг 6: Тестирование
- Проверить все сценарии
- Исправить баги

---

## Потенциальные проблемы и решения

### Проблема 1: Динамически генерируемый HTML
**Решение**: Использовать `i18n.t()` при генерации HTML строк

### Проблема 2: Обновление таблиц после смены языка
**Решение**: Пересчитать и перерисовать результаты при смене языка

### Проблема 3: Длинные тексты на разных языках
**Решение**: Использовать CSS для адаптивной ширины элементов

### Проблема 4: Отсутствие перевода для нового текста
**Решение**: Система выводит warning в консоль и показывает ключ

---

## Расширение в будущем

### Возможные улучшения:

1. **Больше языков**: Добавить испанский, китайский и т.д.
2. **Форматирование чисел**: Локализация формата чисел (запятая vs точка)
3. **Форматирование дат**: Если будут добавлены даты
4. **Плюрализация**: Правильные формы множественного числа
5. **RTL поддержка**: Для арабского и иврита
6. **Lazy loading**: Загрузка переводов по требованию

---

## Итоговая оценка работы

**Сложность**: Средняя
**Файлов для создания**: 2 (translations.js, i18n.js)
**Файлов для модификации**: 2 (index.html, script.js)
**Строк кода**: ~400-500 строк

**Результат**: Полностью функциональная система i18n с поддержкой русского и английского языков.
