import React from "react";

export const Forecast = ({ data }) => {
  if (!data || !data.list) return null;

  // Group forecast data by day
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
      <h2>Forecast</h2>
      <div className="forecast">
        {Object.keys(dailyForecasts).map((date, index) => {
          const dailyData = dailyForecasts[date];
          const dailyTemp =
            dailyData.reduce((acc, curr) => acc + curr.main.temp, 0) /
            dailyData.length;
          const dailyFeelsLike =
            dailyData.reduce((acc, curr) => acc + curr.main.feels_like, 0) /
            dailyData.length;
          const dailyHumidity =
            dailyData.reduce((acc, curr) => acc + curr.main.humidity, 0) /
            dailyData.length;
          const dailyPressure =
            dailyData.reduce((acc, curr) => acc + curr.main.pressure, 0) /
            dailyData.length;
          const dailyWind =
            dailyData.reduce((acc, curr) => acc + curr.wind.speed, 0) /
            dailyData.length;

          return (
            <div key={index} className="forecast-day">
              <h3>{date}</h3>
              <p>
                Weather:
                {dailyData[0].weather[0]?.description}
              </p>
              <p>Temperature: {dailyTemp.toFixed(1)}°C</p>
              <p>Feels Like: {dailyFeelsLike.toFixed(1)}°C</p>
              <p>Humidity: {dailyHumidity.toFixed(1)}%</p>
              <p>Wind: {dailyWind.toFixed(1)} km/h</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
