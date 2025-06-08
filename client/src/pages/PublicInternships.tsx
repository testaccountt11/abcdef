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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  level?: string;
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
  },
  {
    id: 10,
    title: "AI Research Intern",
    titleRu: "Стажер по исследованиям ИИ",
    titleKz: "Жасанды интеллект зерттеулері бойынша тәлімгер",
    company: "AI Innovations Lab",
    companyLogo: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Almaty, Kazakhstan",
    locationType: "hybrid",
    description: "Join our AI research team to work on cutting-edge machine learning projects and contribute to innovative solutions.",
    descriptionRu: "Присоединяйтесь к нашей команде исследований ИИ для работы над передовыми проектами машинного обучения и внесения вклада в инновационные решения.",
    descriptionKz: "Машиналық оқытудың озық жобаларымен жұмыс істеу және инновациялық шешімдерге үлес қосу үшін біздің ЖИ зерттеу тобына қосылыңыз.",
    duration: "6 months",
    applicationDeadline: "2024-01-15",
    category: "Technology",
    skills: ["Python", "TensorFlow", "PyTorch", "Deep Learning"],
    isPaid: true,
    featured: true,
    appliedCount: 78,
    level: "Advanced"
  },
  {
    id: 11,
    title: "Sustainability Intern",
    titleRu: "Стажер по устойчивому развитию",
    titleKz: "Тұрақты даму бойынша тәлімгер",
    company: "Green Future Initiative",
    companyLogo: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Astana, Kazakhstan",
    locationType: "onsite",
    description: "Work on environmental projects and help develop sustainable business practices while learning about green technologies.",
    descriptionRu: "Работайте над экологическими проектами и помогайте разрабатывать устойчивые бизнес-практики, изучая зеленые технологии.",
    descriptionKz: "Жасыл технологиялар туралы білім ала отырып, экологиялық жобалармен жұмыс істеңіз және тұрақты бизнес тәжірибесін дамытуға көмектесіңіз.",
    duration: "4 months",
    applicationDeadline: "2024-01-20",
    category: "Management",
    skills: ["Project Management", "Environmental Science", "Data Analysis", "Sustainability"],
    isPaid: true,
    featured: false,
    appliedCount: 42,
    level: "Intermediate"
  },
  {
    id: 12,
    title: "Mobile App Development Intern",
    titleRu: "Стажер по разработке мобильных приложений",
    titleKz: "Мобильді қосымшаларды әзірлеу бойынша тәлімгер",
    company: "AppCraft Solutions",
    companyLogo: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Remote",
    locationType: "remote",
    description: "Develop mobile applications for iOS and Android platforms while learning modern mobile development practices.",
    descriptionRu: "Разрабатывайте мобильные приложения для платформ iOS и Android, изучая современные практики мобильной разработки.",
    descriptionKz: "Заманауи мобильді әзірлеу тәжірибелерін үйрене отырып, iOS және Android платформалары үшін мобильді қосымшаларды әзірлеңіз.",
    duration: "5 months",
    applicationDeadline: "2024-01-25",
    category: "Technology",
    skills: ["React Native", "Swift", "Kotlin", "Mobile UI/UX"],
    isPaid: true,
    featured: true,
    appliedCount: 65,
    level: "Intermediate"
  },
  {
    id: 13,
    title: "Digital Marketing Analytics Intern",
    titleRu: "Стажер по аналитике цифрового маркетинга",
    titleKz: "Сандық маркетинг аналитикасы бойынша тәлімгер",
    company: "Digital Growth Agency",
    companyLogo: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Almaty, Kazakhstan",
    locationType: "hybrid",
    description: "Learn to analyze marketing campaigns and optimize digital strategies using data-driven insights.",
    descriptionRu: "Научитесь анализировать маркетинговые кампании и оптимизировать цифровые стратегии, используя данные.",
    descriptionKz: "Деректерге негізделген түсініктерді қолдана отырып, маркетингтік науқандарды талдау және сандық стратегияларды оңтайландыруды үйреніңіз.",
    duration: "3 months",
    applicationDeadline: "2024-02-01",
    category: "Marketing",
    skills: ["Google Analytics", "Data Visualization", "Marketing Analytics", "Excel"],
    isPaid: false,
    featured: false,
    appliedCount: 38,
    level: "Beginner"
  },
  {
    id: 14,
    title: "Blockchain Development Intern",
    titleRu: "Стажер по разработке блокчейн",
    titleKz: "Блокчейн әзірлеу бойынша тәлімгер",
    company: "Crypto Innovations",
    companyLogo: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Remote",
    locationType: "remote",
    description: "Work on blockchain projects and smart contracts while learning about decentralized technologies.",
    descriptionRu: "Работайте над блокчейн-проектами и смарт-контрактами, изучая децентрализованные технологии.",
    descriptionKz: "Таратылған технологиялар туралы білім ала отырып, блокчейн жобалары мен смарт-шарттармен жұмыс істеңіз.",
    duration: "6 months",
    applicationDeadline: "2024-02-10",
    category: "Technology",
    skills: ["Solidity", "Web3.js", "Ethereum", "Smart Contracts"],
    isPaid: true,
    featured: true,
    appliedCount: 55,
    level: "Advanced"
  },
  {
    id: 15,
    title: "UX Research Intern",
    titleRu: "Стажер по UX-исследованиям",
    titleKz: "UX зерттеулері бойынша тәлімгер",
    company: "User Experience Lab",
    companyLogo: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    location: "Astana, Kazakhstan",
    locationType: "hybrid",
    description: "Conduct user research and usability testing to improve product experiences and interface design.",
    descriptionRu: "Проводите исследования пользователей и тестирование удобства использования для улучшения опыта продукта и дизайна интерфейса.",
    descriptionKz: "Өнім тәжірибесі мен интерфейс дизайнын жақсарту үшін пайдаланушыларды зерттеу және пайдалану ыңғайлылығын тестілеу жүргізіңіз.",
    duration: "4 months",
    applicationDeadline: "2024-02-15",
    category: "Design",
    skills: ["User Research", "Usability Testing", "Figma", "User Interviews"],
    isPaid: true,
    featured: false,
    appliedCount: 47,
    level: "Intermediate"
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

// Add the getLocalizedSkill function
function getLocalizedSkill(skill: string, language: string): string {
  const skillMap: Record<string, Record<string, string>> = {
    'JavaScript': {
      'ru': 'JavaScript',
      'kz': 'JavaScript'
    },
    'React': {
      'ru': 'React',
      'kz': 'React'
    },
    'Node.js': {
      'ru': 'Node.js',
      'kz': 'Node.js'
    },
    'Python': {
      'ru': 'Python',
      'kz': 'Python'
    },
    'Machine Learning': {
      'ru': 'Машинное обучение',
      'kz': 'Машиналық оқыту'
    },
    'SQL': {
      'ru': 'SQL',
      'kz': 'SQL'
    },
    'Data Visualization': {
      'ru': 'Визуализация данных',
      'kz': 'Деректерді визуализациялау'
    },
    'Figma': {
      'ru': 'Figma',
      'kz': 'Figma'
    },
    'Adobe XD': {
      'ru': 'Adobe XD',
      'kz': 'Adobe XD'
    },
    'UI Design': {
      'ru': 'UI дизайн',
      'kz': 'UI дизайн'
    },
    'Prototyping': {
      'ru': 'Прототипирование',
      'kz': 'Прототиптеу'
    },
    'Excel': {
      'ru': 'Excel',
      'kz': 'Excel'
    },
    'Financial Modeling': {
      'ru': 'Финансовое моделирование',
      'kz': 'Қаржылық модельдеу'
    },
    'Data Analysis': {
      'ru': 'Анализ данных',
      'kz': 'Деректерді талдау'
    },
    'Copywriting': {
      'ru': 'Копирайтинг',
      'kz': 'Копирайтинг'
    },
    'Content Strategy': {
      'ru': 'Контент-стратегия',
      'kz': 'Контент-стратегия'
    },
    'SEO': {
      'ru': 'SEO',
      'kz': 'SEO'
    },
    'Editing': {
      'ru': 'Редактирование',
      'kz': 'Редакциялау'
    },
    'Project Planning': {
      'ru': 'Планирование проектов',
      'kz': 'Жобаларды жоспарлау'
    },
    'Risk Management': {
      'ru': 'Управление рисками',
      'kz': 'Тәуекелдерді басқару'
    },
    'Agile': {
      'ru': 'Agile',
      'kz': 'Agile'
    },
    'Scrum': {
      'ru': 'Scrum',
      'kz': 'Scrum'
    },
    'Adobe Illustrator': {
      'ru': 'Adobe Illustrator',
      'kz': 'Adobe Illustrator'
    },
    'Photoshop': {
      'ru': 'Photoshop',
      'kz': 'Photoshop'
    },
    'Typography': {
      'ru': 'Типографика',
      'kz': 'Типография'
    },
    'Brand Design': {
      'ru': 'Бренд-дизайн',
      'kz': 'Бренд-дизайн'
    },
    'Manual Testing': {
      'ru': 'Ручное тестирование',
      'kz': 'Қолмен тестілеу'
    },
    'Test Case Design': {
      'ru': 'Разработка тест-кейсов',
      'kz': 'Тест-кестерді әзірлеу'
    },
    'Regression Testing': {
      'ru': 'Регрессионное тестирование',
      'kz': 'Регрессиялық тестілеу'
    },
    'Bug Reporting': {
      'ru': 'Отчеты об ошибках',
      'kz': 'Қателер туралы есептер'
    },
    'TensorFlow': {
      'ru': 'TensorFlow',
      'kz': 'TensorFlow'
    },
    'PyTorch': {
      'ru': 'PyTorch',
      'kz': 'PyTorch'
    },
    'Deep Learning': {
      'ru': 'Глубокое обучение',
      'kz': 'Терең оқыту'
    },
    'Project Management': {
      'ru': 'Управление проектами',
      'kz': 'Жобаларды басқару'
    },
    'Environmental Science': {
      'ru': 'Экология',
      'kz': 'Экология'
    },
    'Sustainability': {
      'ru': 'Устойчивое развитие',
      'kz': 'Тұрақты даму'
    },
    'React Native': {
      'ru': 'React Native',
      'kz': 'React Native'
    },
    'Swift': {
      'ru': 'Swift',
      'kz': 'Swift'
    },
    'Kotlin': {
      'ru': 'Kotlin',
      'kz': 'Kotlin'
    },
    'Mobile UI/UX': {
      'ru': 'Мобильный UI/UX',
      'kz': 'Мобильді UI/UX'
    },
    'Google Analytics': {
      'ru': 'Google Analytics',
      'kz': 'Google Analytics'
    },
    'Marketing Analytics': {
      'ru': 'Маркетинговая аналитика',
      'kz': 'Маркетингтік аналитика'
    },
    'Solidity': {
      'ru': 'Solidity',
      'kz': 'Solidity'
    },
    'Web3.js': {
      'ru': 'Web3.js',
      'kz': 'Web3.js'
    },
    'Ethereum': {
      'ru': 'Ethereum',
      'kz': 'Ethereum'
    },
    'Smart Contracts': {
      'ru': 'Смарт-контракты',
      'kz': 'Смарт-шарттар'
    },
    'User Research': {
      'ru': 'Исследование пользователей',
      'kz': 'Пайдаланушыларды зерттеу'
    },
    'Usability Testing': {
      'ru': 'Тестирование удобства',
      'kz': 'Ыңғайлылықты тестілеу'
    },
    'User Interviews': {
      'ru': 'Интервью с пользователями',
      'kz': 'Пайдаланушылармен сұхбат'
    }
  };

  return skillMap[skill]?.[language] || skill;
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
  const { t } = useTranslations();
  
  // Check if this is a HeadHunter internship based on externalUrl
  const isHeadHunterCard = !!internship.externalUrl && internship.externalUrl.includes('hh.kz');
  
  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isHeadHunterCard && onClick) {
      onClick();
    }
  };

  const handleButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isHeadHunterCard && internship.externalUrl) {
      window.open(internship.externalUrl, '_blank');
    } else if (onClick) {
      onClick();
    }
  };
  
  return (
    <div 
      className="bg-white dark:bg-white border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md group hover:shadow-lg flex flex-col h-[550px] cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Для HeadHunter карточек используем более компактный заголовок без логотипа */}
      {isHeadHunterCard ? (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6">
          <div className="flex justify-between items-center">
            <Badge className="bg-white/20 text-white hover:bg-white/30">HeadHunter</Badge>
            <Badge className="bg-primary/80 text-white">{getLocalizedCategory(internship.category, language)}</Badge>
          </div>
          <h3 className="text-xl font-bold text-white mt-4 mb-1 line-clamp-2">
            {getLocalizedTitle(internship, language)}
          </h3>
          <div className="flex items-center text-white/80 mt-2 text-sm">
            <Building2 className="w-4 h-4 mr-2" />
            <span>{internship.company}</span>
            <div className="mx-2 w-1 h-1 rounded-full bg-white/40"></div>
            <MapPin className="w-4 h-4 mr-1" />
            <span>{getLocalizedLocationType(internship.locationType, language)}</span>
          </div>
        </div>
      ) : (
        <div className="h-64 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
          <img 
            src={internship.companyLogo} 
            alt={getLocalizedTitle(internship, language)} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
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
          <Badge className="absolute top-4 left-4 z-20 bg-primary text-white border-none">
            {getLocalizedCategory(internship.category, language)}
          </Badge>
          {/* Company name in bottom corner */}
          <div className="absolute bottom-4 left-4 z-20 text-white text-sm font-medium">
            <Badge variant="outline" className="bg-black/70 text-white border-white/30">
              {internship.company}
            </Badge>
          </div>
          {/* Featured badge */}
          {internship.featured && (
            <div className="absolute top-4 right-4 z-20">
              <Badge className="bg-yellow-500 text-white border-none">
                {language === 'ru' ? 'Рекомендуемая' : 
                 language === 'kz' ? 'Ұсынылған' : 
                 'Featured'}
              </Badge>
            </div>
          )}
        </div>
      )}
      
      {/* Content area */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Заголовок для обычных карточек (не HeadHunter) */}
        {!isHeadHunterCard && (
          <div className="h-14 mb-3">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
              {getLocalizedTitle(internship, language)}
            </h3>
          </div>
        )}
        
        {/* Для HeadHunter карточек добавляем информацию о типе работы */}
        {isHeadHunterCard && (
          <div className="mb-3">
            <Badge className="bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-none">
              {getLocalizedLocationType(internship.locationType, language)}
            </Badge>
            {internship.level && (
              <Badge className="ml-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-none">
                {getLocalizedLevel(internship.level || 'Beginner', language)}
              </Badge>
            )}
          </div>
        )}
        
        {/* Описание - показываем только для не-HeadHunter карточек */}
        {!isHeadHunterCard && (
          <div className="h-14 mb-3">
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
              {getLocalizedDescription(internship, language)}
          </p>
        </div>
        )}
        
        {/* Skills */}
        <div className="h-8 mb-5 flex flex-wrap gap-2">
          {internship.skills.slice(0, 3).map((skill: string, i: number) => (
            <Badge key={i} variant="secondary" className="text-xs font-normal bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-none">
              {getLocalizedSkill(skill, language)}
            </Badge>
          ))}
          {internship.skills.length > 3 && (
            <Badge variant="outline" className="text-xs border-blue-400 dark:border-blue-500 text-blue-600 dark:text-blue-400">
              +{internship.skills.length - 3}
            </Badge>
          )}
        </div>
        
        {/* Internship details - показываем только для не-HeadHunter карточек */}
        {!isHeadHunterCard && (
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
              <span>{getLocalizedLocationType(internship.locationType, language)}</span>
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
        )}
        
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
            className={`w-full ${isHeadHunterCard ? 'bg-[#1560b2] hover:bg-[#0f4c8e]' : 'bg-primary hover:bg-primary/90'} text-white font-medium rounded-lg transition-all duration-300`}
            onClick={handleButtonClick}
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
                 language === 'kz' ? 'Өтінім беру' : 
                 'Apply Now'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </>
            )}
              </Button>
        </div>
      </div>
    </div>
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
    <div
      className="bg-card/60 backdrop-blur-sm border border-border/20 rounded-xl p-6 shadow-sm h-full flex flex-col hover:shadow-lg"
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-5 ${color} shadow-lg`}>
        <Icon className="w-7 h-7 text-white" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-foreground/70 text-sm">{description}</p>
    </div>
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
        // Создаем скрипт с правильными параметрами
    const script = document.createElement('script');
        script.src = "https://api.hh.ru/widgets/vacancies/search?count=6&locale=RU&links_color=1560b2&border_color=1560b2&area=40&employment=volunteer&employment=probation";
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
          // Очищаем контейнер перед добавлением нового скрипта
          widgetContainer.innerHTML = '';
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
      if (widgetContainer) {
        widgetContainer.innerHTML = '';
      }
    };
  }, []);
  
  return (
    <div id="hh-widget-container" className="w-full rounded-xl overflow-hidden bg-white dark:bg-gray-900 p-4 shadow-sm">
      {isLoading && (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}
      {error && (
        <div className="text-red-500 text-center py-4 flex items-center justify-center">
          <X className="w-4 h-4 mr-2" />
          {error}
        </div>
      )}
    </div>
  );
};

// Добавьте типы и функции для работы с HeadHunter API

// Тип для данных о вакансии с HeadHunter
// Используем тип HHVacancy из @/types/headhunter

// Добавляем импорт API клиента
import { headHunterAPI } from '../lib/headhunter';
import type { HHVacancy } from '../types/headhunter';

export default function PublicInternships() {
  const { t, language } = useTranslations();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<string>("newest");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [currentInternship, setCurrentInternship] = useState<Internship | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState<Internship | null>(null);
  
  // HeadHunter states
  const [showHHInternships, setShowHHInternships] = useState(false);
  const [hhVacancies, setHHVacancies] = useState<HHVacancy[]>([]);
  const [isLoadingHH, setIsLoadingHH] = useState(false);
  const [hhError, setHHError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  useTheme();
  const isMobile = useIsMobile();
  
  // Функция для загрузки данных с HeadHunter
  const fetchHeadHunterData = async (page: number = 1) => {
    setIsLoadingHH(true);
    setHHError(null);
    try {
      console.log('Fetching HeadHunter data...');
      const response = await headHunterAPI.searchVacancies({
        page: page - 1,
        text: 'стажировка OR стажер OR intern OR практика',
        area: '40',
        employment: 'probation,volunteer',
        per_page: 100,
        period: 30 // За последние 30 дней
      });

      console.log('HeadHunter response:', response);
      
      if (!response.items || response.items.length === 0) {
        console.log('No internships found in response');
        setHHError('Стажировки не найдены');
        setHHVacancies([]);
        return;
      }
      
      setHHVacancies(response.items);
      setTotalPages(response.pages);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching HH data:', error);
      setHHError(error instanceof Error ? error.message : 'Failed to fetch vacancies');
      setHHVacancies([]);
    } finally {
      setIsLoadingHH(false);
    }
  };

  // Загружаем данные при переключении на HeadHunter
  useEffect(() => {
    if (showHHInternships) {
      console.log('Loading HeadHunter data...');
      fetchHeadHunterData(1);
    }
  }, [showHHInternships]);

  // Комбинированные данные для отображения
  const allInternships = useMemo(() => {
    console.log('showHHInternships:', showHHInternships);
    console.log('hhVacancies:', hhVacancies);
    
    if (showHHInternships) {
      // Преобразуем вакансии HeadHunter в формат стажировок
      return hhVacancies.map(vacancy => ({
        id: parseInt(vacancy.id),
        title: vacancy.name,
        titleRu: vacancy.name,
        titleKz: vacancy.name,
        company: vacancy.employer.name,
        companyLogo: vacancy.employer.logo_urls?.original || 'https://via.placeholder.com/200',
        location: vacancy.area.name,
        locationType: (vacancy.schedule?.id === 'remote' ? 'remote' : 
                      vacancy.schedule?.id === 'fullDay' ? 'onsite' : 'hybrid') as 'remote' | 'onsite' | 'hybrid',
        description: vacancy.snippet?.responsibility || '',
        descriptionRu: vacancy.snippet?.responsibility || '',
        descriptionKz: vacancy.snippet?.responsibility || '',
        duration: '3 months',
        applicationDeadline: new Date(Date.now() + 30*24*60*60*1000).toISOString(),
        category: vacancy.professional_roles?.[0]?.name || 'Technology',
        skills: vacancy.key_skills?.map(skill => skill.name) || [],
        isPaid: !!vacancy.salary,
        featured: false,
        appliedCount: Math.floor(Math.random() * 50) + 5,
        level: 'Beginner',
        externalUrl: vacancy.alternate_url
      }));
    } else {
      // Используем локальные стажировки из Portfol.IO
      return dummyInternships.map(internship => ({
        ...internship,
        // Обновляем даты, чтобы они были актуальными
        applicationDeadline: new Date(Date.now() + Math.floor(Math.random() * 30) * 24*60*60*1000).toISOString()
      }));
    }
  }, [showHHInternships, hhVacancies]);
  
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
    if (showHHInternships && allInternships.length === 0 && !isLoadingHH) {
      fetchHeadHunterData();
    }
  }, [showHHInternships]);

  // 2. Модифицируем функцию handleInternshipClick, чтобы она работала только для не-HeadHunter карточек
  const handleInternshipClick = (internship: Internship) => {
    if (internship.externalUrl) {
      window.open(internship.externalUrl, '_blank');
    } else {
      setCurrentInternship(internship);
      setShowModal(true);
    }
  };

  // 3. Сохраняем функцию закрытия модального окна
  const closeModal = () => {
    setShowModal(false);
    setCurrentInternship(null);
  };

  // Функция для обработки кнопки "Подать заявку"
  const handleApplyClick = (internship: Internship) => {
    if (internship.externalUrl) {
      window.open(internship.externalUrl, '_blank');
    } else {
      window.location.href = `/apply/${internship.id}`;
    }
    closeModal();
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
                className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
                  !showHHInternships 
                    ? 'bg-background text-primary shadow-sm' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                <Building2 className="w-4 h-4" />
                {language === 'ru' ? 'Стажировки Portfol.IO' : 
                 language === 'kz' ? 'Portfol.IO тағылымдамалары' : 
                 'Portfol.IO Internships'}
              </button>
              <button
                onClick={() => {
                  setShowHHInternships(true);
                  fetchHeadHunterData(1);
                }}
                className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
                  showHHInternships 
                    ? 'bg-background text-primary shadow-sm' 
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                <Globe className="w-4 h-4" />
                {language === 'ru' ? 'Вакансии HeadHunter' : 
                 language === 'kz' ? 'HeadHunter вакансиялары' : 
                 'HeadHunter Jobs'}
                {isLoadingHH && (
                  <div className="ml-2 animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                )}
              </button>
              </div>
            </div>
          
          {/* Показываем состояние загрузки */}
          {isLoadingHH && showHHInternships && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="ml-3 text-foreground/70">
                {language === 'ru' ? 'Загрузка вакансий...' : 
                 language === 'kz' ? 'Вакансиялар жүктелуде...' : 
                 'Loading vacancies...'}
              </span>
            </div>
          )}

          {/* Показываем ошибку */}
          {hhError && showHHInternships && (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center p-4 mb-4 text-red-800 rounded-lg bg-red-50 dark:bg-red-800/10 dark:text-red-400">
                <X className="w-5 h-5 mr-2" />
                <span>
                  {language === 'ru' ? 'Ошибка загрузки вакансий' : 
                   language === 'kz' ? 'Вакансияларды жүктеу қатесі' : 
                   'Error loading vacancies'}
                </span>
              </div>
              <Button 
                variant="outline" 
                onClick={() => fetchHeadHunterData(1)}
                className="mt-4"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {language === 'ru' ? 'Попробовать снова' : 
                 language === 'kz' ? 'Қайталап көру' : 
                 'Try Again'}
              </Button>
            </div>
          )}
          
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
              return (showHHInternships ? allInternships : dummyInternships).filter(internship => {
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
                          language === 'ru' ? (showHHInternships ? 'Поиск по названию вакансии или компании...' : 'Поиск по названию, компании или навыкам...') : 
                          language === 'kz' ? (showHHInternships ? 'Вакансия немесе компания атауы бойынша іздеу...' : 'Атау, компания немесе дағдылар бойынша іздеу...') : 
                          (showHHInternships ? 'Search by job title or company...' : 'Search by title, company or skills...')
                        }
                        className="pl-10 py-6 text-base"
                        value={searchTerm}
                        onChange={(e) => {
                          setSearchTerm(e.target.value);
                          setCurrentPage(1);
                        }}
                  />
                </div>
                    
                    <Button 
                      variant="outline"
                      className="min-w-[180px] gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                    >
                      <Filter size={16} />
                      {language === 'ru' ? (showHHInternships ? 'Расширенный поиск' : 'Расширенные фильтры') : 
                       language === 'kz' ? (showHHInternships ? 'Кеңейтілген іздеу' : 'Кеңейтілген сүзгілер') : 
                       (showHHInternships ? 'Advanced Search' : 'Advanced Filters')}
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
                            {language === 'ru' ? (showHHInternships ? 'Сфера деятельности' : 'Категория') : 
                             language === 'kz' ? (showHHInternships ? 'Қызмет саласы' : 'Санат') : 
                             (showHHInternships ? 'Field' : 'Category')}
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
                                {language === 'ru' ? (showHHInternships ? 'Все сферы' : 'Все категории') : 
                                 language === 'kz' ? (showHHInternships ? 'Барлық салалар' : 'Барлық санаттар') : 
                                 (showHHInternships ? 'All Fields' : 'All Categories')}
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
                            {language === 'ru' ? (showHHInternships ? 'Формат работы' : 'Тип работы') : 
                             language === 'kz' ? (showHHInternships ? 'Жұмыс форматы' : 'Жұмыс түрі') : 
                             (showHHInternships ? 'Work Format' : 'Work Type')}
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
                                {language === 'ru' ? (showHHInternships ? 'Все форматы' : 'Все типы') : 
                                 language === 'kz' ? (showHHInternships ? 'Барлық форматтар' : 'Барлық түрлері') : 
                                 (showHHInternships ? 'All Formats' : 'All Types')}
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
                            {language === 'ru' ? (showHHInternships ? 'Опыт работы' : 'Длительность') : 
                             language === 'kz' ? (showHHInternships ? 'Жұмыс тәжірибесі' : 'Ұзақтығы') : 
                             (showHHInternships ? 'Experience' : 'Duration')}
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
                                {language === 'ru' ? (showHHInternships ? 'Любой опыт' : 'Любая длительность') : 
                                 language === 'kz' ? (showHHInternships ? 'Кез келген тәжірибе' : 'Кез келген ұзақтық') : 
                                 (showHHInternships ? 'Any Experience' : 'Any Duration')}
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
                            {language === 'ru' ? (showHHInternships ? 'Зарплата' : 'Оплата') : 
                             language === 'kz' ? (showHHInternships ? 'Жалақы' : 'Төлем') : 
                             (showHHInternships ? 'Salary' : 'Payment')}
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
                                {language === 'ru' ? (showHHInternships ? 'Любая зарплата' : 'Все типы') : 
                                 language === 'kz' ? (showHHInternships ? 'Кез келген жалақы' : 'Барлық түрлері') : 
                                 (showHHInternships ? 'Any Salary' : 'All Types')}
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
                            {language === 'ru' ? (showHHInternships ? 'Уровень позиции' : 'Уровень') : 
                             language === 'kz' ? (showHHInternships ? 'Позиция деңгейі' : 'Деңгей') : 
                             (showHHInternships ? 'Position Level' : 'Level')}
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
                                {language === 'ru' ? (showHHInternships ? 'Все уровни' : 'Все уровни') : 
                                 language === 'kz' ? (showHHInternships ? 'Барлық деңгейлер' : 'Барлық деңгейлер') : 
                                 (showHHInternships ? 'All Levels' : 'All Levels')}
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
                          {language === 'ru' ? (showHHInternships ? 'Сбросить все фильтры' : 'Сбросить все фильтры') : 
                           language === 'kz' ? (showHHInternships ? 'Барлық сүзгілерді қалпына келтіру' : 'Барлық сүзгілерді қалпына келтіру') : 
                           (showHHInternships ? 'Reset All Filters' : 'Reset All Filters')}
                        </Button>
                      </div>
                    </motion.div>
                  )}
            </div>
            
                {/* Заголовок с количеством найденных стажировок и сортировкой */}
                <div className="border-t border-border/20 pt-8">
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-foreground/70">
                      {language === 'ru' ? (showHHInternships ? 'Найдено вакансий: ' : 'Найдено стажировок: ') : 
                       language === 'kz' ? (showHHInternships ? 'Табылған вакансиялар: ' : 'Табылған тағылымдамалар: ') : 
                       (showHHInternships ? 'Vacancies found: ' : 'Internships found: ')}
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
                            {language === 'ru' ? (showHHInternships ? 'Популярность вакансии' : 'Популярность') : 
                             language === 'kz' ? (showHHInternships ? 'Вакансия танымалдылығы' : 'Танымалдылық') : 
                             (showHHInternships ? 'Vacancy Popularity' : 'Popularity')}
                          </SelectItem>
                          <SelectItem value="newest">
                            {language === 'ru' ? (showHHInternships ? 'Сначала новые вакансии' : 'Сначала новые') : 
                             language === 'kz' ? (showHHInternships ? 'Жаңа вакансиялар алдымен' : 'Жаңалары алдымен') : 
                             (showHHInternships ? 'Newest Vacancies First' : 'Newest First')}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                  </div>
              </div>
                  
                  {/* Сетка карточек */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {currentInternships.length > 0 ? (
                      currentInternships.map((internship, index) => (
                        <InternshipCard 
                          key={internship.id} 
                          internship={internship}
                          index={index}
                          onClick={() => handleInternshipClick(internship)}
                          language={language}
                      />
                    ))
                ) : (
                      <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center py-16 text-center">
                        <FolderX className="w-16 h-16 text-muted-foreground mb-4" />
                        <h3 className="text-xl font-bold mb-2">
                          {language === 'ru' ? (showHHInternships ? 'Вакансии не найдены' : 'Стажировки не найдены') : 
                           language === 'kz' ? (showHHInternships ? 'Вакансиялар табылмады' : 'Тағылымдамалар табылмады') : 
                           (showHHInternships ? 'No Vacancies Found' : 'No Internships Found')}
                        </h3>
                        <p className="text-foreground/70 max-w-md">
                          {language === 'ru' ? (showHHInternships ? 'Попробуйте изменить критерии поиска или фильтры для получения лучших результатов.' : 'Попробуйте изменить критерии поиска или фильтры для получения лучших результатов.') : 
                           language === 'kz' ? (showHHInternships ? 'Жақсы нәтижелер алу үшін іздеу критерийлері мен сүзгілерді өзгертіп көріңіз.' : 'Жақсы нәтижелер алу үшін іздеу критерийлері мен сүзгілерді өзгертіп көріңіз.') : 
                           (showHHInternships ? 'Try changing your search criteria or filters for better results.' : 'Try changing your search criteria or filters for better results.')}
                        </p>
                        <Button 
                          className="mt-6"
                          variant="outline"
                          onClick={clearAllFilters}
                        >
                          <RotateCcw className="w-4 h-4 mr-2" />
                          {language === 'ru' ? (showHHInternships ? 'Сбросить фильтры' : 'Сбросить фильтры') : 
                           language === 'kz' ? (showHHInternships ? 'Сүзгілерді қалпына келтіру' : 'Сүзгілерді қалпына келтіру') : 
                           (showHHInternships ? 'Reset Filters' : 'Reset Filters')}
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
                alt={getLocalizedTitle(currentInternship, language)} 
                className="w-full h-full object-cover"
                onError={(e) => {
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
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {getLocalizedDescription(currentInternship, language)}
                  </p>
                  
                  <h3 className="text-xl font-bold mb-4">
                    {language === 'ru' ? 'Необходимые навыки' : 
                     language === 'kz' ? 'Қажетті дағдылар' : 
                     'Required Skills'}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {currentInternship.skills.map((skill: string, i: number) => (
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
                    <Button 
                      className="w-full bg-primary hover:bg-primary/90 text-white"
                      onClick={() => handleApplyClick(currentInternship)}
                    >
                      {currentInternship.externalUrl ? (
                        <>
                          {language === 'ru' ? 'Перейти к вакансии' : 
                           language === 'kz' ? 'Вакансияға өту' : 
                           'Go to Vacancy'}
                          <ExternalLink className="ml-2 w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Подать заявку
                      <ArrowRight className="ml-2 w-4 h-4" />
                        </>
                      )}
            </Button>
          </div>
        </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно для просмотра деталей стажировки */}
      {isModalOpen && selectedInternship && (
        <Dialog open={isModalOpen} onOpenChange={closeModal}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                {getLocalizedTitle(selectedInternship, language)}
              </DialogTitle>
            </DialogHeader>
            
            <div className="grid gap-6">
              {/* Информация о компании */}
              <div className="flex items-center gap-4">
                <img
                  src={selectedInternship.companyLogo}
                  alt={selectedInternship.company}
                  className="w-16 h-16 object-contain rounded-lg"
                />
                <div>
                  <h3 className="font-semibold text-lg">{selectedInternship.company}</h3>
                  <p className="text-muted-foreground">
                    {getLocalizedCategory(selectedInternship.category, language)}
                  </p>
                </div>
              </div>

              {/* Основная информация */}
              <div className="space-y-4">
                <p className="text-lg">
                  {getLocalizedDescription(selectedInternship, language)}
                </p>

                {/* Детали */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span>{selectedInternship.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building className="h-5 w-5 text-muted-foreground" />
                    <span>
                      {getLocalizedLocationType(selectedInternship.locationType, language)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>{selectedInternship.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>
                      {new Date(selectedInternship.applicationDeadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Навыки */}
                <div className="space-y-2">
                  <h4 className="font-semibold">
                    {language === 'ru' ? 'Требуемые навыки' :
                     language === 'kz' ? 'Қажетті дағдылар' :
                     'Required Skills'}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedInternship.skills.map((skill, index) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Кнопки действий */}
              <div className="flex justify-end gap-4">
                {selectedInternship.externalUrl && (
                  <Button
                    variant="outline"
                    onClick={() => window.open(selectedInternship.externalUrl, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {language === 'ru' ? 'Открыть на HeadHunter' :
                     language === 'kz' ? 'HeadHunter-де ашу' :
                     'Open on HeadHunter'}
                  </Button>
                )}
                <Button onClick={closeModal}>
                  {language === 'ru' ? 'Закрыть' :
                   language === 'kz' ? 'Жабу' :
                   'Close'}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </PublicPageLayout>
  );
}
