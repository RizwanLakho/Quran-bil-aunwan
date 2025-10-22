import React, { useContext } from "react";
import {
  BookOpen,
  FileText,
  Users,
  TrendingUp,
  Activity,
  Calendar,
  Eye,
  Heart,
  Star,
  BarChart3,
} from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Overview() {
  const { theme } = useContext(ThemeContext);
  const { t } = useTranslation();

  const stats = [
    {
      id: 1,
      title: t("total_topics"),
      value: "156",
      change: "+12.5%",
      trend: "up",
      icon: BookOpen,
      color: "orange",
      bgLight: "bg-orange-50",
      bgDark: "bg-orange-500/10",
    },
    {
      id: 2,
      title: t("total_ayaat"),
      value: "2,847",
      change: "+8.3%",
      trend: "up",
      icon: FileText,
      color: "blue",
      bgLight: "bg-blue-50",
      bgDark: "bg-blue-500/10",
    },
    {
      id: 3,
      title: t("total_hadith"),
      value: "1,234",
      change: "+15.2%",
      trend: "up",
      icon: FileText,
      color: "green",
      bgLight: "bg-green-50",
      bgDark: "bg-green-500/10",
    },
    {
      id: 4,
      title: t("active_users"),
      value: "8,456",
      change: "+23.1%",
      trend: "up",
      icon: Users,
      color: "purple",
      bgLight: "bg-purple-50",
      bgDark: "bg-purple-500/10",
    },
  ];

  const recentActivity = [
    {
      id: 1,
      action: t("new_topic_added"),
      topic: "Tawheed",
      time: "2 hours ago",
      icon: BookOpen,
    },
    {
      id: 2,
      action: t("ayat_updated"),
      topic: "Al-Baqarah",
      time: "5 hours ago",
      icon: FileText,
    },
    {
      id: 3,
      action: t("hadith_added"),
      topic: "Salah",
      time: "1 day ago",
      icon: FileText,
    },
    {
      id: 4,
      action: t("user_registered"),
      topic: "New User",
      time: "2 days ago",
      icon: Users,
    },
  ];

  const topTopics = [
    {
      id: 1,
      name: "Allah",
      views: 12543,
      ayaat: 234,
      hadith: 156,
      growth: "+12%",
    },
    {
      id: 2,
      name: "Salah",
      views: 9876,
      ayaat: 187,
      hadith: 123,
      growth: "+8%",
    },
    {
      id: 3,
      name: "Zakat",
      views: 7654,
      ayaat: 145,
      hadith: 98,
      growth: "+15%",
    },
    {
      id: 4,
      name: "Ramadan",
      views: 6543,
      ayaat: 123,
      hadith: 87,
      growth: "+20%",
    },
    { id: 5, name: "Hajj", views: 5432, ayaat: 98, hadith: 67, growth: "+5%" },
  ];

  const colorClasses = {
    orange: theme === "dark" ? "text-orange-400" : "text-orange-500",
    blue: theme === "dark" ? "text-blue-400" : "text-blue-500",
    green: theme === "dark" ? "text-green-400" : "text-green-500",
    purple: theme === "dark" ? "text-purple-400" : "text-purple-500",
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-100"
          : "bg-[#DA885633] text-gray-800"
      }`}
    >
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1
              className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
            >
              {t("overview_dashboard")}
            </h1>
            <p className="text-sm text-gray-500 mt-1">{t("welcome_message")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-sm text-gray-500">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className={`rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${
                  theme === "dark"
                    ? "bg-gray-800 border border-gray-700 hover:border-gray-600"
                    : "bg-white border border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                    <h3
                      className={`text-3xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {stat.value}
                    </h3>
                    <div className="flex items-center gap-1 mt-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-green-500 font-medium">
                        {stat.change}
                      </span>
                      <span className="text-xs text-gray-500">
                        {t("this_month")}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${theme === "dark" ? stat.bgDark : stat.bgLight}`}
                  >
                    <Icon className={`w-6 h-6 ${colorClasses[stat.color]}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Topics */}
          <div
            className={`lg:col-span-2 rounded-xl p-6 ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {t("top_topics")}
              </h2>
              <BarChart3 className="w-5 h-5 text-gray-500" />
            </div>

            <div className="space-y-4">
              {topTopics.map((topic, index) => (
                <div
                  key={topic.id}
                  className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                    theme === "dark"
                      ? "bg-gray-700/50 hover:bg-gray-700"
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                      index === 0
                        ? "bg-orange-500"
                        : index === 1
                          ? "bg-blue-500"
                          : index === 2
                            ? "bg-green-500"
                            : "bg-gray-500"
                    }`}
                  >
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>

                  <div className="flex-1">
                    <h3
                      className={`font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                    >
                      {topic.name}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {topic.views.toLocaleString()}
                      </span>
                      <span>
                        {topic.ayaat} {t("ayaat")}
                      </span>
                      <span>
                        {topic.hadith} {t("hadith")}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-green-500 font-medium text-sm">
                      {topic.growth}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div
            className={`rounded-xl p-6 ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2
                className={`text-xl font-semibold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {t("recent_activity")}
              </h2>
              <Activity className="w-5 h-5 text-gray-500" />
            </div>

            <div className="space-y-4">
              {recentActivity.map((activity) => {
                const Icon = activity.icon;
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-lg ${
                        theme === "dark" ? "bg-gray-700" : "bg-gray-100"
                      }`}
                    >
                      <Icon className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="flex-1">
                      <p
                        className={`text-sm font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-500">{activity.topic}</p>
                      <p className="text-xs text-gray-400 mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Additional Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div
            className={`rounded-xl p-6 ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/10 rounded-lg">
                <Heart className="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("total_bookmarks")}</p>
                <h3
                  className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  3,456
                </h3>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl p-6 ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg">
                <Star className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("total_favorites")}</p>
                <h3
                  className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  2,789
                </h3>
              </div>
            </div>
          </div>

          <div
            className={`rounded-xl p-6 ${
              theme === "dark"
                ? "bg-gray-800 border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg">
                <Eye className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-gray-500">{t("total_views")}</p>
                <h3
                  className={`text-2xl font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  45,678
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div
          className={`rounded-xl p-6 ${
            theme === "dark"
              ? "bg-gradient-to-r from-orange-500/10 to-orange-600/10 border border-orange-500/20"
              : "bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200"
          }`}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3
                className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
              >
                {t("quick_actions_title")}
              </h3>
              <p className="text-sm text-gray-500">{t("quick_actions_desc")}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl">
                {t("add_new_topic")}
              </button>
              <button
                className={`px-6 py-3 rounded-lg transition-all ${
                  theme === "dark"
                    ? "bg-gray-700 text-white hover:bg-gray-600"
                    : "bg-white text-gray-900 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                {t("view_reports")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
