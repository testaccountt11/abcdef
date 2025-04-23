import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { useTranslations } from "@/hooks/use-translations";
import { 
  TargetIcon, GraduationCapIcon, TrophyIcon, Users2Icon, 
  BrainIcon, BookOpenIcon, AwardIcon, BadgeIcon, 
  ArrowRight, UserPlusIcon, Compass, Medal, Star
} from "lucide-react";
import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

// Lazy load sections that are not immediately visible
const LazyFeatureSection = lazy(() => import('@/components/landing/FeatureSection'));
const LazyHowItWorksSection = lazy(() => import('@/components/landing/HowItWorksSection'));
const LazyTestimonialsSection = lazy(() => import('@/components/landing/TestimonialsSection'));
const LazyPartnersSection = lazy(() => import('@/components/landing/PartnersSection'));
const LazyCTASection = lazy(() => import('@/components/landing/CTASection'));

// Animation variants
const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const featureCardVariants = {
  offscreen: {
    y: 30,
    opacity: 0
  },
  onscreen: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.2,
      duration: 0.5,
      delay: i * 0.05
    }
  })
};

export default function Landing() {
  const [, setLocation] = useLocation();
  const { t, language } = useTranslations();
  const [isVisible, setIsVisible] = useState({
    features: false,
    howItWorks: false,
    testimonials: false,
    partners: false,
    cta: false
  });

  // Use Intersection Observer to detect when sections are visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setIsVisible(prev => ({ ...prev, [id]: true }));
            // Once a section is visible, we can unobserve it
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe each section
    const sections = ['features', 'howItWorks', 'testimonials', 'partners', 'cta'];
    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach(id => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  // All features with translations
  const features = [
    {
      icon: <BrainIcon className="w-12 h-12 text-primary" />, 
      title: t('features.personalPath.title'), 
      desc: t('features.personalPath.desc')
    },
    {
      icon: <GraduationCapIcon className="w-12 h-12 text-primary" />, 
      title: t('features.topCourses.title'), 
      desc: t('features.topCourses.desc')
    },
    {
      icon: <TrophyIcon className="w-12 h-12 text-primary" />, 
      title: t('features.competitions.title'), 
      desc: t('features.competitions.desc')
    },
    {
      icon: <Users2Icon className="w-12 h-12 text-primary" />, 
      title: t('features.mentorship.title'), 
      desc: t('features.mentorship.desc')
    }
  ];

  // Steps with translations for each language
  const stepsTranslations = {
    en: [
      {
        number: "01",
        title: "Registration",
        description: "Create an account and specify your goals, interests and skills",
        icon: <UserPlusIcon className="w-10 h-10" />
      },
      {
        number: "02",
        title: "Choose Your Path",
        description: "Courses, internships, mentors – all in one place for your development!",
        icon: <Compass className="w-10 h-10" />
      },
      {
        number: "03",
        title: "Portfolio Development",
        description: "Complete courses, collect certificates and achieve success!",
        icon: <Medal className="w-10 h-10" />
      }
    ],
    ru: [
      {
        number: "01",
        title: "Регистрация",
        description: "Создай аккаунт и укажи свои цели, интересы и навыки",
        icon: <UserPlusIcon className="w-10 h-10" />
      },
      {
        number: "02",
        title: "Выбор пути",
        description: "Курсы, стажировки, менторы – всё в одном месте для твоего развития!",
        icon: <Compass className="w-10 h-10" />
      },
      {
        number: "03",
        title: "Развитие портфолио",
        description: "Проходи обучение, собирай сертификаты и добивайся успеха!",
        icon: <Medal className="w-10 h-10" />
      }
    ],
    kz: [
      {
        number: "01",
        title: "Тіркелу",
        description: "Аккаунт жасап, мақсаттарыңызды, қызығушылықтарыңызды және дағдыларыңызды көрсетіңіз",
        icon: <UserPlusIcon className="w-10 h-10" />
      },
      {
        number: "02",
        title: "Жолыңызды таңдаңыз",
        description: "Курстар, тәжірибелер, менторлар – бәрі бір жерде сіздің дамуыңыз үшін!",
        icon: <Compass className="w-10 h-10" />
      },
      {
        number: "03",
        title: "Портфолионы дамыту",
        description: "Оқытудан өтіңіз, сертификаттар жинаңыз және табысқа жетіңіз!",
        icon: <Medal className="w-10 h-10" />
      }
    ]
  };

  // Testimonials with translations for each language
  const testimonialTranslations = {
    en: [
      {
        name: "Assel K.",
        role: "School Graduate",
        quote: "Thanks to Portfol.IO, I was able to prepare a competitive portfolio and get into a top university with a scholarship!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Daniyar M.",
        role: "2nd Year Student",
        quote: "I found my dream internship and improved my skills by following a personalized development plan.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Kamila T.",
        role: "High School Student",
        quote: "The mentors on the platform helped me understand which direction I want to develop in and how to achieve my goals.",
        rating: 4,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      }
    ],
    ru: [
      {
        name: "Асель К.",
        role: "Выпускница школы",
        quote: "Благодаря Portfol.IO я смогла подготовить конкурентное портфолио и поступить в топовый университет на бюджет!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Данияр М.",
        role: "Студент 2 курса",
        quote: "Нашел стажировку своей мечты и улучшил свои навыки, следуя персональному плану развития.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Камила Т.",
        role: "Старшеклассница",
        quote: "Менторы на платформе помогли мне понять, в каком направлении я хочу развиваться и как достичь цели.",
        rating: 4,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      }
    ],
    kz: [
      {
        name: "Әсел Қ.",
        role: "Мектеп түлегі",
        quote: "Portfol.IO арқылы мен бәсекеге қабілетті портфолио дайындап, үздік университетке грантпен түстім!",
        rating: 5,
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Данияр М.",
        role: "2-ші курс студенті",
        quote: "Мен арман тәжірибемді тауып, жеке даму жоспарын орындай отырып, өз дағдыларымды жақсарттым.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Кәмила Т.",
        role: "Жоғары сынып оқушысы",
        quote: "Платформадағы менторлар маған қай бағытта дамығым келетінін және мақсаттарыма қалай жетуді түсінуге көмектесті.",
        rating: 4,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      }
    ]
  };

  // Partner names with translations for each language
  const partnerTranslations = {
    en: [
      "KIMEP University",
      "Kazakh-British University",
      "NIS",
      "Nazarbayev University",
      "IITU",
      "Kaspi.kz",
      "Kolesa Group",
      "Yandex"
    ],
    ru: [
      "Университет КИМЭП",
      "Казахстанско-Британский университет",
      "НИШ",
      "Назарбаев Университет",
      "МУИТ",
      "Kaspi.kz",
      "Kolesa Group",
      "Яндекс"
    ],
    kz: [
      "КИМЭП Университеті",
      "Қазақстан-Британ университеті",
      "НЗМ",
      "Назарбаев Университеті",
      "ХАТУ",
      "Kaspi.kz",
      "Kolesa Group",
      "Яндекс"
    ]
  };

  // Get localized content based on current language
  const steps = stepsTranslations[language as keyof typeof stepsTranslations] || stepsTranslations.en;
  const testimonials = testimonialTranslations[language as keyof typeof testimonialTranslations] || testimonialTranslations.en;
  const partners = partnerTranslations[language as keyof typeof partnerTranslations] || partnerTranslations.en;

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <main className="pt-32 px-6 relative overflow-hidden">
        {/* Animated background elements */}
        <motion.div 
          className="absolute top-20 left-[10%] w-96 h-96 bg-primary/5 rounded-full blur-xl -z-10"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-40 right-[15%] w-64 h-64 bg-blue-500/5 rounded-full blur-xl -z-10"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Animated floating icons */}
        <motion.div 
          className="absolute top-40 left-[20%] text-primary/20 -z-10"
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <BrainIcon className="w-14 h-14" />
        </motion.div>
        
        <motion.div 
          className="absolute bottom-20 right-[25%] text-primary/20 -z-10"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <AwardIcon className="w-16 h-16" />
        </motion.div>

        {/* Animated dots grid */}
        <motion.div 
          className="absolute inset-0 -z-20 opacity-5"
          animate={{
            backgroundPosition: ["0px 0px", "16px 16px"]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <div className="absolute left-0 right-0 top-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
        </motion.div>

        {/* Hero content */}
        <section className="max-w-7xl mx-auto text-center relative z-10 pt-8">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-10 text-gradient leading-tight md:leading-tight lg:leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
            className="text-xl mb-14 max-w-2xl mx-auto text-foreground/70 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button 
              className="relative overflow-hidden group bg-gradient-to-r from-blue-500 to-cyan-400 text-white text-lg py-6 px-10 shadow-lg border-0"
              onClick={() => setLocation("/register")}
            >
              <span className="relative z-10 flex items-center font-medium">
                {t('hero.start')}
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </Button>
          </motion.div>

          {/* Stats Counter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-8 md:gap-16 mt-12 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{language === 'en' ? '100+' : '100+'}</p>
              <p className="text-sm text-foreground/70">
                {language === 'en' ? 'Courses' : 
                 language === 'ru' ? 'Курсов' : 
                 'Курстар'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{language === 'en' ? '50+' : '50+'}</p>
              <p className="text-sm text-foreground/70">
                {language === 'en' ? 'Mentors' : 
                 language === 'ru' ? 'Менторов' : 
                 'Менторлар'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{language === 'en' ? '200+' : '200+'}</p>
              <p className="text-sm text-foreground/70">
                {language === 'en' ? 'Opportunities' : 
                 language === 'ru' ? 'Возможностей' : 
                 'Мүмкіндіктер'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-4xl font-bold text-primary">{language === 'en' ? '1000+' : '1000+'}</p>
              <p className="text-sm text-foreground/70">
                {language === 'en' ? 'Students' : 
                 language === 'ru' ? 'Студентов' : 
                 'Студенттер'}
              </p>
            </div>
          </motion.div>
        </section>

        {/* Feature Cards - Lazy loaded */}
        <div id="features">
          {isVisible.features && (
            <Suspense fallback={<div className="py-24 max-w-7xl mx-auto text-center">Loading...</div>}>
              <LazyFeatureSection features={features} t={t} />
            </Suspense>
          )}
        </div>

        {/* How It Works - Lazy loaded */}
        <div id="howItWorks">
          {isVisible.howItWorks && (
            <Suspense fallback={<div className="py-24 bg-primary/5 text-center">Loading...</div>}>
              <LazyHowItWorksSection steps={steps} language={language} />
            </Suspense>
          )}
        </div>

        {/* Testimonials - Lazy loaded */}
        <div id="testimonials">
          {isVisible.testimonials && (
            <Suspense fallback={<div className="py-24 max-w-7xl mx-auto px-4 text-center">Loading...</div>}>
              <LazyTestimonialsSection testimonials={testimonials} t={t} language={language} />
            </Suspense>
          )}
        </div>

        {/* Partners - Lazy loaded */}
        <div id="partners">
          {isVisible.partners && (
            <Suspense fallback={<div className="py-20 bg-card/30 text-center">Loading...</div>}>
              <LazyPartnersSection partners={partners} t={t} language={language} />
            </Suspense>
          )}
        </div>

        {/* CTA - Lazy loaded */}
        <div id="cta">
          {isVisible.cta && (
            <Suspense fallback={<div className="py-24 max-w-5xl mx-auto px-4 text-center">Loading...</div>}>
              <LazyCTASection t={t} language={language} setLocation={setLocation} />
            </Suspense>
          )}
        </div>

        {/* Footer */}
        <footer className="bg-card/50 backdrop-blur-sm border-t border-border/50 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold mb-4">Portfol.IO</h3>
                <p className="text-foreground/70 mb-6 max-w-md">
                  {language === 'en' ? 'Innovative educational platform for building a successful future through a personal portfolio and skills development' : 
                   language === 'ru' ? 'Инновационная образовательная платформа для построения успешного будущего через персональное портфолио и развитие навыков' : 
                   'Жеке портфолио мен дағдыларды дамыту арқылы табысты болашақ құруға арналған инновациялық білім беру платформасы'}
                </p>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4">
                  {language === 'en' ? 'Quick Links' : 
                   language === 'ru' ? 'Быстрые ссылки' : 
                   'Жылдам сілтемелер'}
                </h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {language === 'en' ? 'Home' : 
                     language === 'ru' ? 'Главная' : 
                     'Басты бет'}
                  </a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {t('nav.about')}
                  </a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {t('nav.courses')}
                  </a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {t('nav.internships')}
                  </a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {t('nav.mentors')}
                  </a></li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-lg mb-4">
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
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {language === 'en' ? 'Privacy Policy' : 
                     language === 'ru' ? 'Политика конфиденциальности' : 
                     'Құпиялылық саясаты'}
                  </a></li>
                  <li><a href="#" className="text-foreground/70 hover:text-primary">
                    {language === 'en' ? 'Terms of Use' : 
                     language === 'ru' ? 'Условия использования' : 
                     'Қолдану шарттары'}
                  </a></li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-border/50 text-center text-foreground/60">
              © 2025 Portfol.IO – 
              {language === 'en' ? 'All rights reserved.' : 
               language === 'ru' ? 'Все права защищены.' : 
               'Барлық құқықтар қорғалған.'}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}