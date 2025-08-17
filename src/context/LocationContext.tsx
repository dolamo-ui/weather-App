import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";



interface LocationContextType {
  locations: string[];
  addLocation: (city: string) => void;
  removeLocation: (city: string) => void;
  selectedCity: string | null;
  setSelectedCity: (city: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [locations, setLocations] = useState<string[]>(() => {
    // Load saved locations from localStorage
    const saved = localStorage.getItem("locations");
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedCity, setSelectedCity] = useState<string | null>(() => {
    // Load saved selected city from localStorage
    return localStorage.getItem("selectedCity") || null;
  });

  // Save locations to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("locations", JSON.stringify(locations));
  }, [locations]);

  // Save selected city to localStorage whenever it changes
  useEffect(() => {
    if (selectedCity) {
      localStorage.setItem("selectedCity", selectedCity);
    } else {
      localStorage.removeItem("selectedCity");
    }
  }, [selectedCity]);

  const addLocation = (city: string) => {
    if (!locations.includes(city)) {
      setLocations((prev) => [...prev, city]);
    }
    setSelectedCity(city);
  };

  const removeLocation = (city: string) => {
    setLocations((prev) => prev.filter((loc) => loc !== city));
    if (selectedCity === city) {
      setSelectedCity(null);
    }
  };

  return (
    <LocationContext.Provider
      value={{ locations, addLocation, removeLocation, selectedCity, setSelectedCity }}
    >
      {children}
    </LocationContext.Provider>
  );
};

export const useLocations = () => {
  const context = useContext(LocationContext);
  if (!context) throw new Error("useLocations must be used within a LocationProvider");
  return context;
};
