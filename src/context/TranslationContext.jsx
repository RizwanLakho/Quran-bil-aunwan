import React, { createContext, useState } from "react";

export const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [translator, setTranslator] = useState("Dr. Mustafa Khattab");
  const [reciter, setReciter] = useState("Mishari Rashid Al - Afasy");
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  return (
    <TranslationContext.Provider
      value={{
        translator,
        setTranslator,
        reciter,
        setReciter,
        playbackSpeed,
        setPlaybackSpeed,
      }}
    >
      {children}
    </TranslationContext.Provider>
  );
};
