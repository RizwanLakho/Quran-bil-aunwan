import React, { useState, useContext, useRef, useEffect } from "react";
import {
  Search,
  Mic,
  Bookmark,
  Mail,
  Bell,
  User,
  ChevronDown,
  Menu,
  LogOut,
  History,
  Edit3,
  UserCircle2,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Navbar({ isMenuOpen, toggleMenu }) {
  const { theme } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { t, i18n } = useTranslation();

  const isRTL = i18n.language === "ur";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`w-full px-8 py-4 flex-shrink-0 ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-[#DA885633] text-gray-800"
      }`}
    >
      <div className="flex items-center justify-between gap-4 relative">
        {/* Left/Right Side: Menu Button and Title (switches based on RTL) */}
        <div className="flex justify-between gap-12 items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={toggleMenu}
              className="flex justify-between gap-12 text-primary hover:text-orange-500 transition-colors"
            >
              <div
                className={`text-xl font-bold text-primary ${isRTL ? "font-urdu" : ""}`}
              >
                {t("app_title")}
              </div>
              <Menu size={28} />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div
            className={`relative flex items-center rounded-full shadow-sm ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
          >
            <Search
              className={`absolute text-primary ${isRTL ? "right-4" : "left-4"}`}
              size={20}
            />
            <input
              type="text"
              placeholder={t("search_placeholder")}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={`w-full py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                isRTL ? "pr-12 pl-12 text-right" : "pl-12 pr-12 text-left"
              } ${
                theme === "dark" ? "text-white bg-gray-700" : "text-gray-700"
              }`}
            />
            <button
              className={`absolute text-primary hover:text-orange-500 ${isRTL ? "left-4" : "right-4"}`}
            >
              <Mic size={20} />
            </button>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3 relative" ref={dropdownRef}>
          {/* Bookmark Icon */}
          <button
            className={`p-3 rounded-full shadow-sm hover:shadow-md transition-shadow ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
            title={t("bookmarks")}
          >
            <Bookmark size={20} className="text-primary" />
          </button>

          {/* Mail Icon */}
          <button
            className={`p-3 rounded-full shadow-sm hover:shadow-md transition-shadow ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
            title={t("messages")}
          >
            <Mail size={20} className="text-primary" />
          </button>

          {/* Notification Icon */}
          <button
            className={`p-3 rounded-full shadow-sm hover:shadow-md transition-shadow ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
            title={t("notifications")}
          >
            <Bell size={20} className="text-primary" />
          </button>

          {/* User Profile with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-3 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow ${
                isRTL ? "pr-2 pl-4" : "pl-2 pr-4"
              } ${theme === "dark" ? "bg-gray-700" : "bg-white"}`}
            >
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <span
                className={`font-medium ${isRTL ? "font-urdu" : ""} ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {t("user_name")}
              </span>
              <ChevronDown
                size={18}
                className={`transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                } ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className={`absolute mt-3 w-48 rounded-2xl shadow-lg border overflow-hidden z-50 ${
                  isRTL ? "left-0" : "right-0"
                } ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                <button
                  className={`flex w-full items-center gap-2 px-4 py-3 hover:bg-hover transition-colors ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <UserCircle2 size={18} className="text-primary" />
                  <span className={isRTL ? "font-urdu" : ""}>
                    {t("view_profile")}
                  </span>
                </button>
                <button
                  className={`flex w-full items-center gap-2 px-4 py-3 hover:bg-hover transition-colors ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <Edit3 size={18} className="text-primary" />
                  <span className={isRTL ? "font-urdu" : ""}>
                    {t("edit_profile")}
                  </span>
                </button>
                <button
                  className={`flex w-full items-center gap-2 px-4 py-3 hover:bg-hover transition-colors ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <History size={18} className="text-primary" />
                  <span className={isRTL ? "font-urdu" : ""}>
                    {t("view_history")}
                  </span>
                </button>
                <button
                  className={`flex w-full items-center gap-2 px-4 py-3 text-red-500 hover:bg-hover transition-colors ${
                    isRTL ? "flex-row-reverse" : ""
                  }`}
                >
                  <LogOut size={18} />
                  <span className={isRTL ? "font-urdu" : ""}>
                    {t("logout")}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
