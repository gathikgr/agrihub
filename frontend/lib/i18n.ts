"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/translations/en.json";
import hi from "@/translations/hi.json";
import te from "@/translations/te.json";

const resources = {
  en: { translation: en },
  hi: { translation: hi },
  te: { translation: te }
};

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: { escapeValue: false }
  });
}

export default i18n;
