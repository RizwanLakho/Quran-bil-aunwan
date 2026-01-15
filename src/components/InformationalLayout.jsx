import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import Navbar from "./Navbar";

export default function InformationalLayout({ children }) {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    // For informational pages, clicking menu takes user back to home
    navigate("/home");
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        theme === "dark" ? "bg-gray-900" : "bg-orange-50"
      }`}
    >
      {/* Website Navbar */}
      <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Simple Footer */}
      <footer
        className={`border-t ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-white border-orange-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              © 2026 Quran Bil Aunwan. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <button
                onClick={() => navigate("/about-us")}
                className={`text-sm hover:underline ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                About Us
              </button>
              <button
                onClick={() => navigate("/contact-us")}
                className={`text-sm hover:underline ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
