import React, { useState, useContext, useEffect } from "react";
import { Plus, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import TopicsService from "../services/TopicsService";
import api from "../services/api";

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
            {t("topic_name")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="topicName"
            value={formData.topicName}
            onChange={handleChange}
            placeholder={t("topic_name_placeholder")}
            required
            className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
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
            {t("alternative_name")} <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="alternativeName"
            value={formData.alternativeName}
            onChange={handleChange}
            placeholder={t("alternative_name_placeholder")}
            required
            className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
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
          <textarea
            name="topicDescription"
            value={formData.topicDescription}
            onChange={handleChange}
            placeholder={t("topic_description_placeholder")}
            rows="3"
            className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
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
            {t("status")} <span className="text-red-500">*</span>
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
              theme === "dark"
                ? "border-gray-600 bg-gray-700 text-white"
                : "border-gray-300 bg-white text-gray-900"
            }`}
          >
            <option value="draft">{t("draft") || "Draft"}</option>
            <option value="published">{t("published") || "Published"}</option>
          </select>
        </div>
      </div>
    </div>
  );
};

// Aayaat Component with Real API Integration - Two-step selection (Surah → Ayah)
const Aayaat = ({ ayaatList, setAyaatList }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [newAyat, setNewAyat] = useState({
    ayah_id: "",
    description: "",
  });
  const [allSurahs, setAllSurahs] = useState([]);
  const [allAyahs, setAllAyahs] = useState([]);
  const [selectedSurah, setSelectedSurah] = useState("");
  const [loadingSurahs, setLoadingSurahs] = useState(false);
  const [loadingAyahs, setLoadingAyahs] = useState(false);
  const [selectedAyats, setSelectedAyats] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Fetch all surahs on component mount
  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        setLoadingSurahs(true);
        const response = await api.get("/surahs?per_page=114");
        if (response.data && response.data.data) {
          setAllSurahs(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching surahs:", error);
      } finally {
        setLoadingSurahs(false);
      }
    };

    fetchSurahs();
  }, []);

  // Fetch ayahs when a surah is selected
  useEffect(() => {
    const fetchAyahs = async () => {
      if (!selectedSurah) {
        setAllAyahs([]);
        return;
      }

      try {
        setLoadingAyahs(true);
        const response = await api.get(
          `/ayahs?filter[surah_number]=${selectedSurah}&per_page=300`
        );
        if (response.data && response.data.data) {
          setAllAyahs(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching ayahs:", error);
      } finally {
        setLoadingAyahs(false);
      }
    };

    fetchAyahs();
  }, [selectedSurah]);

  // Add Ayat to list
  const handleAddAyat = () => {
    if (newAyat.ayah_id) {
      const selectedAyah = allAyahs.find(
        (ayah) => ayah.id === parseInt(newAyat.ayah_id)
      );

      if (selectedAyah) {
        setAyaatList([
          ...ayaatList,
          {
            ...newAyat,
            id: Date.now(),
            ayah_text: selectedAyah.text,
            ayah_number: selectedAyah.ayah_number,
            surah_number: selectedAyah.surah_number,
          },
        ]);
        setNewAyat({ ayah_id: "", description: "" });
      }
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedAyats((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedAyats([]);
    } else {
      setSelectedAyats(ayaatList.map((ayat) => ayat.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    setAyaatList(ayaatList.filter((ayat) => !selectedAyats.includes(ayat.id)));
    setSelectedAyats([]);
    setSelectAll(false);
  };

  const handleDelete = (id) => {
    setAyaatList(ayaatList.filter((item) => item.id !== id));
    setSelectedAyats(selectedAyats.filter((item) => item !== id));
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2
          className={`text-xl md:text-2xl font-semibold mb-1 ${
            theme === "dark" ? "text-white" : "text-gray-900"
          }`}
        >
          {t("add_ayats")}
        </h2>
        <p
          className={`text-xs md:text-sm mb-3 md:mb-4 ${
            theme === "dark" ? "text-gray-400" : "text-gray-600"
          }`}
        >
          {t("add_ayats_description") || "Select ayahs to add to this topic"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4 mb-3 md:mb-4">
        {/* Step 1: Select Surah */}
        <select
          className={`px-3 md:px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-white text-gray-900"
          }`}
          value={selectedSurah}
          onChange={(e) => {
            setSelectedSurah(e.target.value);
            setNewAyat({ ayah_id: "", description: newAyat.description });
          }}
          disabled={loadingSurahs}
        >
          <option value="">
            {loadingSurahs ? "Loading Surahs..." : "1. Select Surah First"}
          </option>
          {allSurahs.map((surah) => (
            <option key={surah.number} value={surah.number}>
              {surah.number}. {surah.english_name} ({surah.name}) - {surah.number_of_ayahs} Ayahs
            </option>
          ))}
        </select>

        {/* Step 2: Select Ayah (only enabled after surah selection) */}
        <select
          className={`px-3 md:px-4 py-2 text-sm md:text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-primary ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-white text-gray-900"
          } ${!selectedSurah ? "opacity-50 cursor-not-allowed" : ""}`}
          value={newAyat.ayah_id}
          onChange={(e) => setNewAyat({ ...newAyat, ayah_id: e.target.value })}
          disabled={!selectedSurah || loadingAyahs}
        >
          <option value="">
            {!selectedSurah
              ? "2. Select Ayah (Select Surah First)"
              : loadingAyahs
              ? "Loading Ayahs..."
              : "2. Select Ayah"}
          </option>
          {allAyahs.map((ayah) => (
            <option key={ayah.id} value={ayah.id}>
              Ayah {ayah.ayah_number}: {ayah.text?.substring(0, 80)}...
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder={t("ayat_description_placeholder")}
          value={newAyat.description}
          onChange={(e) =>
            setNewAyat({ ...newAyat, description: e.target.value })
          }
          className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
              : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
          }`}
        />

        <button
          onClick={handleAddAyat}
          disabled={!newAyat.ayah_id}
          className={`flex items-center justify-center text-sm md:text-base px-4 py-2 rounded-md transition ${
            !newAyat.ayah_id
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-primary text-white hover:bg-orange-400"
          }`}
        >
          <Plus className="w-4 h-4 mr-1" />
          {t("assign")}
        </button>
      </div>

      <div className="mt-6 md:mt-8">
        <h3
          className={`text-base md:text-lg mb-3 md:mb-4 ${
            theme === "dark" ? "text-gray-500" : "text-gray-700"
          }`}
        >
          {t("assigned_ayats")} ({ayaatList.length})
        </h3>

        {ayaatList.length > 0 && (
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <span
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("select_all")}
              </span>
            </label>
            <button
              onClick={handleDeleteSelected}
              disabled={selectedAyats.length === 0}
              className={`text-sm ${
                selectedAyats.length === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-primary hover:text-orange-400"
              }`}
            >
              {t("delete_selected")} ({selectedAyats.length})
            </button>
          </div>
        )}

        {ayaatList.length === 0 ? (
          <p
            className={`text-center py-8 text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No ayahs assigned yet. Add some ayahs above.
          </p>
        ) : (
          ayaatList.map((ayat) => (
            <div
              key={ayat.id}
              className={`flex items-center justify-between border-b py-3 ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex items-center gap-3 flex-1">
                <input
                  type="checkbox"
                  checked={selectedAyats.includes(ayat.id)}
                  onChange={() => handleCheckboxChange(ayat.id)}
                />
                <div className="flex-1">
                  <p
                    className={`text-base mb-1 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                    style={{
                      direction: "rtl",
                      fontFamily:
                        "'Amiri', 'Scheherazade New', 'Traditional Arabic', serif",
                    }}
                  >
                    {ayat.ayah_text}
                  </p>
                  <p
                    className={`text-xs ${
                      theme === "dark" ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Surah {ayat.surah_number} - Ayah {ayat.ayah_number}
                  </p>
                  {ayat.description && (
                    <p
                      className={`text-xs mt-1 ${
                        theme === "dark" ? "text-gray-500" : "text-gray-600"
                      }`}
                    >
                      {ayat.description}
                    </p>
                  )}
                </div>
              </div>
              <button
                onClick={() => handleDelete(ayat.id)}
                className={`text-sm ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-600 hover:text-gray-800"
                }`}
              >
                {t("delete")}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Hadith Component
const Hadith = ({ hadithList, setHadithList }) => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);
  const [newHadith, setNewHadith] = useState({
    text_arabic: "",
    text_urdu: "",
    text_english: "",
    description: "",
  });
  const [selectedHadiths, setSelectedHadiths] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const handleAddHadith = () => {
    if (newHadith.text_arabic) {
      setHadithList([
        ...hadithList,
        {
          ...newHadith,
          id: Date.now(),
        },
      ]);
      setNewHadith({
        text_arabic: "",
        text_urdu: "",
        text_english: "",
        description: "",
      });
    }
  };

  const handleCheckboxChange = (id) => {
    setSelectedHadiths((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedHadiths([]);
    } else {
      setSelectedHadiths(hadithList.map((hadith) => hadith.id));
    }
    setSelectAll(!selectAll);
  };

  const handleDeleteSelected = () => {
    setHadithList(
      hadithList.filter((hadith) => !selectedHadiths.includes(hadith.id))
    );
    setSelectedHadiths([]);
    setSelectAll(false);
  };

  const handleDelete = (id) => {
    setHadithList(hadithList.filter((item) => item.id !== id));
    setSelectedHadiths(selectedHadiths.filter((item) => item !== id));
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
          {t("manage_hadith_description") || "Add hadiths to this topic"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4 mb-3 md:mb-4">
        <textarea
          placeholder={t("hadith_arabic_text") || "Hadith Text (Arabic) *"}
          value={newHadith.text_arabic}
          onChange={(e) =>
            setNewHadith({ ...newHadith, text_arabic: e.target.value })
          }
          rows="3"
          className={`w-full px-3 md:px-4 py-3 text-base border rounded-md ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-white"
              : "border-gray-300 bg-white text-gray-900"
          }`}
          style={{
            direction: "rtl",
            fontFamily:
              "'Amiri', 'Scheherazade New', 'Traditional Arabic', serif",
          }}
        />

        <textarea
          placeholder={t("hadith_urdu_text") || "Hadith Text (Urdu)"}
          value={newHadith.text_urdu}
          onChange={(e) =>
            setNewHadith({ ...newHadith, text_urdu: e.target.value })
          }
          rows="3"
          className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
              : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
          }`}
        />

        <textarea
          placeholder={t("hadith_english_text") || "Hadith Text (English)"}
          value={newHadith.text_english}
          onChange={(e) =>
            setNewHadith({ ...newHadith, text_english: e.target.value })
          }
          rows="3"
          className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
              : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
          }`}
        />

        <input
          type="text"
          placeholder={t("hadith_description_placeholder")}
          value={newHadith.description}
          onChange={(e) =>
            setNewHadith({ ...newHadith, description: e.target.value })
          }
          className={`w-full px-3 md:px-4 py-2 text-sm md:text-base border rounded-md ${
            theme === "dark"
              ? "border-gray-600 bg-gray-700 text-white placeholder-gray-400"
              : "border-gray-300 bg-white text-gray-900 placeholder-gray-500"
          }`}
        />

        <button
          onClick={handleAddHadith}
          disabled={!newHadith.text_arabic}
          className={`flex items-center justify-center text-sm md:text-base px-4 py-2 rounded-md transition ${
            !newHadith.text_arabic
              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
              : "bg-primary text-white hover:bg-orange-400"
          }`}
        >
          <Plus className="w-4 h-4 mr-1" />
          {t("assign")}
        </button>
      </div>

      <div className="mt-6 md:mt-8">
        <h3
          className={`text-base md:text-lg mb-3 md:mb-4 ${
            theme === "dark" ? "text-gray-500" : "text-gray-700"
          }`}
        >
          {t("assigned_hadith")} ({hadithList.length})
        </h3>

        {hadithList.length > 0 && (
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="mr-2"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              <span
                className={`text-sm ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                {t("select_all")}
              </span>
            </label>
            <button
              onClick={handleDeleteSelected}
              disabled={selectedHadiths.length === 0}
              className={`text-sm ${
                selectedHadiths.length === 0
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-primary hover:text-orange-400"
              }`}
            >
              {t("delete_selected")} ({selectedHadiths.length})
            </button>
          </div>
        )}

        {hadithList.length === 0 ? (
          <p
            className={`text-center py-8 text-sm ${
              theme === "dark" ? "text-gray-400" : "text-gray-500"
            }`}
          >
            No hadiths assigned yet. Add some hadiths above.
          </p>
        ) : (
          hadithList.map((hadith) => (
            <div
              key={hadith.id}
              className={`border-b py-3 ${
                theme === "dark" ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1"
                  checked={selectedHadiths.includes(hadith.id)}
                  onChange={() => handleCheckboxChange(hadith.id)}
                />
                <div className="flex-1">
                  <p
                    className={`text-base mb-2 ${
                      theme === "dark" ? "text-white" : "text-gray-900"
                    }`}
                    style={{
                      direction: "rtl",
                      fontFamily:
                        "'Amiri', 'Scheherazade New', 'Traditional Arabic', serif",
                    }}
                  >
                    {hadith.text_arabic}
                  </p>
                  {hadith.text_english && (
                    <p
                      className={`text-sm mb-1 ${
                        theme === "dark" ? "text-gray-300" : "text-gray-700"
                      }`}
                    >
                      {hadith.text_english}
                    </p>
                  )}
                  {hadith.description && (
                    <p
                      className={`text-xs ${
                        theme === "dark" ? "text-gray-500" : "text-gray-600"
                      }`}
                    >
                      {hadith.description}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleDelete(hadith.id)}
                  className={`text-sm ${
                    theme === "dark"
                      ? "text-gray-400 hover:text-gray-200"
                      : "text-gray-600 hover:text-gray-800"
                  }`}
                >
                  {t("delete")}
                </button>
              </div>
            </div>
          ))
        )}
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
              <span className="font-medium">{t("status")}:</span>{" "}
              {formData.status}
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
      className={`rounded-lg shadow-sm p-4 md:p-8 mb-4 md:mb-6 ${
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
                    ? "bg-primary"
                    : currentStep === step.id
                      ? "bg-primary"
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
                    ? "bg-primary"
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
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    topicName: "",
    alternativeName: "",
    topicDescription: "",
    status: "draft",
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
    // Validate required fields in step 1
    if (currentStep === 1) {
      if (!formData.topicName || !formData.alternativeName) {
        setError("Please fill in all required fields");
        return;
      }
    }

    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
      setError(null);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      // Validate
      if (!formData.topicName || !formData.alternativeName) {
        throw new Error("Topic name and alternative name are required");
      }

      // Prepare data for API
      const topicData = {
        name: formData.topicName,
        alternative_name: formData.alternativeName,
        description: formData.topicDescription || null,
        status: formData.status,
        ayahs: ayaatList.map((ayat) => ({
          ayah_id: parseInt(ayat.ayah_id),
          description: ayat.description || null,
        })),
        hadiths: hadithList.map((hadith) => ({
          text_arabic: hadith.text_arabic,
          text_urdu: hadith.text_urdu || null,
          text_english: hadith.text_english || null,
          description: hadith.description || null,
        })),
      };

      // Call API
      const response = await TopicsService.createTopic(topicData);

      if (response.success) {
        setShowSuccess(true);
      } else {
        throw new Error(response.message || "Failed to create topic");
      }
    } catch (err) {
      console.error("❌ Error creating topic:", err);
      console.error("Error details:", {
        message: err.message,
        code: err.code,
        name: err.name,
        hasResponse: !!err.response,
        status: err.response?.status,
        data: err.response?.data
      });

      // Handle specific error types
      if (err.response) {
        // Server responded with an error
        if (err.response.status === 401) {
          setError(
            "❌ Authentication Error: You must be logged in. Please login first."
          );
        } else if (err.response.status === 403) {
          setError(
            `❌ Permission Denied: ${err.response.data.message || "Your account is not verified. Contact support."}`
          );
        } else if (err.response.status === 422) {
          // Validation errors
          const errors = err.response.data.errors;
          const errorMessage = errors
            ? Object.values(errors).flat().join(", ")
            : "Validation failed. Please check your inputs.";
          setError(`❌ Validation Error: ${errorMessage}`);
        } else {
          setError(
            `❌ Server Error (${err.response.status}): ${err.response.data.message || "Failed to create topic"}`
          );
        }
      } else if (err.request) {
        // Request was made but no response
        setError(
          `❌ Network Error: Cannot connect to server at http://localhost:8000. Make sure backend is running. Error: ${err.message}`
        );
      } else {
        // Something else went wrong
        setError(`❌ Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAddNew = () => {
    setShowSuccess(false);
    setCurrentStep(1);
    setFormData({
      topicName: "",
      alternativeName: "",
      topicDescription: "",
      status: "draft",
    });
    setAyaatList([]);
    setHadithList([]);
    setError(null);
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
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} steps={steps} />

        {/* Error Alert */}
        {error && (
          <div
            className={`rounded-lg p-4 mb-4 border-l-4 ${
              theme === "dark"
                ? "bg-red-900/20 border-red-500 text-red-200"
                : "bg-red-50 border-red-500 text-red-800"
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Dynamic Component Content */}
        <div
          className={`rounded-lg shadow-sm border-2 border-primary p-4 md:p-8 ${
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
                className="px-6 md:px-8 py-2 text-sm md:text-base bg-primary text-white rounded-md font-medium hover:bg-orange-400 transition"
              >
                {t("next")}
              </button>
            ) : (
              <button
                onClick={handleSave}
                disabled={loading}
                className={`px-6 md:px-8 py-2 text-sm md:text-base rounded-md font-medium transition ${
                  loading
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-orange-400"
                }`}
              >
                {loading ? t("saving") || "Saving..." : t("save")}
              </button>
            )}
          </div>
        </div>

        {/* Success Popup Modal */}
        {showSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <div
              className={`relative rounded-lg p-6 md:p-8 max-w-md w-full shadow-2xl ${
                theme === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <button
                onClick={() => setShowSuccess(false)}
                className={`absolute top-3 right-3 text-2xl ${
                  theme === "dark"
                    ? "text-gray-400 hover:text-gray-200"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                ✕
              </button>

              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>

              <h3
                className={`text-lg md:text-xl font-semibold mb-2 text-center ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                {t("topic_created_success") || "Topic Created Successfully!"}
              </h3>

              <p
                className={`text-sm md:text-base mb-6 text-center ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                Your topic has been created with {ayaatList.length} ayahs and{" "}
                {hadithList.length} hadiths.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => {
                    setShowSuccess(false);
                    navigate("/home/quran-topics");
                  }}
                  className={`px-6 py-2 text-sm md:text-base border rounded-md transition ${
                    theme === "dark"
                      ? "border-gray-600 hover:bg-gray-700 text-gray-200"
                      : "border-gray-300 hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {t("view_topics") || "View Topics"}
                </button>
                <button
                  onClick={handleAddNew}
                  className="px-6 py-2 text-sm md:text-base bg-primary text-white rounded-md hover:bg-orange-400 transition"
                >
                  {t("add_new_topic") || "Add New Topic"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Back Button */}
      <div className="flex justify-center mb-6 md:mb-8 mt-4 md:mt-6">
        <button
          onClick={() => navigate(-1)}
          className={`inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-xs md:text-sm font-medium border-2 rounded-lg transition-all duration-200 shadow-sm hover:shadow-md group ${
            theme === "dark"
              ? "text-gray-200 bg-gray-800 border-gray-600 hover:bg-gray-700 hover:border-primary"
              : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50 hover:border-primary"
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
