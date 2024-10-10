const TelegramBot = require("node-telegram-bot-api");
const { BOT_TOKEN } = require("./config");
const { start } = require("./conversations/start.conversation");
const { weather } = require("./conversations/weather.conversation");
const { profilConversation } = require("./conversations/profil.conversation");
const { getDB } = require("./db");
const { default: axios } = require("axios");
const { keyboard, keyboard_en, keyboard_ru,} = require("./keyboards/contact.keyboard");

const bot = new TelegramBot(BOT_TOKEN, { polling: true });

const currentDate = new Date();

const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const day = String(currentDate.getDate()).padStart(2, "0");
const hours = String(currentDate.getHours()).padStart(2, "0");
const minutes = String(currentDate.getMinutes()).padStart(2, "0");
const seconds = String(currentDate.getSeconds()).padStart(2, "0");

const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

bot.onText("/start", (msg) => {
  const chatId = msg.chat.id;
  start(msg);
});

bot.on("message", async (msg) => {
  const chatId = msg.from.id;
  try {
    const response = await axios.get(`https://sheetdb.io/api/v1/5e62s77ucodbw/search?chatId=${chatId}`);
    const user = response.data;
  
    if ((msg.contact && msg.contact.phone_number)) {
        // const chatId = msg.from.id;
        const adminNumber = ["+998904388114"];
    //     axios
    //       .get(`https://sheetdb.io/api/v1/5e62s77ucodbw/search?chatId=${chatId}`)
    //       .then(async (response) => {
    //         const user = response.data;
    //         console.log(user);
    //       });
      
      // console.log(msg);
      
          if (msg.contact.phone_number) {
            const isAdmin = adminNumber.includes(msg.contact.phone_number);
            const role = isAdmin ? "admin" : "user";
            const newUser = await axios.put(
              `https://sheetdb.io/api/v1/5e62s77ucodbw/search?chatId=${chatId}`,
              {
                data: {
                  "phone_number": msg.contact.phone_number,
                  "role": role,
                },
              }
            );
            console.log("Ishladi");
          } else if (!msg.contact.phone_number) {
          switch (user.language) {
            case "uz":
              bot.sendMessage(chatId, "Yuborish tugmasi orqali yuboring!");
              break;
            case "ru":
              bot.sendMessage(chatId, "Отправьте через кнопку отправить!");
              break;
            case "en":
              bot.sendMessage(chatId, "Submit via the submit button!");
              break;
          }
        }
      }
    
  } catch (err) {
    console.log(err);
  }
}
)


bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const selectedLanguage = query.data;
  const userInfo = query.from; // query.message.from o'rniga query.from ishlatiladi

  try {
    const response = await axios.get(`https://sheetdb.io/api/v1/5e62s77ucodbw`);
    const data = response.data;

    if (!data || data.length === 0) {
      if (selectedLanguage === "uz") {
        const newUser = await axios.post(
          `https://sheetdb.io/api/v1/5e62s77ucodbw`,
          {
            data: {
              firstname: userInfo.first_name,
              lastname: userInfo.last_name,
              username: userInfo.username,
              chatId: userInfo.id,
              phone_number: "",
              role: "user",
              language: "uz",
              createdAt: new Date().toISOString(), // formattedDate
            },
          }
        );

        await bot.sendMessage(chatId, "Telefon raqamingizni yuboring:", {
          reply_markup: {
            keyboard: keyboard,
            resize_keyboard: true,
          },
        });
      }

      if (!data || data.length === 0) {
        if (selectedLanguage === "ru") {
          const newUser = await axios.post(
            `https://sheetdb.io/api/v1/5e62s77ucodbw`,
            {
              data: {
                firstname: userInfo.first_name,
                lastname: userInfo.last_name,
                username: userInfo.username,
                chatId: userInfo.id,
                phone_number: "",
                role: "user",
                language: "ru",
                createdAt: new Date().toISOString(), // formattedDate
              },
            }
          );

          await bot.sendMessage(chatId, "Отправьте свой номер телефона:", {
            reply_markup: {
              keyboard: keyboard_ru,
              resize_keyboard: true,
            },
          });
        }
      }

      if (!data || data.length === 0) {
        if (selectedLanguage === "en") {
          const newUser = await axios.post(
            `https://sheetdb.io/api/v1/5e62s77ucodbw`,
            {
              data: {
                firstname: userInfo.first_name,
                lastname: userInfo.last_name,
                username: userInfo.username,
                chatId: userInfo.id,
                phone_number: "",
                role: "user",
                language: "en",
                createdAt: new Date().toISOString(), // formattedDate
              },
            }
          );
          await bot.sendMessage(chatId, "Send your phone number:", {
            reply_markup: {
              keyboard: keyboard_en,
              resize_keyboard: true,
            },
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
});


// Tanlangan tilga qarab xabar yuborish
// bot.sendMessage(chatId, messages[selectedLanguage].welcome);

// Foydalanuvchiga til tanlaganidan so'ng asosiy menyuni ko'rsatish
// const mainMenu = {
//   reply_markup: {
//     inline_keyboard: [
//       // [{ text: messages[selectedLanguage].news, callback_data: 'news' }],
//       // [{ text: messages[selectedLanguage].weather, callback_data: 'weather' }],
//       // [{ text: messages[selectedLanguage].profile, callback_data: 'profile' }]

//       [{ text: "Yangiliklar", callback_data: "yangiliklar" }],
//       [{ text: "Ob-havo", callback_data: "ob-havo" }],
//       [{ text: "Profil", callback_data: "profil" }]
//     ]
//   }
// };

// bot.sendMessage(chatId, "Marhamat! Sahifani tanlang:", mainMenu);

// 7. Yangiliklar, Ob-havo, Profil tugmalariga javoblar
// bot.on('callback_query', (query) => {
//   const chatId = query.message?.chat.id;
//   const data = query.data;

//   if (!chatId || !data) return;

//   if (data === 'yangiliklar') {
//       bot.sendMessage(chatId, "Bu yerda yangiliklar ko'rsatiladi.");
//   } else if (data === 'ob-havo') {
//       // bot.sendMessage(chatId, "Bu yerda ob-havo ma'lumotlari ko'rsatiladi.");
//       weatherConversation(bot, chatId);
//   } else if (data === 'profil') {
//       bot.sendMessage(chatId, "Bu yerda profil ma'lumotlaringiz ko'rsatiladi.");
//   }

//   // Callback query ni javobsiz qoldirmaslik uchun
//   bot.answerCallbackQuery(query.id);
// });

// Botning komandalarini o'rnatish
bot.setMyCommands([{ command: "start", description: "Botni ishga tushirish" }]);

// Wether
bot.onText("/weather", (msg) => {
  const chatId = msg.chat.id;
  weather(msg);
});

bot.on("polling_error", (error) => {
  console.error("Polling xatosi:", error);
});
                                                                                                    
// Bot ishga tushdi
console.log("Bot ishga tushdi...");
