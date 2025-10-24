import React, { createContext, useState } from "react";

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [translator, setTranslator] = useState("Dr. Mustafa Khattab");
  const [reciter, setReciter] = useState("Mishari Rashid Al-Afasy");
  const [showTranslation, setShowTranslation] = useState(true);

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
