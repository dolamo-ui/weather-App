import React, { useState } from "react";
import { useLocations } from "../context/LocationContext";
import { useUnit } from "../context/UnitContext"; // ✅ get theme
import styles from "./SavedLocations.module.css";

const SavedLocations: React.FC = () => {
  const { locations, addLocation, removeLocation } = useLocations();
  const { theme } = useUnit(); // ✅ only read theme

  const [cityInput, setCityInput] = useState("");
  const [status, setStatus] = useState("Click 'My Location' to detect location");
  const [currentPlace, setCurrentPlace] = useState("");
  const [currentCity, setCurrentCity] = useState("");

  // ------------------ One-time location using OpenStreetMap ------------------
  const getLocation = () => {
    if (!navigator.geolocation) {
      setStatus("Geolocation is not supported by this browser.");
      return;
    }

    setStatus("Locating…");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`
          );
          const data = await response.json();

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.hamlet ||
            "";
          const state = data.address.state || "";

          const displayName = [city, state].filter(Boolean).join(", ");

          setStatus("✅ Location found!");
          setCurrentPlace(state);
          setCurrentCity(city);
          setCityInput(displayName);

          if (!locations.includes(displayName)) {
            addLocation(displayName);
          }
        } catch (error) {
          console.error(error);
          setStatus("⚠ Unable to fetch location name.");
        }
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setStatus("❌ User denied the request for Geolocation.");
            break;
          case error.POSITION_UNAVAILABLE:
            setStatus("⚠ Location information is unavailable.");
            break;
          case error.TIMEOUT:
            setStatus("⏳ The request to get user location timed out.");
            break;
          default:
            setStatus("⚠ An unknown error occurred.");
        }
      }
    );
  };

  // ------------------ Manual search ------------------
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const place = cityInput.trim();
    if (!place) return;

    if (!locations.includes(place)) {
      addLocation(place);
      setStatus(`Added location: ${place}`);
    } else {
      setStatus(`${place} is already in saved locations`);
    }
    setCityInput("");
  };

  // ------------------ Render ------------------
  return (
    <div className={`${styles.container} ${theme === "dark" ? styles.dark : styles.light}`}>
      <h1 className={styles.header}>Saved Locations</h1>

      {/* Search Bar */}
      <form className={styles.searchForm} onSubmit={handleSearch}>
        <input
          className={styles.searchInput}
          type="text"
          value={cityInput}
          placeholder="Enter city or place name"
          onChange={(e) => setCityInput(e.target.value)}
        />
        <button className={styles.searchButton} type="submit">
          Search
        </button>
        <button
          className={styles.currentLocationButton}
          type="button"
          onClick={getLocation}
        >
          🌍 My Location
        </button>
      </form>

      {/* Status */}
      <p className={styles.status}>{status}</p>

      {/* Display current location */}
      {currentCity || currentPlace ? (
        <p className={styles.locationName}>
          Current Location: {[currentCity, currentPlace].filter(Boolean).join(", ")}
        </p>
      ) : null}

      {/* Saved Locations */}
      {locations.length === 0 ? (
        <p className={styles.noLocations}>No saved locations yet.</p>
      ) : (
        <div className={styles.listBox}>
          <ul className={styles.list}>
            {locations.map((loc, index) => (
              <li key={index} className={styles.listItem}>
                <span>{loc}</span>
                <button className={styles.deleteButton} onClick={() => removeLocation(loc)}>
                  ✖
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SavedLocations;
