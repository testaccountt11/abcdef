import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  TargetIcon, GraduationCapIcon, TrophyIcon, Users2Icon, 
  BrainIcon, BookOpenIcon, AwardIcon, BadgeIcon, 
  ArrowRight, UserPlusIcon, Compass, Medal, Star,
  ChevronDown, HelpCircle, CheckCircle2, ChevronUp, ChevronLeft, ChevronRight
} from "lucide-react";
import { useRef, useState, useEffect, lazy, Suspense } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { PublicPageLayout } from "@/components/layouts/PublicPageLayout";
import logoAitu from '../img/partners/aitu.png';
import logoSmartNation from '../img/partners/smartnation.svg';
import logoKundelik from '../img/partners/kundelik.png';
import logoKolesa from '../img/partners/kolesa.svg';
import logoKimep from '../img/partners/kimep.svg';
import logoKbtu from '../img/partners/kbtu.png';
import logoIitu from '../img/partners/iitu.png';
import logoHh from '../img/partners/hh.png';
import logoYandex from '../img/partners/yandex.png';
import logoKaspi from '../img/partners/kaspi.svg';
import { useTheme } from "@/contexts/ThemeContext";

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
  const { theme } = useTheme();
  const isMobile = useIsMobile();
  
  // Определяем, используется ли темная тема
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const [isVisible, setIsVisible] = useState({
    features: false,
    howItWorks: false,
    testimonials: false,
    partners: false,
    faq: false,
    cta: false
  });

  // Добавить состояние для отслеживания открытого вопроса
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  
  // Функция для переключения состояния вопроса
  const toggleQuestion = (index: number) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

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
    const sections = ['features', 'howItWorks', 'testimonials', 'partners', 'faq', 'cta'];
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
      },
      {
        name: "Arman B.",
        role: "University Professor",
        quote: "As an educator, I'm impressed by the quality of the courses. The platform is exactly what modern students need for comprehensive development.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Sophia L.",
        role: "Career Changer",
        quote: "At 30, I decided to completely change my career path. Portfol.IO helped me acquire new skills and build a portfolio that impressed employers.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Timur K.",
        role: "IT Specialist",
        quote: "The platform offers advanced courses that allow me to stay competitive in the rapidly changing tech industry. Highly recommended!",
        rating: 4,
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Ayana N.",
        role: "Startup Founder",
        quote: "The knowledge gained through Portfol.IO courses became the foundation for starting my own business. The mentorship program was invaluable.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      }
    ],
    ru: [
      {
        name: "Асель К.",
        role: "Выпускница школы",
        quote: "Благодаря Portfol.IO я смогла подготовить конкурентное портфолио и поступить в топовый университет на грант!",
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
      },
      {
        name: "Арман Б.",
        role: "Профессор университета",
        quote: "Как преподаватель, я впечатлен качеством курсов. Платформа - қазіргі студенттерге жан-жақты дамуы үшін қажет нәрсе.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "София Л.",
        role: "Сменила карьеру",
        quote: "В 30 лет я решила полностью сменить карьерный путь. Portfol.IO маған жаңа дағдыларды үйреніп, жұмыс берушілерді таңғалдырған портфолио жасауға көмектесті.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Тимур К.",
        role: "ИТ-специалист",
        quote: "Платформа жылдам өзгеретін IT саласында бәсекеге қабілетті болуға мүмкіндік беретін озық курстарды ұсынады. Міндетті түрде ұсынамын!",
        rating: 4,
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Аяна Н.",
        role: "Стартап негізін қалаушы",
        quote: "Portfol.IO курстарынан алынған білім өз бизнесімді құруға негіз болды. Тәлімгерлік бағдарламасы баға жетпес болды.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
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
      },
      {
        name: "Арман Б.",
        role: "Университет профессоры",
        quote: "Оқытушы ретінде мен курстардың сапасына таңқалдым. Платформа - қазіргі студенттерге жан-жақты дамуы үшін қажет нәрсе.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "София Л.",
        role: "Мансап ауыстырушы",
        quote: "30 жасымда мансаптық жолымды толығымен өзгертуге шешім қабылдадым. Portfol.IO маған жаңа дағдыларды үйреніп, жұмыс берушілерді таңғалдырған портфолио жасауға көмектесті.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Тимур К.",
        role: "IT маманы",
        quote: "Платформа жылдам өзгеретін IT саласында бәсекеге қабілетті болуға мүмкіндік беретін озық курстарды ұсынады. Міндетті түрде ұсынамын!",
        rating: 4,
        image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
      },
      {
        name: "Аяна Н.",
        role: "Стартап негізін қалаушы",
        quote: "Portfol.IO курстарынан алынған білім өз бизнесімді құруға негіз болды. Тәлімгерлік бағдарламасы баға жетпес болды.",
        rating: 5,
        image: "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&h=256&q=80"
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

  // FAQ items
  const faqItems = [
    {
      question: language === 'en' ? 'How does AI help in course selection?' : 
                language === 'ru' ? 'Как ИИ помогает в выборе курсов?' :
                'ЖИ курстарды таңдауға қалай көмектеседі?',
      answer: language === 'en' ? 'Our AI analyzes your profile, interests, and goals to suggest the most relevant courses and opportunities for your educational journey.' : 
              language === 'ru' ? 'Наш ИИ анализирует ваш профиль, интересы и цели, чтобы предложить наиболее релевантные курсы и возможности для вашего образовательного пути.' :
              'Біздің ЖИ сіздің профиліңізді, қызығушылықтарыңызды және мақсаттарыңызды талдап, білім беру жолыңыз үшін ең өзекті курстар мен мүмкіндіктерді ұсынады.'
    },
    {
      question: language === 'en' ? 'Is the platform free to use?' : 
                language === 'ru' ? 'Бесплатна ли платформа для использования?' :
                'Платформаны пайдалану тегін бе?',
      answer: language === 'en' ? 'Basic features are free for all users. Premium functions like personalized mentorship and advanced analytics require a subscription.' : 
              language === 'ru' ? 'Базовые функции бесплатны для всех пользователей. Премиум-функции, такие как персональное наставничество и расширенная аналитика, требуют подписки.' :
              'Негізгі функциялар барлық пайдаланушылар үшін тегін. Жеке тәлімгерлік және кеңейтілген аналитика сияқты премиум функциялар жазылуды қажет етеді.'
    },
    {
      question: language === 'en' ? 'How do I connect with mentors?' : 
                language === 'ru' ? 'Как связаться с менторами?' :
                'Менторлармен қалай байланысамын?',
      answer: language === 'en' ? 'You can browse our mentor directory, filter by expertise, and request mentorship through our platform. Mentors will respond based on their availability.' : 
              language === 'ru' ? 'Вы можете просмотреть наш каталог менторов, отфильтровать по специализации и запросить наставничество через нашу платформу. Менторы ответят в зависимости от их доступности.' :
              'Біздің менторлар каталогын шолып, мамандығы бойынша сүзгіден өткізіп, платформамыз арқылы тәлімгерлікті сұрай аласыз. Менторлар олардың қол жетімділігіне байланысты жауап береді.'
    },
    {
      question: language === 'en' ? 'Can I add external certificates to my portfolio?' : 
                language === 'ru' ? 'Могу ли я добавить внешние сертификаты в свое портфолио?' :
                'Сыртқы сертификаттарды портфолиома қоса аламын ба?',
      answer: language === 'en' ? 'Yes! You can upload and verify external certificates from reputable educational providers to enhance your portfolio and showcase all your achievements.' : 
              language === 'ru' ? 'Да! Вы можете загрузить и верифицировать внешние сертификаты от уважаемых образовательных провайдеров, чтобы улучшить ваше портфолио и продемонстрировать все ваши достижения.' :
              'Иә! Портфолиоңызды жақсарту және барлық жетістіктеріңізді көрсету үшін беделді білім беру провайдерлерінен сыртқы сертификаттарды жүктеп, тексере аласыз.'
    }
  ];

  // Get localized content based on current language
  const steps = stepsTranslations[language as keyof typeof stepsTranslations] || stepsTranslations.en;
  const testimonials = testimonialTranslations[language as keyof typeof testimonialTranslations] || testimonialTranslations.en;
  const partners = [
    { name: "AITU", logo: logoAitu },
    { name: "Smart Nation", logo: logoSmartNation },
    { name: "Kundelik", logo: logoKundelik },
    { name: "Kolesa Group", logo: logoKolesa },
    { name: "KIMEP University", logo: logoKimep },
    { name: "KBTU", logo: logoKbtu },
    { name: "IITU", logo: logoIitu },
    { name: "HeadHunter", logo: logoHh },
    { name: "Yandex", logo: logoYandex },
    { name: "Kaspi.kz", logo: logoKaspi }
  ];

  // Добавляем ref для скроллинга и активный индекс
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalTestimonials = testimonials.length;
  const visibleItems = 4; // Show 4 testimonials at once
  
  // Функция для скроллинга к определенному индексу
  const scrollToIndex = (index: number) => {
    if (testimonialsRef.current) {
      const itemWidth = testimonialsRef.current.scrollWidth / totalTestimonials;
      const newScrollPosition = index * itemWidth;
      
      testimonialsRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
      
      setActiveIndex(index);
    }
  };
  
  // Функция для скроллинга отзывов по кнопкам
  const scrollTestimonials = (direction: 'prev' | 'next') => {
    let newIndex = direction === 'prev' 
      ? Math.max(0, activeIndex - 1) 
      : Math.min(totalTestimonials - visibleItems, activeIndex + 1);
      
    scrollToIndex(newIndex);
  };
  
  // Автоматическая прокрутка с паузой при наведении
  const [isHovering, setIsHovering] = useState(false);
  
  useEffect(() => {
    if (isHovering) return;
    
    const interval = setInterval(() => {
      const newIndex = (activeIndex + 1) % (totalTestimonials - visibleItems + 1);
      scrollToIndex(newIndex);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isHovering, totalTestimonials, visibleItems]);
  
  // Слушатель скролла для обновления активного индекса
  useEffect(() => {
    const handleScroll = () => {
      if (testimonialsRef.current) {
        const { scrollLeft, scrollWidth } = testimonialsRef.current;
        const itemWidth = scrollWidth / totalTestimonials;
        const newIndex = Math.round(scrollLeft / itemWidth);
        if (newIndex !== activeIndex) {
          setActiveIndex(newIndex);
        }
      }
    };
    
    const ref = testimonialsRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll);
      return () => ref.removeEventListener('scroll', handleScroll);
    }
  }, [activeIndex, totalTestimonials]);

  return (
    <PublicPageLayout>
      {/* Добавляем градиенты с новым классом для фона */}
      <div className={`fixed inset-0 overflow-hidden pointer-events-none -z-50 ${isDark ? 'bg-gradient-background' : ''}`}>
        <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-br from-primary/5 via-transparent to-indigo-400/5 dark:from-primary/10 dark:via-transparent dark:to-indigo-400/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-tr from-blue-400/5 via-transparent to-primary/5 dark:from-blue-500/10 dark:via-transparent dark:to-primary/10 blur-3xl"></div>
      </div>
      
      <main className="relative overflow-hidden">
        {/* HERO SECTION - без дополнительных фоновых элементов */}
        <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative pt-16 pb-24 px-6">
          {/* Оставляем только оригинальные градиентные элементы */}
        <motion.div 
            className="absolute top-20 left-[10%] w-96 h-96 bg-gradient-to-r from-primary/10 to-violet-500/10 dark:from-primary/20 dark:to-violet-500/20 blur-3xl -z-10"
          animate={{
              scale: [1, 1.1, 1],
              opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
              duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
            className="absolute top-40 right-[15%] w-64 h-64 bg-gradient-to-r from-blue-500/5 to-primary/5 blur-3xl -z-10"
          animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.3, 0.2, 0.3]
          }}
          transition={{
              duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
          {/* Оставляем оригинальные плавающие иконки */}
        <motion.div 
            className="absolute top-[20%] left-[20%] text-primary/10 -z-10"
          animate={{
              y: [0, -15, 0],
              rotate: [0, 3, 0]
          }}
          transition={{
              duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <BrainIcon className="w-14 h-14" />
        </motion.div>
        
        <motion.div 
            className="absolute bottom-[20%] right-[25%] text-indigo-600/10 -z-10"
          animate={{
              y: [0, 15, 0],
              rotate: [0, -3, 0]
          }}
          transition={{
              duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <AwardIcon className="w-16 h-16" />
        </motion.div>

        {/* Hero content */}
          <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1 
              className="hero-title text-5xl md:text-6xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90 dark:from-primary/95 dark:to-indigo-400/95 py-2 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
              className="text-xl md:text-2xl mb-14 max-w-2xl mx-auto text-foreground/70 dark:text-foreground/80 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
          >
            <Button 
                className={`rounded-full ${isMobile ? 'px-6 py-4 text-base' : 'px-8 py-6 text-lg'} bg-card border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-500 shadow-lg`}
              onClick={() => setLocation("/register")}
            >
                <span className="flex items-center">
                {t('hero.start')}
                  <motion.span aria-hidden="true">
                    <ArrowRight className={`ml-2 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                  </motion.span>
              </span>
            </Button>
            </motion.div>
          </motion.div>

            {/* Статистика */}
          <motion.div 
              className="flex flex-wrap justify-center gap-8 md:gap-16 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <motion.div 
                className="text-center"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <p className="text-4xl font-bold text-primary/90">{language === 'en' ? '100+' : '100+'}</p>
                <p className="text-sm text-foreground/60">
                {language === 'en' ? 'Courses' : 
                 language === 'ru' ? 'Курсов' : 
                 'Курстар'}
              </p>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <p className="text-4xl font-bold text-primary/90">{language === 'en' ? '50+' : '50+'}</p>
                <p className="text-sm text-foreground/60">
                {language === 'en' ? 'Mentors' : 
                 language === 'ru' ? 'Менторов' : 
                 'Менторлар'}
              </p>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <p className="text-4xl font-bold text-primary/90">{language === 'en' ? '200+' : '200+'}</p>
                <p className="text-sm text-foreground/60">
                {language === 'en' ? 'Opportunities' : 
                 language === 'ru' ? 'Возможностей' : 
                 'Мүмкіндіктер'}
              </p>
              </motion.div>
              <motion.div 
                className="text-center"
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <p className="text-4xl font-bold text-primary/90">{language === 'en' ? '1000+' : '1000+'}</p>
                <p className="text-sm text-foreground/60">
                {language === 'en' ? 'Students' : 
                 language === 'ru' ? 'Студентов' : 
                 'Студенттер'}
              </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* FEATURES SECTION - блок с объяснением пользы */}
        <section id="features" className="py-24 max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <motion.span 
              className="inline-block px-3 py-1 text-sm rounded-full border border-primary/20 bg-primary/5 text-primary/80 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {language === 'en' ? 'Features' : 
               language === 'ru' ? 'Возможности' : 
               'Мүмкіндіктер'}
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90 leading-[1.3] py-2">
              {t('features.title')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
              {t('features.subtitle')}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                className="bg-card/80 dark:bg-gray-800/60 border border-border/10 dark:border-white/5 rounded-xl p-6 shadow-sm text-center hover:shadow-md transition-all duration-500 dark:shadow-primary/5"
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.3 }}
                variants={featureCardVariants}
                custom={i}
                whileHover={{ y: -5, transition: { duration: 0.3 } }}
              >
                <motion.div 
                  className="flex justify-center mb-6"
                  animate={{ rotate: [0, 5, 0, -5, 0] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="text-primary dark:text-primary/90 dark:drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))">
                    {feature.icon}
            </div>
          </motion.div>
                <h3 className="text-xl font-bold mb-3 text-foreground/90 dark:text-white">{feature.title}</h3>
                <p className="text-foreground/60 dark:text-gray-300/70">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HOW IT WORKS SECTION - шаги */}
        <section id="howItWorks" className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-muted/20'}`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <motion.span 
                className="inline-block px-3 py-1 text-sm rounded-full border border-primary/20 bg-primary/5 text-primary/80 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {language === 'en' ? 'Process' : 
                 language === 'ru' ? 'Процесс' : 
                 'Процесс'}
              </motion.span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90 leading-[1.3] py-2">
                {language === 'en' ? 'How It Works' : 
                 language === 'ru' ? 'Как это работает' : 
                 'Бұл қалай жұмыс істейді'}
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                {language === 'en' ? 'Simple steps to start your educational journey' : 
                 language === 'ru' ? 'Простые шаги для начала вашего образовательного пути' : 
                 'Білім беру жолыңызды бастаудың қарапайым қадамдары'}
              </p>
        </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <div key={i} className="relative">
                  {i < steps.length - 1 && (
                    <div className="hidden md:block absolute top-24 right-0 w-full h-2 transform translate-x-1/2">
                      <div className="h-0.5 bg-primary/20 w-full relative">
                        <motion.div 
                          className="absolute w-2 h-2 rounded-full bg-primary/60 -top-[3px]"
                          animate={{ x: ['0%', '100%', '0%'] }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                        ></motion.div>
                      </div>
                    </div>
                  )}
                  
                  <motion.div 
                    className="bg-card/60 dark:bg-gray-800/40 backdrop-blur-sm shadow-sm rounded-xl p-8 border border-border/10 dark:border-white/5 text-center relative z-10 h-full dark:shadow-lg dark:shadow-primary/5"
                    whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.08)", transition: { duration: 0.4 } }}
                  >
                    <motion.div 
                      className="inline-flex items-center justify-center w-16 h-16 bg-primary/5 dark:bg-primary/10 rounded-full mb-6"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <div className="text-primary dark:text-primary/90 dark:drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))">
                        {step.icon}
        </div>
                    </motion.div>
                    <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary/80 to-indigo-600/80 dark:from-primary/90 dark:to-indigo-500/90 text-white text-xl font-bold rounded-full w-10 h-10 flex items-center justify-center">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-bold mb-4 text-foreground/90 dark:text-white">{step.title}</h3>
                    <p className="text-foreground/60 dark:text-gray-300/70">{step.description}</p>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION - автоматическая прокрутка */}
        <section id="testimonials" className={`py-24 ${isDark ? 'bg-gray-900/50' : 'bg-muted/10'} relative`}>
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <motion.span 
                className="inline-block px-3 py-1 text-sm rounded-full border border-primary/20 bg-primary/5 text-primary/80 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {language === 'en' ? 'Testimonials' : 
                 language === 'ru' ? 'Отзывы' : 
                 'Пікірлер'}
              </motion.span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90 leading-[1.3] py-2">
                {t('testimonials.title')}
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
                {t('testimonials.subtitle')}
              </p>
        </div>

            {/* Автоматически прокручиваемая карусель - замедленная */}
            <div className="relative w-full mx-auto overflow-hidden">
              <motion.div
                className="flex space-x-6 py-4"
                animate={{ 
                  x: [-2000, 0]
                }}
                transition={{
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 90, // Увеличено с 45 до 90 секунд для более медленной прокрутки
                    ease: "linear"
                  }
                }}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                {/* Первая группа отзывов */}
                {testimonials.map((testimonial, i) => (
                  <motion.div
                    key={i}
                    className="flex-shrink-0 w-80 px-3"
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  >
                    <div
                      className="p-6 rounded-xl border border-primary/10 dark:border-primary/20 bg-card/50 backdrop-blur-sm h-full shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full object-cover mr-4 mt-1 border border-primary/20" 
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-medium text-foreground/90">{testimonial.name}</h3>
                            <div className="text-primary">
                              {Array(testimonial.rating).fill(0).map((_, j) => (
                                <span key={j} className="text-primary">★</span>
                              ))}
                              {Array(5 - testimonial.rating).fill(0).map((_, j) => (
                                <span key={j} className="text-primary/20">★</span>
                              ))}
        </div>
                          </div>
                          <p className="text-xs text-primary/60 mb-3">{testimonial.role}</p>
                          <blockquote className="text-sm text-foreground/80 italic">
                            "{testimonial.quote}"
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
                
                {/* Дублируем отзывы для непрерывной анимации */}
                {testimonials.map((testimonial, i) => (
                  <motion.div
                    key={`dup-${i}`}
                    className="flex-shrink-0 w-80 px-3"
                    whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  >
                    <div
                      className="p-6 rounded-xl border border-primary/10 dark:border-primary/20 bg-card/50 backdrop-blur-sm h-full shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex items-start">
                        <img 
                          src={testimonial.image} 
                          alt={testimonial.name} 
                          className="w-12 h-12 rounded-full object-cover mr-4 mt-1 border border-primary/20" 
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-1">
                            <h3 className="font-medium text-foreground/90">{testimonial.name}</h3>
                            <div className="text-primary">
                              {Array(testimonial.rating).fill(0).map((_, j) => (
                                <span key={j} className="text-primary">★</span>
                              ))}
                              {Array(5 - testimonial.rating).fill(0).map((_, j) => (
                                <span key={j} className="text-primary/20">★</span>
                              ))}
        </div>
                          </div>
                          <p className="text-xs text-primary/60 mb-3">{testimonial.role}</p>
                          <blockquote className="text-sm text-foreground/80 italic">
                            "{testimonial.quote}"
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* Градиентные затенения по краям для плавного исчезновения */}
              <div className={`absolute top-0 left-0 h-full w-12 bg-gradient-to-r ${isDark ? 'from-gray-900/50' : 'from-muted/10'} to-transparent z-10`}></div>
              <div className={`absolute top-0 right-0 h-full w-12 bg-gradient-to-l ${isDark ? 'from-gray-900/50' : 'from-muted/10'} to-transparent z-10`}></div>
            </div>
          </div>
          
          {/* Удаляем zigzag divider */}
        </section>

        {/* PRICING SECTION - тарифные планы и подписки */}
        <section id="pricing" className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-muted/20'} relative`}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <motion.span 
                className="inline-block px-3 py-1 text-sm rounded-full border border-primary/20 bg-primary/5 text-primary/80 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {language === 'en' ? 'Membership' : 
                 language === 'ru' ? 'Подписки' : 
                 'Жазылымдар'}
              </motion.span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90 leading-[1.3] py-2">
                {language === 'en' ? 'Choose Your Plan' : 
                 language === 'ru' ? 'Выберите свой план' : 
                 'Өз жоспарыңызды таңдаңыз'}
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-12">
                {language === 'en' ? 'Flexible plans to match your educational journey - start free and upgrade as you grow' : 
                 language === 'ru' ? 'Гибкие планы для вашего образовательного пути - начните бесплатно и улучшайте по мере роста' : 
                 'Икемді жоспарлар сіздің білім жолыңызға сәйкес - тегін бастаңыз және өскен сайын жаңартыңыз'}
                </p>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Бесплатный план */}
              <motion.div
                className="bg-card/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm border border-border/10 dark:border-white/5 flex flex-col h-full dark:shadow-lg dark:shadow-primary/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.08)", transition: { duration: 0.4 } }}
              >
                <div className="p-8 flex-grow">
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'en' ? 'Free' : 
                     language === 'ru' ? 'Бесплатный' : 
                     'Тегін'}
                  </h3>
                  <div className="text-3xl font-bold mb-4">0
                    <span className="text-lg font-normal text-foreground/60">
                      {language === 'en' ? ' KZT/month' : 
                       language === 'kz' ? ' тг/ай' : 
                       ' тг/мес'}
                    </span>
                  </div>
                  <p className="text-foreground/70 mb-6">
                    {language === 'en' ? 'Perfect to get started and explore the platform' : 
                     language === 'ru' ? 'Идеально для знакомства с платформой' : 
                     'Платформамен танысу үшін тамаша'}
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>
                        {language === 'en' ? 'Basic portfolio creation' : 
                         language === 'ru' ? 'Базовое создание портфолио' : 
                         'Негізгі портфолио құру'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>
                        {language === 'en' ? 'Access to free courses' : 
                         language === 'ru' ? 'Доступ к бесплатным курсам' : 
                         'Тегін курстарға қол жеткізу'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>
                        {language === 'en' ? 'Community forum access' : 
                         language === 'ru' ? 'Доступ к форуму сообщества' : 
                         'Қоғамдастық форумына қол жеткізу'}
                      </span>
                    </li>
                </ul>
              </div>
                <div className="px-8 pb-8">
                  <Button 
                    className="w-full py-6 rounded-lg"
                    variant="outline"
                    onClick={() => setLocation("/register")}
                  >
                    {language === 'en' ? 'Sign Up Free' : 
                     language === 'ru' ? 'Регистрация' : 
                     'Тіркелу'}
                  </Button>
                </div>
              </motion.div>

              {/* Премиум план */}
              <motion.div
                className="bg-card/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg border-2 border-primary/20 dark:border-primary/30 flex flex-col h-full relative transform md:scale-105 z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)", transition: { duration: 0.4 } }}
              >
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary/80 to-indigo-600/80 text-white text-center py-2 text-sm font-medium">
                  {language === 'en' ? 'Most Popular' : 
                   language === 'ru' ? 'Самый популярный' : 
                   'Ең танымал'}
                </div>
                <div className="p-8 pt-14 flex-grow">
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'en' ? 'Premium' : 
                     language === 'ru' ? 'Премиум' : 
                     'Премиум'}
                  </h3>
                  <div className="text-3xl font-bold mb-4">13 990
                    <span className="text-lg font-normal text-foreground/60">
                      {language === 'en' ? ' KZT/month' : 
                       language === 'kz' ? ' тг/ай' : 
                       ' тг/мес'}
                    </span>
                  </div>
                  <p className="text-foreground/70 mb-6">
                    {language === 'en' ? 'All you need for serious educational growth' : 
                     language === 'ru' ? 'Всё необходимое для серьезного образовательного роста' : 
                     'Маңызды білім өсуі үшін қажетті барлық нәрсе'}
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>
                        {language === 'en' ? 'All Free features' : 
                         language === 'ru' ? 'Все функции бесплатного плана' : 
                         'Барлық тегін функциялар'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>
                        {language === 'en' ? 'AI-powered learning path' : 
                         language === 'ru' ? 'ИИ-рекомендации по обучению' : 
                         'Жасанды интеллект оқу жолы'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>
                        {language === 'en' ? 'Priority access to all courses' : 
                         language === 'ru' ? 'Приоритетный доступ ко всем курсам' : 
                         'Барлық курстарға басымдықты кіру'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>
                        {language === 'en' ? 'Certificate verification' : 
                         language === 'ru' ? 'Верификация сертификатов' : 
                         'Сертификаттарды тексеру'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>
                        {language === 'en' ? '1 monthly mentor session' : 
                         language === 'ru' ? '1 сессия с ментором в месяц' : 
                         'Айына 1 ментормен сессия'}
                      </span>
                    </li>
                </ul>
              </div>
                <div className="px-8 pb-8">
                  <Button 
                    className="w-full py-6 rounded-lg bg-gradient-to-r from-primary to-indigo-600 hover:from-primary/90 hover:to-indigo-600/90 text-white"
                    onClick={() => setLocation("/register?plan=premium")}
                  >
                    {language === 'en' ? 'Get Premium' : 
                     language === 'ru' ? 'Выбрать Премиум' : 
                     'Премиум алу'}
                  </Button>
            </div>
              </motion.div>

              {/* Про план */}
              <motion.div
                className="bg-card/60 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl overflow-hidden shadow-sm border border-border/10 dark:border-white/5 flex flex-col h-full dark:shadow-lg dark:shadow-primary/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.08)", transition: { duration: 0.4 } }}
              >
                <div className="p-8 flex-grow">
                  <h3 className="text-xl font-bold mb-2">
                    {language === 'en' ? 'Professional' : 
                     language === 'ru' ? 'Профессиональный' : 
                     'Кәсіби'}
                  </h3>
                  <div className="text-3xl font-bold mb-4">22 990
                    <span className="text-lg font-normal text-foreground/60">
                      {language === 'en' ? ' KZT/month' : 
                       language === 'kz' ? ' тг/ай' : 
                       ' тг/мес'}
                    </span>
            </div>
                  <p className="text-foreground/70 mb-6">
                    {language === 'en' ? 'For those who want professional growth and mentorship' : 
                     language === 'ru' ? 'Для тех, кто стремится к профессиональному росту и наставничеству' : 
                     'Кәсіби өсу мен тәлімгерлікті қалайтындарға'}
                  </p>
                  <ul className="space-y-3 mb-8">
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>
                        {language === 'en' ? 'All Premium features' : 
                         language === 'ru' ? 'Все функции Премиум плана' : 
                         'Барлық Премиум функциялар'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>
                        {language === 'en' ? '4 monthly mentor sessions' : 
                         language === 'ru' ? '4 сессии с ментором в месяц' : 
                         'Айына 4 ментормен сессия'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>
                        {language === 'en' ? 'Portfolio review by experts' : 
                         language === 'ru' ? 'Обзор портфолио экспертами' : 
                         'Сарапшылардан портфолио шолуы'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>
                        {language === 'en' ? 'Priority internship matching' : 
                         language === 'ru' ? 'Приоритетный подбор стажировок' : 
                         'Басымдықты тәжірибе іріктеу'}
                      </span>
                    </li>
                    <li className="flex items-center">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                      <span>
                        {language === 'en' ? 'Career advisory services' : 
                         language === 'ru' ? 'Услуги карьерного консультирования' : 
                         'Мансаптық кеңес беру қызметтері'}
                      </span>
                    </li>
                  </ul>
          </div>
                <div className="px-8 pb-8">
                  <Button 
                    className="w-full py-6 rounded-lg"
                    variant="outline"
                    onClick={() => setLocation("/register?plan=pro")}
                  >
                    {language === 'en' ? 'Get Professional' : 
                     language === 'ru' ? 'Выбрать Профессиональный' : 
                     'Кәсіби алу'}
                  </Button>
    </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PARTNERS SECTION - возврат к базовой версии */}
        <section id="partners" className={`py-24 ${isDark ? 'bg-gray-900' : 'bg-muted/20'} mb-16 relative`}>
          {/* Убираем градиент в темном режиме */}
          {!isDark && (
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-100/10 to-transparent -z-10"></div>
          )}
          
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <motion.span 
                className="inline-block px-3 py-1 text-sm rounded-full border border-primary/20 bg-primary/5 text-primary/80 mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {language === 'en' ? 'Partnerships' : 
                 language === 'ru' ? 'Партнерства' : 
                 'Серіктестіктер'}
              </motion.span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90 leading-[1.3] py-2">
                {t('partners.title')}
              </h2>
              <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-12">
                {t('partners.subtitle')}
              </p>
        </div>

            <div className="w-full mx-auto relative py-6">
              <div className="overflow-hidden">
                <motion.div
                  className="flex space-x-6"
                  animate={{ 
                    x: [0, -1000]
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear"
                    }
                  }}
                >
                  {/* Повторяем логотипы для непрерывной анимации */}
                  {[...partners, ...partners].map((partner, i) => (
                    <div key={i} className="py-2 px-1">
                      <motion.div
                        className="flex-shrink-0 w-40 h-28 bg-card/80 dark:bg-gray-800/30 rounded-xl shadow-sm border border-border/10 dark:border-white/5 flex items-center justify-center p-4 backdrop-blur-sm"
                        whileHover={{ 
                          y: -5, 
                          boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.08)"
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.img 
                          src={partner.logo} 
                          alt={partner.name} 
                          className="max-w-full max-h-full object-contain transition-all duration-300 dark:brightness-[1.15]"
                          style={{ 
                            filter: "grayscale(100%) brightness(0.8)"
                          }}
                          whileHover={{ 
                            filter: "grayscale(0) brightness(1) drop-shadow(0 0 3px rgba(59, 130, 246, 0.5))",
                            scale: 1.05
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Градиентные затенения по краям для плавного исчезновения */}
              <div className={`absolute top-0 left-0 h-full w-12 bg-gradient-to-r ${isDark ? 'from-gray-900' : 'from-muted/20'} to-transparent z-10`}></div>
              <div className={`absolute top-0 right-0 h-full w-12 bg-gradient-to-l ${isDark ? 'from-gray-900' : 'from-muted/20'} to-transparent z-10`}></div>
            </div>

            <div className="w-full mx-auto relative py-6">
              <div className="overflow-hidden">
                <motion.div
                  className="flex space-x-6"
                  animate={{ 
                    x: [-1000, 0] 
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 30,
                      ease: "linear"
                    }
                  }}
                >
                  {/* Повторяем логотипы в обратном порядке */}
                  {[...partners, ...partners].reverse().map((partner, i) => (
                    <div key={i} className="py-2 px-1">
                      <motion.div
                        className="flex-shrink-0 w-40 h-28 bg-card/80 dark:bg-gray-800/30 rounded-xl shadow-sm border border-border/10 dark:border-white/5 flex items-center justify-center p-4 backdrop-blur-sm"
                        whileHover={{ 
                          y: -5, 
                          boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.08)"
                        }}
                        transition={{ duration: 0.4 }}
                      >
                        <motion.img 
                          src={partner.logo} 
                          alt={partner.name} 
                          className="max-w-full max-h-full object-contain transition-all duration-300 dark:brightness-[1.15]"
                          style={{ 
                            filter: "grayscale(100%) brightness(0.8)"
                          }}
                          whileHover={{ 
                            filter: "grayscale(0) brightness(1) drop-shadow(0 0 3px rgba(59, 130, 246, 0.5))",
                            scale: 1.05
                          }}
                          transition={{ duration: 0.3 }}
                        />
                      </motion.div>
                    </div>
                  ))}
                </motion.div>
              </div>
              
              {/* Градиентные затенения по краям для плавного исчезновения */}
              <div className={`absolute top-0 left-0 h-full w-12 bg-gradient-to-r ${isDark ? 'from-gray-900' : 'from-muted/20'} to-transparent z-10`}></div>
              <div className={`absolute top-0 right-0 h-full w-12 bg-gradient-to-l ${isDark ? 'from-gray-900' : 'from-muted/20'} to-transparent z-10`}></div>
              <div className="absolute top-0 left-0 h-full w-12 bg-gradient-to-r from-muted/20 to-transparent z-10"></div>
              <div className="absolute top-0 right-0 h-full w-12 bg-gradient-to-l from-muted/20 to-transparent z-10"></div>
            </div>
          </div>
        </section>

        {/* FAQ SECTION - улучшенная версия с эффектами */}
        <section id="faq" className="py-24 max-w-7xl mx-auto px-4 relative scroll-mt-24">
          {/* Декоративные элементы фона */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
              animate={{ 
                x: [0, 30, 0],
                y: [0, -30, 0],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-40 right-20 w-72 h-72 rounded-full bg-indigo-500/5 blur-3xl"
              animate={{ 
                x: [0, -40, 0],
                y: [0, 40, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
          <div id="faq-content" className="text-center mb-16 relative">
            <motion.span 
              className="inline-block px-3 py-1 text-sm rounded-full border border-primary/20 bg-primary/5 text-primary/80 mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {language === 'en' ? 'Questions & Answers' : 
               language === 'ru' ? 'Вопросы и ответы' : 
               'Сұрақтар мен жауаптар'}
            </motion.span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90 leading-[1.3] py-2">
              {t('faq.title')}
            </h2>
            <p className="text-xl text-foreground/70 max-w-3xl mx-auto mb-12">
              {t('faq.subtitle')}
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {faqItems.map((item, index) => (
              <motion.div 
                key={index}
                className={`mb-6 overflow-hidden rounded-2xl transition-all duration-300 ${
                  openQuestion === index 
                    ? 'bg-card/70 backdrop-blur-sm border border-primary/20 shadow-lg shadow-primary/5' 
                    : 'bg-card/30 backdrop-blur-sm border border-border/10 dark:border-white/5 hover:border-primary/10'
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className={`w-full p-6 flex justify-between items-center text-left transition-all duration-300`}
                  onClick={() => toggleQuestion(index)}
                  aria-expanded={openQuestion === index}
                >
                  <h3 className="text-lg font-semibold text-foreground/90 dark:text-white/90">
                    {item.question}
                  </h3>
                  <motion.div
                    initial={false}
                    animate={{ 
                      rotate: openQuestion === index ? 180 : 0,
                      backgroundColor: openQuestion === index ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                    }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 text-primary p-1 rounded-full ${
                      openQuestion === index ? 'bg-primary/10' : ''
                    }`}
                  >
                    <ChevronDown className="h-6 w-6" />
                  </motion.div>
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ 
                    height: openQuestion === index ? 'auto' : 0,
                    opacity: openQuestion === index ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-foreground/70 dark:text-gray-300/80">
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ 
                        opacity: openQuestion === index ? 1 : 0,
                        y: openQuestion === index ? 0 : -10
                      }}
                      transition={{ delay: 0.1, duration: 0.3 }}
                    >
                      {item.answer}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="text-center mt-12 text-foreground/60 max-w-3xl mx-auto">
          
        </div>

      </main>
    </PublicPageLayout>
  );
}
