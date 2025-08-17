import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Home.module.css";
import "../index.css";
import bannerLight from "../assets/image-light.png";
import bannerDark from "../assets/image-dark.png";
import { useUnit } from "../context/UnitContext";

// Font Awesome imports
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faSun, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Home: React.FC = () => {
  const { theme } = useUnit();
  const bannerImage = theme === "dark" ? bannerDark : bannerLight;

  return (
    <div className={`${styles.weatherContainer} ${theme === "dark" ? styles.dark : ""}`}>
      <header className={styles.header}>
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            <img src={bannerImage} alt="Weather Background" />
            <div className={styles.centeredText}>
              Forecast Fiesta<br />
              <span className={styles.subtitle}>
                Your personal weather companion
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Centered Tabs */}
      <div className={styles.tabsWrapper}>
        <div className={styles.tabs}>
          <NavLink
            to="/weather"
            className={({ isActive }) =>
              `${styles.tabTrigger} ${isActive ? styles.activeTab : ""}`
            }
          >
            <FontAwesomeIcon icon={faSun} /> Weather
          </NavLink>

          <NavLink
            to="/locations"
            className={({ isActive }) =>
              `${styles.tabTrigger} ${isActive ? styles.activeTab : ""}`
            }
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Locations
          </NavLink>

          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `${styles.tabTrigger} ${isActive ? styles.activeTab : ""}`
            }
          >
            <FontAwesomeIcon icon={faGear} /> Settings
          </NavLink>
        </div>
      </div>

      {/* Render Route Content */}
      <div className={styles.tabContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
