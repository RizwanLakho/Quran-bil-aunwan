import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
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
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header({ isMenuOpen, toggleSettings }) {
  const { theme } = useContext(ThemeContext);
  const [expandedTopics, setExpandedTopics] = useState({
    quranicTopics: true,
    allah: false,
    muhammad: false,
    anmbiyah: true,
    imamat: false,
    qiyyamah: false,
    parenting: false,
    ilam: false,
  });

  const toggleTopic = (topic) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topic]: !prev[topic],
    }));
  };

  return (
    <div
      className={`h-full border-r border-orange-100 flex flex-col transition-all duration-300 ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-[#DA885633] text-gray-800"
      }`}
      style={{
        width: isMenuOpen ? "18rem" : "0",
        minWidth: isMenuOpen ? "18rem" : "0",
        overflow: "hidden",
      }}
    >
      {/* Menu Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Overview */}
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition">
          <LayoutGrid size={20} />
          <span className="font-medium">Overview</span>
        </button>

        {/* Your Topics */}
        <NavLink
          to="/topics"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-4 py-3 rounded-full transition mb-2 ${
              isActive
                ? "bg-primary text-white shadow-md"
                : "text-gray-700 hover:bg-orange-50"
            }`
          }
        >
          <BookOpen size={20} />
          <span className="font-medium">Your Topics</span>
        </NavLink>

        {/* Read Quran */}
        <NavLink
          to="/read-quran"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-4 py-3 rounded-full transition mb-2 ${
              isActive
                ? "bg-primary text-white shadow-md"
                : "text-gray-700 hover:bg-orange-50"
            }`
          }
        >
          <BookOpen size={20} />
          <span className="font-medium">Read Quran</span>
        </NavLink>

        {/* Quranic Topics */}
        <div className="mb-2">
          <NavLink
            to="/quran-topics"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-full transition mb-2 ${
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
              {/* Allah */}
              <div>
                <button
                  onClick={() => toggleTopic("allah")}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition"
                >
                  <div className="flex items-center gap-3">
                    <Folder size={18} className="text-orange-400" />
                    <span>Allah</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform ${
                      expandedTopics.allah ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedTopics.allah && (
                  <div className="ml-8 mt-1 space-y-1">
                    <NavLink
                      to="/quran-topics/names-of-allah"
                      className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg text-sm transition"
                    >
                      <Circle size={8} className="text-orange-300" />
                      <span>Names of Allah</span>
                    </NavLink>
                    <NavLink
                      to="/quran-topics/Attributes"
                      className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg text-sm transition"
                    >
                      <Circle size={8} className="text-orange-300" />
                      <span>Attributes</span>
                    </NavLink>
                    <NavLink
                      to="/quran-topics/Worship"
                      className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg text-sm transition"
                    >
                      <Circle size={8} className="text-orange-300" />
                      <span>Worship</span>
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="my-4 border-t border-gray-200"></div>

        {/* History */}
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2">
          <Clock size={20} className="text-primary" />
          <span className="font-medium">History</span>
        </button>

        {/* Liked */}
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2">
          <Heart size={20} className="text-primary" />
          <span className="font-medium">Liked</span>
        </button>

        {/* Favorites */}
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2">
          <Bookmark size={20} className="text-primary" />
          <span className="font-medium">Favorites</span>
        </button>

        <div className="my-4 border-t border-gray-200"></div>

        {/* Settings */}
        <button
          onClick={toggleSettings}
          className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition mb-2"
        >
          <Settings size={20} className="text-primary" />
          <span className="font-medium">Settings</span>
        </button>

        {/* Language Selector */}
        <button className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              🇬🇧
            </div>
            <span className="font-medium">English UK</span>
          </div>
          <ChevronDown size={18} className="text-gray-400" />
        </button>
      </div>
    </div>
  );
}
