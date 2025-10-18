import React, { useState, useContext } from "react";
import { BookOpen, Play, ChevronDown } from "lucide-react";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { TranslationContext } from "../context/TranslationContext";

export default function QuranReadingPage() {
  const { quranFont, arabicSize, translatorSize } = useContext(FontContext);
  const { theme } = useContext(ThemeContext);
  const { translator, reciter } = useContext(TranslationContext); // ✅ Add this

  const [selectedSurah, setSelectedSurah] = useState("2. Al-Baqarah");
  const [selectedAyah, setSelectedAyah] = useState("Ayah 4");

  // Get the font class based on selected font
  const getFontClass = () => {
    switch (quranFont) {
      case "Uthmani":
        return "font-uthmani";
      case "IndoPak":
        return "font-indopak";
      case "Tajweed":
        return "font-tajweed";
      default:
        return "font-indopak";
    }
  };

  // ✅ Get translation text based on translator
  const getTranslation = () => {
    const translations = {
      "Dr. Mustafa Khattab":
        "Alif-Lãm-Mĩm. This is the Book! There is no doubt about it—a guide for those mindful ˹of Allah˺, who believe in the unseen, establish prayer, and donate from what We have provided for them, and who believe in what has been revealed to you ˹O Prophet˺ and what was revealed before you, and have sure faith in the Hereafter.",
      "Sahih International":
        "Alif, Lam, Meem. This is the Book about which there is no doubt, a guidance for those conscious of Allah - Who believe in the unseen, establish prayer, and spend out of what We have provided for them, And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain [in faith].",
      Pickthall:
        "Alif. Lam. Mim. This is the Scripture whereof there is no doubt, a guidance unto those who ward off (evil). Who believe in the Unseen, and establish worship, and spend of that We have bestowed upon them; And who believe in that which is revealed unto thee (Muhammad) and that which was revealed before thee, and are certain of the Hereafter.",
      "Yusuf Ali":
        "A.L.M. This is the Book; in it is guidance sure, without doubt, to those who fear Allah; Who believe in the Unseen, are steadfast in prayer, and spend out of what We have provided for them; And who believe in the Revelation sent to thee, and sent before thy time, and (in their hearts) have the assurance of the Hereafter.",
    };

    return translations[translator] || translations["Dr. Mustafa Khattab"];
  };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-orange-50"
      }`}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Motivational Card */}
        <div className="relative bg-gradient-to-r from-orange-400 to-orange-500 rounded-3xl p-8 shadow-lg overflow-hidden">
          <div className="absolute top-4 right-8 text-orange-300 opacity-40 text-6xl font-serif">
            "
          </div>

          <h2 className="text-white text-2xl font-bold mb-4">Motivasi</h2>

          <p className="text-white text-lg leading-relaxed mb-4">
            Sebaik - baik manusia diantara kamu adalah yang mempelajari Al-Quran
            dan mengajarkannya
          </p>

          <p className="text-white text-lg leading-relaxed">
            The best among you are those who learn the Quran and teach it
            <span className="block mt-1">(HR Bukhori)</span>
          </p>

          <div className="absolute bottom-0 right-0 opacity-10">
            <svg width="200" height="150" viewBox="0 0 200 150" fill="none">
              <path
                d="M150 50C150 77.614 127.614 100 100 100C72.386 100 50 77.614 50 50"
                stroke="white"
                strokeWidth="3"
              />
              <path
                d="M180 80C180 107.614 157.614 130 130 130C102.386 130 80 107.614 80 80"
                stroke="white"
                strokeWidth="3"
              />
            </svg>
          </div>
        </div>

        {/* Reading Card */}
        <div
          className={`rounded-3xl p-8 shadow-lg transition-colors duration-300 ${
            theme === "dark" ? "bg-gray-800" : "bg-white"
          }`}
        >
          {/* Dropdowns */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            {/* Surah Selector */}
            <div className="relative">
              <select
                value={selectedSurah}
                onChange={(e) => setSelectedSurah(e.target.value)}
                className={`appearance-none border-2 rounded-xl px-6 py-3 pr-12 font-medium focus:outline-none focus:border-orange-400 cursor-pointer transition-colors ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                <option>1. Al-Fatihah</option>
                <option>2. Al-Baqarah</option>
                <option>3. Ali 'Imran</option>
                <option>4. An-Nisa</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                size={20}
              />
            </div>

            {/* Surah Title */}
            <div className="text-center">
              <h3 className="text-orange-500 text-2xl font-bold">Al-Baqarah</h3>
              <p
                className={theme === "dark" ? "text-gray-400" : "text-gray-500"}
              >
                The Cow
              </p>
            </div>

            {/* Ayah Selector */}
            <div className="relative">
              <select
                value={selectedAyah}
                onChange={(e) => setSelectedAyah(e.target.value)}
                className={`appearance-none border-2 rounded-xl px-6 py-3 pr-12 font-medium focus:outline-none focus:border-orange-400 cursor-pointer transition-colors ${
                  theme === "dark"
                    ? "bg-gray-700 border-gray-600 text-white"
                    : "bg-white border-gray-200 text-gray-700"
                }`}
              >
                <option>Ayah 1</option>
                <option>Ayah 2</option>
                <option>Ayah 3</option>
                <option>Ayah 4</option>
                <option>Ayah 5</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                size={20}
              />
            </div>
          </div>

          {/* Bismillah */}
          <div className="text-center mb-8">
            <p
              className={`${getFontClass()} ${
                theme === "dark" ? "text-orange-400" : "text-orange-500"
              }`}
              style={{ fontSize: `${arabicSize + 8}px` }}
            >
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
          </div>

          {/* Arabic Text */}
          <div className="text-right leading-loose mb-8 space-y-6">
            <p
              className={`${getFontClass()} ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
              style={{ fontSize: `${arabicSize}px`, lineHeight: "2" }}
            >
              الم ۝ ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى
              لِّلْمُتَّقِينَ ۝ الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ
              الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنفِقُونَ ۝ وَالَّذِينَ
              يُؤْمِنُونَ بِمَا أُنزِلَ إِلَيْكَ وَمَا أُنزِلَ مِن قَبْلِكَ
              وَبِالْآخِرَةِ هُمْ يُوقِنُونَ ۝ أُولَٰئِكَ عَلَىٰ هُدًى مِّن
              رَّبِّهِمْ ۖ وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ ۝
            </p>
            <p
              className={`${getFontClass()} ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
              style={{ fontSize: `${arabicSize}px`, lineHeight: "2" }}
            >
              إِنَّ الَّذِينَ كَفَرُوا سَوَاءٌ عَلَيْهِمْ أَأَنذَرْتَهُمْ أَمْ
              لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ ۝ خَتَمَ اللَّهُ عَلَىٰ
              قُلُوبِهِمْ وَعَلَىٰ سَمْعِهِمْ ۖ وَعَلَىٰ أَبْصَارِهِمْ غِشَاوَةٌ
              ۖ وَلَهُمْ عَذَابٌ عَظِيمٌ ۝ وَمِنَ النَّاسِ مَن يَقُولُ آمَنَّا
              بِاللَّهِ وَبِالْيَوْمِ الْآخِرِ وَمَا هُم بِمُؤْمِنِينَ ۝
            </p>
            <p
              className={`${getFontClass()} ${
                theme === "dark" ? "text-gray-200" : "text-gray-800"
              }`}
              style={{ fontSize: `${arabicSize}px`, lineHeight: "2" }}
            >
              يُخَادِعُونَ اللَّهَ وَالَّذِينَ آمَنُوا وَمَا يَخْدَعُونَ إِلَّا
              أَنفُسَهُمْ وَمَا يَشْعُرُونَ ۝ فِي قُلُوبِهِم مَّرَضٌ فَزَادَهُمُ
              اللَّهُ مَرَضًا ۖ وَلَهُمْ عَذَابٌ أَلِيمٌ بِمَا كَانُوا
              يَكْذِبُونَ ۝
            </p>
          </div>

          {/* Translation Section */}
          <div
            className={`mb-8 p-6 rounded-xl ${
              theme === "dark" ? "bg-gray-700/50" : "bg-gray-50"
            }`}
          >
            <h4
              className={`font-bold mb-3 ${
                theme === "dark" ? "text-orange-400" : "text-orange-600"
              }`}
            >
              Translation by {translator}
            </h4>
            <p
              className={`leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
              style={{ fontSize: `${translatorSize}px` }}
            >
              {getTranslation()}
            </p>
          </div>

          {/* Divider */}
          <div
            className={`border-t mb-8 ${
              theme === "dark" ? "border-gray-700" : "border-gray-200"
            }`}
          ></div>

          {/* Bottom Controls */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            {/* Continue Reading Button */}
            <button className="flex items-center gap-3 bg-orange-400 hover:bg-orange-500 text-white font-medium px-8 py-4 rounded-xl transition-colors shadow-md">
              <BookOpen size={20} />
              <span>Continue Reading</span>
            </button>

            {/* Audio Controls */}
            <div className="flex items-center gap-4">
              {/* Reciter Selector - Now uses context */}
              <div className="relative">
                <select
                  value={reciter}
                  disabled
                  className={`appearance-none border-2 rounded-xl px-6 py-3 pr-12 font-medium focus:outline-none cursor-not-allowed transition-colors ${
                    theme === "dark"
                      ? "bg-gray-700 border-gray-600 text-white opacity-75"
                      : "bg-white border-gray-200 text-gray-700 opacity-75"
                  }`}
                >
                  <option>{reciter}</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400"
                  size={20}
                />
                <div
                  className={`absolute -bottom-6 left-0 text-xs ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"
                  }`}
                >
                  Change in Settings
                </div>
              </div>

              {/* Play Button */}
              <button className="bg-orange-400 hover:bg-orange-500 text-white p-4 rounded-full transition-colors shadow-md">
                <Play size={24} fill="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
