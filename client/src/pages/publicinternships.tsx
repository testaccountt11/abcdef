import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { useLocation } from "wouter";
import { 
  Search, Filter, Briefcase, MapPin, Clock, Calendar, 
  ArrowRight, CheckCircle2, BookOpen, Star, Layers, 
  Building, LucideIcon, BarChart, Trophy, GraduationCap,
  Globe, ExternalLink, BookmarkPlus, Users,
  Heart, X, ChevronLeft, ChevronRight, RotateCcw, FolderX, Building2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublicPageLayout } from "@/components/layouts/PublicPageLayout";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { useTheme } from "@/contexts/ThemeContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Типы для стажировок
type Internship = {
  id: number;
  title: string;
  titleRu?: string;
  titleKz?: string;
  company: string;
  companyLogo: string;
  location: string;
  locationType: 'remote' | 'onsite' | 'hybrid';
  description: string;
  descriptionRu?: string;
  descriptionKz?: string;
  duration: string;
  applicationDeadline: string;
  category: string;
  skills: string[];
  isPaid: boolean;
  featured: boolean;
  appliedCount?: number;
  level?: string; // добавим для единообразия с курсами
  externalUrl?: string;
};

// Пример данных для стажировок (расширенный до 9 стажировок)
const dummyInternships: Internship[] = [
  {
    id: 1,
    title: "Software Development Intern",
    titleRu: "Стажер-разработчик ПО",
    titleKz: "Бағдарламалық жасақтама әзірлеуші-тәлімгер",
    company: "Tech Solutions Inc.",
    companyLogo: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Astana, Kazakhstan",
    locationType: "hybrid",
    description: "Join our development team to gain hands-on experience building real-world applications using modern technologies.",
    descriptionRu: "Присоединяйтесь к нашей команде разработчиков, чтобы получить практический опыт создания реальных приложений с использованием современных технологий.",
    descriptionKz: "Заманауи технологияларды қолдана отырып, нақты қосымшаларды құру бойынша тәжірибе алу үшін біздің әзірлеушілер тобына қосылыңыз.",
    duration: "3 months",
    applicationDeadline: "2023-12-15",
    category: "Technology",
    skills: ["JavaScript", "React", "Node.js"],
    isPaid: true,
    featured: true,
    appliedCount: 45,
    level: "Beginner"
  },
  {
    id: 2,
    title: "Marketing Internship",
    titleRu: "Стажировка в маркетинге",
    titleKz: "Маркетингтегі тағылымдама",
    company: "Global Brands",
    companyLogo: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Almaty, Kazakhstan",
    locationType: "onsite",
    description: "Learn digital marketing strategies while working with our experienced marketing team on real campaigns.",
    descriptionRu: "Изучайте стратегии цифрового маркетинга, работая с нашей опытной маркетинговой командой над реальными кампаниями.",
    descriptionKz: "Тәжірибелі маркетинг тобымен нақты науқандармен жұмыс істей отырып, сандық маркетинг стратегияларын үйреніңіз.",
    duration: "4 months",
    applicationDeadline: "2023-11-30",
    category: "Marketing",
    skills: ["Social Media", "Content Creation", "Analytics"],
    isPaid: true,
    featured: true,
    appliedCount: 32,
    level: "Beginner"
  },
  {
    id: 3,
    title: "Data Science Intern",
    titleRu: "Стажер по науке о данных",
    titleKz: "Деректер ғылымы бойынша тәлімгер",
    company: "Analytics Pro",
    companyLogo: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Remote",
    locationType: "remote",
    description: "Apply machine learning and statistical analysis to solve real business problems and gain valuable experience.",
    descriptionRu: "Применяйте машинное обучение и статистический анализ для решения реальных бизнес-задач и получения ценного опыта.",
    descriptionKz: "Нақты бизнес мәселелерін шешу және құнды тәжірибе алу үшін машиналық оқыту мен статистикалық талдауды қолданыңыз.",
    duration: "6 months",
    applicationDeadline: "2023-12-10",
    category: "Data Science",
    skills: ["Python", "Machine Learning", "SQL", "Data Visualization"],
    isPaid: true,
    featured: false,
    appliedCount: 67,
    level: "Intermediate"
  },
  {
    id: 4,
    title: "UI/UX Design Internship",
    titleRu: "Стажировка по UI/UX дизайну",
    titleKz: "UI/UX дизайны бойынша тағылымдама",
    company: "Creative Studio",
    companyLogo: "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Astana, Kazakhstan",
    locationType: "hybrid",
    description: "Design user interfaces and experiences for web and mobile applications while learning industry best practices.",
    descriptionRu: "Проектируйте пользовательские интерфейсы и опыт для веб и мобильных приложений, изучая лучшие практики отрасли.",
    descriptionKz: "Саланың ең жақсы тәжірибелерін үйрене отырып, веб және мобильді қосымшалар үшін пайдаланушы интерфейстері мен тәжірибесін жобалаңыз.",
    duration: "3 months",
    applicationDeadline: "2023-11-25",
    category: "Design",
    skills: ["Figma", "Adobe XD", "UI Design", "Prototyping"],
    isPaid: false,
    featured: false,
    appliedCount: 28,
    level: "Beginner"
  },
  {
    id: 5,
    title: "Financial Analyst Intern",
    titleRu: "Стажер-финансовый аналитик",
    titleKz: "Қаржы талдаушысы-тәлімгер",
    company: "Investment Bank Ltd.",
    companyLogo: "https://images.unsplash.com/photo-1591696205602-2f950c417cb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Almaty, Kazakhstan",
    locationType: "onsite",
    description: "Assist in financial modeling, reporting, and analysis while learning from experienced financial analysts.",
    descriptionRu: "Помогайте в финансовом моделировании, отчетности и анализе, обучаясь у опытных финансовых аналитиков.",
    descriptionKz: "Тәжірибелі қаржы талдаушыларынан үйрене отырып, қаржылық модельдеуге, есеп беруге және талдауға көмектесіңіз.",
    duration: "4 months",
    applicationDeadline: "2023-12-05",
    category: "Finance",
    skills: ["Excel", "Financial Modeling", "Data Analysis"],
    isPaid: true,
    featured: false,
    appliedCount: 39,
    level: "Advanced"
  },
  {
    id: 6,
    title: "Content Writing Intern",
    titleRu: "Стажер по написанию контента",
    titleKz: "Мазмұн жазу бойынша тәлімгер",
    company: "Digital Media Group",
    companyLogo: "https://images.unsplash.com/photo-1493612276216-ee3925520721?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Remote",
    locationType: "remote",
    description: "Create engaging content for various platforms while developing your writing skills under professional guidance.",
    descriptionRu: "Создавайте увлекательный контент для различных платформ, развивая свои писательские навыки под профессиональным руководством.",
    descriptionKz: "Кәсіби басшылықпен жазу дағдыларыңызды дамыта отырып, әртүрлі платформалар үшін қызықты контент жасаңыз.",
    duration: "3 months",
    applicationDeadline: "2023-11-20",
    category: "Media",
    skills: ["Copywriting", "Content Strategy", "SEO", "Editing"],
    isPaid: false,
    featured: false,
    appliedCount: 23,
    level: "Beginner"
  },
  {
    id: 7,
    title: "Project Management Intern",
    titleRu: "Стажер по управлению проектами",
    titleKz: "Жобаларды басқару бойынша тәлімгер",
    company: "Construction Solutions",
    companyLogo: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Astana, Kazakhstan",
    locationType: "hybrid",
    description: "Learn project management methodologies while working with real projects in the construction industry.",
    descriptionRu: "Изучайте методологии управления проектами, работая с реальными проектами в строительной отрасли.",
    descriptionKz: "Құрылыс саласындағы нақты жобалармен жұмыс істей отырып, жобаларды басқару әдістемелерін үйреніңіз.",
    duration: "5 months",
    applicationDeadline: "2023-12-01",
    category: "Management",
    skills: ["Project Planning", "Risk Management", "Agile", "Scrum"],
    isPaid: true,
    featured: true,
    appliedCount: 41,
    level: "Intermediate"
  },
  {
    id: 8,
    title: "Graphic Design Intern",
    titleRu: "Стажер по графическому дизайну",
    titleKz: "Графикалық дизайн бойынша тәлімгер",
    company: "Creative Arts Studio",
    companyLogo: "https://images.unsplash.com/photo-1626785774573-4b799315345d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Almaty, Kazakhstan",
    locationType: "hybrid",
    description: "Create engaging visual materials for print and digital media while learning from experienced designers.",
    descriptionRu: "Создавайте привлекательные визуальные материалы для печатных и цифровых медиа, обучаясь у опытных дизайнеров.",
    descriptionKz: "Тәжірибелі дизайнерлерден үйрене отырып, баспа және сандық медиа үшін тартымды визуалды материалдар жасаңыз.",
    duration: "4 months",
    applicationDeadline: "2023-12-20",
    category: "Design",
    skills: ["Adobe Illustrator", "Photoshop", "Typography", "Brand Design"],
    isPaid: false,
    featured: false,
    appliedCount: 36,
    level: "Beginner"
  },
  {
    id: 9,
    title: "QA Testing Intern",
    titleRu: "Стажер по тестированию QA",
    titleKz: "QA тестілеу бойынша тәлімгер",
    company: "Software Solutions Ltd",
    companyLogo: "https://images.unsplash.com/photo-1535303311164-664fc9ec6532?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Remote",
    locationType: "remote",
    description: "Learn the principles and practices of quality assurance testing while working on real software products.",
    descriptionRu: "Изучайте принципы и практики тестирования качества, работая с реальными программными продуктами.",
    descriptionKz: "Нақты бағдарламалық өнімдермен жұмыс істей отырып, сапаны қамтамасыз ету тестілеуінің қағидалары мен тәжірибелерін үйреніңіз.",
    duration: "3 months",
    applicationDeadline: "2023-12-25",
    category: "Technology",
    skills: ["Manual Testing", "Test Case Design", "Regression Testing", "Bug Reporting"],
    isPaid: true,
    featured: false,
    appliedCount: 29,
    level: "Beginner"
  }
];

// Вспомогательные функции для переводов
function getCategoryRu(category: string): string {
  const categoryMap: Record<string, string> = {
    'Technology': 'Технологии',
    'Marketing': 'Маркетинг',
    'Data Science': 'Наука о данных',
    'Design': 'Дизайн',
    'Finance': 'Финансы',
    'Media': 'Медиа',
    'Management': 'Управление'
  };
  return categoryMap[category] || category;
}

function getCategoryKz(category: string): string {
  const categoryMap: Record<string, string> = {
    'Technology': 'Технологиялар',
    'Marketing': 'Маркетинг',
    'Data Science': 'Деректер ғылымы',
    'Design': 'Дизайн',
    'Finance': 'Қаржы',
    'Media': 'Медиа',
    'Management': 'Басқару'
  };
  return categoryMap[category] || category;
}

function getLocationTypeRu(locationType: string): string {
  const locationMap: Record<string, string> = {
    'remote': 'Удаленно',
    'onsite': 'В офисе',
    'hybrid': 'Гибридный'
  };
  return locationMap[locationType] || locationType;
}

function getLocationTypeKz(locationType: string): string {
  const locationMap: Record<string, string> = {
    'remote': 'Қашықтан',
    'onsite': 'Офисте',
    'hybrid': 'Гибридті'
  };
  return locationMap[locationType] || locationType;
}

function getLevelRu(level: string): string {
  const levelMap: Record<string, string> = {
    'Beginner': 'Начинающий',
    'Intermediate': 'Средний',
    'Advanced': 'Продвинутый'
  };
  return levelMap[level] || level;
}

function getLevelKz(level: string): string {
  const levelMap: Record<string, string> = {
    'Beginner': 'Бастаушы',
    'Intermediate': 'Орташа',
    'Advanced': 'Жоғары'
  };
  return levelMap[level] || level;
}

// Добавьте эти вспомогательные функции, если их нет
function getLocalizedTitle(internship: Internship, language: string): string {
  if (language === 'ru' && internship.titleRu) {
    return internship.titleRu;
  } else if (language === 'kz' && internship.titleKz) {
    return internship.titleKz;
  }
  return internship.title;
}

function getLocalizedDescription(internship: Internship, language: string): string {
  if (language === 'ru' && internship.descriptionRu) {
    return internship.descriptionRu;
  } else if (language === 'kz' && internship.descriptionKz) {
    return internship.descriptionKz;
  }
  return internship.description;
}

function getLocalizedCategory(category: string, language: string): string {
  if (language === 'ru') {
    return getCategoryRu(category);
  } else if (language === 'kz') {
    return getCategoryKz(category);
  }
  return category;
}

function getLocalizedLocationType(locationType: string, language: string): string {
  if (language === 'ru') {
    return getLocationTypeRu(locationType);
  } else if (language === 'kz') {
    return getLocationTypeKz(locationType);
  }
  return locationType === 'remote' ? 'Remote' : 
         locationType === 'onsite' ? 'On-site' : 
         'Hybrid';
}

function getLocalizedLevel(level: string, language: string): string {
  if (language === 'ru') {
    return getLevelRu(level);
  } else if (language === 'kz') {
    return getLevelKz(level);
  }
  return level;
}

// Компонент карточки стажировки
interface InternshipCardProps {
  internship: Internship;
  index: number;
  onClick?: () => void;
  isHeadHunterCard?: boolean;
  language?: string;
}

const InternshipCard: React.FC<InternshipCardProps> = ({ 
  internship, 
  onClick,
  index,
  language = 'ru'
}) => {
  const { t, language: currentLanguage } = useTranslations();
  const getLocalizedTitle = () => {
    if (language === 'ru' && internship.titleRu) {
      return internship.titleRu;
    } else if (language === 'kz' && internship.titleKz) {
      return internship.titleKz;
    }
    return internship.title;
  };
  
  const getLocalizedDescription = () => {
    if (language === 'ru' && internship.descriptionRu) {
      return internship.descriptionRu;
    } else if (language === 'kz' && internship.descriptionKz) {
      return internship.descriptionKz;
    }
    return internship.description;
  };
  
  const getLocalizedCategory = () => {
    if (language === 'ru') {
      return getCategoryRu(internship.category);
    } else if (language === 'kz') {
      return getCategoryKz(internship.category);
    }
    return internship.category;
  };
  
  const getLocalizedLocationType = () => {
    if (language === 'ru') {
      return getLocationTypeRu(internship.locationType);
    } else if (language === 'kz') {
      return getLocationTypeKz(internship.locationType);
    }
    return internship.locationType === 'remote' ? 'Remote' : 
           internship.locationType === 'onsite' ? 'On-site' : 
           'Hybrid';
  };

  const getLocalizedLevel = () => {
    if (!internship.level) return "";
    
    if (language === 'ru') {
      return getLevelRu(internship.level);
    } else if (language === 'kz') {
      return getLevelKz(internship.level);
    }
    return internship.level;
  };
  
  // Check if this is a HeadHunter internship based on externalUrl
  const isHeadHunterCard = !!internship.externalUrl && internship.externalUrl.includes('hh.kz');
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md group transition-all duration-300 flex flex-col h-[550px] cursor-pointer"
      onClick={isHeadHunterCard ? undefined : onClick} // Модальное окно только для не-HeadHunter карточек
    >
      {/* Для HeadHunter карточек используем более компактный заголовок без логотипа */}
      {isHeadHunterCard ? (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <div className="flex justify-between items-center">
            <Badge className="bg-white/20 text-white hover:bg-white/30">HeadHunter</Badge>
            <Badge className="bg-primary/80 text-white">{getLocalizedCategory()}</Badge>
          </div>
          <h3 className="text-xl font-bold text-white mt-4 mb-1 line-clamp-2">
            {getLocalizedTitle()}
          </h3>
          <div className="flex items-center text-white/80 mt-2 text-sm">
            <Building2 className="w-4 h-4 mr-2" />
            <span>{internship.company}</span>
            <div className="mx-2 w-1 h-1 rounded-full bg-white/40"></div>
            <MapPin className="w-4 h-4 mr-1" />
            <span>{internship.location}</span>
          </div>
        </div>
      ) : (
        <div className="h-64 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
          <img 
            src={internship.companyLogo} 
            alt={getLocalizedTitle()} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              // При ошибке загрузки используем градиентный фон с названием компании
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              // Добавляем gradient div вместо изображения
              const parent = target.parentElement;
              if (parent) {
                const gradientDiv = document.createElement('div');
                gradientDiv.className = "absolute inset-0 bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center";
                const text = document.createElement('span');
                text.className = "text-white text-2xl font-bold text-center px-4";
                text.textContent = internship.company.split(' ').map(word => word[0]).join('');
                gradientDiv.appendChild(text);
                parent.appendChild(gradientDiv);
              }
            }} 
          />
          {/* Category badge */}
          <Badge className="absolute top-4 left-4 z-20 bg-blue-600 text-white border-none">
            {getLocalizedCategory()}
          </Badge>
          {/* Level indicator */}
          {internship.level && (
            <div className="absolute top-4 right-4 z-20 bg-black/70 text-xs text-white px-2 py-1 rounded-full flex items-center">
              <Star className="w-3 h-3 mr-1 text-yellow-400" />
              <span>{getLocalizedLevel()}</span>
            </div>
          )}
          {/* Company name in bottom corner */}
          <div className="absolute bottom-4 left-4 z-20 text-white text-sm font-medium">
            <Badge variant="outline" className="bg-black/70 text-white border-white/30">
              {internship.company}
            </Badge>
          </div>
        </div>
      )}
      
      {/* Content area */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Заголовок для обычных карточек (не HeadHunter) */}
        {!isHeadHunterCard && (
          <div className="h-14 mb-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
              {getLocalizedTitle()}
            </h3>
          </div>
        )}
        
        {/* Для HeadHunter карточек добавляем информацию о типе работы */}
        {isHeadHunterCard && (
          <div className="mb-3">
            <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-none">
              {getLocalizedLocationType()}
            </Badge>
            {internship.level && (
              <Badge className="ml-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-none">
                {getLocalizedLevel()}
              </Badge>
            )}
          </div>
        )}
        
        {/* Описание */}
        <div className={`${isHeadHunterCard ? 'h-20' : 'h-14'} mb-3`}>
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {getLocalizedDescription()}
          </p>
        </div>
        
        {/* Skills */}
        <div className="h-8 mb-5 flex flex-wrap gap-2">
          {internship.skills.slice(0, 3).map((skill: string, i: number) => (
            <Badge key={i} variant="secondary" className="text-xs font-normal bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-none">
              {skill}
            </Badge>
          ))}
          {internship.skills.length > 3 && (
            <Badge variant="outline" className="text-xs border-blue-400 dark:border-blue-500 text-blue-600 dark:text-blue-400">
              +{internship.skills.length - 3}
            </Badge>
          )}
        </div>
        
        {/* Internship details */}
        <div className="grid grid-cols-3 gap-2 mb-6 text-center text-xs text-gray-600 dark:text-gray-400 h-16">
          <div className="flex flex-col items-center justify-center">
            <Clock className="w-4 h-4 mb-1 text-blue-600 dark:text-blue-400" />
            <span>
              {internship.duration.replace('months', 
                language === 'ru' ? 'месяцев' : 
                language === 'kz' ? 'ай' : 
                'months'
              )}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <MapPin className="w-4 h-4 mb-1 text-blue-600 dark:text-blue-400" />
            <span>{internship.location}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Calendar className="w-4 h-4 mb-1 text-blue-600 dark:text-blue-400" />
            <span>
              {new Date(internship.applicationDeadline).toLocaleDateString(
                language === 'ru' ? 'ru-RU' : 
                language === 'kz' ? 'kk-KZ' : 
                'en-US',
                { month: 'short', day: 'numeric' }
              )}
            </span>
          </div>
        </div>
        
        {/* Action bar */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4 h-6">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {internship.appliedCount?.toLocaleString() || '0'} 
                {language === 'ru' ? ' заявок' : 
                language === 'kz' ? ' өтінімдер' : 
                ' applicants'}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              {internship.isPaid ? (
                <Badge variant="outline" className="text-xs border-green-400 dark:border-green-500 text-green-600 dark:text-green-400">
                  {language === 'ru' ? 'Оплачиваемая' : 
                   language === 'kz' ? 'Ақылы' : 
                   'Paid'}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs border-blue-400 dark:border-blue-500 text-blue-600 dark:text-blue-400">
                  {language === 'ru' ? 'Неоплачиваемая' : 
                   language === 'kz' ? 'Ақысыз' : 
                   'Unpaid'}
                </Badge>
              )}
            </div>
          </div>
          
          {/* Button */}
              <Button 
            className={`w-full ${isHeadHunterCard ? 'bg-[#1560b2] hover:bg-[#0f4c8e]' : 'bg-blue-600 hover:bg-blue-700'} text-white font-medium rounded-lg transition-all duration-300`}
            onClick={(e) => {
              e.stopPropagation();
              if (isHeadHunterCard && internship.externalUrl) {
                // Для HeadHunter карточек - открываем внешнюю ссылку
                window.open(internship.externalUrl, '_blank');
              } else {
                // Для обычных карточек - открываем модальное окно
                if (onClick) onClick();
              }
            }}
          >
            {isHeadHunterCard ? (
              <>
                {language === 'ru' ? 'Подробнее на HeadHunter' : 
                 language === 'kz' ? 'HeadHunter-де толығырақ' : 
                 'View on HeadHunter'}
                <ExternalLink className="ml-2 w-4 h-4" />
              </>
            ) : (
              <>
                {language === 'ru' ? 'Подать заявку' : 
                 language === 'kz' ? 'Өтініш беру' : 
                 'Apply Now'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
              </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Преимущества
function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  color 
}: { 
  icon: LucideIcon; 
  title: string; 
  description: string; 
  color: string;
}) {
  return (
    <motion.div 
      whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      transition={{ duration: 0.3 }}
      className="bg-card/60 backdrop-blur-sm border border-border/20 rounded-xl p-6 shadow-sm h-full flex flex-col"
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${color} shadow-lg`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-foreground/70 text-sm">{description}</p>
    </motion.div>
  );
}

// Добавьте этот компонент в файл
const HeadHunterWidget: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWidget = async () => {
      try {
        setIsLoading(true);
    // Создаем скрипт
    const script = document.createElement('script');
    script.src = "https://api.hh.ru/widgets/vacancies/search?count=6&locale=RU&links_color=1560b2&border_color=1560b2&employment=project&employment=volunteer&employment=probation&label=internship&host=hh.kz";
    script.className = "hh-script";
    script.async = true;
        
        // Добавляем обработчик ошибок
        script.onerror = () => {
          setError('Не удалось загрузить виджет HeadHunter');
          setIsLoading(false);
        };
        
        // Добавляем обработчик успешной загрузки
        script.onload = () => {
          setIsLoading(false);
        };
    
    // Вставляем скрипт в DOM
    const widgetContainer = document.getElementById('hh-widget-container');
    if (widgetContainer) {
      widgetContainer.appendChild(script);
    }
      } catch (error) {
        setError('Произошла ошибка при загрузке виджета');
        setIsLoading(false);
      }
    };

    loadWidget();
    
    // Очистка при размонтировании
    return () => {
      const widgetContainer = document.getElementById('hh-widget-container');
      const script = widgetContainer?.querySelector('.hh-script');
      if (widgetContainer && script) {
        widgetContainer.removeChild(script);
      }
    };
  }, []);
  
  return (
    <div id="hh-widget-container" className="w-full rounded-xl overflow-hidden bg-white p-4 shadow-sm">
      <h3 className="text-xl font-bold mb-4">HeadHunter Internships</h3>
      {isLoading && <div className="text-center py-4">Загрузка...</div>}
      {error && <div className="text-red-500 text-center py-4">{error}</div>}
      {/* Виджет будет загружен сюда */}
    </div>
  );
};

// Добавьте типы и функции для работы с HeadHunter API

// Тип для данных о вакансии с HeadHunter
type HHVacancy = {
  id: string;
  name: string;
  employer: {
    name: string;
    logo_urls?: {
      original?: string;
      90?: string;
    }
  };
  area: {
    name: string;
  };
  salary?: {
    from?: number;
    to?: number;
    currency?: string;
  };
  snippet: {
    requirement?: string;
    responsibility?: string;
  };
  schedule?: {
    id: string;
    name: string;
  };
  experience?: {
    id: string;
    name: string;
  };
  key_skills?: {
    name: string;
  }[];
  published_at: string;
  alternate_url: string;
  description?: string;
  professional_roles?: {
    name: string;
  }[];
}

export default function PublicInternships() {
  // Существующие состояния
  const { t, language } = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Новые состояния для HeadHunter
  const [hhInternships, setHHInternships] = useState<Internship[]>([]);
  const [hhLoading, setHHLoading] = useState<boolean>(false);
  const [showHHInternships, setShowHHInternships] = useState<boolean>(false);
  
  // 1. Сохраняем состояния для модального окна
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentInternship, setCurrentInternship] = useState<Internship | null>(null);
  
  useTheme();
  const isMobile = useIsMobile();
  
  // Функция для получения и адаптации данных с HeadHunter
  const fetchHeadHunterInternships = useCallback(async () => {
    setHHLoading(true);
    try {
      // Исправить URL API
      const response = await fetch('/api/hh-jobs?text=стажировка+стажер+intern+практика&employment=probation&area=159');
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        console.log('Нет данных о стажировках от API HeadHunter');
        return [];
      }
      
      // Преобразование данных в формат вашего приложения
      const adaptedData = data.items.map((vacancy: { id: string; name: any; employer: { name: any; logo_urls: { original: any; }; }; area: { name: any; }; schedule: { id: string; }; snippet: { responsibility: any; }; description: any; professional_roles: { name: any; }[]; key_skills: any[]; salary: null; alternate_url: any; }) => ({
        id: parseInt(vacancy.id),
        title: vacancy.name,
        titleRu: vacancy.name,
        titleKz: vacancy.name,
        company: vacancy.employer.name,
        companyLogo: vacancy.employer.logo_urls?.original || 'https://via.placeholder.com/200',
        location: vacancy.area.name,
        locationType: vacancy.schedule?.id === 'remote' ? 'remote' : 'onsite',
        description: vacancy.snippet?.responsibility || vacancy.description || '',
        descriptionRu: vacancy.snippet?.responsibility || vacancy.description || '',
        descriptionKz: vacancy.snippet?.responsibility || vacancy.description || '',
        duration: '3 months',
        applicationDeadline: new Date(Date.now() + 30*24*60*60*1000).toISOString(),
        category: vacancy.professional_roles?.[0]?.name || 'Technology',
        skills: vacancy.key_skills?.map(skill => skill.name) || [],
        isPaid: vacancy.salary !== null,
        featured: false,
        appliedCount: Math.floor(Math.random() * 50) + 5,
        level: 'Beginner',
        externalUrl: vacancy.alternate_url
      }));
      
      setHHInternships(adaptedData);
      return adaptedData;
    } catch (error) {
      console.error('Ошибка при получении данных HeadHunter:', error);
      return [];
    } finally {
      setHHLoading(false);
    }
  }, []);
  
  // 2. Исправить useEffect для выполнения только при монтировании
  useEffect(() => {
    fetchHeadHunterInternships();
  }, [fetchHeadHunterInternships]);
  
  // Комбинированные данные для отображения
  const allInternships = useMemo(() => {
    return showHHInternships ? hhInternships : dummyInternships;
  }, [showHHInternships, hhInternships]);
  
  // Scroller references
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);

  // Данные для раздела "Преимущества"
  const features = [
    {
      icon: Briefcase,
      title: language === 'ru' ? 'Реальный опыт' : language === 'kz' ? 'Нақты тәжірибе' : 'Real-world Experience',
      description: language === 'ru' ? 'Получите практический опыт работы в ведущих компаниях' : language === 'kz' ? 'Жетекші компанияларда тәжірибелік жұмыс тәжірибесін алыңыз' : 'Gain hands-on experience working with leading companies',
      color: 'bg-primary'
    },
    {
      icon: Trophy,
      title: language === 'ru' ? 'Престижные возможности' : language === 'kz' ? 'Беделді мүмкіндіктер' : 'Prestigious Opportunities',
      description: language === 'ru' ? 'Участвуйте в программах от ведущих компаний Казахстана' : language === 'kz' ? 'Қазақстанның жетекші компанияларының бағдарламаларына қатысыңыз' : 'Participate in programs from top companies in Kazakhstan',
      color: 'bg-primary'
    },
    {
      icon: GraduationCap,
      title: language === 'ru' ? 'Карьерный рост' : language === 'kz' ? 'Мансаптық даму' : 'Career Advancement',
      description: language === 'ru' ? 'Повысьте свою конкурентоспособность на рынке труда' : language === 'kz' ? 'Еңбек нарығындағы бәсекеге қабілеттілігіңізді арттырыңыз' : 'Boost your competitiveness in the job market',
      color: 'bg-primary'
    },
    {
      icon: Globe,
      title: language === 'ru' ? 'Глобальные возможности' : language === 'kz' ? 'Жаһандық мүмкіндіктер' : 'Global Opportunities',
      description: language === 'ru' ? 'Доступ к возможностям в Казахстане и за рубежом' : language === 'kz' ? 'Қазақстандағы және шетелдегі мүмкіндіктерге қол жеткізу' : 'Access opportunities in Kazakhstan and abroad',
      color: 'bg-primary'
    }
  ];

  // Добавьте этот useEffect для загрузки данных только при необходимости
  useEffect(() => {
    if (showHHInternships && hhInternships.length === 0 && !hhLoading) {
      fetchHeadHunterData();
    }
  }, [showHHInternships]);

  // Функция загрузки данных
  const fetchHeadHunterData = async () => {
    setHHLoading(true);
    
    try {
      // Запрос к нашему API эндпоинту
      const response = await fetch('/api/hh-jobs?text=стажировка+стажер+intern+практика&employment=probation&area=159');
      const data = await response.json();
      
      if (!data.items || data.items.length === 0) {
        console.log('Нет данных о стажировках от API HeadHunter');
        return;
      }

      // Преобразуем данные из HeadHunter в формат нашего приложения
      const adaptedData = data.items.map((vacancy: HHVacancy) => ({
        id: parseInt(vacancy.id),
        title: vacancy.name,
        titleRu: vacancy.name,
        titleKz: vacancy.name,
        company: vacancy.employer.name,
        companyLogo: vacancy.employer.logo_urls?.original || 'https://via.placeholder.com/200',
        location: vacancy.area.name,
        locationType: vacancy.schedule?.id === 'remote' ? 'remote' : 'onsite',
        description: vacancy.snippet?.responsibility || vacancy.description || '',
        descriptionRu: vacancy.snippet?.responsibility || vacancy.description || '',
        descriptionKz: vacancy.snippet?.responsibility || vacancy.description || '',
        duration: '3 months', // Это значение можно получать из vacancy.schedule если оно есть
        applicationDeadline: new Date(Date.now() + 30*24*60*60*1000).toISOString(), // Можно получать из vacancy.published_at
        category: vacancy.professional_roles?.[0]?.name || 'Technology',
        skills: vacancy.key_skills?.map(skill => skill.name) || [],
        isPaid: vacancy.salary !== null,
        featured: false,
        appliedCount: Math.floor(Math.random() * 50) + 5, // Это значение можно получать из vacancy.applications_count если оно есть
        level: vacancy.experience?.id === 'noExperience' ? 'Beginner' : 'Intermediate',
        externalUrl: vacancy.alternate_url
      }));

      setHHInternships(adaptedData);
    } catch (error) {
      console.error('Ошибка при получении данных HeadHunter:', error);
    } finally {
      setHHLoading(false);
    }
  };

  // Добавляем useEffect для загрузки данных при монтировании компонента
  useEffect(() => {
    fetchHeadHunterData();
  }, []);

  // 2. Модифицируем функцию handleInternshipClick, чтобы она работала только для не-HeadHunter карточек
  const handleInternshipClick = (internship: Internship) => {
    // Открываем модальное окно только если это не HeadHunter карточка
    if (!internship.externalUrl || !internship.externalUrl.includes('hh.kz')) {
      setCurrentInternship(internship);
      setShowModal(true);
    }
  };

  // 3. Сохраняем функцию закрытия модального окна
  const closeModal = () => {
    setShowModal(false);
    setCurrentInternship(null);
  };

  // Добавьте эту функцию в компонент PublicInternships

  // Функция для тестирования интеграции с HeadHunter API
  const testHeadHunterIntegration = async () => {
    console.log('Начинаем тестирование интеграции с HeadHunter API...');
    
    try {
      // Тест 1: Проверка доступности API эндпоинта
      console.log('Тест 1: Проверка доступности API эндпоинта');
      const response = await fetch('/api/headhunter-vacancies?text=стажировка+intern&area=159');
      
      if (!response.ok) {
        throw new Error(`API вернул статус ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Тест 1 пройден! API доступен и возвращает данные.');
      console.log(`Получено вакансий: ${data.items?.length || 0}`);
      
      // Тест 2: Проверка преобразования данных
      console.log('Тест 2: Проверка преобразования данных');
      if (!data.items || data.items.length === 0) {
        throw new Error('API вернул пустой список вакансий');
      }
      
      const vacancy = data.items[0];
      console.log('Пример вакансии:', vacancy);
      
      // Проверяем наличие необходимых полей
      const requiredFields = ['id', 'name', 'employer', 'area', 'alternate_url'];
      for (const field of requiredFields) {
        if (!vacancy[field]) {
          throw new Error(`В вакансии отсутствует поле ${field}`);
        }
      }
      
      console.log('Тест 2 пройден! Структура данных корректна.');
      
      // Тест 3: Проверка ограничения частоты запросов
      console.log('Тест 3: Проверка ограничения частоты запросов');
      
      const rateLimitResponse = await fetch('/api/headhunter-vacancies?test=ratelimit');
      
      const remainingRequests = rateLimitResponse.headers.get('X-RateLimit-Remaining');
      const rateLimitLimit = rateLimitResponse.headers.get('X-RateLimit-Limit');
      
      if (!remainingRequests || !rateLimitLimit) {
        throw new Error('Заголовки ограничения частоты запросов отсутствуют');
      }
      
      console.log(`Тест 3 пройден! Ограничение запросов: ${remainingRequests}/${rateLimitLimit}`);
      
      // Тест 4: Тестирование виджета
      console.log('Тест 4: Проверка интеграции виджета');
      console.log('Виджет должен быть доступен на странице. Проверьте визуально.');
      
      console.log('Все тесты успешно пройдены!');
      return true;
    } catch (error) {
      console.error('Ошибка при тестировании:', error);
      return false;
    }
  };

  // Добавьте кнопку для запуска тестирования (опционально, только для разработки)
  // Например, в секцию разработчика, которая видна только в dev-режиме:

  {process.env.NODE_ENV === 'development' && (
    <div className="mt-8 p-4 bg-gray-100 rounded-xl">
      <h3 className="text-lg font-bold mb-2">Инструменты разработчика</h3>
      <button
        onClick={testHeadHunterIntegration}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Протестировать интеграцию с HeadHunter
      </button>
    </div>
  )}

  return (
    <PublicPageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 md:py-24 overflow-hidden">
        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          {/* Hero content */}
          <div className="max-w-3xl mx-auto text-center mb-12">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 pt-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 leading-tight"
            >
              {language === 'ru' ? 'Стажировки и соревнования' : 
              language === 'kz' ? 'Тағылымдамалар мен жарыстар' : 
              'Internships & Competitions'}
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl text-foreground/80 mb-10"
            >
              {language === 'ru' ? 'Начните свою карьеру с лучших стажировок и конкурсов, созданных для вашего профессионального роста' : 
              language === 'kz' ? 'Кәсіби дамуыңыз үшін жасалған үздік тағылымдамалар мен байқаулардан мансабыңызды бастаңыз' : 
              'Start your career with the best internships and competitions designed for your professional growth'}
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <Button 
                className="rounded-full px-8 py-6 text-lg bg-card border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-500 shadow-lg"
                onClick={() => {
                  const section = document.getElementById('opportunities-section');
                  if (section) {
                    section.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                <span className="flex items-center">
                  {language === 'ru' ? 'Найти стажировку' : 
                   language === 'kz' ? 'Тағылымдама табу' : 
                   'Find an Internship'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </span>
              </Button>
            </motion.div>
            </div>
          </div>
        
        {/* Floating background elements */}
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
          <Briefcase className="w-16 h-16" />
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
              {language === 'ru' ? 'Почему стоит выбрать наши возможности' : 
              language === 'kz' ? 'Неліктен біздің мүмкіндіктерді таңдау керек' : 
              'Why Choose Our Opportunities'}
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              {language === 'ru' ? 'Мы тщательно отбираем лучшие стажировки для вашего профессионального роста' : 
              language === 'kz' ? 'Біз сіздің кәсіби дамуыңыз үшін ең жақсы тағылымдамаларды мұқият таңдаймыз' : 
              'We carefully curate the best internships for your professional growth'}
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
      
      {/* Main Opportunities Section */}
      <section id="opportunities-section" className="py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {language === 'ru' ? 'Найдите свою идеальную стажировку' : 
              language === 'kz' ? 'Мінсіз тағылымдамаңызды табыңыз' : 
              'Find Your Perfect Internship'}
            </h2>
            <p className="text-lg text-foreground/70">
              {language === 'ru' ? 'Просматривайте последние стажировки от ведущих компаний и организаций' : 
              language === 'kz' ? 'Жетекші компаниялар мен ұйымдардың соңғы тағылымдамаларын қараңыз' : 
              'Browse the latest internships from top companies and organizations'}
            </p>
          </motion.div>
          
          {/* Добавьте переключатель источника данных */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm bg-muted p-1">
              <button
                onClick={() => setShowHHInternships(false)}
                className={`px-4 py-2 text-sm font-medium rounded-md ${
                  !showHHInternships 
                    ? 'bg-background text-primary shadow-sm' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {language === 'ru' ? 'Portfol.IO' : language === 'kz' ? 'Portfol.IO' : 'Portfol.IO'}
              </button>
              <button
                onClick={() => setShowHHInternships(true)}
                className={`px-4 py-2 text-sm font-medium rounded-md flex items-center ${
                  showHHInternships 
                    ? 'bg-background text-primary shadow-sm' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                HeadHunter
                {hhLoading && <span className="ml-2 animate-spin">⟳</span>}
              </button>
              </div>
            </div>
          
          {/* Основной блок с фильтрацией и карточками */}
          {(() => {
            // Состояния для пагинации и фильтрации
            const [currentPage, setCurrentPage] = useState(1);
            const internshipsPerPage = 6;
            const [categoryFilter, setCategoryFilter] = useState<string>("all");
            const [locationFilter, setLocationFilter] = useState<string>("all");
            const [durationFilter, setDurationFilter] = useState<string>("all");
            const [paymentFilter, setPaymentFilter] = useState<string>("all");
            const [levelFilter, setLevelFilter] = useState<string>("all");
            
            // Функция фильтрации стажировок с учетом всех фильтров
            const getFilteredInternships = () => {
              return (showHHInternships ? hhInternships : dummyInternships).filter(internship => {
                // Поиск по тексту с учетом переводов
                const matchesSearch = searchTerm === "" || 
                  // Поиск в заголовке
                  internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (internship.titleRu && internship.titleRu.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (internship.titleKz && internship.titleKz.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  // Поиск в описании
                  internship.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  (internship.descriptionRu && internship.descriptionRu.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  (internship.descriptionKz && internship.descriptionKz.toLowerCase().includes(searchTerm.toLowerCase())) ||
                  // Поиск в компании
                  internship.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  // Поиск в локации
                  internship.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  // Поиск в категории
                  internship.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  getCategoryRu(internship.category).toLowerCase().includes(searchTerm.toLowerCase()) ||
                  getCategoryKz(internship.category).toLowerCase().includes(searchTerm.toLowerCase()) ||
                  // Поиск в навыках
                  internship.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
                
                // Фильтр по категории
                const matchesCategory = categoryFilter === "all" || internship.category === categoryFilter;
                
                // Фильтр по локации
                const matchesLocation = locationFilter === "all" || internship.locationType === locationFilter;
                
                // Фильтр по длительности
                let matchesDuration = true;
                if (durationFilter !== "all") {
                  const monthMatch = internship.duration.match(/(\d+)/);
                  const months = monthMatch ? parseInt(monthMatch[0]) : 0;
                  
                  if (durationFilter === "short" && months > 3) matchesDuration = false;
                  if (durationFilter === "medium" && (months < 3 || months > 6)) matchesDuration = false;
                  if (durationFilter === "long" && months < 6) matchesDuration = false;
                }
                
                // Фильтр по оплате
                const matchesPayment = paymentFilter === "all" || 
                  (paymentFilter === "paid" && internship.isPaid) || 
                  (paymentFilter === "unpaid" && !internship.isPaid);
                
                // Фильтр по уровню
                const matchesLevel = levelFilter === "all" || 
                  (internship.level && internship.level === levelFilter);
                
                return matchesSearch && matchesCategory && matchesLocation && matchesDuration && matchesPayment && matchesLevel;
              });
            };
            
            // Функция сортировки стажировок
            const getSortedInternships = (internships: Internship[]): Internship[] => {
              if (sortBy === "popularity") {
                return [...internships].sort((a, b) => (b.appliedCount || 0) - (a.appliedCount || 0));
              } else if (sortBy === "newest") {
                // Для демонстрации - используем обратный порядок ID как "новизну"
                return [...internships].sort((a, b) => b.id - a.id);
              }
              return internships;
            };
            
            // Получаем отфильтрованные и отсортированные стажировки
            const filteredInternships = getFilteredInternships();
            
            // Убедимся, что у нас нет дубликатов стажировок по ID
            const uniqueInternships = filteredInternships.reduce((unique: Internship[], internship) => {
              // Проверим, есть ли стажировка с таким ID уже в массиве
              const exists = unique.some(item => item.id === internship.id);
              // Добавляем стажировку только если ее ID еще не встречался
              if (!exists) {
                unique.push(internship);
              }
              return unique;
            }, []);
            
            // Сортируем уже уникальные стажировки
            const sortedInternships = getSortedInternships(uniqueInternships);
            
            // Получаем стажировки для текущей страницы
            const indexOfLastInternship = currentPage * internshipsPerPage;
            const indexOfFirstInternship = indexOfLastInternship - internshipsPerPage;
            const currentInternships = sortedInternships.slice(indexOfFirstInternship, indexOfLastInternship);
            
            // Рассчитываем общее количество страниц
            const totalPages = Math.ceil(sortedInternships.length / internshipsPerPage);
            
            // Функция для очистки всех фильтров
            const clearAllFilters = () => {
              setSearchTerm("");
              setCategoryFilter("all");
              setLocationFilter("all");
              setDurationFilter("all");
              setPaymentFilter("all");
              setLevelFilter("all");
              setSortBy("newest");
              setCurrentPage(1);
            };
            
            return (
              <div className="bg-card/40 backdrop-blur-sm border border-border/20 rounded-xl p-6 md:p-8 shadow-sm">
                {/* Секция фильтров */}
                <div className="mb-8">
                  {/* Основной поиск и кнопка расширенных фильтров */}
                  <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
                    <div className="flex-1 relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
                  <Input
                        placeholder={
                          language === 'ru' ? 'Поиск по названию, компании или навыкам...' : 
                          language === 'kz' ? 'Атау, компания немесе дағдылар бойынша іздеу...' : 
                          'Search by title, company or skills...'
                        }
                        className="pl-10 py-6 text-base"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1); // Сбрасываем на первую страницу при изменении поиска
                        }}
                  />
                </div>
                    
                    <Button 
                      variant="outline"
                      className="min-w-[180px] gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    >
                      <Filter size={16} />
                      {language === 'ru' ? 'Расширенные фильтры' : 
                      language === 'kz' ? 'Кеңейтілген сүзгілер' : 
                      'Advanced Filters'}
                    </Button>
              </div>
              
                  {/* Расширенные фильтры */}
                  {showAdvancedFilters && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-background/60 backdrop-blur-sm border border-border/10 rounded-xl p-5 mt-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {/* Фильтр по категории */}
              <div>
                          <Label className="text-sm font-medium mb-2 block">
                            {language === 'ru' ? 'Категория' : 
                            language === 'kz' ? 'Санат' : 
                            'Category'}
                          </Label>
                          <Select 
                            value={categoryFilter}
                            onValueChange={(value) => {
                              setCategoryFilter(value);
                              setCurrentPage(1);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">
                                {language === 'ru' ? 'Все категории' : 
                                language === 'kz' ? 'Барлық санаттар' : 
                                'All Categories'}
                              </SelectItem>
                              <SelectItem value="Technology">
                                {language === 'ru' ? 'Технологии' : 
                                language === 'kz' ? 'Технологиялар' : 
                                'Technology'}
                              </SelectItem>
                              <SelectItem value="Marketing">
                                {language === 'ru' ? 'Маркетинг' : 
                                language === 'kz' ? 'Маркетинг' : 
                                'Marketing'}
                              </SelectItem>
                              <SelectItem value="Data Science">
                                {language === 'ru' ? 'Наука о данных' : 
                                language === 'kz' ? 'Деректер ғылымы' : 
                                'Data Science'}
                              </SelectItem>
                              <SelectItem value="Design">
                                {language === 'ru' ? 'Дизайн' : 
                                language === 'kz' ? 'Дизайн' : 
                                'Design'}
                              </SelectItem>
                              <SelectItem value="Finance">
                                {language === 'ru' ? 'Финансы' : 
                                language === 'kz' ? 'Қаржы' : 
                                'Finance'}
                              </SelectItem>
                              <SelectItem value="Media">
                                {language === 'ru' ? 'Медиа' : 
                                language === 'kz' ? 'Медиа' : 
                                'Media'}
                              </SelectItem>
                              <SelectItem value="Management">
                                {language === 'ru' ? 'Управление' : 
                                language === 'kz' ? 'Басқару' : 
                                'Management'}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                </div>
                        
                        {/* Фильтр по типу локации */}
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            {language === 'ru' ? 'Тип работы' : 
                            language === 'kz' ? 'Жұмыс түрі' : 
                            'Work Type'}
                          </Label>
                          <Select 
                            value={locationFilter}
                            onValueChange={(value) => {
                              setLocationFilter(value);
                              setCurrentPage(1);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">
                                {language === 'ru' ? 'Все типы' : 
                                language === 'kz' ? 'Барлық түрлері' : 
                                'All Types'}
                              </SelectItem>
                              <SelectItem value="remote">
                                {language === 'ru' ? 'Удаленно' : 
                                language === 'kz' ? 'Қашықтан' : 
                                'Remote'}
                              </SelectItem>
                              <SelectItem value="onsite">
                                {language === 'ru' ? 'В офисе' : 
                                language === 'kz' ? 'Офисте' : 
                                'Onsite'}
                              </SelectItem>
                              <SelectItem value="hybrid">
                                {language === 'ru' ? 'Гибридный' : 
                                language === 'kz' ? 'Гибридті' : 
                                'Hybrid'}
                              </SelectItem>
                            </SelectContent>
                          </Select>
              </div>
              
                        {/* Фильтр по длительности */}
              <div>
                          <Label className="text-sm font-medium mb-2 block">
                            {language === 'ru' ? 'Длительность' : 
                            language === 'kz' ? 'Ұзақтығы' : 
                            'Duration'}
                          </Label>
                          <Select 
                            value={durationFilter}
                            onValueChange={(value) => {
                              setDurationFilter(value);
                              setCurrentPage(1);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">
                                {language === 'ru' ? 'Любая длительность' : 
                                language === 'kz' ? 'Кез келген ұзақтық' : 
                                'Any Duration'}
                              </SelectItem>
                              <SelectItem value="short">
                                {language === 'ru' ? 'Короткая (до 3 месяцев)' : 
                                language === 'kz' ? 'Қысқа (3 айға дейін)' : 
                                'Short (up to 3 months)'}
                              </SelectItem>
                              <SelectItem value="medium">
                                {language === 'ru' ? 'Средняя (3-6 месяцев)' : 
                                language === 'kz' ? 'Орташа (3-6 ай)' : 
                                'Medium (3-6 months)'}
                              </SelectItem>
                              <SelectItem value="long">
                                {language === 'ru' ? 'Длинная (от 6 месяцев)' : 
                                language === 'kz' ? 'Ұзақ (6 айдан астам)' : 
                                'Long (6+ months)'}
                              </SelectItem>
                            </SelectContent>
                          </Select>
                </div>
                        
                        {/* Фильтр по оплате */}
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            {language === 'ru' ? 'Оплата' : 
                            language === 'kz' ? 'Төлем' : 
                            'Payment'}
                          </Label>
                          <Select 
                            value={paymentFilter}
                            onValueChange={(value) => {
                              setPaymentFilter(value);
                              setCurrentPage(1);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">
                                {language === 'ru' ? 'Все типы' : 
                                language === 'kz' ? 'Барлық түрлері' : 
                                'All Types'}
                              </SelectItem>
                              <SelectItem value="paid">
                                {language === 'ru' ? 'Оплачиваемые' : 
                                language === 'kz' ? 'Ақылы' : 
                                'Paid'}
                              </SelectItem>
                              <SelectItem value="unpaid">
                                {language === 'ru' ? 'Неоплачиваемые' : 
                                language === 'kz' ? 'Ақысыз' : 
                                'Unpaid'}
                              </SelectItem>
                            </SelectContent>
                          </Select>
              </div>
                        
                        {/* Фильтр по уровню */}
                        <div>
                          <Label className="text-sm font-medium mb-2 block">
                            {language === 'ru' ? 'Уровень' : 
                            language === 'kz' ? 'Деңгей' : 
                            'Level'}
                          </Label>
                          <Select 
                            value={levelFilter}
                            onValueChange={(value) => {
                              setLevelFilter(value);
                              setCurrentPage(1);
                            }}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">
                                {language === 'ru' ? 'Все уровни' : 
                                language === 'kz' ? 'Барлық деңгейлер' : 
                                'All Levels'}
                              </SelectItem>
                              <SelectItem value="Beginner">
                                {language === 'ru' ? 'Начинающий' : 
                                language === 'kz' ? 'Бастаушы' : 
                                'Beginner'}
                              </SelectItem>
                              <SelectItem value="Intermediate">
                                {language === 'ru' ? 'Средний' : 
                                language === 'kz' ? 'Орташа' : 
                                'Intermediate'}
                              </SelectItem>
                              <SelectItem value="Advanced">
                                {language === 'ru' ? 'Продвинутый' : 
                                language === 'kz' ? 'Жоғары' : 
                                'Advanced'}
                              </SelectItem>
                            </SelectContent>
                          </Select>
            </div>
          </div>
          
                      {/* Кнопка сброса фильтров */}
                      <div className="mt-4 flex justify-end">
                        <Button 
                          variant="outline" 
                          onClick={clearAllFilters}
                          className="text-sm"
                        >
                          <RotateCcw className="w-3.5 h-3.5 mr-2" />
                          {language === 'ru' ? 'Сбросить все фильтры' : 
                          language === 'kz' ? 'Барлық сүзгілерді қалпына келтіру' : 
                          'Reset All Filters'}
                        </Button>
                      </div>
                    </motion.div>
                  )}
            </div>
            
                {/* Заголовок с количеством найденных стажировок и сортировкой */}
                <div className="border-t border-border/20 pt-8">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-foreground/70">
                      {language === 'ru' ? 'Найдено стажировок: ' : 
                      language === 'kz' ? 'Табылған тағылымдамалар: ' : 
                      'Internships found: '}
                      <span className="font-semibold text-foreground">{sortedInternships.length}</span>
                    </p>
                    
                    <div className="flex items-center gap-2">
                      <p className="text-sm text-foreground/60">
                        {language === 'ru' ? 'Сортировка:' : 
                        language === 'kz' ? 'Сұрыптау:' : 
                        'Sort by:'}
                      </p>
                      <Select 
                        value={sortBy}
                        onValueChange={(value) => {
                          setSortBy(value);
                          setCurrentPage(1);
                        }}
                      >
                        <SelectTrigger className="h-8 pl-3 pr-7 py-0 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="popularity">
                            {language === 'ru' ? 'Популярность' : 
                            language === 'kz' ? 'Танымалдылық' : 
                            'Popularity'}
                          </SelectItem>
                          <SelectItem value="newest">
                            {language === 'ru' ? 'Сначала новые' : 
                            language === 'kz' ? 'Жаңалары алдымен' : 
                            'Newest first'}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                  </div>
              </div>
                  
                  {/* Сетка карточек стажировок */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {currentInternships.length > 0 ? (
                      currentInternships.map((internship, index) => (
                        <InternshipCard 
                          key={internship.id} 
                          internship={internship}
                          index={index}
                          onClick={() => handleInternshipClick(internship)}
                      />
                    ))
                ) : (
                      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16 text-center">
                        <FolderX className="w-16 h-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-bold mb-2">
                          {language === 'ru' ? 'Стажировки не найдены' : 
                          language === 'kz' ? 'Тағылымдамалар табылмады' : 
                          'No Internships Found'}
                        </h3>
                        <p className="text-foreground/70 max-w-md">
                          {language === 'ru' ? 'Попробуйте изменить критерии поиска или фильтры для получения лучших результатов.' : 
                          language === 'kz' ? 'Жақсы нәтижелер алу үшін іздеу критерийлері мен сүзгілерді өзгертіп көріңіз.' : 
                          'Try changing your search criteria or filters for better results.'}
                        </p>
                        <Button 
                          className="mt-6"
                          variant="outline"
                          onClick={clearAllFilters}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          {language === 'ru' ? 'Сбросить фильтры' : 
                          language === 'kz' ? 'Сүзгілерді қалпына келтіру' : 
                          'Reset Filters'}
                        </Button>
                  </div>
                )}
              </div>
                  
                  {/* Пагинация */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-8">
                      <div className="flex space-x-2">
            <Button 
                          variant="outline"
                          onClick={() => setCurrentPage(currentPage > 1 ? currentPage - 1 : 1)}
                          disabled={currentPage === 1}
            >
                          <ChevronLeft className="h-4 w-4" />
            </Button>
                        
                        {/* Номера страниц */}
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                          // Показываем ограниченное количество страниц для лучшего UX
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
  return (
                              <Button
                                key={page}
                                variant={currentPage === page ? "default" : "outline"}
                                onClick={() => setCurrentPage(page)}
                                className={`w-10 h-10 p-0 ${
                                  currentPage === page ? "bg-primary text-white" : ""
                                }`}
                              >
                                {page}
                              </Button>
                            );
                          }
                          
                          // Показываем троеточие вместо большого количества страниц
                          if (
                            (page === currentPage - 2 && currentPage > 3) ||
                            (page === currentPage + 2 && currentPage < totalPages - 2)
                          ) {
  return (
                              <Button
                                key={page}
                                variant="outline"
                                disabled
                                className="w-10 h-10 p-0"
                              >
                                ...
                              </Button>
                            );
                          }
                          
                          return null;
                        })}
                        
                        <Button
                          variant="outline"
                          onClick={() => setCurrentPage(currentPage < totalPages ? currentPage + 1 : totalPages)}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
              )}
            </div>
              </div>
            );
          })()}
        </div>
      </section>  
      
      {/* 5. Сохраняем рендеринг модального окна для обычных карточек */}
      {showModal && currentInternship && !currentInternship.externalUrl && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-auto relative animate-in fade-in duration-300">
            {/* Header с изображением */}
            <div className="h-64 md:h-80 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-10"></div>
              <img 
                src={currentInternship.companyLogo} 
                alt={currentInternship.title} 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback при ошибке загрузки изображения
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const gradientDiv = document.createElement('div');
                    gradientDiv.className = "absolute inset-0 bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center";
                    parent.appendChild(gradientDiv);
                  }
                }} 
              />
              
              {/* Кнопка закрытия */}
              <button 
                onClick={closeModal} 
                className="absolute top-4 right-4 z-50 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
              
              {/* Информация о стажировке поверх изображения */}
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge className="bg-primary text-white">{getLocalizedCategory(currentInternship.category, language)}</Badge>
                  <Badge className="bg-black/50 text-white flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 text-yellow-400" />
                    {getLocalizedLevel(currentInternship.level || 'Beginner', language)}
                  </Badge>
                  <Badge className={`${currentInternship.isPaid ? 'bg-green-600' : 'bg-blue-600'} text-white`}>
                    {currentInternship.isPaid 
                      ? (language === 'ru' ? 'Оплачиваемая' : language === 'kz' ? 'Ақылы' : 'Paid')
                      : (language === 'ru' ? 'Неоплачиваемая' : language === 'kz' ? 'Ақысыз' : 'Unpaid')
                    }
                </Badge>
              </div>
              
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {getLocalizedTitle(currentInternship, language)}
                </h1>
              
                <div className="flex items-center text-white/90 gap-3">
                <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-1.5" />
                    <span>{currentInternship.company}</span>
                </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    <span>{currentInternship.location}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Основное содержимое */}
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Левая колонка */}
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold mb-4">
                    {language === 'ru' ? 'Описание' : 
                     language === 'kz' ? 'Сипаттама' : 
                     'Description'}
                  </h3>
                  <p className="text-foreground/80 mb-6 whitespace-pre-line">
                    {getLocalizedDescription(currentInternship, language)}
                  </p>
                  
                  <h3 className="text-xl font-bold mb-4">
                    {language === 'ru' ? 'Необходимые навыки' : 
                     language === 'kz' ? 'Қажетті дағдылар' : 
                     'Required Skills'}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentInternship.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="bg-primary/10 text-primary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Правая колонка */}
                <div className="bg-muted/50 rounded-xl p-5 h-fit">
                  <h3 className="text-lg font-bold mb-4">
                    {language === 'ru' ? 'Детали стажировки' : 
                     language === 'kz' ? 'Тағылымдама мәліметтері' : 
                     'Internship Details'}
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {language === 'ru' ? 'Продолжительность' : 
                           language === 'kz' ? 'Ұзақтығы' : 
                           'Duration'}
                        </p>
                        <p className="text-foreground/70">
                          {currentInternship.duration.replace('months', 
                            language === 'ru' ? 'месяцев' : 
                            language === 'kz' ? 'ай' : 
                            'months'
                          )}
                        </p>
              </div>
            </div>
                    
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {language === 'ru' ? 'Формат работы' : 
                           language === 'kz' ? 'Жұмыс форматы' : 
                           'Work Format'}
                        </p>
                        <p className="text-foreground/70">
                          {getLocalizedLocationType(currentInternship.locationType, language)}
                        </p>
          </div>
        </div>
        
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {language === 'ru' ? 'Дедлайн заявок' : 
                           language === 'kz' ? 'Өтінім мерзімі' : 
                           'Application Deadline'}
                        </p>
                        <p className="text-foreground/70">
                          {new Date(currentInternship.applicationDeadline).toLocaleDateString(
                            language === 'ru' ? 'ru-RU' : 
                            language === 'kz' ? 'kk-KZ' : 
                            'en-US',
                            { day: 'numeric', month: 'long', year: 'numeric' }
                          )}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Users className="w-5 h-5 text-primary mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">
                          {language === 'ru' ? 'Заявок подано' : 
                           language === 'kz' ? 'Берілген өтінімдер' : 
                           'Applied Count'}
                        </p>
                        <p className="text-foreground/70">
                          {currentInternship.appliedCount?.toLocaleString() || '0'}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <Button className="w-full bg-primary hover:bg-primary/90 text-white">
                      {language === 'ru' ? 'Подать заявку' : 
                      language === 'kz' ? 'Өтініш беру' : 
                      'Apply Now'}
                      <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </PublicPageLayout>
  );
}
