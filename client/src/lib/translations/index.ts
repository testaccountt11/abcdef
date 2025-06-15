import { TranslationKey, Language } from './types';
import { enTranslations } from './en';
import { ruTranslations } from './ru';
import { kzTranslations } from './kz';

export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: enTranslations,
  ru: ruTranslations,
  kz: kzTranslations,
};

export function getTranslation(key: TranslationKey, language: Language): string {
  return translations[language][key] || translations.en[key] || key;
}

export type { TranslationKey, Language }; 