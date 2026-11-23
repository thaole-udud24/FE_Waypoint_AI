import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "vi" | "en" | "ja";

export const LANG_LABEL: Record<Lang, string> = { vi: "VI", en: "EN", ja: "日本語" };

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("waypoint-lang") as Lang) || "vi");

  useEffect(() => {
    localStorage.setItem("waypoint-lang", lang);
  }, [lang]);

  return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}

/** Tra một bản dịch theo ngôn ngữ hiện tại, rơi về tiếng Việt nếu thiếu. */
export function pick<T extends Partial<Record<Lang, string>>>(dict: T, lang: Lang, fallback: string): string {
  return dict[lang] ?? dict.vi ?? fallback;
}
