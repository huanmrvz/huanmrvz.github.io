import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { STORAGE_KEY, getInitialLang, translations } from "../i18n.js";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
  }, [lang]);

  const value = useMemo(() => {
    const dict = translations[lang] ?? translations.ru;
    return {
      lang,
      setLang: setLangState,
      t: (key) => dict[key] ?? key,
      tHtml: (key) => dict[key] ?? "",
    };
  }, [lang]);

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
