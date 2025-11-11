import React, { createContext, useState, useEffect } from "react";

export const NavigationModeContext = createContext();

export function NavigationModeProvider({ children }) {
  // Load saved navigation mode from localStorage
  const [navigationMode, setNavigationMode] = useState(() => {
    const saved = localStorage.getItem("quran_navigation_mode");
    return saved || "surah"; // Default to surah mode
  });

  // Save to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("quran_navigation_mode", navigationMode);
  }, [navigationMode]);

  const value = {
    navigationMode,
    setNavigationMode,
  };

  return (
    <NavigationModeContext.Provider value={value}>
      {children}
    </NavigationModeContext.Provider>
  );
}
