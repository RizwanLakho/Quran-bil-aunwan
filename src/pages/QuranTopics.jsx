import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function QuranTopics() {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  // All subtopics with their data
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
      completed: true, // This topic is marked as completed
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
    },
  ];

  const handleCardClick = (topicId) => {
    navigate(`/home/quran-topics/${topicId}`);
  };

  // Calculate total progress statistics
  const totalTopics = topicCards.length;
  const completedTopics = topicCards.filter((card) => card.completed).length;
  const averageProgress = Math.round(
    topicCards.reduce((sum, card) => sum + card.progress, 0) / totalTopics,
  );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-white"
          : "bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 py-10">
        {/* Beautiful Header Section */}
        <div
          className={`relative rounded-3xl overflow-hidden mb-10 shadow-2xl ${
            theme === "dark"
              ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800"
              : "bg-gradient-to-br from-orange-500 via-amber-500 to-orange-600"
          }`}
        >
          {/* Decorative Pattern Background */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
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

          {/* Content */}
          <div className="relative p-8 md:p-10">
            <div className="flex flex-col items-start gap-6">
              {/* Text Content */}
              <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center">
                    <svg
                      className="w-7 h-7 text-white"
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
                  <h1 className="text-4xl md:text-5xl font-bold text-white">
                    {t("quranic_topics")}
                  </h1>
                </div>
                <p className="text-white text-opacity-90 text-lg mb-6 max-w-2xl">
                  Explore comprehensive Quranic topics with ayats and ahadith.
                  Deepen your understanding of Islamic teachings through
                  structured learning.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Topics Grid - UNCHANGED */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topicCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className={`rounded-2xl shadow-sm hover:shadow-lg transition-all duration-200 overflow-hidden cursor-pointer transform hover:-translate-y-1 ${
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
      </div>
    </div>
  );
}
