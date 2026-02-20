"use client";

import { supabase } from "@/lib/supabase";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const LanguageContext = createContext<{ selected: string; chooseLanguage: (lang: string) => Promise<void> }>({
  selected: "en",
  chooseLanguage: async () => undefined
});

const languages = [
  { code: "en", greeting: "Hello", label: "English" },
  { code: "hi", greeting: "नमस्ते", label: "हिंदी" },
  { code: "te", greeting: "నమస్కారం", label: "తెలుగు" }
];

export function LanguageProvider({ children }: { children: ReactNode }) {
  const { i18n } = useTranslation();
  const [selected, setSelected] = useState("en");
  const [showPicker, setShowPicker] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("language") || "en";
    setSelected(saved);
    i18n.changeLanguage(saved);
    setShowPicker(!localStorage.getItem("language"));
  }, [i18n]);

  const chooseLanguage = async (lang: string) => {
    localStorage.setItem("language", lang);
    setSelected(lang);
    await i18n.changeLanguage(lang);
    setShowPicker(false);

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.from("users").update({ language: lang }).eq("id", user.id);
    }
  };

  return (
    <LanguageContext.Provider value={{ selected, chooseLanguage }}>
      {showPicker ? (
        <div className="gradient-bg fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 bg-slate-950 p-8">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => chooseLanguage(lang.code)}
              className="w-full max-w-lg rounded-2xl border border-slate-700 bg-slate-900/80 p-8 text-left transition hover:-translate-y-1 hover:border-teal-300"
            >
              <p className="text-3xl font-bold">{lang.greeting}</p>
              <p className="mt-2 text-lg text-slate-300">{lang.label}</p>
            </button>
          ))}
        </div>
      ) : (
        children
      )}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
