import { useTheme } from "@/contexts/ThemeContext";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Globe } from "lucide-react";
import { getTranslation, Language } from "@/lib/translations";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function SettingsPanel() {
  const { theme, setTheme, language, setLanguage } = useTheme();
  
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
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
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
        
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {language === 'en' ? 'Language' : language === 'ru' ? 'Язык' : 'Тіл'}
          </span>
          <DropdownMenu>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                    >
                      <Globe className="h-4 w-4" />
                      <span className="sr-only">
                        {language === 'en' ? 'Change language' : language === 'ru' ? 'Сменить язык' : 'Тілді өзгерту'}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{language === 'en' ? 'Change language' : language === 'ru' ? 'Сменить язык' : 'Тілді өзгерту'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <DropdownMenuContent align="end">
              {languages.map(([lang, label]) => (
                <DropdownMenuItem
                  key={lang}
                  className={`cursor-pointer ${language === lang ? 'font-bold' : ''}`}
                  onClick={() => setLanguage(lang)}
                >
                  {label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}