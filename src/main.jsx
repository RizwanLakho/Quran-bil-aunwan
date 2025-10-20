import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { FontProvider } from "./context/FontContext";
import { TranslationProvider } from "./context/TranslationContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

import "./i18n";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <FontProvider>
        <TranslationProvider>
          <BrowserRouter>
            <AuthProvider>
              <App />
            </AuthProvider>
          </BrowserRouter>
        </TranslationProvider>
      </FontProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
