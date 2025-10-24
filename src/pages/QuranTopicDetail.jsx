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
  Facebook,
  Instagram,
  MessageCircle,
  Copy,
  Download,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { TranslationContext } from "../context/TranslationContext";

export default function QuranTopicDetail() {
  const { subtopic } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { quranFont, arabicSize, translatorSize } = useContext(FontContext);
  const { showTranslation } = useContext(TranslationContext);
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ur" || i18n.language === "ar";

  const [selectedVerse, setSelectedVerse] = useState(2);
  const [activeVerse, setActiveVerse] = useState(2);
  const [likedVerses, setLikedVerses] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVerseDropdownOpen, setIsVerseDropdownOpen] = useState(false);
  const [shareMenuVerse, setShareMenuVerse] = useState(null);
  const [moreMenuVerse, setMoreMenuVerse] = useState(null);
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

  // Get font family based on selection
  const getFontFamily = () => {
    switch (quranFont) {
      case "Uthmani":
        return "uthmani, sans-serif";
      case "IndoPak":
        return "indopak, sans-serif";
      case "Tajweed":
        return "tajweed, sans-serif";
      default:
        return "indopak, sans-serif";
    }
  };

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
          setSelectedVerse(verseId);
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

    return () => observer.disconnect();
  }, []);

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

  const handleVerseChange = (verseId) => {
    setSelectedVerse(verseId);
    setIsVerseDropdownOpen(false);
    const verseElement = verseRefs.current[verseId];
    if (verseElement) {
      verseElement.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const toggleLike = (verseId) => {
    setLikedVerses((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(verseId)) {
        newSet.delete(verseId);
      } else {
        newSet.add(verseId);
      }
      return newSet;
    });
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setActiveVerse(selectedVerse);
    }
  };

  const handleShare = (platform, verseId) => {
    const verse = verses.find((v) => v.id === verseId);
    const shareText = `${verse.arabic}\n\n${verse.english}\n\n- Quran ${verse.number}`;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(shareText)}`,
          "_blank",
        );
        break;
      case "instagram":
        alert("Instagram sharing requires their mobile app");
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(shareText)}`,
          "_blank",
        );
        break;
    }
    setShareMenuVerse(null);
  };

  const handleMoreAction = (action, verseId) => {
    const verse = verses.find((v) => v.id === verseId);

    switch (action) {
      case "copy":
        navigator.clipboard.writeText(
          `${verse.arabic}\n\n${verse.english}\n\n- Quran ${verse.number}`,
        );
        alert("Verse copied to clipboard");
        break;
      case "download":
        alert("Download feature coming soon");
        break;
    }
    setMoreMenuVerse(null);
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className={`sticky top-0 z-40 shadow-md transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-4xl mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex flex-col gap-3 md:gap-4">
            <div
              className={`flex items-start gap-3 md:gap-4 ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <button
                onClick={() => navigate(-1)}
                className={`p-2 rounded-lg transition-all ${
                  theme === "dark"
                    ? "hover:bg-gray-700 text-gray-300"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                {isRTL ? (
                  <ChevronRight className="w-5 h-5" />
                ) : (
                  <ChevronLeft className="w-5 h-5" />
                )}
              </button>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1
                    className={`text-lg md:text-2xl font-bold ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {currentSubtopicData.titleEn}
                  </h1>

                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`p-1.5 rounded-lg transition-all ${
                        theme === "dark"
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          isDropdownOpen ? "rotate-180" : ""
                        } ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div
                        className={`absolute top-full mt-2 w-56 md:w-64 rounded-lg shadow-lg border py-2 max-h-96 overflow-y-auto z-50 ${
                          theme === "dark"
                            ? "bg-gray-800 border-gray-700"
                            : "bg-white border-gray-200"
                        } ${isRTL ? "right-0" : "left-0"}`}
                      >
                        {allSubtopics.map((sub) => (
                          <button
                            key={sub.id}
                            onClick={() => {
                              navigate(`/quran/topics/${sub.id}`);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-${isRTL ? "right" : "left"} transition-colors ${
                              sub.id === subtopic
                                ? "bg-orange-50 text-orange-600 font-medium"
                                : theme === "dark"
                                  ? "text-gray-300 hover:bg-gray-700"
                                  : "text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <div
                              className={`flex items-center justify-between ${isRTL ? "flex-row-reverse" : ""}`}
                            >
                              <span className="text-sm md:text-base">
                                {sub.titleEn}
                              </span>
                              {sub.id === subtopic && (
                                <svg
                                  className="w-4 h-4 text-orange-500"
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
                  className={`leading-loose ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                  style={{
                    fontFamily: getFontFamily(),
                    fontSize: `${arabicSize}px`,
                  }}
                >
                  {verse.arabic}
                </p>
              </div>

              {showTranslation && (
                <div
                  className={`mb-3 md:mb-4 ${isRTL ? "text-right" : "text-left"}`}
                >
                  <p
                    className={`leading-relaxed ${
                      theme === "dark" ? "text-gray-300" : "text-gray-700"
                    }`}
                    style={{ fontSize: `${translatorSize}px` }}
                  >
                    {verse.english}
                  </p>
                </div>
              )}

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

                <div className="relative">
                  <button
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      theme === "dark"
                        ? "hover:bg-gray-700 active:bg-gray-600"
                        : "hover:bg-orange-50 active:bg-orange-100"
                    }`}
                    onClick={() =>
                      setShareMenuVerse(
                        shareMenuVerse === verse.id ? null : verse.id,
                      )
                    }
                  >
                    <Share2
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-orange-400"
                          : "text-gray-500 hover:text-orange-500"
                      } transition-colors`}
                    />
                  </button>

                  {shareMenuVerse === verse.id && (
                    <div
                      className={`absolute bottom-full mb-2 ${isRTL ? "right-0" : "left-0"} w-48 rounded-lg shadow-lg border py-2 z-50 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => handleShare("facebook", verse.id)}
                        className={`w-full px-4 py-2 flex items-center gap-3 transition-colors ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Facebook className="w-4 h-4 text-blue-600" />
                        <span>Facebook</span>
                      </button>
                      <button
                        onClick={() => handleShare("instagram", verse.id)}
                        className={`w-full px-4 py-2 flex items-center gap-3 transition-colors ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Instagram className="w-4 h-4 text-pink-600" />
                        <span>Instagram</span>
                      </button>
                      <button
                        onClick={() => handleShare("whatsapp", verse.id)}
                        className={`w-full px-4 py-2 flex items-center gap-3 transition-colors ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <MessageCircle className="w-4 h-4 text-green-600" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  )}
                </div>

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

                <div className="relative">
                  <button
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      theme === "dark"
                        ? "hover:bg-gray-700 active:bg-gray-600"
                        : "hover:bg-orange-50 active:bg-orange-100"
                    }`}
                    onClick={() =>
                      setMoreMenuVerse(
                        moreMenuVerse === verse.id ? null : verse.id,
                      )
                    }
                  >
                    <MoreVertical
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-orange-400"
                          : "text-gray-500 hover:text-orange-500"
                      } transition-colors`}
                    />
                  </button>

                  {moreMenuVerse === verse.id && (
                    <div
                      className={`absolute bottom-full mb-2 ${isRTL ? "right-0" : "left-0"} w-48 rounded-lg shadow-lg border py-2 z-50 ${
                        theme === "dark"
                          ? "bg-gray-800 border-gray-700"
                          : "bg-white border-gray-200"
                      }`}
                    >
                      <button
                        onClick={() => handleMoreAction("copy", verse.id)}
                        className={`w-full px-4 py-2 flex items-center gap-3 transition-colors ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy Text</span>
                      </button>
                      <button
                        onClick={() => handleMoreAction("download", verse.id)}
                        className={`w-full px-4 py-2 flex items-center gap-3 transition-colors ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
