import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { 
  ArrowRight, Users2, Lightbulb, Heart, Trophy, Rocket, 
  ExternalLink, Github, Linkedin, Twitter, 
  Building, BookOpen, UserPlus, Star, Globe, Shield, CheckCircle2
} from "lucide-react";
import { useLocation } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { PublicPageLayout } from "@/components/layouts/PublicPageLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";
import { useToast } from "@/hooks/use-toast"; // Добавьте этот импорт
import { Toaster } from "@/components/ui/toaster"; // Добавьте этот импорт

export default function PublicAboutUs() {
  const { t, language } = useTranslations();
  const [, navigate] = useLocation();
  const { toast } = useToast(); // Добавьте эту строку
  const [isSubmitting, setIsSubmitting] = useState(false); // Добавьте эту строку

  const [isVisible, setIsVisible] = useState({
    mission: false,
    values: false,
    team: false,
    cta: false,
    contact: false
  });

  const [activeValue, setActiveValue] = useState<number | null>(null);
  
  // Refs for parallax effects
  const heroRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, 50]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut" 
      }
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const valueCardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: { 
      scale: 1.05, 
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)", 
      y: -10,
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.98 }
  };

  const teamMemberVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (i: number) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut"
      }
    }),
    hover: { 
      scale: 1.05,
      transition: { duration: 0.3 }
    }
  };

  // Floating animation for decorative elements
  const floatingAnimation = {
    y: ["-10px", "10px", "-10px"],
    transition: {
      duration: 4,
      ease: "easeInOut",
      repeat: Infinity,
    }
  };

  // Background shapes animation
  const shapeAnimation = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 0.5,
      transition: { 
        duration: 1, 
        ease: "easeOut" 
      }
    }
  };

  // Use Intersection Observer to detect when sections are visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setIsVisible(prev => ({ ...prev, [id]: true }));
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Observe each section
    const sections = ['mission', 'values', 'team', 'cta', 'contact'];
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

  const valuesData = [
    {
      icon: <Users2 className="w-8 h-8 text-primary" />,
      title: t('aboutUs.values.community.title'),
      description: t('aboutUs.values.community.description')
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-primary" />,
      title: t('aboutUs.values.innovation.title'),
      description: t('aboutUs.values.innovation.description')
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: t('aboutUs.values.inclusivity.title'),
      description: t('aboutUs.values.inclusivity.description')
    },
    {
      icon: <Trophy className="w-8 h-8 text-primary" />,
      title: t('aboutUs.values.excellence.title'),
      description: t('aboutUs.values.excellence.description')
    },
    {
      icon: <Rocket className="w-8 h-8 text-primary" />,
      title: t('aboutUs.values.growth.title'),
      description: t('aboutUs.values.growth.description')
    }
  ];

  const teamMembers = [
    {
      name: t('aboutUs.team.member1.name'),
      role: t('aboutUs.team.member1.role'),
      bio: t('aboutUs.team.member1.bio'),
      image: "/assets/team/member1.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
      socials: [
        { icon: <Linkedin className="w-4 h-4" />, link: "#" },
        { icon: <Twitter className="w-4 h-4" />, link: "#" },
        { icon: <Github className="w-4 h-4" />, link: "#" }
      ]
    },
    {
      name: t('aboutUs.team.member2.name'),
      role: t('aboutUs.team.member2.role'),
      bio: t('aboutUs.team.member2.bio'),
      image: "/assets/team/member2.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80",
      socials: [
        { icon: <Linkedin className="w-4 h-4" />, link: "#" },
        { icon: <Twitter className="w-4 h-4" />, link: "#" },
        { icon: <Github className="w-4 h-4" />, link: "#" }
      ]
    },
    {
      name: t('aboutUs.team.member3.name'),
      role: t('aboutUs.team.member3.role'),
      bio: t('aboutUs.team.member3.bio'),
      image: "/assets/team/member3.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80",
      socials: [
        { icon: <Linkedin className="w-4 h-4" />, link: "#" },
        { icon: <Twitter className="w-4 h-4" />, link: "#" },
        { icon: <Github className="w-4 h-4" />, link: "#" }
      ]
    },
    {
      name: t('aboutUs.team.member4.name'),
      role: t('aboutUs.team.member4.role'),
      bio: t('aboutUs.team.member4.bio'),
      image: "/assets/team/member4.jpg",
      fallbackImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80",
      socials: [
        { icon: <Linkedin className="w-4 h-4" />, link: "#" },
        { icon: <Twitter className="w-4 h-4" />, link: "#" },
        { icon: <Github className="w-4 h-4" />, link: "#" }
      ]
    }
  ];

  // Функция для плавной прокрутки
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 64;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      
      // Добавляем фокус на элемент после скролла для лучшей доступности
      setTimeout(() => {
        element.focus({ preventScroll: true });
        // Добавляем объявление для скринридеров
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.classList.add('sr-only');
        announcement.textContent = `Перешли к разделу ${element.getAttribute('aria-labelledby')}`;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
      }, 1000);
    }
  };

  // Хук для определения размера экрана
  const isMobile = useIsMobile();
  const isTablet = window.innerWidth < 1024;

  // Add a function to handle form submission
  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Сохраняем ссылку на форму сразу
    const form = e.currentTarget;
    
    setIsSubmitting(true);
    
    // Get form data
    const formData = new FormData(form);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };
    
    try {
      const apiUrl = `${window.location.origin}/api/db/contact`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          status: 'NEW',
        }),
      });
      
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        
        if (response.ok) {
          // Показываем успешное уведомление
          toast({
            title: language === 'ru' 
              ? 'Сообщение отправлено!' 
              : language === 'kz' 
                ? 'Хабарлама жіберілді!' 
                : 'Message sent!',
            description: language === 'ru' 
              ? 'Мы свяжемся с вами в ближайшее время.' 
              : language === 'kz' 
                ? 'Біз сізбен жақын арада байланысамыз.' 
                : 'We will contact you soon.',
            variant: "default",
          });
          
          // Очищаем форму используя сохраненную ссылку
          form.reset();
        } else {
          // Показываем уведомление об ошибке
          toast({
            title: language === 'ru' 
              ? 'Ошибка!' 
              : language === 'kz' 
                ? 'Қате!' 
                : 'Error!',
            description: language === 'ru' 
              ? (responseData && responseData.message) || 'Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз.' 
              : language === 'kz' 
                ? (responseData && responseData.message) || 'Хабарлама жіберу мүмкін болмады. Тағы жасап көріңіз.' 
                : (responseData && responseData.message) || 'Failed to send message. Please try again.',
            variant: "destructive",
          });
        }
      } else {
        const responseText = await response.text();
        throw new Error("Сервер вернул не JSON ответ");
      }
    } catch (error) {
      console.error("Исключение при отправке формы:", error);
      
      // Показываем уведомление об ошибке
      toast({
        title: language === 'ru' 
          ? 'Ошибка!' 
          : language === 'kz' 
            ? 'Қате!' 
            : 'Error!',
        description: language === 'ru' 
          ? 'Ошибка при отправке. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.' 
          : language === 'kz' 
            ? 'Жіберу кезінде қате орын алды. Кейінірек қайталап көріңіз немесе бізге телефон арқылы хабарласыңыз.' 
            : 'Error sending message. Please try again later or contact us by phone.',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PublicPageLayout>
      {/* Добавляем глобальные градиентные фоны как на главной странице */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-50">
        <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-br from-primary/5 via-transparent to-indigo-400/5 dark:from-primary/10 dark:via-transparent dark:to-indigo-400/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-tr from-blue-400/5 via-transparent to-primary/5 dark:from-blue-500/10 dark:via-transparent dark:to-primary/10 blur-3xl"></div>
      </div>
      
      <main className="relative overflow-hidden">
        {/* HERO SECTION с сохраненной кнопкой "Узнать нашу историю" */}
        <section 
          className={`min-h-[calc(100vh-4rem)] flex items-center justify-center ${isMobile ? 'pt-10 pb-16 px-4' : 'pt-16 pb-24 px-6'} relative`}
          aria-labelledby="hero-title"
          role="banner"
        >
          {/* Градиентные элементы */}
          <motion.div 
            className="absolute top-20 left-[10%] w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-primary/10 dark:from-indigo-400/20 dark:to-primary/20 blur-3xl -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.25, 0.2],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            aria-hidden="true"
          />
          <motion.div 
            className="absolute bottom-40 right-[15%] w-72 h-72 bg-gradient-to-r from-purple-500/5 to-blue-500/5 dark:from-purple-500/15 dark:to-blue-500/15 blur-3xl -z-10"
            animate={{
              scale: [1.1, 0.9, 1.1],
              opacity: [0.25, 0.3, 0.25],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Плавающие иконки - расположены шире от текста */}
          <motion.div 
            className="absolute top-[15%] left-[15%] text-primary/30 z-0"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 10, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Building className="w-16 h-16" />
          </motion.div>
          
          <motion.div
            className="absolute top-[25%] right-[15%] text-indigo-600/30 z-0"
            animate={{ 
              y: [0, 15, 0],
              x: [0, -10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Star className="w-12 h-12" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-[25%] left-[12%] text-blue-500/30 z-0"
            animate={{ 
              y: [0, 10, 0],
              x: [0, -5, 0],
              rotate: [0, 8, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Globe className="w-14 h-14" />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-[20%] right-[12%] text-purple-500/30 z-0"
            animate={{
              y: [0, -8, 0],
              x: [0, 5, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Shield className="w-10 h-10" />
          </motion.div>

            <motion.div
            className="absolute top-[35%] left-[10%] text-indigo-500/30 z-0"
            animate={{
              y: [0, 18, 0],
              x: [0, -10, 0],
              rotate: [0, 15, 0]
            }}
            transition={{
              duration: 10.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Lightbulb className="w-12 h-12" />
            </motion.div>
            
          <motion.div 
            className="absolute top-[45%] right-[10%] text-primary/30 z-0"
            animate={{
              y: [0, -14, 0],
              x: [0, -7, 0],
              rotate: [0, 8, 0]
            }}
            transition={{
              duration: 9.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Trophy className="w-10 h-10" />
          </motion.div>

          <motion.div 
            className="absolute bottom-[12%] left-[20%] text-primary/30 z-0"
            animate={{
              y: [0, 16, 0],
              x: [0, 9, 0],
              rotate: [0, -12, 0]
            }}
            transition={{
              duration: 11.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Users2 className="w-13 h-13" />
          </motion.div>

          {/* Hero content */}
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.h1 
              id="hero-title"
              className="text-5xl md:text-6xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90 dark:from-primary/95 dark:to-indigo-400/95 leading-relaxed pb-2 pt-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {language === 'en' ? t('aboutUs.title') : 
               language === 'ru' ? 'О нас' : 
               'Біз туралы'}
            </motion.h1>
            <motion.p 
              className={`${isMobile ? 'text-lg' : 'text-xl md:text-2xl'} mb-10 md:mb-14 max-w-2xl mx-auto text-foreground/80 dark:text-foreground/90 px-4`}
            >
              {language === 'en' ? t('aboutUs.subtitle') : 
               language === 'ru' ? 'Знакомьтесь с командой, создающей вашу образовательную платформу' : 
               'Сіздің білім беру платформаңызды құратын командамен танысыңыз'}
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  className={`rounded-full ${isMobile ? 'px-6 py-4 text-base' : 'px-8 py-6 text-lg'} bg-card border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-500 shadow-lg`}
                  onClick={() => scrollToSection('mission')}
                  aria-label={language === 'en' ? 'Discover our story section' : 
                            language === 'ru' ? 'Перейти к разделу о нашей истории' : 
                            'Біздің тарихымыз бөліміне өту'}
                  aria-controls="mission"
                >
                  <span className="flex items-center">
                    {language === 'en' ? 'Discover Our Story' : 
                     language === 'ru' ? 'Узнать нашу историю' : 
                     'Біздің тарихымызбен танысу'}
                    <motion.span aria-hidden="true">
                      <ArrowRight className={`ml-2 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                    </motion.span>
                  </span>
              </Button>
            </motion.div>
          </motion.div>
          </div>
        </section>
        {/* Our Mission Section - улучшенная версия */}
        <section 
          id="mission" 
          className="min-h-screen py-24 flex items-center relative overflow-hidden"
          aria-labelledby="mission-title"
        >
          {/* Улучшенные декоративные элементы фона */}
          <div className="absolute top-1/3 left-1/6 w-72 h-72 bg-gradient-to-br from-primary/10 to-indigo-500/5 dark:from-primary/15 dark:to-indigo-500/10 blur-3xl opacity-60 rounded-full animate-pulse" style={{ animationDuration: '10s' }} aria-hidden="true" />
          <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-tr from-blue-500/5 to-purple-500/10 dark:from-blue-500/15 dark:to-purple-500/15 blur-3xl opacity-60 rounded-full animate-pulse" style={{ animationDuration: '12s' }} aria-hidden="true" />
          
          <div className="container mx-auto px-4 max-w-7xl">
            {isVisible.mission && (
              <motion.div 
                className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <div className="space-y-6">
                    <h2 
                      id="mission-title"
                      className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90 leading-tight"
                    >
                      {language === 'ru' ? 'Наша миссия' : language === 'kz' ? 'Біздің миссиямыз' : 'Our Mission'}
                    </h2>
                    
                    <motion.div 
                      className="bg-card/60 dark:bg-gray-800/40 backdrop-blur-sm border border-border/10 dark:border-white/5 rounded-xl p-8 shadow-xl"
                      whileHover={{ boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.1)" }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.p 
                        className="text-lg mb-6 text-foreground/90 dark:text-foreground/95 leading-relaxed"
                        variants={fadeInVariants}
                      >
                        {language === 'ru' 
                          ? 'Мы создаем образовательную платформу, где каждый студент находит свой путь к профессиональному успеху в единой экосистеме образования и карьерных возможностей.' 
                          : language === 'kz'
                          ? 'Біз әрбір студент білім беру мен мансаптық мүмкіндіктердің бірыңғай экожүйесінде кәсіби жетістікке жету жолын табатын білім беру платформасын құрамыз.'
                          : 'We are creating an educational platform where every student finds their path to professional success in a unified ecosystem of education and career opportunities.'}
                      </motion.p>
                      
                      <motion.p 
                        className="text-base mb-8 text-foreground/80 dark:text-foreground/85"
                        variants={fadeInVariants}
                      >
                        {language === 'ru' 
                          ? 'Наша цель — сделать качественное образование доступным для всех, соединяя людей с лучшими преподавателями и открывая двери к возможностям трудоустройства в ведущих компаниях.' 
                          : language === 'kz'
                          ? 'Біздің мақсатымыз — адамдарды үздік оқытушылармен байланыстыру және жетекші компанияларда жұмысқа орналасу мүмкіндіктеріне жол ашу арқылы сапалы білімді бәріне қолжетімді ету.'
                          : 'Our goal is to make quality education accessible to everyone by connecting people with the best teachers and opening doors to employment opportunities at leading companies.'}
                      </motion.p>
                      
                      {/* Улучшенные иконки с более лаконичными описаниями */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                        <motion.div 
                          className="flex flex-col items-center text-center p-5 bg-background/40 backdrop-blur-sm rounded-lg border border-border/5 hover:shadow-md transition-all duration-300"
                          whileHover={{ y: -5, backgroundColor: "rgba(var(--background), 0.6)" }}
                        >
                          <div className="mb-4 p-3 bg-primary/10 rounded-full">
                            <BookOpen className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2">
                            {language === 'ru' ? 'Образование' : language === 'kz' ? 'Білім' : 'Education'}
                          </h3>
                          <p className="text-sm text-foreground/70">
                            {language === 'ru' ? 'Современные программы обучения от ведущих экспертов' : language === 'kz' ? 'Жетекші сарапшылардан заманауи оқыту бағдарламалары' : 'Modern learning programs from leading experts'}
                          </p>
                        </motion.div>
                        
                        <motion.div 
                          className="flex flex-col items-center text-center p-5 bg-background/40 backdrop-blur-sm rounded-lg border border-border/5 hover:shadow-md transition-all duration-300"
                          whileHover={{ y: -5, backgroundColor: "rgba(var(--background), 0.6)" }}
                        >
                          <div className="mb-4 p-3 bg-primary/10 rounded-full">
                            <UserPlus className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2">
                            {language === 'ru' ? 'Менторство' : language === 'kz' ? 'Тәлімгерлік' : 'Mentorship'}
                          </h3>
                          <p className="text-sm text-foreground/70">
                            {language === 'ru' ? 'Персональная поддержка и руководство от опытных специалистов' : language === 'kz' ? 'Тәжірибелі мамандардан жеке қолдау және басшылық' : 'Personal support and guidance from experienced professionals'}
                          </p>
                        </motion.div>
                        
                        <motion.div 
                          className="flex flex-col items-center text-center p-5 bg-background/40 backdrop-blur-sm rounded-lg border border-border/5 hover:shadow-md transition-all duration-300"
                          whileHover={{ y: -5, backgroundColor: "rgba(var(--background), 0.6)" }}
                        >
                          <div className="mb-4 p-3 bg-primary/10 rounded-full">
                            <Users2 className="w-8 h-8 text-primary" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2">
                            {language === 'ru' ? 'Сообщество' : language === 'kz' ? 'Қауымдастық' : 'Community'}
                          </h3>
                          <p className="text-sm text-foreground/70">
                            {language === 'ru' ? 'Активная среда для профессионального роста и обмена опытом' : language === 'kz' ? 'Кәсіби өсу және тәжірибе алмасу үшін белсенді орта' : 'Active environment for professional growth and experience sharing'}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
                
                {/* Правая часть с улучшенным изображением */}
                <motion.div 
                  className="relative"
                  variants={itemVariants}
                >
                  {/* Основное изображение */}
                  <motion.div 
                    className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-border/10"
                    whileHover={{ scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                    transition={{ duration: 0.4 }}
                  >
                    <img 
                      src="/assets/about/mission.jpg" 
                      alt={language === 'ru' ? 'Студенты на платформе' : language === 'kz' ? 'Платформадағы студенттер' : 'Students on the platform'}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
                      }}
                    />
                    
                    {/* Улучшенный оверлей с градиентом */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex items-end">
                      <div className="p-6 text-white">
                        <h3 className="text-2xl font-semibold">
                          {language === 'ru' ? 'Образование без границ' : language === 'kz' ? 'Шексіз білім беру' : 'Education Without Boundaries'}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                  
                  {/* Улучшенные плавающие иконки/элементы */}
                  <motion.div 
                    className="absolute -bottom-4 -left-4 p-4 bg-background rounded-xl shadow-xl z-20 border border-border/10"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-3">
                      <Lightbulb className="w-6 h-6 text-primary" />
                      <div>
                        <div className="text-sm font-medium">
                          {language === 'ru' ? '150+' : language === 'kz' ? '150+' : '150+'}
                        </div>
                        <div className="text-xs text-foreground/60">
                          {language === 'ru' ? 'Курсов' : language === 'kz' ? 'Курстар' : 'Courses'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute top-10 -right-4 p-4 bg-background rounded-xl shadow-xl z-20 border border-border/10"
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="flex items-center gap-3">
                      <Rocket className="w-6 h-6 text-indigo-500" />
                      <div>
                        <div className="text-sm font-medium">
                          {language === 'ru' ? '98%' : language === 'kz' ? '98%' : '98%'}
                        </div>
                        <div className="text-xs text-foreground/60">
                          {language === 'ru' ? 'Трудоустройство' : language === 'kz' ? 'Жұмысқа орналастыру' : 'Employment rate'}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </section>

        {/* Our Values Section - улучшенная версия с 6 ценностями */}
        <section 
          id="values" 
          className="py-16 md:py-20 relative"
          aria-labelledby="values-title"
        >
          {/* Один простой фоновый элемент */}
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-primary/5 to-indigo-500/5 dark:from-primary/10 dark:to-indigo-500/10 blur-3xl opacity-50" />
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative">
            <div className="text-center mb-12">
              <motion.span 
                className="inline-block px-3 py-1 text-sm rounded-full border border-primary/20 bg-primary/5 text-primary/80 mb-4"
                aria-hidden="true"
              >
                {language === 'en' ? t('aboutUs.values.subtitle') : 
                 language === 'ru' ? 'Принципы, которые нас направляют' : 
                 'Бізді бағыттайтын қағидаттар'}
              </motion.span>
              
              <motion.h2 
                id="values-title"
                className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-4xl'} font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90`}
                style={{ textShadow: "0 1px 1px rgba(0,0,0,0.1)" }}
                >
                  {language === 'en' ? t('aboutUs.values.title') : 
                   language === 'ru' ? 'Наши ценности' : 
                 'Біздің құндылықтарымыз'}
              </motion.h2>
              
              <motion.p className="text-lg max-w-3xl mx-auto text-foreground/85 mb-10">
                {language === 'en' ? t('aboutUs.values.description') : 
                 language === 'ru' ? 'Эти фундаментальные принципы определяют наш подход к созданию образовательной платформы, которая вдохновляет и поддерживает.' : 
                 'Бұл негізгі қағидаттар шабыттандыратын және қолдайтын білім беру платформасын құру тәсілімізді анықтайды.'}
              </motion.p>
            </div>
            
            {isVisible.values && (
              <div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
                role="list"
                aria-label={language === 'ru' ? 'Список наших ценностей' : language === 'kz' ? 'Біздің құндылықтар тізімі' : 'List of our values'}
              >
                {/* 1. Сообщество */}
                <motion.div 
                  className="bg-card/80 dark:bg-gray-800/40 backdrop-blur-sm border border-border/10 dark:border-white/5 rounded-lg p-5 hover:shadow-md transition-all duration-300"
                  custom={0}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: (i) => ({
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: i * 0.1,
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    })
                  }}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="flex items-center mb-3">
                    <div className="mr-3 p-2 rounded-md bg-primary/10 dark:bg-primary/20 text-primary" aria-hidden="true">
                      <Users2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground/90 dark:text-white/90">
                      {language === 'ru' ? 'Сообщество' : language === 'kz' ? 'Қауымдастық' : 'Community'}
                    </h3>
                  </div>
                  
                  <p className="text-foreground/80 dark:text-gray-300/85 leading-relaxed text-sm">
                    {language === 'ru' 
                      ? 'Мы верим в силу сообщества и взаимной поддержки в образовательном процессе.'
                      : language === 'kz'
                      ? 'Біз қауымдастықтың күшіне және білім беру процесіндегі өзара қолдауға сенеміз.'
                      : 'We believe in the power of community and mutual support in the educational process.'}
                  </p>
                </motion.div>

                {/* 2. Инновации */}
                    <motion.div 
                  className="bg-card/80 dark:bg-gray-800/40 backdrop-blur-sm border border-border/10 dark:border-white/5 rounded-lg p-5 hover:shadow-md transition-all duration-300"
                  custom={1}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: (i) => ({
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: i * 0.1,
                            duration: 0.5,
                            ease: "easeOut"
                          }
                        })
                      }}
                      initial="hidden"
                      animate="visible"
                      whileHover={{ y: -5, transition: { duration: 0.3 } }}
                    >
                  <div className="flex items-center mb-3">
                    <div className="mr-3 p-2 rounded-md bg-primary/10 dark:bg-primary/20 text-primary" aria-hidden="true">
                      <Lightbulb className="w-6 h-6" />
                        </div>
                    <h3 className="text-lg font-bold text-foreground/90 dark:text-white/90">
                      {language === 'ru' ? 'Инновации' : language === 'kz' ? 'Инновациялар' : 'Innovation'}
                        </h3>
                      </div>
                      
                  <p className="text-foreground/80 dark:text-gray-300/85 leading-relaxed text-sm">
                    {language === 'ru'
                      ? 'Постоянный поиск новых подходов к обучению для максимальной эффективности.'
                      : language === 'kz'
                      ? 'Максималды тиімділік үшін оқытудың жаңа тәсілдерін үнемі іздеу.'
                      : 'Constantly searching for new approaches to learning for maximum effectiveness.'}
                      </p>
                    </motion.div>

                {/* 3. Инклюзивность */}
                <motion.div 
                  className="bg-card/80 dark:bg-gray-800/40 backdrop-blur-sm border border-border/10 dark:border-white/5 rounded-lg p-5 hover:shadow-md transition-all duration-300"
                  custom={2}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: (i) => ({
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: i * 0.1,
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    })
                  }}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="flex items-center mb-3">
                    <div className="mr-3 p-2 rounded-md bg-primary/10 dark:bg-primary/20 text-primary" aria-hidden="true">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground/90 dark:text-white/90">
                      {language === 'ru' ? 'Инклюзивность' : language === 'kz' ? 'Инклюзивтілік' : 'Inclusivity'}
                    </h3>
                  </div>
                  
                  <p className="text-foreground/80 dark:text-gray-300/85 leading-relaxed text-sm">
                    {language === 'ru'
                      ? 'Доступное образование для всех, независимо от местоположения и начального уровня.'
                      : language === 'kz'
                      ? 'Географиялық орналасуы мен бастапқы деңгейіне қарамастан, барлығына қолжетімді білім.'
                      : 'Accessible education for everyone, regardless of location and starting level.'}
                  </p>
                </motion.div>

                {/* 4. Качество */}
                <motion.div 
                  className="bg-card/80 dark:bg-gray-800/40 backdrop-blur-sm border border-border/10 dark:border-white/5 rounded-lg p-5 hover:shadow-md transition-all duration-300"
                  custom={3}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: (i) => ({
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: i * 0.1,
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    })
                  }}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="flex items-center mb-3">
                    <div className="mr-3 p-2 rounded-md bg-primary/10 dark:bg-primary/20 text-primary" aria-hidden="true">
                      <Trophy className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground/90 dark:text-white/90">
                      {language === 'ru' ? 'Качество' : language === 'kz' ? 'Сапа' : 'Excellence'}
                    </h3>
                  </div>
                  
                  <p className="text-foreground/80 dark:text-gray-300/85 leading-relaxed text-sm">
                    {language === 'ru'
                      ? 'Высочайшие стандарты во всем — от обучающих материалов до технической поддержки.'
                      : language === 'kz'
                      ? 'Оқу материалдарынан бастап техникалық қолдауға дейін барлық нәрседе ең жоғары стандарттар.'
                      : 'Highest standards in everything — from learning materials to technical support.'}
                  </p>
                </motion.div>

                {/* 5. Развитие */}
                <motion.div 
                  className="bg-card/80 dark:bg-gray-800/40 backdrop-blur-sm border border-border/10 dark:border-white/5 rounded-lg p-5 hover:shadow-md transition-all duration-300"
                  custom={4}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: (i) => ({
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: i * 0.1,
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    })
                  }}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="flex items-center mb-3">
                    <div className="mr-3 p-2 rounded-md bg-primary/10 dark:bg-primary/20 text-primary" aria-hidden="true">
                      <Rocket className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground/90 dark:text-white/90">
                      {language === 'ru' ? 'Развитие' : language === 'kz' ? 'Даму' : 'Growth'}
                    </h3>
                  </div>
                  
                  <p className="text-foreground/80 dark:text-gray-300/85 leading-relaxed text-sm">
                    {language === 'ru'
                      ? 'Постоянное совершенствование платформы и образовательных методик.'
                      : language === 'kz'
                      ? 'Платформа мен білім беру әдістемелерін үнемі жетілдіру.'
                      : 'Continuous improvement of the platform and educational methodologies.'}
                  </p>
                </motion.div>

                {/* 6. Адаптивность */}
                <motion.div 
                  className="bg-card/80 dark:bg-gray-800/40 backdrop-blur-sm border border-border/10 dark:border-white/5 rounded-lg p-5 hover:shadow-md transition-all duration-300"
                  custom={5}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: (i) => ({
                      opacity: 1,
                      y: 0,
                      transition: {
                        delay: i * 0.1,
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    })
                  }}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  <div className="flex items-center mb-3">
                    <div className="mr-3 p-2 rounded-md bg-primary/10 dark:bg-primary/20 text-primary" aria-hidden="true">
                      <Globe className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground/90 dark:text-white/90">
                      {language === 'ru' ? 'Адаптивность' : language === 'kz' ? 'Бейімделгіштік' : 'Adaptability'}
                    </h3>
                  </div>
                  
                  <p className="text-foreground/80 dark:text-gray-300/85 leading-relaxed text-sm">
                    {language === 'ru'
                      ? 'Гибкий подход к обучению, учитывающий индивидуальные потребности каждого студента.'
                      : language === 'kz'
                      ? 'Әрбір студенттің жеке қажеттіліктерін ескеретін оқытудың икемді тәсілі.'
                      : 'Flexible approach to learning that takes into account the individual needs of each student.'}
                  </p>
                </motion.div>
              </div>
          )}
        </div>
      </section>

        {/* Our Team Section */}
        <section id="team" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <motion.span 
                className="inline-block px-3 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary mb-4"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isVisible.team ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5 }}
              >
                {language === 'en' ? t('aboutUs.team.subtitle') : 
                 language === 'ru' ? 'Познакомьтесь с нами' : 
                 t('aboutUs.team.subtitle')}
              </motion.span>
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible.team ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {language === 'en' ? t('aboutUs.team.title') : 
                   language === 'ru' ? 'Наша команда' : 
                   t('aboutUs.team.title')}
              </motion.h2>
              <motion.p 
                className="text-lg max-w-3xl mx-auto text-foreground/80"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible.team ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {language === 'en' ? t('aboutUs.team.description') : 
                 language === 'ru' ? 'Талантливые профессионалы, объединенные единой миссией создания лучшей образовательной платформы.' : 
                 t('aboutUs.team.description')}
              </motion.p>
            </div>
            
            {isVisible.team && (
              isMobile ? (
                <div className="flex overflow-x-auto pb-6 snap-x snap-mandatory no-scrollbar">
                  {teamMembers.map((member, i) => (
                    <div 
                      key={i}
                      className="snap-center flex-shrink-0 w-[85%] mr-4 group relative overflow-hidden rounded-2xl"
                    >
                      <div className="relative overflow-hidden h-64">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = member.fallbackImage;
                          }}
                        />
                        
                        {/* Social links */}
                        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                          {member.socials.map((social, j) => (
                            <a 
                              key={j}
                                href={social.link}
                              className="bg-background/90 text-foreground p-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                              target="_blank"
                              rel="noopener noreferrer"
                              >
                                {social.icon}
                            </a>
                            ))}
                        </div>
                      </div>
                      
                      {/* Member details */}
                      <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-xl font-bold">{member.name}</h3>
                        <p className="text-primary font-medium mb-3">{member.role}</p>
                        <p className="text-foreground/70 text-sm flex-grow">{member.bio}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
              <motion.div 
                className="flex flex-wrap justify-center gap-x-8 gap-y-16"
                variants={staggerContainerVariants}
                initial="hidden"
                animate="visible"
              >
                {teamMembers.map((member, i) => (
                  <motion.div 
                    key={i}
                    className="group relative overflow-hidden rounded-2xl bg-card dark:bg-gray-800/60 border border-border/40 dark:border-white/5 transition-all duration-300 h-full flex flex-col dark:shadow-lg dark:shadow-primary/5 w-64"
                    custom={i}
                    variants={teamMemberVariants}
                    whileHover="hover"
                  >
                    <div className="relative overflow-hidden h-64">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = member.fallbackImage;
                        }}
                      />
                      
                      {/* Social links */}
                      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                        {member.socials.map((social, j) => (
                          <a 
                            key={j}
                              href={social.link}
                            className="bg-background/90 text-foreground p-2 rounded-full hover:bg-primary hover:text-white transition-colors duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                            >
                              {social.icon}
                          </a>
                          ))}
                      </div>
                    </div>
                    
                    {/* Member details */}
                    <div className="p-5 flex-grow flex flex-col">
                      <h3 className="text-xl font-bold">{member.name}</h3>
                      <p className="text-primary font-medium mb-3">{member.role}</p>
                      <p className="text-foreground/70 text-sm flex-grow">{member.bio}</p>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
              )
          )}
        </div>
      </section>
      
      {/* CTA Section */}
        <section id="cta" className="py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className={`border border-primary/10 rounded-3xl bg-card/60 backdrop-blur-xl ${isMobile ? 'p-6' : 'p-12'} shadow-md`}>
        <motion.div
                className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
                animate={isVisible.cta ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <motion.h2 
                  className={`${isMobile ? 'text-2xl' : 'text-3xl md:text-5xl'} font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90`}
                >
                  {language === 'ru' ? 'Присоединяйтесь к нам сегодня' : 
                   language === 'kz' ? 'Бүгін бізге қосылыңыз' : 
                   'Join Us Today'}
                </motion.h2>
                <motion.p 
                  className="text-xl text-foreground/70 mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible.cta ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {language === 'ru' 
                    ? 'Начните свой образовательный путь с Portfol.IO и откройте новые возможности для своего будущего.' 
                    : language === 'kz' 
                    ? 'Portfol.IO-мен білім беру жолыңызды бастаңыз және болашағыңыз үшін жаңа мүмкіндіктерді ашыңыз.' 
                    : 'Start your educational journey with Portfol.IO and unlock new opportunities for your future.'}
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible.cta ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button 
                    size={isMobile ? "default" : "lg"} 
                    className={`rounded-full ${isMobile ? 'px-6 py-4' : 'px-8 py-6 text-lg'} bg-gradient-to-r from-primary/90 to-indigo-600/90 hover:from-primary/80 hover:to-indigo-600/80 shadow-lg hover:shadow-primary/10 text-white transition-all duration-500`}
                    onClick={() => navigate('/register')}
                  >
                    {language === 'ru' ? 'Зарегистрироваться' : 
                     language === 'kz' ? 'Тіркелу' : 
                     'Register Now'}
                  </Button>
                </motion.div>
                
                {/* Stats counter - используем существующие переводы через t() */}
                <motion.div 
                  className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  animate={isVisible.cta ? { opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: 0.5 }}
                >
                  <motion.div 
                    className="p-4 rounded-lg bg-background/30 backdrop-blur-sm border border-border/10"
                    whileHover={{ y: -3, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.05)", transition: { duration: 0.4 } }}
                  >
                    <div className="text-4xl font-bold text-primary/90 mb-1">5000+</div>
                    <div className="text-sm text-foreground/60">{t('aboutUs.cta.stat1')}</div>
                  </motion.div>
                  <motion.div 
                    className="p-4 rounded-lg bg-background/30 backdrop-blur-sm border border-border/10"
                    whileHover={{ y: -3, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.05)", transition: { duration: 0.4 } }}
                  >
                    <div className="text-4xl font-bold text-primary/90 mb-1">200+</div>
                    <div className="text-sm text-foreground/60">{t('aboutUs.cta.stat2')}</div>
                  </motion.div>
                  <motion.div 
                    className="p-4 rounded-lg bg-background/30 backdrop-blur-sm border border-border/10"
                    whileHover={{ y: -3, boxShadow: "0 10px 20px -5px rgba(0, 0, 0, 0.05)", transition: { duration: 0.4 } }}
                  >
                    <div className="text-4xl font-bold text-primary/90 mb-1">98%</div>
                    <div className="text-sm text-foreground/60">{t('aboutUs.cta.stat3')}</div>
                  </motion.div>
                </motion.div>
            </motion.div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-24 pb-32 relative overflow-hidden">
          {/* Фоновые эффекты */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-br from-primary/20 via-transparent to-indigo-500/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative mb-12">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-3 py-1 text-sm rounded-full border border-primary/20 bg-primary/5 text-primary/80 mb-4">
                {language === 'ru' ? 'Свяжитесь с нами' : language === 'kz' ? 'Бізбен байланысыңыз' : 'Get in touch'}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90">
                {language === 'ru' ? 'Напишите нам' : language === 'kz' ? 'Бізге жазыңыз' : 'Write to us'}
              </h2>
              <p className="text-lg max-w-2xl mx-auto text-foreground/70">
                {language === 'ru' 
                  ? 'Мы ценим ваше мнение и готовы ответить на все вопросы.'
                  : language === 'kz'
                  ? 'Біз сіздің пікіріңізді бағалаймыз және барлық сұрақтарға жауап беруге дайынбыз.'
                  : 'We value your opinion and are ready to answer all your questions.'}
              </p>
            </motion.div>

            <div className="bg-card/30 backdrop-blur-md border border-border/10 rounded-xl p-6 lg:p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Левая колонка - информация */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-foreground/90">
                    {language === 'ru' ? 'Контакты' : language === 'kz' ? 'Байланыстар' : 'Contacts'}
                  </h3>
                  
                  <div className="space-y-5 mb-8">
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center mr-3 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                        </svg>
                      </div>
                      <p className="text-foreground/80">+7 (800) 123-45-67</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center mr-3 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757Zm3.436-.586L16 11.801V4.697l-5.803 3.546Z"/>
                        </svg>
                      </div>
                      <p className="text-foreground/80">info@portfol.io</p>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 flex items-center justify-center mr-3 text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                        </svg>
                      </div>
                      <p className="text-foreground/80">
                        {language === 'ru' 
                          ? 'г. Москва, ул. Примерная, 123'
                          : language === 'kz'
                          ? 'Мәскеу қ., Примерная к-сі, 123 үй'
                          : '123 Sample St., Moscow'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/10 dark:border-white/5">
                    <h4 className="text-sm font-medium text-foreground/70 mb-4">
                      {language === 'ru' ? 'Мы в соцсетях' : language === 'kz' ? 'Әлеуметтік желілерде' : 'Follow us'}
                    </h4>
                    <div className="flex space-x-3">
                      <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-background/50 border border-border/20 text-primary hover:bg-primary/10 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-background/50 border border-border/20 text-primary hover:bg-primary/10 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-background/50 border border-border/20 text-primary hover:bg-primary/10 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                        </svg>
                      </a>
                      <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-background/50 border border-border/20 text-primary hover:bg-primary/10 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>

                {/* Правая колонка - форма */}
                <div>
                  <form className="space-y-5" onSubmit={handleContactSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                          </svg>
                        </div>
                        <input 
                          type="text" 
                          id="name" 
                          name="name" 
                          placeholder={language === 'ru' ? 'Имя' : language === 'kz' ? 'Аты' : 'Name'}
                          className="w-full pl-11 pr-4 py-2.5 bg-background/70 border border-border/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      
                      {/* Поле Email с исправленной иконкой */}
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-primary">
                          {/* Новая иконка Email */}
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                          </svg>
                        </div>
                        <input 
                          type="email" 
                          id="email" 
                          name="email" 
                          placeholder={language === 'ru' ? 'Email' : language === 'kz' ? 'Email' : 'Email'}
                          className="w-full pl-11 pr-4 py-2.5 bg-background/70 border border-border/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                        </svg>
                      </div>
                      <input 
                        type="tel" 
                        id="phone" 
                        name="phone" 
                        placeholder={language === 'ru' ? 'Телефон' : language === 'kz' ? 'Телефон' : 'Phone'}
                        className="w-full pl-11 pr-4 py-2.5 bg-background/70 border border-border/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                      />
                    </div>
                    
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                      </div>
                      <select 
                        id="subject" 
                        name="subject"
                        className="w-full pl-11 pr-4 py-2.5 bg-background/70 border border-border/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                        required
                        defaultValue="" // Исправлено: добавлен defaultValue вместо selected
                      >
                        <option value="" disabled>
                          {language === 'ru' ? 'Выберите тему' : language === 'kz' ? 'Тақырыпты таңдаңыз' : 'Select a subject'}
                        </option>
                        <option value="feedback">
                          {language === 'ru' ? 'Отзыв о платформе' : language === 'kz' ? 'Платформа туралы пікір' : 'Platform feedback'}
                        </option>
                        <option value="question">
                          {language === 'ru' ? 'Вопрос о курсах' : language === 'kz' ? 'Курстар туралы сұрақ' : 'Course inquiry'}
                        </option>
                        <option value="cooperation">
                          {language === 'ru' ? 'Сотрудничество' : language === 'kz' ? 'Ынтымақтастық' : 'Cooperation'}
                        </option>
                        <option value="other">
                          {language === 'ru' ? 'Другое' : language === 'kz' ? 'Басқа' : 'Other'}
                        </option>
                      </select>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute top-3 left-0 flex items-start pl-3.5 pointer-events-none text-primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 15c4.418 0 8-3.134 8-7s-3.582-7-8-7-8 3.134-8 7c0 1.76.743 3.37 1.97 4.6-.097 1.016-.417 2.13-.771 2.966-.079.186.074.394.273.362 2.256-.37 3.597-.938 4.18-1.394A9.06 9.06 0 0 0 8 15z"/>
                        </svg>
                      </div>
                      <textarea 
                        id="message" 
                        name="message" 
                        rows={4}
                        placeholder={language === 'ru' ? 'Ваше сообщение...' : language === 'kz' ? 'Хабарламаңыз...' : 'Your message...'}
                        className="w-full pl-11 pr-4 py-2.5 bg-background/70 border border-border/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all resize-none"
                        required
                      ></textarea>
                    </div>
                    
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="privacy" 
                        name="privacy" 
                        className="w-4 h-4 text-primary focus:ring-primary/40 border-border/30 rounded"
                        required
                      />
                      <label htmlFor="privacy" className="ml-2 text-xs text-foreground/70">
                        {language === 'ru' 
                          ? 'Я согласен с политикой конфиденциальности'
                          : language === 'kz'
                          ? 'Мен құпиялылық саясатымен келісемін'
                          : 'I agree with the privacy policy'}
                      </label>
                    </div>
                    
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        type="submit"
                        className="w-full rounded-lg py-2.5 text-base bg-gradient-to-r from-primary/90 to-indigo-600/90 hover:from-primary hover:to-indigo-600 shadow-md hover:shadow-lg transition-all duration-300 text-white font-medium"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            {language === 'ru' ? 'Отправка...' : language === 'kz' ? 'Жіберілуде...' : 'Sending...'}
                          </span>
                        ) : (
                          language === 'ru' ? 'Отправить' : language === 'kz' ? 'Жіберу' : 'Send message'
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Добавьте компонент Toaster */}
      <Toaster />
    </PublicPageLayout>
  );
} 