import React, { useEffect, useState } from 'react';
import { useUnit } from '../context/UnitContext';
import { useLocations } from '../context/LocationContext';
import styles from "./Weather.module.css";

// Weather images
import sunnyImg from '../assets/sunny.png';
import mostlySunnyImg from '../assets/mostly_sunny.png';
import partlyCloudyImg from '../assets/partly_cloudy.png';
import cloudyImg from '../assets/cloudy.png';

import rainyImg from '../assets/rainy.png';
import heavyRainImg from '../assets/heavy_rain.png';
import drizzleImg from '../assets/drizzle.png';
import lightSnowImg from '../assets/light_snow.png';
import cloudySnowImg from '../assets/cloudy_snow.png';

import thunderImg from '../assets/thunder.png';
import thunderstormImg from '../assets/thunderstorm.png';
import mistImg from '../assets/mist.png';
import fogImg from '../assets/fog.png';
import breezyImg from '../assets/breezy.png';
import strongWindImg from '../assets/strong_wind.png';
import cloudyWindyImg from '../assets/cloudy_windy.png';
import sunRainImg from '../assets/sun_rain.png';

const API_KEY = '131f01e128b4925e8f00fe356f745551';

interface WeatherData {
  temp: number;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  description: string;
}

interface ForecastData {
  time: string;
  temp: number;
  description: string;
  humidity: number;
}

const Weather: React.FC = () => {
  const { theme, temperatureUnit, windSpeedUnit } = useUnit();
  const { selectedCity } = useLocations();
  const isDarkMode = theme === 'dark';

  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState<'hourly' | 'daily'>('hourly');
  const [forecast, setForecast] = useState<ForecastData[]>([]);

  const getWeatherImage = (description: string, temp: number = 20) => {
    const desc = description.toLowerCase();
    if (desc.includes('thunderstorm') || (desc.includes('thunder') && desc.includes('rain'))) return thunderstormImg;
    if (desc.includes('thunder')) return thunderImg;
    if (desc.includes('heavy rain') || desc.includes('moderate rain')) return heavyRainImg;
    if (desc.includes('drizzle')) return drizzleImg;
    if (desc.includes('rain') && desc.includes('sun')) return sunRainImg;
    if (desc.includes('rain')) return rainyImg;
    if (desc.includes('snow') && desc.includes('cloud')) return cloudySnowImg;
    if (desc.includes('light snow')) return lightSnowImg;
    if (desc.includes('mist')) return mistImg;
    if (desc.includes('fog')) return fogImg;
    if (desc.includes('breezy')) return breezyImg;
    if (desc.includes('strong wind')) return strongWindImg;
    if (desc.includes('cloudy') && desc.includes('wind')) return cloudyWindyImg;
    if (desc.includes('mostly sunny')) return mostlySunnyImg;
    if (desc.includes('partly cloudy')) return partlyCloudyImg;
    if (desc.includes('cloud')) return cloudyImg;
    if (temp >= 25) return sunnyImg;
    return sunnyImg;
  };

  const fetchWeather = async (cityName: string) => {
    if (!cityName) return;
    setLoading(true);
    setError('');
    setWeather(null);
    setForecast([]);

    const units = temperatureUnit === '°C' ? 'metric' : 'imperial';

    try {
      // Fetch current weather
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${units}`
      );
      if (!currentRes.ok) throw new Error('City not found');
      const currentData = await currentRes.json();

      let windSpeed = currentData.wind.speed;
      if (units === 'imperial' && windSpeedUnit === 'km/h') {
        windSpeed = windSpeed * 1.60934;
      }

      setWeather({
        temp: currentData.main.temp,
        humidity: currentData.main.humidity,
        windSpeed: parseFloat(windSpeed.toFixed(1)),
        pressure: currentData.main.pressure,
        visibility: currentData.visibility,
        description: currentData.weather[0].description,
      });

      // Fetch forecast
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${units}`
      );
      if (!forecastRes.ok) throw new Error('Failed to fetch forecast');
      const forecastData = await forecastRes.json();

      let forecastList: ForecastData[] = forecastData.list.map((item: any) => ({
        time:
          view === 'hourly'
            ? new Date(item.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : new Date(item.dt * 1000).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
              }),
        temp: item.main.temp,
        description: item.weather[0].description,
        humidity: item.main.humidity,
      }));

      // Filter depending on hourly/daily
      if (view === 'daily') {
        forecastList = forecastList.filter((_, index) => index % 8 === 0);
      } else {
        forecastList = forecastList.slice(0, 5);
      }

      setForecast(forecastList);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedCity) fetchWeather(selectedCity);
  }, [selectedCity, temperatureUnit, windSpeedUnit, view]);

  return (
  <div className={`WeatherContainer ${isDarkMode ? 'dark' : 'light'}`}>
    {loading && <p className={styles.loading}>Loading weather...</p>}
    {error && <p className={styles.error}>{error}</p>}

    {weather && selectedCity && (
      <div className={`${styles.weatherContainer} ${styles.weatherCard}`}>
        <h3 className={styles.cityName}>
          {selectedCity} <span className={styles.currentLocation}>(Current Location)</span>
        </h3>

        <div className={styles.temp}>
          <img
            src={getWeatherImage(weather.description, weather.temp)}
            alt={weather.description}
            className={styles.weatherIcon}
          />
          <p>{weather.temp}{temperatureUnit}</p>
          <p className={styles.description}>{weather.description}</p>
        </div>

        <div className={styles.infoBoxes}>
          {[
            { label: 'Humidity', value: `${weather.humidity}%` },
            { label: 'Wind Speed', value: `${weather.windSpeed} ${windSpeedUnit}` },
            { label: 'Pressure', value: `${weather.pressure} hPa` },
            { label: 'Visibility', value: `${(weather.visibility / 1000).toFixed(1)} km` }
          ].map((info, i) => (
            <div key={i} className={styles.infoBox}>
              <p><strong>{info.label}:</strong> {info.value}</p>
            </div>
          ))}
        </div>

        <div className={styles.forecastCard}>
          <div className={styles.toggleButtons}>
            {['hourly', 'daily'].map((type) => (
              <button
                key={type}
                className={view === type ? styles.active : ''}
                onClick={() => setView(type as 'hourly' | 'daily')}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <div className={styles.forecast}>
            {forecast.map((f, i) => (
              <div key={i} className={styles.forecastBox}>
                <p><strong>{f.time}</strong></p>
                <img
                  src={getWeatherImage(f.description, f.temp)}
                  alt={f.description}
                  className={styles.weatherIcon}
                />
                <p>{f.temp}{temperatureUnit}</p>
                <p>{f.description}</p>
                <p>{f.humidity}%</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);
};

export default Weather;
