import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import QuranReadingPage from "./components/QuranReadingPage";
import QuranSettingsPanel from "./components/QuranSettingsPanel";
import QuranTopics from "./pages/QuranTopics";
import { Settings } from "lucide-react";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";

export default function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`flex h-screen overflow-hidden transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900" : "bg-orange-50"
      }`}
    >
      {/* Sidebar */}
      <aside
        className={`flex-shrink-0 overflow-y-auto transition-colors duration-300 ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <Header />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <div className="flex flex-1 overflow-hidden">
          {/* Dynamic Content */}
          <div className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<QuranReadingPage />} />
              <Route path="/topics" element={<QuranTopics />} />
            </Routes>
          </div>

          {/* Settings Panel */}
          <aside
            className={`w-96 flex-shrink-0 flex flex-col overflow-hidden border-l transition-colors duration-300 ${
              theme === "dark" ? "border-gray-700" : "border-orange-200"
            }`}
          >
            <div className="bg-gradient-to-r from-orange-400 to-orange-500 px-6 py-5 flex items-center gap-3 flex-shrink-0">
              <Settings className="text-white" size={24} />
              <h2 className="text-white text-xl font-bold">Settings</h2>
            </div>
            <div
              className={`flex-1 overflow-y-auto p-4 transition-colors duration-300 ${
                theme === "dark" ? "bg-gray-900" : "bg-white"
              }`}
            >
              <QuranSettingsPanel />
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
