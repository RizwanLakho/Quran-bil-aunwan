import React, { createContext, useState } from "react";

export const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [quranFont, setQuranFont] = useState("IndoPak");
  const [arabicSize, setArabicSize] = useState(16);
  const [translatorSize, setTranslatorSize] = useState(16);

  return (
    <FontContext.Provider
      value={{
        quranFont,
        setQuranFont,
        arabicSize,
        setArabicSize,
        translatorSize,
        setTranslatorSize,
      }}
    >
      {children}
    </FontContext.Provider>
  );
};
