import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslations } from '@/hooks/use-translations';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { t } = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <span className="font-bold text-xl text-gradient">Portfol.IO</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <div 
              className="text-foreground/80 hover:text-primary transition-colors cursor-pointer"
              onClick={() => navigate('/#about')}
            >
              {t('nav.about')}
            </div>
            <div 
              className="text-foreground/80 hover:text-primary transition-colors cursor-pointer"
              onClick={() => navigate('/courses')}
            >
              {t('nav.courses')}
            </div>
            <div 
              className="text-foreground/80 hover:text-primary transition-colors cursor-pointer"
              onClick={() => navigate('/opportunities')}
            >
              {t('nav.internships')}
            </div>
            <div 
              className="text-foreground/80 hover:text-primary transition-colors cursor-pointer"
              onClick={() => navigate('/mentors')}
            >
              {t('nav.mentors')}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Button 
              variant="outline" 
              className="ml-2"
              onClick={() => navigate('/login')}
            >
              {t('nav.login')}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeSwitcher />
          <LanguageSwitcher />
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden px-4 py-4 bg-background border-b">
          <div className="flex flex-col space-y-4">
            <div 
              className="text-foreground/80 hover:text-primary py-2 transition-colors cursor-pointer"
              onClick={() => {
                navigate('/#about');
                setIsMenuOpen(false);
              }}
            >
              {t('nav.about')}
            </div>
            <div 
              className="text-foreground/80 hover:text-primary py-2 transition-colors cursor-pointer"
              onClick={() => {
                navigate('/courses');
                setIsMenuOpen(false);
              }}
            >
              {t('nav.courses')}
            </div>
            <div 
              className="text-foreground/80 hover:text-primary py-2 transition-colors cursor-pointer"
              onClick={() => {
                navigate('/opportunities');
                setIsMenuOpen(false);
              }}
            >
              {t('nav.internships')}
            </div>
            <div 
              className="text-foreground/80 hover:text-primary py-2 transition-colors cursor-pointer"
              onClick={() => {
                navigate('/mentors');
                setIsMenuOpen(false);
              }}
            >
              {t('nav.mentors')}
            </div>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => {
                navigate('/login');
                setIsMenuOpen(false);
              }}
            >
              {t('nav.login')}
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}