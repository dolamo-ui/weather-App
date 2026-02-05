import type { LucideProps } from 'lucide-react';

export interface WeatherData {
  city: string;
  country: string;
  temp: number;
  feelsLike: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  pressure: number;
  visibility: number;
  sunrise: string;
  sunset: string;
}

export interface ForecastItem {
  time: string;
  temp: number;
  condition: string;
}

export interface DailyForecastItem {
  day: string;
  high: number;
  low: number;
  condition: string;
}

export interface AppSettings {
  tempUnit: 'C' | 'F';
  windUnit: 'km/h' | 'mph';
  theme: 'light' | 'dark';
  notifications: boolean;
}

export interface Location {
  id: string;
  name: string;
  temp: number;
  condition: string;
}

export interface ThemeStyles {
  bg: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  border: string;
}

export interface StatItem {
  icon: React.FC<LucideProps>;
  label: string;
  value: string;
  color: string;
}

export interface OpenWeatherAPIResponse {
  name: string;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    temp_max: number;
    temp_min: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
}

export interface ForecastAPIResponse {
  list: Array<{
    dt: number;
    main: {
      temp: number;
      temp_max: number;
      temp_min: number;
    };
    weather: Array<{
      main: string;
    }>;
  }>;
}