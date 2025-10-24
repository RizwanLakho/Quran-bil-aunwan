import React, { useState, useContext } from "react";
import { Plus, Send } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";

// Topic Info Component
const TopicInfo = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label
            className={`block text-xs md:text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t("topic_name")}
          </label>
          <input
            type="text"
            name="topicName"
            value={formData.topicName}
            onChange={handleChange}
            placeholder={t("topic_name_placeholder")}
            className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>
        <div>
          <label
            className={`block text-xs md:text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t("alternative_name")}
          </label>
          <input
            type="text"
            name="alternativeName"
            value={formData.alternativeName}
            onChange={handleChange}
            placeholder={t("alternative_name_placeholder")}
            className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div>
          <label
            className={`block text-xs md:text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t("topic_description")}
          </label>
          <input
            type="text"
            name="topicDescription"
            value={formData.topicDescription}
            onChange={handleChange}
            placeholder={t("topic_description_placeholder")}
            className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>
        <div>
          <label
            className={`block text-xs md:text-sm font-medium mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t("suggested_arrangement")}
          </label>
          <input
            type="text"
            name="suggestedArrangement"
            value={formData.suggestedArrangement}
            onChange={handleChange}
            placeholder={t("suggested_arrangement_placeholder")}
            className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
                : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

// Aayaat Component
const Aayaat = ({ ayaatList, setAyaatList }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [newAyat, setNewAyat] = useState({
    surah: "",
    ayat: "",
    description: "",
  });

  const handleAddAyat = () => {
    if (newAyat.surah && newAyat.ayat) {
      setAyaatList([...ayaatList, { ...newAyat, id: Date.now() }]);
      setNewAyat({ surah: "", ayat: "", description: "" });
    }
  };

  const handleDelete = (id) => {
    setAyaatList(ayaatList.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2
          className={`text-xl md:text-2xl font-semibold mb-1 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {t("topics")}
        </h2>
        <p
          className={`text-xs md:text-sm mb-3 md:mb-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t("manage_topics_description")}
        </p>
        <h3
          className={`text-base md:text-lg mb-4 md:mb-6 ${
            theme === "dark" ? "text-gray-500" : "text-gray-700"
          }`}
        >
          {t("add_ayats")}
        </h3>
      </div>

      {/* Add Ayats Section */}
      <div>
        <h4
          className={`text-sm md:text-base font-semibold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {t("add_ayats")}
        </h4>
        <p
          className={`text-xs md:text-sm mb-3 md:mb-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t("add_ayats_description")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">
          <select
            className={`px-3 md:px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            }`}
            value={newAyat.surah}
            onChange={(e) => setNewAyat({ ...newAyat, surah: e.target.value })}
          >
            <option value="">{t("select_surah")}</option>
            <option value="Al-Fatiha">{t("al_fatiha")}</option>
            <option value="Al-Baqarah">{t("al_baqarah")}</option>
          </select>

          <select
            className={`px-3 md:px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            }`}
            value={newAyat.ayat}
            onChange={(e) => setNewAyat({ ...newAyat, ayat: e.target.value })}
          >
            <option value="">{t("select_ayat")}</option>
            <option value="1">{t("ayat_1")}</option>
            <option value="2">{t("ayat_2")}</option>
          </select>

          <button
            onClick={handleAddAyat}
            className="bg-orange-500 text-white px-4 md:px-6 py-2 text-sm md:text-base rounded-md hover:bg-orange-600 transition"
          >
            {t("load_ayat")}
          </button>
        </div>

        <input
          type="text"
          placeholder={t("ayat_placeholder")}
          className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md mb-3 md:mb-4 ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-gray-400"
              : "border-gray-300 bg-gray-100 text-gray-500"
          }`}
          readOnly
        />

        <input
          type="text"
          placeholder={t("ayat_description_placeholder")}
          value={newAyat.description}
          onChange={(e) =>
            setNewAyat({ ...newAyat, description: e.target.value })
          }
          className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md mb-3 md:mb-4 ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
              : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
          }`}
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <button
            className={`flex items-center text-sm md:text-base ${
              theme === "dark"
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Plus className="w-4 h-4 mr-1" />
            {t("add_another")}
          </button>
          <button className="flex items-center text-orange-500 hover:text-orange-400 text-sm md:text-base">
            <Send className="w-4 h-4 mr-1" />
            {t("assign")}
          </button>
        </div>
      </div>

      {/* Assigned Ayats List */}
      <div className="mt-6 md:mt-8">
        <h3
          className={`text-base md:text-lg mb-3 md:mb-4 ${
            theme === "dark" ? "text-gray-500" : "text-gray-700"
          }`}
        >
          {t("assigned_ayats")}
        </h3>
        <h4
          className={`text-sm md:text-base font-semibold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {t("list_of_assigned_ayat")}
        </h4>
        <p
          className={`text-xs md:text-sm mb-3 md:mb-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t("add_ayats_description")}
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 md:mb-4 gap-2">
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span
                className={`text-xs md:text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("select_all")}
              </span>
            </label>
            <span
              className={`text-xs md:text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              | {ayaatList.length} {t("selected")} |{" "}
              <span className="text-orange-500">{t("delete_selected")}</span>
            </span>
          </div>
          <span className="text-xs md:text-sm text-orange-500">
            {t("total_ayat_assigned").replace("{count}", ayaatList.length)}
          </span>
        </div>

        {ayaatList.map((ayat) => (
          <div
            key={ayat.id}
            className={`flex items-center justify-between border-b py-2 md:py-3 ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
              <input type="checkbox" className="flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm md:text-base truncate ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                  style={{ direction: "rtl" }}
                >
                  وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ
                </p>
                <p
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {ayat.surah} - {t("ayah")} {ayat.ayat}
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => handleDelete(ayat.id)}
                className={`text-xs md:text-sm ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {t("delete")}
              </button>
              <button className="text-orange-500 hover:text-orange-400 text-xs md:text-sm">
                {t("edit")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Hadith Component
const Hadith = ({ hadithList, setHadithList }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [newHadith, setNewHadith] = useState({
    book: "",
    hadithNo: "",
    description: "",
  });

  const handleAddHadith = () => {
    if (newHadith.book && newHadith.hadithNo) {
      setHadithList([...hadithList, { ...newHadith, id: Date.now() }]);
      setNewHadith({ book: "", hadithNo: "", description: "" });
    }
  };

  const handleDelete = (id) => {
    setHadithList(hadithList.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2
          className={`text-xl md:text-2xl font-semibold mb-1 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {t("hadith")}
        </h2>
        <p
          className={`text-xs md:text-sm mb-3 md:mb-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t("manage_hadith_description")}
        </p>
      </div>

      <div>
        <h4
          className={`text-sm md:text-base font-semibold mb-2 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {t("add_hadith")}
        </h4>
        <p
          className={`text-xs md:text-sm mb-3 md:mb-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t("add_hadith_description")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 mb-3 md:mb-4">
          <select
            className={`px-3 md:px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            }`}
            value={newHadith.book}
            onChange={(e) =>
              setNewHadith({ ...newHadith, book: e.target.value })
            }
          >
            <option value="">{t("select_book")}</option>
            <option value="Sahih Bukhari">{t("sahih_bukhari")}</option>
            <option value="Sahih Muslim">{t("sahih_muslim")}</option>
          </select>

          <select
            className={`px-3 md:px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            }`}
            value={newHadith.hadithNo}
            onChange={(e) =>
              setNewHadith({ ...newHadith, hadithNo: e.target.value })
            }
          >
            <option value="">{t("select_hadith_no")}</option>
            <option value="1">{t("hadith_1")}</option>
            <option value="2">{t("hadith_2")}</option>
          </select>

          <button
            onClick={handleAddHadith}
            className="bg-orange-500 text-white px-4 md:px-6 py-2 text-sm md:text-base rounded-md hover:bg-orange-600 transition"
          >
            {t("load_hadith")}
          </button>
        </div>

        <input
          type="text"
          placeholder={t("hadith_placeholder")}
          className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md mb-3 md:mb-4 ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-gray-400"
              : "border-gray-300 bg-gray-100 text-gray-500"
          }`}
          readOnly
        />

        <input
          type="text"
          placeholder={t("hadith_description_placeholder")}
          value={newHadith.description}
          onChange={(e) =>
            setNewHadith({ ...newHadith, description: e.target.value })
          }
          className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md mb-3 md:mb-4 ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
              : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
          }`}
        />

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <button
            className={`flex items-center text-sm md:text-base ${
              theme === "dark"
                ? "text-gray-400 hover:text-gray-200"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Plus className="w-4 h-4 mr-1" />
            {t("add_another")}
          </button>
          <button className="flex items-center text-orange-500 hover:text-orange-400 text-sm md:text-base">
            <Send className="w-4 h-4 mr-1" />
            {t("assign")}
          </button>
        </div>
      </div>

      {/* Assigned Hadith List */}
      <div className="mt-6 md:mt-8">
        <h3
          className={`text-base md:text-lg mb-3 md:mb-4 ${
            theme === "dark" ? "text-gray-500" : "text-gray-700"
          }`}
        >
          {t("assigned_hadith")}
        </h3>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 md:mb-4 gap-2">
          <div className="flex items-center gap-2 md:gap-4 flex-wrap">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span
                className={`text-xs md:text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("select_all")}
              </span>
            </label>
            <span
              className={`text-xs md:text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              | {hadithList.length} {t("selected")} |{" "}
              <span className="text-orange-500">{t("delete_selected")}</span>
            </span>
          </div>
          <span className="text-xs md:text-sm text-orange-500">
            {t("total_hadith_assigned").replace("{count}", hadithList.length)}
          </span>
        </div>

        {hadithList.map((hadith) => (
          <div
            key={hadith.id}
            className={`flex items-center justify-between border-b py-2 md:py-3 ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
              <input type="checkbox" className="flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <p
                  className={`text-sm md:text-base truncate ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Sample Hadith Text
                </p>
                <p
                  className={`text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {hadith.book} - {t("hadith")} {hadith.hadithNo}
                </p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button
                onClick={() => handleDelete(hadith.id)}
                className={`text-xs md:text-sm ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {t("delete")}
              </button>
              <button className="text-orange-500 hover:text-orange-400 text-xs md:text-sm">
                {t("edit")}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Review Component
const Review = ({ formData, ayaatList, hadithList }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  return (
    <div className="space-y-4 md:space-y-6">
      <h2
        className={`text-xl md:text-2xl font-semibold mb-3 md:mb-4 ${
          theme === "dark" ? "text-white" : "text-gray-900"
        }`}
      >
        {t("review_submission")}
      </h2>

      <div className="space-y-3 md:space-y-4">
        <div
          className={`p-3 md:p-4 rounded-lg ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <h3
            className={`text-base md:text-lg font-semibold mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {t("topic_info")}
          </h3>
          <div
            className={`space-y-1 md:space-y-2 text-xs md:text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <p>
              <span className="font-medium">{t("topic_name")}:</span>{" "}
              {formData.topicName || t("not_provided")}
            </p>
            <p>
              <span className="font-medium">{t("alternative_name")}:</span>{" "}
              {formData.alternativeName || t("not_provided")}
            </p>
            <p>
              <span className="font-medium">{t("topic_description")}:</span>{" "}
              {formData.topicDescription || t("not_provided")}
            </p>
            <p>
              <span className="font-medium">{t("suggested_arrangement")}:</span>{" "}
              {formData.suggestedArrangement || t("not_provided")}
            </p>
          </div>
        </div>

        <div
          className={`p-3 md:p-4 rounded-lg ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <h3
            className={`text-base md:text-lg font-semibold mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {t("aayaat")}
          </h3>
          <p
            className={`text-xs md:text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t("total_ayats")}: {ayaatList.length}
          </p>
        </div>

        <div
          className={`p-3 md:p-4 rounded-lg ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-100"
          }`}
        >
          <h3
            className={`text-base md:text-lg font-semibold mb-2 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            {t("hadith")}
          </h3>
          <p
            className={`text-xs md:text-sm ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t("total_hadith")}: {hadithList.length}
          </p>
        </div>
      </div>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ currentStep, steps }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={` rounded-lg shadow-sm p-4 md:p-8 mb-4 md:mb-6 ${
        theme === "dark" ? "bg-gray-800" : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between overflow-x-auto pb-2 md:pb-0">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep > step.id
                    ? "bg-orange-500"
                    : currentStep === step.id
                      ? "bg-orange-500"
                      : theme === "dark"
                        ? "bg-gray-600"
                        : "bg-gray-300"
                }`}
              >
                {currentStep > step.id ? (
                  <svg
                    className="w-4 h-4 md:w-6 md:h-6 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <div
                    className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${
                      theme === "dark" ? "bg-gray-800" : "bg-white"
                    }`}
                  ></div>
                )}
              </div>
              <p
                className={`mt-1 md:mt-2 text-xs md:text-sm font-medium truncate max-w-[80px] md:max-w-none ${
                  currentStep >= step.id
                    ? theme === "dark"
                      ? "text-gray-200"
                      : "text-gray-900"
                    : theme === "dark"
                      ? "text-gray-500"
                      : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-0.5 md:h-1 flex-1 mx-2 md:mx-4 transition-all duration-300 ${
                  currentStep > step.id
                    ? "bg-orange-500"
                    : theme === "dark"
                      ? "bg-gray-600"
                      : "bg-gray-300"
                }`}
                style={{ marginTop: "-20px" }}
              ></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
export default function TopicFormWizard() {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    topicName: "",
    alternativeName: "",
    topicDescription: "",
    suggestedArrangement: "",
  });
  const [ayaatList, setAyaatList] = useState([]);
  const [hadithList, setHadithList] = useState([]);

  const steps = [
    { id: 1, name: "Topic Info", label: t("topic_info") },
    { id: 2, name: "Aayaat", label: t("aayaat") },
    { id: 3, name: "Hadith", label: t("hadith") },
    { id: 4, name: "Review", label: t("review") },
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSave = () => {
    console.log("Save clicked!");
    setShowSuccess(true);
  };

  const handleAddNew = () => {
    setShowSuccess(false);
    setCurrentStep(1);
    setFormData({
      topicName: "",
      alternativeName: "",
      topicDescription: "",
      suggestedArrangement: "",
    });
    setAyaatList([]);
    setHadithList([]);
  };

  const renderComponent = () => {
    switch (currentStep) {
      case 1:
        return <TopicInfo formData={formData} setFormData={setFormData} />;
      case 2:
        return <Aayaat ayaatList={ayaatList} setAyaatList={setAyaatList} />;
      case 3:
        return <Hadith hadithList={hadithList} setHadithList={setHadithList} />;
      case 4:
        return (
          <Review
            formData={formData}
            ayaatList={ayaatList}
            hadithList={hadithList}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      className={`min-h-screen p-3 md:p-8 ${
        theme === "dark" ? "bg-gray-900" : "bg-orange-50"
      }`}
    >
      <div className=" max-w-6xl mx-auto">
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} steps={steps} />

        {/* Dynamic Component Content */}
        <div
          className={` rounded-lg shadow-sm border-2 border-orange-500 p-4 md:p-8 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          {renderComponent()}

          {/* Navigation Buttons */}
          <div
            className={`flex justify-between items-center pt-4 md:pt-6 mt-4 md:mt-6 border-t ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-4 md:px-6 py-2 text-sm md:text-base rounded-md font-medium transition ${
                currentStep === 1
                  ? theme === "dark"
                    ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : theme === "dark"
                    ? "bg-gray-700 text-gray-200 hover:bg-gray-600"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {t("back")}
            </button>
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 md:px-8 py-2 text-sm md:text-base bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition"
              >
                {t("next")}
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-6 md:px-8 py-2 text-sm md:text-base bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition"
              >
                {t("save")}
              </button>
            )}
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
            <div
              className={`rounded-lg p-4 md:p-6 max-w-md w-full relative border ${
                theme === "dark"
                  ? "bg-gray-800 border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >
              <button
                onClick={() => setShowSuccess(false)}
                className={`absolute top-3 md:top-4 right-3 md:right-4 text-xl md:text-2xl ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                ✕
              </button>
              <h3
                className={`text-lg md:text-xl font-semibold mb-2 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("topic_created_success")}
              </h3>
              <p
                className={`text-sm md:text-base mb-4 md:mb-6 ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                {t("topic_created_message")
                  .replace("{ayaatCount}", ayaatList.length)
                  .replace("{hadithCount}", hadithList.length)}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 md:gap-3 justify-end">
                <button
                  onClick={() => setShowSuccess(false)}
                  className={`px-4 md:px-6 py-2 text-sm md:text-base border rounded-md transition ${
                    theme === "dark"
                      ? "border-gray-600 hover:bg-gray-700 text-gray-200"
                      : "border-gray-300 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {t("close")}
                </button>
                <button
                  onClick={handleAddNew}
                  className="px-4 md:px-6 py-2 text-sm md:text-base bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                >
                  {t("add_new_topic")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back to Topics Button */}
      <div className="flex justify-center mb-6 md:mb-8 mt-4 md:mt-6">
        <button
          onClick={() => window.history.back()}
          className={`inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium border-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md group ${
            theme === "dark"
              ? "text-gray-200 bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-orange-500"
              : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-orange-500"
          }`}
        >
          <svg
            className="w-4 h-4 md:w-5 md:h-5 group-hover:-translate-x-1 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {t("back_to_topics")}
        </button>
      </div>
    </div>
  );
}
