import React from 'react';
import { motion } from 'framer-motion';
import { Search, Settings, Star, Navigation, Trash2 } from 'lucide-react';
import type { Location, ThemeStyles } from '../types';
import { WeatherIcons, getWeatherIconColor } from '../../weatherUtils';

interface SidebarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  savedLocations: Location[];
  fetchWeather: (city: string) => void;
  removeFromSavedLocations: (id: string) => void;
  clearAllLocations: () => void;
  handleMyLocation: () => void;
  onShowSettings: () => void;
  themeStyles: ThemeStyles;
  maxLocations: number;
}

const Sidebar: React.FC<SidebarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
  savedLocations,
  fetchWeather,
  removeFromSavedLocations,
  clearAllLocations,
  handleMyLocation,
  onShowSettings,
  themeStyles,
  maxLocations,
}) => {
  return (
    <aside className={`w-full lg:w-80 p-6 flex flex-col border-r transition-colors duration-500 ${themeStyles.border} ${themeStyles.surface}`}>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Aether</h1>
        <button 
          onClick={onShowSettings}
          className={`p-2 rounded-full hover:bg-white/10 transition-colors ${themeStyles.textSecondary}`}
        >
          <Settings size={20} />
        </button>
      </div>

      <form onSubmit={handleSearch} className="relative mb-8">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${themeStyles.textSecondary}`} size={18} />
        <input 
          type="text"
          placeholder="Search location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={`w-full pl-10 pr-4 py-3 rounded-2xl outline-none transition-all ${themeStyles.bg} focus:ring-2 focus:ring-sky-500/50`}
        />
      </form>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2">
        <div className="flex items-center justify-between mb-2">
          <h2 className={`text-xs font-bold uppercase tracking-wider ${themeStyles.textSecondary}`}>Saved Locations</h2>
          <div className="flex items-center gap-2">
            <span className={`text-xs ${themeStyles.textSecondary} px-2 py-1 rounded-lg ${themeStyles.bg}`}>
              {savedLocations.length}/{maxLocations}
            </span>
            {savedLocations.length > 0 && (
              <button
                onClick={clearAllLocations}
                className={`text-xs px-2 py-1 rounded-lg transition-colors hover:bg-red-500/10 text-red-500`}
                title="Clear all locations"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        
        {savedLocations.length === 0 && (
          <div className={`text-sm text-center py-8 px-4 ${themeStyles.textSecondary}`}>
            <Star className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p className="font-medium mb-1">No locations yet</p>
            <p className="text-xs opacity-70">
              Search for a city to automatically save it
            </p>
          </div>
        )}
        
        {savedLocations.map((loc) => {
          const Icon = WeatherIcons[loc.condition];
          const iconColor = getWeatherIconColor(loc.condition);
          return (
            <motion.div
              key={loc.id}
              whileHover={{ scale: 1.02 }}
              className={`w-full flex items-center p-4 rounded-2xl transition-all ${themeStyles.bg} border ${themeStyles.border} group relative`}
            >
              <button
                onClick={() => fetchWeather(loc.name)}
                className="flex-1 flex items-center gap-3 text-left"
              >
                <div className="flex-1">
                  <p className="font-semibold">{loc.name}</p>
                  <p className={`text-sm ${themeStyles.textSecondary}`}>{loc.condition}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-medium">{Math.round(loc.temp)}°</span>
                  <div className={`p-2 rounded-xl ${iconColor.replace('text-', 'bg-')}/10`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                </div>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromSavedLocations(loc.id);
                }}
                className={`ml-2 p-2 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 text-red-500`}
                title="Remove location"
              >
                <Trash2 size={16} />
              </button>
            </motion.div>
          );
        })}
      </div>

      <button 
        onClick={handleMyLocation}
        className="mt-6 flex items-center justify-center gap-2 py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-semibold transition-all shadow-lg shadow-sky-500/25"
      >
        <Navigation size={18} />
        <span>Use My Location</span>
      </button>
    </aside>
  );
};


export default Sidebar;
