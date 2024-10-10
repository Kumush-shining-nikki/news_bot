const TelegramBot = require('node-telegram-bot-api');

// HomeKeyboard klaviaturasi
const HomeKeyboard = {
    keyboard: [
        [
            { text: '⛅️ Ob-havo' } // Foydalanuvchi tanlaydigan tugma
        ]
    ],
    resize_keyboard: true // Klaviatura o'lchami ekran o'lchamiga moslashadi
};

module.exports = { HomeKeyboard };

