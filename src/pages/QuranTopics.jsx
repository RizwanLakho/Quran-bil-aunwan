import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import TopicsService from "../services/TopicsService";

export default function QuranTopics() {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [apiTopics, setApiTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userProgress, setUserProgress] = useState({});

  // Fetch topics and user progress from API
  useEffect(() => {
    const fetchTopicsAndProgress = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch topics
        const topicsResponse = await TopicsService.getAllTopics();

        // Fetch user progress if user is logged in
        let progressData = {};
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (user && user.id) {
          try {
            const progressResponse = await TopicsService.getUserProgress(user.id);
            if (progressResponse && progressResponse.progress) {
              // Convert array to object for easy lookup
              progressData = progressResponse.progress.reduce((acc, item) => {
                acc[item.topic_id] = item.progress;
                return acc;
              }, {});
              setUserProgress(progressData);
            }
          } catch (progressErr) {
            console.log("Could not fetch user progress:", progressErr);
          }
        }

        // Transform API response to match expected format
        if (topicsResponse && topicsResponse.data && topicsResponse.data.length > 0) {
          // Transform API data to component format
          const transformedTopics = topicsResponse.data.map((topic) => ({
            id: topic.id,
            title: topic.name,
            titleEn: topic.name,
            arabicName: topic.alternative_name || topic.name,
            description: topic.description,
            chapter: "Topics",
            totalAyats: topic.ayahs?.length || 0,
            ahadith: topic.hadiths?.length || 0,
            progress: progressData[topic.id] || 0, // Use real progress from backend
            completed: (progressData[topic.id] || 0) >= 100,
            category: "all", // You can add category field to backend
          }));
          setApiTopics(transformedTopics);
        } else {
          console.log("No topics in database");
        }
      } catch (err) {
        console.error("Error fetching topics:", err);
        setError("Failed to load topics from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchTopicsAndProgress();
  }, []);

  const filterButtons = [
    { id: "all", label: t("filter_all_topics"), icon: "📚" },
    { id: "worship", label: t("filter_worship"), icon: "🤲" },
    { id: "prophets", label: t("filter_prophets"), icon: "👤" },
    { id: "beliefs", label: t("filter_beliefs"), icon: "💫" },
    { id: "afterlife", label: t("filter_afterlife"), icon: "🌙" },
  ];

  const handleCardClick = (topicId) => {
    navigate(`/home/quran-topics/${topicId}`);
  };

  // Only use API topics - no dummy data
  const filteredTopics = apiTopics
    .filter(
      (card) => selectedFilter === "all" || card.category === selectedFilter,
    )
    .filter((card) =>
      card.titleEn.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-orange-50"
      }`}
    >
      {/* Header Section */}
      <div className="w-full py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`relative overflow-hidden shadow-2xl rounded-3xl ${
              theme === "dark"
                ? "bg-gradient-to-br from-gray-800 via-gray-700 to-gray-800"
                : "bg-primary"
            }`}
            style={{ height: "392px" }}
          >
            {/* Background Quran Image */}
            <div className="absolute inset-0 opacity-10">
              <img
                src="/quran.png"
                alt="Quran Background"
                className="absolute right-0 top-1/2 -translate-y-1/2 w-[50%] object-contain"
              />
            </div>

            {/* Decorative Pattern Background */}
            <div className="absolute inset-0 opacity-5">
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
            <div className="relative h-full flex flex-col items-center justify-center px-6 py-8">
              {/* Logo */}
              <div className="mb-6">
                <img
                  src="/logo-white.png"
                  alt={t("app_title")}
                  className="h-20 md:h-28 w-auto object-contain"
                />
              </div>

              {/* Search Bar */}
              <div className="w-full max-w-md mb-6">
                <div className="relative">
                  <input
                    type="text"
                    placeholder={t("search_topics")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 pl-11 rounded-full border-2 border-primary border-opacity-30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 text-sm md:text-base bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 shadow-lg"
                  />
                  <svg
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary opacity-70"
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
              <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                {filterButtons.map((button) => (
                  <button
                    key={button.id}
                    onClick={() => setSelectedFilter(button.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 md:px-5 md:py-3 rounded-full font-medium text-xs md:text-sm transition-all duration-300 transform hover:scale-105 shadow-md ${
                      selectedFilter === button.id
                        ? "bg-orange-100 text-primary shadow-lg"
                        : theme === "dark"
                          ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                          : "bg-white text-gray-700 hover:bg-orange-50"
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
      </div>

      {/* Topics Section */}
      <main className="w-full pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredTopics.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTopics.map((card) => (
                <div
                  key={card.id}
                  style={{
                    backgroundImage: "url(/ornament.png)",
                    backgroundSize: "contain",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right",
                  }}
                  onClick={() => handleCardClick(card.id)}
                  className={`flex flex-col rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2 ${
                    theme === "dark" ? "bg-gray-500/50" : "bg-white"
                  }`}
                >
                  {/* Card Content - FLEX GROW TO PUSH PROGRESS BAR DOWN */}
                  <div className="relative flex-grow p-6 pb-4">
                    {/* Background Ornament - VISIBLE NOW */}
                    <div
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-20 h-20 opacity-10 pointer-events-none"
                      style={{
                        backgroundImage: "url(/ornament.png)",
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                      }}
                    />

                    {/* Content Wrapper */}
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1 pr-4">
                          <h3
                            className={`text-xl font-semibold mb-1 ${
                              theme === "dark" ? "text-white" : "text-gray-800"
                            }`}
                          >
                            {card.titleEn}
                          </h3>
                          <p
                            className={`text-lg mb-2 ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
                            }`}
                            style={{ fontFamily: "indopak, sans-serif" }}
                          >
                            {card.arabicName}
                          </p>
                          <p
                            className={`text-sm ${
                              theme === "dark"
                                ? "text-gray-400"
                                : "text-gray-500"
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
                              strokeWidth="8"
                              fill="none"
                            />
                            {/* Progress Circle */}
                            <circle
                              cx="32"
                              cy="32"
                              r="28"
                              stroke={card.completed ? "#10B981" : "#F97316"}
                              strokeWidth="8"
                              fill="none"
                              strokeDasharray={2 * Math.PI * 28}
                              strokeDashoffset={
                                2 * Math.PI * 28 * (1 - card.progress / 100)
                              }
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
                        className={`flex items-center gap-3 text-sm ${
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
                          {card.totalAyats} {t("ayats")}
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
                          {card.ahadith} {t("ahadith")}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Linear Progress Bar - ALWAYS AT BOTTOM */}
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
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2
                className={`text-2xl font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-800"
                }`}
              >
                {t("no_topics_found")}
              </h2>
              <p
                className={`${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("try_adjusting_search")}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
