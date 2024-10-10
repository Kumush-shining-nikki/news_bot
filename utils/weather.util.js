const axios = require('axios');
const { WEATHER_API_KEY } = require('../config');

// Havo ma'lumotlarini olish funksiyasi
async function getWeather(lat, lon) {
    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: {
                lat: lat,
                lon: lon,
                appid: WEATHER_API_KEY,
                units: 'metric'
            }
        });

        return {
            havo: response.data.weather[0].main,
            temperatura: response.data.main.temp,
            shamol: response.data.wind.speed,
            davlat: response.data.sys.country,
            shahar: response.data.name
        };
    } catch (error) {
        throw error;
    }
}

module.exports = { getWeather };
