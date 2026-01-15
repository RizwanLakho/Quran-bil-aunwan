import React, { useState, useContext, useEffect } from "react";
import { Search, MoreVertical, PlusCircle, Loader2 } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";
import TopicsService from "../services/TopicsService";
import api from "../services/api";

export default function TopicsData() {
  const { t } = useTranslation();
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const { theme } = useContext(ThemeContext);

  // Fetch topics from backend
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        // Fetch with high per_page to get all topics
        const response = await api.get('/topics?per_page=100');
        console.log('Topics API Response:', response.data);

        if (response && response.data) {
          // Handle both paginated and non-paginated responses
          const topicsData = response.data.data || response.data;

          // Add checked property and default status if missing
          const topicsWithChecked = topicsData.map(topic => ({
            ...topic,
            checked: false,
            status: topic.status || 'published', // Default to published if missing
          }));
          setTopics(topicsWithChecked);
          console.log('Processed topics:', topicsWithChecked);
        }
      } catch (err) {
        console.error('Error fetching topics:', err);
        setError(err.message || 'Failed to load topics');
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentTopics = topics.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(topics.length / rowsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);

  const handleCheckboxChange = (id) => {
    setTopics((prevTopics) =>
      prevTopics.map((topic) =>
        topic.id === id ? { ...topic, checked: !topic.checked } : topic,
      ),
    );
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-orange-50 text-gray-800"
      }`}
    >
      {/* Fixed Header */}
      <div
        className={`sticky top-0 z-10 shadow-md transition-colors duration-300 ${
          theme === "dark"
            ? "bg-gray-800 border-b border-gray-700"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {t("list_of_all_topics")}
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                {t("manage_topics_details")}
              </p>
            </div>
            <NavLink
              to="/home/add-topic"
              className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              <PlusCircle size={20} />
              <span className="font-medium">{t("add_new")}</span>
            </NavLink>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6">
        <div
          className={`shadow-lg rounded-xl transition-colors duration-300 overflow-hidden ${
            theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
        >
          {/* Loading State */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-primary animate-spin" />
              <span className={`ml-3 text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                Loading topics...
              </span>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          ) : topics.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <p className={`text-lg ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                No topics found
              </p>
              <NavLink
                to="/home/add-topic"
                className="mt-4 flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-all"
              >
                <PlusCircle size={20} />
                <span>Create your first topic</span>
              </NavLink>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead
                    className={`${
                      theme === "dark"
                        ? "bg-gray-700 text-gray-200"
                        : "bg-gray-50 text-gray-600"
                    }`}
                  >
                    <tr>
                      {[
                        t("name_of_topic"),
                        t("creation_date"),
                        t("aayaat"),
                        t("hadith"),
                        "Status",
                        "",
                        "",
                      ].map((col, i) => (
                        <th
                          key={i}
                          className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider whitespace-nowrap"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody
                    className={`divide-y ${
                      theme === "dark"
                        ? "divide-gray-700 bg-gray-800"
                        : "divide-gray-100 bg-white"
                    }`}
                  >
                    {currentTopics.map((topic) => (
                      <tr
                        key={topic.id}
                        className={`transition duration-200 ${
                          theme === "dark"
                            ? "hover:bg-gray-700"
                            : "hover:bg-orange-50"
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              checked={topic.checked}
                              onChange={() => handleCheckboxChange(topic.id)}
                              className="mr-3 w-5 h-5 accent-primary cursor-pointer"
                            />
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center mr-3 shadow-md">
                                <svg
                                  className="w-6 h-6 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                  />
                                </svg>
                              </div>
                              <div>
                                <div
                                  className={`text-sm font-semibold ${
                                    theme === "dark"
                                      ? "text-gray-100"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {topic.name}
                                </div>
                                {topic.alternative_name && (
                                  <div className="text-xs text-gray-500 mt-0.5">
                                    {topic.alternative_name}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-500">
                          {topic.created_at ? new Date(topic.created_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : topic.updated_at ? new Date(topic.updated_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          }) : 'Recently Added'}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {topic.ayahs ? topic.ayahs.length : 0} Ayahs
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {topic.hadiths ? topic.hadiths.length : 0} Hadiths
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-block px-3 py-1 text-xs rounded-full font-medium capitalize ${
                              topic.status === "published"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                            }`}
                          >
                            {topic.status === "published" ? "Published" : "Draft"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <NavLink
                            to={`/home/topic/${topic.id}`}
                            className="px-5 py-2 text-sm font-medium text-white bg-primary hover:bg-orange-600 rounded-lg transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                          >
                            View
                          </NavLink>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            className={`p-2 rounded-lg transition ${
                              theme === "dark"
                                ? "text-gray-400 hover:text-gray-200 hover:bg-gray-700"
                                : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                            }`}
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div
                className={`flex items-center justify-center gap-2 px-6 py-5 border-t ${
                  theme === "dark"
                    ? "bg-gray-800 border-gray-700"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  ← {t("previous")}
                </button>

                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                      currentPage === i + 1
                        ? "bg-primary text-white shadow-md"
                        : theme === "dark"
                          ? "text-gray-300 hover:bg-gray-700"
                          : "text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : theme === "dark"
                        ? "text-gray-300 hover:bg-gray-700"
                        : "text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {t("next")} →
                </button>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
