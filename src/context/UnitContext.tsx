import React, { createContext, useContext, useState } from 'react';

type UnitContextType = {
  temperatureUnit: '°C' | '°F';
  setTemperatureUnit: (unit: '°C' | '°F') => void;
  windSpeedUnit: 'km/h' | 'mph';
  setWindSpeedUnit: (unit: 'km/h' | 'mph') => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  notificationsEnabled: boolean;                   // ✅ added
  setNotificationsEnabled: (value: boolean) => void; // ✅ added
};

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export const UnitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [temperatureUnit, setTemperatureUnit] = useState<'°C' | '°F'>('°C');
  const [windSpeedUnit, setWindSpeedUnit] = useState<'km/h' | 'mph'>('km/h');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true); // ✅ default true

  // Apply theme to document body
  React.useEffect(() => {
    document.body.className = theme; // sets 'light' or 'dark' on body
  }, [theme]);

  return (
    <UnitContext.Provider
      value={{
        temperatureUnit,
        setTemperatureUnit,
        windSpeedUnit,
        setWindSpeedUnit,
        theme,
        setTheme,
        notificationsEnabled,             // ✅ added
        setNotificationsEnabled,          // ✅ added
      }}
    >
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => {
  const context = useContext(UnitContext);
  if (!context) throw new Error('useUnit must be used within a UnitProvider');
  return context;
};
