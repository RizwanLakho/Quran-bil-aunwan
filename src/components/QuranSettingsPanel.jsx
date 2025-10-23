import React, { useState, useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  Settings,
  Sun,
  Moon,
  ChevronDown,
  Minus,
  Plus,
  Mic,
  FastForward,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { TranslationContext } from "../context/TranslationContext";

export default function QuranSettingsPanel() {
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  const { theme, setTheme } = useContext(ThemeContext);

  const {
    quranFont,
    setQuranFont,
    arabicSize,
    setArabicSize,
    translatorSize,
    setTranslatorSize,
  } = useContext(FontContext);

  const { translator, setTranslator, reciter, setReciter } =
    useContext(TranslationContext);

  const [playbackSpeed, setPlaybackSpeed] = useState(2);

  return (
    <div
      className={`w-full rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl overflow-hidden transition-colors duration-300
       ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-800"}`}
    >
      {/* Header */}
      <div
        className={`px-4 md:px-6 py-4 md:py-5 flex items-center gap-2 md:gap-3 ${
          theme === "dark"
            ? "bg-gradient-to-r from-gray-700 to-gray-800"
            : "bg-primary"
        }`}
      >
        <Settings className="text-white" size={20} />
        <h2 className="text-white text-lg md:text-xl font-bold">
          {t("quran_settings")}
        </h2>
      </div>

      {/* Body Content */}
      <div className="p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Theme Switcher */}
        <div>
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <Sun
              className={theme === "dark" ? "text-yellow-400" : "text-primary"}
              size={18}
            />
            <h3 className="font-bold text-sm md:text-base">{t("theme")}</h3>
          </div>
          <div
            className={`flex gap-2 p-1 rounded-full ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <button
              onClick={() => setTheme("light")}
              className={`flex-1 flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                theme === "light"
                  ? "bg-primary text-white shadow-md"
                  : theme === "dark"
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Sun size={16} />
              {t("light")}
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={`flex-1 flex items-center justify-center gap-1 md:gap-2 px-3 md:px-4 py-2 rounded-full text-sm md:text-base font-medium transition-all ${
                theme === "dark"
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              <Moon size={16} />
              {t("dark")}
            </button>
          </div>
        </div>

        {/* Language Switcher */}
        <div className="flex justify-between items-center">
          <span className="text-sm md:text-base">{t("language")}</span>
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className={`p-2 rounded text-sm md:text-base ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <option value="en">English</option>
            <option value="ur">اردو</option>
          </select>
        </div>

        {/* Quran Font */}
        <div>
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <span className="text-primary text-lg md:text-xl font-serif">
              Aa
            </span>
            <h3 className="font-bold text-sm md:text-base">
              {t("quran_font")}
            </h3>
          </div>
          <div
            className={`flex gap-1 md:gap-2 p-1 rounded-full ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <button
              onClick={() => setQuranFont("Uthmani")}
              className={`flex-1 px-2 md:px-4 py-2 rounded-full text-xs md:text-base font-medium transition-all ${
                quranFont === "Uthmani"
                  ? "bg-primary text-white shadow-md"
                  : theme === "dark"
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Uthmani
            </button>
            <button
              onClick={() => setQuranFont("IndoPak")}
              className={`flex-1 px-2 md:px-4 py-2 rounded-full text-xs md:text-base font-medium transition-all ${
                quranFont === "IndoPak"
                  ? "bg-primary text-white shadow-md"
                  : theme === "dark"
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              IndoPak
            </button>
            <button
              onClick={() => setQuranFont("Tajweed")}
              className={`flex-1 px-2 md:px-4 py-2 rounded-full text-xs md:text-base font-medium transition-all ${
                quranFont === "Tajweed"
                  ? "bg-primary text-white shadow-md"
                  : theme === "dark"
                    ? "text-gray-300 hover:bg-gray-700"
                    : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              Tajweed
            </button>
          </div>
        </div>

        {/* Translation By */}
        <div>
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <span className="text-primary text-lg md:text-xl">📋</span>
            <h3 className="font-bold text-sm md:text-base">
              {t("translation_by")}
            </h3>
          </div>
          <div className="relative">
            <select
              value={translator}
              onChange={(e) => setTranslator(e.target.value)}
              className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-xl text-sm md:text-base font-medium focus:outline-none appearance-none cursor-pointer ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <option>Dr. Mustafa Khattab</option>
              <option>Sahih International</option>
              <option>Pickthall</option>
              <option>Yusuf Ali</option>
            </select>
            <ChevronDown
              className={`absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
              size={18}
            />
          </div>
        </div>

        {/* Font Size */}
        <div>
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <span className="text-primary text-lg md:text-xl">↔️</span>
            <h3 className="font-bold text-sm md:text-base">{t("font_size")}</h3>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            {/* Arabic */}
            <div className="flex-1">
              <p
                className={`text-xs md:text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("arabic")}
              </p>
              <div
                className={`flex items-center gap-2 rounded-full p-1 ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <button
                  onClick={() => setArabicSize(Math.max(12, arabicSize - 1))}
                  className={`p-2 rounded-full transition-colors ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-white"
                  }`}
                >
                  <Minus
                    size={14}
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }
                  />
                </button>
                <span
                  className={`flex-1 text-center font-bold text-sm md:text-base ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {arabicSize}
                </span>
                <button
                  onClick={() => setArabicSize(Math.min(48, arabicSize + 1))}
                  className={`p-2 rounded-full transition-colors ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-white"
                  }`}
                >
                  <Plus
                    size={14}
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }
                  />
                </button>
              </div>
            </div>

            {/* Translator */}
            <div className="flex-1">
              <p
                className={`text-xs md:text-sm font-medium mb-2 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("translation")}
              </p>
              <div
                className={`flex items-center gap-2 rounded-full p-1 ${
                  theme === "dark" ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                <button
                  onClick={() =>
                    setTranslatorSize(Math.max(12, translatorSize - 1))
                  }
                  className={`p-2 rounded-full transition-colors ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-white"
                  }`}
                >
                  <Minus
                    size={14}
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }
                  />
                </button>
                <span
                  className={`flex-1 text-center font-bold text-sm md:text-base ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                >
                  {translatorSize}
                </span>
                <button
                  onClick={() =>
                    setTranslatorSize(Math.min(28, translatorSize + 1))
                  }
                  className={`p-2 rounded-full transition-colors ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-white"
                  }`}
                >
                  <Plus
                    size={14}
                    className={
                      theme === "dark" ? "text-gray-300" : "text-gray-600"
                    }
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Select Reciter */}
        <div>
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <Mic className="text-primary" size={18} />
            <h3 className="font-bold text-sm md:text-base">
              {t("select_reciter")}
            </h3>
          </div>
          <div className="relative">
            <select
              value={reciter}
              onChange={(e) => setReciter(e.target.value)}
              className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-xl text-sm md:text-base font-medium focus:outline-none appearance-none cursor-pointer ${
                theme === "dark"
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              <option>Mishari Rashid Al-Afasy</option>
              <option>Abdul Rahman Al-Sudais</option>
              <option>Saad Al-Ghamidi</option>
              <option>Ahmad Al-Ajmi</option>
            </select>
            <ChevronDown
              className={`absolute right-3 md:right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
              size={18}
            />
          </div>
        </div>

        {/* Playback Speed */}
        <div>
          <div className="flex items-center gap-2 mb-2 md:mb-3">
            <FastForward className="text-primary" size={18} />
            <h3 className="font-bold text-sm md:text-base">
              {t("playback_speed")}
            </h3>
          </div>
          <div
            className={`flex items-center gap-2 rounded-full p-1 w-full sm:w-48 ${
              theme === "dark" ? "bg-gray-800" : "bg-gray-100"
            }`}
          >
            <button
              onClick={() =>
                setPlaybackSpeed(Math.max(0.5, playbackSpeed - 0.25))
              }
              className={`p-2 rounded-full transition-colors ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-white"
              }`}
            >
              <Minus
                size={14}
                className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
              />
            </button>
            <span
              className={`flex-1 text-center font-bold text-sm md:text-base ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              {playbackSpeed.toFixed(2)}x
            </span>
            <button
              onClick={() =>
                setPlaybackSpeed(Math.min(3, playbackSpeed + 0.25))
              }
              className={`p-2 rounded-full transition-colors ${
                theme === "dark" ? "hover:bg-gray-700" : "hover:bg-white"
              }`}
            >
              <Plus
                size={14}
                className={theme === "dark" ? "text-gray-300" : "text-gray-600"}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
