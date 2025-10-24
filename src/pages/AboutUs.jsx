import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";

export default function AboutUs() {
  const { theme } = useContext(ThemeContext);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ur";

  return (
    <div
      className={`min-h-full p-6 md:p-10 ${
        theme === "dark" ? "bg-gray-900" : "bg-orange-50"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1
            className={`text-4xl font-bold mb-3 ${
              theme === "dark" ? "text-white" : "text-gray-900"
            }`}
          >
            About Us
          </h1>
          <div
            className={`h-1 w-20 rounded ${
              theme === "dark" ? "bg-orange-500" : "bg-orange-600"
            }`}
          ></div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {/* Mission Section */}
          <section
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                theme === "dark" ? "text-orange-400" : "text-orange-700"
              }`}
            >
              Our Mission
            </h2>
            <p
              className={`leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              Quran Bil Unwan is dedicated to making the Holy Quran accessible
              and understandable for everyone. We strive to provide a seamless
              digital experience that helps readers explore, understand, and
              connect with the divine words of Allah through organized topics
              and easy navigation.
            </p>
          </section>

          {/* Vision Section */}
          <section
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                theme === "dark" ? "text-orange-400" : "text-orange-700"
              }`}
            >
              Our Vision
            </h2>
            <p
              className={`leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              To become the leading platform for thematic Quranic study,
              enabling Muslims worldwide to discover and reflect upon the
              teachings of the Quran organized by topics and themes. We envision
              a world where every Muslim can easily access and comprehend the
              guidance within the Holy Quran.
            </p>
          </section>

          {/* Features Section */}
          <section
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                theme === "dark" ? "text-orange-400" : "text-orange-700"
              }`}
            >
              What We Offer
            </h2>
            <ul className="space-y-3">
              {[
                "Topic-based Quran exploration",
                "Multiple language support including Arabic and Urdu",
                "Easy-to-use interface with dark mode support",
                "Organized chapters and verses by themes",
                "Bookmarking and note-taking features",
                "Responsive design for all devices",
              ].map((feature, index) => (
                <li
                  key={index}
                  className={`flex items-start ${
                    theme === "dark" ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  <span
                    className={`${
                      isRTL ? "ml-3" : "mr-3"
                    } mt-1 flex-shrink-0 w-2 h-2 rounded-full ${
                      theme === "dark" ? "bg-orange-500" : "bg-orange-600"
                    }`}
                  ></span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Team Section */}
          <section
            className={`p-6 rounded-lg shadow-md ${
              theme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <h2
              className={`text-2xl font-semibold mb-4 ${
                theme === "dark" ? "text-orange-400" : "text-orange-700"
              }`}
            >
              Our Commitment
            </h2>
            <p
              className={`leading-relaxed ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              We are committed to maintaining the highest standards of accuracy
              and respect for the Holy Quran. Our team works diligently to
              ensure that all content is properly verified and presented in a
              manner that honors the sacred nature of the Quran. We continuously
              improve our platform based on user feedback and Islamic scholarly
              guidance.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
