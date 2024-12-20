import React, { useRef, useEffect, useState } from 'react';
import { IoIosSearch } from "react-icons/io";
import { WiHumidity } from "react-icons/wi";
import { LuWind } from "react-icons/lu";
import './Weather.css';
import clear from '../Assets/clear.png';
import cloud from '../Assets/cloud.png';
import drizzle from '../Assets/drizzle.png';
import rain from '../Assets/rain.png';
import snow from '../Assets/snow.png';

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  const allIcons = {
    "01d": clear,
    "01n": clear,
    "02d": cloud,
    "02n": cloud,
    "03d": cloud,
    "03n": cloud,
    "04d": drizzle,
    "04n": drizzle,
    "09d": rain,
    "09n": rain,
    "10d": rain,
    "10n": rain,
    "13d": snow,
    "13n": snow,
  };

  const search = async (city) => {
    if (city === "") {
      alert("Please enter city name");
      return;
    }

    setLoading(true); // Show loading state
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=bd70854cd52aea6309285459aa27a978`; 
      const response = await fetch(url);
      const data = await response.json();
      const icons = allIcons[data.weather[0].icon] || clear;

      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icons,
      });
    } catch (error) {
      console.error("Error fetching weather data", error);
    } finally {
      setLoading(false); // Hide loading state after fetching data
    }
  };

  useEffect(() => {
    search("New York");
  }, []);

  return (
    <div className='weather'>
      {/* Welcome Message */}
      <div className='welcome-msg'>
        <h1>Welcome to the Weather App! 🌤️</h1>
        <p>Get accurate weather updates from your city!</p>
      </div>

      {/* Search bar */}
      <div className='search-bar'>
        <input ref={inputRef} type='text' placeholder='Search city...' />
        <IoIosSearch size={50} className='search-icon' onClick={() => search(inputRef.current.value)} />
      </div>

      {/* Weather Data */}
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <div>
            <img src={weatherData.icon} className='weather-icon' alt="Weather icon" />
            <p className='temperature'>{weatherData.temperature}°C</p>
            <p className='location'>{weatherData.location}</p>
          </div>

          <div className='weather-data'>
            <div className='col'>
              <WiHumidity size={40} />
              <div className='data'>
                <span>Humidity</span>
                <p>{weatherData.humidity}%</p>
              </div>
            </div>
            <div className='col'>
              <LuWind size={40} />
              <div className='data'>
                <span>Wind Speed</span>
                <p>{weatherData.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
