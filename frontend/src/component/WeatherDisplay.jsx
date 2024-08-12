import React, { useEffect, useRef, useState } from "react";
import { getWeather, getWeatherForcast } from "../../api/url";
import { Forecast } from "./Forcast";
import { Search, ThermometerSunIcon, Wind, WindIcon } from "lucide-react";
import sunsetImage from "../assets/sunrise.png";
import sunsetImage2 from "../assets/sunsets.png";
import sunny from "../assets/sun.png";
import mist from "../assets/mist.png";
import cloud from "../assets/cloud.png";
import drizzle from "../assets/drizzle.png";
export const WeatherDisplay = ({ theme }) => {
  const [input, setInput] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [err, setErr] = useState(null);
  const ref = useRef();

  const fetchData = async () => {
    try {
      // Fetch current weather
      let res = await getWeather(input);
      console.log("Current Weather API Response:", res.data);
      setWeatherData(res.data);

      // Fetch 5-day forecast
      let forecastRes = await getWeatherForcast(input);
      console.log("Forecast API Response:", forecastRes.data);
      setForecastData(forecastRes.data);

      setErr(null);
    } catch (err) {
      setErr("Give correct input");
      setWeatherData(null);
      setForecastData(null);
    }
  };

  useEffect(() => {
    ref.current.focus();
  }, []);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString();
  };
  return (
    <div className="weatherDisplayData">
      {err && <div className="error-message">Error: {err}</div>}
      <div>
        <form onSubmit={handleInputSubmit} className="formData">
          <input
            type="text"
            ref={ref}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search city name here...."
            required
            className="inputBox"
          />
          <button
            type="submit"
            className="buttonSearch"
            style={{ backgroundColor: theme ? "#191e34" : "#95a0a6" }}
          >
            <Search absoluteStrokeWidth />
          </button>
        </form>
      </div>
      {weatherData && (
        <div className="weatherDisplayCards">
          <div className="counteryName_timeIcon">
            <div>
              <h3>
                {weatherData.name || "City not found"} {"  "}
                {weatherData.sys?.country === "IN" && <span>India</span>}
              </h3>
              <div className="weatherICon">
                {(weatherData.weather[0].main === "Sunny" ||
                  weatherData.weather[0].main === "Clear") && (
                  <img src={sunny} width={"60px"} />
                )}
                {weatherData.weather[0].main === "Clouds" && (
                  <img src={cloud} width={"60px"} />
                )}
                {weatherData.weather[0].main === "Drizzle" && (
                  <img src={drizzle} width={"60px"} />
                )}
                {(weatherData.weather[0].main === "Mist" ||
                  weatherData.weather[0].main === "Haze") && (
                  <img src={mist} width={"60px"} />
                )}
              </div>
              <div className="sunrise_sunset">
                <p>
                  {weatherData.sys?.sunrise &&
                    formatTime(weatherData.sys.sunrise)}
                </p>
                <img src={sunsetImage} width={"15%"} />
                <p>
                  {weatherData.sys?.sunset &&
                    formatTime(weatherData.sys.sunset)}
                </p>
                <img src={sunsetImage2} width={"15%"} />
              </div>
            </div>
          </div>
          <div className="current-weather">
            <div className="weatherDetail">
              <p> Weather : {weatherData.weather[0].description}</p>
              <p>Humidity : {weatherData.main.humidity}%</p>
              <p>Feels Like : {weatherData.main.feels_like}°C</p>
              <p>
                <ThermometerSunIcon color="#fafafa" absoluteStrokeWidth />
                {weatherData.main.temp}°C
              </p>
              <p>
                <WindIcon color="#fafafa" absoluteStrokeWidth />
                {weatherData.wind.speed} km/h
              </p>
            </div>
          </div>
        </div>
      )}
      {forecastData && <Forecast data={forecastData} />}
    </div>
  );
};
