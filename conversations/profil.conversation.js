const TelegramBot = require("node-telegram-bot-api");
const { BOT_TOKEN } = require("../config");
const bot = new TelegramBot(BOT_TOKEN, { polling: true });

// User profiles (Bu misol uchun oddiy obyekt sifatida ko'rsatilgan)
let userProfiles = {};

// /start komandasi orqali profil yaratish yoki ko'rish
bot.onText("/profil", (msg) => {
  const chatId = msg.chat.id;
  const userId = msg.from.id;

  // Foydalanuvchi profili yo'q bo'lsa, yaratamiz
  if (!userProfiles[userId]) {
    userProfiles[userId] = {
      name: msg.from.first_name || "No name",
      surname: msg.from.last_name || "No surname",
      username: msg.from.username || "No username",
    };
  }

  // Foydalanuvchi profilini ko'rsatamiz
  const profile = userProfiles[userId];
  const profileText = `📝 Profilingiz:\n\n Ismingiz: ${profile.name}\n Familiyangiz: ${profile.surname}\n Usernamengiz: ${profile.username}`;
  const profileText_ru = `📝 Ваш профиль:\n\n Ваше имя: ${profile.name}\n Ваша фамилия: ${profile.surname}\n Ваше имя пользователя: ${profile.username}`;
  const profileText_en = `📝 Your profile:\n\n Your first name: ${profile.name}\n Your last name: ${profile.surname}\n Your username: ${profile.username}`;

  switch (user.language) {
    case "uz":
      bot.sendMessage(chatId, profileText, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "✏️ Tahrirlash", callback_data: "edit_profile" }],
          ],
        },
      });
      break;
    case "ru":
      bot.sendMessage(chatId, profileText_ru, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "✏️ Монтаж", callback_data: "edit_profile" }],
          ],
        },
      });
      break;
    case "en":
      bot.sendMessage(chatId, profileText_en, {
        reply_markup: {
          inline_keyboard: [
            [{ text: "✏️ Editing", callback_data: "edit_profile" }],
          ],
        },
      });
      break;
    }
});

bot.on("polling_error", (error) => {
  console.error("Polling xatosi:", error);
});
