import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Home from "./pages/Home";

import SignIn from "./pages/auth/Login";
import SignUp from "./pages/auth/Signup";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import InformationalLayout from "./components/InformationalLayout";
import { AuthContext } from "./context/AuthContext";

export default function App() {
  const { user } = useContext(AuthContext);
  const { i18n } = useTranslation();

  // ✅ Dynamically apply Urdu font class to body
  useEffect(() => {
    if (i18n.language === "ur") {
      document.body.classList.add("font-urdu");
      document.body.classList.remove("font-english");
      // Set direction to RTL for Urdu
      document.documentElement.dir = "rtl";
    } else {
      document.body.classList.add("font-english");
      document.body.classList.remove("font-urdu");
      // Set direction to LTR for English
      document.documentElement.dir = "ltr";
    }
  }, [i18n.language]);

  return (
    <div>
      {/* Desktop/Tablet View - Hidden on mobile */}
      <div className="block">
        <Routes>
          {/* Login and Signup routes - always accessible */}
          <Route path="/login" element={user ? <Navigate to="/home" replace /> : <SignIn />} />
          <Route path="/signup" element={user ? <Navigate to="/home" replace /> : <SignUp />} />

          {/* Informational Pages - Standalone pages accessible to everyone */}
          <Route
            path="/about-us"
            element={
              <InformationalLayout>
                <AboutUs />
              </InformationalLayout>
            }
          />
          <Route
            path="/contact-us"
            element={
              <InformationalLayout>
                <ContactUs />
              </InformationalLayout>
            }
          />

          {/* Home routes - accessible to both authenticated and guest users */}
          <Route path="/home/*" element={<Home />} />

          {/* Default route */}
          <Route path="*" element={user ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
        </Routes>
      </div>

      {/* Mobile View - Download Prompt */}
      <div className="hidden min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-orange-100 p-6  items-center justify-center">
        <div className="max-w-md w-full">
          {/* Main Card */}
          <div
            className="bg-white rounded-3xl shadow-2xl p-8 space-y-6 border"
            style={{ borderColor: "#DA885633" }}
          >
            {/* Icon/Logo Area */}
            <div className="flex justify-center">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background:
                    "linear-gradient(to bottom right, #da8856, #c77647)",
                }}
              >
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold text-gray-800 tracking-tight">
                Quran Bil Aunwan
              </h1>
              <div
                className="h-1 w-16 mx-auto rounded-full"
                style={{ backgroundColor: "#da8856" }}
              ></div>
            </div>

            {/* Description */}
            <div
              className="rounded-2xl p-6 space-y-3"
              style={{ backgroundColor: "#DA885633" }}
            >
              <p className="text-gray-700 text-center leading-relaxed">
                The app is available on{" "}
                <span className="font-semibold" style={{ color: "#da8856" }}>
                  Play Store
                </span>
                . For the best experience on mobile, please download the app.
              </p>
              <p className="text-gray-600 text-sm text-center">
                Or use a tablet or laptop to visit the entire website.
              </p>
            </div>

            {/* Download Button */}
            <a
              href="https://play.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-center"
              style={{
                background: "linear-gradient(to right, #da8856, #c77647)",
              }}
            >
              <div className="flex items-center justify-center space-x-2">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
                </svg>
                <span>Download from Play Store</span>
              </div>
            </a>

            {/* Alternative Action */}
            <button
              className="w-full bg-white font-semibold py-3 px-6 rounded-xl hover:bg-opacity-50 transition-all duration-200 text-center border-2"
              style={{
                borderColor: "#da8856",
                color: "#da8856",
                backgroundColor: "white",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#DA885633")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "white")
              }
            >
              Continue on Mobile Browser
            </button>

            {/* Features List */}
            <div className="pt-4 space-y-3">
              <div className="flex items-start space-x-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "#DA885633" }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: "#da8856" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Optimized reading experience
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "#DA885633" }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: "#da8856" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">
                  Offline access & bookmarks
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: "#DA885633" }}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    style={{ color: "#da8856" }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-600">Better performance</p>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <p className="text-center text-xs text-gray-500 mt-6">
            Designed for a superior mobile experience
          </p>
        </div>
      </div>
    </div>
  );
}
