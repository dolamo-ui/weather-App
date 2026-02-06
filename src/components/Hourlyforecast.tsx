import React from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';
import type { ForecastItem, AppSettings, ThemeStyles } from '../types';
import { WeatherIcons, getWeatherIconColor, convertTemp } from '../utils/weatherUtils';

interface HourlyForecastProps {
  hourly: ForecastItem[];
  settings: AppSettings;
  themeStyles: ThemeStyles;
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourly,  themeStyles }) => {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold">Hourly Forecast</h3>
      </div>
      
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
        {hourly.map((item, i) => {
          const Icon = WeatherIcons[item.condition] || Cloud;
          const iconColor = getWeatherIconColor(item.condition);
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex-shrink-0 w-32 p-6 rounded-[2rem] ${themeStyles.surface} border ${themeStyles.border} text-center group hover:border-sky-500/50 transition-all`}
            >
              <p className={`text-sm font-medium mb-4 ${themeStyles.textSecondary}`}>{item.time}</p>
              <Icon className={`w-10 h-10 mx-auto ${iconColor} mb-4 transition-transform group-hover:scale-110`} />
              <p className="text-xl font-bold">{convertTemp(item.temp)}°</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default HourlyForecast;