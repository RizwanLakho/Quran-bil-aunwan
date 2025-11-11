import React, { createContext, useState, useEffect } from "react";

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  // Load translator from localStorage or default to "english"
  const [translator, setTranslatorState] = useState(() => {
    const saved = localStorage.getItem("quran_translator");
    return saved || "english";
  });

  const [reciter, setReciter] = useState("Mishari Rashid Al-Afasy");
  const [showTranslation, setShowTranslation] = useState(true);

  // Persist translator selection to localStorage
  const setTranslator = (value) => {
    setTranslatorState(value);
    localStorage.setItem("quran_translator", value);
  };

  return (
    <TranslationContext.Provider
      value={{
        translator,
        setTranslator,
        reciter,
        setReciter,
        showTranslation,
        setShowTranslation,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
