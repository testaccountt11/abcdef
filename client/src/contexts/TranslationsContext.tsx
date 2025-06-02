import React, { createContext, useContext, useState } from 'react';

interface TranslationsContextType {
  t: (key: string) => string;
  locale: string;
  setLocale: (locale: string) => void;
}

const TranslationsContext = createContext<TranslationsContextType>({
  t: (key: string) => key,
  locale: 'en',
  setLocale: () => {},
});

export const TranslationsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState('en');

  const t = (key: string) => {
    // In a real app, this would look up translations based on the key and locale
    return key;
  };

  return (
    <TranslationsContext.Provider value={{ t, locale, setLocale }}>
      {children}
    </TranslationsContext.Provider>
  );
};

export const useTranslations = () => useContext(TranslationsContext); 