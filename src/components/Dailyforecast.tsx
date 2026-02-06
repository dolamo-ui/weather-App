import React from 'react';
import { motion } from 'framer-motion';
import { Cloud } from 'lucide-react';
import type { DailyForecastItem, AppSettings, ThemeStyles } from '../../types';
import { WeatherIcons, getWeatherIconColor, convertTemp } from '../../weatherUtils';

interface DailyForecastProps {
  daily: DailyForecastItem[];
  settings: AppSettings;
  themeStyles: ThemeStyles;
}

const DailyForecast: React.FC<DailyForecastProps> = ({ daily,  themeStyles }) => {
  return (
    <section className="space-y-6">
      <h3 className="text-xl font-bold">7-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {daily.map((item, i) => {
          const Icon = WeatherIcons[item.condition] || Cloud;
          const iconColor = getWeatherIconColor(item.condition);
          return (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className={`p-6 rounded-[2rem] ${themeStyles.surface} border ${themeStyles.border} flex items-center justify-between group hover:shadow-lg transition-all`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl ${iconColor.replace('text-', 'bg-')}/10`}>
                  <Icon className={`w-8 h-8 ${iconColor}`} />
                </div>
                <div>
                  <p className="font-bold">{item.day}</p>
                  <p className={`text-xs ${themeStyles.textSecondary}`}>{item.condition}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">{convertTemp(item.high)}°</p>
                <p className={`text-sm ${themeStyles.textSecondary}`}>{convertTemp(item.low)}°</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default DailyForecast;