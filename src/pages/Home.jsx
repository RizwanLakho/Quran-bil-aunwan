import { Routes, Route, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import QuranReadingPage from "../components/QuranReadingPage";
import QuranSettingsPanel from "../components/QuranSettingsPanel";
import QuranTopics from "../pages/QuranTopics";
import QuranTopicDetail from "../pages/QuranTopicDetail";
import { ThemeContext } from "../context/ThemeContext";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  // NEW: settings visibility state
  const [showSettings, setShowSettings] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleSettings = () => setShowSettings((prev) => !prev); // NEW

  // Navbar height
  const NAVBAR_HEIGHT = 84; // pixels

  return (
    <div
      className={`flex flex-col h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-orange-50"
      }`}
    >
      {/* Navbar on Top */}
      <div style={{ height: `${NAVBAR_HEIGHT}px` }}>
        <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>

      {/* Main Section: Sidebar + Content + Settings */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Header
          isMenuOpen={isMenuOpen}
          toggleSettings={toggleSettings} // PASS TO HEADER
          style={{
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`, // sidebar below navbar
          }}
        />

        {/* Main Content */}
        <main className="flex flex-1 overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Navigate to="read-quran" replace />} />{" "}
              {/* ADD THIS LINE */}
              <Route path="read-quran" element={<QuranReadingPage />} />
              <Route path="quran-topics" element={<QuranTopics />} />
              <Route
                path="quran-topics/:subtopic"
                element={<QuranTopicDetail />}
              />
            </Routes>
          </div>

          {/* Right Settings Panel (shown/hidden by state) */}
          {showSettings && (
            <aside
              className={`w-96 flex-shrink-0 flex flex-col border-l transition-colors duration-300 ${
                theme === "dark"
                  ? "border-gray-700 bg-gray-900"
                  : "border-orange-200 bg-white"
              }`}
            >
              <div className="flex-1 overflow-y-auto p-4">
                <QuranSettingsPanel />
              </div>
            </aside>
          )}
        </main>
      </div>
    </div>
  );
}
