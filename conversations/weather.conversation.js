const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios"); // Ob-havo ma'lumotlarini olish uchun
const BOT_TOKEN = require("../config")
const bot = new TelegramBot(BOT_TOKEN);
const { backKeyboard, backKeyboard_ru, backKeyboard_en } = require("../keyboards/keyboard");

// Foydalanuvchilar va ularning joylashuvini saqlash
let users = [];

// Ob-havo ma'lumotlarini olish
async function getWeather(lat, lon) {
  const WEATHER_API_KEY = require("../config"); // Ob-havo API kaliti
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}&lang=uz`;
  const response = await axios.get(url);
  const data = response.data;
  return {
    havo: data.weather[0].description,
    temperatura: data.main.temp,
    shamol: data.wind.speed,
    davlat: data.sys.country,
    shahar: data.name,
  };
}

// Ob-havo ma'lumotlarini foydalanuvchiga yuborish
async function sendWeather(chatId, lat, lon) {
  const weather = await getWeather(lat, lon);
  const today = new Date().toLocaleDateString();

  axios
    .get(`https://sheetdb.io/api/v1/5e62s77ucodbw/search?chatId=${chatId}`)
    .then(async (response) => {
      const user = response.data;
      console.log(user);
    });

  switch (user.language) {
    case "uz":
      bot.sendMessage(
        chatId,
        `
            <b>${today}</b> sanadagi ob-havo ma'lumoti: \n\n
            <b>⛅️ Havo</b>: ${weather.havo}\n
            <b>🌡 Temperatura</b>: ${weather.temperatura} °C\n
            <b>💨 Shamol</b>: ${weather.shamol} m/s\n
            <b>🏛 Davlat</b>: ${weather.davlat}\n
            <b>🏙 Shahar</b>: ${weather.shahar}
        `,
        {
          parse_mode: "HTML",
          reply_markup: {
            keyboard: backKeyboard,
            resize_keyboard: true,
          },
        }
      );
      break;
    case "ru":
      bot.sendMessage(chatId, `
            <b>${today}</b> прогноз погоды на дату: \n\n
            <b>⛅️ Погода</b>: ${weather.havo}\n
            <b>🌡 Температура</b>: ${weather.temperatura} °C\n
            <b>💨 Ветер</b>: ${weather.shamol} m/s\n
            <b>🏛 Состояние</b>: ${weather.davlat}\n
            <b>🏙 Город</b>: ${weather.shahar}
        `,
        {
          parse_mode: "HTML",
          reply_markup: {
            keyboard: backKeyboard_ru,
            resize_keyboard: true,
          },
        });
      break;
    case "en":
      bot.sendMessage(chatId, `
            <b>${today}</b> weather forecast for the date: \n\n
            <b>⛅️ Weather</b>: ${weather.havo}\n
            <b>🌡 Temperature</b>: ${weather.temperatura} °C\n
            <b>💨 The wind</b>: ${weather.shamol} m/s\n
            <b>🏛 State</b>: ${weather.davlat}\n
            <b>🏙 City</b>: ${weather.shahar}
        `,
        {
          parse_mode: "HTML",
          reply_markup: {
            keyboard: backKeyboard_en,
            resize_keyboard: true,
          },
        });
      break;
  }


}

// Foydalanuvchi lokatsiyasini qo'shish   
function addLocation(chatId, lat, lon) {
  const user = users.find((user) => user.id === chatId);
  if (user) {
    user.lat = lat;
    user.lon = lon;
  } else {
    users.push({ id: chatId, lat, lon });
  }
}

// Bot xabarlarini boshqarish
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (text === "/start") {
    bot.sendMessage(chatId, "Botga xush kelibsiz!", {
      reply_markup: {
        keyboard: HomeKeyboard,
        resize_keyboard: true,
      },
    });
  } else if (text === "Ob-havo") {
    const user = users.find((user) => user.id === chatId);
    if (user?.lat && user?.lon) {
      await sendWeather(chatId, user.lat, user.lon);
    } else {
      bot.sendMessage(chatId, "Lokatsiyangizni yuboring:");
    }
  }
});

// Foydalanuvchidan lokatsiyani qabul qilish
bot.on("location", async (msg) => {
  const chatId = msg.chat.id;
  const { latitude, longitude } = msg.location;

  // Foydalanuvchi joylashuvini saqlash
  addLocation(chatId, latitude, longitude);

  // Ob-havo ma'lumotlarini yuborish
  await sendWeather(chatId, latitude, longitude);
});

// Polling errorlarni kuzatish
bot.on("polling_error", (error) => {
  console.log(
    `Polling error: ${error.code}, Description: ${error.response.body.description}`
  );
});
