import React, { useState, useContext } from "react";
import { Search, MoreVertical, PlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function TopicsData() {
  const { t } = useTranslation();
  const [topics] = useState([
    {
      id: 1,
      name: "Billing #780-Dec 2022",
      status: "Paid",
      date: "Dec 23, 2022",
      amount: "USD $12.00",
      plan: "Basic plan",
      users: "15 Users",
      checked: true,
      color: "orange",
    },
    {
      id: 2,
      name: "Billing #345-Nov 2022",
      status: "Paid",
      date: "Nov 12, 2022",
      amount: "USD $22.00",
      plan: "Basic plan",
      users: "56 Users",
      checked: false,
      color: "dark",
    },
    {
      id: 3,
      name: "Billing #213-Oct 2022",
      status: "Paid",
      date: "Oct 09, 2022",
      amount: "USD $80.00",
      plan: "Basic plan",
      users: "90 Users",
      checked: true,
      color: "orange",
    },
    {
      id: 4,
      name: "Billing #324-Aug 2022",
      status: "Paid",
      date: "Aug 03, 2022",
      amount: "USD $12.00",
      plan: "Basic plan",
      users: "22 Users",
      checked: false,
      color: "dark",
    },
    {
      id: 5,
      name: "Billing #123-July 2022",
      status: "Paid",
      date: "July 13, 2022",
      amount: "USD $67.00",
      plan: "Basic plan",
      users: "23 Users",
      checked: true,
      color: "orange",
    },
    {
      id: 6,
      name: "Billing #908-June 2022",
      status: "Paid",
      date: "June 10, 2022",
      amount: "USD $35.00",
      plan: "Basic plan",
      users: "40 Users",
      checked: false,
      color: "dark",
    },
    {
      id: 7,
      name: "Billing #564-May 2022",
      status: "Paid",
      date: "May 20, 2022",
      amount: "USD $50.00",
      plan: "Basic plan",
      users: "55 Users",
      checked: true,
      color: "orange",
    },
    {
      id: 8,
      name: "Billing #445-April 2022",
      status: "Paid",
      date: "Apr 09, 2022",
      amount: "USD $25.00",
      plan: "Basic plan",
      users: "32 Users",
      checked: false,
      color: "dark",
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 4;
  const { theme } = useContext(ThemeContext);

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentTopics = topics.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(topics.length / rowsPerPage);

  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);
  const handleNext = () =>
    currentPage < totalPages && setCurrentPage((p) => p + 1);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-orange-50 text-gray-800"
      }`}
    >
      <main className="max-w-7xl mx-auto p-6 space-y-6">
        <div
          className={`shadow rounded-lg transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800 border border-gray-700" : "bg-white"
          }`}
        >
          {/* Header Section */}
          <div
            className={`flex flex-col sm:flex-row justify-between items-start sm:items-center px-6 py-4 border-b ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div>
              <h2
                className={`text-lg font-semibold ${
                  theme === "dark" ? "text-gray-100" : "text-gray-800"
                }`}
              >
                {t("list_of_all_topics")}
              </h2>
              <p className="text-sm text-gray-500">
                {t("manage_topics_details")}
              </p>
            </div>
            <NavLink
              to="/home/add-topic"
              className="mt-3 sm:mt-0 flex items-center gap-2 bg-primary text-white px-5 py-2 rounded-md hover:bg-orange-400 transition-all shadow-sm"
            >
              <PlusCircle size={18} />
              {t("add_new")}
            </NavLink>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                className={`border-b ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-gray-200"
                    : "bg-gray-50 border-gray-200 text-gray-600"
                }`}
              >
                <tr>
                  {[
                    t("name_of_topic"),
                    t("creation_date"),
                    t("aayaat"),
                    t("hadith"),
                    t("users_column"),
                    "",
                    "",
                  ].map((col, i) => (
                    <th
                      key={i}
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider whitespace-nowrap"
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
                          className="mr-3 w-4 h-4 accent-primary"
                          readOnly
                        />
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center mr-3 shadow-sm">
                            <svg
                              className="w-5 h-5 text-white"
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
                              className={`text-sm font-medium ${
                                theme === "dark"
                                  ? "text-gray-100"
                                  : "text-gray-900"
                              }`}
                            >
                              {topic.name}
                            </div>
                            <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-orange-100 text-primary rounded-full font-medium">
                              {t("paid_status")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {topic.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {topic.amount}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {topic.plan}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {topic.users}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        className={`px-4 py-1.5 text-sm text-white rounded transition-all shadow-sm ${
                          topic.color === "orange"
                            ? "bg-primary hover:bg-orange-400"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                      >
                        {t("download")}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className={`transition ${
                          theme === "dark"
                            ? "text-gray-400 hover:text-gray-200"
                            : "text-gray-400 hover:text-gray-600"
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
            className={`flex items-center justify-center gap-2 px-6 py-4 border-t ${
              theme === "dark"
                ? "bg-gray-800 border-gray-700"
                : "bg-gray-50 border-gray-200"
            }`}
          >
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className={`px-3 py-1 text-sm rounded ${
                currentPage === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              ← {t("previous")}
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1.5 text-sm rounded ${
                  currentPage === i + 1
                    ? "bg-primary text-white"
                    : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 text-sm rounded ${
                currentPage === totalPages
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              }`}
            >
              {t("next")} →
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
