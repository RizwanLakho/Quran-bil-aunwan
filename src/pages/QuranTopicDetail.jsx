import React, { useState } from "react";
import {
  ChevronLeft,
  Play,
  Heart,
  Share2,
  Bookmark,
  MoreVertical,
  Volume2,
} from "lucide-react";

export default function QuranTopicDetail() {
  const [selectedVerse, setSelectedVerse] = useState(1);
  const [likedVerses, setLikedVerses] = useState(new Set());
  const [isPlaying, setIsPlaying] = useState(false);

  const surahData = {
    name: "Allah",
    arabicName: "الله",
    chapter: "Toheed",
    totalAyats: 7,
    meaning: "8 Ahadith",
  };

  const verses = [
    {
      id: 1,
      number: "2:0",
      arabic: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
      english: "In the name of God, the Lord of Mercy, the Giver of Mercy!",
      audioLabel: null,
    },
    {
      id: 2,
      number: "1:1",
      arabic: "الْحَمْدُ لِلَّهِ",
      english: "In the name of God, the Lord of Mercy, the Giver of Mercy!",
      audioLabel: "In the name of",
    },
    {
      id: 3,
      number: "2:2",
      arabic: "ذَٰلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِلْمُتَّقِينَ",
      english: "In the name of God, the Lord of Mercy, the Giver of Mercy!",
      audioLabel: null,
    },
    {
      id: 4,
      number: "2:3",
      arabic:
        "الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَاةَ وَمِمَّا رَزَقْنَاهُمْ يُنْفِقُونَ",
      english: "In the name of God, the Lord of Mercy, the Giver of Mercy!",
      audioLabel: null,
    },
    {
      id: 5,
      number: "2:4",
      arabic:
        "وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنْزِلَ إِلَيْكَ وَمَا أُنْزِلَ مِنْ قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ",
      english: "In the name of God, the Lord of Mercy, the Giver of Mercy!",
      audioLabel: null,
    },
  ];

  const toggleLike = (verseId) => {
    const newLiked = new Set(likedVerses);
    if (newLiked.has(verseId)) {
      newLiked.delete(verseId);
    } else {
      newLiked.add(verseId);
    }
    setLikedVerses(newLiked);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full border border-orange-400 text-orange-500 hover:bg-orange-50">
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <h1 className="text-xl font-medium">{surahData.name}</h1>
                <button className="text-orange-500">
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </button>
              </div>

              <div className="text-sm text-gray-500">
                <span>{surahData.chapter}</span>
                <span className="mx-2">|</span>
                <span>{surahData.totalAyats} Ayats</span>
                <span className="mx-2">|</span>
                <span>{surahData.meaning}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePlayPause}
                className="px-6 py-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white rounded-full flex items-center gap-2 hover:from-orange-500 hover:to-orange-600 transition-all"
              >
                <Play className="w-4 h-4" fill="white" />
                <span>Play Now</span>
              </button>

              <button className="px-4 py-2 border border-gray-300 rounded-full text-orange-500 hover:bg-gray-50 flex items-center gap-2">
                <span>Verse 2</span>
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Verses */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
        {verses.map((verse) => (
          <div
            key={verse.id}
            className={`bg-white rounded-lg shadow-sm border ${
              verse.id === 2 ? "border-orange-300" : "border-gray-200"
            } hover:shadow-md transition-shadow`}
          >
            {/* Audio Label for specific verses */}
            {verse.audioLabel && (
              <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white px-4 py-2 rounded-t-lg flex items-center justify-end gap-2">
                <span className="text-sm">{verse.audioLabel}</span>
                <Volume2 className="w-4 h-4" />
              </div>
            )}

            <div className="p-6">
              {/* Verse Number */}
              <div className="flex items-center gap-2 mb-4">
                <span className="text-orange-500 font-medium">
                  {verse.number}
                </span>
              </div>

              {/* Arabic Text */}
              <div className="text-right mb-4">
                <p
                  className="text-2xl leading-loose"
                  style={{ fontFamily: "indopak, sans-serif" }}
                >
                  {verse.arabic}
                </p>
              </div>

              {/* English Translation */}
              <div className="mb-4">
                <p className="text-gray-700">{verse.english}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  <Play className="w-5 h-5 text-gray-500" />
                </button>

                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => toggleLike(verse.id)}
                >
                  <Heart
                    className={`w-5 h-5 ${likedVerses.has(verse.id) ? "text-red-500 fill-red-500" : "text-gray-500"}`}
                  />
                </button>

                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Share2 className="w-5 h-5 text-gray-500" />
                </button>

                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bookmark className="w-5 h-5 text-gray-500" />
                </button>

                <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
