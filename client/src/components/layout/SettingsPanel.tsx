import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { getTranslation, Language } from "@/lib/translations";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function SettingsPanel() {
  const { theme, toggleTheme, language, setLanguage } = useTheme();
  
  // Function to get translated text
  const t = (key: string) => getTranslation(key as any, language);
  
  // Languages with their display names
  const languages: [Language, string][] = [
    ['en', 'English'],
    ['ru', 'Русский'],
    ['kz', 'Қазақша']
  ];

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {language === 'en' ? 'Theme' : language === 'ru' ? 'Тема' : 'Тақырып'}
          </span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={toggleTheme}
                  className="h-8 w-8"
                >
                  {theme === 'dark' ? (
                    <Sun className="h-4 w-4" />
                  ) : (
                    <Moon className="h-4 w-4" />
                  )}
                  <span className="sr-only">
                    {theme === 'dark' ? 'Light mode' : 'Dark mode'}
                  </span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{theme === 'dark' ? 
                  (language === 'en' ? 'Switch to light mode' : language === 'ru' ? 'Переключить на светлую тему' : 'Жарық режимге ауысу') : 
                  (language === 'en' ? 'Switch to dark mode' : language === 'ru' ? 'Переключить на темную тему' : 'Қараңғы режимге ауысу')
                }</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <div className="flex flex-col space-y-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {language === 'en' ? 'Language' : language === 'ru' ? 'Язык' : 'Тіл'}
          </span>
          <div className="flex flex-wrap gap-2">
            {languages.map(([lang, label]) => (
              <Button
                key={lang}
                variant={language === lang ? "default" : "outline"}
                className="px-3 py-1 h-8 text-xs"
                onClick={() => setLanguage(lang)}
              >
                {label}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}