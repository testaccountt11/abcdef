import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { ArrowRight, Users2, Lightbulb, Heart, Trophy, Rocket, ExternalLink, Github, Linkedin, Twitter } from "lucide-react";
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
  // INSERT_YOUR_REWRITE_HERE
  ];
  return (
    <PublicPageLayout>
      {/* Hero Section - унифицированный стиль с Landing Page */}
      <section className="relative h-screen min-h-[800px] flex items-center justify-center overflow-hidden" ref={heroRef}>
        {/* Анимированный фон с плавающими элементами - приглушенные цвета, как на Landing Page */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-primary/10 to-indigo-600/10 dark:from-primary/20 dark:to-indigo-600/20 blur-3xl opacity-80 -z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <motion.div 
            className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 blur-3xl opacity-80 -z-10"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 0.3, scale: 1 }}
            transition={{ duration: 2, delay: 0.3, ease: "easeOut" }}
          />
          <motion.div
            className="absolute w-20 h-20 top-1/4 left-[15%] rounded-full border border-primary/10 text-primary/10"
            animate={{ 
              y: ["-15px", "15px", "-15px"],
              x: ["0px", "10px", "0px", "-10px", "0px"],
              rotate: [0, 3, 0, -3, 0]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute w-16 h-16 bottom-1/3 right-[20%] rounded-md border border-indigo-400/10 rotate-12 text-indigo-600/10"
            animate={{ 
              y: ["15px", "-15px", "15px"],
              rotate: [12, 24, 12],
              scale: [1, 1.05, 1]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="container relative mx-auto px-4 max-w-7xl z-10 flex items-center justify-center -mt-16">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ 
              opacity: heroOpacity, 
              scale: heroScale,
              y: heroY
            }}
          >
            <motion.div
              className="inline-block mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
            >
              <span className="px-3 py-1 text-sm rounded-full border border-primary/20 bg-primary/5 text-primary/80 mb-4 inline-block backdrop-blur-sm">
                Portfol.IO
              </span>
            </motion.div>
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90 dark:from-primary/95 dark:to-indigo-400/95"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t('aboutUs.title')}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-foreground/70 dark:text-foreground/80 max-w-3xl mx-auto mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {t('aboutUs.subtitle')}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-primary/90 to-indigo-600/90 hover:from-primary/80 hover:to-indigo-600/80 shadow-lg hover:shadow-primary/10 text-white transition-all duration-500"
                onClick={() => {
                  const element = document.getElementById('mission');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {language === 'en' ? 'Learn More' : 
                 language === 'ru' ? 'Узнать больше' : 
                 'Көбірек білу'}
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                >
                <ArrowRight className="ml-2 h-5 w-5" />
                </motion.span>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div 
            className="w-8 h-12 border-2 border-primary/20 rounded-full flex items-center justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div 
              className="w-1.5 h-3 bg-primary/80 rounded-full"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
            />
          </motion.div>
        </motion.div>

        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background via-background/95 to-transparent pointer-events-none" />
      </section>

      {/* Our Mission - унифицированный стиль */}
      <section id="mission" className="relative py-24" ref={missionRef}>
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Визуальный разделитель секции */}
          <div className="absolute top-0 left-0 right-0 flex justify-center">
            <div className="w-24 h-1.5 bg-gradient-to-r from-primary/30 to-indigo-600/30 rounded-full" />
          </div>
          
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
                  {t('aboutUs.mission.title')}
                </motion.span>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90">{t('aboutUs.mission.title')}</h2>
                
                {/* Content box */}
                <motion.div 
                  className="bg-card/60 dark:bg-gray-800/40 backdrop-blur-sm border border-border/10 dark:border-white/5 rounded-lg p-6 shadow-sm dark:shadow-primary/5"
                  whileHover={{ y: -5, boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.08)", transition: { duration: 0.4 } }}
                >
                <motion.p 
                    className="text-lg mb-6 text-foreground/70 leading-relaxed"
                  variants={fadeInVariants}
                >
                  {t('aboutUs.mission.description1')}
                </motion.p>
                <motion.p 
                    className="text-lg mb-8 text-foreground/70 leading-relaxed"
                  variants={fadeInVariants}
                >
                  {t('aboutUs.mission.description2')}
                </motion.p>
                </motion.div>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 mt-8"
                  variants={staggerContainerVariants}
                >
                  <motion.div variants={fadeInVariants}>
                    <Button 
                      size="lg" 
                      onClick={() => navigate('/register')}
                      className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-primary/90 to-indigo-600/90 hover:from-primary/80 hover:to-indigo-600/80 shadow-lg hover:shadow-primary/10 text-white transition-all duration-500 w-full sm:w-auto"
                    >
                      {t('aboutUs.mission.joinButton')}
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
                      >
                      <ArrowRight className="ml-2 h-5 w-5" />
                      </motion.span>
                    </Button>
                  </motion.div>
                  <motion.div variants={fadeInVariants}>
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => navigate('/publiccourses')}
                      className="rounded-full px-8 py-6 text-lg border-primary/20 hover:bg-primary/5 transition-all duration-300 w-full sm:w-auto"
                    >
                      {t('aboutUs.mission.exploreButton')}
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Изображение справа */}
              <motion.div 
                className="relative"
                variants={itemVariants}
              >
                <motion.div 
                  className="absolute -top-12 -right-12 w-24 h-24 rounded-full bg-primary/10 blur-xl z-0"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2]
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                
                <motion.div 
                  className="absolute inset-0 bg-gradient-to-r from-primary/20 to-indigo-600/20 rounded-2xl blur-2xl opacity-20 transform -rotate-6 scale-95"
                  animate={{ 
                    rotate: [-6, 0, -6],
                    scale: [0.95, 0.97, 0.95]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                ></motion.div>
                
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
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <p className="text-white text-sm font-medium">{t('aboutUs.mission.imageCaption')}</p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Our Values - унифицированный стиль */}
      <section id="values" className="relative py-24 bg-muted/20" ref={valuesRef}>
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden">
        <motion.div
              className="absolute top-40 left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl"
              animate={{ 
                x: [0, 30, 0],
                y: [0, -30, 0],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
        <motion.div
              className="absolute bottom-20 right-40 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl"
              animate={{ 
                x: [0, -40, 0],
                y: [0, 40, 0],
                opacity: [0.2, 0.4, 0.2]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
          
          <div className="text-center mb-16 relative z-10">
                <motion.span 
                  className="inline-block px-3 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary mb-4"
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible.values ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              {t('aboutUs.values.subtitle')}
                </motion.span>
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600"
              initial={{ opacity: 0, y: -20 }}
              animate={isVisible.values ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
                  {t('aboutUs.values.title')}
            </motion.h2>
            <motion.p 
              className="text-lg max-w-3xl mx-auto text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.values ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t('aboutUs.values.description')}
            </motion.p>
          </div>
          
          {isVisible.values && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {valuesData.map((value, i) => (
              <motion.div 
                  key={i}
                  className="bg-card/60 dark:bg-gray-800/40 backdrop-blur-sm border border-border/10 dark:border-white/5 rounded-xl p-6 relative overflow-hidden group h-full dark:shadow-lg dark:shadow-primary/5"
                  custom={i}
                  variants={valueCardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                >
                  <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-primary/60 to-indigo-600/60 dark:from-primary/80 dark:to-indigo-600/80"></div>
                  
                  <div className="flex items-center mb-5">
                    <div className="mr-4 p-3 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary dark:drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold text-foreground/90 dark:text-white">
                      {value.title}
                    </h3>
                  </div>
                  
                  <p className="text-foreground/60 dark:text-gray-300/70">
                    {value.description}
                  </p>
                </motion.div>
                ))}
            </div>
          )}
        </div>
        
        {/* Zigzag divider */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-background" style={{ clipPath: "polygon(0% 100%, 4% 0%, 8% 100%, 12% 0%, 16% 100%, 20% 0%, 24% 100%, 28% 0%, 32% 100%, 36% 0%, 40% 100%, 44% 0%, 48% 100%, 52% 0%, 56% 100%, 60% 0%, 64% 100%, 68% 0%, 72% 100%, 76% 0%, 80% 100%, 84% 0%, 88% 100%, 92% 0%, 96% 100%, 100% 0%, 100% 100%)" }}></div>
      </section>

      {/* Our Team - унифицированный стиль */}
      <section id="team" className="relative py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
                <motion.span 
                  className="inline-block px-3 py-1 text-sm rounded-full border border-primary/30 bg-primary/5 text-primary mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible.team ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5 }}
            >
              {t('aboutUs.team.subtitle')}
                </motion.span>
            <motion.h2 
              className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-indigo-600"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.team ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
                  {t('aboutUs.team.title')}
            </motion.h2>
            <motion.p 
              className="text-lg max-w-3xl mx-auto text-foreground/80"
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible.team ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t('aboutUs.team.description')}
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
                  className="group relative overflow-hidden rounded-2xl bg-card dark:bg-gray-800/60 border border-border/40 dark:border-white/5 transition-all duration-300 h-full flex flex-col dark:shadow-lg dark:shadow-primary/5"
                  custom={i}
                    variants={teamMemberVariants}
                    whileHover="hover"
                  >
                  <div className="relative overflow-hidden h-64">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = member.fallbackImage;
                      }}
                    />
                    
                    {/* Social links that appear on hover */}
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
                    
                    <div className="mt-4 pt-4 border-t border-border/30">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary p-0 h-auto hover:bg-transparent hover:text-primary/80"
                      >
                        {t('aboutUs.team.connectButton')}
                        <ExternalLink className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>
      
      {/* CTA Section - унифицированный стиль с Landing Page */}
      <section id="cta" className="relative py-24 overflow-hidden">
        <motion.div
          className="absolute top-20 left-[10%] w-64 h-64 rounded-full bg-gradient-to-r from-primary/5 to-indigo-600/5 blur-[100px] -z-10"
          animate={{ 
            x: [0, 40, 0],
            y: [0, -20, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-[15%] w-80 h-80 rounded-full bg-gradient-to-r from-blue-500/5 to-primary/5 blur-[120px] -z-10"
          animate={{ 
            x: [0, -30, 0],
            y: [0, 40, 0],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="border border-primary/10 dark:border-primary/20 rounded-3xl bg-card/60 dark:bg-gray-800/30 backdrop-blur-xl p-12 shadow-md dark:shadow-primary/10 relative overflow-hidden">
            <div className="absolute -inset-px bg-gradient-to-r from-primary/10 to-indigo-600/10 dark:from-primary/15 dark:to-indigo-600/15 rounded-3xl opacity-20 dark:opacity-30 blur-sm"></div>
            
            <div className="relative z-10">
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
                  {t('aboutUs.cta.title')}
                </motion.h2>
                <motion.p 
                  className="text-xl text-foreground/70 mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible.cta ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  {t('aboutUs.cta.description')}
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
                    {t('aboutUs.cta.primaryButton')}
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
        </div>
      </section>
    </PublicPageLayout>
  );
}