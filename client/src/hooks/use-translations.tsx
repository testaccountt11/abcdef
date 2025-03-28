import { useTheme } from '@/contexts/ThemeContext';
import { getTranslation, type TranslationKey } from '@/lib/translations';

export function useTranslations() {
  const { language } = useTheme();
  
  const t = (key: TranslationKey) => {
    return getTranslation(key, language);
  };
  
  return { t };
}