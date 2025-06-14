import { useContext } from 'react';
import { LanguageContext } from '@/contexts/LanguageContext';
import type { Language } from '@/lib/translations';

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export type { Language }; 