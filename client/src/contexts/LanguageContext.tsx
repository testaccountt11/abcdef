import { createContext, useState, useEffect, ReactNode } from 'react';
import type { Language } from '@/lib/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<Language>(() => {
    // Try to get the language from localStorage, fallback to browser language or 'en'
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage) return savedLanguage;

    const browserLang = navigator.language.split('-')[0];
    return (browserLang === 'ru' || browserLang === 'kz') ? browserLang as Language : 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
} 