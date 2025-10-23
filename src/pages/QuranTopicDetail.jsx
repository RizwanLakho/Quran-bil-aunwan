import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Heart,
  Share2,
  Bookmark,
  MoreVertical,
  Volume2,
  ChevronDown,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

export default function QuranTopicDetail() {
  const { subtopic } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ur" || i18n.language === "ar";

  const [selectedVerse, setSelectedVerse] = useState(2);
  const [activeVerse, setActiveVerse] = useState(2);
  const [likedVerses, setLikedVerses] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVerseDropdownOpen, setIsVerseDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const verseDropdownRef = useRef(null);
  const verseRefs = useRef({});

  // All available subtopics
  const allSubtopics = [
    {
      id: "names-of-allah",
      titleEn: "Names of Allah",
      arabicName: "أسماء الله",
      chapter: "Tawheed",
      totalAyats: 34,
      ahadith: 20,
    },
    {
      id: "Attributes",
      titleEn: "Attributes",
      arabicName: "صفات الله",
      chapter: "Aqeedah",
      totalAyats: 28,
      ahadith: 15,
    },
    {
      id: "Worship",
      titleEn: "Worship",
      arabicName: "العبادة",
      chapter: "Ibadat",
      totalAyats: 42,
      ahadith: 25,
    },
    {
      id: "prophets",
      titleEn: "Prophets",
      arabicName: "الأنبياء",
      chapter: "Nabuwat",
      totalAyats: 56,
      ahadith: 30,
    },
    {
      id: "prophet-muhammad",
      titleEn: "Prophet Muhammad",
      arabicName: "النبي محمد",
      chapter: "Sirah",
      totalAyats: 48,
      ahadith: 40,
    },
    {
      id: "revelation",
      titleEn: "Revelation",
      arabicName: "الوحي",
      chapter: "Wahy",
      totalAyats: 32,
      ahadith: 18,
    },
    {
      id: "miracles",
      titleEn: "Miracles",
      arabicName: "المعجزات",
      chapter: "Mu'jizat",
      totalAyats: 38,
      ahadith: 22,
    },
    {
      id: "imams",
      titleEn: "Imams",
      arabicName: "الأئمة",
      chapter: "Imamat",
      totalAyats: 44,
      ahadith: 28,
    },
    {
      id: "guidance",
      titleEn: "Guidance",
      arabicName: "الهداية",
      chapter: "Hidayah",
      totalAyats: 36,
      ahadith: 20,
    },
    {
      id: "wilayah",
      titleEn: "Wilayah",
      arabicName: "الولاية",
      chapter: "Wilayah",
      totalAyats: 26,
      ahadith: 14,
    },
    {
      id: "succession",
      titleEn: "Succession",
      arabicName: "الخلافة",
      chapter: "Khilafah",
      totalAyats: 30,
      ahadith: 18,
    },
    {
      id: "resurrection",
      titleEn: "Resurrection",
      arabicName: "البعث",
      chapter: "Qiyamah",
      totalAyats: 40,
      ahadith: 24,
    },
    {
      id: "heaven",
      titleEn: "Heaven (Jannah)",
      arabicName: "الجنة",
      chapter: "Jannah",
      totalAyats: 30,
      ahadith: 16,
    },
    {
      id: "hell",
      titleEn: "Hell (Jahannam)",
      arabicName: "جهنم",
      chapter: "Jahannam",
      totalAyats: 28,
      ahadith: 20,
    },
    {
      id: "accountability",
      titleEn: "Accountability",
      arabicName: "المحاسبة",
      chapter: "Hisab",
      totalAyats: 32,
      ahadith: 22,
    },
    {
      id: "prayer",
      titleEn: "Prayer (Salah)",
      arabicName: "الصلاة",
      chapter: "Salah",
      totalAyats: 52,
      ahadith: 35,
    },
    {
      id: "fasting",
      titleEn: "Fasting (Sawm)",
      arabicName: "الصيام",
      chapter: "Sawm",
      totalAyats: 38,
      ahadith: 28,
    },
    {
      id: "charity",
      titleEn: "Charity (Zakat)",
      arabicName: "الزكاة",
      chapter: "Zakat",
      totalAyats: 34,
      ahadith: 24,
    },
    {
      id: "pilgrimage",
      titleEn: "Pilgrimage (Hajj)",
      arabicName: "الحج",
      chapter: "Hajj",
      totalAyats: 42,
      ahadith: 30,
    },
  ];

  const currentSubtopicData =
    allSubtopics.find((s) => s.id === subtopic) || allSubtopics[0];

  const verses = [
    {
      id: 1,
      number: "2:0",
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      english: "In the name of God, the Lord of Mercy, the Giver of Mercy!",
      audioLabel: null,
    },
    {
      id: 2,
      number: "1:1",
      arabic: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ",
      english: "Praise be to Allah, Lord of the Worlds.",
      audioLabel: "In the name of",
    },
    {
      id: 3,
      number: "2:2",
      arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِلْمُتَّقِينَ",
      english:
        "This is the Book about which there is no doubt, a guidance for those conscious of Allah.",
      audioLabel: null,
    },
    {
      id: 4,
      number: "2:3",
      arabic:
        "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنْفِقُونَ",
      english:
        "Who believe in the unseen, establish prayer, and spend out of what We have provided for them.",
      audioLabel: null,
    },
    {
      id: 5,
      number: "2:4",
      arabic:
        "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنْزِلَ إِلَيْكَ وَمَا أُنْزِلَ مِنْ قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ",
      english:
        "And who believe in what has been revealed to you, and what was revealed before you, and of the Hereafter they are certain.",
      audioLabel: null,
    },
  ];

  const currentVerse = verses.find((v) => v.id === selectedVerse) || verses[1];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const verseId = parseInt(entry.target.dataset.verseId);
          setActiveVerse(verseId);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    Object.values(verseRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleLike = (verseId) => {
    const newLiked = new Set(likedVerses);
    if (newLiked.has(verseId)) {
      newLiked.delete(verseId);
    } else {
      newLiked.add(verseId);
    }
    setLikedVerses(newLiked);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSubtopicChange = (subtopicId) => {
    navigate(`/home/quran-topics/${subtopicId}`);
    setIsDropdownOpen(false);
  };

  const handleVerseChange = (verseId) => {
    setSelectedVerse(verseId);
    setActiveVerse(verseId);
    setIsVerseDropdownOpen(false);

    if (verseRefs.current[verseId]) {
      verseRefs.current[verseId].scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  const handleBackClick = () => {
    navigate("/home/quran-topics");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (
        verseDropdownRef.current &&
        !verseDropdownRef.current.contains(event.target)
      ) {
        setIsVerseDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-orange-50"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header Section */}
      <div
        className={`sticky top-0 z-40 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        } shadow-sm`}
      >
        <div className="max-w-7xl mx-auto px-3 md:px-6 py-4 md:py-6">
          <div className="flex flex-col space-y-3 md:space-y-4">
            {/* Top Row - Back button and Title */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={handleBackClick}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-300 hover:text-white active:bg-gray-600"
                    : "hover:bg-orange-50 text-gray-600 hover:text-orange-600 active:bg-orange-100"
                } shadow-sm hover:shadow`}
              >
                {isRTL ? (
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                ) : (
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center gap-2 group w-full md:w-auto ${
                      theme === "dark"
                        ? "text-white hover:text-orange-400"
                        : "text-gray-800 hover:text-orange-500"
                    } transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
                  >
                    {isRTL ? (
                      <span
                        className="text-xl md:text-2xl font-bold flex-shrink-0"
                        style={{ fontFamily: "indopak, sans-serif" }}
                      >
                        {currentSubtopicData.arabicName}
                      </span>
                    ) : (
                      <h1 className="text-xl md:text-2xl font-bold truncate">
                        {currentSubtopicData.titleEn}
                      </h1>
                    )}
                    <ChevronDown
                      className={`w-4 h-4 md:w-5 md:h-5 flex-shrink-0 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isDropdownOpen && (
                    <div
                      className={`absolute top-full mt-2 w-full md:w-96 rounded-lg shadow-lg border py-2 max-h-96 overflow-y-auto z-50 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200"
                      } ${isRTL ? "right-0" : "left-0"}`}
                    >
                      {allSubtopics.map((sub) => (
                        <button
                          key={sub.id}
                          onClick={() => handleSubtopicChange(sub.id)}
                          className={`w-full px-4 py-3 text-${isRTL ? "right" : "left"} transition-colors ${
                            subtopic === sub.id
                              ? `bg-orange-50 ${isRTL ? "border-r-4" : "border-l-4"} border-orange-500`
                              : theme === "dark"
                                ? "hover:bg-gray-700"
                                : "hover:bg-orange-50"
                          }`}
                        >
                          <div
                            className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                          >
                            <div className="flex-1 min-w-0">
                              <div
                                className={`flex items-center gap-2 mb-1 ${isRTL ? "flex-row-reverse justify-end" : ""}`}
                              >
                                {isRTL ? (
                                  <span
                                    className={`text-base flex-shrink-0 ${
                                      theme === "dark"
                                        ? "text-white"
                                        : "text-gray-800"
                                    } font-medium`}
                                    style={{
                                      fontFamily: "indopak, sans-serif",
                                    }}
                                  >
                                    {sub.arabicName}
                                  </span>
                                ) : (
                                  <span
                                    className={`font-medium truncate ${
                                      theme === "dark"
                                        ? "text-white"
                                        : "text-gray-800"
                                    }`}
                                  >
                                    {sub.titleEn}
                                  </span>
                                )}
                              </div>
                              <div
                                className={`text-xs ${
                                  theme === "dark"
                                    ? "text-gray-500"
                                    : "text-gray-500"
                                }`}
                              >
                                <span>{sub.chapter}</span>
                                <span className="mx-1">•</span>
                                <span>{sub.totalAyats} Ayats</span>
                                <span className="mx-1">•</span>
                                <span>{sub.ahadith} Ahadith</span>
                              </div>
                            </div>
                            {subtopic === sub.id && (
                              <svg
                                className={`w-5 h-5 text-orange-500 flex-shrink-0 ${isRTL ? "mr-2" : "ml-2"}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div
                  className={`text-xs md:text-sm mt-1 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  <span>{currentSubtopicData.chapter}</span>
                  <span className="mx-1 md:mx-2">|</span>
                  <span>{currentSubtopicData.totalAyats} Ayats</span>
                  <span className="mx-1 md:mx-2">|</span>
                  <span>{currentSubtopicData.ahadith} Ahadith</span>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div
              className={`flex items-center gap-2 md:gap-3 flex-wrap ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <button
                onClick={handlePlayPause}
                className="px-4 md:px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full flex items-center gap-2 hover:from-orange-500 hover:to-orange-600 transition-all shadow-md hover:shadow-lg active:scale-95 text-sm md:text-base"
              >
                <Play className="w-4 h-4" fill="white" />
                <span>Play Now</span>
              </button>

              <div className="relative" ref={verseDropdownRef}>
                <button
                  onClick={() => setIsVerseDropdownOpen(!isVerseDropdownOpen)}
                  className={`px-3 md:px-4 py-2 border rounded-full text-orange-500 flex items-center gap-2 text-sm md:text-base transition-all shadow-sm hover:shadow ${
                    theme === "dark"
                      ? "border-gray-600 hover:bg-gray-700 bg-gray-800"
                      : "border-orange-200 hover:bg-orange-50 bg-white"
                  }`}
                >
                  <span>Verse {selectedVerse}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      isVerseDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isVerseDropdownOpen && (
                  <div
                    className={`absolute top-full mt-2 w-48 rounded-lg shadow-lg border py-2 max-h-60 overflow-y-auto z-50 ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    } ${isRTL ? "right-0" : "left-0"}`}
                  >
                    {verses.map((verse) => (
                      <button
                        key={verse.id}
                        onClick={() => handleVerseChange(verse.id)}
                        className={`w-full px-4 py-2 text-${isRTL ? "right" : "left"} transition-colors ${
                          selectedVerse === verse.id
                            ? "bg-orange-50 text-orange-600 font-medium"
                            : theme === "dark"
                              ? "text-gray-300 hover:bg-gray-700"
                              : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <div
                          className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                        >
                          <span>Verse {verse.id}</span>
                          <span className="text-xs text-gray-500">
                            {verse.number}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Verses */}
      <div className="max-w-4xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-3 md:space-y-4">
        {verses.map((verse) => (
          <div
            key={verse.id}
            ref={(el) => (verseRefs.current[verse.id] = el)}
            data-verse-id={verse.id}
            className={`rounded-xl shadow-sm border hover:shadow-lg transition-all duration-200 ${
              verse.id === selectedVerse
                ? "border-orange-400 ring-2 ring-orange-200"
                : theme === "dark"
                  ? "border-gray-700"
                  : "border-gray-200"
            } ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
          >
            {verse.id === activeVerse && (
              <div
                className={`bg-gradient-to-r from-orange-400 to-orange-500 text-white px-3 md:px-4 py-2 rounded-t-xl flex items-center gap-2 ${isRTL ? "flex-row-reverse justify-start" : "justify-end"}`}
              >
                <span className="text-xs md:text-sm font-medium">
                  {verse.audioLabel || "Currently Reading"}
                </span>
                <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
              </div>
            )}

            <div className="p-4 md:p-6">
              <div
                className={`flex items-center gap-2 mb-3 md:mb-4 ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <span className="text-orange-500 font-semibold text-sm md:text-base bg-orange-50 px-2 py-1 rounded">
                  {verse.number}
                </span>
              </div>

              <div className="text-right mb-3 md:mb-4">
                <p
                  className={`text-xl md:text-2xl leading-loose ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                  style={{ fontFamily: "indopak, sans-serif" }}
                >
                  {verse.arabic}
                </p>
              </div>

              <div
                className={`mb-3 md:mb-4 ${isRTL ? "text-right" : "text-left"}`}
              >
                <p
                  className={`text-sm md:text-base leading-relaxed ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  {verse.english}
                </p>
              </div>

              <div
                className={`flex items-center gap-2 md:gap-4 pt-3 border-t ${
                  theme === "dark" ? "border-gray-700" : "border-gray-100"
                } ${isRTL ? "flex-row-reverse" : ""}`}
              >
                <button
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    theme === "dark"
                      ? "hover:bg-gray-700 active:bg-gray-600"
                      : "hover:bg-orange-50 active:bg-orange-100"
                  }`}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Play
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-orange-400"
                        : "text-gray-500 hover:text-orange-500"
                    } transition-colors`}
                  />
                </button>

                <button
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    theme === "dark"
                      ? "hover:bg-gray-700 active:bg-gray-600"
                      : "hover:bg-orange-50 active:bg-orange-100"
                  }`}
                  onClick={() => toggleLike(verse.id)}
                >
                  <Heart
                    className={`w-4 h-4 md:w-5 md:h-5 transition-all ${
                      likedVerses.has(verse.id)
                        ? "text-red-500 fill-red-500 scale-110"
                        : theme === "dark"
                          ? "text-gray-400 hover:text-red-400"
                          : "text-gray-500 hover:text-red-500"
                    }`}
                  />
                </button>

                <button
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    theme === "dark"
                      ? "hover:bg-gray-700 active:bg-gray-600"
                      : "hover:bg-orange-50 active:bg-orange-100"
                  }`}
                >
                  <Share2
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-orange-400"
                        : "text-gray-500 hover:text-orange-500"
                    } transition-colors`}
                  />
                </button>

                <button
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    theme === "dark"
                      ? "hover:bg-gray-700 active:bg-gray-600"
                      : "hover:bg-orange-50 active:bg-orange-100"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-orange-400"
                        : "text-gray-500 hover:text-orange-500"
                    } transition-colors`}
                  />
                </button>

                <button
                  className={`p-2 rounded-lg transition-all duration-200 ${
                    theme === "dark"
                      ? "hover:bg-gray-700 active:bg-gray-600"
                      : "hover:bg-orange-50 active:bg-orange-100"
                  }`}
                >
                  <MoreVertical
                    className={`w-4 h-4 md:w-5 md:h-5 ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-orange-400"
                        : "text-gray-500 hover:text-orange-500"
                    } transition-colors`}
                  />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
