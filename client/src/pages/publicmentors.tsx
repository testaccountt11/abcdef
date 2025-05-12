import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { useLocation } from "wouter";
import { 
  Search, Filter, Star, ArrowRight, MessageCircle, Calendar, Award, Globe, 
  BookOpen, Users, GraduationCap, CheckCircle2, Briefcase, UserPlus
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublicPageLayout } from "@/components/layouts/PublicPageLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/contexts/ThemeContext";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Тип данных ментора
interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  profileImage: string;
  bio: string;
  category: string;
  skills: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  available?: boolean;
}

// Демо-данные менторов
const dummyMentors = [
  {
    id: 1,
    name: "Arman Bekov",
    title: "Senior Software Engineer",
    company: "TechCorp",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Experienced software engineer with 10+ years in full-stack development. I specialize in React, Node.js, and cloud architecture. I enjoy mentoring junior developers and helping them grow their skills.",
    category: "Software Development",
    skills: ["React", "Node.js", "AWS", "System Design", "Career Guidance"],
    languages: ["English", "Russian", "Kazakh"],
    rating: 4.9,
    reviewCount: 47,
    featured: true,
    available: true
  },
  {
    id: 2,
    name: "Aizhan Nurmagambetova",
    title: "Data Scientist",
    company: "Analytics Co",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Data scientist with expertise in machine learning, statistical analysis, and data visualization. I love helping students make sense of data and build compelling portfolios.",
    category: "Data Science",
    skills: ["Python", "Machine Learning", "Statistics", "Data Visualization", "SQL"],
    languages: ["English", "Russian"],
    rating: 4.8,
    reviewCount: 32,
    featured: true,
    available: true
  },
  {
    id: 3,
    name: "Daulet Kenesbek",
    title: "UX/UI Designer",
    company: "Design Studio",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Passionate designer with a focus on creating intuitive user experiences. I believe in design thinking and user-centered approaches to product development.",
    category: "Design",
    skills: ["UX Design", "UI Design", "Figma", "Design Systems", "Prototyping"],
    languages: ["English", "Kazakh"],
    rating: 4.7,
    reviewCount: 23,
    featured: false,
    available: true
  },
  {
    id: 4,
    name: "Nurlan Abdrakhmanov",
    title: "Marketing Manager",
    company: "Brand Solutions",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Marketing professional focused on digital strategies, branding, and growth marketing. I help new businesses establish their presence and grow their audience.",
    category: "Marketing",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics"],
    languages: ["English", "Russian"],
    rating: 4.6,
    reviewCount: 18,
    featured: false,
    available: false
  },
  {
    id: 5,
    name: "Kanat Zhumabekov",
    title: "Product Manager",
    company: "Product House",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Product manager with experience leading teams and launching successful products. I focus on user-centered design and agile methodologies.",
    category: "Product Management",
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping", "Product Analytics"],
    languages: ["English", "Russian", "Kazakh"],
    rating: 4.9,
    reviewCount: 27,
    featured: true,
    available: true
  },
  {
    id: 6,
    name: "Aliya Nurmukhambetova",
    title: "Financial Analyst",
    company: "Finance Group",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Finance professional with experience in investment analysis, financial modeling, and strategic planning. I provide guidance on finance careers and skill development.",
    category: "Finance",
    skills: ["Financial Modeling", "Valuation", "Excel", "Investment Analysis", "Financial Planning"],
    languages: ["English", "Kazakh"],
    rating: 4.8,
    reviewCount: 21,
    featured: false,
    available: true
  }
];

// Преимущества работы с менторами
interface Feature {
  icon: any;
  title: string;
  description: string;
  color: string;
}

// Компонент карточки преимуществ
function FeatureCard({ icon: Icon, title, description, color }: Feature) {
  return (
    <div className="bg-card dark:bg-card rounded-xl p-6 shadow-sm border border-border relative h-full">
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  );
}

// Компонент карточки ментора
function MentorCard({ mentor }: { mentor: Mentor }) {
  const { t } = useTranslations();
  const [, navigate] = useLocation();
  
  return (
    <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-primary/10">
                <img 
                  src={mentor.profileImage} 
                  alt={mentor.name} 
                  className="w-full h-full object-cover"
                />
                {mentor.featured && (
                  <div className="absolute -top-1 -right-1 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center">
                    <Award className="w-3 h-3" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg">{mentor.name}</h3>
                <p className="text-foreground/60 text-sm">{mentor.title} {mentor.company && `at ${mentor.company}`}</p>
              </div>
            </div>
            
            {mentor.available ? (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                {t('mentors.available')}
              </Badge>
            ) : (
              <Badge variant="outline" className="text-foreground/60">
                {t('mentors.unavailable')}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center text-sm mb-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-4 h-4 ${star <= Math.floor(mentor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="ml-2 text-foreground/60">
              {mentor.rating.toFixed(1)} ({mentor.reviewCount})
            </span>
          </div>
          
          <p className="text-foreground/80 line-clamp-3 mb-4">{mentor.bio}</p>
          
          <div className="mb-4">
            <h4 className="font-medium mb-2 text-sm text-foreground/70">{t('mentors.expertise')}</h4>
            <div className="flex flex-wrap gap-2">
              {mentor.skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="font-normal">
                  {skill}
                </Badge>
              ))}
              {mentor.skills.length > 3 && (
                <Badge variant="outline" className="font-normal">
                  +{mentor.skills.length - 3}
                </Badge>
              )}
            </div>
          </div>
          
          <div className="flex items-center text-sm text-foreground/60 mb-4">
            <Globe className="w-4 h-4 mr-1" />
            {mentor.languages.join(', ')}
          </div>
        </div>
        
        <Button 
          className="w-full mt-4" 
          variant={mentor.available ? "default" : "outline"}
          disabled={!mentor.available}
          onClick={() => navigate(`/mentors/${mentor.id}`)}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {t('mentors.connect')}
        </Button>
      </CardContent>
    </Card>
  );
}

// Основной компонент страницы
export default function PublicMentors() {
  const { t, language } = useTranslations();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  // Refs для анимации
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, 50]);
  
  // Features array
  const features: Feature[] = [
    {
      icon: UserPlus,
      title: language === 'ru' ? 'Индивидуальная поддержка' : language === 'kz' ? 'Жеке қолдау' : 'Personal Support',
      description: language === 'ru' ? 'Персональное руководство от опытных профессионалов в вашей области' : language === 'kz' ? 'Сіздің саладағы тәжірибелі мамандардан жеке басшылық' : 'Get personalized guidance from experienced professionals in your field',
      color: 'bg-primary'
    },
    {
      icon: GraduationCap,
      title: language === 'ru' ? 'Знания из первых рук' : language === 'kz' ? 'Бірінші қолдан білім' : 'First-hand Knowledge',
      description: language === 'ru' ? 'Получите ценные знания от специалистов, работающих в индустрии' : language === 'kz' ? 'Индустрияда жұмыс істейтін мамандардан құнды білім алыңыз' : 'Gain valuable insights from specialists working in the industry',
      color: 'bg-primary'
    },
    {
      icon: Briefcase,
      title: language === 'ru' ? 'Карьерное развитие' : language === 'kz' ? 'Мансаптық даму' : 'Career Development',
      description: language === 'ru' ? 'Получите советы о карьере, проверку резюме и подготовку к собеседованиям' : language === 'kz' ? 'Мансап туралы кеңестер, түйіндеме тексеру және сұхбаттарға дайындық алыңыз' : 'Get career advice, resume reviews, and interview preparation',
      color: 'bg-primary'
    },
    {
      icon: CheckCircle2,
      title: language === 'ru' ? 'Проверенные эксперты' : language === 'kz' ? 'Тексерілген сарапшылар' : 'Verified Experts',
      description: language === 'ru' ? 'Все наши менторы проходят тщательный отбор и проверку квалификации' : language === 'kz' ? 'Біздің барлық тәлімгерлер мұқият іріктеуден және біліктілікті тексеруден өтеді' : 'All our mentors undergo thorough vetting and qualification checks',
      color: 'bg-primary'
    }
  ];
  
  // Уникальные категории для фильтрации
  const categories = ["all", ...Array.from(new Set(dummyMentors.map(mentor => mentor.category)))];
  
  // Уникальные языки
  const languages = ["all", ...Array.from(new Set(dummyMentors.flatMap(mentor => mentor.languages)))];
  
  // Фильтрация менторов
  const filteredMentors = dummyMentors.filter(mentor => {
    const mentorText = `${mentor.name} ${mentor.title} ${mentor.company} ${mentor.bio} ${mentor.skills.join(' ')}`.toLowerCase();
    
    const matchesSearch = searchQuery === "" || mentorText.includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || mentor.category === categoryFilter;
    const matchesAvailability = availabilityFilter === "all" || 
                              (availabilityFilter === "available" && mentor.available) ||
                              (availabilityFilter === "unavailable" && !mentor.available);
    const matchesLanguage = languageFilter === "all" || mentor.languages.includes(languageFilter);
    
    return matchesSearch && matchesCategory && matchesAvailability && matchesLanguage;
  });

  // Функция для очистки фильтров
  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setAvailabilityFilter("all");
    setLanguageFilter("all");
  };

  return (
    <PublicPageLayout>
      {/* Градиентный фон */}
      <div className={`fixed inset-0 overflow-hidden pointer-events-none -z-50 ${isDark ? 'bg-gradient-background' : ''}`}>
        <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-br from-primary/5 via-transparent to-indigo-400/5 dark:from-primary/10 dark:via-transparent dark:to-indigo-400/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-tr from-blue-400/5 via-transparent to-primary/5 dark:from-blue-500/10 dark:via-transparent dark:to-primary/10 blur-3xl"></div>
      </div>
      
      <main className="relative overflow-hidden">
        {/* HERO SECTION */}
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl relative z-10" ref={heroRef}>
            {/* Hero content */}
            <motion.div 
              className="max-w-3xl mx-auto text-center mb-12"
              style={{
                opacity: heroOpacity,
                scale: heroScale,
                y: heroY
              }}
            >
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 pt-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 leading-tight"
              >
                {language === 'ru' ? 'Менторы и эксперты' : 
                language === 'kz' ? 'Тәлімгерлер мен сарапшылар' : 
                'Mentors & Experts'}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-xl text-foreground/80 mb-10"
              >
                {language === 'ru' ? 'Найдите своего ментора для персонального руководства и ускорьте свой профессиональный рост' : 
                language === 'kz' ? 'Жеке басшылық үшін өз тәлімгеріңізді табыңыз және кәсіби өсуіңізді жеделдетіңіз' : 
                'Find your mentor for personal guidance and accelerate your professional growth'}
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex flex-wrap justify-center gap-4 mb-16"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className="rounded-full px-8 py-6 text-lg bg-card border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-500 shadow-lg"
                    onClick={() => {
                      const section = document.getElementById('mentors-section');
                      if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span className="flex items-center">
                      {language === 'ru' ? 'Найти ментора' : 
                      language === 'kz' ? 'Тәлімгерді табу' : 
                      'Find a Mentor'}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Floating animation elements */}
          <motion.div 
            className="absolute top-[15%] right-[10%] text-primary/30 z-0"
            animate={{
              y: [0, 15, 0],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <UserPlus className="w-16 h-16" />
          </motion.div>

          <motion.div 
            className="absolute bottom-[30%] left-[15%] text-primary/20 z-0"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, -10, 0]
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <GraduationCap className="w-24 h-24" />
          </motion.div>

          <motion.div 
            className="absolute top-[40%] left-[10%] text-blue-400/30 z-0"
            animate={{
              y: [0, 20, 0],
              rotate: [0, 15, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Globe className="w-10 h-10" />
          </motion.div>

          <motion.div 
            className="absolute bottom-[15%] left-[20%] text-blue-400/30 z-0"
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
            <BookOpen className="w-13 h-13" />
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90">
                {language === 'ru' ? 'Почему стоит выбрать наших менторов' : 
                language === 'kz' ? 'Неліктен біздің тәлімгерлерді таңдау керек' : 
                'Why Choose Our Mentors'}
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                {language === 'ru' ? 'Получите персональное руководство от ведущих экспертов отрасли' : 
                language === 'kz' ? 'Жетекші сала мамандарынан жеке басшылық алыңыз' : 
                'Get personalized guidance from leading industry experts'}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <FeatureCard {...feature} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Main Mentors Section */}
        <section id="mentors-section" className="py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {language === 'ru' ? 'Найдите идеального ментора' : 
                language === 'kz' ? 'Мінсіз тәлімгерді табыңыз' : 
                'Find Your Perfect Mentor'}
              </h2>
              <p className="text-lg text-foreground/70">
                {language === 'ru' ? 'Просматривайте профили наших квалифицированных менторов и найдите подходящего для вас' : 
                language === 'kz' ? 'Біздің білікті тәлімгерлердің профильдерін қарап шығыңыз және өзіңізге сәйкес келетінін табыңыз' : 
                'Browse profiles of our qualified mentors and find the right match for you'}
              </p>
            </motion.div>
            
            {/* Filters Section */}
            <div className="mb-8 bg-card p-6 rounded-xl border border-border">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                <div className="flex-1">
                  <label htmlFor="search" className="text-sm font-medium mb-2 block">
                    {language === 'ru' ? 'Поиск' : language === 'kz' ? 'Іздеу' : 'Search'}
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                    <Input
                      id="search"
                      type="text"
                      placeholder={
                        language === 'ru' ? 'Поиск по имени, специальности или навыкам...' : 
                        language === 'kz' ? 'Аты, мамандығы немесе дағдылары бойынша іздеу...' : 
                        'Search by name, specialty, or skills...'
                      }
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-48">
                  <label htmlFor="category-filter" className="text-sm font-medium mb-2 block">
                    {language === 'ru' ? 'Категория' : language === 'kz' ? 'Санат' : 'Category'}
                  </label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger id="category-filter">
                      <SelectValue placeholder={
                        language === 'ru' ? 'Все категории' : 
                        language === 'kz' ? 'Барлық санаттар' : 
                        'All categories'
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === 'ru' ? 'Все категории' : 
                        language === 'kz' ? 'Барлық санаттар' : 
                        'All categories'}
                      </SelectItem>
                      {categories.filter(cat => cat !== "all").map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-48">
                  <label htmlFor="availability-filter" className="text-sm font-medium mb-2 block">
                    {language === 'ru' ? 'Доступность' : language === 'kz' ? 'Қол жетімділік' : 'Availability'}
                  </label>
                  <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                    <SelectTrigger id="availability-filter">
                      <SelectValue placeholder={
                        language === 'ru' ? 'Все' : 
                        language === 'kz' ? 'Барлығы' : 
                        'All'
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === 'ru' ? 'Все' : 
                        language === 'kz' ? 'Барлығы' : 
                        'All'}
                      </SelectItem>
                      <SelectItem value="available">
                        {language === 'ru' ? 'Доступны' : 
                        language === 'kz' ? 'Қол жетімді' : 
                        'Available'}
                      </SelectItem>
                      <SelectItem value="unavailable">
                        {language === 'ru' ? 'Недоступны' : 
                        language === 'kz' ? 'Қол жетімсіз' : 
                        'Unavailable'}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-48">
                  <label htmlFor="language-filter" className="text-sm font-medium mb-2 block">
                    {language === 'ru' ? 'Язык' : language === 'kz' ? 'Тіл' : 'Language'}
                  </label>
                  <Select value={languageFilter} onValueChange={setLanguageFilter}>
                    <SelectTrigger id="language-filter">
                      <SelectValue placeholder={
                        language === 'ru' ? 'Все языки' : 
                        language === 'kz' ? 'Барлық тілдер' : 
                        'All languages'
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {language === 'ru' ? 'Все языки' : 
                        language === 'kz' ? 'Барлық тілдер' : 
                        'All languages'}
                      </SelectItem>
                      {languages.filter(lang => lang !== "all").map(lang => (
                        <SelectItem key={lang} value={lang}>
                          {lang}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full md:w-auto mt-2 md:mt-0"
                  onClick={clearFilters}
                >
                  <Filter className="mr-2 h-4 w-4" />
                  {language === 'ru' ? 'Сбросить' : 
                  language === 'kz' ? 'Тазалау' : 
                  'Clear filters'}
                </Button>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mb-6 text-foreground/70">
              {language === 'ru' 
                ? `Найдено: ${filteredMentors.length} ${filteredMentors.length === 1 ? 'ментор' : filteredMentors.length >= 2 && filteredMentors.length <= 4 ? 'ментора' : 'менторов'}`
                : language === 'kz'
                ? `Табылды: ${filteredMentors.length} тәлімгер`
                : `Found: ${filteredMentors.length} ${filteredMentors.length === 1 ? 'mentor' : 'mentors'}`}
            </div>
            
            {/* Mentors Grid */}
            {filteredMentors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMentors.map((mentor, index) => (
                  <motion.div
                    key={mentor.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <MentorCard mentor={mentor} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <UserPlus className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'ru' ? 'Менторы не найдены' : 
                  language === 'kz' ? 'Тәлімгерлер табылмады' : 
                  'No mentors found'}
                </h3>
                <p className="text-foreground/70 max-w-md mx-auto mb-6">
                  {language === 'ru' ? 'Попробуйте изменить параметры фильтрации или поискового запроса.' : 
                  language === 'kz' ? 'Сүзгі параметрлерін немесе іздеу сұрауын өзгертіп көріңіз.' : 
                  'Try changing your filter parameters or search query.'}
                </p>
                <Button onClick={clearFilters}>
                  {language === 'ru' ? 'Сбросить фильтры' : 
                  language === 'kz' ? 'Сүзгілерді тазалау' : 
                  'Clear filters'}
                </Button>
              </div>
            )}
            
            {/* Call-to-action Section */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
              className="mt-24 text-center"
            >
              <div className="bg-gradient-to-r from-primary/10 to-indigo-600/10 rounded-2xl p-10 md:p-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {language === 'ru' ? 'Станьте ментором' : 
                  language === 'kz' ? 'Тәлімгер болыңыз' : 
                  'Become a Mentor'}
                </h2>
                <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
                  {language === 'ru' ? 'Делитесь своими знаниями, развивайте свои навыки лидерства и помогайте строить сообщество' : 
                  language === 'kz' ? 'Білімімен бөлісіңіз, көшбасшылық дағдыларыңызды дамытыңыз және қоғамдастық құруға көмектесіңіз' : 
                  'Share your knowledge, grow your leadership skills, and help build the community'}
                </p>
                <Button 
                  className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-white font-medium shadow-md shadow-primary/20 transition-all duration-300"
                  onClick={() => navigate('/become-mentor')}
                >
                  <span className="flex items-center">
                    {language === 'ru' ? 'Подать заявку' : 
                    language === 'kz' ? 'Өтініш беру' : 
                    'Apply Now'}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </span>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      
      <Footer />
    </PublicPageLayout>
  );
} 