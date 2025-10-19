import React, { useState } from "react";
import { Plus, Send } from "lucide-react";
import { NavLink } from "react-router-dom";

// Topic Info Component
const TopicInfo = ({ formData, setFormData }) => {
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic name
          </label>
          <input
            type="text"
            name="topicName"
            value={formData.topicName}
            onChange={handleChange}
            placeholder="eg. Allah"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Alternative Name
          </label>
          <input
            type="text"
            name="alternativeName"
            value={formData.alternativeName}
            onChange={handleChange}
            placeholder="eg. الله"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic Description
          </label>
          <input
            type="text"
            name="topicDescription"
            value={formData.topicDescription}
            onChange={handleChange}
            placeholder="eg. Short Description for the topic"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Suggested Arrangement
          </label>
          <input
            type="text"
            name="suggestedArrangement"
            value={formData.suggestedArrangement}
            onChange={handleChange}
            placeholder="eg. Dropdown - Available # only"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          />
        </div>
      </div>
    </div>
  );
};

// Aayaat Component
const Aayaat = ({ ayaatList, setAyaatList }) => {
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Topics</h2>
        <p className="text-sm text-gray-500 mb-4">
          Manage your ayaat and hadith associated with and their topics here.
        </p>
        <h3 className="text-lg text-gray-400 mb-6">Add Ayats</h3>
      </div>

      {/* Add Ayats Section */}
      <div>
        <h4 className="text-base font-semibold text-gray-800 mb-2">
          Add Ayats
        </h4>
        <p className="text-sm text-gray-500 mb-4">
          Get your projects up and running faster by inviting your team to
          collaborate.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newAyat.surah}
            onChange={(e) => setNewAyat({ ...newAyat, surah: e.target.value })}
          >
            <option value="">Select Surah</option>
            <option value="Al-Fatiha">Al-Fatiha</option>
            <option value="Al-Baqarah">Al-Baqarah</option>
          </select>

          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={newAyat.ayat}
            onChange={(e) => setNewAyat({ ...newAyat, ayat: e.target.value })}
          >
            <option value="">Select Ayat</option>
            <option value="1">Ayat 1</option>
            <option value="2">Ayat 2</option>
          </select>

          <button
            onClick={handleAddAyat}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-orange-400 transition"
          >
            Load Ayat
          </button>
        </div>

        <input
          type="text"
          placeholder="Ayat will apear after selection. It would be graded-out. Ready-only..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4 bg-gray-50"
          readOnly
        />

        <input
          type="text"
          placeholder="user description for ayaat, may be translations / explanations et."
          value={newAyat.description}
          onChange={(e) =>
            setNewAyat({ ...newAyat, description: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />

        <div className="flex justify-between items-center">
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <Plus className="w-4 h-4 mr-1" />
            Add another
          </button>
          <button className="flex items-center text-primary hover:text-orange-400">
            <Send className="w-4 h-4 mr-1" />
            Assign
          </button>
        </div>
      </div>

      {/* Assigned Ayats List */}
      <div className="mt-8">
        <h3 className="text-lg text-gray-400 mb-4">Assigned Ayats</h3>
        <h4 className="text-base font-semibold text-gray-800 mb-2">
          List of Assigned Ayat
        </h4>
        <p className="text-sm text-gray-500 mb-4">
          Get your projects up and running faster by inviting your team to
          collaborate.
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Select All</span>
            </label>
            <span className="text-sm text-gray-600">
              | {ayaatList.length} Selected |{" "}
              <span className="text-primary">Delete Selected</span>
            </span>
          </div>
          <span className="text-sm text-primary">
            Total {ayaatList.length} Ayat Assigned
          </span>
        </div>

        {ayaatList.map((ayat) => (
          <div
            key={ayat.id}
            className="flex items-center justify-between border-b py-3"
          >
            <div className="flex items-center gap-3">
              <input type="checkbox" />
              <div>
                <p
                  className="text-sm text-gray-800"
                  style={{ direction: "rtl" }}
                >
                  وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ
                </p>
                <p className="text-xs text-gray-500">
                  {ayat.surah} - Ayat {ayat.ayat}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(ayat.id)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Delete
              </button>
              <button className="text-primary hover:text-orange-400 text-sm">
                Edit
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
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Topics</h2>
        <p className="text-sm text-gray-500 mb-4">
          Manage your ayaat and hadith associated with and their topics here.
        </p>
        <h3 className="text-lg text-gray-400 mb-6">Add Hadith</h3>
      </div>

      <div>
        <h4 className="text-base font-semibold text-gray-800 mb-2">
          Add Hadith
        </h4>
        <p className="text-sm text-gray-500 mb-4">
          Get your projects up and running faster by inviting your team to
          collaborate.
        </p>

        <input
          type="text"
          placeholder="Type Hadith Arabic Description..."
          value={newHadith.arabicText}
          onChange={(e) =>
            setNewHadith({ ...newHadith, arabicText: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />

        <input
          type="text"
          placeholder="Type Hadith Translation - English"
          value={newHadith.englishTranslation}
          onChange={(e) =>
            setNewHadith({ ...newHadith, englishTranslation: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />

        <input
          type="text"
          placeholder="Type Hadith Translation - Urdu"
          value={newHadith.urduTranslation}
          onChange={(e) =>
            setNewHadith({ ...newHadith, urduTranslation: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
        />

        <div className="flex gap-4 mb-4">
          <input
            type="text"
            placeholder="Reference - Book | Page"
            value={newHadith.bookReference}
            onChange={(e) =>
              setNewHadith({ ...newHadith, bookReference: e.target.value })
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            placeholder="Reference - Book | Page"
            value={newHadith.pageReference}
            onChange={(e) =>
              setNewHadith({ ...newHadith, pageReference: e.target.value })
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={handleAddHadith}
            className="bg-primary text-white px-6 py-2 rounded-md hover:bg-orange-400 transition"
          >
            Add More
          </button>
          <button className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition">
            Remove 1 Ref
          </button>
        </div>

        <div className="flex justify-between items-center">
          <button className="flex items-center text-gray-600 hover:text-gray-800">
            <Plus className="w-4 h-4 mr-1" />
            Add another
          </button>
          <button className="flex items-center text-primary hover:text-orange-400">
            <Send className="w-4 h-4 mr-1" />
            Submit
          </button>
        </div>
      </div>

      {/* Assigned Hadith List */}
      <div className="mt-8">
        <h3 className="text-lg text-gray-400 mb-4">Assigned Ayats</h3>
        <h4 className="text-base font-semibold text-gray-800 mb-2">
          List of Added Hadith
        </h4>
        <p className="text-sm text-gray-500 mb-4">
          Get your projects up and running faster by inviting your team to
          collaborate.
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Select All</span>
            </label>
            <span className="text-sm text-gray-600">
              | {hadithList.length} Selected
            </span>
          </div>
          <span className="text-sm text-primary">
            Total {hadithList.length} Hadith Added
          </span>
        </div>

        {hadithList.map((hadith) => (
          <div
            key={hadith.id}
            className="flex items-center justify-between border-b py-3"
          >
            <div className="flex items-center gap-3">
              <input type="checkbox" />
              <div>
                <p
                  className="text-sm text-gray-800"
                  style={{ direction: "rtl" }}
                >
                  {hadith.arabicText}
                </p>
                <p className="text-xs text-gray-500">
                  {hadith.englishTranslation}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleDelete(hadith.id)}
                className="text-gray-500 hover:text-gray-700 text-sm"
              >
                Delete
              </button>
              <button className="text-primary hover:text-orange-400 text-sm">
                Edit
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
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-gray-800 mb-1">Topics</h2>
        <p className="text-sm text-gray-500 mb-6">
          Manage your ayaat and hadith associated with and their topics here.
        </p>
      </div>

      {/* List of Assigned Ayat */}
      <div>
        <h4 className="text-base font-semibold text-gray-800 mb-2">
          List of Assigned Ayat
        </h4>
        <p className="text-sm text-gray-500 mb-4">
          Get your projects up and running faster by inviting your team to
          collaborate.
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Select All</span>
            </label>
            <span className="text-sm text-gray-600">
              | {ayaatList.length} Selected |{" "}
              <span className="text-primary">Delete Selected</span>
            </span>
          </div>
          <span className="text-sm text-orange-500">
            Total {ayaatList.length} Ayat Assigned
          </span>
        </div>

        <div className="space-y-2 mb-8">
          {ayaatList.map((ayat) => (
            <div
              key={ayat.id}
              className="flex items-center justify-between border-b py-3"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <div>
                  <p
                    className="text-sm text-gray-800"
                    style={{ direction: "rtl" }}
                  >
                    وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ
                  </p>
                  <p className="text-xs text-gray-500">
                    {ayat.surah} - Ayat {ayat.ayat}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-gray-700 text-sm">
                  Delete
                </button>
                <button className="text-primary hover:text-orange-400 text-sm">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Hadith List */}
      <div>
        <h3 className="text-lg text-gray-400 mb-4">Assigned Ayats</h3>
        <h4 className="text-base font-semibold text-gray-800 mb-2">
          List of Added Hadith
        </h4>
        <p className="text-sm text-gray-500 mb-4">
          Get your projects up and running faster by inviting your team to
          collaborate.
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Select All</span>
            </label>
            <span className="text-sm text-gray-600">
              | {hadithList.length} Selected
            </span>
          </div>
          <span className="text-sm text-primary">
            Total {hadithList.length} Hadith Added
          </span>
        </div>

        <div className="space-y-2">
          {hadithList.map((hadith) => (
            <div
              key={hadith.id}
              className="flex items-center justify-between border-b py-3"
            >
              <div className="flex items-center gap-3">
                <input type="checkbox" defaultChecked />
                <div>
                  <p
                    className="text-sm text-gray-800"
                    style={{ direction: "rtl" }}
                  >
                    {hadith.arabicText}
                  </p>
                  <p className="text-xs text-gray-500">
                    {hadith.englishTranslation}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-gray-700 text-sm">
                  Delete
                </button>
                <button className="text-primary hover:text-orange-400 text-sm">
                  Edit
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
    <div className="bg-white rounded-lg shadow-sm p-8 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            <div className="flex flex-col items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  currentStep > step.id
                    ? "bg-primary"
                    : currentStep === step.id
                      ? "bg-primary"
                      : "bg-gray-300"
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
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                )}
              </div>
              <p
                className={`mt-2 text-sm font-medium ${
                  currentStep >= step.id ? "text-gray-700" : "text-gray-400"
                }`}
              >
                {step.label}
              </p>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`h-1 flex-1 mx-4 transition-all duration-300 ${
                  currentStep > step.id ? "bg-primary" : "bg-gray-300"
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
    { id: 1, name: "Topic Info", label: "Topic Info" },
    { id: 2, name: "Aayaat", label: "Aayaat" },
    { id: 3, name: "Hadith", label: "Hadith" },
    { id: 4, name: "Review", label: "Review" },
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
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} steps={steps} />

        {/* Dynamic Component Content */}
        <div className="bg-white rounded-lg shadow-sm border-2 border-blue-400 p-8">
          {renderComponent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center pt-6 mt-6 border-t">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className={`px-6 py-2 rounded-md font-medium ${
                currentStep === 1
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-300 text-gray-700 hover:bg-gray-400"
              } transition`}
            >
              Back
            </button>
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-8 py-2 bg-primary text-white rounded-md font-medium hover:bg-orange-400 transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-8 py-2 bg-primary text-white rounded-md font-medium hover:bg-orange-400 transition"
              >
                Save
              </button>
            )}
          </div>
        </div>

        {/* Success Modal */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 relative">
              <button
                onClick={() => setShowSuccess(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Topic Created Successfully!
              </h3>
              <p className="text-gray-600 mb-6">
                Total {ayaatList.length} Ayaats & {hadithList.length} Hadith
                were added.
              </p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowSuccess(false)}
                  className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition"
                >
                  Close
                </button>
                <button
                  onClick={handleAddNew}
                  className="px-6 py-2 bg-primary text-white rounded-md hover:bg-orange-400 transition"
                >
                  Add New Topic
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-center mb-8 mt-6">
        <button
          onClick={() => window.history.back()}
          className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 bg-white border-2 border-gray-300 rounded-lg hover:bg-gray-50 hover:border-primary transition-all duration-200 shadow-sm hover:shadow-md group"
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
          Back to Topics
        </button>
      </div>
    </div>
  );
}
