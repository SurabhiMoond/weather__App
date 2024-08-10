import axios from "axios";

export const API_KEY = "a3525937ee2111327e0e67adb29bef15";
const weatherUrl = `https://api.openweathermap.org/data/2.5`;
const favouriteUrl = "https://weather-app-7zto.onrender.com/favourite";

const weatherApi = axios.create({
  baseURL: weatherUrl,
});

export const getWeather = (cityName) => weatherApi.get(`/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
export const getWeatherForcast = (city) => weatherApi.get(`/forecast?q=${city}&units=metric&appid=${API_KEY}`);
export const addFavoriteCity = (cityName) => axios.post(favouriteUrl, { cityName });
export const removeFavoriteCity = (cityId) => axios.delete(`${favouriteUrl}/${cityId}`);
export const getFavoriteCities = () => axios.get(favouriteUrl);
