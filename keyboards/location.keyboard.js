const TelegramBot = require('node-telegram-bot-api');

// LocationKeyboard klaviaturasi
const LocationKeyboard = [
    [
            {
                text: '🗺 Yuborish',
                request_location: true 
            }
    ]
]

const LocationKeyboard_ru = [
    [
            {
                text: '🗺 Отправка',
                request_location: true 
            }
    ]
]

const LocationKeyboard_en = [
    [
            {
                text: '🗺 Sending',
                request_location: true 
            }
    ]
]

module.exports = { LocationKeyboard, LocationKeyboard_ru, LocationKeyboard_en };
