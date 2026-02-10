import React, { useState, useEffect, useMemo } from 'react';



import Sidebar from './components/Sidebar';
import MainDashboard from './components/MainDashboard';
import PermissionModal from './components/PermissionModal';
import SettingsModal from './components/SettingsModal';
import Toast from './components/Toast';
import LoadingScreen from './components/LoadingScreen';


import type { 
  WeatherData, 
  ForecastItem, 
  DailyForecastItem, 
  AppSettings, 
  Location,
  OpenWeatherAPIResponse,
  ForecastAPIResponse
} from './types';


import { generateInsights } from './utils/weatherUtils';
import { useLocalStorage } from './hooks/useLocalStorage';
import { usePermissions } from './hooks/usePermissions';

const API_KEY = '131f01e128b4925e8f00fe356f745551';
const MAX_SAVED_LOCATIONS = 10;

const App: React.FC = () => {
 
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [hourly, setHourly] = useState<ForecastItem[]>([]);
  const [daily, setDaily] = useState<DailyForecastItem[]>([]);
  const [insights, setInsights] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [savedLocations, setSavedLocations] = useLocalStorage<Location[]>('aether_saved_locations', []);
  const [showSettings, setShowSettings] = useState<boolean>(false);
  const [settings, setSettings] = useState<AppSettings>({
    tempUnit: 'C',
    windUnit: 'km/h',
    theme: 'dark',
    notifications: false,
  });
  const [error, setError] = useState<string>('');
  const [showPermissionPrompt, setShowPermissionPrompt] = useState<boolean>(false);

  const {
    locationPermission,
    notificationPermission,
    requestNotificationPermission: requestNotifPermission,
  } = usePermissions();

  
  const fetchWeatherByCoords = async (lat: number, lon: number): Promise<void> => {
    setLoading(true);
    setError('');
    
    try {
      const units = settings.tempUnit === 'C' ? 'metric' : 'imperial';
      
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
      );
      
      if (!currentRes.ok) throw new Error('Failed to fetch weather data');
      
      const currentData: OpenWeatherAPIResponse = await currentRes.json();
      
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}`
      );
      
      if (!forecastRes.ok) throw new Error('Failed to fetch forecast data');
      
      const forecastData: ForecastAPIResponse = await forecastRes.json();
      
      processWeatherData(currentData, forecastData);
      
      if (settings.notifications && weather) {
        const tempDiff = Math.abs(currentData.main.temp - weather.temp);
        if (tempDiff > 5) {
          showNotification(
            `Temperature Change in ${currentData.name}`,
            `Temperature has changed by ${tempDiff.toFixed(1)}°${settings.tempUnit}`
          );
        }
      }
      
    } catch (err) {
      console.error(err);
      setError('Failed to fetch weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

 
  const fetchWeather = async (cityName: string): Promise<void> => {
    setLoading(true);
    setError('');
    
    try {
      const units = settings.tempUnit === 'C' ? 'metric' : 'imperial';
      
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${units}`
      );
      
      if (!currentRes.ok) {
        if (currentRes.status === 404) {
          throw new Error('City not found');
        }
        throw new Error('Failed to fetch weather data');
      }
      
      const currentData: OpenWeatherAPIResponse = await currentRes.json();
      
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${API_KEY}&units=${units}`
      );
      
      if (!forecastRes.ok) throw new Error('Failed to fetch forecast data');
      
      const forecastData: ForecastAPIResponse = await forecastRes.json();
      
      processWeatherData(currentData, forecastData);
      
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  
  const processWeatherData = (current: OpenWeatherAPIResponse, forecast: ForecastAPIResponse): void => {
    const weatherData: WeatherData = {
      city: current.name,
      country: current.sys.country,
      temp: current.main.temp,
      feelsLike: current.main.feels_like,
      condition: current.weather[0].main,
      description: current.weather[0].description,
      humidity: current.main.humidity,
      windSpeed: current.wind.speed,
      pressure: current.main.pressure,
      visibility: current.visibility / 1000,
      sunrise: new Date(current.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      sunset: new Date(current.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    };
    
    setWeather(weatherData);
    
    
    setSavedLocations((prev: Location[]) => {
      const exists = prev.some((loc: Location) => 
        loc.name.toLowerCase() === current.name.toLowerCase()
      );
      
      if (!exists) {
        if (prev.length >= MAX_SAVED_LOCATIONS) {
          const updatedLocations = prev.slice(1);
          const newLocation: Location = {
            id: `${Date.now()}_${current.name}`,
            name: current.name,
            temp: current.main.temp,
            condition: current.weather[0].main,
          };
          return [...updatedLocations, newLocation];
        } else {
          const newLocation: Location = {
            id: `${Date.now()}_${current.name}`,
            name: current.name,
            temp: current.main.temp,
            condition: current.weather[0].main,
          };
          return [...prev, newLocation];
        }
      } else {
        return prev.map((loc: Location) => 
          loc.name.toLowerCase() === current.name.toLowerCase()
            ? { ...loc, temp: current.main.temp, condition: current.weather[0].main }
            : loc
        );
      }
    });
    
   
    const hourlyData: ForecastItem[] = forecast.list.slice(0, 10).map((item) => ({
      time: new Date(item.dt * 1000).toLocaleTimeString('en-US', { hour: 'numeric' }),
      temp: item.main.temp,
      condition: item.weather[0].main,
    }));
    
    setHourly(hourlyData);
    
    
    const dailyMap = new Map<string, {
      day: string;
      high: number;
      low: number;
      condition: string;
      temps: number[];
    }>();
    
    forecast.list.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const day = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      if (!dailyMap.has(day)) {
        dailyMap.set(day, {
          day,
          high: item.main.temp_max,
          low: item.main.temp_min,
          condition: item.weather[0].main,
          temps: [item.main.temp]
        });
      } else {
        const existing = dailyMap.get(day)!;
        existing.high = Math.max(existing.high, item.main.temp_max);
        existing.low = Math.min(existing.low, item.main.temp_min);
        existing.temps.push(item.main.temp);
      }
    });
    
    const dailyData: DailyForecastItem[] = Array.from(dailyMap.values()).slice(0, 7);
    setDaily(dailyData);
    
    const aiInsights = generateInsights(weatherData);
    setInsights(aiInsights);
  };

 
  const showNotification = (title: string, body: string): void => {
    if (Notification.permission === 'granted' && settings.notifications) {
      new Notification(title, {
        body,
        icon: '/weather-icon.png',
        badge: '/weather-badge.png',
      });
    }
  };

 
  const handleRequestLocation = async (): Promise<void> => {
    setShowPermissionPrompt(false);
    
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position: GeolocationPosition) => {
        const { latitude, longitude } = position.coords;
        await fetchWeatherByCoords(latitude, longitude);
      },
      (error: GeolocationPositionError) => {
        console.error('Geolocation error:', error);
        setLoading(false);
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            setError('Location permission denied. Please search for a city manually or enable location in your browser settings.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information unavailable. Please search for a city manually.');
            break;
          case error.TIMEOUT:
            setError('Location request timed out. Please search for a city manually.');
            break;
          default:
            setError('An unknown error occurred. Please search for a city manually.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (searchQuery.trim()) {
      fetchWeather(searchQuery);
      setSearchQuery('');
    }
  };

  const handleMyLocation = (): void => {
    if (locationPermission === 'granted') {
      handleRequestLocation();
    } else {
      setShowPermissionPrompt(true);
    }
  };

  const toggleNotifications = async (): Promise<void> => {
    if (!settings.notifications) {
      await requestNotifPermission();
      if (Notification.permission === 'granted') {
        setSettings((prev: AppSettings) => ({ ...prev, notifications: true }));
        showNotification('Weather notifications enabled!', 'You will now receive weather alerts and updates.');
      }
    } else {
      setSettings((prev: AppSettings) => ({ ...prev, notifications: false }));
    }
  };

  const removeFromSavedLocations = (id: string): void => {
    setSavedLocations((prev: Location[]) => prev.filter((loc: Location) => loc.id !== id));
  };

  const clearAllLocations = (): void => {
    if (window.confirm('Are you sure you want to remove all saved locations?')) {
      setSavedLocations([]);
    }
  };

  
  useEffect(() => {
    if (locationPermission === 'granted') {
      handleRequestLocation();
    } else {
      setShowPermissionPrompt(true);
      setLoading(false);
    }
  }, []);


  const themeStyles = useMemo(() => {
    if (settings.theme === 'dark') {
      return {
        bg: 'bg-[#121212]',
        surface: 'bg-[#1E1E1E]',
        textPrimary: 'text-white',
        textSecondary: 'text-[#B0B0B0]',
        accent: 'text-[#4FC3F7]',
        border: 'border-white/10',
      };
    }
    return {
      bg: 'bg-slate-50',
      surface: 'bg-white',
      textPrimary: 'text-slate-900',
      textSecondary: 'text-slate-500',
      accent: 'text-sky-600',
      border: 'border-slate-200',
    };
  }, [settings.theme]);

  const backgroundGradient = useMemo<string>(() => {
    if (!weather) return 'from-blue-400 to-blue-600';
    switch (weather.condition) {
      case 'Clear': return 'from-sky-400 to-blue-500';
      case 'Rain': return 'from-slate-700 to-slate-900';
      case 'Clouds': return 'from-blue-300 to-slate-400';
      case 'Thunderstorm': return 'from-indigo-900 to-slate-900';
      default: return 'from-sky-400 to-blue-500';
    }
  }, [weather]);

  if (loading && !weather) {
    return <LoadingScreen theme={settings.theme} />;
  }

  return (
    <div className={`min-h-screen transition-colors duration-500 ${themeStyles.bg} ${themeStyles.textPrimary} flex flex-col lg:flex-row overflow-hidden`}>
      
     
      <PermissionModal
        show={showPermissionPrompt}
        onClose={() => setShowPermissionPrompt(false)}
        onAllow={handleRequestLocation}
        themeStyles={themeStyles}
      />

     
      <Toast
        message={error}
        onClose={() => setError('')}
        themeStyles={themeStyles}
      />

      
      <Sidebar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        savedLocations={savedLocations}
        fetchWeather={fetchWeather}
        removeFromSavedLocations={removeFromSavedLocations}
        clearAllLocations={clearAllLocations}
        handleMyLocation={handleMyLocation}
        onShowSettings={() => setShowSettings(true)}
        themeStyles={themeStyles}
        maxLocations={MAX_SAVED_LOCATIONS}
      />

      
      <MainDashboard
        weather={weather}
        hourly={hourly}
        daily={daily}
        insights={insights}
        settings={settings}
        themeStyles={themeStyles}
        backgroundGradient={backgroundGradient}
        onEnableLocation={() => setShowPermissionPrompt(true)}
      />

    
      <SettingsModal
        show={showSettings}
        onClose={() => setShowSettings(false)}
        settings={settings}
        setSettings={setSettings}
        locationPermission={locationPermission}
        notificationPermission={notificationPermission}
        toggleNotifications={toggleNotifications}
        onRequestLocation={() => {
          setShowSettings(false);
          setShowPermissionPrompt(true);
        }}
        themeStyles={themeStyles}
      />
    </div>
  );
};


export default App;
