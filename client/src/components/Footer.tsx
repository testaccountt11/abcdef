import { useTranslations } from "@/hooks/use-translations";
import { Link } from "wouter";
import logoLight from '@/img/light_version.svg';
import logoDark from '@/img/dark_version.svg';
import { useTheme } from '@/contexts/ThemeContext';

export function Footer() {
  const { t, language } = useTranslations();
  const { theme } = useTheme();
  
  // Determine which logo to use based on theme
  const isDarkMode = theme === 'dark' || 
    (theme === 'system' && typeof window !== 'undefined' && 
     window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const logoSrc = isDarkMode ? logoDark : logoLight;
  
  return (
    <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50 py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="mb-4">
              <Link href="/">
                <img src={logoSrc} alt="Portfol.IO" className="h-8 cursor-pointer" />
              </Link>
            </div>
            <p className="text-foreground/70 mb-6 max-w-md">
              {language === 'en' ? 'Innovative educational platform for building a successful future through a personal portfolio and skills development' : 
               language === 'ru' ? 'Инновационная образовательная платформа для построения успешного будущего через персональное портфолио и развитие навыков' : 
               'Жеке портфолио мен дағдыларды дамыту арқылы табысты болашақ құруға арналған инновациялық білім беру платформасы'}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-primary">
              {language === 'en' ? 'Quick Links' : 
               language === 'ru' ? 'Быстрые ссылки' : 
               'Жылдам сілтемелер'}
            </h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-foreground/70 hover:text-primary">
                {language === 'en' ? 'Home' : 
                 language === 'ru' ? 'Главная' : 
                 'Басты бет'}
              </Link></li>
              <li><Link href="/publicaboutus" className="text-foreground/70 hover:text-primary">
                {t('nav.about')}
              </Link></li>
              <li><Link href="/publiccourses" className="text-foreground/70 hover:text-primary">
                {t('nav.courses')}
              </Link></li>
              <li><Link href="/publicinternships" className="text-foreground/70 hover:text-primary">
                {t('nav.internships')}
              </Link></li>
              <li><Link href="/publicmentors" className="text-foreground/70 hover:text-primary">
                {t('nav.mentors')}
              </Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4 text-primary">
              {language === 'en' ? 'Support' : 
               language === 'ru' ? 'Поддержка' : 
               'Қолдау'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-foreground/70 hover:text-primary">
                {language === 'en' ? 'Contact Us' : 
                 language === 'ru' ? 'Контакты' : 
                 'Байланыс'}
              </a></li>
              <li><a href="#" className="text-foreground/70 hover:text-primary">FAQ</a></li>
              <li><Link href="/publicprivacypolicy" className="text-foreground/70 hover:text-primary">
                {language === 'en' ? 'Privacy Policy' : 
                 language === 'ru' ? 'Политика конфиденциальности' : 
                 'Құпиялылық саясаты'}
              </Link></li>
              <li><Link href="/publictermsofuse" className="text-foreground/70 hover:text-primary">
                {language === 'en' ? 'Terms of Use' : 
                 language === 'ru' ? 'Условия использования' : 
                 'Қолдану шарттары'}
              </Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/50 text-center text-foreground/60">
          © {new Date().getFullYear()} <Link href="/" className="text-primary hover:text-primary/80">Portfol.IO</Link> – 
          {language === 'en' ? 'All rights reserved.' : 
           language === 'ru' ? 'Все права защищены.' : 
           'Барлық құқықтар қорғалған.'}
        </div>
      </div>
    </footer>
  );
} 