import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import QuranReadingPage from "../components/QuranReadingPage";
import QuranSettingsPanel from "../components/QuranSettingsPanel";
import QuranTopics from "../pages/QuranTopics";
import QuranTopicDetail from "../pages/QuranTopicDetail";
import { ThemeContext } from "../context/ThemeContext";
import Overview from "./OverView";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const { i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();

  // Check if current language is RTL
  const isRTL = i18n.language === "ur";

  // Update document direction when language changes
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleSettings = () => setShowSettings((prev) => !prev);

  const NAVBAR_HEIGHT = 84; // pixels
  const isReadQuran = location.pathname.includes("read-quran");

  return (
    <div
      className={`flex flex-col h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-orange-50"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Navbar on Top */}
      <div style={{ height: `${NAVBAR_HEIGHT}px` }}>
        <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>

      {/* Main Section: Sidebar + Content + Settings */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Position changes based on language */}
        <Header
          isMenuOpen={isMenuOpen}
          toggleSettings={toggleSettings}
          style={{
            height: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
          }}
        />

        {/* Main Content */}
        <main className="flex flex-1 overflow-hidden">
          {/* Content Area */}
          <div
            className={`flex-1 transition-all duration-300 ${
              isReadQuran ? "overflow-hidden" : "overflow-y-auto"
            }`}
          >
            <Routes>
              <Route path="/" element={<Navigate to="read-quran" replace />} />
              <Route path="read-quran" element={<QuranReadingPage />} />
              <Route path="overview" element={<Overview />} />
              <Route path="quran-topics" element={<QuranTopics />} />
              <Route
                path="quran-topics/:subtopic"
                element={<QuranTopicDetail />}
              />
            </Routes>
          </div>

          {/* Settings Panel - Always on the opposite side of header */}
          {showSettings && (
            <aside
              className={`w-96 flex-shrink-0 flex flex-col transition-colors duration-300 ${
                isRTL ? "border-r" : "border-l"
              } ${
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
