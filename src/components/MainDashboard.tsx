import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
import type { WeatherData, ForecastItem, DailyForecastItem, AppSettings, ThemeStyles } from '../types';
import CurrentWeatherCard from './Currentweathercard';
import WeatherStats from './Weatherstats';
import HourlyForecast from './Hourlyforecast';
import DailyForecast from './Dailyforecast';

interface MainDashboardProps {
  weather: WeatherData | null;
  hourly: ForecastItem[];
  daily: DailyForecastItem[];
  insights: string;
  settings: AppSettings;
  themeStyles: ThemeStyles;
  backgroundGradient: string;
  onEnableLocation: () => void;
}

const MainDashboard: React.FC<MainDashboardProps> = ({
  weather,
  hourly,
  daily,
  insights,
  settings,
  themeStyles,
  backgroundGradient,
  onEnableLocation,
}) => {
  return (
    <main className="flex-1 relative overflow-y-auto h-screen">
      {/* Dynamic Background */}
      <div className={`absolute inset-0 z-0 opacity-20 pointer-events-none bg-gradient-to-br ${backgroundGradient}`} />
      
      <div className="relative z-10 p-6 lg:p-10 max-w-6xl mx-auto space-y-8">
        
        {weather ? (
          <>
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex-1">
                <motion.div 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 mb-1"
                >
                  <MapPin size={18} className="text-sky-500" />
                  <span className={`text-sm font-medium ${themeStyles.textSecondary}`}>CURRENT LOCATION</span>
                </motion.div>
                <motion.h2 
                  initial={{ opacity: 0, y: 10 }} 
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl lg:text-5xl font-bold"
                >
                  {weather.city}, <span className="text-sky-500">{weather.country}</span>
                </motion.h2>
              </div>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-right"
              >
                <p className={`text-lg ${themeStyles.textSecondary}`}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
              </motion.div>
            </header>

            {/* Current Weather Card */}
            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <CurrentWeatherCard
                weather={weather}
                insights={insights}
                settings={settings}
                themeStyles={themeStyles}
              />

              {/* Quick Stats Grid */}
              <WeatherStats
                weather={weather}
                settings={settings}
                themeStyles={themeStyles}
              />
            </section>

            {/* Hourly Forecast */}
            <HourlyForecast
              hourly={hourly}
              settings={settings}
              themeStyles={themeStyles}
            />

            {/* Daily Forecast */}
            <DailyForecast
              daily={daily}
              settings={settings}
              themeStyles={themeStyles}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <MapPin className="w-20 h-20 text-sky-500/30 mb-6" />
            <h2 className="text-3xl font-bold mb-3">Welcome to Aether</h2>
            <p className={`text-lg mb-8 ${themeStyles.textSecondary} max-w-md`}>
              Search for a city to get started, or allow location access for automatic weather updates.
            </p>
            <button 
              onClick={onEnableLocation}
              className="px-8 py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold transition-all shadow-lg"
            >
              Enable Location
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainDashboard;