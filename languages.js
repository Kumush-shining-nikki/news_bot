const TelegramBot = require('node-telegram-bot-api');
const { BOT_TOKEN } = require('./config');

// 1. Botni ishga tushirish
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// 2. Har bir til uchun matnlarni ajratib olish
const messages = {
  uz: {
    welcome: "Assalomu alaykum! Tilni tanlang:",
    news: "Yangiliklar",
    weather: "Ob-havo",
    profile: "Profil",
  },
  ru: {
    welcome: "Здравствуйте! Выберите язык:",
    news: "Новости",
    weather: "Погода",
    profile: "Профиль",
  },
  en: {
    welcome: "Hello! Please choose a language:",
    news: "News",
    weather: "Weather",
    profile: "Profile",
  }
};

// 3. Foydalanuvchining tanlagan tilini sessiyada saqlash
let userLanguages = {}; // har bir foydalanuvchi uchun tilni saqlash uchun

// 4. Tilni tanlash uchun menyu
const languageMenu = {
  reply_markup: {
    inline_keyboard: [
      [{ text: '🇺🇿 O\'zbekcha', callback_data: 'uz' }],
      [{ text: '🇷🇺 Русский', callback_data: 'ru' }],
      [{ text: '🇬🇧 English', callback_data: 'en' }]
    ]
  }
};

// 5. Foydalanuvchiga til tanlash xabarini yuborish
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Tilni tanlang:", languageMenu);
});

// 6. Foydalanuvchi tanlagan tilni saqlash
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const selectedLanguage = query.data;

  // Foydalanuvchining tilini sessiyada saqlaymiz
  userLanguages[chatId] = selectedLanguage;

  // Tanlangan tilga qarab xabar yuborish
  bot.sendMessage(chatId, messages[selectedLanguage].welcome);

  // Foydalanuvchiga til tanlaganidan so'ng asosiy menyuni ko'rsatish
  const mainMenu = {
    reply_markup: {
      inline_keyboard: [
        [{ text: messages[selectedLanguage].news, callback_data: 'news' }],
        [{ text: messages[selectedLanguage].weather, callback_data: 'weather' }],
        [{ text: messages[selectedLanguage].profile, callback_data: 'profile' }]
      ]
    }
  };
  
  bot.sendMessage(chatId, "Iltimos, sahifani tanlang:", mainMenu);
});

// 7. Yangiliklar, Ob-havo, Profil tugmalariga javoblar
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;
  const selectedLanguage = userLanguages[chatId]; // Foydalanuvchining tanlagan tilini olish
  const data = query.data;

  if (data === 'news') {
    bot.sendMessage(chatId, messages[selectedLanguage].news + ": Bu yerda yangiliklar ko'rsatiladi.");
  } else if (data === 'weather') {
    bot.sendMessage(chatId, messages[selectedLanguage].weather + ": Bu yerda ob-havo ma'lumotlari ko'rsatiladi.");
  } else if (data === 'profile') {
    bot.sendMessage(chatId, messages[selectedLanguage].profile + ": Bu yerda profil ma'lumotlaringiz ko'rsatiladi.");
  }

  // Callback query ni javobsiz qoldirmaslik uchun
  bot.answerCallbackQuery(query.id);
});

console.log('Bot ishga tushdi...');
