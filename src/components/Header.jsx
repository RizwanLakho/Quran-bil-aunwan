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
  Menu,
  ChevronDown,
  Circle,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

export default function Header() {
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
      className={`w-80 h-full border-r border-orange-100 flex flex-col ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-gray-800"
      }`}
    >
      <div className="p-6 flex items-center justify-between border-b border-orange-100 flex-shrink-0">
        <h1 className="text-2xl font-bold text-primary">Quran Title</h1>
        <button className="text-primary hover:text-orange-500">
          <Menu size={24} />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Overview */}
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors mb-2">
          <LayoutGrid size={20} />
          <span className="font-medium">Overview</span>
        </button>
        <NavLink
          to="/topics"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-4 py-3 rounded-full transition-colors mb-2 ${
              isActive
                ? "bg-primary text-white shadow-md"
                : "text-gray-700 hover:bg-orange-50"
            }`
          }
        >
          <BookOpen size={20} />
          <span className="font-medium">Your Topics</span>
        </NavLink>
        {/* Read Quran - Active */}
        <NavLink
          to="/read-quran"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-4 py-3 rounded-full transition-colors mb-2 ${
              isActive
                ? "bg-primary text-white shadow-md"
                : "text-gray-700 hover:bg-orange-50"
            }`
          }
        >
          <BookOpen size={20} />
          <span className="font-medium">Read Quran</span>
        </NavLink>

        {/* Quranic Topics - Main Expandable */}
        <div className="mb-2">
          <NavLink
            to="/quran-topics"
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-full transition-colors mb-2 ${
                isActive
                  ? "bg-primary text-white shadow-md"
                  : "text-gray-700 hover:bg-orange-50"
              }`
            }
          >
            <FolderOpen size={20} />
            <span className="font-medium">Quranic Topics</span>
          </NavLink>

          {/* Topics List */}
          {expandedTopics.quranicTopics && (
            <div className="ml-4 mt-2 space-y-1">
              {/* Allah - Expandable */}
              <div>
                <button
                  onClick={() => toggleTopic("allah")}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Folder size={18} className="text-orange-400" />
                    <span>Allah</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${expandedTopics.allah ? "rotate-180" : ""}`}
                  />
                </button>

                {expandedTopics.allah && (
                  <div className="ml-8 mt-1 space-y-1">
                    <NavLink
                      to="/quran-topics/names-of-allah"
                      className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm"
                    >
                      <Circle size={8} className="text-orange-300" />
                      <span>Names of Allah</span>
                    </NavLink>
                    <NavLink
                      to="/quran-topics/Attributes"
                      className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm"
                    >
                      <Circle size={8} className="text-orange-300" />
                      <span>Attributes</span>
                    </NavLink>
                    <NavLink
                      to="/quran-topics/Worship"
                      className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm"
                    >
                      <Circle size={8} className="text-orange-300" />
                      <span>Worship</span>
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Muhammad (SAW) - Expandable */}
              <div>
                <button
                  onClick={() => toggleTopic("muhammad")}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Folder size={18} className="text-orange-400" />
                    <span>Muhammad (SAW)</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${expandedTopics.muhammad ? "rotate-180" : ""}`}
                  />
                </button>

                {expandedTopics.muhammad && (
                  <div className="ml-8 mt-1 space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-orange-300" />
                      <span>Life Events</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-orange-300" />
                      <span>Teachings</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-orange-300" />
                      <span>Miracles</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Anmbiyah - Expandable */}
              <div>
                <button
                  onClick={() => toggleTopic("anmbiyah")}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Folder size={18} className="text-orange-400" />
                    <span>Anmbiyah</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${expandedTopics.anmbiyah ? "rotate-180" : ""}`}
                  />
                </button>

                {expandedTopics.anmbiyah && (
                  <div className="ml-8 mt-1 space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-orange-300" />
                      <span>Adam (A.S)</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-orange-300" />
                      <span>Idrees (A.S)</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-orange-300" />
                      <span>Ibrahim (A.S)</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-orange-300" />
                      <span>Loot (A.S)</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Imamat - Expandable */}
              <div>
                <button
                  onClick={() => toggleTopic("imamat")}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Folder size={18} className="text-orange-400" />
                    <span>Imamat</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${expandedTopics.imamat ? "rotate-180" : ""}`}
                  />
                </button>

                {expandedTopics.imamat && (
                  <div className="ml-8 mt-1 space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-orange-300" />
                      <span>Leadership</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-orange-300" />
                      <span>Guidance</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Qiyyamah - Expandable */}
              <div>
                <button
                  onClick={() => toggleTopic("qiyyamah")}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Folder size={18} className="text-orange-400" />
                    <span>Qiyyamah</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${expandedTopics.qiyyamah ? "rotate-180" : ""}`}
                  />
                </button>

                {expandedTopics.qiyyamah && (
                  <div className="ml-8 mt-1 space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-orange-300" />
                      <span>Day of Judgment</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-orange-300" />
                      <span>Signs</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-orange-300" />
                      <span>Paradise & Hell</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Parenting - Expandable */}
              <div>
                <button
                  onClick={() => toggleTopic("parenting")}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Folder size={18} className="text-primary" />
                    <span>Parenting</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${expandedTopics.parenting ? "rotate-180" : ""}`}
                  />
                </button>

                {expandedTopics.parenting && (
                  <div className="ml-8 mt-1 space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-primary" />
                      <span>Children Rights</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-primary" />
                      <span>Education</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-primary" />
                      <span>Family Values</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Ilam - Expandable */}
              <div>
                <button
                  onClick={() => toggleTopic("ilam")}
                  className="w-full flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Folder size={18} className="text-primary" />
                    <span>Ilam</span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-gray-500 transition-transform duration-200 ${expandedTopics.ilam ? "rotate-180" : ""}`}
                  />
                </button>

                {expandedTopics.ilam && (
                  <div className="ml-8 mt-1 space-y-1">
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-primary" />
                      <span>Seeking Knowledge</span>
                    </button>
                    <button className="w-full flex items-center gap-3 px-4 py-2 text-gray-600 hover:bg-orange-50 rounded-lg transition-colors text-sm">
                      <Circle size={8} className="text-primary" />
                      <span>Scholars</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-gray-200"></div>

        {/* History */}
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors mb-2">
          <Clock size={20} className="text-primary" />
          <span className="font-medium">History</span>
        </button>

        {/* Liked */}
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors mb-2">
          <Heart size={20} className="text-primary" />
          <span className="font-medium">Liked</span>
        </button>

        {/* Favorites */}
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors mb-2">
          <Bookmark size={20} className="text-primary" />
          <span className="font-medium">Favorites</span>
        </button>

        {/* Divider */}
        <div className="my-4 border-t border-gray-200"></div>

        {/* Settings */}
        <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors mb-2">
          <Settings size={20} className="text-primary" />
          <span className="font-medium">Settings</span>
        </button>

        {/* Language Selector */}
        <button className="w-full flex items-center justify-between px-4 py-3 text-gray-700 hover:bg-orange-50 rounded-lg transition-colors">
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
