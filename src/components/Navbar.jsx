import React, { useState, useContext } from "react";
import {
  Search,
  Mic,
  Bookmark,
  Mail,
  Bell,
  User,
  ChevronDown,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";

export default function Navbar() {
  const { theme } = useContext(ThemeContext);
  const [searchText, setSearchText] = useState("");

  return (
    <div
      className={` w-full px-8 py-4 flex-shrink-0  ${
        theme === "dark"
          ? "bg-gray-800 text-white"
          : "bg-[#DA885633] text-gray-800"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative flex items-center bg-white rounded-full shadow-sm">
            <Search className="absolute left-4 text-primary" size={20} />
            <input
              type="text"
              placeholder="What do you want to read?"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full pl-12 pr-12 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-300 text-gray-700"
            />
            <button className="absolute right-4 text-primary hover:text-orange-500">
              <Mic size={20} />
            </button>
          </div>
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center gap-3">
          {/* Bookmark Icon */}
          <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
            <Bookmark size={20} className="text-primary" />
          </button>

          {/* Mail Icon */}
          <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
            <Mail size={20} className="text-primary" />
          </button>

          {/* Notification Icon */}
          <button className="p-3 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
            <Bell size={20} className="text-primary" />
          </button>

          {/* User Profile */}
          <button className="flex items-center gap-3 pl-2 pr-4 py-2 bg-white rounded-full shadow-sm hover:shadow-md transition-shadow">
            <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <span className="font-medium text-gray-700">Aamir Raza</span>
            <ChevronDown size={18} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  );
}
