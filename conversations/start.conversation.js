const TelegramBot = require("node-telegram-bot-api");
const { BOT_TOKEN } = require("../config");
const { default: axios } = require("axios");

const bot = new TelegramBot(BOT_TOKEN);

exports.start = async (msg) => {
  const chatId = msg.chat.id;
  const tgId = msg.from.id;
try {
  axios
  .get(`https://sheetdb.io/api/v1/5e62s77ucodbw`)
  .then(async (response) => {
    const data = response.data;
    console.log(data);

    if (data.length === 0) {
      await bot.sendMessage(
        chatId,
        `Tilni tanlang:
Выберите язык:
Please choose a language:`,
        {
          reply_markup: {
            inline_keyboard: [
              [{ text: `🇺🇿 O'zbekcha`, callback_data: "uz" }],
              [{ text: `🇷🇺 Русский`, callback_data: "ru" }],
              [{ text: `🇬🇧 English`, callback_data: "en" }],
            ],
          },
        }
      );
    }
  })
  .catch((error) => {
    console.error("Xato:", error);
  });
} catch (err) {
  console.log(err);
  
}

}
  // exports.contact = async (msg) => {
  //   const chatId = msg.from.id;
  //   const adminNumber = ["+998904388114"];
  //   axios
  //     .get(`https://sheetdb.io/api/v1/5e62s77ucodbw/search?chatId=${chatId}`)
  //     .then(async (response) => {
  //       const user = response.data;
  //       console.log(user);
  //     });


  //     if (msg.contact.phone_number) {
  //       const isAdmin = adminNumber.includes(msg.contact.phone_number);
  //       const role = isAdmin ? "admin" : "user";
  //       const newUser = await axios.put(
  //         `https://sheetdb.io/api/v1/5e62s77ucodbw/search?chatId=${chatId}`,
  //         {
  //           data: {
  //             phone_number: msg.contact.phone_number,
  //             role: role,
  //           },
  //         }
  //       );
  //       console.log(newUser.data);
  //     } else if (!msg.contact.phone_number) {
  //     switch (user.language) {
  //       case "uz":
  //         bot.sendMessage(chatId, "Yuborish tugmasi orqali yuboring!");
  //         break;
  //       case "ru":
  //         bot.sendMessage(chatId, "Отправьте через кнопку отправить!");
  //         break;
  //       case "en":
  //         bot.sendMessage(chatId, "Submit via the submit button!");
  //         break;
  //     }
  //   }
  // }
  // module.exports = { contact }

  //                     bot.once('contact', async (contactMsg) => {
  //                         if (contactMsg.chat.id === chatId) {
  //                             const phoneNumber = contactMsg.contact.phone_number;

  //                             const newUser = addUser({
  //                                 firstName,
  //                                 lastName,
  //                                 tgId,
  //                                 phoneNumber,
  //                             });

  //                             await bot.sendMessage(chatId, "Siz muvaffaqiyatli ro'yxatdan o'tdingiz!", {
  //                                 reply_markup: {
  //                                     keyboard: HomeKeyboard,
  //                                     resize_keyboard: true
  //                                 }
  //                             });

  //                             bot.session = bot.session || {};
  //                             bot.session[chatId] = {
  //                                 id: newUser.id,
  //                                 tgId: newUser.tgId,
  //                                 username: msg.from.username,
  //                             };
  //                         }
  //                     });
  //                 }
  //             });
  //         }
  //     });
  // } else {
  // await bot.sendMessage(chatId, `Assalomu aleykum ${user.firstName} ${user.lastName}. Botimizga xush kelibsiz!`, {
  //     reply_markup: {
  //         keyboard: HomeKeyboard,
  //         resize_keyboard: true
  // }
  // });

  //     bot.session = bot.session || {};
  //     bot.session[chatId] = {
  //         id: user.id,
  //         tgId: user.tgId,
  //         username: msg.from.username,
  //     };
  // }


// Polling xatolarini ushlash



bot.on("polling_error", (error) => {
  console.error("Polling xatosi:", error);
});
