import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { UnitProvider } from "./context/UnitContext";
import { LocationProvider } from "./context/LocationContext"; // ✅

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UnitProvider>
        <LocationProvider> {/* ✅ Now LocationSearch & SavedLocations share state */}
          <App />
        </LocationProvider>
      </UnitProvider>
    </BrowserRouter>
  </React.StrictMode>
);
