import { useTranslations } from "@/hooks/use-translations";
import { Link } from "wouter";
import logoLight from '@/img/light_version.svg';
import logoDark from '@/img/dark_version.svg';
import { useTheme } from '@/contexts/ThemeContext';
import { useEffect } from "react";

export function Footer() {
  const { t, language } = useTranslations();
  const { theme } = useTheme();
  
  // Determine which logo to use based on theme
  const isDarkMode = theme === 'dark' || 
    (theme === 'system' && typeof window !== 'undefined' && 
     window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const logoSrc = isDarkMode ? logoDark : logoLight;
  
  // Handle hash links properly when the document loads
  useEffect(() => {
    // Check if we have a hash in the URL when the component mounts
    if (window.location.hash === "#faq") {
      // We need a slight delay to make sure the page is fully loaded
      setTimeout(() => {
        const faqSection = document.getElementById('faq');
        if (faqSection) {
          faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, []);
  
  // Function to handle smooth scrolling to FAQ section
  const handleScrollToFAQ = (e: React.MouseEvent) => {
    e.preventDefault();
    
    // If we're already on the home page
    if (window.location.pathname === "/" || window.location.pathname === "") {
      const faqSection = document.getElementById('faq');
      if (faqSection) {
        // Update URL without causing a page reload
        window.history.pushState(null, '', '/#faq');
        
        // Use the scrollIntoView method which works better with scroll-mt-* classes
        faqSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      // If we're on another page, navigate to home with hash
      window.location.href = '/#faq';
    }
  };
  
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
              <li className="relative">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" style={{transform: 'translateX(2.26102px) translateY(-2.26102px)'}}></div>
                  <div className="absolute bottom-40 right-20 w-72 h-72 rounded-full bg-indigo-500/5 blur-3xl" style={{transform: 'translateX(-38.3258px) translateY(38.3258px)'}}></div>
                </div>
                <a 
                  href="/#faq" 
                  onClick={handleScrollToFAQ}
                  className="text-foreground/70 hover:text-primary relative z-10"
                >
                  {language === 'en' ? 'FAQ' : 
                   language === 'ru' ? 'Часто задаваемые вопросы' : 
                   'Жиі қойылатын сұрақтар'}
                </a>
              </li>
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