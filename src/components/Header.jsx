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
  const [expandedTopics, setExpandedTopics] = useState({
    quranicTopics: true,
    allah: false,
    nabowat: false,
    imamat: false,
    qiyamat: false,
    islamicLaw: false,
  });
  const [showSubfolderMenu, setShowSubfolderMenu] = useState(false);

  const toggleTopic = (topic) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topic]: !prev[topic],
    }));
  };

  const { t, i18n } = useTranslation();
  const [language, setLanguage] = useState("en");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
  };

  // Topic data structure
  const topicFolders = [
    {
      id: "allah",
      title: "Allah",
      subtopics: [
        { path: "/home/quran-topics/names-of-allah", title: "Names of Allah" },
        { path: "/home/quran-topics/Attributes", title: "Attributes" },
        { path: "/home/quran-topics/Worship", title: "Worship" },
      ],
    },
    {
      id: "nabowat",
      title: "Nabowat",
      subtopics: [
        { path: "/home/quran-topics/prophets", title: "Prophets" },
        {
          path: "/home/quran-topics/prophet-muhammad",
          title: "Prophet Muhammad",
        },
        { path: "/home/quran-topics/revelation", title: "Revelation" },
        { path: "/home/quran-topics/miracles", title: "Miracles" },
      ],
    },
    {
      id: "imamat",
      title: "Imamat",
      subtopics: [
        { path: "/home/quran-topics/imams", title: "Imams" },
        { path: "/home/quran-topics/guidance", title: "Guidance" },
        { path: "/home/quran-topics/wilayah", title: "Wilayah" },
        { path: "/home/quran-topics/succession", title: "Succession" },
      ],
    },
    {
      id: "qiyamat",
      title: "Qiyamat ",
      subtopics: [
        { path: "/home/quran-topics/resurrection", title: "Resurrection" },
        { path: "/home/quran-topics/heaven", title: "Heaven (Jannah)" },
        { path: "/home/quran-topics/hell", title: "Hell (Jahannam)" },
        { path: "/home/quran-topics/accountability", title: "Accountability" },
      ],
    },
    {
      id: "islamicLaw",
      title: "Islamic Law ",
      subtopics: [
        { path: "/home/quran-topics/prayer", title: "Prayer (Salah)" },
        { path: "/home/quran-topics/fasting", title: "Fasting (Sawm)" },
        { path: "/home/quran-topics/charity", title: "Charity (Zakat)" },
        { path: "/home/quran-topics/pilgrimage", title: "Pilgrimage (Hajj)" },
      ],
    },
  ];

  return (
    <div
      className={`h-full border-r border-orange-100 flex flex-col transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-[#DA885633] text-gray-800"
      }`}
      style={{
        width: isMenuOpen ? "18rem" : "5rem",
        minWidth: isMenuOpen ? "18rem" : "5rem",
      }}
    >
      {/* Menu Content */}
      <div className="flex-1 overflow-y-auto p-2">
        {/* Overview */}
        <button
          className={`w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition ${
            !isMenuOpen ? "flex-col justify-center px-2" : ""
          }`}
          title={!isMenuOpen ? "Overview" : ""}
        >
          <LayoutGrid size={20} />
          {isMenuOpen && <span className="font-medium">Overview</span>}
          {!isMenuOpen && <span className="text-xs mt-1">Overview</span>}
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
          title={!isMenuOpen ? "Your Topics" : ""}
        >
          <BookOpen size={20} />
          {isMenuOpen && <span className="font-medium">Your Topics</span>}
          {!isMenuOpen && <span className="text-xs mt-1">Topics</span>}
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
          title={!isMenuOpen ? "Read Quran" : ""}
        >
          <BookOpen size={20} />
          {isMenuOpen && <span className="font-medium">Read Quran</span>}
          {!isMenuOpen && <span className="text-xs mt-1">Quran</span>}
        </NavLink>

        {/* Quranic Topics - Full version when expanded */}
        {isMenuOpen ? (
          <div className="mb-2">
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
              <span className="font-medium">Quranic Topics</span>
            </NavLink>

            {expandedTopics.quranicTopics && (
              <div className="ml-4 mt-2 space-y-1">
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
                      <div className="ml-8 mt-1 space-y-1">
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
            className="relative mb-2"
            onMouseEnter={() => setShowSubfolderMenu(true)}
            onMouseLeave={() => setShowSubfolderMenu(false)}
          >
            <NavLink
              to="/home/quran-topics"
              className={({ isActive }) =>
                `w-full flex flex-col items-center justify-center gap-1 px-2 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-700 hover:bg-orange-50"
                }`
              }
              title="Quranic Topics"
            >
              <FolderOpen size={20} />
              <span className="text-xs mt-1">Topics</span>
            </NavLink>

            {/* Hover Submenu */}
            {showSubfolderMenu && (
              <div
                className={`absolute left-full top-0 ml-2 w-64 rounded-lg shadow-xl border z-50 max-h-96 overflow-y-auto ${
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
                    Quranic Topics
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

        <div className="my-4 border-t border-gray-200"></div>

        {/* History */}
        <button
          className={`w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2 ${
            !isMenuOpen ? "flex-col justify-center px-2" : ""
          }`}
          title={!isMenuOpen ? "History" : ""}
        >
          <Clock size={20} className="text-primary" />
          {isMenuOpen && <span className="font-medium">History</span>}
          {!isMenuOpen && <span className="text-xs mt-1">History</span>}
        </button>

        {/* Liked */}
        <button
          className={`w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2 ${
            !isMenuOpen ? "flex-col justify-center px-2" : ""
          }`}
          title={!isMenuOpen ? "Liked" : ""}
        >
          <Heart size={20} className="text-primary" />
          {isMenuOpen && <span className="font-medium">Liked</span>}
          {!isMenuOpen && <span className="text-xs mt-1">Liked</span>}
        </button>

        {/* Favorites */}
        <button
          className={`w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2 ${
            !isMenuOpen ? "flex-col justify-center px-2" : ""
          }`}
          title={!isMenuOpen ? "Favorites" : ""}
        >
          <Bookmark size={20} className="text-primary" />
          {isMenuOpen && <span className="font-medium">Favorites</span>}
          {!isMenuOpen && <span className="text-xs mt-1">Favorites</span>}
        </button>

        <div className="my-4 border-t border-gray-200"></div>

        {/* Settings */}
        <button
          onClick={toggleSettings}
          className={`w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2 ${
            !isMenuOpen ? "flex-col justify-center px-2" : ""
          }`}
          title={!isMenuOpen ? "Settings" : ""}
        >
          <Settings size={20} className="text-primary" />
          {isMenuOpen && <span className="font-medium">Settings</span>}
          {!isMenuOpen && <span className="text-xs mt-1">Settings</span>}
        </button>

        {/* Language Selector */}
        <button
          className={`w-full flex items-center justify-between px-4 py-3 text-gray-700
            rounded-lg transition ${
              !isMenuOpen ? "flex-col justify-center px-2" : ""
            }`}
          title={!isMenuOpen ? "Language" : ""}
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
                      {t("Language")}
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
              <span className="text-xs mt-1">Lang</span>
            </>
          )}
        </button>
      </div>

      {/* Add CSS animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateX(-10px);
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
