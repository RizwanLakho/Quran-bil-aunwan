import React, { useState } from "react";
import { Plus, Send } from "lucide-react";
import { useTranslation } from "react-i18next";

// Topic Info Component
const TopicInfo = ({ formData, setFormData }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t("topic_name")}
          </label>
          <input
            type="text"
            name="topicName"
            value={formData.topicName}
            onChange={handleChange}
            placeholder={t("topic_name_placeholder")}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t("alternative_name")}
          </label>
          <input
            type="text"
            name="alternativeName"
            value={formData.alternativeName}
            onChange={handleChange}
            placeholder={t("alternative_name_placeholder")}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t("topic_description")}
          </label>
          <input
            type="text"
            name="topicDescription"
            value={formData.topicDescription}
            onChange={handleChange}
            placeholder={t("topic_description_placeholder")}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {t("suggested_arrangement")}
          </label>
          <input
            type="text"
            name="suggestedArrangement"
            value={formData.suggestedArrangement}
            onChange={handleChange}
            placeholder={t("suggested_arrangement_placeholder")}
            className="w-full px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white placeholder-gray-400"
          />
        </div>
      </div>
    </div>
  );
};

// Aayaat Component
const Aayaat = ({ ayaatList, setAyaatList }) => {
  const { t } = useTranslation();
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
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-1">
          {t("topics")}
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          {t("manage_topics_description")}
        </p>
        <h3 className="text-lg text-gray-500 mb-6">{t("add_ayats")}</h3>
      </div>

      {/* Add Ayats Section */}
      <div>
        <h4 className="text-base font-semibold text-white mb-2">
          {t("add_ayats")}
        </h4>
        <p className="text-sm text-gray-400 mb-4">
          {t("add_ayats_description")}
        </p>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <select
            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            value={newAyat.surah}
            onChange={(e) => setNewAyat({ ...newAyat, surah: e.target.value })}
          >
            <option value="">{t("select_surah")}</option>
            <option value="Al-Fatiha">{t("al_fatiha")}</option>
            <option value="Al-Baqarah">{t("al_baqarah")}</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
            value={newAyat.ayat}
            onChange={(e) => setNewAyat({ ...newAyat, ayat: e.target.value })}
          >
            <option value="">{t("select_ayat")}</option>
            <option value="1">{t("ayat_1")}</option>
            <option value="2">{t("ayat_2")}</option>
          </select>

          <button
            onClick={handleAddAyat}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
          >
            {t("load_ayat")}
          </button>
        </div>

        <input
          type="text"
          placeholder={t("ayat_placeholder")}
          className="w-full px-4 py-2 border border-gray-600 rounded-md mb-4 bg-gray-700 text-gray-400"
          readOnly
        />

        <input
          type="text"
          placeholder={t("ayat_description_placeholder")}
          value={newAyat.description}
          onChange={(e) =>
            setNewAyat({ ...newAyat, description: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-600 rounded-md mb-4 bg-gray-700 text-white placeholder-gray-400"
        />

        <div className="flex justify-between items-center">
          <button className="flex items-center text-gray-400 hover:text-gray-200">
            <Plus className="w-4 h-4 mr-1" />
            {t("add_another")}
          </button>
          <button className="flex items-center text-orange-500 hover:text-orange-400">
            <Send className="w-4 h-4 mr-1" />
            {t("assign")}
          </button>
        </div>
      </div>

      {/* Assigned Ayats List */}
      <div className="mt-8">
        <h3 className="text-lg text-gray-500 mb-4">{t("assigned_ayats")}</h3>
        <h4 className="text-base font-semibold text-white mb-2">
          {t("list_of_assigned_ayat")}
        </h4>
        <p className="text-sm text-gray-400 mb-4">
          {t("add_ayats_description")}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-300">{t("select_all")}</span>
            </label>
            <span className="text-sm text-gray-400">
              | {ayaatList.length} {t("selected")} |{" "}
              <span className="text-orange-500">{t("delete_selected")}</span>
            </span>
          </div>
          <span className="text-sm text-orange-500">
            {t("total_ayat_assigned").replace("{count}", ayaatList.length)}
          </span>
        </div>

        {ayaatList.map((ayat) => (
          <div
            key={ayat.id}
            className="flex items-center justify-between border-b border-gray-700 py-3"
          >
            <div className="flex items-center gap-3">
              <input type="checkbox" />
              <div>
                <p className="text-sm text-white" style={{ direction: "rtl" }}>
                  وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ
                </p>
                <p className="text-xs text-gray-400">
                  {ayat.surah} - {t("ayah")} {ayat.ayat}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(ayat.id)}
                className="text-gray-400 hover:text-gray-200 text-sm"
              >
                {t("delete")}
              </button>
              <button className="text-orange-500 hover:text-orange-400 text-sm">
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
  const [newHadith, setNewHadith] = useState({
    arabicText: "",
    englishTranslation: "",
    urduTranslation: "",
    bookReference: "",
    pageReference: "",
  });

  const handleAddHadith = () => {
    if (newHadith.arabicText) {
      setHadithList([...hadithList, { ...newHadith, id: Date.now() }]);
      setNewHadith({
        arabicText: "",
        englishTranslation: "",
        urduTranslation: "",
        bookReference: "",
        pageReference: "",
      });
    }
  };

  const handleDelete = (id) => {
    setHadithList(hadithList.filter((item) => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-1">
          {t("topics")}
        </h2>
        <p className="text-sm text-gray-400 mb-4">
          {t("manage_topics_description")}
        </p>
        <h3 className="text-lg text-gray-500 mb-6">{t("add_hadith")}</h3>
      </div>

      <div>
        <h4 className="text-base font-semibold text-white mb-2">
          {t("add_hadith")}
        </h4>
        <p className="text-sm text-gray-400 mb-4">
          {t("add_hadith_description")}
        </p>

        <input
          type="text"
          placeholder={t("hadith_arabic_placeholder")}
          value={newHadith.arabicText}
          onChange={(e) =>
            setNewHadith({ ...newHadith, arabicText: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-600 rounded-md mb-4 bg-gray-700 text-white placeholder-gray-400"
        />

        <input
          type="text"
          placeholder={t("hadith_english_placeholder")}
          value={newHadith.englishTranslation}
          onChange={(e) =>
            setNewHadith({ ...newHadith, englishTranslation: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-600 rounded-md mb-4 bg-gray-700 text-white placeholder-gray-400"
        />

        <input
          type="text"
          placeholder={t("hadith_urdu_placeholder")}
          value={newHadith.urduTranslation}
          onChange={(e) =>
            setNewHadith({ ...newHadith, urduTranslation: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-600 rounded-md mb-4 bg-gray-700 text-white placeholder-gray-400"
        />

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder={t("hadith_reference_placeholder")}
            value={newHadith.bookReference}
            onChange={(e) =>
              setNewHadith({ ...newHadith, bookReference: e.target.value })
            }
            className="flex-1 px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
          />
          <input
            type="text"
            placeholder={t("hadith_reference_placeholder")}
            value={newHadith.pageReference}
            onChange={(e) =>
              setNewHadith({ ...newHadith, pageReference: e.target.value })
            }
            className="flex-1 px-4 py-2 border border-gray-600 rounded-md bg-gray-700 text-white placeholder-gray-400"
          />
          <button
            onClick={handleAddHadith}
            className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition"
          >
            {t("add_more")}
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
            {t("remove_ref")}
          </button>
        </div>

        <div className="flex justify-between items-center">
          <button className="flex items-center text-gray-400 hover:text-gray-200">
            <Plus className="w-4 h-4 mr-1" />
            {t("add_another")}
          </button>
          <button className="flex items-center text-orange-500 hover:text-orange-400">
            <Send className="w-4 h-4 mr-1" />
            {t("submit")}
          </button>
        </div>
      </div>

      {/* Assigned Hadith List */}
      <div className="mt-8">
        <h3 className="text-lg text-gray-500 mb-4">{t("assigned_ayats")}</h3>
        <h4 className="text-base font-semibold text-white mb-2">
          {t("list_of_added_hadith")}
        </h4>
        <p className="text-sm text-gray-400 mb-4">
          {t("add_hadith_description")}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-300">{t("select_all")}</span>
            </label>
            <span className="text-sm text-gray-400">
              | {hadithList.length} {t("selected")}
            </span>
          </div>
          <span className="text-sm text-orange-500">
            {t("total_hadith_added").replace("{count}", hadithList.length)}
          </span>
        </div>

        {hadithList.map((hadith) => (
          <div
            key={hadith.id}
            className="flex items-center justify-between border-b border-gray-700 py-3"
          >
            <div className="flex items-center gap-3">
              <input type="checkbox" />
              <div>
                <p className="text-sm text-white" style={{ direction: "rtl" }}>
                  {hadith.arabicText}
                </p>
                <p className="text-xs text-gray-400">
                  {hadith.englishTranslation}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(hadith.id)}
                className="text-gray-400 hover:text-gray-200 text-sm"
              >
                {t("delete")}
              </button>
              <button className="text-orange-500 hover:text-orange-400 text-sm">
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-white mb-1">
          {t("topics")}
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          {t("manage_topics_description")}
        </p>
      </div>

      {/* List of Assigned Ayat */}
      <div>
        <h4 className="text-base font-semibold text-white mb-2">
          {t("list_of_assigned_ayat")}
        </h4>
        <p className="text-sm text-gray-400 mb-4">
          {t("add_ayats_description")}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-300">{t("select_all")}</span>
            </label>
            <span className="text-sm text-gray-400">
              | {ayaatList.length} {t("selected")} |{" "}
              <span className="text-orange-500">{t("delete_selected")}</span>
            </span>
          </div>
          <span className="text-sm text-orange-500">
            {t("total_ayat_assigned").replace("{count}", ayaatList.length)}
          </span>
        </div>

        <div className="space-y-2 mb-8">
          {ayaatList.map((ayat) => (
            <div
              key={ayat.id}
              className="flex items-center justify-between border-b border-gray-700 py-3"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <div>
                  <p
                    className="text-sm text-white"
                    style={{ direction: "rtl" }}
                  >
                    وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ
                  </p>
                  <p className="text-xs text-gray-400">
                    {ayat.surah} - {t("ayah")} {ayat.ayat}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-gray-200 text-sm">
                  {t("delete")}
                </button>
                <button className="text-orange-500 hover:text-orange-400 text-sm">
                  {t("edit")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hadith List */}
      <div>
        <h3 className="text-lg text-gray-500 mb-4">{t("assigned_ayats")}</h3>
        <h4 className="text-base font-semibold text-white mb-2">
          {t("list_of_added_hadith")}
        </h4>
        <p className="text-sm text-gray-400 mb-4">
          {t("add_hadith_description")}
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm text-gray-300">{t("select_all")}</span>
            </label>
            <span className="text-sm text-gray-400">
              | {hadithList.length} {t("selected")}
            </span>
          </div>
          <span className="text-sm text-orange-500">
            {t("total_hadith_added").replace("{count}", hadithList.length)}
          </span>
        </div>

        <div className="space-y-2">
          {hadithList.map((hadith) => (
            <div
              key={hadith.id}
              className="flex items-center justify-between border-b border-gray-700 py-3"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <div>
                  <p
                    className="text-sm text-white"
                    style={{ direction: "rtl" }}
                  >
                    {hadith.arabicText}
                  </p>
                  <p className="text-xs text-gray-400">
                    {hadith.englishTranslation}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-400 hover:text-gray-200 text-sm">
                  {t("delete")}
                </button>
                <button className="text-orange-500 hover:text-orange-400 text-sm">
                  {t("edit")}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Progress Bar Component
const ProgressBar = ({ currentStep, steps }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep > step.id
                    ? "bg-orange-500"
                    : currentStep === step.id
                      ? "bg-orange-500"
                      : "bg-gray-600"
                }`}
              >
                {currentStep > step.id ? (
                  <svg
                    className="w-6 h-6 text-white"
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
                  <div className="w-4 h-4 bg-gray-800 rounded-full"></div>
                )}
              </div>
              <p
                className={`mt-2 text-sm font-medium ${
                  currentStep >= step.id ? "text-gray-200" : "text-gray-500"
                }`}
              >
                {step.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-4 transition-all duration-300 ${
                  currentStep > step.id ? "bg-orange-500" : "bg-gray-600"
                }`}
                style={{ marginTop: "-28px" }}
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
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} steps={steps} />

        {/* Dynamic Component Content */}
        <div className="bg-gray-800 rounded-lg shadow-sm border-2 border-blue-500 p-8">
          {renderComponent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 mt-6 border-t border-gray-700">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-md font-medium ${
                currentStep === 1
                  ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                  : "bg-gray-700 text-gray-200 hover:bg-gray-600"
              } transition`}
            >
              {t("back")}
            </button>
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-8 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition"
              >
                {t("next")}
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-8 py-2 bg-orange-500 text-white rounded-md font-medium hover:bg-orange-600 transition"
              >
                {t("save")}
              </button>
            )}
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
            <div className="bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4 relative border border-gray-700">
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold text-white mb-2">
                {t("topic_created_success")}
              </h3>
              <p className="text-gray-400 mb-6">
                {t("topic_created_message")
                  .replace("{ayaatCount}", ayaatList.length)
                  .replace("{hadithCount}", hadithList.length)}
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="px-6 py-2 border border-gray-600 rounded-md hover:bg-gray-700 transition text-gray-200"
                >
                  {t("close")}
                </button>
                <button
                  onClick={handleAddNew}
                  className="px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
                >
                  {t("add_new_topic")}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center mb-8 mt-6">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-200 bg-gray-800 border-2 border-gray-600 rounded-lg hover:bg-gray-700 hover:border-orange-500 transition-all duration-200 shadow-sm hover:shadow-md group"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200"
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
