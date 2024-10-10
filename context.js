const TelegramBot = require('node-telegram-bot-api');

// Session ma'lumotlari interfeysi
const sessionData = {
    id: 0,
    tgId: 0,
    username: "",
};

// Session setup funksiyasi
const sessionSetup = (bot) => {
    bot.session = {};

    // Foydalanuvchining sessiya ma'lumotlarini olish yoki yaratish
    bot.use((msg, next) => {
        const chatId = msg.chat.id;
        
        if (!bot.session[chatId]) {
            bot.session[chatId] = {
                ...sessionData,
                id: 0,
                tgId: msg.from.id,
                username: msg.from.username || ""
            };
        }
        
        next();
    });
};

module.exports = { sessionSetup };
