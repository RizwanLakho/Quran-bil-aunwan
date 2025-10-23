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
  X,
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
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <div
        className={`hidden md:flex h-full flex-col transition-all duration-300 ${
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
            <NavLink
              to="/home/overview"
              className={`w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition ${
                !isMenuOpen ? "flex-col justify-center px-2" : ""
              }`}
              title={!isMenuOpen ? t("overview") : ""}
            >
              <LayoutGrid size={20} />
              {isMenuOpen && (
                <span className="font-medium">{t("overview")}</span>
              )}
              {!isMenuOpen && (
                <span className={`text-xs mt-1 ${isRTL ? "font-urdu" : ""}`}>
                  {t("overview")}
                </span>
              )}
            </NavLink>

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
              {!isMenuOpen && (
                <span className={`text-xs mt-1 ${isRTL ? "font-urdu" : ""}`}>
                  {t("topics")}
                </span>
              )}
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
              {!isMenuOpen && (
                <span className={`text-xs mt-1 ${isRTL ? "font-urdu" : ""}`}>
                  {t("quran")}
                </span>
              )}
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
                          <span className="text-sm font-medium">
                            {folder.title}
                          </span>
                        </div>
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            expandedTopics[folder.id] ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Subtopics */}
                      {expandedTopics[folder.id] && (
                        <div className="space-y-1 mt-1">
                          {folder.subtopics.map((subtopic) => (
                            <NavLink
                              key={subtopic.path}
                              to={subtopic.path}
                              className="w-full flex items-center gap-2 px-8 py-2 text-gray-600 hover:bg-orange-50 rounded-lg text-sm transition"
                            >
                              <Circle size={6} className="text-orange-300" />
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
            <div
              className="relative flex-shrink-0 mb-2"
              onMouseEnter={() => setShowSubfolderMenu(true)}
              onMouseLeave={() => setShowSubfolderMenu(false)}
            >
              <NavLink
                to="/home/quran-topics"
                className={({ isActive }) =>
                  `w-full flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg transition mb-2 ${
                    isActive
                      ? "bg-primary text-white shadow-md"
                      : "text-gray-700 hover:bg-orange-50"
                  }`
                }
                title={t("quranic_topics")}
              >
                <FolderOpen size={20} />
                <span className={`text-xs mt-1 ${isRTL ? "font-urdu" : ""}`}>
                  {t("topics")}
                </span>
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
          <div className="flex-shrink-0 mt-auto">
            <div className="my-4 border-t border-gray-200"></div>

            {/* History */}
            <button
              className={`w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2 ${
                !isMenuOpen ? "flex-col justify-center px-2" : ""
              }`}
              title={!isMenuOpen ? t("history") : ""}
            >
              <Clock size={20} className="text-primary" />
              {isMenuOpen && (
                <span className="font-medium">{t("history")}</span>
              )}
              {!isMenuOpen && (
                <span className={`text-xs mt-1 ${isRTL ? "font-urdu" : ""}`}>
                  {t("history")}
                </span>
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
              {!isMenuOpen && (
                <span className={`text-xs mt-1 ${isRTL ? "font-urdu" : ""}`}>
                  {t("liked")}
                </span>
              )}
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
                <span className={`text-xs mt-1 ${isRTL ? "font-urdu" : ""}`}>
                  {t("favorites")}
                </span>
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
              {isMenuOpen && (
                <span className="font-medium">{t("settings")}</span>
              )}
              {!isMenuOpen && (
                <span className={`text-xs mt-1 ${isRTL ? "font-urdu" : ""}`}>
                  {t("settings")}
                </span>
              )}
            </button>

            {/* Language Selector */}
            {isMenuOpen ? (
              <div
                className={`w-full rounded-xl border p-3 transition-colors ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600"
                    : "bg-orange-50 border-orange-200"
                }`}
              >
                <div
                  className={`flex items-center justify-between gap-3 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex items-center gap-2 ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Globe
                      size={20}
                      className={
                        theme === "dark" ? "text-primary" : "text-primary"
                      }
                    />
                    <span
                      className={`font-medium text-sm ${
                        isRTL ? "font-urdu" : ""
                      } ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
                    >
                      {t("language")}
                    </span>
                  </div>

                  <select
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium outline-none cursor-pointer transition-all duration-200 ${
                      isRTL ? "text-right font-urdu" : ""
                    } ${
                      theme === "dark"
                        ? "bg-gray-800 text-white border border-gray-600 hover:bg-gray-600"
                        : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <option value="en">🇬🇧 English</option>
                    <option value="ur">🇵🇰 اردو</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="w-full px-2">
                <select
                  value={language}
                  onChange={(e) => changeLanguage(e.target.value)}
                  className={`w-full rounded-lg px-2 py-2 text-xs font-medium outline-none cursor-pointer transition-all duration-200 text-center ${
                    theme === "dark"
                      ? "bg-gray-700 text-white border border-gray-600 hover:bg-gray-600"
                      : "bg-orange-50 text-gray-800 border border-orange-200 hover:bg-orange-100"
                  }`}
                  title={t("language")}
                >
                  <option value="en">🇬🇧 EN</option>
                  <option value="ur">🇵🇰 UR</option>
                </select>
              </div>
            )}
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

      {/* Mobile Drawer - Visible only on mobile when menu is open */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => {
              /* Close menu - this will be handled by parent */
            }}
          ></div>

          {/* Drawer */}
          <div
            className={`absolute top-0 ${isRTL ? "right-0" : "left-0"} h-full w-80 max-w-[85vw] ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            } shadow-2xl overflow-y-auto`}
          >
            {/* Drawer Content - Same structure as desktop but always expanded */}
            <div className="flex flex-col h-full p-4">
              {/* Close button */}
              <button
                onClick={() => {
                  /* Close menu - handled by parent */
                }}
                className={`self-end mb-4 p-2 rounded-full hover:bg-orange-50 transition ${isRTL ? "mr-auto ml-0" : "ml-auto mr-0"}`}
              >
                <X size={24} className="text-gray-600" />
              </button>

              {/* Navigation Items - Same as desktop expanded state */}
              <div className="flex-1 overflow-y-auto">
                {/* Overview */}
                <NavLink
                  to="/home/overview"
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2"
                >
                  <LayoutGrid size={20} />
                  <span className="font-medium">{t("overview")}</span>
                </NavLink>

                {/* Your Topics */}
                <NavLink
                  to="/topics"
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition mb-2 ${
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-700 hover:bg-orange-50"
                    }`
                  }
                >
                  <BookOpen size={20} />
                  <span className="font-medium">{t("your_topics")}</span>
                </NavLink>

                {/* Read Quran */}
                <NavLink
                  to="/home/read-quran"
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition mb-2 ${
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-700 hover:bg-orange-50"
                    }`
                  }
                >
                  <BookOpen size={20} />
                  <span className="font-medium">{t("read_quran")}</span>
                </NavLink>

                {/* Quranic Topics */}
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

                {/* Topic folders with subtopics */}
                <div className="ml-4 space-y-1">
                  {topicFolders.map((folder) => (
                    <div key={folder.id}>
                      <button
                        onClick={() => toggleTopic(folder.id)}
                        className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition"
                      >
                        <div className="flex items-center gap-3">
                          <Folder size={18} className="text-orange-400" />
                          <span className="text-sm font-medium">
                            {folder.title}
                          </span>
                        </div>
                        <ChevronDown
                          size={16}
                          className={`transition-transform ${
                            expandedTopics[folder.id] ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expandedTopics[folder.id] && (
                        <div className="space-y-1 mt-1">
                          {folder.subtopics.map((subtopic) => (
                            <NavLink
                              key={subtopic.path}
                              to={subtopic.path}
                              className="w-full flex items-center gap-2 px-8 py-2 text-gray-600 hover:bg-orange-50 rounded-lg text-sm transition"
                            >
                              <Circle size={6} className="text-orange-300" />
                              <span>{subtopic.title}</span>
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="my-4 border-t border-gray-200"></div>

                {/* Bottom items */}
                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2">
                  <Clock size={20} className="text-primary" />
                  <span className="font-medium">{t("history")}</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2">
                  <Heart size={20} className="text-primary" />
                  <span className="font-medium">{t("liked")}</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2">
                  <Bookmark size={20} className="text-primary" />
                  <span className="font-medium">{t("favorites")}</span>
                </button>

                <div className="my-4 border-t border-gray-200"></div>

                <button
                  onClick={toggleSettings}
                  className="w-full flex items-center gap-3 px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2"
                >
                  <Settings size={20} className="text-primary" />
                  <span className="font-medium">{t("settings")}</span>
                </button>

                {/* Language Selector */}
                <div
                  className={`w-full rounded-xl border p-3 transition-colors ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-orange-50 border-orange-200"
                  }`}
                >
                  <div
                    className={`flex items-center justify-between gap-3 ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex items-center gap-2 ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Globe size={20} className="text-primary" />
                      <span
                        className={`font-medium text-sm ${
                          isRTL ? "font-urdu" : ""
                        } ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
                      >
                        {t("language")}
                      </span>
                    </div>

                    <select
                      value={language}
                      onChange={(e) => changeLanguage(e.target.value)}
                      className={`rounded-lg px-3 py-1.5 text-sm font-medium outline-none cursor-pointer ${
                        isRTL ? "text-right font-urdu" : ""
                      } ${
                        theme === "dark"
                          ? "bg-gray-800 text-white border border-gray-600"
                          : "bg-white text-gray-800 border border-gray-300"
                      }`}
                    >
                      <option value="en">🇬🇧 English</option>
                      <option value="ur">🇵🇰 اردو</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
