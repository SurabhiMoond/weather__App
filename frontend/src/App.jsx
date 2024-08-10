import { useState } from 'react';
import './App.css'
import { WeatherDisplay } from './component/WeatherDisplay'
import { CloudMoonIcon, SunMoonIcon } from 'lucide-react';

function App() {
const [theme, setTheme] = useState(false);
const handleTheme = () =>{
  setTheme(prev => !prev);
}
  return (
    <div className="weather-display">
      <button onClick={handleTheme} style={{borderRadius:'50%', backgroundColor:'#202b41', display:'flex',
        alignItems:'center', justifyContent:'center' , padding:'10px', border:'none', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)', transition: 'box-shadow 0.5s ease-in-out', margin:'3%', cursor:'pointer'
      }}>{theme ? <SunMoonIcon color="#ffc83d" absoluteStrokeWidth />:<CloudMoonIcon color="#fafafa" absoluteStrokeWidth /> }</button>
      <div className={`background ${theme ? "night" : "day"}`}>
        <WeatherDisplay />
      </div>
    </div>
  );
}

export default App
