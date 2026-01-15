import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../context/ThemeContext";

export default function ContactUs() {
  const { theme } = useContext(ThemeContext);
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ur";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div
      className={`p-6 md:p-10 ${
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
            Contact Us
          </h1>
          <div
            className={`h-1 w-20 rounded ${
              theme === "dark" ? "bg-orange-500" : "bg-orange-600"
            }`}
          ></div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
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
                Get in Touch
              </h2>
              <p
                className={`mb-6 leading-relaxed ${
                  theme === "dark" ? "text-gray-300" : "text-gray-700"
                }`}
              >
                We'd love to hear from you! Whether you have questions,
                suggestions, or feedback, feel free to reach out to us.
              </p>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <div
                    className={`${isRTL ? "ml-4" : "mr-4"} flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === "dark" ? "bg-gray-700" : "bg-orange-100"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        theme === "dark" ? "text-orange-400" : "text-orange-600"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className={`font-semibold mb-1 ${
                        theme === "dark" ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      Email
                    </h3>
                    <p
                      className={`${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      info@quranbilunwan.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`${isRTL ? "ml-4" : "mr-4"} flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === "dark" ? "bg-gray-700" : "bg-orange-100"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        theme === "dark" ? "text-orange-400" : "text-orange-600"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className={`font-semibold mb-1 ${
                        theme === "dark" ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      Location
                    </h3>
                    <p
                      className={`${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Abbottabad, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div
                    className={`${isRTL ? "ml-4" : "mr-4"} flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      theme === "dark" ? "bg-gray-700" : "bg-orange-100"
                    }`}
                  >
                    <svg
                      className={`w-5 h-5 ${
                        theme === "dark" ? "text-orange-400" : "text-orange-600"
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3
                      className={`font-semibold mb-1 ${
                        theme === "dark" ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      Support Hours
                    </h3>
                    <p
                      className={`${
                        theme === "dark" ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      24/7 Online Support
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Contact Form */}
          <div>
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
                Send us a Message
              </h2>

              {submitted ? (
                <div
                  className={`p-4 rounded-lg text-center ${
                    theme === "dark"
                      ? "bg-green-900 text-green-200"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  <p className="font-semibold">Thank you for your message!</p>
                  <p className="text-sm mt-1">
                    We'll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className={`block mb-2 text-sm font-medium ${
                        theme === "dark" ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600 text-white focus:border-orange-500"
                          : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                      } focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className={`block mb-2 text-sm font-medium ${
                        theme === "dark" ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600 text-white focus:border-orange-500"
                          : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                      } focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className={`block mb-2 text-sm font-medium ${
                        theme === "dark" ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600 text-white focus:border-orange-500"
                          : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                      } focus:outline-none focus:ring-2 focus:ring-orange-500/20`}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className={`block mb-2 text-sm font-medium ${
                        theme === "dark" ? "text-gray-200" : "text-gray-900"
                      }`}
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className={`w-full px-4 py-2 rounded-lg border ${
                        theme === "dark"
                          ? "bg-gray-700 border-gray-600 text-white focus:border-orange-500"
                          : "bg-white border-gray-300 text-gray-900 focus:border-orange-500"
                      } focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      theme === "dark"
                        ? "bg-orange-600 hover:bg-orange-700 text-white"
                        : "bg-orange-600 hover:bg-orange-700 text-white"
                    }`}
                  >
                    Send Message
                  </button>
                </form>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
