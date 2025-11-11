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
import TopicsService from "../services/TopicsService";

export default function QuranTopicDetail() {
  const { subtopic } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { quranFont, arabicSize, translatorSize } = useContext(FontContext);
  const { showTranslation, translator } = useContext(TranslationContext);
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ur" || i18n.language === "ar";

  const [selectedVerse, setSelectedVerse] = useState(0);
  const [activeVerse, setActiveVerse] = useState(0);
  const [likedVerses, setLikedVerses] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isVerseDropdownOpen, setIsVerseDropdownOpen] = useState(false);
  const [shareMenuVerse, setShareMenuVerse] = useState(null);
  const [moreMenuVerse, setMoreMenuVerse] = useState(null);
  const dropdownRef = useRef(null);
  const verseDropdownRef = useRef(null);
  const verseRefs = useRef({});

  // API state
  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readAyahs, setReadAyahs] = useState(new Set());
  const [currentProgress, setCurrentProgress] = useState(0);
  const [allTopics, setAllTopics] = useState([]);

  // Fetch topic data from API
  useEffect(() => {
    const fetchTopicData = async () => {
      if (!subtopic) return;

      try {
        setLoading(true);
        setError(null);
        const response = await TopicsService.getTopicOfTheDayById(subtopic);

        if (response && response.success && response.topic) {
          setTopicData(response.topic);
          // Set first ayah as selected by default
          if (response.topic.ayahs && response.topic.ayahs.length > 0) {
            setSelectedVerse(0);
            setActiveVerse(0);
          }
        }
      } catch (err) {
        console.error("Error fetching topic:", err);
        setError("Failed to load topic details");
      } finally {
        setLoading(false);
      }
    };

    fetchTopicData();
  }, [subtopic]);

  // Fetch all topics for dropdown
  useEffect(() => {
    const fetchAllTopics = async () => {
      try {
        const response = await TopicsService.getAllTopics();
        if (response && response.data && response.data.length > 0) {
          const transformedTopics = response.data.map((topic) => ({
            id: topic.id,
            titleEn: topic.name,
            arabicName: topic.alternative_name || topic.name,
            chapter: "Topics",
            totalAyats: topic.ayahs?.length || 0,
            ahadith: topic.hadiths?.length || 0,
          }));
          setAllTopics(transformedTopics);
        }
      } catch (err) {
        console.error("Error fetching all topics:", err);
        // If fetch fails, keep empty array
      }
    };

    fetchAllTopics();
  }, []);

  // All available subtopics (fallback for when API topics aren't loaded yet)
  const allSubtopics = allTopics.length > 0 ? allTopics : [
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

  // Use API data or fallback
  const currentSubtopicData = topicData
    ? {
        id: topicData.id,
        titleEn: topicData.name,
        arabicName: topicData.alternative_name,
        description: topicData.description,
        totalAyats: topicData.ayahs?.length || 0,
        ahadith: topicData.hadiths?.length || 0,
      }
    : {
        id: subtopic,
        titleEn: "Loading...",
        arabicName: "...",
        description: "Loading topic details...",
        totalAyats: 0,
        ahadith: 0,
      };

  // Transform API ayahs to verses format
  const verses =
    topicData?.ayahs?.map((ayah, index) => ({
      id: ayah.id, // Use unique ayah ID from database
      index: index, // Keep index for navigation
      number: `${ayah.surah_id}:${ayah.id}`,
      arabic: ayah.ayah_text || "",
      english:
        translator === "urdu" ? ayah.ayah_urdu_text : ayah.ayah_english_text,
      description: ayah.description,
      audioLabel: null,
    })) || [];

  // Transform API hadiths to display format
  const hadiths =
    topicData?.hadiths?.map((hadith, index) => ({
      id: hadith.id,
      index: index,
      arabic: hadith.text_arabic || "",
      urdu: hadith.text_urdu || "",
      english: hadith.text_english || "",
      description: hadith.description,
    })) || [];

  const currentVerse = verses[selectedVerse] || verses[0];

  // Track when user reads an ayah (when they select it)
  useEffect(() => {
    if (selectedVerse !== null && verses.length > 0 && currentVerse) {
      setReadAyahs((prev) => {
        const newSet = new Set(prev);
        newSet.add(currentVerse.id); // Track by unique ID, not index
        return newSet;
      });
    }
  }, [selectedVerse, verses.length, currentVerse?.id]);

  // Calculate and save progress when read ayahs change
  useEffect(() => {
    if (!topicData || !verses.length) return;

    const totalAyahs = verses.length;
    const readCount = readAyahs.size;
    const progress = Math.round((readCount / totalAyahs) * 100);

    setCurrentProgress(progress);

    // Save progress to backend
    const saveProgress = async () => {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (!user || !user.id) return;

      try {
        await TopicsService.saveTopicProgress({
          user_id: user.id,
          topics: [
            {
              topic_id: topicData.id,
              progress: progress,
            },
          ],
        });
        console.log(
          `Progress saved: ${progress}% (${readCount}/${totalAyahs} ayahs read)`,
        );
      } catch (err) {
        console.error("Error saving progress:", err);
      }
    };

    // Debounce: only save every few seconds to avoid too many API calls
    const timer = setTimeout(saveProgress, 2000);
    return () => clearTimeout(timer);
  }, [readAyahs, topicData, verses.length]);

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

  // Intersection Observer for scroll-based "Currently Reading" indicator
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
          // Find the verse index from the verse ID
          const verse = verses.find((v) => v.id === verseId);
          if (verse) {
            setSelectedVerse(verse.index);
            setActiveVerse(verse.index); // Update activeVerse to move "Currently Reading" indicator
          }
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
  }, [verses]);

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

  // Loading state
  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-orange-50"
        }`}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading topic details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !topicData) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          theme === "dark" ? "bg-gray-900 text-white" : "bg-orange-50"
        }`}
      >
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Topic not found"}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-orange-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-orange-50 text-gray-800"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div
        className={`sticky top-0 z-40 shadow-md transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-4xl mx-auto px-3 md:px-4 py-3 md:py-4">
          <div className="flex justify-between gap-3 md:gap-4">
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
                              navigate(`/home/quran-topics/${sub.id}`);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-${isRTL ? "right" : "left"} transition-colors ${
                              sub.id === subtopic
                                ? "bg-orange-50 text-primary font-medium"
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
                                  className="w-4 h-4 text-primary"
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

                {/* Reading Progress Bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
                    >
                      Reading Progress
                    </span>
                    <span
                      className={`text-xs font-semibold ${currentProgress === 100 ? "text-green-600" : "text-primary"}`}
                    >
                      {currentProgress}%
                    </span>
                  </div>
                  <div
                    className={`h-2 rounded-full ${theme === "dark" ? "bg-gray-700" : "bg-gray-200"}`}
                  >
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        currentProgress === 100
                          ? "bg-gradient-to-r from-green-400 to-green-600"
                          : "bg-gradient-to-r from-orange-400 to-orange-600"
                      }`}
                      style={{ width: `${currentProgress}%` }}
                    />
                  </div>
                  <p
                    className={`text-xs mt-1 ${theme === "dark" ? "text-gray-500" : "text-gray-500"}`}
                  >
                    {readAyahs.size} of {verses.length} ayahs read
                    {currentProgress === 100 && " ✓ Completed!"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div
              className={`flex items-center gap-2 md:gap-3 flex-wrap ${isRTL ? "flex-row-reverse" : ""}`}
            >
              <button
                onClick={handlePlayPause}
                className="px-4 md:px-6 py-2 bg-primary text-white rounded-full flex items-center gap-2 hover:from-orange-500 hover:to-orange-600 transition-all shadow-md hover:shadow-lg active:scale-95 text-sm md:text-base"
              >
                <Play className="w-4 h-4" fill="white" />
                <span>Play Now</span>
              </button>

              <div className="relative" ref={verseDropdownRef}>
                <button
                  onClick={() => setIsVerseDropdownOpen(!isVerseDropdownOpen)}
                  className={`px-3 md:px-4 py-2 border rounded-full text-primary flex items-center gap-2 text-sm md:text-base transition-all shadow-sm hover:shadow ${
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
                            ? "bg-orange-50 text-primary font-medium"
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

      {/* Verses and Hadiths Section */}
      <div className="max-w-4xl mx-auto px-3 md:px-4 py-4 md:py-6 space-y-3 md:space-y-4">
        {/* Verses */}
        {verses.map((verse) => {
          const isRead = readAyahs.has(verse.id);
          const isSelected = verse.index === selectedVerse;

          return (
            <div
              key={verse.id}
              ref={(el) => (verseRefs.current[verse.id] = el)}
              data-verse-id={verse.id}
              onClick={() => {
                setSelectedVerse(verse.index);
                setActiveVerse(verse.index);
              }}
              className={`rounded-xl shadow-sm border cursor-pointer hover:shadow-lg transition-all duration-200 relative ${
                isRead
                  ? "border-green-500 ring-2 ring-green-200"
                  : isSelected
                    ? "border-primary ring-2 ring-orange-200"
                    : theme === "dark"
                      ? "border-gray-700 hover:border-gray-600"
                      : "border-gray-200 hover:border-gray-300"
              } ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
            >
              {/* Read Indicator Badge - Top Right */}
              {isRead && (
                <div className="absolute -top-2 -right-2 z-10">
                  <div className="bg-green-500 text-white rounded-full p-1.5 shadow-lg">
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {verse.index === activeVerse && (
                <div
                  className={`bg-primary text-white px-3 md:px-4 py-2 rounded-t-xl flex items-center gap-2 ${isRTL ? "flex-row-reverse justify-start" : "justify-end"}`}
                >
                  <span className="text-xs md:text-sm font-medium">
                    {verse.audioLabel || "Currently Reading"}
                  </span>
                  <Volume2 className="w-3 h-3 md:w-4 md:h-4" />
                </div>
              )}

              <div className="p-4 md:p-6">
                <div
                  className={`flex items-center justify-between gap-2 mb-3 md:mb-4 ${isRTL ? "flex-row-reverse" : ""}`}
                >
                  <span
                    className={`font-semibold text-sm md:text-base px-2 py-1 rounded ${
                      isRead
                        ? "bg-green-100 text-green-700"
                        : "bg-orange-50 text-primary"
                    }`}
                  >
                    {verse.number}
                  </span>
                  {isRead && (
                    <span className="text-xs font-semibold text-green-600">
                      ✓ Read
                    </span>
                  )}
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
                          ? "text-gray-400 hover:text-primary"
                          : "text-gray-500 hover:text-primary"
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
                            ? "text-gray-400 hover:text-primary"
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
                          ? "text-gray-400 hover:text-primary"
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
                            ? "text-gray-400 hover:text-primary"
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
          );
        })}

        {/* Hadiths Section */}
        {hadiths && hadiths.length > 0 && (
          <div className="mt-8 mb-6">
            <h3
              className={`text-xl md:text-2xl font-bold mb-4 px-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Related Ahadith ({hadiths.length})
            </h3>

            {hadiths.map((hadith, index) => (
              <div
                key={hadith.id}
                className={`mb-4 mx-4 p-4 md:p-6 rounded-xl transition-all duration-300 ${
                  theme === "dark"
                    ? "bg-gray-800 hover:bg-gray-750"
                    : "bg-white hover:shadow-lg"
                }`}
              >
                {/* Hadith Number */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      theme === "dark"
                        ? "bg-green-900 text-green-200"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    Hadith #{index + 1}
                  </span>
                </div>

                {/* Arabic Text */}
                <div className="mb-4">
                  <p
                    className={`text-right leading-loose ${getFontFamily()} ${
                      theme === "dark" ? "text-gray-200" : "text-gray-800"
                    }`}
                    style={{ fontSize: `${arabicSize}px` }}
                  >
                    {hadith.arabic}
                  </p>
                </div>

                {/* Translation */}
                {showTranslation && (
                  <div
                    className={`p-3 md:p-4 rounded-lg ${
                      theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
                    }`}
                  >
                    <p
                      className={`leading-relaxed ${
                        translator === "urdu"
                          ? "text-right font-urdu"
                          : "text-left"
                      } ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                      style={{ fontSize: `${translatorSize}px` }}
                    >
                      {translator === "urdu" ? hadith.urdu : hadith.english}
                    </p>
                  </div>
                )}

                {/* Description */}
                {hadith.description && (
                  <div className="mt-3">
                    <p
                      className={`text-sm italic ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      {hadith.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
