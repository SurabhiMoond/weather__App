import React, { useEffect, useRef, useState } from "react";
import { getWeather, getWeatherForcast } from "../../api/url";
import { Forecast } from "./Forcast";
import {CloudCogIcon, CloudDrizzleIcon, Haze, HazeIcon, Search, ThermometerSunIcon, Wind, WindIcon} from 'lucide-react'
import sunsetImage from "../assets/sunrise.png";
import sunsetImage2 from "../assets/sunsets.png";
export const WeatherDisplay = () => {
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
      <div >
        <form onSubmit={handleInputSubmit} className="formData">
        <input type="text" ref={ref} value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search city name here...." required className="inputBox" />
        <button type="submit" className="buttonSearch"
         onMouseDown={(e) => {
              e.currentTarget.style.transform = "scale(0.90)";
              e.currentTarget.style.boxShadow = "0px 2px 4px rgba(0, 0, 0, 0.3)"; // Decrease shadow
            }}
         onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)"; // Restore on leave
              e.currentTarget.style.boxShadow = "0px 5px 8px rgba(0, 0, 0, 0.5)"; // Restore shadow on leave
            }}
          >
          <Search absoluteStrokeWidth /> Search
          </button>
        </form>
      </div>
      {weatherData && (
        <div>
          <div className="counteryName_timeIcon">
            <div>
              <h3>
                {weatherData.name || "City not found"},{" "}
                {weatherData.sys?.country}
              </h3>
              {weatherData.weather[0].main === "Clouds" && <CloudCogIcon />}
              {weatherData.weather[0].main === "Drizzle" && (
                <CloudDrizzleIcon color="#fafafa" absoluteStrokeWidth />
              )}
              {weatherData.weather[0].main === "Mist" && (
                <HazeIcon color="#fafafa" absoluteStrokeWidth />
              )}
            </div>
            <div style={{ lineHeight: "0px" }}>
              <p>
                Sunrise:{" "}
                {weatherData.sys?.sunrise &&
                  formatTime(weatherData.sys.sunrise)}
                &nbsp;
                <img src={sunsetImage} width={"4%"} />
              </p>
              <p>
                Sunset:{weatherData.sys?.sunset && formatTime(weatherData.sys.sunset)}
                &nbsp;
                <img src={sunsetImage2} width={"4%"} />
              </p>
            </div>
          </div>
          <div className="current-weather">
            <div className="weatherDetail">
              <p> Weather : {weatherData.weather[0].description}</p>
              <p>Humidity : {weatherData.main.humidity}%</p>
            </div>
            <div className="weatherIcon">
              <p>
                <ThermometerSunIcon color="#fafafa" absoluteStrokeWidth /> :{weatherData.main.temp}°C
              </p>
              <p>Feels Like : {weatherData.main.feels_like}°C</p>
              <p>
                <WindIcon color="#fafafa" absoluteStrokeWidth />:{weatherData.wind.speed} km/h{" "}
              </p>
            </div>
          </div>
        </div>
      )}
      {forecastData && <Forecast data={forecastData} />}
    </div>
  );
};
