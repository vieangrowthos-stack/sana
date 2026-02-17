import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Language = "en" | "ja";

export interface BilingualText {
  en: string;
  ja: string;
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: BilingualText) => string;
  isJapanese: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "portfolio-language";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "en" || stored === "ja") return stored;
    }
    return "en";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (text: BilingualText): string => {
    return text[language] || text.en;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    isJapanese: language === "ja",
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Photography categories
export const CATEGORIES = [
  "landscape",
  "wildlife",
  "nightscene",
  "food",
  "travel",
  "portrait",
  "tuffy",
] as const;

export type Category = (typeof CATEGORIES)[number];

// Static text translations
export const translations = {
  nav: {
    home: { en: "Home", ja: "ホーム" },
    gallery: { en: "Gallery", ja: "ギャラリー" },
    about: { en: "About", ja: "について" },
    contact: { en: "Contact", ja: "お問い合わせ" },
  },
  home: {
    greeting: { 
      en: "Capturing Moments, Creating Memories", 
      ja: "瞬間を捉え、思い出を創る" 
    },
    subtitle: { 
      en: "Photography that tells stories through light and emotion", 
      ja: "光と感動で物語を紡ぐ写真" 
    },
    viewGallery: { en: "View Gallery", ja: "ギャラリーを見る" },
    featuredWork: { en: "Featured Work", ja: "注目の作品" },
    exploreAll: { en: "Explore All Photos", ja: "すべての写真を見る" },
  },
  gallery: {
    title: { en: "Gallery", ja: "ギャラリー" },
    all: { en: "All", ja: "すべて" },
    landscape: { en: "Landscape", ja: "風景" },
    wildlife: { en: "Wildlife", ja: "野生動物" },
    nightscene: { en: "Night Scene", ja: "夜景" },
    food: { en: "Food", ja: "料理" },
    travel: { en: "Travel", ja: "旅行" },
    portrait: { en: "Portrait", ja: "ポートレート" },
    tuffy: { en: "Tuffy", ja: "タフィー" },
  },
  about: {
    title: { en: "About Me", ja: "私について" },
    subtitle: {
      en: "The story behind the lens",
      ja: "レンズの向こう側の物語"
    },
  },
  contact: {
    title: { en: "Contact Me", ja: "お問い合わせ" },
    subtitle: {
      en: "Let's create something beautiful together",
      ja: "一緒に美しいものを創りましょう"
    },
    name: { en: "Name", ja: "お名前" },
    email: { en: "Email", ja: "メールアドレス" },
    message: { en: "Message", ja: "メッセージ" },
    send: { en: "Send Message", ja: "メッセージを送信" },
    sent: { en: "Message sent! I'll get back to you soon.", ja: "メッセージが送信されました！" },
  },
  footer: {
    bio: { 
      en: "A passionate photographer capturing life's beautiful moments through the lens.", 
      ja: "レンズを通して人生の美しい瞬間を捉える情熱的なフォトグラファー。" 
    },
    copyright: { en: "All rights reserved", ja: "全著作権所有" },
  },
  admin: {
    title: { en: "Admin Dashboard", ja: "管理ダッシュボード" },
    login: { en: "Login", ja: "ログイン" },
    logout: { en: "Logout", ja: "ログアウト" },
    media: { en: "Media", ja: "メディア" },
    upload: { en: "Upload", ja: "アップロード" },
  },
};
