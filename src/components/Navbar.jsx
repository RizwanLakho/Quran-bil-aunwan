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
      className={`w-full px-4 md:px-8 py-3 md:py-4 flex-shrink-0 ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-[#DA885633] text-gray-800"
      }`}
    >
      <div className="flex items-center justify-between gap-2 md:gap-4 relative">
        {/* Left Side: Menu Button and Title */}
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <button
            onClick={toggleMenu}
            className="text-primary hover:text-orange-500 transition-colors flex-shrink-0"
          >
            <Menu size={24} className="md:w-7 md:h-7" />
          </button>
          <div
            className={`text-base md:text-xl font-bold text-primary truncate ${isRTL ? "font-urdu" : ""}`}
          >
            {t("app_title")}
          </div>
        </div>

        {/* Search Bar - Hidden on mobile, visible on tablet+ */}
        <div className="hidden md:flex flex-1 max-w-xl">
          <div
            className={`relative flex items-center w-full rounded-full shadow-sm ${
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
        <div
          className="flex items-center gap-1 md:gap-3 relative"
          ref={dropdownRef}
        >
          {/* Bookmark Icon - Hidden on mobile */}
          <button
            className={`hidden md:flex p-3 rounded-full shadow-sm hover:shadow-md transition-shadow ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
            title={t("bookmarks")}
          >
            <Bookmark size={20} className="text-primary" />
          </button>

          {/* Mail Icon - Hidden on mobile */}
          <button
            className={`hidden md:flex p-3 rounded-full shadow-sm hover:shadow-md transition-shadow ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
            title={t("messages")}
          >
            <Mail size={20} className="text-primary" />
          </button>

          {/* Notification Icon - Visible on mobile */}
          <button
            className={`p-2 md:p-3 rounded-full shadow-sm hover:shadow-md transition-shadow ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
            title={t("notifications")}
          >
            <Bell size={18} className="text-primary md:w-5 md:h-5" />
          </button>

          {/* User Profile with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-1 md:gap-3 py-1 md:py-2 rounded-full shadow-sm hover:shadow-md transition-shadow ${
                isRTL
                  ? "pr-1 md:pr-2 pl-2 md:pl-4"
                  : "pl-1 md:pl-2 pr-2 md:pr-4"
              } ${theme === "dark" ? "bg-gray-700" : "bg-white"}`}
            >
              <div className="w-8 h-8 md:w-9 md:h-9 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                <User size={16} className="text-white md:w-5 md:h-5" />
              </div>
              <span
                className={`hidden sm:block font-medium text-sm md:text-base ${isRTL ? "font-urdu" : ""} ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                {t("user_name")}
              </span>
              <ChevronDown
                size={16}
                className={`hidden sm:block transition-transform duration-200 md:w-[18px] md:h-[18px] ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                } ${theme === "dark" ? "text-gray-300" : "text-gray-500"}`}
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className={`absolute mt-2 md:mt-3 w-48 md:w-52 rounded-2xl shadow-lg border overflow-hidden z-50 ${
                  isRTL ? "left-0" : "right-0"
                } ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                {/* View Profile */}
                <button
                  className={`flex w-full items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 hover:bg-orange-50 transition-colors ${
                    isRTL ? "flex-row-reverse text-right" : "text-left"
                  } ${theme === "dark" ? "hover:bg-gray-700" : ""}`}
                >
                  <UserCircle2
                    size={16}
                    className="text-primary flex-shrink-0 md:w-[18px] md:h-[18px]"
                  />
                  <span
                    className={`flex-1 text-sm md:text-base ${isRTL ? "font-urdu" : ""}`}
                  >
                    {t("view_profile")}
                  </span>
                </button>

                {/* Edit Profile */}
                <button
                  className={`flex w-full items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 hover:bg-orange-50 transition-colors ${
                    isRTL ? "flex-row-reverse text-right" : "text-left"
                  } ${theme === "dark" ? "hover:bg-gray-700" : ""}`}
                >
                  <Edit3
                    size={16}
                    className="text-primary flex-shrink-0 md:w-[18px] md:h-[18px]"
                  />
                  <span
                    className={`flex-1 text-sm md:text-base ${isRTL ? "font-urdu" : ""}`}
                  >
                    {t("edit_profile")}
                  </span>
                </button>

                {/* View History */}
                <button
                  className={`flex w-full items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 hover:bg-orange-50 transition-colors ${
                    isRTL ? "flex-row-reverse text-right" : "text-left"
                  } ${theme === "dark" ? "hover:bg-gray-700" : ""}`}
                >
                  <History
                    size={16}
                    className="text-primary flex-shrink-0 md:w-[18px] md:h-[18px]"
                  />
                  <span
                    className={`flex-1 text-sm md:text-base ${isRTL ? "font-urdu" : ""}`}
                  >
                    {t("view_history")}
                  </span>
                </button>

                {/* Divider */}
                <div
                  className={`my-1 ${
                    theme === "dark" ? "border-gray-700" : "border-gray-200"
                  }`}
                  style={{ borderTopWidth: "1px" }}
                ></div>

                {/* Logout Button */}
                <button
                  className={`flex w-full items-center gap-2 md:gap-3 px-3 md:px-4 py-2 md:py-3 text-red-500 hover:bg-red-50 transition-colors ${
                    isRTL ? "flex-row-reverse text-right" : "text-left"
                  } ${theme === "dark" ? "hover:bg-gray-700" : ""}`}
                >
                  <LogOut
                    size={16}
                    className="flex-shrink-0 md:w-[18px] md:h-[18px]"
                  />
                  <span
                    className={`flex-1 text-sm md:text-base ${isRTL ? "font-urdu" : ""}`}
                  >
                    {t("logout")}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Below header on mobile only */}
      <div className="md:hidden mt-3">
        <div
          className={`relative flex items-center rounded-full shadow-sm ${
            theme === "dark" ? "bg-gray-700" : "bg-white"
          }`}
        >
          <Search
            className={`absolute text-primary ${isRTL ? "right-3" : "left-3"}`}
            size={18}
          />
          <input
            type="text"
            placeholder={t("search_placeholder")}
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className={`w-full py-2.5 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 ${
              isRTL ? "pr-10 pl-10 text-right" : "pl-10 pr-10 text-left"
            } ${theme === "dark" ? "text-white bg-gray-700" : "text-gray-700"}`}
          />
          <button
            className={`absolute text-primary hover:text-orange-500 ${isRTL ? "left-3" : "right-3"}`}
          >
            <Mic size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
