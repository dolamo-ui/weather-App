// src/pages/Settings.tsx
// src/pages/Settings.tsx
import React from 'react';
import styles from './Settings.module.css';
import { useUnit } from '../context/UnitContext';

const Settings: React.FC = () => {
  const {
    temperatureUnit,
    setTemperatureUnit,
    windSpeedUnit,
    setWindSpeedUnit,
    theme,
    setTheme,
    notificationsEnabled,      // ✅ added
    setNotificationsEnabled    // ✅ added
  } = useUnit();

  return (
    <div className={`${styles.settingsContainer} ${theme === 'dark' ? styles.dark : ''}`}>
      <h2 className={styles.title}>Settings</h2>

      {/* Temperature Unit */}
      <div className={`${styles.settingItem} ${theme === 'dark' ? styles.dark : ''}`}>
        <div className={styles.textBlock}>
          <label className={styles.label}>Temperature Unit</label>
          <p className={`${styles.description} ${theme === 'dark' ? styles.dark : ''}`}>
            Choose between Celsius and Fahrenheit
          </p>
        </div>
        <select
          className={`${styles.select} ${theme === 'dark' ? styles.dark : ''}`}
          value={temperatureUnit}
          onChange={(e) => setTemperatureUnit(e.target.value as '°C' | '°F')}
        >
          <option value="°C">°C</option>
          <option value="°F">°F</option>
        </select>
      </div>

      {/* Wind Speed Unit */}
      <div className={`${styles.settingItem} ${theme === 'dark' ? styles.dark : ''}`}>
        <div className={styles.textBlock}>
          <label className={styles.label}>Wind Speed Unit</label>
          <p className={`${styles.description} ${theme === 'dark' ? styles.dark : ''}`}>
            Choose between km/h and mph
          </p>
        </div>
        <select
          className={`${styles.select} ${theme === 'dark' ? styles.dark : ''}`}
          value={windSpeedUnit}
          onChange={(e) => setWindSpeedUnit(e.target.value as 'km/h' | 'mph')}
        >
          <option value="km/h">km/h</option>
          <option value="mph">mph</option>
        </select>
      </div>

      {/* Theme */}
      <div className={`${styles.settingItem} ${theme === 'dark' ? styles.dark : ''}`}>
        <div className={styles.textBlock}>
          <label className={styles.label}>Theme</label>
          <p className={`${styles.description} ${theme === 'dark' ? styles.dark : ''}`}>
            Switch between Light and Dark mode
          </p>
        </div>
        <select
          className={`${styles.select} ${theme === 'dark' ? styles.dark : ''}`}
          value={theme}
          onChange={(e) => setTheme(e.target.value as 'light' | 'dark')}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      {/* Weather Notifications */}
      <div className={`${styles.settingItem} ${theme === 'dark' ? styles.dark : ''}`}>
        <div className={styles.textBlock}>
          <label className={styles.label}>Weather Notifications</label>
          <p className={`${styles.description} ${theme === 'dark' ? styles.dark : ''}`}>
            Enable or disable weather notifications
          </p>
        </div>

        <label className={styles.switch}>
          <input
            type="checkbox"
            checked={notificationsEnabled}
            onChange={() => setNotificationsEnabled(!notificationsEnabled)}
          />
          <span className={styles.slider}></span>
        </label>
      </div>
    </div>
  );
};

export default Settings;
