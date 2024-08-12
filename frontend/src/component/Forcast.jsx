import React from "react";
import cloud from "../assets/cloud.png";
import sunny from "../assets/sun.png";
import mist from "../assets/mist.png";
import fog from "../assets/fogg.png";
export const Forecast = ({ data }) => {
  if (!data || !data.list) return null;
  const dailyForecasts = data.list.reduce((acc, curr) => {
    const date = new Date(curr.dt * 1000).toDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(curr);
    return acc;
  }, {});

  return (
    <div>
      <h2 style={{ textAlign: "center" }}>Forecast</h2>
      <div className="forecast">
        {Object.keys(dailyForecasts).map((date, index) => {
          const dailyData = dailyForecasts[date];
          const dailyTemp =
            dailyData.reduce((acc, curr) => acc + curr.main.temp, 0) /
            dailyData.length;
          const dailyFeelsLike =
            dailyData.reduce((acc, curr) => acc + curr.main.feels_like, 0) /
            dailyData.length;

          return (
            <div key={index} className="forecast-day">
              <h5>{date}</h5>
              <div>
                {(dailyData[0].weather[0].main === "Clouds" ||
                  dailyData[0].weather[0].main === "Rain") && (
                  <img src={cloud} width={"60px"} />
                )}
              </div>
              <div>
                {(dailyData[0].weather[0].main === "Clear" ||
                  dailyData[0].weather[0].main === "Sunny") && (
                  <img src={sunny} width={"60px"} />
                )}
              </div>
              <div>
                {dailyData[0].weather[0].main === "Mist" && (
                  <img src={mist} width={"60px"} />
                )}
              </div>
              <div>
                {dailyData[0].weather[0].main === "Haze" && (
                  <img src={fog} width={"60px"} />
                )}
              </div>
              <p> {dailyTemp.toFixed(1)}°C</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
