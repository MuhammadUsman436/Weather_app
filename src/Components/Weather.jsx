import React, { useEffect, useState } from "react";
import "./Weather.css";
import search_icon from "../assets/search.png";
import clear_icon from "../assets/clear.png";
import humidity_icon from "../assets/humidity.png";
import wind_icon from "../assets/wind.png";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("");

  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      setWeatherData({
        city: data.name,
        country: data.sys.country,
        temperature: Math.floor(data.main.temp),
        description: data.weather[0].description,
        icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        humidity: data.main.humidity,
        wind: data.wind.speed,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    search(city);
  }, []);

  const handleSearch = () => {
    if(city == ""){
        alert("Enter the City Name");
    }
    setWeatherData(null);  // Reset weather data before fetching new one
    search(city);
  };

  return (
    <div className="weather">
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter a city name"
        />
        <img src={search_icon} alt="Search" onClick={handleSearch} />
      </div>
      {weatherData && (
        <>
          <img src={weatherData.icon || clear_icon} alt="Weather Icon" className="weather_icon" />
          <p className="temperature">{weatherData.temperature}°C</p>
          <p className="location">{weatherData.city}, {weatherData.country}</p>
          <div className="weather_data">
            <div className="col">
              <img src={humidity_icon} alt="Humidity" />
              <div>
                <p>{weatherData.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className="col">
              <img src={wind_icon} alt="Wind" />
              <div>
                <p>{weatherData.wind} Km/h</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
