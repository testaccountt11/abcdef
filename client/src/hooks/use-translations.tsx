import { useTheme } from '@/contexts/ThemeContext';
import { getTranslation } from '@/lib/translations';

export function useTranslations() {
  const { language } = useTheme();
  
  const t = (key: string) => {
    return getTranslation(key as any, language);
  };
  
  return { t, language };
}