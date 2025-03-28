import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslations } from '@/hooks/use-translations';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Navbar() {
  const { t } = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <span className="font-bold text-xl text-gradient">Portfol.IO</span>
          </a>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6">
            <Link href="/#about">
              <a className="text-foreground/80 hover:text-primary transition-colors">
                {t('nav.about')}
              </a>
            </Link>
            <Link href="/courses">
              <a className="text-foreground/80 hover:text-primary transition-colors">
                {t('nav.courses')}
              </a>
            </Link>
            <Link href="/opportunities">
              <a className="text-foreground/80 hover:text-primary transition-colors">
                {t('nav.internships')}
              </a>
            </Link>
            <Link href="/mentors">
              <a className="text-foreground/80 hover:text-primary transition-colors">
                {t('nav.mentors')}
              </a>
            </Link>
          </div>
          
          <div className="flex items-center space-x-2">
            <ThemeSwitcher />
            <LanguageSwitcher />
            <Link href="/login">
              <Button variant="outline" className="ml-2">
                {t('nav.login')}
              </Button>
            </Link>
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
            <Link href="/#about">
              <a className="text-foreground/80 hover:text-primary py-2 transition-colors">
                {t('nav.about')}
              </a>
            </Link>
            <Link href="/courses">
              <a className="text-foreground/80 hover:text-primary py-2 transition-colors">
                {t('nav.courses')}
              </a>
            </Link>
            <Link href="/opportunities">
              <a className="text-foreground/80 hover:text-primary py-2 transition-colors">
                {t('nav.internships')}
              </a>
            </Link>
            <Link href="/mentors">
              <a className="text-foreground/80 hover:text-primary py-2 transition-colors">
                {t('nav.mentors')}
              </a>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="w-full">
                {t('nav.login')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}