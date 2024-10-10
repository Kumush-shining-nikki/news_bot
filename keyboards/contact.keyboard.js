const TelegramBot = require('node-telegram-bot-api');

// Kontaktni yuborish uchun klaviatura
const keyboard = [
    [
        {
            text: '☎️ Yuborish',
            request_contact: true, // Kontakt so'rovini yoqish
        }
    ]
]

const keyboard_ru = [
    [
        {
            text: '☎️ Отправка',
            request_contact: true, // Kontakt so'rovini yoqish
        }
    ]
]


const keyboard_en = [
    [
        {
            text: '☎️ Sending',
            request_contact: true, // Kontakt so'rovini yoqish
        }
    ]
]
module.exports = { keyboard, keyboard_ru, keyboard_en};
