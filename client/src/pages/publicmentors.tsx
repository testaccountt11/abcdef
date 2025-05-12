import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { useLocation } from "wouter";
import { 
  Search, Filter, Star, ArrowRight, MessageCircle, Calendar, Award, Globe, 
  BookOpen, Users, GraduationCap, CheckCircle2, Briefcase, UserPlus, Building2,
  MapPin, BadgeCheck, LucideIcon, X
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
import { AnimatePresence } from "framer-motion";

// Тип данных ментора
interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  location: string;
  profileImage: string;
  bio: string;
  bioRu?: string;
  bioKz?: string;
  category: string;
  categoryRu?: string;
  categoryKz?: string;
  skills: string[];
  skillsRu?: string[];
  skillsKz?: string[];
  languages: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  available?: boolean;
  experience: string;
}

// Демо-данные менторов
const dummyMentors = [
  {
    id: 1,
    name: "Arman Bekov",
    title: "Senior Software Engineer",
    company: "TechCorp",
    location: "Almaty, Kazakhstan",
    profileImage: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Experienced software engineer with 10+ years in full-stack development. I specialize in React, Node.js, and cloud architecture. I enjoy mentoring junior developers and helping them grow their skills.",
    bioRu: "Опытный инженер-программист с более чем 10-летним стажем в full-stack разработке. Я специализируюсь на React, Node.js и облачной архитектуре. Мне нравится наставлять начинающих разработчиков и помогать им развивать свои навыки.",
    bioKz: "Full-stack әзірлеуде 10 жылдан астам тәжірибесі бар тәжірибелі бағдарламалық инженер. Мен React, Node.js және бұлтты архитектурада маманданамын. Маған жас әзірлеушілерге тәлімгерлік ету және олардың дағдыларын дамытуға көмектесу ұнайды.",
    category: "Software Development",
    categoryRu: "Разработка ПО",
    categoryKz: "БҚ әзірлеу",
    skills: ["React", "Node.js", "AWS", "System Design", "Career Guidance"],
    skillsRu: ["React", "Node.js", "AWS", "Системный дизайн", "Карьерные советы"],
    skillsKz: ["React", "Node.js", "AWS", "Жүйелік дизайн", "Мансаптық кеңес"],
    languages: ["English", "Russian", "Kazakh"],
    rating: 4.9,
    reviewCount: 47,
    featured: true,
    available: true,
    experience: "10+ years"
  },
  {
    id: 2,
    name: "Aizhan Nurmagambetova",
    title: "Data Scientist",
    company: "Analytics Co",
    location: "Nur-Sultan, Kazakhstan",
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Data scientist with expertise in machine learning, statistical analysis, and data visualization. I love helping students make sense of data and build compelling portfolios.",
    bioRu: "Специалист по данным с опытом в машинном обучении, статистическом анализе и визуализации данных. Я люблю помогать студентам понимать данные и создавать убедительные портфолио.",
    bioKz: "Машиналық оқыту, статистикалық талдау және деректерді визуализациялау саласындағы тәжірибесі бар деректер ғалымы. Мен студенттерге деректерді түсінуге және тартымды портфолиолар жасауға көмектескенді жақсы көремін.",
    category: "Data Science",
    categoryRu: "Наука о данных",
    categoryKz: "Деректер ғылымы",
    skills: ["Python", "Machine Learning", "Statistics", "Data Visualization", "SQL"],
    skillsRu: ["Python", "Машинное обучение", "Статистика", "Визуализация данных", "SQL"],
    skillsKz: ["Python", "Машиналық оқыту", "Статистика", "Деректерді визуализациялау", "SQL"],
    languages: ["English", "Russian"],
    rating: 4.8,
    reviewCount: 32,
    featured: true,
    available: true,
    experience: "7 years"
  },
  {
    id: 3,
    name: "Daulet Kenesbek",
    title: "UX/UI Designer",
    company: "Design Studio",
    location: "Almaty, Kazakhstan",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Passionate designer with a focus on creating intuitive user experiences. I believe in design thinking and user-centered approaches to product development.",
    bioRu: "Увлеченный дизайнер, ориентированный на создание интуитивно понятного пользовательского опыта. Я верю в дизайн-мышление и подходы, ориентированные на пользователя, в разработке продуктов.",
    bioKz: "Интуитивті пайдаланушы тәжірибесін жасауға бағытталған құмар дизайнер. Мен өнімді әзірлеуде дизайнерлік ойлау мен пайдаланушыға бағытталған тәсілдерге сенемін.",
    category: "Design",
    categoryRu: "Дизайн",
    categoryKz: "Дизайн",
    skills: ["UX Design", "UI Design", "Figma", "Design Systems", "Prototyping"],
    skillsRu: ["UX дизайн", "UI дизайн", "Figma", "Системы дизайна", "Прототипирование"],
    skillsKz: ["UX дизайн", "UI дизайн", "Figma", "Дизайн жүйелері", "Прототиптеу"],
    languages: ["English", "Kazakh"],
    rating: 4.7,
    reviewCount: 23,
    featured: false,
    available: true,
    experience: "5 years"
  },
  {
    id: 4,
    name: "Nurlan Abdrakhmanov",
    title: "Marketing Manager",
    company: "Brand Solutions",
    location: "Nur-Sultan, Kazakhstan",
    profileImage: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Marketing professional focused on digital strategies, branding, and growth marketing. I help new businesses establish their presence and grow their audience.",
    bioRu: "Маркетолог, специализирующийся на цифровых стратегиях, брендинге и маркетинге роста. Я помогаю новым компаниям утвердить свое присутствие и увеличить свою аудиторию.",
    bioKz: "Сандық стратегияларға, брендингке және өсу маркетингіне бағытталған маркетинг маманы. Мен жаңа компанияларға өз қатысуын бекітуге және аудиториясын кеңейтуге көмектесемін.",
    category: "Marketing",
    categoryRu: "Маркетинг",
    categoryKz: "Маркетинг",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics"],
    skillsRu: ["Цифровой маркетинг", "SEO", "Стратегия контента", "Соц. сети", "Аналитика"],
    skillsKz: ["Сандық маркетинг", "SEO", "Контент стратегиясы", "Әлеум. желілер", "Аналитика"],
    languages: ["English", "Russian"],
    rating: 4.6,
    reviewCount: 18,
    featured: false,
    available: false,
    experience: "8 years"
  },
  {
    id: 5,
    name: "Kanat Zhumabekov",
    title: "Product Manager",
    company: "Product House",
    location: "Shymkent, Kazakhstan",
    profileImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Product manager with experience leading teams and launching successful products. I focus on user-centered design and agile methodologies.",
    bioRu: "Продакт-менеджер с опытом руководства командами и запуска успешных продуктов. Я концентрируюсь на дизайне, ориентированном на пользователя, и гибких методологиях.",
    bioKz: "Командаларды басқару және табысты өнімдерді шығару тәжірибесі бар өнім менеджері. Мен пайдаланушыға бағытталған дизайнға және икемді әдістемелерге назар аударамын.",
    category: "Product Management",
    categoryRu: "Управление продуктом",
    categoryKz: "Өнімді басқару",
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping", "Product Analytics"],
    skillsRu: ["Продуктовая стратегия", "Agile", "Пользовательские исследования", "Роадмаппинг", "Продуктовая аналитика"],
    skillsKz: ["Өнім стратегиясы", "Agile", "Пайдаланушы зерттеулері", "Жол картасы", "Өнім аналитикасы"],
    languages: ["English", "Russian", "Kazakh"],
    rating: 4.9,
    reviewCount: 27,
    featured: true,
    available: true,
    experience: "6 years"
  },
  {
    id: 6,
    name: "Aliya Nurmukhambetova",
    title: "Financial Analyst",
    company: "Finance Group",
    location: "Almaty, Kazakhstan",
    profileImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=256&h=256&q=80",
    bio: "Finance professional with experience in investment analysis, financial modeling, and strategic planning. I provide guidance on finance careers and skill development.",
    bioRu: "Финансовый специалист с опытом в области инвестиционного анализа, финансового моделирования и стратегического планирования. Я предоставляю рекомендации по финансовым карьерам и развитию навыков.",
    bioKz: "Инвестициялық талдау, қаржылық модельдеу және стратегиялық жоспарлау саласындағы тәжірибесі бар қаржы маманы. Мен қаржылық мансап және дағдыларды дамыту бойынша кеңес беремін.",
    category: "Finance",
    categoryRu: "Финансы",
    categoryKz: "Қаржы",
    skills: ["Financial Modeling", "Valuation", "Excel", "Investment Analysis", "Financial Planning"],
    skillsRu: ["Финансовое моделирование", "Оценка", "Excel", "Инвестиционный анализ", "Финансовое планирование"],
    skillsKz: ["Қаржылық модельдеу", "Бағалау", "Excel", "Инвестициялық талдау", "Қаржылық жоспарлау"],
    languages: ["English", "Kazakh"],
    rating: 4.8,
    reviewCount: 21,
    featured: false,
    available: true,
    experience: "9 years"
  }
];

// Преимущества работы с менторами
interface Feature {
  icon: LucideIcon;
  title: string;
  titleRu: string;
  titleKz: string;
  description: string;
  descriptionRu: string;
  descriptionKz: string;
  color: string;
}

// Локализованные данные
const translations = {
  en: {
    pageTitle: "Mentors & Experts",
    pageSubtitle: "Find your mentor for personal guidance and accelerate your professional growth",
    findMentor: "Find a Mentor",
    whyChoose: "Why Choose Our Mentors",
    whyChooseDesc: "Get personalized guidance from leading industry experts",
    findPerfect: "Find Your Perfect Mentor",
    findPerfectDesc: "Browse profiles of our qualified mentors and find the right match for you",
    search: "Search",
    searchPlaceholder: "Search by name, specialty, or skills...",
    category: "Category",
    allCategories: "All categories",
    availability: "Availability",
    all: "All",
    available: "Available",
    unavailable: "Unavailable",
    language: "Language",
    allLanguages: "All languages",
    clearFilters: "Clear filters",
    found: "Found",
    mentor: "mentor",
    mentors: "mentors",
    noMentors: "No mentors found",
    noMentorsDesc: "Try changing your filter parameters or search query.",
    clearFiltersBtn: "Clear filters",
    becomeMentor: "Become a Mentor",
    becomeMentorDesc: "Share your knowledge, grow your leadership skills, and help build the community",
    applyNow: "Apply Now",
    expertise: "Expertise",
    connect: "Connect",
    years: "years",
    rating: "rating",
    reviews: "reviews",
    featured: "Featured"
  },
  ru: {
    pageTitle: "Менторы и эксперты",
    pageSubtitle: "Найдите своего ментора для персонального руководства и ускорьте свой профессиональный рост",
    findMentor: "Найти ментора",
    whyChoose: "Почему стоит выбрать наших менторов",
    whyChooseDesc: "Получите персональное руководство от ведущих экспертов отрасли",
    findPerfect: "Найдите идеального ментора",
    findPerfectDesc: "Просматривайте профили наших квалифицированных менторов и найдите подходящего для вас",
    search: "Поиск",
    searchPlaceholder: "Поиск по имени, специальности или навыкам...",
    category: "Категория",
    allCategories: "Все категории",
    availability: "Доступность",
    all: "Все",
    available: "Доступны",
    unavailable: "Недоступны",
    language: "Язык",
    allLanguages: "Все языки",
    clearFilters: "Сбросить",
    found: "Найдено",
    mentor: "ментор",
    mentors: "менторов",
    noMentors: "Менторы не найдены",
    noMentorsDesc: "Попробуйте изменить параметры фильтрации или поискового запроса.",
    clearFiltersBtn: "Сбросить фильтры",
    becomeMentor: "Станьте ментором",
    becomeMentorDesc: "Делитесь своими знаниями, развивайте свои навыки лидерства и помогайте строить сообщество",
    applyNow: "Подать заявку",
    expertise: "Экспертиза",
    connect: "Связаться",
    years: "лет опыта",
    rating: "рейтинг",
    reviews: "отзывов",
    featured: "Рекомендуемый"
  },
  kz: {
    pageTitle: "Тәлімгерлер мен сарапшылар",
    pageSubtitle: "Жеке басшылық үшін өз тәлімгеріңізді табыңыз және кәсіби өсуіңізді жеделдетіңіз",
    findMentor: "Тәлімгерді табу",
    whyChoose: "Неліктен біздің тәлімгерлерді таңдау керек",
    whyChooseDesc: "Жетекші сала мамандарынан жеке басшылық алыңыз",
    findPerfect: "Мінсіз тәлімгерді табыңыз",
    findPerfectDesc: "Біздің білікті тәлімгерлердің профильдерін қарап шығыңыз және өзіңізге сәйкес келетінін табыңыз",
    search: "Іздеу",
    searchPlaceholder: "Аты, мамандығы немесе дағдылары бойынша іздеу...",
    category: "Санат",
    allCategories: "Барлық санаттар",
    availability: "Қол жетімділік",
    all: "Барлығы",
    available: "Қол жетімді",
    unavailable: "Қол жетімсіз",
    language: "Тіл",
    allLanguages: "Барлық тілдер",
    clearFilters: "Тазалау",
    found: "Табылды",
    mentor: "тәлімгер",
    mentors: "тәлімгер",
    noMentors: "Тәлімгерлер табылмады",
    noMentorsDesc: "Сүзгі параметрлерін немесе іздеу сұрауын өзгертіп көріңіз.",
    clearFiltersBtn: "Сүзгілерді тазалау",
    becomeMentor: "Тәлімгер болыңыз",
    becomeMentorDesc: "Білімімен бөлісіңіз, көшбасшылық дағдыларыңызды дамытыңыз және қоғамдастық құруға көмектесіңіз",
    applyNow: "Өтініш беру",
    expertise: "Мамандану",
    connect: "Байланысу",
    years: "жыл тәжірибе",
    rating: "рейтинг",
    reviews: "пікір",
    featured: "Ұсынылған"
  }
};

// Компонент карточки преимуществ
function FeatureCard({ icon: Icon, title, titleRu, titleKz, description, descriptionRu, descriptionKz, color }: Feature) {
  const { language } = useTranslations();
  
  const localizedTitle = language === 'ru' ? titleRu : language === 'kz' ? titleKz : title;
  const localizedDescription = language === 'ru' ? descriptionRu : language === 'kz' ? descriptionKz : description;
  
  return (
    <div className="bg-card dark:bg-card rounded-xl p-6 shadow-sm border border-border relative h-full">
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 text-white`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{localizedTitle}</h3>
      <p className="text-foreground/70">{localizedDescription}</p>
    </div>
  );
}

// Компонент карточки ментора
function MentorCard({ mentor, onSelect }: { mentor: Mentor; onSelect: (mentor: Mentor) => void }) {
  const { language } = useTranslations();
  const [, navigate] = useLocation();
  
  const getText = (lang: string) => {
    return translations[lang as keyof typeof translations];
  };
  
  const t = getText(language || 'en');
  
  // Получение локализованных данных
  const getBio = () => {
    if (language === 'ru' && mentor.bioRu) return mentor.bioRu;
    if (language === 'kz' && mentor.bioKz) return mentor.bioKz;
    return mentor.bio;
  };
  
  const getCategory = () => {
    if (language === 'ru' && mentor.categoryRu) return mentor.categoryRu;
    if (language === 'kz' && mentor.categoryKz) return mentor.categoryKz;
    return mentor.category;
  };
  
  const getSkills = () => {
    if (language === 'ru' && mentor.skillsRu) return mentor.skillsRu;
    if (language === 'kz' && mentor.skillsKz) return mentor.skillsKz;
    return mentor.skills;
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md group transition-all duration-300 flex flex-col h-[550px]">
      {/* Верхняя часть карточки с изображением и градиентом */}
      <div className="h-64 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <img 
          src={mentor.profileImage} 
          alt={mentor.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e) => {
            // При ошибке загрузки используем градиентный фон с инициалами
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const parent = target.parentElement;
            if (parent) {
              const gradientDiv = document.createElement('div');
              gradientDiv.className = "absolute inset-0 bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center";
              const text = document.createElement('span');
              text.className = "text-white text-3xl font-bold text-center";
              text.textContent = mentor.name.split(' ').map(word => word[0]).join('');
              gradientDiv.appendChild(text);
              parent.appendChild(gradientDiv);
            }
          }}
        />
        
        {/* Категория и бейдж */}
        <Badge className="absolute top-4 left-4 z-20 bg-blue-600 text-white border-none">
          {getCategory()}
        </Badge>
        
        {/* Выделенный ментор */}
        {mentor.featured && (
          <div className="absolute top-4 right-4 z-20 bg-yellow-500 text-xs text-white px-2 py-1 rounded-full flex items-center">
            <Award className="w-3 h-3 mr-1" />
            <span>{language === 'ru' ? 'Рекомендуемый' : language === 'kz' ? 'Ұсынылған' : 'Featured'}</span>
          </div>
        )}
        
        {/* Информация о менторе поверх изображения */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h3 className="text-xl font-bold text-white">{mentor.name}</h3>
          <div className="flex items-center text-white/80 text-sm mt-1">
            <Building2 className="w-4 h-4 mr-1" />
            <span className="truncate">{mentor.title}</span>
          </div>
          <div className="flex items-center text-white/80 text-sm mt-1">
            {mentor.company && (
              <>
                <Building2 className="w-4 h-4 mr-1" />
                <span className="truncate">{mentor.company}</span>
              </>
            )}
          </div>
          <div className="flex items-center text-white/80 text-sm mt-1">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate">{mentor.location}</span>
          </div>
        </div>
      </div>
      
      {/* Контентная часть карточки */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Рейтинг */}
        <div className="flex items-center text-sm mb-3">
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`w-4 h-4 ${star <= Math.floor(mentor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
              />
            ))}
            <span className="ml-2 text-foreground/80">
              {mentor.rating.toFixed(1)} • {mentor.reviewCount} {language === 'ru' ? 'отзывов' : language === 'kz' ? 'пікір' : 'reviews'}
            </span>
          </div>
        </div>
        
        {/* Опыт и доступность */}
        <div className="flex justify-between items-center mb-3">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800">
            {mentor.experience}
          </Badge>
          
          {mentor.available ? (
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
              <BadgeCheck className="w-3 h-3 mr-1" /> {language === 'ru' ? 'Доступен' : language === 'kz' ? 'Қол жетімді' : 'Available'}
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
              {language === 'ru' ? 'Недоступен' : language === 'kz' ? 'Қол жетімсіз' : 'Unavailable'}
            </Badge>
          )}
        </div>
        
        {/* Биография */}
        <p className="text-foreground/80 text-sm line-clamp-3 mb-4">{getBio()}</p>
        
        {/* Навыки */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2">
            {language === 'ru' ? 'Экспертиза' : language === 'kz' ? 'Мамандану' : 'Expertise'}:
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {getSkills().slice(0, 4).map((skill, index) => (
              <Badge key={index} variant="secondary" className="bg-primary/10 text-primary border-primary/20 text-xs">
                {skill}
              </Badge>
            ))}
            {getSkills().length > 4 && (
              <Badge variant="outline" className="text-xs">
                +{getSkills().length - 4}
              </Badge>
            )}
          </div>
        </div>
        
        {/* Языки */}
        <div className="flex items-center text-xs text-foreground/70 mb-4">
          <Globe className="w-3 h-3 mr-1" />
          {mentor.languages.join(', ')}
        </div>
        
        {/* Кнопка (внизу карточки) */}
        <div className="mt-auto">
          <Button 
            className="w-full gap-2 rounded-full"
            variant={mentor.available ? "default" : "outline"}
            disabled={!mentor.available}
            onClick={() => onSelect(mentor)}
          >
            <MessageCircle className="w-4 h-4" />
            {language === 'ru' ? 'Подробнее' : language === 'kz' ? 'Толығырақ' : 'Details'}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Основной компонент страницы
export default function PublicMentors() {
  const { language } = useTranslations();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("all");
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  
  // Refs для анимации
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, 50]);
  
  // Получение текстов в зависимости от языка
  const getText = (lang: string) => {
    return translations[lang as keyof typeof translations];
  };
  
  const t = getText(language || 'en');
  
  // Features array
  const features: Feature[] = [
    {
      icon: UserPlus,
      title: "Personal Support",
      titleRu: "Индивидуальная поддержка",
      titleKz: "Жеке қолдау",
      description: "Get personalized guidance from experienced professionals in your field",
      descriptionRu: "Персональное руководство от опытных профессионалов в вашей области",
      descriptionKz: "Сіздің саладағы тәжірибелі мамандардан жеке басшылық",
      color: 'bg-primary'
    },
    {
      icon: GraduationCap,
      title: "First-hand Knowledge",
      titleRu: "Знания из первых рук",
      titleKz: "Бірінші қолдан білім",
      description: "Gain valuable insights from specialists working in the industry",
      descriptionRu: "Получите ценные знания от специалистов, работающих в индустрии",
      descriptionKz: "Индустрияда жұмыс істейтін мамандардан құнды білім алыңыз",
      color: 'bg-primary'
    },
    {
      icon: Briefcase,
      title: "Career Development",
      titleRu: "Карьерное развитие",
      titleKz: "Мансаптық даму",
      description: "Get career advice, resume reviews, and interview preparation",
      descriptionRu: "Получите советы о карьере, проверку резюме и подготовку к собеседованиям",
      descriptionKz: "Мансап туралы кеңестер, түйіндеме тексеру және сұхбаттарға дайындық алыңыз",
      color: 'bg-primary'
    },
    {
      icon: CheckCircle2,
      title: "Verified Experts",
      titleRu: "Проверенные эксперты",
      titleKz: "Тексерілген сарапшылар",
      description: "All our mentors undergo thorough vetting and qualification checks",
      descriptionRu: "Все наши менторы проходят тщательный отбор и проверку квалификации",
      descriptionKz: "Біздің барлық тәлімгерлер мұқият іріктеуден және біліктілікті тексеруден өтеді",
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

  // В начало компонента PublicMentors добавим состояние для модального окна:
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Функция для открытия модального окна
  const openMentorModal = (mentor: Mentor) => {
    setSelectedMentor(mentor);
    setIsModalOpen(true);
  };

  // Функция для закрытия модального окна
  const closeMentorModal = () => {
    setIsModalOpen(false);
    // Сбрасываем выбранного ментора не сразу, а после закрытия анимации
    setTimeout(() => setSelectedMentor(null), 300);
  };
  
  return (
    <PublicPageLayout>
      {/* Градиентный фон */}
      <div className={`fixed inset-0 overflow-hidden pointer-events-none -z-50 ${theme === 'dark' ? 'bg-gradient-background' : ''}`}>
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
                {t.pageTitle}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-xl text-foreground/80 mb-10"
              >
                {t.pageSubtitle}
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
                      {t.findMentor}
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
                {t.whyChoose}
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                {t.whyChooseDesc}
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
                {t.findPerfect}
              </h2>
              <p className="text-lg text-foreground/70">
                {t.findPerfectDesc}
              </p>
            </motion.div>
            
            {/* Filters Section */}
            <div className="mb-8 bg-card p-6 rounded-xl border border-border">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
                <div className="flex-1">
                  <label htmlFor="search" className="text-sm font-medium mb-2 block">
                    {t.search}
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input
                      id="search"
                      type="text"
                      placeholder={t.searchPlaceholder}
                  className="pl-10"
                  value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                />
                  </div>
              </div>
              
              <div className="w-full md:w-48">
                  <label htmlFor="category-filter" className="text-sm font-medium mb-2 block">
                    {t.category}
                  </label>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger id="category-filter">
                      <SelectValue placeholder={t.allCategories} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {t.allCategories}
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
                    {t.availability}
                  </label>
                  <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                    <SelectTrigger id="availability-filter">
                      <SelectValue placeholder={t.all} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {t.all}
                      </SelectItem>
                      <SelectItem value="available">
                        {t.available}
                      </SelectItem>
                      <SelectItem value="unavailable">
                        {t.unavailable}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="w-full md:w-48">
                  <label htmlFor="language-filter" className="text-sm font-medium mb-2 block">
                    {t.language}
                  </label>
                  <Select value={languageFilter} onValueChange={setLanguageFilter}>
                    <SelectTrigger id="language-filter">
                      <SelectValue placeholder={t.allLanguages} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">
                        {t.allLanguages}
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
                  {t.clearFilters}
                </Button>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mb-6 text-foreground/70">
              {t.found}: {filteredMentors.length} {filteredMentors.length === 1 ? t.mentor : t.mentors}
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
                    <MentorCard 
                      mentor={mentor} 
                      onSelect={openMentorModal} 
                    />
                  </motion.div>
                ))}
                  </div>
            ) : (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <UserPlus className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  {t.noMentors}
                </h3>
                <p className="text-foreground/70 max-w-md mx-auto mb-6">
                  {t.noMentorsDesc}
                </p>
                <Button onClick={clearFilters}>
                  {t.clearFiltersBtn}
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
                  {t.becomeMentor}
                </h2>
                <p className="text-lg text-foreground/80 max-w-2xl mx-auto mb-8">
                  {t.becomeMentorDesc}
            </p>
            <Button 
                  className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-white font-medium shadow-md shadow-primary/20 transition-all duration-300"
                  onClick={() => navigate('/become-mentor')}
                >
                  <span className="flex items-center">
                    {t.applyNow}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </span>
            </Button>
              </div>
            </motion.div>
        </div>
      </section>
      </main>
      
      <Footer />

      {/* Модальное окно с деталями ментора */}
      <AnimatePresence>
        {isModalOpen && selectedMentor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={closeMentorModal}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto relative animate-in fade-in duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header с изображением */}
              <div className="h-64 md:h-80 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
                <img 
                  src={selectedMentor.profileImage} 
                  alt={selectedMentor.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback при ошибке загрузки изображения
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      const gradientDiv = document.createElement('div');
                      gradientDiv.className = "absolute inset-0 bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center";
                      const text = document.createElement('span');
                      text.className = "text-white text-5xl font-bold text-center";
                      text.textContent = selectedMentor.name.split(' ').map(word => word[0]).join('');
                      gradientDiv.appendChild(text);
                      parent.appendChild(gradientDiv);
                    }
                  }} 
                />
                
                {/* Кнопка закрытия */}
                <button 
                  onClick={closeMentorModal} 
                  className="absolute top-4 right-4 z-50 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                
                {/* Информация о менторе поверх изображения */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                  {/* Категория */}
                  <Badge className="bg-blue-600 text-white mb-2">
                    {language === 'ru' && selectedMentor.categoryRu ? selectedMentor.categoryRu : 
                     language === 'kz' && selectedMentor.categoryKz ? selectedMentor.categoryKz : 
                     selectedMentor.category}
                  </Badge>
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedMentor.name}</h2>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-white/90">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      {selectedMentor.title} {selectedMentor.company && `at ${selectedMentor.company}`}
                    </div>
                    
                    <div className="hidden md:block text-white/50">•</div>
                    
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {selectedMentor.location}
                    </div>
                    
                    <div className="hidden md:block text-white/50">•</div>
                    
                    <div className="flex items-center">
                      <Briefcase className="w-4 h-4 mr-2" />
                      {selectedMentor.experience}
                    </div>
                  </div>
              </div>
            </div>
            
              {/* Основное содержимое */}
              <div className="p-6 md:p-8">
                {/* Рейтинг и статус доступности */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                        className={`w-5 h-5 ${star <= Math.floor(selectedMentor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
                    <span className="ml-2 text-foreground/80 font-medium">
                      {selectedMentor.rating.toFixed(1)}
                    </span>
                    <span className="mx-2 text-muted-foreground">•</span>
                    <span className="text-muted-foreground">
                      {selectedMentor.reviewCount} {language === 'ru' ? 'отзывов' : language === 'kz' ? 'пікір' : 'reviews'}
              </span>
            </div>
            
                  {selectedMentor.available ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                      <BadgeCheck className="w-4 h-4 mr-2" /> {language === 'ru' ? 'Доступен для менторства' : language === 'kz' ? 'Тәлімгерлікке қол жетімді' : 'Available for mentoring'}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
                      {language === 'ru' ? 'Временно недоступен' : language === 'kz' ? 'Уақытша қол жетімсіз' : 'Temporarily unavailable'}
                    </Badge>
                  )}
                </div>
                
                {/* Биография */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {language === 'ru' ? 'О менторе' : language === 'kz' ? 'Тәлімгер туралы' : 'About the Mentor'}
                  </h3>
                  <p className="text-foreground/80">
                    {language === 'ru' && selectedMentor.bioRu ? selectedMentor.bioRu : 
                     language === 'kz' && selectedMentor.bioKz ? selectedMentor.bioKz : 
                     selectedMentor.bio}
                  </p>
                </div>
                
                {/* Навыки */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {language === 'ru' ? 'Экспертиза' : language === 'kz' ? 'Мамандану' : 'Expertise'}
                  </h3>
              <div className="flex flex-wrap gap-2">
                    {(language === 'ru' && selectedMentor.skillsRu ? selectedMentor.skillsRu : 
                      language === 'kz' && selectedMentor.skillsKz ? selectedMentor.skillsKz : 
                      selectedMentor.skills).map((skill, index) => (
                      <Badge key={index} className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
                {/* Языки */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4 text-foreground">
                    {language === 'ru' ? 'Языки' : language === 'kz' ? 'Тілдер' : 'Languages'}
                  </h3>
                  <div className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-foreground/70" />
                    <span className="text-foreground/80">
                      {selectedMentor.languages.join(', ')}
                    </span>
          </div>
        </div>
        
                {/* Кнопка действия */}
                <div className="mt-8">
                  <Button 
                    className="w-full py-6 text-lg rounded-full"
                    disabled={!selectedMentor.available}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {language === 'ru' ? 'Связаться с ментором' : language === 'kz' ? 'Тәлімгермен байланысу' : 'Connect with Mentor'}
          </Button>
                  
                  <p className="text-center text-muted-foreground mt-3 text-sm">
                    {language === 'ru' ? 'Для связи с ментором необходимо зарегистрироваться или войти' : 
                     language === 'kz' ? 'Тәлімгермен байланысу үшін тіркелу немесе кіру қажет' : 
                     'You need to sign up or login to connect with mentors'}
                  </p>
                </div>
        </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PublicPageLayout>
  );
} 