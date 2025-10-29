import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
  NavLink,
} from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import QuranReadingPage from "../components/QuranReadingPage";
import QuranSettingsPanel from "../components/QuranSettingsPanel";
import QuranTopics from "../pages/QuranTopics";
import TopicsData from "./TopicsData";
import AddTopic from "./AddTopic";
import QuranTopicDetail from "../pages/QuranTopicDetail";
import AboutUs from "./AboutUs";
import ContactUs from "./ContactUs";
import { ThemeContext } from "../context/ThemeContext";
import Overview from "./OverView";

// ✅ Social Icons
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Home() {
  const { theme } = useContext(ThemeContext);
  const { i18n, t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isRTL = i18n.language === "ur";

  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [isRTL, i18n.language]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMenuOpen(false);
    }
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleSettings = () => setShowSettings((prev) => !prev);

  const NAVBAR_HEIGHT = 84;
  const NAVBAR_HEIGHT_MOBILE = 120;
  const FOOTER_HEIGHT = 56;
  const isReadQuran = location.pathname.includes("read-quran");

  return (
    <div
      className={`flex flex-col h-screen transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-orange-50"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Navbar */}
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

      {/* Main Section */}
      <div className="flex flex-1 overflow-hidden">
        <Header
          isMenuOpen={isMenuOpen}
          toggleSettings={toggleSettings}
          style={{
            height: `calc(100vh - ${
              window.innerWidth < 768 ? NAVBAR_HEIGHT_MOBILE : NAVBAR_HEIGHT
            }px - ${FOOTER_HEIGHT}px)`,
          }}
        />

        <main className="flex flex-1 overflow-hidden">
          <div
            className={`flex-1 transition-all duration-300 ${
              isReadQuran ? "overflow-hidden" : "overflow-y-auto"
            }`}
          >
            <Routes>
              <Route
                path="/"
                element={<Navigate to="quran-topics" replace />}
              />
              <Route path="overview" element={<Overview />} />
              <Route path="read-quran" element={<QuranReadingPage />} />
              <Route path="quran-topics" element={<QuranTopics />} />
              <Route
                path="quran-topics/:subtopic"
                element={<QuranTopicDetail />}
              />
              <Route path="topics-data" element={<TopicsData />} />
              <Route path="add-topic" element={<AddTopic />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="contact-us" element={<ContactUs />} />
            </Routes>
          </div>

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
                <div
                  className="absolute inset-0 bg-black bg-opacity-50"
                  onClick={toggleSettings}
                ></div>
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

      {/* ✅ Footer with Social Icons */}
      <footer
        className={`flex-shrink-0 border-t ${
          theme === "dark"
            ? "bg-gray-800 border-gray-700"
            : "bg-[#DA885633] border-orange-200"
        }`}
        style={{ height: `${FOOTER_HEIGHT}px` }}
      >
        <div className="h-full flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-2 md:py-0 gap-3 md:gap-0">
          {/* Left side - Buttons */}
          <div className="flex gap-3">
            <NavLink
              to="/home/about-us"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? theme === "dark"
                      ? "bg-orange-600 text-white"
                      : "bg-orange-500 text-white"
                    : theme === "dark"
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "bg-orange-100 hover:bg-orange-200 text-orange-800"
                }`
              }
            >
              {t("about_us")}
            </NavLink>
            <NavLink
              to="/home/contact-us"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? theme === "dark"
                      ? "bg-orange-600 text-white"
                      : "bg-orange-500 text-white"
                    : theme === "dark"
                      ? "bg-gray-700 hover:bg-gray-600 text-gray-200"
                      : "bg-orange-100 hover:bg-orange-200 text-orange-800"
                }`
              }
            >
              {t("contact_us")}
            </NavLink>
          </div>

          {/* ✅ Center - Social Icons */}
          <div className="flex items-center gap-4 text-lg">
            <a href="#" className="hover:text-primary transition-colors">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-primary transition-colors">
              <FaYoutube />
            </a>
          </div>

          {/* Right side - Copyright text */}
          <div
            className={`text-xs md:text-sm text-center md:text-${
              isRTL ? "left" : "right"
            } ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}
          >
            {t("copyright_text")}
          </div>
        </div>
      </footer>

      {/* Animation for mobile modal */}
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
