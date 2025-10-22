import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  LayoutGrid,
  BookOpen,
  FolderOpen,
  Folder,
  Clock,
  Heart,
  Bookmark,
  Settings,
  ChevronDown,
  Circle,
  Globe,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header({ isMenuOpen, toggleSettings }) {
  const { theme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || "en");
  const [expandedTopics, setExpandedTopics] = useState({
    quranicTopics: true,
    allah: false,
    nabowat: false,
    imamat: false,
    qiyamat: false,
    islamicLaw: false,
  });
  const [showSubfolderMenu, setShowSubfolderMenu] = useState(false);

  const isRTL = i18n.language === "ur";

  const toggleTopic = (topic) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topic]: !prev[topic],
    }));
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  // Topic data structure with translations
  const topicFolders = [
    {
      id: "allah",
      title: t("allah"),
      subtopics: [
        {
          path: "/home/quran-topics/names-of-allah",
          title: t("names_of_allah"),
        },
        { path: "/home/quran-topics/Attributes", title: t("attributes") },
        { path: "/home/quran-topics/Worship", title: t("worship") },
      ],
    },
    {
      id: "nabowat",
      title: t("nabowat"),
      subtopics: [
        { path: "/home/quran-topics/prophets", title: t("prophets") },
        {
          path: "/home/quran-topics/prophet-muhammad",
          title: t("prophet_muhammad"),
        },
        { path: "/home/quran-topics/revelation", title: t("revelation") },
        { path: "/home/quran-topics/miracles", title: t("miracles") },
      ],
    },
    {
      id: "imamat",
      title: t("imamat"),
      subtopics: [
        { path: "/home/quran-topics/imams", title: t("imams") },
        { path: "/home/quran-topics/guidance", title: t("guidance") },
        { path: "/home/quran-topics/wilayah", title: t("wilayah") },
        { path: "/home/quran-topics/succession", title: t("succession") },
      ],
    },
    {
      id: "qiyamat",
      title: t("qiyamat"),
      subtopics: [
        { path: "/home/quran-topics/resurrection", title: t("resurrection") },
        { path: "/home/quran-topics/heaven", title: t("heaven_jannah") },
        { path: "/home/quran-topics/hell", title: t("hell_jahannam") },
        {
          path: "/home/quran-topics/accountability",
          title: t("accountability"),
        },
      ],
    },
    {
      id: "islamicLaw",
      title: t("islamic_law"),
      subtopics: [
        { path: "/home/quran-topics/prayer", title: t("prayer_salah") },
        { path: "/home/quran-topics/fasting", title: t("fasting_sawm") },
        { path: "/home/quran-topics/charity", title: t("charity_zakat") },
        { path: "/home/quran-topics/pilgrimage", title: t("pilgrimage_hajj") },
      ],
    },
  ];

  return (
    <div
      className={`h-full flex flex-col transition-all duration-300 ${
        isRTL ? "border-l" : "border-r"
      } border-orange-100 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
      style={{
        width: isMenuOpen ? "18rem" : "5rem",
        minWidth: isMenuOpen ? "18rem" : "5rem",
      }}
    >
      {/* Menu Content */}
      <div className="flex-1 flex flex-col overflow-hidden p-2">
        {/* Top Section - No Scroll */}
        <div className="flex-shrink-0">
          {/* Overview */}
          <button
            className={`w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition ${
              !isMenuOpen ? "flex-col justify-center px-2" : ""
            }`}
            title={!isMenuOpen ? t("overview") : ""}
          >
            <LayoutGrid size={20} />
            {isMenuOpen && <span className="font-medium">{t("overview")}</span>}
            {!isMenuOpen && (
              <span className="text-xs mt-1">{t("overview")}</span>
            )}
          </button>

          {/* Your Topics */}
          <NavLink
            to="/topics"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition mb-2 ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-700 hover:bg-orange-50"
              } ${!isMenuOpen ? "flex-col justify-center px-2" : ""}`
            }
            title={!isMenuOpen ? t("your_topics") : ""}
          >
            <BookOpen size={20} />
            {isMenuOpen && (
              <span className="font-medium">{t("your_topics")}</span>
            )}
            {!isMenuOpen && <span className="text-xs mt-1">{t("topics")}</span>}
          </NavLink>

          {/* Read Quran */}
          <NavLink
            to="/home/read-quran"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition mb-2 ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-700 hover:bg-orange-50"
              } ${!isMenuOpen ? "flex-col justify-center px-2" : ""}`
            }
            title={!isMenuOpen ? t("read_quran") : ""}
          >
            <BookOpen size={20} />
            {isMenuOpen && (
              <span className="font-medium">{t("read_quran")}</span>
            )}
            {!isMenuOpen && <span className="text-xs mt-1">{t("quran")}</span>}
          </NavLink>
        </div>

        {/* Quranic Topics Section - With Independent Scroll */}
        {isMenuOpen ? (
          <div className="flex-shrink-0 mb-2">
            <NavLink
              to="/home/quran-topics"
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition mb-2 ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-700 hover:bg-orange-50"
                }`
              }
            >
              <FolderOpen size={20} />
              <span className="font-medium">{t("quranic_topics")}</span>
            </NavLink>

            {expandedTopics.quranicTopics && (
              <div
                className={`mt-2 space-y-1 overflow-y-auto ${
                  isRTL ? "ml-0 mr-4 pl-2" : "ml-4 pr-2"
                }`}
                style={{ maxHeight: "220px" }}
              >
                {/* Map through all topic folders */}
                {topicFolders.map((folder) => (
                  <div key={folder.id}>
                    <button
                      onClick={() => toggleTopic(folder.id)}
                      className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition"
                    >
                      <div className="flex items-center gap-3">
                        <Folder size={18} className="text-orange-400" />
                        <span>{folder.title}</span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-gray-500 transition-transform ${
                          expandedTopics[folder.id] ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {expandedTopics[folder.id] && (
                      <div
                        className={`mt-1 space-y-1 ${isRTL ? "mr-8" : "ml-8"}`}
                      >
                        {folder.subtopics.map((subtopic) => (
                          <NavLink
                            key={subtopic.path}
                            to={subtopic.path}
                            className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg text-sm transition"
                          >
                            <Circle size={8} className="text-orange-300" />
                            <span>{subtopic.title}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          // Minimized version with hover menu
          <div
            className="relative mb-2 flex-shrink-0"
            onMouseEnter={() => setShowSubfolderMenu(true)}
            onMouseLeave={() => setShowSubfolderMenu(false)}
          >
            <NavLink
              to="/home/quran-topics"
              className={({ isActive }) =>
                `w-full flex flex-col items-center justify-center gap-1 px-2 py-2 rounded-lg transition ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-700 hover:bg-orange-50"
                }`
              }
              title={t("quranic_topics")}
            >
              <FolderOpen size={20} />
              <span className="text-xs mt-1">{t("topics")}</span>
            </NavLink>

            {/* Hover Submenu */}
            {showSubfolderMenu && (
              <div
                className={`absolute top-0 w-64 rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto ${
                  isRTL ? "right-full mr-2" : "left-full ml-2"
                } ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-white border-orange-100"
                }`}
                style={{
                  animation: "fadeIn 0.2s ease-in-out",
                }}
              >
                <div className="p-2">
                  {/* Submenu Header */}
                  <div className="px-3 py-2 font-semibold text-gray-700 border-b border-gray-200 mb-2">
                    {t("quranic_topics")}
                  </div>

                  {/* All Subfolders */}
                  {topicFolders.map((folder) => (
                    <div key={folder.id} className="mb-3">
                      <div className="px-3 py-2 text-sm font-medium text-gray-600 flex items-center gap-2">
                        <Folder size={16} className="text-orange-400" />
                        <span>{folder.title}</span>
                      </div>

                      <div className="space-y-1">
                        {folder.subtopics.map((subtopic) => (
                          <NavLink
                            key={subtopic.path}
                            to={subtopic.path}
                            className="w-full flex items-center gap-2 px-6 py-2 text-gray-600 hover:bg-orange-50 rounded-lg text-sm transition"
                          >
                            <Circle size={6} className="text-orange-300" />
                            <span>{subtopic.title}</span>
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Section - No Scroll */}
        <div className="flex-shrink-0">
          <div className="my-4 border-t border-gray-200"></div>

          {/* History */}
          <button
            className={`w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2 ${
              !isMenuOpen ? "flex-col justify-center px-2" : ""
            }`}
            title={!isMenuOpen ? t("history") : ""}
          >
            <Clock size={20} className="text-primary" />
            {isMenuOpen && <span className="font-medium">{t("history")}</span>}
            {!isMenuOpen && (
              <span className="text-xs mt-1">{t("history")}</span>
            )}
          </button>

          {/* Liked */}
          <button
            className={`w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2 ${
              !isMenuOpen ? "flex-col justify-center px-2" : ""
            }`}
            title={!isMenuOpen ? t("liked") : ""}
          >
            <Heart size={20} className="text-primary" />
            {isMenuOpen && <span className="font-medium">{t("liked")}</span>}
            {!isMenuOpen && <span className="text-xs mt-1">{t("liked")}</span>}
          </button>

          {/* Favorites */}
          <button
            className={`w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2 ${
              !isMenuOpen ? "flex-col justify-center px-2" : ""
            }`}
            title={!isMenuOpen ? t("favorites") : ""}
          >
            <Bookmark size={20} className="text-primary" />
            {isMenuOpen && (
              <span className="font-medium">{t("favorites")}</span>
            )}
            {!isMenuOpen && (
              <span className="text-xs mt-1">{t("favorites")}</span>
            )}
          </button>

          <div className="my-4 border-t border-gray-200"></div>

          {/* Settings */}
          <button
            onClick={toggleSettings}
            className={`w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2 ${
              !isMenuOpen ? "flex-col justify-center px-2" : ""
            }`}
            title={!isMenuOpen ? t("settings") : ""}
          >
            <Settings size={20} className="text-primary" />
            {isMenuOpen && <span className="font-medium">{t("settings")}</span>}
            {!isMenuOpen && (
              <span className="text-xs mt-1">{t("settings")}</span>
            )}
          </button>

          {/* Language Selector */}
          <button
            className={`w-full flex items-center justify-between px-4 py-2 text-gray-700
              rounded-lg transition ${
                !isMenuOpen ? "flex-col justify-center px-2" : ""
              }`}
            title={!isMenuOpen ? t("language") : ""}
          >
            {isMenuOpen ? (
              <>
                {/* 🌐 Language Selector */}
                <div className="mt-auto mb-3 mx-3 rounded-2xl border ">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-lg ml-2">🌐</span>
                      <span
                        className={`font-medium ${
                          theme === "dark" ? "text-gray-200" : "text-gray-800"
                        }`}
                      >
                        {t("language")}
                      </span>
                    </div>

                    <select
                      value={language}
                      onChange={(e) => changeLanguage(e.target.value)}
                      className="rounded-xl border p-1.5 m-2 text-sm font-medium outline-none transition-all duration-200"
                    >
                      <option value="en">🇬🇧 English</option>
                      <option value="ur">🇵🇰 اردو</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Globe size={20} className="text-gray-600" />
                <span className="text-xs mt-1">{t("lang")}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(${isRTL ? "10px" : "-10px"});
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
