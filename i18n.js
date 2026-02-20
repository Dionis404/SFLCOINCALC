// Система интернационализации (i18n)
const i18n = {
  currentLanguage: 'ru',
  
  // Инициализация системы переводов
  init() {
    // Загрузить язык из localStorage или определить по браузеру
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
  
  // Получить перевод по ключу (например: 'form.farmIdLabel')
  t(key) {
    const keys = key.split('.');
    let value = translations[this.currentLanguage];
    
    for (const k of keys) {
      if (value && value[k] !== undefined) {
        value = value[k];
      } else {
        console.warn(`Translation missing for key: ${key} in language: ${this.currentLanguage}`);
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
      
      // Если есть результаты расчетов, перерисовать их
      const resultDiv = document.getElementById('result');
      if (resultDiv && resultDiv.innerHTML && resultDiv.innerHTML.includes('<table>')) {
        // Результаты есть, нужно пересчитать с новым языком
        handleCalculate();
      }
    }
  },
  
  // Обновить все элементы DOM с переводами
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
  
  // Обновить состояние переключателя языка
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
