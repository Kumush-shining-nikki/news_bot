const TelegramBot = require('node-telegram-bot-api');

// HomeKeyboard klaviaturasi
const WeahterKeyboard = [
        [
            { text: '⛅️ Ob-havo' } // Foydalanuvchi tanlaydigan tugma
        ]
    ]

    const WeahterKeyboard_ru = [
        [
            { text: '⛅️ Погода' } // Foydalanuvchi tanlaydigan tugma
        ]
    ]

    const WeahterKeyboard_en = [
        [
            { text: '⛅️ Weather' } // Foydalanuvchi tanlaydigan tugma
        ]
    ]

module.exports = { WeahterKeyboard, WeahterKeyboard_ru, WeahterKeyboard_en };

