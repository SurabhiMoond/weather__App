import { useEffect, useState } from "react";
import "./App.css";
import { WeatherDisplay } from "./component/WeatherDisplay";
import { CloudMoonIcon, SunMoonIcon } from "lucide-react";

function App() {
  const [theme, setTheme] = useState(false);
  useEffect(() => {
    document.body.className = theme ? "night" : "day";
  }, [theme]);
  const handleTheme = () => {
    setTheme((prev) => !prev);
  };

  return (
    <div className="weather-display">
      <button
        onClick={handleTheme}
        className="themeBtn"
        style={{
          borderRadius: "50%",
          backgroundColor: theme ? "#202b41" : "#95a0a6",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          boxShadow:
            "rgb(10, 10, 218) 0px 50px 100px -20px, rgb(51, 255, 0) 0px 30px 60px -30px, rgba(3, 255, 112, 0.35) 0px -2px 6px 0px inset",
          cursor: "pointer",
        }}
      >
        {theme ? (
          <SunMoonIcon color="#ffc83d" />
        ) : (
          <CloudMoonIcon color="#fafafa" />
        )}
      </button>
      <div className="background">
        <WeatherDisplay theme={theme} />
      </div>
    </div>
  );
}
export default App;
