import React from 'react';
import { motion } from 'framer-motion';
import { Droplets, Wind, Gauge, Eye } from 'lucide-react';
import type { WeatherData, AppSettings, ThemeStyles } from '../types';
import { convertWind } from '../../weatherUtils';

interface WeatherStatsProps {
  weather: WeatherData;
  settings: AppSettings;
  themeStyles: ThemeStyles;
}

const WeatherStats: React.FC<WeatherStatsProps> = ({ weather, settings, themeStyles }) => {
  const stats = [
    { icon: Droplets, label: 'Humidity', value: `${weather.humidity}%`, color: 'text-blue-500' },
    { icon: Wind, label: 'Wind', value: `${convertWind(weather.windSpeed, settings.windUnit)} ${settings.windUnit}`, color: 'text-emerald-500' },
    { icon: Gauge, label: 'Pressure', value: `${weather.pressure} hPa`, color: 'text-purple-500' },
    { icon: Eye, label: 'Visibility', value: `${weather.visibility.toFixed(1)} km`, color: 'text-orange-500' },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => (
        <motion.div 
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * i }}
          className={`p-6 rounded-[2rem] ${themeStyles.surface} border ${themeStyles.border} flex flex-col items-center justify-center text-center`}
        >
          <stat.icon className={`mb-3 ${stat.color}`} size={24} />
          <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${themeStyles.textSecondary}`}>{stat.label}</p>
          <p className="text-xl font-bold">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
};


export default WeatherStats;
