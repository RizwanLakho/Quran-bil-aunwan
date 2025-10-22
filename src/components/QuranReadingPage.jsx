import React, { useState, useContext } from "react";
import { BookOpen, Play, ChevronDown, Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Listbox } from "@headlessui/react";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { TranslationContext } from "../context/TranslationContext";

export default function QuranReadingPage() {
  const { quranFont, arabicSize, translatorSize } = useContext(FontContext);
  const { theme } = useContext(ThemeContext);
  const { translator, reciter } = useContext(TranslationContext);
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ur";

  const [selectedSurah, setSelectedSurah] = useState("2");
  const [selectedAyah, setSelectedAyah] = useState("4");

  // Surah List - First 10 Surahs as example
  const surahs = [
    {
      number: "1",
      nameArabic: "الفاتحة",
      nameEnglish: "Al-Fatihah",
      nameUrdu: "الفاتحہ",
      ayahCount: 7,
    },
    {
      number: "2",
      nameArabic: "البقرة",
      nameEnglish: "Al-Baqarah",
      nameUrdu: "البقرہ",
      ayahCount: 286,
    },
    {
      number: "3",
      nameArabic: "آل عمران",
      nameEnglish: "Ali 'Imran",
      nameUrdu: "آل عمران",
      ayahCount: 200,
    },
    {
      number: "4",
      nameArabic: "النساء",
      nameEnglish: "An-Nisa",
      nameUrdu: "النساء",
      ayahCount: 176,
    },
    {
      number: "5",
      nameArabic: "المائدة",
      nameEnglish: "Al-Ma'idah",
      nameUrdu: "المائدہ",
      ayahCount: 120,
    },
    {
      number: "6",
      nameArabic: "الأنعام",
      nameEnglish: "Al-An'am",
      nameUrdu: "الانعام",
      ayahCount: 165,
    },
    {
      number: "7",
      nameArabic: "الأعراف",
      nameEnglish: "Al-A'raf",
      nameUrdu: "الاعراف",
      ayahCount: 206,
    },
    {
      number: "8",
      nameArabic: "الأنفال",
      nameEnglish: "Al-Anfal",
      nameUrdu: "الانفال",
      ayahCount: 75,
    },
    {
      number: "9",
      nameArabic: "التوبة",
      nameEnglish: "At-Tawbah",
      nameUrdu: "التوبہ",
      ayahCount: 129,
    },
    {
      number: "10",
      nameArabic: "يونس",
      nameEnglish: "Yunus",
      nameUrdu: "یونس",
      ayahCount: 109,
    },
  ];

  // Get current surah details
  const currentSurah =
    surahs.find((s) => s.number === selectedSurah) || surahs[1];

  // Generate ayah options based on selected surah
  const ayahOptions = Array.from(
    { length: currentSurah.ayahCount },
    (_, i) => ({
      value: String(i + 1),
      label: isRTL ? `آیت ${i + 1}` : `Ayah ${i + 1}`,
    }),
  );

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

  const getTranslation = () => {
    const translations = {
      "Dr. Mustafa Khattab":
        "Alif-Lãm-Mĩm. This is the Book! There is no doubt about it—a guide for those mindful ˹of Allah˺...",
      "Sahih International":
        "Alif, Lam, Meem. This is the Book about which there is no doubt, a guidance for those conscious of Allah...",
      Pickthall:
        "Alif. Lam. Mim. This is the Scripture whereof there is no doubt, a guidance unto those who ward off (evil)...",
      "Yusuf Ali":
        "A.L.M. This is the Book; in it is guidance sure, without doubt, to those who fear Allah...",
    };

    return translations[translator] || translations["Dr. Mustafa Khattab"];
  };

  return (
    <div
      className={`h-full flex flex-col p-4 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-orange-50"
      }`}
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col  h-full space-y-4 ">
        {/* Motivational Card - Fixed */}
        <div
          className="relative rounded-2xl p-6 shadow-lg overflow-hidden flex-shrink-0 bg-primary "
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

        {/* Reading Card - Flexible with internal scroll */}
        <div
          className={`rounded-2xl shadow-lg transition-colors duration-300 flex flex-col flex-1 overflow-hidden ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Dropdowns - Fixed Header */}
          <div
            className={`flex items-center justify-between px-6 py-4 flex-wrap gap-3 flex-shrink-0 ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            {/* Surah Selector with Headless UI */}
            <Listbox
              value={selectedSurah}
              onChange={(value) => {
                setSelectedSurah(value);
                setSelectedAyah("1");
              }}
            >
              <div className="relative">
                <Listbox.Button
                  className={`relative border-2 rounded-xl px-4 py-2.5 font-medium focus:outline-none focus:border-primary cursor-pointer transition-colors ${
                    isRTL ? "pr-4 pl-10 text-right" : "pr-10 pl-4"
                  } ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="block truncate">
                    {currentSurah.number}.{" "}
                    {isRTL ? currentSurah.nameUrdu : currentSurah.nameEnglish}
                  </span>
                  <span
                    className={`absolute inset-y-0 flex items-center pointer-events-none ${
                      isRTL ? "left-0 pl-3" : "right-0 pr-3"
                    }`}
                  >
                    <ChevronDown
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                      size={18}
                    />
                  </span>
                </Listbox.Button>

                <Listbox.Options
                  className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-xl shadow-lg z-50 scrollbar-hide border-2 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {surahs.map((surah) => (
                    <Listbox.Option
                      key={surah.number}
                      value={surah.number}
                      className={({ active, selected }) =>
                        `relative cursor-pointer select-none py-2.5 px-4 transition-colors ${
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
                            {surah.number}.{" "}
                            {isRTL ? surah.nameUrdu : surah.nameEnglish}
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

            {/* Surah Title */}
            <div className="text-center">
              <h3 className="text-primary text-2xl font-bold font-arabic">
                {currentSurah.nameArabic}
              </h3>
              <p
                className={`text-sm ${isRTL ? "font-urdu" : ""} ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                {isRTL ? currentSurah.nameUrdu : currentSurah.nameEnglish}
              </p>
            </div>

            {/* Ayah Selector with Headless UI */}
            <Listbox value={selectedAyah} onChange={setSelectedAyah}>
              <div className="relative">
                <Listbox.Button
                  className={`relative border-2 rounded-xl px-4 py-2.5 font-medium focus:outline-none focus:border-primary cursor-pointer transition-colors ${
                    isRTL ? "pr-4 pl-10 text-right" : "pr-10 pl-4"
                  } ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white hover:bg-gray-600"
                      : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <span className="block truncate">
                    {isRTL ? `آیت ${selectedAyah}` : `Ayah ${selectedAyah}`}
                  </span>
                  <span
                    className={`absolute inset-y-0 flex items-center pointer-events-none ${
                      isRTL ? "left-0 pl-3" : "right-0 pr-3"
                    }`}
                  >
                    <ChevronDown
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                      size={18}
                    />
                  </span>
                </Listbox.Button>

                <Listbox.Options
                  className={`absolute mt-1 max-h-60 w-full overflow-auto rounded-xl shadow-lg z-50 scrollbar-hide border-2 ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-white border-gray-200"
                  }`}
                >
                  {ayahOptions.map((ayah) => (
                    <Listbox.Option
                      key={ayah.value}
                      value={ayah.value}
                      className={({ active, selected }) =>
                        `relative cursor-pointer select-none py-2.5 px-4 transition-colors ${
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
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto px-6 pb-4">
            {/* Bismillah */}
            <div className="text-center mb-6">
              <p
                className={`${getFontClass()} ${
                  theme === "dark" ? "text-primary" : "text-primary"
                }`}
                style={{ fontSize: `${arabicSize}px` }}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </div>

            {/* Arabic Text */}
            <div className="text-right leading-loose mb-6 space-y-4">
              <p
                className={`${getFontClass()} ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
                style={{ fontSize: `${arabicSize}px` }}
              >
                الم ۝ ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى
                لِّلْمُتَّقِينَ ۝ الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ
                الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ ۝ وَالَّذِينَ
                يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ
                وَبِالْآخِرَةِ هُمْ يُوقِنُونَ ۝ أُولَٰئِكَ عَلَىٰ هُدًى مِّن
                رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ ۝
              </p>
              <p
                className={`${getFontClass()} ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
                style={{ fontSize: `${arabicSize}px`, lineHeight: "2" }}
              >
                إِنَّ الَّذِينَ كَفَرُوا سَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ
                لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ ۝ خَتَمَ اللَّهُ عَلَىٰ
                قُلُوبِهِمْ وَعَلَىٰ سَمْعِهِمْ ۖ وَعَلَىٰ أَبْصَارِهِمْ
                غِشَاوَةٌ ۖ وَلَهُمْ عَذَابٌ عَظِيمٌ ۝ وَمِنَ النَّاسِ مَن
                يَقُولُ آمَنَّا بِاللَّهِ وَبِالْيَوْمِ الْآخِرِ وَمَا هُم
                بِمُؤْمِنِينَ ۝
              </p>
              <p
                className={`${getFontClass()} ${
                  theme === "dark" ? "text-gray-200" : "text-gray-800"
                }`}
                style={{ fontSize: `${arabicSize}px`, lineHeight: "2" }}
              >
                يُخَادِعُونَ اللَّهَ وَالَّذِينَ آمَنُوا وَمَا يَخْدَعُونَ
                إِلَّا أَنفُسَهُمْ وَمَا يَشْعُرُونَ ۝ فِي قُلُوبِهِم مَّرَضٌ
                فَزَادَهُمُ اللَّهُ مَرَضًا ۖ وَلَهُمْ عَذَابٌ أَلِيمٌ بِمَا
                كَانُوا يَكْذِبُونَ ۝
              </p>
            </div>

            {/* Translation Section */}
            <div
              className={`mb-6 p-4 rounded-xl ${
                theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
              }`}
            >
              <h4
                className={`font-bold mb-2 ${isRTL ? "font-urdu text-right" : ""} ${
                  theme === "dark" ? "text-primary" : "text-primary"
                }`}
              >
                {t("translation_by")} {translator}
              </h4>
              <p
                className={`leading-relaxed ${isRTL ? "text-right" : ""} ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
                style={{ fontSize: `${translatorSize}px` }}
              >
                {getTranslation()}
              </p>
            </div>
          </div>

          {/* Fixed Footer with Controls */}
          <div
            className={`flex-shrink-0 border-t px-6 py-4 ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            {/* Bottom Controls */}
            <div
              className={`flex items-center justify-between flex-wrap gap-3 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {/* Continue Reading Button */}
              <button
                className={`flex items-center gap-2 bg-primary hover:bg-orange-500 text-white font-medium px-6 py-3 rounded-xl transition-colors shadow-md ${
                  isRTL ? "flex-row-reverse font-urdu" : ""
                }`}
              >
                <BookOpen size={20} />
                <span>{t("continue_reading")}</span>
              </button>

              {/* Audio Controls */}
              <div
                className={`flex items-center gap-3 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                {/* Reciter Selector */}
                <div className="relative">
                  <select
                    value={reciter}
                    disabled
                    className={`appearance-none border-2 rounded-xl px-4 py-2.5 font-medium text-sm focus:outline-none cursor-not-allowed transition-colors ${
                      isRTL ? "pr-4 pl-10 text-right" : "pr-10 pl-4"
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
                      isRTL ? "left-3" : "right-3"
                    } ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}
                    size={16}
                  />
                </div>

                {/* Play Button */}
                <button className="bg-primary hover:bg-orange-500 text-white p-3 rounded-full transition-colors shadow-md">
                  <Play size={20} fill="white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
