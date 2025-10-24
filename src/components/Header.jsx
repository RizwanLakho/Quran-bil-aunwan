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
        } ${
          theme === "dark"
            ? "bg-gray-800 text-white border-gray-700"
            : "bg-white text-gray-800 border-orange-100"
        }`}
        style={{
          width: isMenuOpen ? "16rem" : "4.5rem",
          minWidth: isMenuOpen ? "16rem" : "4.5rem",
        }}
      >
        {/* Menu Content */}
        <div className="flex-1 flex flex-col overflow-hidden py-2 px-1.5">
          {/* Top Section - No Scroll */}
          <div className="flex-shrink-0 space-y-0.5">
            {/* Overview */}
            <NavLink
              to="/home/overview"
              className={({ isActive }) =>
                `w-full flex items-center gap-2 px-2.5 py-2 rounded-lg transition text-sm ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-orange-50"
                } ${!isMenuOpen ? "flex-col justify-center px-1.5" : ""}`
              }
              title={!isMenuOpen ? t("overview") : ""}
            >
              <LayoutGrid size={18} />
              {isMenuOpen && (
                <span className="font-medium text-sm">{t("overview")}</span>
              )}
              {!isMenuOpen && (
                <span
                  className={`text-[10px] mt-0.5 ${isRTL ? "font-urdu" : ""}`}
                >
                  {t("overview")}
                </span>
              )}
            </NavLink>

            {/* Read Quran */}
            <NavLink
              to="/home/read-quran"
              className={({ isActive }) =>
                `w-full flex items-center gap-2 px-2.5 py-2 rounded-lg transition text-sm ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-orange-50"
                } ${!isMenuOpen ? "flex-col justify-center px-1.5" : ""}`
              }
              title={!isMenuOpen ? t("read_quran") : ""}
            >
              <BookOpen size={18} />
              {isMenuOpen && (
                <span className="font-medium text-sm">{t("read_quran")}</span>
              )}
              {!isMenuOpen && (
                <span
                  className={`text-[10px] mt-0.5 ${isRTL ? "font-urdu" : ""}`}
                >
                  {t("quran")}
                </span>
              )}
            </NavLink>
          </div>

          {/* Quranic Topics Section - With Independent Scroll */}
          {isMenuOpen ? (
            <div className="flex-1 flex flex-col overflow-hidden mt-1">
              <NavLink
                to="/home/quran-topics"
                className={({ isActive }) =>
                  `flex-shrink-0 w-full flex items-center gap-2 px-2.5 py-2 rounded-lg transition text-sm mb-1 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-sm"
                      : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-orange-50"
                  }`
                }
              >
                <FolderOpen size={18} />
                <span className="font-medium text-sm">
                  {t("quranic_topics")}
                </span>
              </NavLink>

              {expandedTopics.quranicTopics && (
                <div className="flex-1 overflow-y-auto pr-1 space-y-0.5">
                  {topicFolders.map((folder) => (
                    <div key={folder.id}>
                      <button
                        onClick={() => toggleTopic(folder.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg transition text-sm ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-orange-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Folder size={16} className="text-orange-400" />
                          <span className="text-xs font-medium">
                            {folder.title}
                          </span>
                        </div>
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            expandedTopics[folder.id] ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expandedTopics[folder.id] && (
                        <div className="space-y-0.5 mt-0.5 ml-2">
                          {folder.subtopics.map((subtopic) => (
                            <NavLink
                              key={subtopic.path}
                              to={subtopic.path}
                              className={({ isActive }) =>
                                `w-full flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs transition ${
                                  isActive
                                    ? "bg-orange-100 text-orange-700"
                                    : theme === "dark"
                                      ? "text-gray-400 hover:bg-gray-700"
                                      : "text-gray-600 hover:bg-orange-50"
                                }`
                              }
                            >
                              <Circle size={5} className="text-orange-300" />
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
            <NavLink
              to="/home/quran-topics"
              className={({ isActive }) =>
                `flex-shrink-0 w-full flex flex-col items-center justify-center gap-1 px-1.5 py-2 rounded-lg transition text-sm mt-1 ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-orange-50"
                }`
              }
              title={t("quranic_topics")}
            >
              <FolderOpen size={18} />
              <span
                className={`text-[10px] text-center ${isRTL ? "font-urdu" : ""}`}
              >
                {t("topics")}
              </span>
            </NavLink>
          )}

          {/* Divider */}
          <div
            className={`my-2 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
          ></div>

          {/* Bottom Section - Fixed Items */}
          <div className="flex-shrink-0 space-y-0.5">
            <button
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg transition text-sm ${
                !isMenuOpen ? "flex-col justify-center px-1.5" : ""
              } ${
                theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-orange-50"
              }`}
              title={!isMenuOpen ? t("history") : ""}
            >
              <Clock size={18} className="text-orange-500" />
              {isMenuOpen && (
                <span className="font-medium text-sm">{t("history")}</span>
              )}
              {!isMenuOpen && (
                <span
                  className={`text-[10px] mt-0.5 ${isRTL ? "font-urdu" : ""}`}
                >
                  {t("history")}
                </span>
              )}
            </button>

            <NavLink
              to="/topics"
              className={({ isActive }) =>
                `w-full flex items-center gap-2 px-2.5 py-2 rounded-lg transition text-sm ${
                  isActive
                    ? "bg-orange-500 text-white shadow-sm"
                    : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-orange-50"
                } ${!isMenuOpen ? "flex-col justify-center px-1.5" : ""}`
              }
              title={!isMenuOpen ? t("your_topics") : ""}
            >
              <BookOpen size={18} className="text-orange-500" />
              {isMenuOpen && (
                <span className="font-medium text-sm">{t("your_topics")}</span>
              )}
              {!isMenuOpen && (
                <span
                  className={`text-[10px] mt-0.5 text-center ${isRTL ? "font-urdu" : ""}`}
                >
                  {t("topics")}
                </span>
              )}
            </NavLink>

            <button
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg transition text-sm ${
                !isMenuOpen ? "flex-col justify-center px-1.5" : ""
              } ${
                theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-orange-50"
              }`}
              title={!isMenuOpen ? t("liked") : ""}
            >
              <Heart size={18} className="text-orange-500" />
              {isMenuOpen && (
                <span className="font-medium text-sm">{t("liked")}</span>
              )}
              {!isMenuOpen && (
                <span
                  className={`text-[10px] mt-0.5 ${isRTL ? "font-urdu" : ""}`}
                >
                  {t("liked")}
                </span>
              )}
            </button>

            <button
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg transition text-sm ${
                !isMenuOpen ? "flex-col justify-center px-1.5" : ""
              } ${
                theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-orange-50"
              }`}
              title={!isMenuOpen ? t("favorites") : ""}
            >
              <Bookmark size={18} className="text-orange-500" />
              {isMenuOpen && (
                <span className="font-medium text-sm">{t("favorites")}</span>
              )}
              {!isMenuOpen && (
                <span
                  className={`text-[10px] mt-0.5 ${isRTL ? "font-urdu" : ""}`}
                >
                  {t("favorites")}
                </span>
              )}
            </button>

            <div
              className={`my-2 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
            ></div>

            <button
              onClick={toggleSettings}
              className={`w-full flex items-center gap-2 px-2.5 py-2 rounded-lg transition text-sm ${
                !isMenuOpen ? "flex-col justify-center px-1.5" : ""
              } ${
                theme === "dark"
                  ? "text-gray-300 hover:bg-gray-700"
                  : "text-gray-700 hover:bg-orange-50"
              }`}
              title={!isMenuOpen ? t("settings") : ""}
            >
              <Settings size={18} className="text-orange-500" />
              {isMenuOpen && (
                <span className="font-medium text-sm">{t("settings")}</span>
              )}
              {!isMenuOpen && (
                <span
                  className={`text-[10px] mt-0.5 ${isRTL ? "font-urdu" : ""}`}
                >
                  {t("settings")}
                </span>
              )}
            </button>

            {/* Language Selector */}
            {isMenuOpen && (
              <div
                className={`w-full rounded-lg border p-2 transition-colors ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600"
                    : "bg-orange-50 border-orange-200"
                }`}
              >
                <div
                  className={`flex items-center justify-between gap-2 ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex items-center gap-1.5 ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <Globe size={16} className="text-orange-500" />
                    <span
                      className={`font-medium text-xs ${
                        isRTL ? "font-urdu" : ""
                      } ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
                    >
                      {t("language")}
                    </span>
                  </div>

                  <select
                    value={language}
                    onChange={(e) => changeLanguage(e.target.value)}
                    className={`rounded-md px-2 py-1 text-xs font-medium outline-none cursor-pointer ${
                      isRTL ? "text-right font-urdu" : ""
                    } ${
                      theme === "dark"
                        ? "bg-gray-800 text-white border border-gray-600"
                        : "bg-white text-gray-800 border border-gray-300"
                    }`}
                  >
                    <option value="en">🇬🇧 EN</option>
                    <option value="ur">🇵🇰 اردو</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
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
            className={`absolute top-0 ${isRTL ? "right-0" : "left-0"} h-full w-72 max-w-[85vw] ${
              theme === "dark"
                ? "bg-gray-800 text-white"
                : "bg-white text-gray-800"
            } shadow-2xl overflow-y-auto`}
          >
            {/* Drawer Content */}
            <div className="flex flex-col h-full p-3">
              {/* Close button */}
              <button
                onClick={() => {
                  /* Close menu - handled by parent */
                }}
                className={`self-end mb-3 p-1.5 rounded-full hover:bg-orange-50 transition ${isRTL ? "mr-auto ml-0" : "ml-auto mr-0"}`}
              >
                <X size={20} className="text-gray-600" />
              </button>

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto space-y-0.5">
                {/* Overview */}
                <NavLink
                  to="/home/overview"
                  className={({ isActive }) =>
                    `w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
                      isActive
                        ? "bg-orange-500 text-white shadow-sm"
                        : theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-orange-50"
                    }`
                  }
                >
                  <LayoutGrid size={18} />
                  <span className="font-medium text-sm">{t("overview")}</span>
                </NavLink>

                {/* Read Quran */}
                <NavLink
                  to="/home/read-quran"
                  className={({ isActive }) =>
                    `w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
                      isActive
                        ? "bg-orange-500 text-white shadow-sm"
                        : theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-orange-50"
                    }`
                  }
                >
                  <BookOpen size={18} />
                  <span className="font-medium text-sm">{t("read_quran")}</span>
                </NavLink>

                {/* Quranic Topics */}
                <NavLink
                  to="/home/quran-topics"
                  className={({ isActive }) =>
                    `w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
                      isActive
                        ? "bg-orange-500 text-white shadow-sm"
                        : theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-orange-50"
                    }`
                  }
                >
                  <FolderOpen size={18} />
                  <span className="font-medium text-sm">
                    {t("quranic_topics")}
                  </span>
                </NavLink>

                {/* Topic folders with subtopics */}
                <div className="ml-2 space-y-0.5">
                  {topicFolders.map((folder) => (
                    <div key={folder.id}>
                      <button
                        onClick={() => toggleTopic(folder.id)}
                        className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg transition text-sm ${
                          theme === "dark"
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-700 hover:bg-orange-50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Folder size={16} className="text-orange-400" />
                          <span className="text-xs font-medium">
                            {folder.title}
                          </span>
                        </div>
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            expandedTopics[folder.id] ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {expandedTopics[folder.id] && (
                        <div className="space-y-0.5 mt-0.5 ml-3">
                          {folder.subtopics.map((subtopic) => (
                            <NavLink
                              key={subtopic.path}
                              to={subtopic.path}
                              className={({ isActive }) =>
                                `w-full flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition ${
                                  isActive
                                    ? "bg-orange-100 text-orange-700"
                                    : theme === "dark"
                                      ? "text-gray-400 hover:bg-gray-700"
                                      : "text-gray-600 hover:bg-orange-50"
                                }`
                              }
                            >
                              <Circle size={5} className="text-orange-300" />
                              <span>{subtopic.title}</span>
                            </NavLink>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div
                  className={`my-2 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
                ></div>

                {/* Bottom items */}
                <button
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  <Clock size={18} className="text-orange-500" />
                  <span className="font-medium text-sm">{t("history")}</span>
                </button>

                <NavLink
                  to="/topics"
                  className={({ isActive }) =>
                    `w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
                      isActive
                        ? "bg-orange-500 text-white shadow-sm"
                        : theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-orange-50"
                    }`
                  }
                >
                  <BookOpen size={18} className="text-orange-500" />
                  <span className="font-medium text-sm">
                    {t("your_topics")}
                  </span>
                </NavLink>

                <button
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  <Heart size={18} className="text-orange-500" />
                  <span className="font-medium text-sm">{t("liked")}</span>
                </button>

                <button
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  <Bookmark size={18} className="text-orange-500" />
                  <span className="font-medium text-sm">{t("favorites")}</span>
                </button>

                <div
                  className={`my-2 border-t ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}
                ></div>

                <button
                  onClick={toggleSettings}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition text-sm ${
                    theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-orange-50"
                  }`}
                >
                  <Settings size={18} className="text-orange-500" />
                  <span className="font-medium text-sm">{t("settings")}</span>
                </button>

                {/* Language Selector */}
                <div
                  className={`w-full rounded-lg border p-2 transition-colors ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600"
                      : "bg-orange-50 border-orange-200"
                  }`}
                >
                  <div
                    className={`flex items-center justify-between gap-2 ${
                      isRTL ? "flex-row-reverse" : ""
                    }`}
                  >
                    <div
                      className={`flex items-center gap-1.5 ${
                        isRTL ? "flex-row-reverse" : ""
                      }`}
                    >
                      <Globe size={16} className="text-orange-500" />
                      <span
                        className={`font-medium text-xs ${
                          isRTL ? "font-urdu" : ""
                        } ${theme === "dark" ? "text-gray-200" : "text-gray-800"}`}
                      >
                        {t("language")}
                      </span>
                    </div>

                    <select
                      value={language}
                      onChange={(e) => changeLanguage(e.target.value)}
                      className={`rounded-md px-2 py-1 text-xs font-medium outline-none cursor-pointer ${
                        isRTL ? "text-right font-urdu" : ""
                      } ${
                        theme === "dark"
                          ? "bg-gray-800 text-white border border-gray-600"
                          : "bg-white text-gray-800 border border-gray-300"
                      }`}
                    >
                      <option value="en">🇬🇧 EN</option>
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
