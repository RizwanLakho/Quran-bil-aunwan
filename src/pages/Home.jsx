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

  // Close menu on mobile after navigation
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleSettings = () => setShowSettings((prev) => !prev);

  const NAVBAR_HEIGHT = 84; // pixels for desktop
  const NAVBAR_HEIGHT_MOBILE = 120; // pixels for mobile (includes search bar)
  const isReadQuran = location.pathname.includes("read-quran");

  return (
    <div
      className={`flex flex-col h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-orange-50"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Navbar on Top */}
      <div
        className="flex-shrink-0"
        style={{
          height:
            window.innerWidth < 768
              ? `${NAVBAR_HEIGHT_MOBILE}px`
              : `${NAVBAR_HEIGHT}px`,
        }}
      >
        <Navbar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </div>

      {/* Main Section: Sidebar + Content + Settings */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile unless menu is open */}
        <Header
          isMenuOpen={isMenuOpen}
          toggleSettings={toggleSettings}
          style={{
            height: `calc(100vh - ${
              window.innerWidth < 768 ? NAVBAR_HEIGHT_MOBILE : NAVBAR_HEIGHT
            }px)`,
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

          {/* Settings Panel - Desktop: Side panel, Mobile: Modal */}
          {showSettings && (
            <>
              {/* Desktop Settings Panel */}
              <aside
                className={`hidden md:flex w-96 flex-shrink-0 flex-col transition-colors duration-300 ${
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

              {/* Mobile Settings Modal */}
              <div className="md:hidden fixed inset-0 z-50 flex items-end">
                {/* Backdrop */}
                <div
                  className="absolute inset-0 bg-black bg-opacity-50"
                  onClick={toggleSettings}
                ></div>

                {/* Modal Content */}
                <div
                  className={`relative w-full max-h-[85vh] overflow-y-auto rounded-t-3xl ${
                    theme === "dark" ? "bg-gray-900" : "bg-white"
                  } animate-slide-up`}
                >
                  <div className="p-4">
                    <QuranSettingsPanel />
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>

      {/* Add animation for mobile modal */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
