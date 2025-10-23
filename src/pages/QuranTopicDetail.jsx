import React, { useState, useRef, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  ChevronLeft,
  Play,
  Heart,
  Share2,
  Bookmark,
  MoreVertical,
  Volume2,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

export default function QuranTopicDetail() {
  const { subtopic } = useParams(); // Get the subtopic from URL
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const [selectedVerse, setSelectedVerse] = useState(1);
  const [likedVerses, setLikedVerses] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // All available subtopics - same as in Header.jsx
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

  // Find current subtopic data
  const currentSubtopicData =
    allSubtopics.find((s) => s.id === subtopic) || allSubtopics[0];

  // Sample verses data (you can customize this based on the subtopic)
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

  const handleBackClick = () => {
    navigate("/home/quran-topics");
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`min-h-screen ${
        theme === "dark" ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Header */}
      <div
        className={`shadow-sm sticky top-0 z-10 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleBackClick}
                className="p-2 rounded-full border border-orange-400 text-orange-500 hover:bg-orange-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Subtopic Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <h1
                      className={`text-xl font-medium ${
                        theme === "dark" ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {currentSubtopicData.titleEn}
                    </h1>
                    <span
                      className={`text-lg ${
                        theme === "dark" ? "text-gray-400" : "text-gray-400"
                      }`}
                      style={{ fontFamily: "indopak, sans-serif" }}
                    >
                      {currentSubtopicData.arabicName}
                    </span>
                  </div>
                  <svg
                    className={`w-4 h-4 text-orange-500 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div
                    className={`absolute top-full left-0 mt-2 w-96 rounded-lg shadow-lg border py-2 max-h-96 overflow-y-auto z-50 ${
                      theme === "dark"
                        ? "bg-gray-800 border-gray-700"
                        : "bg-white border-gray-200"
                    }`}
                  >
                    {allSubtopics.map((sub) => (
                      <button
                        key={sub.id}
                        onClick={() => handleSubtopicChange(sub.id)}
                        className={`w-full px-4 py-3 text-left transition-colors ${
                          subtopic === sub.id
                            ? "bg-orange-50 border-l-4 border-orange-500"
                            : theme === "dark"
                              ? "hover:bg-gray-700"
                              : "hover:bg-orange-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span
                                className={`font-medium ${
                                  theme === "dark"
                                    ? "text-white"
                                    : "text-gray-800"
                                }`}
                              >
                                {sub.titleEn}
                              </span>
                              <span
                                className={`text-sm ${
                                  theme === "dark"
                                    ? "text-gray-400"
                                    : "text-gray-400"
                                }`}
                                style={{ fontFamily: "indopak, sans-serif" }}
                              >
                                {sub.arabicName}
                              </span>
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
                              className="w-5 h-5 text-orange-500 flex-shrink-0"
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
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-500"
                }`}
              >
                <span>{currentSubtopicData.chapter}</span>
                <span className="mx-2">|</span>
                <span>{currentSubtopicData.totalAyats} Ayats</span>
                <span className="mx-2">|</span>
                <span>{currentSubtopicData.ahadith} Ahadith</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayPause}
                className="px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full flex items-center gap-2 hover:from-orange-500 hover:to-orange-600 transition-all"
              >
                <Play className="w-4 h-4" fill="white" />
                <span>Play Now</span>
              </button>

              <button
                className={`px-4 py-2 border rounded-full text-orange-500 flex items-center gap-2 ${
                  theme === "dark"
                    ? "border-gray-600 hover:bg-gray-700"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <span>Verse 2</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verses */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {verses.map((verse) => (
          <div
            key={verse.id}
            className={`rounded-lg shadow-sm border hover:shadow-md transition-shadow ${
              verse.id === 2
                ? "border-orange-300"
                : theme === "dark"
                  ? "border-gray-700"
                  : "border-gray-200"
            } ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}
          >
            {/* Audio Label for specific verses */}
            {verse.audioLabel && (
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-t-lg flex items-center justify-end gap-2">
                <span className="text-sm">{verse.audioLabel}</span>
                <Volume2 className="w-4 h-4" />
              </div>
            )}

            <div className="p-6">
              {/* Verse Number */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-orange-500 font-medium">
                  {verse.number}
                </span>
              </div>

              {/* Arabic Text */}
              <div className="text-right mb-4">
                <p
                  className={`text-2xl leading-loose ${
                    theme === "dark" ? "text-white" : "text-gray-800"
                  }`}
                  style={{ fontFamily: "indopak, sans-serif" }}
                >
                  {verse.arabic}
                </p>
              </div>

              {/* English Translation */}
              <div className="mb-4">
                <p
                  className={
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }
                >
                  {verse.english}
                </p>
              </div>

              {/* Action Buttons */}
              <div
                className={`flex items-center gap-4 pt-2 border-t ${
                  theme === "dark" ? "border-gray-700" : "border-gray-100"
                }`}
              >
                <button
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Play
                    className={`w-5 h-5 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </button>

                <button
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                  onClick={() => toggleLike(verse.id)}
                >
                  <Heart
                    className={`w-5 h-5 ${
                      likedVerses.has(verse.id)
                        ? "text-red-500 fill-red-500"
                        : theme === "dark"
                          ? "text-gray-400"
                          : "text-gray-500"
                    }`}
                  />
                </button>

                <button
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <Share2
                    className={`w-5 h-5 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </button>

                <button
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <Bookmark
                    className={`w-5 h-5 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
                  />
                </button>

                <button
                  className={`p-2 rounded-lg transition-colors ${
                    theme === "dark" ? "hover:bg-gray-700" : "hover:bg-gray-100"
                  }`}
                >
                  <MoreVertical
                    className={`w-5 h-5 ${
                      theme === "dark" ? "text-gray-400" : "text-gray-500"
                    }`}
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
