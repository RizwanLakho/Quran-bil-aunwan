import { React, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { FontContext } from "../context/FontContext";
import { TranslationContext } from "../context/TranslationContext";

export default function QuranTopics() {
  const { theme } = useContext(ThemeContext);

  const topicCards = [
    {
      title: "ALLAH",
      description: "Short Description......",
      ayaat: "34 Aayaat",
      ahadith: "20 Ahadith",
    },
    // Additional cards will be empty placeholders
    ...Array(11).fill({ empty: true }),
  ];

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-orange-50"
      }`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl">
        {topicCards.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6 h-48 flex flex-col justify-between cursor-pointer"
          >
            {!card.empty ? (
              <>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {card.title}
                  </h3>
                  <p className="text-gray-500 text-sm">{card.description}</p>
                  <p className="text-gray-400 text-xs mt-1">.....</p>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span>{card.ayaat}</span>
                  <span className="text-gray-300">|</span>
                  <span>{card.ahadith}</span>
                </div>
              </>
            ) : (
              <div className="w-full h-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
