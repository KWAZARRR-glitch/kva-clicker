// Полное игровое состояние
let score = 0;
let clickPower = 1;
let autoClickPower = 0;
let bonusMultiplier = 1;
let totalClicks = 0;
let prestigeLevel = 0;
let prestigeBonus = 1;

// Функция клика - ПРОСТАЯ И РАБОЧАЯ
function handleClick() {
    console.log('Клик обработан!'); // Для отладки
    
    score += clickPower * bonusMultiplier * prestigeBonus;
    totalClicks += 1;
    
    // Обновляем отображение
    updateDisplay();
    
    // Сохраняем игру
    saveGame();
    
    console.log('Очков:', score, 'Сила клика:', clickPower);
}

// Обновление интерфейса - БЕЗОПАСНАЯ ВЕРСИЯ
function updateDisplay() {
    console.log('Обновление интерфейса...'); // Для отладки
    
    // Безопасное обновление - проверяем элементы перед обновлением
    try {
        // Основные элементы
        if (document.getElementById('score')) {
            document.getElementById('score').textContent = score;
        }
        
        if (document.getElementById('totalClicks')) {
            document.getElementById('totalClicks').textContent = totalClicks;
        }
        
        if (document.getElementById('clickBonus')) {
            document.getElementById('clickBonus').textContent = '+' + (clickPower * bonusMultiplier * prestigeBonus);
        }
        
        // Статистика
        if (document.getElementById('clickPower')) {
            document.getElementById('clickPower').textContent = clickPower;
        }
        
        if (document.getElementById('autoClick')) {
            document.getElementById('autoClick').textContent = autoClickPower;
        }
        
        if (document.getElementById('multiplier')) {
            document.getElementById('multiplier').textContent = 'x' + (bonusMultiplier * prestigeBonus);
        }
        
        if (document.getElementById('prestigeLevel')) {
            document.getElementById('prestigeLevel').textContent = prestigeLevel;
        }
        
    } catch (error) {
        console.log('Ошибка при обновлении интерфейса:', error);
    }
}

// Покупка улучшения - ПРОСТАЯ ВЕРСИЯ
function buyUpgrade(type, index) {
    console.log('Покупка улучшения:', type, index);
    
    const upgrades = {
        click: [
            { cost: 10, power: 1, name: "Ручка для кликов" },
            { cost: 100, power: 5, name: "Волшебная мышка" },
            { cost: 1000, power: 25, name: "Квантовый кликер" }
        ],
        auto: [
            { cost: 50, power: 1, name: "Маленький бот" },
            { cost: 500, power: 5, name: "Ферма кликов" },
            { cost: 5000, power: 25, name: "ИИ Кликер 9000" }
        ]
    };
    
    const upgrade = upgrades[type][index];
    
    if (score >= upgrade.cost) {
        score -= upgrade.cost;
        
        if (type === 'click') {
            clickPower += upgrade.power;
            console.log('Сила клика увеличена до:', clickPower);
        } else if (type === 'auto') {
            autoClickPower += upgrade.power;
            console.log('Авто-кликов увеличено до:', autoClickPower);
        }
        
        alert('Улучшение куплено: ' + upgrade.name);
        updateDisplay();
        saveGame();
    } else {
        alert('Недостаточно очков!');
    }
}

// Сохранение игры
function saveGame() {
    const gameData = {
        score: score,
        clickPower: clickPower,
        autoClickPower: autoClickPower,
        bonusMultiplier: bonusMultiplier,
        totalClicks: totalClicks,
        prestigeLevel: prestigeLevel,
        prestigeBonus: prestigeBonus
    };
    localStorage.setItem('clickerSave', JSON.stringify(gameData));
}

// Загрузка игры
function loadGame() {
    const saved = localStorage.getItem('clickerSave');
    if (saved) {
        try {
            const gameData = JSON.parse(saved);
            score = gameData.score || 0;
            clickPower = gameData.clickPower || 1;
            autoClickPower = gameData.autoClickPower || 0;
            bonusMultiplier = gameData.bonusMultiplier || 1;
            totalClicks = gameData.totalClicks || 0;
            prestigeLevel = gameData.prestigeLevel || 0;
            prestigeBonus = gameData.prestigeBonus || 1;
            console.log('Игра загружена!');
        } catch (error) {
            console.log('Ошибка загрузки:', error);
        }
    }
}

// Авто-кликер
function startAutoClicker() {
    setInterval(() => {
        if (autoClickPower > 0) {
            score += autoClickPower * bonusMultiplier * prestigeBonus;
            updateDisplay();
            saveGame();
        }
    }, 1000);
}

// Запуск при загрузке страницы
window.onload = function() {
    console.log('Игра запускается...');
    
    // Загружаем сохранение
    loadGame();
    
    // Назначаем клик на кнопку - ВАЖНО!
    const clickButton = document.getElementById('clickButton');
    if (clickButton) {
        clickButton.onclick = handleClick;
        console.log('✅ Кнопка настроена!');
    } else {
        console.log('❌ Кнопка не найдена!');
    }
    
    // Запускаем авто-кликер
    startAutoClicker();
    
    // Обновляем экран
    updateDisplay();
    
    console.log('🎮 Игра готова!');
};