import React, { useState } from "react";
import { useLocations } from "../context/LocationContext";

interface LocationSearchProps {
  onSearch: (city: string) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({ onSearch }) => {
  const [inputCity, setInputCity] = useState("");
  const { addLocation } = useLocations();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCity.trim()) return;

    onSearch(inputCity);
    addLocation(inputCity); // ✅ save city
    setInputCity("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputCity}
        onChange={(e) => setInputCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default LocationSearch;
