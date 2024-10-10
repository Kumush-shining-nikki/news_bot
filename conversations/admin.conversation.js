const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const { BOT_TOKEN } = require('../config');
const bot = new TelegramBot(BOT_TOKEN, {polling: true});

// Admin foydalanuvchilar ID-lari
const admins = [123456789, 987654321]; // Admin ID-larini kiriting

// SheetDB API URL
const SHEETDB_URL = 'https://sheetdb.io/api/v1/5e62s77ucodbw';

// Foydalanuvchilar ro'yxatini olish
async function getUsersFromSheetDB() {
  try {
    const response = await axios.get(SHEETDB_URL);
    return response.data;
  } catch (error) {
    console.error('SheetDB orqali foydalanuvchilarni olishda xato:', error);
    return [];
  }
}

// Adminlar foydalanuvchilarni ko'rishi
bot.onText('/admin_users', async (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  if (admins.includes(userId)) {
    const users = await getUsersFromSheetDB();

    if (users.length > 0) {
        if (selectedLanguage === "uz") {
            let userList = '📋 Foydalanuvchilar ro\'yxati:\n';
            users.forEach(user => {
              userList += `👤 ${user.name} (ID: ${user.id})\n`;
            });
        } 
        if (selectedLanguage === "ru") {
            let userList = '📋 Список пользователей:\n';
            users.forEach(user => {
              userList += `👤 ${user.name} (ID: ${user.id})\n`;
            });
        }
        if (selectedLanguage === "en") {
            let userList = '📋 User list:\n';
            users.forEach(user => {
              userList += `👤 ${user.name} (ID: ${user.id})\n`;
            });
        }
      bot.sendMessage(chatId, userList);
    } else {
      bot.sendMessage(chatId, '🚫 Foydalanuvchilar mavjud emas.');
    }
  } else {
    bot.sendMessage(chatId, "❌ Siz admin emassiz.");
  }
});


bot.onText('/admin_panel', (msg) => {
    const chatId = msg.chat.id;
    const userId = msg.from.id;
  
    if (admins.includes(userId)) {
      bot.sendMessage(chatId, "Admin paneliga xush kelibsiz. Kerakli funksiyani tanlang:", {
        reply_markup: {
          inline_keyboard: [
            [{ text: '📋 Foydalanuvchilar ro\'yxati', callback_data: 'view_users' }],
          ]
        }
      });
    } else {
      bot.sendMessage(chatId, "❌ Siz admin emassiz.");
    }
  });
  