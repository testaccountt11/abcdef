import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { 
  ArrowRight, Users2, Lightbulb, Heart, Trophy, Rocket, 
  ExternalLink, Github, Linkedin, Twitter, 
  Building, BookOpen, UserPlus, Star, Globe, Shield
} from "lucide-react";
import { useLocation } from "wouter";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { PublicPageLayout } from "@/components/layouts/PublicPageLayout";

export default function PublicAboutUs() {
  const { t, language } = useTranslations();
  const [, navigate] = useLocation();
  const [isVisible, setIsVisible] = useState({
    mission: false,
    values: false,
    team: false,
    cta: false
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
    const sections = ['mission', 'values', 'team', 'cta'];
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
        {/* HERO SECTION - исправленная версия */}
        <section className="min-h-[calc(100vh-4rem)] flex items-center justify-center relative pt-16 pb-24 px-6">
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
          
          {/* Плавающие иконки */}
          <motion.div 
            className="absolute top-[15%] left-[25%] text-primary/10 -z-10"
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
            className="absolute top-[30%] right-[20%] text-indigo-600/10 -z-10"
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
            className="absolute bottom-[25%] left-[30%] text-blue-500/10 -z-10"
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
            className="absolute bottom-[20%] right-[35%] text-purple-500/10 -z-10"
            animate={{
              y: [0, -8, 0],
              x: [0, 5, 0],
              rotate: [0, -7, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Shield className="w-10 h-10" />
          </motion.div>

          {/* Hero content - исправленный тайтл с дополнительным padding */}
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              className="inline-block mb-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            >
              <span className="px-4 py-2 text-sm rounded-full border border-primary/20 bg-primary/5 text-primary/80 inline-block backdrop-blur-sm">
                {language === 'en' ? 'Portfol.IO Team' : 
                 language === 'ru' ? 'Команда Portfol.IO' : 
                 'Portfol.IO Командасы'}
              </span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-10 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90 dark:from-primary/95 dark:to-indigo-400/95 leading-[1.2] py-4 px-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {language === 'en' ? t('aboutUs.title') : 
               language === 'ru' ? 'О нас' : 
               t('aboutUs.title')}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-14 max-w-2xl mx-auto text-foreground/70 dark:text-foreground/80 px-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              {language === 'en' ? t('aboutUs.subtitle') : 
               language === 'ru' ? 'Знакомьтесь с командой, создающей вашу образовательную платформу' : 
               t('aboutUs.subtitle')}
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
                  className="rounded-full px-8 py-6 text-lg bg-card border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-500 shadow-lg"
                  onClick={() => scrollToSection('mission')}
                >
                  <span className="flex items-center">
                    {language === 'en' ? 'Discover Our Story' : 
                     language === 'ru' ? 'Узнать нашу историю' : 
                     'Біздің оқиғамызбен танысу'}
                    <motion.span
                      animate={{ 
                        y: [0, -3, 0],
                        x: [0, 3, 0] 
                      }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                    >
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </motion.span>
                  </span>
              </Button>
            </motion.div>
          </motion.div>
        </section>

        {/* Our Mission Section - с увеличенным пространством */}
        <section id="mission" className="min-h-screen py-24 flex items-center">
        <div className="container mx-auto px-4 max-w-7xl">
          {isVisible.mission && (
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <motion.span 
                    className="inline-block px-3 py-1 text-sm rounded-full border border-primary/20 bg-primary/5 text-primary/80 mb-4"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {language === 'en' ? t('aboutUs.mission.title') : 
                   language === 'ru' ? 'Наша миссия' : 
                   t('aboutUs.mission.title')}
                </motion.span>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90">
                    {language === 'en' ? t('aboutUs.mission.title') : 
                     language === 'ru' ? 'Наша миссия' : 
                     t('aboutUs.mission.title')}
                  </h2>
                  
                  {/* Content box с увеличенным внутренним отступом */}
                  <motion.div 
                    className="bg-card/60 dark:bg-gray-800/40 backdrop-blur-sm border border-border/10 dark:border-white/5 rounded-lg p-8 shadow-sm dark:shadow-primary/5"
                    whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.08)", transition: { duration: 0.4 } }}
                  >
                <motion.p 
                      className="text-lg mb-8 text-foreground/70 leading-relaxed"
                  variants={fadeInVariants}
                >
                  {language === 'en' ? t('aboutUs.mission.description1') : 
                   language === 'ru' ? 'Мы стремимся демократизировать образование, создавая платформу, где каждый студент может найти свой индивидуальный путь обучения и профессионального развития.' : 
                   t('aboutUs.mission.description1')}
                </motion.p>
                <motion.p 
                      className="text-lg mb-12 text-foreground/70 leading-relaxed"
                  variants={fadeInVariants}
                >
                  {language === 'en' ? t('aboutUs.mission.description2') : 
                   language === 'ru' ? 'Наша цель - объединить образовательные ресурсы, менторов и возможности стажировок в единой экосистеме, которая поможет каждому раскрыть свой потенциал.' : 
                   t('aboutUs.mission.description2')}
                </motion.p>
                  </motion.div>
                </motion.div>
                
                {/* Изображение справа */}
              <motion.div 
                className="relative"
                variants={itemVariants}
              >
                <motion.div 
                    className="rounded-2xl overflow-hidden shadow-sm border border-border/10 relative z-10"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.05)"
                    }}
                    transition={{ duration: 0.4 }}
                >
                  <img 
                    src="/assets/about/mission.jpg" 
                      alt="Our Mission"
                      className="w-full h-auto object-cover"
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

        {/* Our Values Section - сдержанная, элегантная версия */}
        <section id="values" className="py-24 relative">
          {/* Один простой фоновый элемент */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-br from-primary/5 to-indigo-500/5 dark:from-primary/10 dark:to-indigo-500/10 blur-3xl opacity-50" />
          </div>

          <div className="container mx-auto px-4 max-w-7xl relative">
            <div className="text-center mb-16">
              <motion.span 
                className="inline-block px-3 py-1 text-sm rounded-full border border-primary/20 bg-primary/5 text-primary/80 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={isVisible.values ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                {language === 'en' ? t('aboutUs.values.subtitle') : 
                 language === 'ru' ? 'Принципы, которые нас направляют' : 
                 t('aboutUs.values.subtitle')}
              </motion.span>
              
              <motion.h2 
                className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600"
                initial={{ opacity: 0, y: -20 }}
                animate={isVisible.values ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {language === 'en' ? t('aboutUs.values.title') : 
                   language === 'ru' ? 'Наши ценности' : 
                   t('aboutUs.values.title')}
              </motion.h2>
              
              <motion.p 
                className="text-lg max-w-3xl mx-auto text-foreground/80 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible.values ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {language === 'en' ? t('aboutUs.values.description') : 
                 language === 'ru' ? 'Эти фундаментальные принципы определяют наш подход к созданию образовательной платформы, которая вдохновляет и поддерживает.' : 
                 t('aboutUs.values.description')}
              </motion.p>
            </div>
            
            {isVisible.values && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
                {valuesData.map((value, i) => {
                  // Создаем локализованные данные для каждой ценности
                  const localizedTitle = 
                    language === 'ru' ? 
                      (i === 0 ? 'Сообщество' :
                       i === 1 ? 'Инновации' :
                       i === 2 ? 'Инклюзивность' :
                       i === 3 ? 'Качество' :
                       i === 4 ? 'Развитие' : value.title) :
                    value.title;
                  
                  const localizedDescription =
                    language === 'ru' ? 
                      (i === 0 ? 'Мы верим в силу сообщества и взаимной поддержки в образовательном процессе.' :
                       i === 1 ? 'Постоянный поиск новых подходов к обучению для максимальной эффективности.' :
                       i === 2 ? 'Образование должно быть доступным каждому, независимо от места проживания или финансовых возможностей.' :
                       i === 3 ? 'Мы стремимся к высочайшему качеству контента и опыта пользователей на нашей платформе.' :
                       i === 4 ? 'Поддержка непрерывного обучения и персонального роста на каждом этапе жизни.' : value.description) :
                    value.description;
                  
                  return (
                    <motion.div 
                      key={i}
                      className="bg-card/80 dark:bg-gray-800/40 backdrop-blur-sm border border-border/10 dark:border-white/5 rounded-lg p-6 hover:shadow-md transition-shadow duration-300"
                      custom={i}
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
                      <div className="flex items-center mb-4">
                        <div className="mr-4 p-2.5 rounded-md bg-primary/10 dark:bg-primary/20 text-primary">
                          {value.icon}
                        </div>
                        <h3 className="text-xl font-bold text-foreground/90 dark:text-white/90">
                          {localizedTitle}
                        </h3>
                      </div>
                      
                      <p className="text-foreground/70 dark:text-gray-300/70 leading-relaxed">
                        {localizedDescription}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
          )}
        </div>
      </section>

        {/* Our Team Section */}
        <section id="team" className="py-24">
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
          )}
        </div>
      </section>
      
      {/* CTA Section */}
        <section id="cta" className="py-24 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
            <div className="border border-primary/10 dark:border-primary/20 rounded-3xl bg-card/60 dark:bg-gray-800/30 backdrop-blur-xl p-12 shadow-md dark:shadow-primary/10 relative overflow-hidden">
        <motion.div
                className="max-w-3xl mx-auto text-center"
              initial={{ opacity: 0, y: 30 }}
                animate={isVisible.cta ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7 }}
              >
                <motion.h2 
                  className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible.cta ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {language === 'en' ? t('aboutUs.cta.title') : 
                   language === 'ru' ? 'Присоединяйтесь к нам сегодня' : 
                   t('aboutUs.cta.title')}
                </motion.h2>
                <motion.p 
                  className="text-xl text-foreground/70 mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible.cta ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {language === 'en' ? t('aboutUs.cta.description') : 
                   language === 'ru' ? 'Начните свой образовательный путь с Portfol.IO и откройте новые возможности для своего будущего.' : 
                   t('aboutUs.cta.description')}
                </motion.p>
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible.cta ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button 
                    size="lg" 
                    className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-primary/90 to-indigo-600/90 hover:from-primary/80 hover:to-indigo-600/80 shadow-lg hover:shadow-primary/10 text-white transition-all duration-500"
                    onClick={() => navigate('/register')}
                  >
                    {language === 'en' ? t('aboutUs.cta.primaryButton') : 
                     language === 'ru' ? 'Зарегистрироваться' : 
                     t('aboutUs.cta.primaryButton')}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                    >
                    <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="rounded-full px-8 py-6 text-lg border-primary/20 hover:bg-primary/5 transition-all duration-300"
                    onClick={() => navigate('/publiccourses')}
                  >
                    {t('aboutUs.cta.secondaryButton')}
                  </Button>
                </motion.div>
                
                {/* Stats counter */}
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
      </main>
    </PublicPageLayout>
  );
} 