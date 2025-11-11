import React, { useState, useContext, useEffect } from "react";
import { BookOpen, Play, ChevronDown, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Listbox } from "@headlessui/react";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { TranslationContext } from "../context/TranslationContext";
import { NavigationModeContext } from "../context/NavigationModeContext";
import QuranService from "../services/QuranService";

export default function QuranReadingPage() {
  const { quranFont, arabicSize, translatorSize } = useContext(FontContext);
  const { theme } = useContext(ThemeContext);
  const { translator, reciter, showTranslation } =
    useContext(TranslationContext);
  const { navigationMode } = useContext(NavigationModeContext);
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ur";

  // Surah mode state
  const [selectedSurah, setSelectedSurah] = useState("1");
  const [selectedAyah, setSelectedAyah] = useState("1");
  const [apiSurahs, setApiSurahs] = useState([]);

  // Juz mode state
  const [selectedJuz, setSelectedJuz] = useState("1");
  const [apiJuzs, setApiJuzs] = useState([]);

  // Common state
  const [apiAyahs, setApiAyahs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch surahs or juzs based on navigation mode
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        if (navigationMode === "surah") {
          // Fetch all 114 surahs
          const response = await QuranService.getAllSurahs(114);
          console.log("Fetched surahs:", response?.data?.length || 0);
          if (response && response.data) {
            setApiSurahs(response.data);
          }
        } else if (navigationMode === "juz") {
          // Fetch all 30 juzs
          const response = await QuranService.getAllJuzs();
          console.log("Fetched juzs:", response?.data?.length || 0);
          if (response && response.data) {
            setApiJuzs(response.data);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data from server");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigationMode]);

  // Fetch ayahs when surah or juz changes
  useEffect(() => {
    const fetchAyahs = async () => {
      try {
        setLoading(true);

        if (navigationMode === "surah" && selectedSurah) {
          // Fetch ayahs by surah
          const response = await QuranService.getSurahById(selectedSurah);
          if (response && response.data && response.data.ayahs) {
            setApiAyahs(response.data.ayahs);
            // Reset to first ayah when surah changes
            if (response.data.ayahs.length > 0) {
              setSelectedAyah("1");
            }
          }
        } else if (navigationMode === "juz" && selectedJuz) {
          // Fetch ayahs by juz
          const response = await QuranService.getAyahsByJuz(selectedJuz);
          if (response && response.data) {
            setApiAyahs(response.data);
          }
        }
      } catch (err) {
        console.error("Error fetching ayahs:", err);
        setError("Failed to load ayahs");
      } finally {
        setLoading(false);
      }
    };

    fetchAyahs();
  }, [navigationMode, selectedSurah, selectedJuz]);

  // Transform API surahs to match component format
  const surahs = apiSurahs.map((surah) => ({
    number: String(surah.number),
    nameArabic: surah.name,
    nameEnglish: surah.english_name,
    nameUrdu: surah.name, // API doesn't have Urdu name, use Arabic
    ayahCount: surah.number_of_ayahs,
    revelationType: surah.revelation_type,
    englishTranslation: surah.english_name_translation,
  }));

  // Transform API juzs to match component format
  const juzs = apiJuzs.map((juz) => ({
    number: String(juz.number),
    nameArabic: `الجزء ${juz.number}`,
    nameEnglish: `Juz ${juz.number}`,
    nameUrdu: `پارہ ${juz.number}`,
  }));

  // Get current surah details
  const currentSurah =
    surahs.find((s) => s.number === selectedSurah) ||
    (surahs.length > 0 ? surahs[0] : null);

  // Get current juz details
  const currentJuz =
    juzs.find((j) => j.number === selectedJuz) ||
    (juzs.length > 0 ? juzs[0] : null);

  // Generate ayah options based on selected surah (only for surah mode)
  const ayahOptions =
    navigationMode === "surah" && currentSurah
      ? Array.from({ length: currentSurah.ayahCount }, (_, i) => ({
          value: String(i + 1),
          label: isRTL ? `آیت ${i + 1}` : `Ayah ${i + 1}`,
        }))
      : [];

  // Get the font class based on selected font
  const getFontClass = () => {
    switch (quranFont) {
      case "Uthmani":
        return "font-uthmani";
      case "IndoPak":
        return "font-indopak";
      case "Tajweed":
        return "font-tajweed";
      default:
        return "font-indopak";
    }
  };

  // Get current ayah from API data
  const getCurrentAyah = () => {
    if (!apiAyahs || apiAyahs.length === 0) {
      return null;
    }

    if (navigationMode === "surah") {
      // In surah mode, find ayah by number_in_surah
      return (
        apiAyahs.find((ayah) => ayah.number_in_surah == selectedAyah) ||
        apiAyahs[0]
      );
    } else {
      // In juz mode, return the first ayah (we'll show all ayahs in sequence)
      return apiAyahs[0];
    }
  };

  const currentAyah = getCurrentAyah();

  // Check if the selected translator uses RTL script
  const isTranslatorRTL = () => {
    return (
      translator === "urdu" || translator === "farsi" || translator === "arabic"
    );
  };

  const getTranslation = () => {
    if (!currentAyah) {
      return "Loading translation...";
    }

    // Use selected translator from context
    if (translator === "urdu" && currentAyah.urdu_text) {
      return currentAyah.urdu_text;
    }

    // Default to English translation
    return currentAyah.english_text || "Translation not available";
  };

  // Get translator name based on context selection
  const getTranslatorName = () => {
    if (translator === "urdu") {
      return "Maulana Fateh Muhammad Jalandhari";
    }
    return "Muhammad Asad";
  };

  // Get appropriate font class for translation
  const getTranslationFontClass = () => {
    if (translator === "urdu") {
      return "font-urdu";
    }
    // Add more font classes for other languages as needed
    return ""; // Default font for English
  };

  const getArabicText = () => {
    if (!currentAyah) {
      return "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
    }
    return currentAyah.text || "";
  };

  // Add safety check for rendering
  const hasData =
    navigationMode === "surah" ? currentSurah : currentJuz;

  if (!hasData && loading) {
    return (
      <div
        className={`h-full flex items-center justify-center ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-orange-50"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading Quran...</p>
        </div>
      </div>
    );
  }

  if (!hasData && !loading) {
    return (
      <div
        className={`h-full flex items-center justify-center ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-orange-50"
        }`}
      >
        <div className="text-center text-red-500">
          <p>Error loading Quran data. Please refresh the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-full flex flex-col p-2 md:p-4 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-orange-50"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col h-full space-y-2 md:space-y-4">
        {/* Motivational Card - Hidden on mobile, visible on desktop */}
        <div
          className="hidden md:block relative rounded-2xl p-6 shadow-lg overflow-hidden flex-shrink-0 bg-primary"
          style={{
            backgroundImage: "url(/bg-1.jpg)",
            backgroundSize: "contain",
            backgroundPosition: isRTL ? "left" : "right",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-primary/80"></div>

          {/* Content with relative positioning to stay above overlay */}
          <div className="relative z-10">
            {/* Quote Icon - Top right corner */}
            <div
              className="absolute -top-2 right-4 text-white/30 text-7xl font-serif"
              style={{ lineHeight: "1" }}
            >
              "
            </div>

            {/* Title with icon */}
            <div className="flex items-center gap-3 mb-3">
              <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h2 className="text-white text-xl font-bold drop-shadow-lg">
                Motivasi
              </h2>
            </div>

            <p className="text-white text-base leading-relaxed mb-3 drop-shadow-md">
              Sebaik - baik manusia diantara kamu adalah yang mempelajari
              Al-Quran dan mengajarkannya
            </p>

            <p className="text-white text-base leading-relaxed drop-shadow-md">
              Sebaik - baik manusia diantara kamu adalah yang mempelajari
              Al-Quran dan mengajarkannya
              <span className="block mt-1 text-sm opacity-90">
                (HR Bukhori)
              </span>
            </p>
          </div>
        </div>

        {/* Reading Card - Full height on mobile, flexible on desktop */}
        <div
          className={`rounded-xl md:rounded-2xl shadow-lg transition-colors duration-300 flex flex-col flex-1 overflow-hidden ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Dropdowns - Fixed Header */}
          <div
            className={`flex items-center justify-between px-3 md:px-6 py-3 md:py-4 flex-wrap gap-2 md:gap-3 flex-shrink-0 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {navigationMode === "surah" ? (
              <>
                {/* Surah Dropdown */}
                <Listbox value={selectedSurah} onChange={setSelectedSurah}>
                  <div className="relative w-full sm:w-auto sm:min-w-[200px] md:min-w-[250px]">
                    {/* Ornament on right side */}
                    <div
                      className="absolute top-1/2 -right-3 md:-right-4 transform -translate-y-1/2 z-10 pointer-events-none"
                      style={{
                        width: "30px",
                        height: "30px",
                        backgroundImage: "url(/ornament.png)",
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        opacity: 0.6,
                      }}
                    ></div>
                    <Listbox.Button
                      className={`relative w-full cursor-pointer rounded-lg md:rounded-xl border-2 border-primary py-2 md:py-2.5 text-left shadow-sm focus:outline-none transition-colors text-sm md:text-base ${
                        isRTL
                          ? "pr-3 md:pr-4 pl-7 md:pl-10"
                          : "pl-3 md:pl-4 pr-7 md:pr-10"
                      } ${
                        theme === "dark"
                          ? "bg-gray-700 text-white focus:border-primary"
                          : "bg-white text-gray-900 focus:border-primary"
                      }`}
                    >
                      <span className="block truncate font-medium">
                        {currentSurah.number}. {currentSurah.nameEnglish}
                      </span>
                      <span
                        className={`absolute inset-y-0 flex items-center pointer-events-none ${
                          isRTL ? "left-0 pl-2 md:pl-3" : "right-0 pr-2 md:pr-3"
                        }`}
                      >
                        <ChevronDown
                          className={
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }
                          size={16}
                        />
                      </span>
                    </Listbox.Button>

                    <Listbox.Options
                      className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-lg md:rounded-xl shadow-lg z-50 scrollbar-hide border-2 border-primary ${
                        theme === "dark" ? "bg-gray-700" : "bg-white"
                      }`}
                    >
                      {surahs.map((surah) => (
                        <Listbox.Option
                          key={surah.number}
                          value={surah.number}
                          className={({ active, selected }) =>
                            `relative cursor-pointer select-none py-2 md:py-2.5 px-3 md:px-4 transition-colors text-sm md:text-base ${
                              active || selected
                                ? "bg-primary text-white"
                                : theme === "dark"
                                  ? "text-white"
                                  : "text-gray-700"
                            }`
                          }
                        >
                          {({ selected }) => (
                            <div
                              className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                              <span
                                className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}
                              >
                                {surah.number}. {surah.nameEnglish}
                              </span>
                              {selected && (
                                <Check size={16} className="text-white" />
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>

                {/* Surah Name with Vector Background */}
                <div className="flex justify-center items-center flex-grow">
                  <div
                    className="relative flex items-center justify-center"
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      height: "60px",
                      backgroundImage: "url(/Vector.png)",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <h2
                      className={`text-xl md:text-2xl font-bold text-center ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                      style={{
                        fontFamily:
                          "'Amiri', 'Scheherazade New', 'Traditional Arabic', serif",
                        textShadow:
                          theme === "dark"
                            ? "0 2px 4px rgba(0,0,0,0.5)"
                            : "0 2px 4px rgba(255,255,255,0.8)",
                      }}
                    >
                      {currentSurah.nameArabic}
                    </h2>
                  </div>
                </div>

                {/* Ayah Dropdown */}
                <Listbox value={selectedAyah} onChange={setSelectedAyah}>
              <div className="relative w-full sm:w-auto sm:min-w-[140px] md:min-w-[160px]">
                {/* Ornament on left side */}
                <div
                  className="absolute top-1/2 -left-3 md:-left-4 transform -translate-y-1/2 z-10 pointer-events-none"
                  style={{
                    width: "30px",
                    height: "30px",
                    backgroundImage: "url(/ornament.png)",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    opacity: 0.6,
                  }}
                ></div>
                <Listbox.Button
                  className={`relative w-full cursor-pointer rounded-lg md:rounded-xl border-2 border-primary py-2 md:py-2.5 text-left shadow-sm focus:outline-none transition-colors text-sm md:text-base ${
                    isRTL
                      ? "pr-3 md:pr-4 pl-7 md:pl-10"
                      : "pl-3 md:pl-4 pr-7 md:pr-10"
                  } ${
                    theme === "dark"
                      ? "bg-gray-700 text-white focus:border-primary"
                      : "bg-white text-gray-900 focus:border-primary"
                  }`}
                >
                  <span className="block truncate">
                    {isRTL ? `آیت ${selectedAyah}` : `Ayah ${selectedAyah}`}
                  </span>
                  <span
                    className={`absolute inset-y-0 flex items-center pointer-events-none ${
                      isRTL ? "left-0 pl-2 md:pl-3" : "right-0 pr-2 md:pr-3"
                    }`}
                  >
                    <ChevronDown
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                      size={16}
                    />
                  </span>
                </Listbox.Button>

                <Listbox.Options
                  className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-lg md:rounded-xl shadow-lg z-50 scrollbar-hide border-2 border-primary ${
                    theme === "dark" ? "bg-gray-700" : "bg-white"
                  }`}
                >
                  {ayahOptions.map((ayah) => (
                    <Listbox.Option
                      key={ayah.value}
                      value={ayah.value}
                      className={({ active, selected }) =>
                        `relative cursor-pointer select-none py-2 md:py-2.5 px-3 md:px-4 transition-colors text-sm md:text-base ${
                          active || selected
                            ? "bg-primary text-white"
                            : theme === "dark"
                              ? "text-white"
                              : "text-gray-700"
                        }`
                      }
                    >
                      {({ selected }) => (
                        <div
                          className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                          <span
                            className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}
                          >
                            {ayah.label}
                          </span>
                          {selected && (
                            <Check size={16} className="text-white" />
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </div>
            </Listbox>
              </>
            ) : (
              <>
                {/* Juz Mode UI */}
                <Listbox value={selectedJuz} onChange={setSelectedJuz}>
                  <div className="relative w-full sm:w-auto sm:min-w-[200px] md:min-w-[250px]">
                    <Listbox.Button
                      className={`relative w-full cursor-pointer rounded-lg md:rounded-xl border-2 border-primary py-2 md:py-2.5 text-left shadow-sm focus:outline-none transition-colors text-sm md:text-base ${
                        isRTL
                          ? "pr-3 md:pr-4 pl-7 md:pl-10"
                          : "pl-3 md:pl-4 pr-7 md:pr-10"
                      } ${
                        theme === "dark"
                          ? "bg-gray-700 text-white focus:border-primary"
                          : "bg-white text-gray-900 focus:border-primary"
                      }`}
                    >
                      <span className="block truncate font-medium">
                        {currentJuz?.nameEnglish || "Juz 1"}
                      </span>
                      <span
                        className={`absolute inset-y-0 flex items-center pointer-events-none ${
                          isRTL ? "left-0 pl-2 md:pl-3" : "right-0 pr-2 md:pr-3"
                        }`}
                      >
                        <ChevronDown
                          className={
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }
                          size={16}
                        />
                      </span>
                    </Listbox.Button>

                    <Listbox.Options
                      className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-lg md:rounded-xl shadow-lg z-50 scrollbar-hide border-2 border-primary ${
                        theme === "dark" ? "bg-gray-700" : "bg-white"
                      }`}
                    >
                      {juzs.map((juz) => (
                        <Listbox.Option
                          key={juz.number}
                          value={juz.number}
                          className={({ active, selected }) =>
                            `relative cursor-pointer select-none py-2 md:py-2.5 px-3 md:px-4 transition-colors text-sm md:text-base ${
                              active || selected
                                ? "bg-primary text-white"
                                : theme === "dark"
                                  ? "text-white"
                                  : "text-gray-700"
                            }`
                          }
                        >
                          {({ selected }) => (
                            <div
                              className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                              <span
                                className={`block truncate ${selected ? "font-semibold" : "font-normal"}`}
                              >
                                {juz.nameEnglish}
                              </span>
                              {selected && (
                                <Check size={16} className="text-white" />
                              )}
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>

                {/* Juz Name with Vector Background */}
                <div className="flex justify-center items-center flex-grow">
                  <div
                    className="relative flex items-center justify-center"
                    style={{
                      width: "100%",
                      maxWidth: "300px",
                      height: "60px",
                      backgroundImage: "url(/Vector.png)",
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <h2
                      className={`text-xl md:text-2xl font-bold text-center ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                      style={{
                        fontFamily:
                          "'Amiri', 'Scheherazade New', 'Traditional Arabic', serif",
                        textShadow:
                          theme === "dark"
                            ? "0 2px 4px rgba(0,0,0,0.5)"
                            : "0 2px 4px rgba(255,255,255,0.8)",
                      }}
                    >
                      {currentJuz?.nameArabic || "الجزء ١"}
                    </h2>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Scrollable Content Area - Optimized for mobile */}
          <div className="flex-1 overflow-y-auto px-3 md:px-6 py-3 md:pb-4">
            {/* Bismillah */}
            <div className="text-center mb-4 md:mb-6">
              <p
                className={`${getFontClass()} ${
                  theme === "dark" ? "text-primary" : "text-primary"
                }`}
                style={{ fontSize: `${Math.max(20, arabicSize - 4)}px` }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>

            {loading ? (
              <div className="text-center py-8">
                <p
                  className={
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }
                >
                  Loading...
                </p>
              </div>
            ) : navigationMode === "surah" ? (
              <>
                {/* Surah Mode: Show single ayah */}
                <div className="text-right leading-loose mb-4 md:mb-6 space-y-3 md:space-y-4">
                  <p
                    className={`${getFontClass()} ${
                      theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                    style={{
                      fontSize: `${Math.max(18, arabicSize - 2)}px`,
                      lineHeight: "1.8",
                    }}
                  >
                    {getArabicText()}
                  </p>
                </div>

                {/* Translation Section - Only show if showTranslation is true */}
                {showTranslation && (
                  <div
                    className={`mb-4 md:mb-6 p-3 md:p-4 rounded-lg md:rounded-xl ${
                      theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
                    }`}
                  >
                    <h4
                      className={`font-bold mb-2 text-sm md:text-base ${
                        isTranslatorRTL()
                          ? `${getTranslationFontClass()} text-right`
                          : "text-left"
                      } ${theme === "dark" ? "text-primary" : "text-primary"}`}
                    >
                      {getTranslatorName()}
                    </h4>
                    <p
                      className={`leading-relaxed ${
                        isTranslatorRTL()
                          ? `${getTranslationFontClass()} text-right`
                          : "text-left"
                      } ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                      style={{
                        fontSize: `${Math.max(14, translatorSize - 2)}px`,
                        direction: isTranslatorRTL() ? "rtl" : "ltr",
                      }}
                    >
                      {getTranslation()}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Juz Mode: Show all ayahs in sequence */}
                {apiAyahs && apiAyahs.length > 0 ? (
                  <div className="space-y-6 md:space-y-8">
                    {apiAyahs.map((ayah, index) => (
                      <div key={ayah.id || index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
                        {/* Ayah number badge */}
                        <div className="flex justify-center mb-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            theme === "dark" ? "bg-primary/20 text-primary" : "bg-primary/10 text-primary"
                          }`}>
                            Ayah {ayah.ayah_number}
                          </span>
                        </div>

                        {/* Arabic Text */}
                        <div className="text-right leading-loose mb-4">
                          <p
                            className={`${getFontClass()} ${
                              theme === "dark" ? "text-gray-200" : "text-gray-800"
                            }`}
                            style={{
                              fontSize: `${Math.max(18, arabicSize - 2)}px`,
                              lineHeight: "1.8",
                            }}
                          >
                            {ayah.text}
                          </p>
                        </div>

                        {/* Translation */}
                        {showTranslation && (
                          <div
                            className={`p-3 md:p-4 rounded-lg md:rounded-xl ${
                              theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
                            }`}
                          >
                            <p
                              className={`leading-relaxed ${
                                translator === "urdu"
                                  ? `${getTranslationFontClass()} text-right`
                                  : "text-left"
                              } ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}
                              style={{
                                fontSize: `${Math.max(14, translatorSize - 2)}px`,
                                direction: translator === "urdu" ? "rtl" : "ltr",
                              }}
                            >
                              {translator === "urdu" && ayah.urdu_text
                                ? ayah.urdu_text
                                : ayah.english_text || "Translation not available"}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                      No ayahs found for this Juz
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Fixed Footer with Controls - Mobile optimized */}
          <div
            className={`flex-shrink-0 border-t px-3 md:px-6 py-3 md:py-4 ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {/* Bottom Controls */}
            <div
              className={`flex items-center justify-between flex-wrap gap-2 md:gap-3 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {/* Continue Reading Button */}
              <button
                className={`flex items-center gap-2 bg-primary hover:bg-orange-500 text-white font-medium px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-lg md:rounded-xl transition-colors shadow-md ${
                  isRTL ? "flex-row-reverse font-urdu" : ""
                }`}
              >
                <BookOpen size={18} className="md:w-5 md:h-5" />
                <span>{t("continue_reading")}</span>
              </button>

              {/* Audio Controls */}
              <div
                className={`flex items-center gap-2 md:gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {/* Reciter Selector - Hidden on smallest mobile */}
                <div className="hidden sm:block relative">
                  <select
                    value={reciter}
                    disabled
                    className={`appearance-none border-2 rounded-lg md:rounded-xl px-3 md:px-4 py-2 md:py-2.5 font-medium text-xs md:text-sm focus:outline-none cursor-not-allowed transition-colors ${
                      isRTL
                        ? "pr-3 md:pr-4 pl-7 md:pl-10 text-right"
                        : "pr-7 md:pr-10 pl-3 md:pl-4"
                    } ${
                      theme === "dark"
                        ? "bg-gray-700 border-gray-600 text-white opacity-75"
                        : "bg-white border-gray-200 text-gray-700 opacity-75"
                    }`}
                  >
                    <option>{reciter}</option>
                  </select>
                  <ChevronDown
                    className={`absolute top-1/2 -translate-y-1/2 pointer-events-none ${
                      isRTL ? "left-2 md:left-3" : "right-2 md:right-3"
                    } ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                    size={14}
                  />
                </div>

                {/* Play Button */}
                <button className="bg-primary hover:bg-orange-500 text-white p-2.5 md:p-3 rounded-full transition-colors shadow-md">
                  <Play size={18} className="md:w-5 md:h-5" fill="white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
