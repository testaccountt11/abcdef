import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { 
  ArrowRight, Users2, Lightbulb, Heart, Trophy, Rocket, 
  ExternalLink, Github, Linkedin, Twitter, 
  Building, BookOpen, UserPlus, Star, Globe, Shield, CheckCircle2, Code, PenTool, GraduationCap, Medal
} from "lucide-react";
import { useLocation } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { PublicPageLayout } from "@/components/layouts/PublicPageLayout";
import { useIsMobile } from "@/hooks/use-mobile";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function PublicAboutUs() {
  const { t, language } = useTranslations();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Test toast on component mount
  React.useEffect(() => {
    // Short delay to ensure component is fully mounted
    const timer = setTimeout(() => {
      toast({
        title: "Тестовое уведомление",
        description: "Система уведомлений работает корректно",
        variant: "default",
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  const [isVisible, setIsVisible] = useState({
    mission: false,
    values: false,
    team: false,
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
    const sections = ['mission', 'values', 'team', 'contact'];
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
      name: 'Мақажан Маусымжан',
      role: language === 'ru' ? 'Основатель проекта' : language === 'kz' ? 'Жоба негізін қалаушы' : 'Project Founder',
      image: '/src/img/founder.jpg', // Обновленный путь
      // fallbackImage: '/src/img/founder.jpg', // Обновленный путь
      bio: language === 'ru' 
        ? 'Талантливый разработчик с опытом создания веб-платформ и успешной реализацией онлайн-магазина.' 
        : language === 'kz' 
        ? 'Веб-платформалар әзірлеу тәжірибесі бар және онлайн дүкен жобасын сәтті жүзеге асырды.' 
        : 'Talented developer with experience in creating web platforms and successfully implementing an online store project.',
      education: language === 'ru'
        ? 'Колледж "Astana IT University", специализация: Программное обеспечение (06130100)'
        : language === 'kz'
        ? '"Astana IT University" ЖШС Колледжі, мамандығы: Бағдарламалық қамтамасыз ету (06130100)'
        : 'Astana IT University College, specialization: Software Development (06130100)',
      qualities: [
        language === 'ru' ? 'Креативность' : language === 'kz' ? 'Шығармашылық' : 'Creativity',
        language === 'ru' ? 'Целеустремленность' : language === 'kz' ? 'Мақсаттылық' : 'Purposefulness',
        language === 'ru' ? 'Адаптивность' : language === 'kz' ? 'Бейімделгіштік' : 'Adaptability',
        language === 'ru' ? 'Лидерство' : language === 'kz' ? 'Көшбасшылық' : 'Leadership',
        language === 'ru' ? 'Ответственность' : language === 'kz' ? 'Жауапкершілік' : 'Responsibility'
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
    console.log('Form submitted');
    
    // Show immediate toast to confirm toast system works
    toast({
      title: "Форма отправляется...",
      description: "Пожалуйста, подождите",
      variant: "default",
    });
    
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
    
    console.log('Form data:', data);
    
    try {
      const apiUrl = `${window.location.origin}/api/db/contact`;
      console.log('Submitting form to:', apiUrl);
      
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
      
      console.log('Response status:', response.status);
      
      // Check if the response is successful (status code 2xx)
        if (response.ok) {
        // Success - Clear form and show success toast
        console.log('Form submitted successfully');
        form.reset();
        
        // Show success toast notification
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
          
        // Add a direct DOM message as a backup
        const formContainer = form.parentElement;
        if (formContainer) {
          const successMessage = document.createElement('div');
          successMessage.className = 'mt-4 p-3 bg-green-100 text-green-800 rounded-md';
          successMessage.textContent = language === 'ru' 
            ? 'Сообщение успешно отправлено!' 
            : language === 'kz' 
              ? 'Хабарлама сәтті жіберілді!' 
              : 'Message sent successfully!';
          formContainer.appendChild(successMessage);
          
          // Remove the message after 5 seconds
          setTimeout(() => {
            formContainer.removeChild(successMessage);
          }, 5000);
        }
        } else {
        // Error - Show error toast
        console.error('Error submitting form:', response.status);
        let errorMessage = language === 'ru' 
          ? 'Не удалось отправить сообщение. Пожалуйста, попробуйте еще раз.' 
          : language === 'kz' 
            ? 'Хабарлама жіберу мүмкін болмады. Тағы жасап көріңіз.' 
            : 'Failed to send message. Please try again.';
            
        try {
          // Try to get more detailed error message from response
          const errorData = await response.json();
          if (errorData && typeof errorData === 'object' && 'message' in errorData) {
            errorMessage = errorData.message as string;
          }
        } catch (e) {
          console.error('Error parsing response:', e);
        }
        
          toast({
            title: language === 'ru' 
              ? 'Ошибка!' 
              : language === 'kz' 
                ? 'Қате!' 
                : 'Error!',
          description: errorMessage,
            variant: "destructive",
          });
      }
    } catch (error) {
      console.error("Exception when sending form:", error);
      
      // Show error toast notification
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
          <div 
            className="absolute top-20 left-[10%] w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-primary/10 dark:from-indigo-400/20 dark:to-primary/20 blur-3xl -z-10"
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
              y: [0, -10, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            <Building className="w-16 h-16" />
          </motion.div>
          
          <motion.div
            className="absolute top-[25%] right-[15%] text-indigo-600/30 z-0"
            animate={{ 
              y: [0, 15, 0]
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
              y: [0, 10, 0]
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
              y: [0, -8, 0]
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
              y: [0, 18, 0]
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
              y: [0, -14, 0]
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
              y: [0, 16, 0]
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
                     'Бізбен таныс'}
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
          className="min-h-screen py-24 flex items-center relative overflow-hidden bg-gradient-to-b from-background to-background/95"
          aria-labelledby="mission-title"
        >
          {/* Улучшенные декоративные элементы фона с более мягкими цветами */}
          <div className="absolute top-1/3 left-1/6 w-72 h-72 bg-gradient-to-br from-primary/5 to-blue-300/5 dark:from-primary/10 dark:to-blue-400/10 blur-3xl opacity-50 rounded-full animate-pulse" style={{ animationDuration: '10s' }} aria-hidden="true" />
          <div className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-gradient-to-tr from-indigo-300/5 to-primary/5 dark:from-indigo-400/10 dark:to-primary/10 blur-3xl opacity-50 rounded-full animate-pulse" style={{ animationDuration: '12s' }} aria-hidden="true" />
          
          <div className="container mx-auto px-4 max-w-7xl">
            {isVisible.mission && (
              <motion.div 
                className="max-w-4xl mx-auto"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.div variants={itemVariants}>
                  <div className="space-y-8">
                    <h2 
                      id="mission-title"
                      className="text-4xl md:text-5xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 via-indigo-500/90 to-blue-500/90 leading-tight text-center"
                    >
                      {language === 'ru' ? 'Наша миссия' : language === 'kz' ? 'Біздің миссиямыз' : 'Our Mission'}
                    </h2>
                    
                    <motion.div 
                      className="bg-white/40 dark:bg-gray-800/30 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-xl p-10 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <motion.p 
                        className="text-xl mb-8 text-gray-700 dark:text-gray-200 leading-relaxed text-center font-medium"
                        variants={fadeInVariants}
                      >
                        {language === 'ru' 
                          ? 'Мы создаем инновационную образовательную экосистему, объединяющую студентов, преподавателей и работодателей для достижения профессионального успеха.' 
                          : language === 'kz'
                          ? 'Біз студенттер, оқытушылар мен жұмыс берушілерді кәсіби табысқа жету үшін біріктіретін инновациялық білім беру экожүйесін құрамыз.'
                          : 'We are creating an innovative educational ecosystem that unites students, teachers, and employers to achieve professional success.'}
                      </motion.p>
                      
                      <div className="grid md:grid-cols-3 gap-8">
                        <motion.div 
                          className="flex flex-col items-center text-center p-6 bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm rounded-lg border border-white/10 dark:border-white/5 hover:shadow-md transition-all duration-300"
                          whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                        >
                          <div className="mb-4 p-3 bg-gradient-to-br from-primary/10 to-blue-400/10 dark:from-primary/20 dark:to-blue-400/20 rounded-full">
                            <GraduationCap className="w-8 h-8 text-primary/80 dark:text-primary/90" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2 text-gray-600 dark:text-gray-200">
                            {language === 'ru' ? 'Образование' : language === 'kz' ? 'Білім' : 'Education'}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {language === 'ru' ? 'Качественное обучение от ведущих специалистов' : language === 'kz' ? 'Жетекші мамандардан сапалы оқыту' : 'Quality education from leading specialists'}
                          </p>
                        </motion.div>
                        
                        <motion.div 
                          className="flex flex-col items-center text-center p-6 bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm rounded-lg border border-white/10 dark:border-white/5 hover:shadow-md transition-all duration-300"
                          whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                        >
                          <div className="mb-4 p-3 bg-gradient-to-br from-indigo-400/10 to-primary/10 dark:from-indigo-400/20 dark:to-primary/20 rounded-full">
                            <Code className="w-8 h-8 text-indigo-500/80 dark:text-indigo-400/90" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2 text-gray-600 dark:text-gray-200">
                            {language === 'ru' ? 'Практика' : language === 'kz' ? 'Тәжірибе' : 'Practice'}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {language === 'ru' ? 'Реальные проекты и практический опыт' : language === 'kz' ? 'Нақты жобалар және практикалық тәжірибе' : 'Real projects and practical experience'}
                          </p>
                        </motion.div>
                        
                        <motion.div 
                          className="flex flex-col items-center text-center p-6 bg-white/30 dark:bg-gray-700/30 backdrop-blur-sm rounded-lg border border-white/10 dark:border-white/5 hover:shadow-md transition-all duration-300"
                          whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.4)" }}
                        >
                          <div className="mb-4 p-3 bg-gradient-to-br from-blue-400/10 to-indigo-400/10 dark:from-blue-400/20 dark:to-indigo-400/20 rounded-full">
                            <Medal className="w-8 h-8 text-blue-500/80 dark:text-blue-400/90" />
                          </div>
                          <h3 className="font-semibold text-lg mb-2 text-gray-600 dark:text-gray-200">
                            {language === 'ru' ? 'Карьера' : language === 'kz' ? 'Мансап' : 'Career'}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300">
                            {language === 'ru' ? 'Возможности трудоустройства в ведущих компаниях' : language === 'kz' ? 'Жетекші компанияларда жұмысқа орналасу мүмкіндіктері' : 'Employment opportunities in leading companies'}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>
                  </div>
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

        {/* Интерактивный профиль разработчика в стиле геймификации */}
        <section id="team" className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 text-sm rounded-full border border-primary/20 bg-primary/5 text-primary/80 mb-4">
                {language === 'ru' ? 'Руководство платформы' : 
                 language === 'kz' ? 'Платформа басшылығы' : 
                 'Platform Leadership'}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold mb-8 pb-1 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90 leading-loose">
                {language === 'ru' ? 'Основатель проекта' : 
                 language === 'kz' ? 'Жоба негізін қалаушы' : 
                 'Project Founder'}
              </h2>
              <p className="text-lg text-foreground/70 max-w-3xl mx-auto mb-12">
                {language === 'ru' ? 'Познакомьтесь с человеком, создавшим платформу Portfol.IO для развития вашего образовательного и карьерного потенциала.' : 
                 language === 'kz' ? 'Сіздің білім беру және мансаптық әлеуетіңізді дамыту үшін Portfol.IO платформасын құрған адаммен танысыңыз.' : 
                 'Meet the person who created the Portfol.IO platform to develop your educational and career potential.'}
              </p>
            </div>
            
            <div className="grid grid-cols-1 gap-8">
              {/* Карточка с портретной фотографией в центре внимания */}
              <div className="bg-card/60 dark:bg-gray-800/40 backdrop-blur-sm border border-border/10 dark:border-white/5 rounded-xl overflow-hidden shadow-xl p-8 md:p-10">
                <div className="flex flex-col items-center gap-8 md:flex-row">
                  {/* Центральное портретное фото */}
                  <div className="relative w-full max-w-xs mx-auto md:w-64 h-64 rounded-3xl overflow-hidden flex-shrink-0 shadow-xl border-2 border-primary/20 md:mr-8">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-indigo-500/5 dark:from-primary/10 dark:to-indigo-500/10 blur-md"></div>
                    
                    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-white/20 to-white/5 dark:from-white/5 dark:to-black/20 backdrop-blur-md">
                      {/* Круглое фото */}
                      <div className="absolute inset-3 rounded-full overflow-hidden border-2 border-white/20 shadow-inner">
                        {/* <img 
                          src={teamMembers[0].image} 
                          alt={teamMembers[0].name} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = teamMembers[0].fallbackImage;
                          }}
                        /> */}
                      </div>
                      
                      {/* Декоративные элементы вокруг фото */}
                      <div className="absolute inset-0 w-full h-full pointer-events-none">
                        {/* Уровень */}
                        <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-white shadow-md z-10">
                          7
                        </div>
                        
                        {/* Звезда отличия */}
                        <div className="absolute bottom-3 right-3 text-amber-500">
                          <Star className="w-6 h-6 fill-amber-500" />
                      </div>
                      
                        {/* Декоративные технологические линии */}
                        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="50%" cy="50%" r="46%" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" className="text-primary/30 animate-spin-slow" style={{animationDuration: '30s'}} />
                          <circle cx="50%" cy="50%" r="40%" fill="none" stroke="currentColor" strokeWidth="1" className="text-indigo-500/20 animate-reverse-spin" style={{animationDuration: '20s'}} />
                        </svg>
                      </div>
                    </div>
                </div>
                  
                  {/* Информация о создателе - расширенная и интересная */}
                  <div className="flex-grow flex flex-col">
                    <div className="border-l-4 border-primary/20 pl-6 py-1">
                      <h3 className="text-2xl md:text-3xl font-bold text-foreground/90 flex items-center gap-2">
                        {teamMembers[0].name}
                        <div className="inline-flex items-center px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium ml-2">
                          <Trophy className="w-3.5 h-3.5 mr-1" />
                          <span>Pro Dev</span>
                      </div>
                      </h3>
                      <p className="text-primary font-medium text-lg mb-4">{teamMembers[0].role}</p>
                    </div>
                    
                    <div className="mt-4">
                      <p className="text-foreground/80 text-base leading-relaxed mb-6">
                        {teamMembers[0].bio}
                      </p>
                      
                      <div className="mt-6 mb-6">
                        <div className="p-4 bg-foreground/5 border border-border/10 rounded-xl">
                          <h4 className="font-medium flex items-center mb-3">
                            <GraduationCap className="w-5 h-5 mr-2 text-primary/70" />
                            {language === 'ru' ? 'Образование' : 
                             language === 'kz' ? 'Білім' : 
                             'Education'}
                          </h4>
                          <p className="text-foreground/80 text-sm">{teamMembers[0].education}</p>
                    </div>
        </div>
                      
                      {/* Навыки в более простом формате */}
                      <div className="mb-6">
                        <h4 className="font-semibold mb-4 flex items-center">
                          <Code className="w-5 h-5 mr-2 text-primary/70" />
                          {language === 'ru' ? 'Технические навыки' : 
                           language === 'kz' ? 'Техникалық дағдылар' : 
                           'Technical skills'}
                        </h4>
                        
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                          <div className="p-2 px-3 bg-foreground/5 border border-border/20 rounded-lg flex items-center hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer">
                            <Globe className="w-4 h-4 text-primary mr-2" />
                            <span className="font-medium text-sm">Web Dev</span>
                          </div>
                          
                          <div className="p-2 px-3 bg-foreground/5 border border-border/20 rounded-lg flex items-center hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer">
                            <span className="w-4 h-4 flex items-center justify-center text-primary mr-2 font-semibold">Py</span>
                            <span className="font-medium text-sm">Python</span>
                          </div>
                          
                          <div className="p-2 px-3 bg-foreground/5 border border-border/20 rounded-lg flex items-center hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer">
                            <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20L12 4L20 20"></path></svg>
                            <span className="font-medium text-sm">Flutter</span>
                          </div>
                          
                          <div className="p-2 px-3 bg-foreground/5 border border-border/20 rounded-lg flex items-center hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer">
                            <PenTool className="w-4 h-4 text-primary mr-2" />
                            <span className="font-medium text-sm">UI/UX</span>
                          </div>
                          
                          <div className="p-2 px-3 bg-foreground/5 border border-border/20 rounded-lg flex items-center hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer">
                            <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                            <span className="font-medium text-sm">JavaScript</span>
                          </div>
                          
                          <div className="p-2 px-3 bg-foreground/5 border border-border/20 rounded-lg flex items-center hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer">
                            <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h20v14H2zM15 21l-5-5 5-5"></path></svg>
                            <span className="font-medium text-sm">SQL</span>
                          </div>
                          
                          <div className="p-2 px-3 bg-foreground/5 border border-border/20 rounded-lg flex items-center hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer">
                            <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M3 12h18M3 18h18"></path></svg>
                            <span className="font-medium text-sm">Full Stack</span>
                          </div>
                          
                          <div className="p-2 px-3 bg-foreground/5 border border-border/20 rounded-lg flex items-center hover:bg-primary/10 hover:border-primary/30 transition-all cursor-pointer">
                            <svg className="w-4 h-4 text-primary mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l9 2-9-18-9 18 9-2z"></path></svg>
                            <span className="font-medium text-sm">Figma</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Личные качества и преимущества в две колонки */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Левая колонка - достижения */}
                        <div>
                          <h4 className="font-semibold mb-4 flex items-center">
                            <Trophy className="w-5 h-5 mr-2 text-amber-500" />
                            {language === 'ru' ? 'Достижения' : 
                            language === 'kz' ? 'Жетістіктер' : 
                            'Achievements'}
                          </h4>
                          
                          <div className="space-y-3">
                            <div className="p-2 px-3 bg-amber-500/10 rounded-lg border border-amber-500/20 flex items-center hover:translate-x-1 transition-transform cursor-pointer">
                              <Medal className="w-4 h-4 text-amber-500 mr-2" />
                              <div>
                                <p className="font-medium text-sm">
                                  {language === 'ru' ? 'Призер олимпиад' : 
                                  language === 'kz' ? 'Олимпиада жүлдегері' : 
                                  'Olympiad winner'}
                                </p>
                              </div>
                            </div>
                            
                            <div className="p-2 px-3 bg-blue-500/10 rounded-lg border border-blue-500/20 flex items-center hover:translate-x-1 transition-transform cursor-pointer">
                              <BookOpen className="w-4 h-4 text-blue-500 mr-2" />
                              <div>
                                <p className="font-medium text-sm">
                                  {language === 'ru' ? 'Научные проекты' : 
                                  language === 'kz' ? 'Ғылыми жобалар' : 
                                  'Scientific projects'}
                                </p>
                              </div>
                            </div>
                            
                            <div className="p-2 px-3 bg-green-500/10 rounded-lg border border-green-500/20 flex items-center hover:translate-x-1 transition-transform cursor-pointer">
                              <Globe className="w-4 h-4 text-green-500 mr-2" />
                              <div>
                                <p className="font-medium text-sm">
                                  {language === 'ru' ? 'Международные конференции' : 
                                  language === 'kz' ? 'Халықаралық конференциялар' : 
                                  'International conferences'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Правая колонка - личные качества */}
                        <div>
                          <h4 className="font-semibold mb-4 flex items-center">
                            <Users2 className="w-5 h-5 mr-2 text-primary/70" />
                            {language === 'ru' ? 'Личные качества' : 
                            language === 'kz' ? 'Жеке қасиеттері' : 
                            'Personal qualities'}
                          </h4>
                          
                          <div className="flex flex-wrap gap-2">
                            {teamMembers[0].qualities.map((quality, i) => (
                              <div 
                                key={i} 
                                className="px-3 py-1.5 bg-foreground/5 border border-border/20 rounded-full text-sm 
                                  hover:bg-primary/10 hover:border-primary/30 hover:text-primary cursor-pointer
                                  hover:-translate-y-1 transition-transform"
                              >
                                {quality}
                              </div>
                            ))}
                          </div>
                        </div>  
                      </div>
                      
                      {/* Цитата */}
                      <div className="mt-6 pt-4 border-t border-border/20">
                        <p className="text-foreground/70 italic">
                          {language === 'ru' ? '"Образование должно быть доступным, практичным и вдохновляющим. С Portfol.IO мы стремимся создать среду для эффективного обучения и развития профессиональных навыков."' : 
                           language === 'kz' ? '"Білім қолжетімді, практикалық және шабыттандыратын болуы керек. Portfol.IO арқылы біз тиімді оқыту және кәсіби дағдыларды дамыту ортасын құруға тырысамыз."' : 
                           '"Education should be accessible, practical, and inspiring. With Portfol.IO, we aim to create an environment for effective learning and professional skills development."'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Подсказка */}
              <div className="text-center">
                <div className="inline-flex items-center gap-2 text-foreground/60 text-sm px-4 py-2 bg-card/30 border border-border/10 rounded-full">
                  <Lightbulb className="w-4 h-4 text-amber-500 animate-pulse" />
                  <span>
                    {language === 'ru' ? 'Наведите на элементы для дополнительной информации' : 
                     language === 'kz' ? 'Қосымша ақпарат үшін элементтердің үстіне тінтуірді апарыңыз' : 
                     'Hover over elements for additional information'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="py-16 pb-24 relative overflow-hidden">
          {/* Фоновые эффекты */}
          <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-0 right-0 h-2/3 bg-gradient-to-br from-primary/20 via-transparent to-indigo-500/20 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-tr from-blue-500/20 via-transparent to-purple-500/20 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative">
            <motion.div 
              className="text-center mb-8"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Левая колонка - информация */}
                <div>
                  <h3 className="text-xl font-semibold mb-6 text-foreground/90">
                    {language === 'ru' ? 'Контакты' : language === 'kz' ? 'Байланыс контактілері' : 'Contacts'}
                  </h3>
                  
                  <div className="space-y-5 mb-8">
                    {/* В мини-разделе контактов - все иконки filled */}
                  <div className="space-y-5 mb-8">
                    <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center mr-3 bg-primary/10 rounded-full text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                        </svg>
                      </div>
                        <p className="text-foreground/80">+7 776 828 5785</p>
                    </div>
                    
                    <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center mr-3 bg-primary/10 rounded-full text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24">
                            <path d="M19 4H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" fill="currentColor"/>
                            <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8" fill="none" stroke="white" strokeOpacity="0.6" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                        <p className="text-foreground/80">mssmi797@gmail.com</p>
                    </div>
                    
                    <div className="flex items-center">
                        <div className="w-10 h-10 flex items-center justify-center mr-3 bg-primary/10 rounded-full text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                      </div>
                      <p className="text-foreground/80">
                        {language === 'ru' 
                            ? 'г. Астана, Мангилик Ел 55а'
                          : language === 'kz'
                            ? 'Астана қ., Мәңгілік Ел 55а'
                            : 'Astana, Mangilik El 55a'}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border/10 dark:border-white/5">
                    <h4 className="text-sm font-medium text-foreground/70 mb-4">
                      {language === 'ru' ? 'Мы в соцсетях' : language === 'kz' ? 'Әлеуметтік желілерде' : 'Follow us'}
                    </h4>
                    <div className="flex space-x-3">
                        <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                        </svg>
                      </a>
                        <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                        </svg>
                      </a>
                        <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                        </svg>
                      </a>
                        <a href="#" className="w-9 h-9 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-all duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"/>
                        </svg>
                      </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Правая колонка - форма */}
                <div>
                  <form className="space-y-4" onSubmit={handleContactSubmit}>
                    {/* В форме отправки - все иконки только бордер */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
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
                      
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-primary">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="2" y="4" width="20" height="16" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <line x1="12" y1="8" x2="12" y2="12" />
                          <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                      </div>
                      <select 
                        id="subject" 
                        name="subject"
                        className="w-full pl-11 pr-4 py-2.5 bg-background/70 border border-border/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all"
                        required
                        defaultValue=""
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
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
      
      {/* Убедимся, что компонент Toaster отображается */}
      <Toaster />
    </PublicPageLayout>
  );
} 