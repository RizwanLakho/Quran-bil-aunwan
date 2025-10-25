import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function QuranTopics() {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filterButtons = [
    { id: "all", label: "All Topics", icon: "📚" },
    { id: "worship", label: "Worship", icon: "🤲" },
    { id: "prophets", label: "Prophets", icon: "👤" },
    { id: "beliefs", label: "Beliefs", icon: "💫" },
    { id: "afterlife", label: "Afterlife", icon: "🌙" },
  ];

  const topicCards = [
    {
      id: "names-of-allah",
      title: t("names_of_allah"),
      titleEn: "Names of Allah",
      arabicName: "أسماء الله",
      description: "The beautiful names and attributes of Allah",
      chapter: "Tawheed",
      totalAyats: 34,
      ahadith: 20,
      progress: 45,
      completed: false,
      category: "beliefs",
    },
    {
      id: "Attributes",
      title: t("attributes"),
      titleEn: "Attributes",
      arabicName: "صفات الله",
      description: "Divine attributes and characteristics",
      chapter: "Aqeedah",
      totalAyats: 28,
      ahadith: 15,
      progress: 60,
      completed: false,
      category: "beliefs",
    },
    {
      id: "Worship",
      title: t("worship"),
      titleEn: "Worship",
      arabicName: "العبادة",
      description: "Understanding worship and devotion",
      chapter: "Ibadat",
      totalAyats: 42,
      ahadith: 25,
      progress: 30,
      completed: false,
      category: "worship",
    },
    {
      id: "prophets",
      title: t("prophets"),
      titleEn: "Prophets",
      arabicName: "الأنبياء",
      description: "Stories and lessons from the prophets",
      chapter: "Nabuwat",
      totalAyats: 56,
      ahadith: 30,
      progress: 75,
      completed: false,
      category: "prophets",
    },
    {
      id: "prophet-muhammad",
      title: t("prophet_muhammad"),
      titleEn: "Prophet Muhammad",
      arabicName: "النبي محمد",
      description: "Life and teachings of Prophet Muhammad (PBUH)",
      chapter: "Sirah",
      totalAyats: 48,
      ahadith: 40,
      progress: 100,
      completed: true,
      category: "prophets",
    },
    {
      id: "revelation",
      title: t("revelation"),
      titleEn: "Revelation",
      arabicName: "الوحي",
      description: "Divine revelation and guidance",
      chapter: "Wahy",
      totalAyats: 32,
      ahadith: 18,
      progress: 40,
      completed: false,
      category: "beliefs",
    },
    {
      id: "miracles",
      title: t("miracles"),
      titleEn: "Miracles",
      arabicName: "المعجزات",
      description: "Miracles in the Quran",
      chapter: "Mu'jizat",
      totalAyats: 38,
      ahadith: 22,
      progress: 65,
      completed: false,
      category: "prophets",
    },
    {
      id: "imams",
      title: t("imams"),
      titleEn: "Imams",
      arabicName: "الأئمة",
      description: "Leadership and guidance in Islam",
      chapter: "Imamat",
      totalAyats: 44,
      ahadith: 28,
      progress: 55,
      completed: false,
      category: "beliefs",
    },
    {
      id: "guidance",
      title: t("guidance"),
      titleEn: "Guidance",
      arabicName: "الهداية",
      description: "Divine guidance and wisdom",
      chapter: "Hidayah",
      totalAyats: 36,
      ahadith: 20,
      progress: 70,
      completed: false,
      category: "beliefs",
    },
    {
      id: "resurrection",
      title: t("resurrection"),
      titleEn: "Resurrection",
      arabicName: "البعث",
      description: "Day of resurrection and afterlife",
      chapter: "Qiyamah",
      totalAyats: 40,
      ahadith: 24,
      progress: 35,
      completed: false,
      category: "afterlife",
    },
    {
      id: "heaven",
      title: t("heaven_jannah"),
      titleEn: "Heaven (Jannah)",
      arabicName: "الجنة",
      description: "Paradise and eternal bliss",
      chapter: "Jannah",
      totalAyats: 30,
      ahadith: 16,
      progress: 80,
      completed: false,
      category: "afterlife",
    },
    {
      id: "prayer",
      title: t("prayer_salah"),
      titleEn: "Prayer (Salah)",
      arabicName: "الصلاة",
      description: "The importance and practice of prayer",
      chapter: "Salah",
      totalAyats: 52,
      ahadith: 35,
      progress: 90,
      completed: false,
      category: "worship",
    },
  ];

  const handleCardClick = (topicId) => {
    navigate(`/home/quran-topics/${topicId}`);
  };

  const filteredTopics = topicCards
    .filter(
      (card) => selectedFilter === "all" || card.category === selectedFilter,
    )
    .filter((card) =>
      card.titleEn.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <div
      className={`flex flex-col h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100"
      }`}
    >
      {/* Sticky Header Section with Background */}
      <div
        className="relative overflow-hidden shadow-2xl"
        style={{
          borderRadius: "0 0 50% 50% / 0 0 20% 20%",
          backgroundImage: "url('/Quran.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 🔹 Background Quran Image */}
        <div className="absolute inset-0 opacity-10">
          <img
            src="/quran.png"
            alt="Quran Background"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 🔹 Decorative Pattern Background */}
        <div className="absolute inset-0 opacity-5">
          <svg
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <pattern
              id="pattern"
              x="0"
              y="0"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="20" cy="20" r="2" fill="white" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#pattern)" />
          </svg>
        </div>

        {/* 🔹 Overlay Color */}
        <div
          className={`absolute inset-0 ${
            theme === "dark" ? "bg-black/60" : "bg-orange-500/60"
          }`}
        ></div>

        {/* 🔹 Main Header Content */}
        <div className="relative z-10 px-4 py-6 md:py-8">
          <div className="flex flex-col items-center justify-center text-center gap-3 md:gap-4">
            {/* Logo and Title */}
            <div className="flex items-center justify-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center flex-shrink-0 p-2 md:p-2.5 shadow-lg">
                <img
                  src="/icon.png"
                  alt="Quran Icon"
                  className="w-full h-full object-contain"
                />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                {t("quranic_topics")}
              </h1>
            </div>

            {/* Search Bar */}
            <div className="w-full max-w-md mx-auto px-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 md:py-2.5 pl-10 rounded-full border-2 border-primary border-opacity-30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 text-sm md:text-base bg-white/20 text-primary placeholder-white placeholder-opacity-80 backdrop-blur-sm"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-primary opacity-70"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 px-4 pb-2">
              {filterButtons.map((button) => (
                <button
                  key={button.id}
                  onClick={() => setSelectedFilter(button.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 md:px-5 md:py-2.5 rounded-full font-medium text-xs md:text-sm transition-all duration-300 transform hover:scale-105 ${
                    selectedFilter === button.id
                      ? `bg-white bg-opacity-95 shadow-lg ${
                          theme === "dark" ? "text-gray-800" : "text-orange-500"
                        }`
                      : "bg-white/25 text-black hover:bg-opacity-35 backdrop-blur-md border border-white/40"
                  }`}
                >
                  <span className="text-base md:text-lg">{button.icon}</span>
                  <span className="hidden sm:inline">{button.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Topics Section */}
      <main className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-orange-500 scrollbar-track-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
          {filteredTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
              {filteredTopics.map((card) => (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 ${
                    theme === "dark" ? "bg-gray-800" : "bg-white"
                  }`}
                >
                  {/* Card Content */}
                  <div className="p-6 pb-4">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <h3
                          className={`text-xl font-semibold mb-1 ${
                            theme === "dark" ? "text-white" : "text-gray-800"
                          }`}
                        >
                          {card.titleEn}
                        </h3>
                        <p
                          className={`text-lg mb-2 ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                          style={{ fontFamily: "indopak, sans-serif" }}
                        >
                          {card.arabicName}
                        </p>
                        <p
                          className={`text-sm ${
                            theme === "dark" ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          {card.description}
                        </p>
                      </div>

                      {/* Circular Progress Indicator */}
                      <div className="flex-shrink-0 relative w-16 h-16">
                        <svg className="transform -rotate-90 w-16 h-16">
                          {/* Background Circle */}
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke={
                              card.completed
                                ? theme === "dark"
                                  ? "#16A34A"
                                  : "#BBF7D0"
                                : theme === "dark"
                                  ? "#374151"
                                  : "#FED7AA"
                            }
                            strokeWidth="6"
                            fill="none"
                          />
                          {/* Progress Circle */}
                          <circle
                            cx="32"
                            cy="32"
                            r="28"
                            stroke={card.completed ? "#10B981" : "#F97316"}
                            strokeWidth="6"
                            fill="none"
                            strokeDasharray={`${2 * Math.PI * 28}`}
                            strokeDashoffset={`${
                              2 * Math.PI * 28 * (1 - card.progress / 100)
                            }`}
                            strokeLinecap="round"
                            className="transition-all duration-500"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span
                            className={`text-sm font-semibold ${
                              card.completed
                                ? "text-green-600"
                                : theme === "dark"
                                  ? "text-white"
                                  : "text-gray-700"
                            }`}
                          >
                            {card.progress}%
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div
                      className={`flex items-center gap-3 text-sm mb-3 ${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
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
                        {card.totalAyats} Ayats
                      </span>
                      <span
                        className={
                          theme === "dark" ? "text-gray-600" : "text-gray-300"
                        }
                      >
                        |
                      </span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                        {card.ahadith} Ahadith
                      </span>
                    </div>
                  </div>

                  {/* Linear Progress Bar at Bottom */}
                  <div
                    className={`h-2 ${
                      card.completed
                        ? theme === "dark"
                          ? "bg-green-800"
                          : "bg-green-200"
                        : theme === "dark"
                          ? "bg-gray-700"
                          : "bg-orange-100"
                    }`}
                  >
                    <div
                      className={`h-full transition-all duration-500 ${
                        card.completed
                          ? "bg-gradient-to-r from-green-400 to-green-600"
                          : "bg-gradient-to-r from-orange-400 to-orange-600"
                      }`}
                      style={{ width: `${card.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold mb-2">No Topics Found</h2>
              <p
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Try adjusting your search or filter.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
