import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '@/lib/translations';

interface ThemeContextProps {
  theme: 'light' | 'dark' | 'system';
  language: Language;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: Language) => void;
}

const defaultThemeContext: ThemeContextProps = {
  theme: 'system',
  language: 'en',
  setTheme: () => {},
  setLanguage: () => {},
};

const ThemeContext = createContext<ThemeContextProps>(defaultThemeContext);

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize theme from localStorage or default to 'system'
  const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(
    () => (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system'
  );
  
  // Initialize language from localStorage or default to 'en'
  const [language, setLanguageState] = useState<Language>(
    () => (localStorage.getItem('language') as Language) || 'en'
  );

  // Effect for updating theme class on document
  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove any existing theme classes
    root.classList.remove('light', 'dark');
    
    // Apply theme based on user preference or system
    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    
    // Store theme preference in localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // Effect for updating language
  useEffect(() => {
    // Store language preference in localStorage
    localStorage.setItem('language', language);
    
    // You can also update the document lang attribute
    document.documentElement.lang = language;
  }, [language]);

  // Handle system theme change
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mediaQuery.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
    setThemeState(newTheme);
  };
  
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  return (
    <ThemeContext.Provider value={{ theme, language, setTheme, setLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
};