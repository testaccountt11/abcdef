import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslations } from '@/hooks/use-translations';
import { Menu, X, User } from 'lucide-react';
import { useState } from 'react';
import logoLight from '../img/light_version.svg';
import logoDark from '../img/dark_version.svg';
import { useTheme } from '@/contexts/ThemeContext';

export function Navbar() {
  const { t } = useTranslations();
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  const isDarkMode = theme === 'dark' || 
    (theme === 'system' && typeof window !== 'undefined' && 
     window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const logoSrc = isDarkMode ? logoDark : logoLight;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b">
      <div className="container mx-auto px-4 max-w-7xl py-4 flex justify-between items-center">
        <div 
          className="flex items-center cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <img src={logoSrc} alt="Portfol.IO" className="h-8" />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-8">
            <div 
              className="text-foreground/80 hover:text-primary transition-colors cursor-pointer relative group"
              onClick={() => navigate('/publicaboutus')}
            >
              {t('nav.about')}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </div>
            <div 
              className="text-foreground/80 hover:text-primary transition-colors cursor-pointer relative group"
              onClick={() => navigate('/publiccourses')}
            >
              {t('nav.courses')}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </div>
            <div 
              className="text-foreground/80 hover:text-primary transition-colors cursor-pointer relative group"
              onClick={() => navigate('/publicinternships')}
            >
              {t('nav.internships')}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </div>
            <div 
              className="text-foreground/80 hover:text-primary transition-colors cursor-pointer relative group"
              onClick={() => navigate('/publicmentors')}
            >
              {t('nav.mentors')}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </div>
            <div 
              className="text-foreground/80 hover:text-primary transition-colors cursor-pointer relative group"
              onClick={() => navigate('/publicstudytips')}
            >
              {t('nav.studyAdvice')}
              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Button 
              variant="ghost" 
              size="icon"
              className="hover:bg-primary/5 transition-all duration-300"
              onClick={() => navigate('/login')}
              title={t('nav.login')}
            >
              <User className="w-5 h-5 text-foreground/80 hover:text-primary transition-colors" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate('/login')}
            title={t('nav.login')}
            className="mr-2"
          >
            <User className="w-5 h-5 text-foreground/80 hover:text-primary transition-colors" />
          </Button>
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-background border-b">
          <div className="flex flex-col space-y-4 container mx-auto max-w-7xl">
            <div 
              className="text-foreground/80 hover:text-primary py-2 transition-colors cursor-pointer border-b border-border/10 pb-2"
              onClick={() => {
                navigate('/publicaboutus');
                setIsMenuOpen(false);
              }}
            >
              {t('nav.about')}
            </div>
            <div 
              className="text-foreground/80 hover:text-primary py-2 transition-colors cursor-pointer border-b border-border/10 pb-2"
              onClick={() => {
                navigate('/publiccourses');
                setIsMenuOpen(false);
              }}
            >
              {t('nav.courses')}
            </div>
            <div 
              className="text-foreground/80 hover:text-primary py-2 transition-colors cursor-pointer border-b border-border/10 pb-2"
              onClick={() => {
                navigate('/publicinternships');
                setIsMenuOpen(false);
              }}
            >
              {t('nav.internships')}
            </div>
            <div 
              className="text-foreground/80 hover:text-primary py-2 transition-colors cursor-pointer border-b border-border/10 pb-2"
              onClick={() => {
                navigate('/publicmentors');
                setIsMenuOpen(false);
              }}
            >
              {t('nav.mentors')}
            </div>
            <div 
              className="text-foreground/80 hover:text-primary py-2 transition-colors cursor-pointer border-b border-border/10 pb-2"
              onClick={() => {
                navigate('/publicstudytips');
                setIsMenuOpen(false);
              }}
            >
              {t('nav.studyAdvice')}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}