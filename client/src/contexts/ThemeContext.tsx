import React, { createContext, useContext, useEffect, useState } from 'react';
import { type Language } from '@/lib/translations';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (language: Language) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check for saved theme in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    
    // Check for system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });
  
  const [language, setLanguage] = useState<Language>(() => {
    // Check for saved language in localStorage
    const savedLanguage = localStorage.getItem('language') as Language | null;
    if (savedLanguage && ['en', 'ru', 'kz'].includes(savedLanguage)) {
      return savedLanguage;
    }
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (browserLang === 'ru' || browserLang === 'kz') {
      return browserLang as Language;
    }
    
    return 'en';
  });

  // Apply theme class to document root
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('gradient-bg-dark');
      document.body.classList.remove('gradient-bg-light');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('gradient-bg-dark');
      document.body.classList.add('gradient-bg-light');
    }
  }, [theme]);
  
  // Save language preference
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, language, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}