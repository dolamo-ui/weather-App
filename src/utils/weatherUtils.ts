import { Sun, Cloud, CloudRain, CloudSnow, CloudDrizzle, Zap } from 'lucide-react';
import type { LucideProps } from 'lucide-react';
import type { WeatherData } from '../types';

// Weather Icons Mapping
export const WeatherIcons: Record<string, React.FC<LucideProps>> = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Snow: CloudSnow,
  Drizzle: CloudDrizzle,
  Thunderstorm: Zap,
};

// Helper function to get weather icon color
export const getWeatherIconColor = (condition: string): string => {
  switch(condition) {
    case 'Clear': return 'text-yellow-400';
    case 'Clouds': return 'text-gray-400';
    case 'Rain': return 'text-blue-400';
    case 'Snow': return 'text-blue-200';
    case 'Drizzle': return 'text-blue-300';
    case 'Thunderstorm': return 'text-yellow-300';
    default: return 'text-yellow-400';
  }
};

// Generate AI insights
export const generateInsights = (data: WeatherData): string => {
  const insights: string[] = [];
  
  if (data.temp > 30) {
    insights.push(`It's quite hot in ${data.city}! Stay hydrated and seek shade when possible.`);
  } else if (data.temp < 10) {
    insights.push(`Bundle up! It's cold in ${data.city}. Don't forget your jacket.`);
  } else {
    insights.push(`Pleasant weather in ${data.city}! Perfect for outdoor activities.`);
  }
  
  if (data.humidity > 80) {
    insights.push(`High humidity levels at ${data.humidity}%. It might feel muggy.`);
  }
  
  if (data.windSpeed > 20) {
    insights.push(`Windy conditions at ${data.windSpeed} km/h. Hold onto your hat!`);
  }
  
  if (data.condition === 'Rain') {
    insights.push(`Don't forget your umbrella! Rain is expected in ${data.city}.`);
  }
  
  return insights.join(' ');
};

// Temperature conversion
export const convertTemp = (temp: number): number => {
  return Math.round(temp);
};

// Wind speed conversion
export const convertWind = (speed: number, unit: 'km/h' | 'mph'): string => {
  if (unit === 'mph') {
    return (speed * 0.621371).toFixed(1);
  }
  return speed.toFixed(1);
};