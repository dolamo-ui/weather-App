import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Wind, Bell, MapPin } from 'lucide-react';
import type { AppSettings, ThemeStyles } from '../types';

interface SettingsModalProps {
  show: boolean;
  onClose: () => void;
  settings: AppSettings;
  setSettings: React.Dispatch<React.SetStateAction<AppSettings>>;
  locationPermission: PermissionState;
  notificationPermission: NotificationPermission;
  toggleNotifications: () => void;
  onRequestLocation: () => void;
  themeStyles: ThemeStyles;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  show,
  onClose,
  settings,
  setSettings,
  locationPermission,
  notificationPermission,
  toggleNotifications,
  onRequestLocation,
  themeStyles,
}) => {
  const toggleTheme = (): void => {
    setSettings(prev => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className={`relative w-full max-w-md p-8 rounded-[2.5rem] ${themeStyles.surface} border ${themeStyles.border} shadow-2xl`}
          >
            <h2 className="text-2xl font-bold mb-8">Settings</h2>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sun className="text-sky-500" size={20} />
                  <div>
                    <p className="font-semibold">Temperature Unit</p>
                    <p className={`text-xs ${themeStyles.textSecondary}`}>Toggle between °C and °F</p>
                  </div>
                </div>
                <div className={`p-1 rounded-xl ${themeStyles.bg} flex`}>
                  <button 
                    onClick={() => setSettings(s => ({ ...s, tempUnit: 'C' }))}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${settings.tempUnit === 'C' ? 'bg-sky-500 text-white shadow-md' : themeStyles.textSecondary}`}
                  >°C</button>
                  <button 
                    onClick={() => setSettings(s => ({ ...s, tempUnit: 'F' }))}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${settings.tempUnit === 'F' ? 'bg-sky-500 text-white shadow-md' : themeStyles.textSecondary}`}
                  >°F</button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wind className="text-emerald-500" size={20} />
                  <div>
                    <p className="font-semibold">Wind Speed Unit</p>
                    <p className={`text-xs ${themeStyles.textSecondary}`}>Toggle between km/h and mph</p>
                  </div>
                </div>
                <div className={`p-1 rounded-xl ${themeStyles.bg} flex`}>
                  <button 
                    onClick={() => setSettings(s => ({ ...s, windUnit: 'km/h' }))}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${settings.windUnit === 'km/h' ? 'bg-emerald-500 text-white shadow-md' : themeStyles.textSecondary}`}
                  >km/h</button>
                  <button 
                    onClick={() => setSettings(s => ({ ...s, windUnit: 'mph' }))}
                    className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${settings.windUnit === 'mph' ? 'bg-emerald-500 text-white shadow-md' : themeStyles.textSecondary}`}
                  >mph</button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {settings.theme === 'dark' ? <Moon className="text-sky-400" size={20} /> : <Sun className="text-yellow-500" size={20} />}
                  <div>
                    <p className="font-semibold">Theme Mode</p>
                    <p className={`text-xs ${themeStyles.textSecondary}`}>Current: {settings.theme}</p>
                  </div>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`w-14 h-8 rounded-full ${themeStyles.bg} border ${themeStyles.border} p-1 relative flex items-center`}
                >
                  <motion.div 
                    animate={{ x: settings.theme === 'dark' ? 24 : 0 }}
                    className="w-6 h-6 rounded-full bg-sky-500 shadow-md"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="text-blue-500" size={20} />
                  <div>
                    <p className="font-semibold">Weather Notifications</p>
                    <p className={`text-xs ${themeStyles.textSecondary}`}>
                      {notificationPermission === 'denied' ? 'Permission denied' : 'Stay updated on alerts'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={toggleNotifications}
                  disabled={notificationPermission === 'denied'}
                  className={`w-14 h-8 rounded-full ${settings.notifications ? 'bg-sky-500' : themeStyles.bg} border ${themeStyles.border} p-1 relative flex items-center transition-colors ${notificationPermission === 'denied' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <motion.div 
                    animate={{ x: settings.notifications ? 24 : 0 }}
                    className="w-6 h-6 rounded-full bg-white shadow-md"
                  />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MapPin className="text-red-500" size={20} />
                  <div>
                    <p className="font-semibold">Location Access</p>
                    <p className={`text-xs ${themeStyles.textSecondary}`}>
                      Status: {locationPermission}
                    </p>
                  </div>
                </div>
                {locationPermission !== 'granted' && (
                  <button 
                    onClick={onRequestLocation}
                    className="px-4 py-2 rounded-xl bg-sky-500 text-white text-sm font-semibold hover:bg-sky-600 transition-all"
                  >
                    Enable
                  </button>
                )}
              </div>
            </div>

            <button 
              onClick={onClose}
              className="w-full mt-10 py-4 rounded-2xl bg-sky-500 hover:bg-sky-600 text-white font-bold transition-all"
            >
              Save Preferences
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SettingsModal;