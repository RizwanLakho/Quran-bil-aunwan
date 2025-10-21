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

export default function Navbar({ isMenuOpen, toggleMenu }) {
  const { theme } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

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
        {/* Left Side: Menu Button and Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleMenu}
            className="text-primary hover:text-orange-500 transition-colors"
          >
            <Menu size={22} />
          </button>
          <NavLink to="/home" className="text-xl font-bold text-primary">
            Quran Bil Aunwan
          </NavLink>
        </div>

        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div
            className={`relative flex items-center rounded-full shadow-sm ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
          >
            <Search className="absolute left-4 text-primary" size={20} />
            <input
              type="text"
              placeholder="What do you want to read?"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className={`w-full pl-12 pr-12 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 ${
                theme === "dark" ? "text-white bg-gray-700" : "text-gray-700"
              }`}
            />
            <button className="absolute right-4 text-primary hover:text-orange-500">
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
          >
            <Bookmark size={20} className="text-primary" />
          </button>

          {/* Mail Icon */}
          <button
            className={`p-3 rounded-full shadow-sm hover:shadow-md transition-shadow ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
          >
            <Mail size={20} className="text-primary" />
          </button>

          {/* Notification Icon */}
          <button
            className={`p-3 rounded-full shadow-sm hover:shadow-md transition-shadow ${
              theme === "dark" ? "bg-gray-700" : "bg-white"
            }`}
          >
            <Bell size={20} className="text-primary" />
          </button>

          {/* User Profile with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center gap-3 pl-2 pr-4 py-2 rounded-full shadow-sm hover:shadow-md transition-shadow ${
                theme === "dark" ? "bg-gray-700" : "bg-white"
              }`}
            >
              <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
                <User size={20} className="text-white" />
              </div>
              <span
                className={`font-medium ${
                  theme === "dark" ? "text-gray-200" : "text-gray-700"
                }`}
              >
                Aamir Raza
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
                className={`absolute right-0 mt-3 w-48 rounded-2xl shadow-lg border overflow-hidden z-50 ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700 text-gray-100"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                <button className="flex w-full items-center gap-2 px-4 py-3 hover:bg-hover transition-colors">
                  <UserCircle2 size={18} className="text-primary" />
                  View Profile
                </button>
                <button className="flex w-full items-center gap-2 px-4 py-3  hover:bg-hover  transition-colors">
                  <Edit3 size={18} className="text-primary" />
                  Edit Profile
                </button>
                <button className="flex w-full items-center gap-2 px-4 py-3  hover:bg-hover  transition-colors">
                  <History size={18} className="text-primary" />
                  View History
                </button>
                <button className="flex w-full items-center gap-2 px-4 py-3 text-red-500  hover:bg-hover  transition-colors">
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
