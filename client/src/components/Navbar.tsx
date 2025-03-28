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
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="relative group">
            <span className="font-bold text-2xl md:text-3xl text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-400 hover:to-cyan-500 transition-all duration-300 flex items-center">
              <svg 
                className="w-8 h-8 md:w-10 md:h-10 mr-2" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="url(#logoGradient)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
                <path d="M22 9a4 4 0 0 1-4 4h-1a4 4 0 0 1-4 4H4a2 2 0 0 1-2-2V5c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v4z" />
                <path d="M16 7h.01" />
                <path d="M12 7h.01" />
                <path d="M8 7h.01" />
              </svg>
              Portfol<span className="text-primary font-extrabold">.IO</span>
            </span>
            <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </div>
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