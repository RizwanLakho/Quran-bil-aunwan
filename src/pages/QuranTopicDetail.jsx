import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import {
  ArrowLeft,
  ChevronDown,
  Play,
  Heart,
  Share2,
  Copy,
  MoreVertical,
  Volume2,
} from "lucide-react";

export default function QuranTopicDetail() {
  const { theme } = useContext(ThemeContext);
  const { subtopic } = useParams();
  const navigate = useNavigate();
  const [selectedVerse, setSelectedVerse] = useState(1);
  const [likedVerses, setLikedVerses] = useState([1]);

  const verses = [
    {
      id: 0,
      number: "2:0",
      arabic: "بِسۡمِ ٱللَّهِ ٱلرَّحۡمَـٰنِ ٱلرَّحِیمِ",
      translation: "In the name of God, the Lord of Mercy, the Giver of Mercy!",
      hideLabel: false,
    },
    {
      id: 1,
      number: "1:1",
      arabic: "الم",
      translation: "In the name of God, the Lord of Mercy, the Giver of Mercy!",
      label: "In the name of",
      hideLabel: false,
    },
  ];

  const toggleLike = (verseId) => {
    if (likedVerses.includes(verseId)) {
      setLikedVerses(likedVerses.filter((id) => id !== verseId));
    } else {
      setLikedVerses([...likedVerses, verseId]);
    }
  };

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-orange-50"
      }`}
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center hover:bg-orange-100 transition-colors"
            >
              <ArrowLeft className="text-primary" size={20} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold text-gray-800 capitalize">
                  {subtopic ? subtopic.replace(/-/g, " ") : "Unknown Topic"}
                </h1>
                <ChevronDown className="text-primary" size={20} />
              </div>
              <p className="text-sm text-gray-500">
                Toheed | 7 Ayats | 8 Ahadith
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Verses */}
      <div className="max-w-4xl mx-auto space-y-4">
        {verses.map((verse) => (
          <div
            key={verse.id}
            className={`rounded-2xl p-6 transition-all ${
              selectedVerse === verse.id
                ? "bg-white border-2 border-primary shadow-lg"
                : "bg-white border-2 border-transparent shadow-sm hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-primary font-medium">{verse.number}</span>
              {verse.label && !verse.hideLabel && (
                <div className="flex items-center gap-2 bg-primary text-white px-3 py-1 rounded-full text-sm">
                  <span>{verse.label}</span>
                  <Volume2 size={16} />
                </div>
              )}
            </div>

            <div className="text-right mb-4">
              <p className="text-2xl md:text-3xl leading-loose">
                {verse.arabic}
              </p>
            </div>

            <div className="border-t pt-4">
              <p className="text-gray-700 text-base leading-relaxed">
                {verse.translation}
              </p>
            </div>

            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
              <button
                onClick={() => setSelectedVerse(verse.id)}
                className={`p-2 rounded-lg transition-colors ${
                  selectedVerse === verse.id
                    ? "text-primary"
                    : "text-gray-400 hover:text-primary"
                }`}
              >
                <Play
                  size={20}
                  fill={selectedVerse === verse.id ? "currentColor" : "none"}
                />
              </button>
              <button
                onClick={() => toggleLike(verse.id)}
                className={`p-2 rounded-lg transition-colors ${
                  likedVerses.includes(verse.id)
                    ? "text-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              >
                <Heart
                  size={20}
                  fill={
                    likedVerses.includes(verse.id) ? "currentColor" : "none"
                  }
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
