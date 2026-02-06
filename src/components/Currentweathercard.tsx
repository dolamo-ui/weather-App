import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun } from 'lucide-react';
import type { WeatherData, AppSettings, ThemeStyles } from '../../types';
import { WeatherIcons, getWeatherIconColor, convertTemp } from '../../weatherUtils';

interface CurrentWeatherCardProps {
  weather: WeatherData;
  insights: string;
  settings: AppSettings;
  themeStyles: ThemeStyles;
}

const CurrentWeatherCard: React.FC<CurrentWeatherCardProps> = ({
  weather,
  insights,
  settings,
  themeStyles,
}) => {
  const WeatherIcon = WeatherIcons[weather.condition] || Sun;
  const iconColor = getWeatherIconColor(weather.condition);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`lg:col-span-2 p-8 rounded-[2.5rem] ${themeStyles.surface} border ${themeStyles.border} shadow-xl relative overflow-hidden`}
    >
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <WeatherIcon className={`w-32 h-32 drop-shadow-glow ${iconColor}`} />
          <div>
            <h3 className="text-7xl font-bold tracking-tighter">
              {convertTemp(weather.temp)}°<span className="text-sky-500/50">{settings.tempUnit}</span>
            </h3>
            <p className={`text-xl ${themeStyles.textSecondary} capitalize`}>{weather.description}</p>
          </div>
        </div>
        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
          <div className={`px-4 py-2 rounded-full ${themeStyles.bg} border ${themeStyles.border} flex items-center gap-2`}>
            <Sun size={14} className="text-yellow-500" />
            <span className="text-sm font-medium">Feels like {convertTemp(weather.feelsLike)}°</span>
          </div>
          <div className="mt-4 flex gap-4">
            <div className="text-center">
              <p className={`text-xs ${themeStyles.textSecondary}`}>Sunrise</p>
              <p className="font-semibold">{weather.sunrise}</p>
            </div>
            <div className="text-center">
              <p className={`text-xs ${themeStyles.textSecondary}`}>Sunset</p>
              <p className="font-semibold">{weather.sunset}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* AI Insights Bar */}
      <AnimatePresence mode="wait">
        {insights && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-10 p-4 rounded-2xl bg-sky-500/5 border border-sky-500/20 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white flex-shrink-0">
              <Sun size={16} />
            </div>
            <p className="text-sm italic leading-relaxed">{insights}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CurrentWeatherCard;