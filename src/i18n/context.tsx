"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { en } from "./en";
import { am } from "./am";

type Language = "en" | "am";
type Translations = typeof en;

interface I18nContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: keyof Translations) => string;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  // Default to Amharic as requested
  const [lang, setLang] = useState<Language>("am");

  const t = (key: keyof Translations): string => {
    const translations = lang === "am" ? am : en;
    return translations[key] || en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (context === undefined) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
