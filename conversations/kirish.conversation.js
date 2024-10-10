// const TelegramBot = require('node-telegram-bot-api');
// const { BOT_TOKEN } = require('../config');
// const { weatherConversation } = require('../conversations/weather.conversation');

// const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// const kirishMenu = {
//     reply_markup: {
//         inline_keyboard: [
//             [{ text: "Yangiliklar", callback_data: "yangiliklar" }],
//             [{ text: "Ob-havo", callback_data: "ob-havo" }],
//             [{ text: "Profil", callback_data: "profil" }]
//         ]
//     }
// };

// // "kirish" komandasi uchun javob
// bot.onText('kirish', (msg) => {
//     const chatId = msg.chat.id;
//     bot.sendMessage(chatId, "Marhamat! Sahifani tanlang:", kirishMenu);
// });

// // Yangiliklar, Ob-havo, Profil tugmalariga javoblar
// bot.on('callback_query', (query) => {
//     const chatId = query.message?.chat.id;
//     const data = query.data;

//     if (!chatId || !data) return;

//     if (data === 'yangiliklar') {
//         bot.sendMessage(chatId, "Bu yerda yangiliklar ko'rsatiladi.");
//     } else if (data === 'ob-havo') {
//         // bot.sendMessage(chatId, "Bu yerda ob-havo ma'lumotlari ko'rsatiladi.");
//         weatherConversation(bot, chatId); 
//     } else if (data === 'profil') {
//         bot.sendMessage(chatId, "Bu yerda profil ma'lumotlaringiz ko'rsatiladi.");
//     }

//     // Callback query ni javobsiz qoldirmaslik uchun
//     bot.answerCallbackQuery(query.id);
// });

// bot.on('polling_error', (error) => {
//   console.error('Polling xatosi:', error);
// });
