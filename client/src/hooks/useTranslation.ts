import { useContext } from 'react';
import { getTranslation, Language, TranslationKey } from '@/lib/translations';
import { LanguageContext } from '@/contexts/LanguageContext';

export function useTranslation() {
  const { language } = useContext(LanguageContext);
  
  return (key: TranslationKey) => getTranslation(key, language as Language);
} 