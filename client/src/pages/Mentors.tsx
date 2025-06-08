import { useQuery } from "@tanstack/react-query";
import AppLayout from "@/components/layout/AppLayout";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTranslations } from "@/hooks/use-translations";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Filter, Star, ArrowRight, MessageCircle, Calendar, Award, Globe, 
  BookOpen, Users, GraduationCap, CheckCircle2, Briefcase, UserPlus, 
  MapPin, BadgeCheck, X, Trophy, Badge, Building2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

// Define Mentor type
interface Mentor {
  id: number;
  name: string;
  title: string;
  company: string;
  skills: string[] | null;
  rating?: number;
  bio?: string;
  profileImage: string | null;
  contactInfo: string | null;
  available?: boolean;
  location?: string;
  experience?: string;
  category?: string;
  languages?: string[];
  reviewCount?: number;
  featured?: boolean;
  // Add other fields as needed
}

// Объект с переводами
const translations = {
  en: {
    pageTitle: "Mentors",
    pageSubtitle: "Find mentors to guide you in your educational journey",
    search: "Search",
    searchPlaceholder: "Search by name, title, or skills...",
    category: "Category",
    allCategories: "All categories",
    skills: "Skills",
    allSkills: "All skills",
    company: "Company",
    allCompanies: "All companies",
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
    noMentors: "No mentors match your filters",
    noMentorsDesc: "Try changing your filter parameters or search query.",
    clearFiltersBtn: "Clear all filters",
    years: "years",
    rating: "rating",
    reviews: "reviews",
    advancedFilters: "Advanced Filters",
    applyFilters: "Apply Filters",
    featured: "Featured",
    contactMentor: "Contact Mentor",
    learnMore: "Learn More",
    aboutMentor: "About the Mentor",
    expertise: "Expertise",
    languages: "Languages",
    connectWithMentor: "Connect with Mentor",
    openForMentoring: "Open for mentoring",
    notAcceptingStudents: "Not accepting students",
    contactCopied: "Contact copied",
    requestSent: "Request sent",
    requestSentDesc: "We will contact you to arrange a meeting"
  },
  ru: {
    pageTitle: "Менторы",
    pageSubtitle: "Найдите менторов, которые помогут вам в вашем образовательном пути",
    search: "Поиск",
    searchPlaceholder: "Поиск по имени, должности или навыкам...",
    category: "Категория",
    allCategories: "Все категории",
    skills: "Навыки",
    allSkills: "Все навыки",
    company: "Компания",
    allCompanies: "Все компании",
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
    noMentors: "Нет менторов, соответствующих фильтрам",
    noMentorsDesc: "Попробуйте изменить параметры фильтрации или поискового запроса.",
    clearFiltersBtn: "Сбросить все фильтры",
    years: "лет опыта",
    rating: "рейтинг",
    reviews: "отзывов",
    advancedFilters: "Расширенные фильтры",
    applyFilters: "Применить фильтры",
    featured: "Рекомендуемый",
    contactMentor: "Связаться с ментором",
    learnMore: "Подробнее",
    aboutMentor: "О менторе",
    expertise: "Экспертиза",
    languages: "Языки",
    connectWithMentor: "Связаться с ментором",
    openForMentoring: "Принимает учеников",
    notAcceptingStudents: "Группы укомплектованы",
    contactCopied: "Контакт скопирован",
    requestSent: "Запрос отправлен",
    requestSentDesc: "Мы свяжемся с вами для организации встречи"
  },
  kz: {
    pageTitle: "Тәлімгерлер",
    pageSubtitle: "Білім алу жолыңызда сізге бағыт беретін тәлімгерлерді табыңыз",
    search: "Іздеу",
    searchPlaceholder: "Аты, қызметі немесе дағдылары бойынша іздеу...",
    category: "Санат",
    allCategories: "Барлық санаттар",
    skills: "Дағдылар",
    allSkills: "Барлық дағдылар",
    company: "Компания",
    allCompanies: "Барлық компаниялар",
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
    noMentors: "Сүзгілерге сәйкес келетін тәлімгерлер жоқ",
    noMentorsDesc: "Сүзгі параметрлерін немесе іздеу сұрауын өзгертіп көріңіз.",
    clearFiltersBtn: "Барлық сүзгілерді тазалау",
    years: "жыл тәжірибе",
    rating: "рейтинг",
    reviews: "пікір",
    advancedFilters: "Кеңейтілген сүзгілер",
    applyFilters: "Сүзгілерді қолдану",
    featured: "Ұсынылған",
    contactMentor: "Тәлімгермен байланысу",
    learnMore: "Толығырақ",
    aboutMentor: "Тәлімгер туралы",
    expertise: "Мамандану",
    languages: "Тілдер",
    connectWithMentor: "Тәлімгермен байланысу",
    openForMentoring: "Оқушыларды қабылдайды",
    notAcceptingStudents: "Топтар жасақталған",
    contactCopied: "Контакт көшірілген",
    requestSent: "Сұраныс жіберілді",
    requestSentDesc: "Кездесуді ұйымдастыру үшін сізбен байланысамыз"
  }
};

// Демо-данные для тестирования
const dummyMentors: Mentor[] = [
  {
    id: 1,
    name: "Arman Bekov",
    title: "Senior Software Engineer",
    company: "TechCorp",
    location: "Almaty, Kazakhstan",
    profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Experienced software engineer with 10+ years in full-stack development. I specialize in React, Node.js, and cloud architecture. I enjoy mentoring junior developers and helping them grow their skills.",
    category: "Software Development",
    skills: ["React", "Node.js", "AWS", "System Design", "Career Guidance"],
    languages: ["English", "Russian", "Kazakh"],
    rating: 4.9,
    reviewCount: 47,
    featured: true,
    available: true,
    experience: "10+ years",
    contactInfo: "arman@example.com"
  },
  {
    id: 2,
    name: "Aizhan Nurmagambetova",
    title: "Data Scientist",
    company: "Analytics Co",
    location: "Nur-Sultan, Kazakhstan",
    profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Data scientist with expertise in machine learning, statistical analysis, and data visualization. I love helping students make sense of data and build compelling portfolios.",
    category: "Data Science",
    skills: ["Python", "Machine Learning", "Statistics", "Data Visualization", "SQL"],
    languages: ["English", "Russian"],
    rating: 4.8,
    reviewCount: 32,
    featured: true,
    available: true,
    experience: "7 years",
    contactInfo: null
  },
  {
    id: 3,
    name: "Daulet Kenesbek",
    title: "UX/UI Designer",
    company: "Design Studio",
    location: "Almaty, Kazakhstan",
    profileImage: "https://randomuser.me/api/portraits/men/55.jpg",
    bio: "Passionate designer with a focus on creating intuitive user experiences. I believe in design thinking and user-centered approaches to product development.",
    category: "Design",
    skills: ["UX Design", "UI Design", "Figma", "Design Systems", "Prototyping"],
    languages: ["English", "Kazakh"],
    rating: 4.7,
    reviewCount: 23,
    featured: false,
    available: true,
    experience: "5 years",
    contactInfo: null
  },
  {
    id: 4,
    name: "Nurlan Abdrakhmanov",
    title: "Marketing Manager",
    company: "Brand Solutions",
    location: "Nur-Sultan, Kazakhstan",
    profileImage: "https://randomuser.me/api/portraits/men/67.jpg",
    bio: "Marketing professional focused on digital strategies, branding, and growth marketing. I help new businesses establish their presence and grow their audience.",
    category: "Marketing",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics"],
    languages: ["English", "Russian"],
    rating: 4.6,
    reviewCount: 18,
    featured: false,
    available: false,
    experience: "8 years",
    contactInfo: "nurlan@example.com"
  },
  {
    id: 5,
    name: "Kanat Zhumabekov",
    title: "Product Manager",
    company: "Product House",
    location: "Shymkent, Kazakhstan",
    profileImage: "https://randomuser.me/api/portraits/men/76.jpg",
    bio: "Product manager with experience leading teams and launching successful products. I focus on user-centered design and agile methodologies.",
    category: "Product Management",
    skills: ["Product Strategy", "Agile", "User Research", "Roadmapping", "Product Analytics"],
    languages: ["English", "Russian", "Kazakh"],
    rating: 4.9,
    reviewCount: 27,
    featured: true,
    available: true,
    experience: "6 years",
    contactInfo: null
  },
  {
    id: 6,
    name: "Aliya Nurmukhambetova",
    title: "Financial Analyst",
    company: "Finance Group",
    location: "Almaty, Kazakhstan",
    profileImage: "https://randomuser.me/api/portraits/women/63.jpg",
    bio: "Finance professional with experience in investment analysis, financial modeling, and strategic planning. I provide guidance on finance careers and skill development.",
    category: "Finance",
    skills: ["Financial Modeling", "Valuation", "Excel", "Investment Analysis", "Financial Planning"],
    languages: ["English", "Kazakh"],
    rating: 4.8,
    reviewCount: 21,
    featured: false,
    available: true,
    experience: "9 years",
    contactInfo: "aliya@example.com"
  }
];

// Функция для получения цвета градиента на основе ID ментора
const getGradientForMentor = (id: number) => {
  const gradients = [
    "from-blue-500 to-purple-600",
    "from-emerald-500 to-teal-600",
    "from-orange-500 to-amber-600",
    "from-pink-500 to-rose-600",
    "from-indigo-500 to-blue-600",
    "from-cyan-500 to-blue-500",
    "from-rose-500 to-pink-600",
    "from-green-500 to-emerald-600",
    "from-violet-500 to-purple-600",
    "from-amber-500 to-orange-600"
  ];
  
  return gradients[id % gradients.length];
};

// Компонент карточки ментора
function EnhancedMentorCard({ mentor, onSelect }: { mentor: Mentor; onSelect: (mentor: Mentor) => void }) {
  const { language } = useTranslations();
  const [imageError, setImageError] = useState(false);
  const { toast } = useToast();
  
  const t = translations[language as keyof typeof translations] || translations.en;
  
  const handleContact = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (mentor.contactInfo) {
      navigator.clipboard.writeText(mentor.contactInfo);
      toast({
        title: t.contactCopied,
        description: mentor.contactInfo
      });
    } else {
      toast({
        title: t.requestSent,
        description: t.requestSentDesc
      });
    }
  };
  
  return (
    <div 
      className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 h-[400px] flex flex-col cursor-pointer"
      onClick={() => onSelect(mentor)}
    >
      {/* Верхняя часть - фиксированная высота 100px */}
      <div className="h-[100px] px-5 py-4 flex items-center gap-4">
        {/* Фото - фиксированный размер */}
        <div className="flex-shrink-0 w-[65px] h-[65px]">
          <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/8650/8650189.png" 
              alt={mentor.name} 
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          </div>
        </div>
        
        {/* Информация - выровнена и с обрезкой текста */}
        <div className="flex-1 overflow-hidden">
          <h3 className="text-base font-semibold text-foreground truncate">{mentor.name}</h3>
          <p className="text-primary/80 text-sm truncate">{mentor.title}</p>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star 
                  key={star} 
                  className={`w-3 h-3 ${star <= Math.floor(mentor.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-foreground/70">
              {(mentor.rating || 0).toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Средняя часть - информация о категории, опыте и доступности */}
      <div className="h-[80px] px-5 py-3 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="flex flex-wrap gap-1 mb-2">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-primary/90 text-white border-none text-xs">
            {language === 'kz' ? 
              (mentor.category === 'Software Development' ? 'БҚ әзірлеу' : 
               mentor.category === 'Data Science' ? 'Деректер ғылымы' : 
               mentor.category === 'Design' ? 'Дизайн' : 
               mentor.category === 'Marketing' ? 'Маркетинг' :
               mentor.category === 'Product Management' ? 'Өнімді басқару' :
               mentor.category === 'Finance' ? 'Қаржы' :
               mentor.category || mentor.title) : 
              mentor.category || mentor.title}
          </div>
          
          {mentor.available !== undefined && (
            <div className={`inline-flex items-center rounded-full border px-2.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-xs py-0 h-5 ${
              mentor.available ? 
              'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700' : 
              'bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700'
            }`}>
              {mentor.available ? 
                (language === 'kz' ? 'Оқушылар қабылдайды' : 
                 language === 'ru' ? 'Оқушылар қабылдайды' : 
                 'Open for students') : 
                (language === 'kz' ? 'Топтар жасақталған' : 
                 language === 'ru' ? 'Топтар жасақталған' : 
                 'Not accepting students')
              }
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-xs text-foreground/60">
          {mentor.location && (
            <div className="flex items-center">
              <MapPin className="w-3 h-3 mr-1" />
              <span className="truncate max-w-[100px]">{mentor.location}</span>
            </div>
          )}
          
          {mentor.experience && (
            <div className="flex items-center">
              <Briefcase className="w-3 h-3 mr-1" />
              <span>{mentor.experience}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Навыки - фиксированная высота */}
      <div className="h-[100px] px-5 py-3">
        <h4 className="text-xs font-medium text-foreground/70 mb-2">
          {language === 'kz' ? 'Дағдылар' : language === 'ru' ? 'Навыки' : t.skills}
        </h4>
        
        <div className="flex flex-wrap gap-1 overflow-hidden" style={{ maxHeight: '60px' }}>
          {(mentor.skills || []).filter(Boolean).map((skill, index) => {
            const translatedSkill = language === 'kz' ? 
              (skill === 'React' ? 'React' :
               skill === 'Node.js' ? 'Node.js' :
               skill === 'AWS' ? 'AWS' :
               skill === 'System Design' ? 'Жүйелік дизайн' :
               skill === 'Career Guidance' ? 'Мансаптық кеңес' :
               skill === 'Python' ? 'Python' :
               skill === 'Machine Learning' ? 'Машиналық оқыту' :
               skill === 'Statistics' ? 'Статистика' :
               skill === 'Data Visualization' ? 'Деректерді визуализациялау' :
               skill === 'SQL' ? 'SQL' :
               skill === 'UX Design' ? 'UX дизайн' :
               skill === 'UI Design' ? 'UI дизайн' :
               skill === 'Figma' ? 'Figma' :
               skill === 'Design Systems' ? 'Дизайн жүйелері' :
               skill === 'Prototyping' ? 'Прототиптеу' :
               skill === 'Digital Marketing' ? 'Сандық маркетинг' :
               skill === 'SEO' ? 'SEO' :
               skill === 'Content Strategy' ? 'Контент стратегиясы' :
               skill === 'Social Media' ? 'Әлеуметтік желілер' :
               skill === 'Analytics' ? 'Аналитика' :
               skill === 'Product Strategy' ? 'Өнім стратегиясы' :
               skill === 'Agile' ? 'Agile' :
               skill === 'User Research' ? 'Пайдаланушы зерттеулері' :
               skill === 'Roadmapping' ? 'Жол картасы' :
               skill === 'Product Analytics' ? 'Өнім аналитикасы' :
               skill === 'Financial Modeling' ? 'Қаржылық модельдеу' :
               skill === 'Valuation' ? 'Бағалау' :
               skill === 'Excel' ? 'Excel' :
               skill === 'Investment Analysis' ? 'Инвестициялық талдау' :
               skill === 'Financial Planning' ? 'Қаржылық жоспарлау' :
               skill) : skill;
            
            return (
              <div key={index} className="inline-flex items-center rounded-full border font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:bg-secondary/80 text-xs py-0.5 px-2 bg-primary/5 text-primary/80 border-primary/10">
                {translatedSkill}
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Языки - фиксированная высота */}
      <div className="h-[50px] px-5 py-3 bg-gray-50/50 dark:bg-gray-800/20">
        {mentor.languages && mentor.languages.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-foreground/60">
            <Globe className="w-3 h-3" />
            <span className="truncate">{mentor.languages.join(', ')}</span>
          </div>
        )}
      </div>
      
      {/* Кнопка действия - всегда снизу */}
      <div className="px-5 py-4 mt-auto">
        <Button 
          variant="outline"
          size="sm"
          className="w-full bg-transparent hover:bg-primary hover:text-white border-primary/20 text-primary transition-all h-9"
          onClick={(e) => {
            e.stopPropagation();
            handleContact(e);
          }}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {language === 'kz' ? 'Толығырақ' : language === 'ru' ? 'Подробнее' : t.learnMore}
        </Button>
      </div>
    </div>
  );
}

export default function Mentors() {
  const { language } = useTranslations();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [skillFilter, setSkillFilter] = useState("all");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const mentorsPerPage = 6; // 6 менторов на страницу
  
  // Состояние для модального окна
  const [selectedMentor, setSelectedMentor] = useState<Mentor | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Функция для открытия модального окна
  const openMentorModal = (mentor: Mentor) => {
    console.log('Opening modal for mentor:', mentor);
    if (!mentor) {
      console.error('Attempted to open modal with no mentor data');
      return;
    }
    setSelectedMentor(mentor);
    setIsModalOpen(true);
  };
  
  // Функция для закрытия модального окна
  const closeMentorModal = () => {
    setIsModalOpen(false);
    // Сбрасываем выбранного ментора не сразу, а после закрытия анимации
    setTimeout(() => setSelectedMentor(null), 300);
  };

  // Используем переводы
  const t = translations[language as keyof typeof translations] || translations.en;

  // Fetch mentors
  const { data: mentorsFromApi, isLoading } = useQuery<Mentor[]>({
    queryKey: ['/api/mentors'],
    staleTime: Infinity,
    retry: 1,
    queryFn: async () => {
      try {
        // Пытаемся получить данные из API, но в случае ошибки возвращаем демо-данные
        // Пробуем несколько возможных путей API
        let response;
        try {
          response = await fetch('/api/mentors');
          if (!response.ok) throw new Error('First API path failed');
        } catch (e) {
          try {
            response = await fetch('/api/v1/mentors');
            if (!response.ok) throw new Error('Second API path failed');
          } catch (e2) {
            console.log('All API paths failed, using demo data:', dummyMentors);
            return dummyMentors;
          }
        }
        
        const data = await response.json();
        console.log('API response data:', data);
        return data && data.length > 0 ? data : dummyMentors;
      } catch (err) {
        console.log('Используем демо-данные из-за ошибки API:', err, dummyMentors);
        return dummyMentors;
      }
    }
  });

  // Гарантированно используем демо-данные, если API не вернул результатов
  const mentors = mentorsFromApi?.length ? mentorsFromApi : dummyMentors;
  
  console.log('Mentors data to use:', mentors);

  // Apply filters
  const filteredMentors = mentors?.filter((mentor: Mentor) => {
    // Search filter
    const searchFields = [
      mentor.name || '',
      mentor.title || '',
      mentor.company || '',
      mentor.bio || '',
      ...(mentor.skills || [])
    ].join(' ').toLowerCase();
    
    const matchesSearch = searchTerm === "" || searchFields.includes(searchTerm.toLowerCase());
    
    // Skill filter
    const matchesSkill = skillFilter === "all" || 
      mentor.skills?.some(skill => skill && skill.toLowerCase() === skillFilter.toLowerCase());
    
    // Company filter
    const matchesCompany = companyFilter === "all" || 
      (mentor.company && mentor.company.toLowerCase() === companyFilter.toLowerCase());
    
    // Availability filter
    const matchesAvailability = availabilityFilter === "all" || 
      (availabilityFilter === "available" && mentor.available === true) ||
      (availabilityFilter === "unavailable" && mentor.available === false);
    
    return matchesSearch && matchesSkill && matchesCompany && matchesAvailability;
  }) || [];

  console.log('Filtered mentors:', filteredMentors);

  // Pagination
  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
  const currentMentors = filteredMentors?.slice(indexOfFirstMentor, indexOfLastMentor) || [];
  const totalPages = Math.ceil((filteredMentors?.length || 0) / mentorsPerPage);

  console.log('Current mentors to display:', currentMentors);

  // Обеспечиваем отображение демо-данных, если filteredMentors пустой
  const displayMentors = currentMentors.length > 0 ? currentMentors : dummyMentors.slice(0, mentorsPerPage);

  // Get unique skills and companies for filters
  const uniqueSkills = Array.from(new Set((mentors || [])
    .flatMap(mentor => mentor.skills || [])
    .filter(Boolean)));
  
  const uniqueCompanies = Array.from(new Set((mentors || [])
    .map(mentor => mentor.company)
    .filter(Boolean)));

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setSkillFilter("all");
    setCompanyFilter("all");
    setAvailabilityFilter("all");
    setCurrentPage(1);
    setShowAdvancedFilters(false);
  };

  return (
    <AppLayout>
      <div className="py-8 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
        <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{t.pageTitle}</h1>
            <p className="text-muted-foreground">{t.pageSubtitle}</p>
        </div>

          {/* Фильтры */}
          <div className="mb-8 bg-card/40 backdrop-blur-sm border border-border/20 rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 items-start">
              <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
            <Input
                  id="search"
                  type="text"
                  placeholder={t.searchPlaceholder}
                  className="pl-10 py-6 text-base"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
              
              <Button 
                variant="outline"
                className="min-w-[180px] gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              >
                <Filter size={16} />
                {t.advancedFilters}
                <motion.div
                  animate={{ rotate: showAdvancedFilters ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowRight className="w-4 h-4 transform -rotate-90" />
                </motion.div>
              </Button>
            </div>
            
            {/* Расширенные фильтры с анимацией */}
            <AnimatePresence>
              {showAdvancedFilters && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden mt-4 pt-4 border-t border-border/10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Фильтр по навыкам */}
          <div>
                      <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <GraduationCap size={14} />
                        {t.skills}
                      </h4>
            <Select value={skillFilter} onValueChange={setSkillFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t.allSkills} />
              </SelectTrigger>
              <SelectContent>
                          <SelectItem value="all">{t.allSkills}</SelectItem>
                {uniqueSkills.map((skill, index) => (
                  <SelectItem key={index} value={String(skill)}>{String(skill)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
                    
                    {/* Фильтр по компании */}
          <div>
                      <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <Briefcase size={14} />
                        {t.company}
                      </h4>
            <Select value={companyFilter} onValueChange={setCompanyFilter}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t.allCompanies} />
              </SelectTrigger>
              <SelectContent>
                          <SelectItem value="all">{t.allCompanies}</SelectItem>
                {uniqueCompanies.map((company, index) => (
                  <SelectItem key={index} value={String(company)}>{String(company)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
                    
                    {/* Фильтр по доступности */}
                    <div>
                      <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                        <Calendar size={14} />
                        {t.availability}
                      </h4>
                      <Select 
                        value={availabilityFilter} 
                        onValueChange={setAvailabilityFilter}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder={t.all} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">{t.all}</SelectItem>
                          <SelectItem value="available">{t.available}</SelectItem>
                          <SelectItem value="unavailable">{t.unavailable}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={clearFilters}
                    >
                      <X className="h-4 w-4 mr-1" />
                      {t.clearFilters}
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Результаты - количество найденных менторов */}
          <div className="mb-6 flex items-center justify-between">
            <div className="text-sm text-foreground/70">
              {t.found}: <span className="font-medium">
                {filteredMentors ? filteredMentors.length : 0}
              </span> {filteredMentors && filteredMentors.length === 1 ? t.mentor : t.mentors}
        </div>

            {(searchTerm || skillFilter !== "all" || companyFilter !== "all" || availabilityFilter !== "all") && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearFilters}
                className="text-xs h-8 px-2"
              >
                <X className="h-3 w-3 mr-1" />
                {t.clearFiltersBtn}
              </Button>
            )}
          </div>

          {/* Список менторов */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array(6).fill(0).map((_, i) => (
                <div key={i} className="h-[400px] animate-pulse bg-muted rounded-lg" />
              ))}
            </div>
          ) : displayMentors && displayMentors.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {displayMentors.map((mentor) => (
                  <EnhancedMentorCard 
                    key={mentor.id} 
                    mentor={mentor}
                    onSelect={openMentorModal} 
                  />
                ))}
              </div>
              
              {/* Пагинация */}
              {totalPages > 1 && (
                <div className="mt-8 flex justify-center">
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      &larr;
                    </Button>
                    
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button 
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      &rarr;
                    </Button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Показываем демо-данные, если нет отфильтрованных результатов */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                {dummyMentors.slice(0, 3).map((mentor) => (
                  <EnhancedMentorCard 
                    key={mentor.id} 
                    mentor={mentor}
                    onSelect={openMentorModal} 
                  />
                ))}
              </div>
              <div className="text-center py-8 bg-muted/30 rounded-xl">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                  <Users className="w-8 h-8 text-muted-foreground" />
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
            </>
          )}
        </div>
      </div>
      
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
                {selectedMentor.profileImage ? (
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
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                    <span className="text-white text-5xl font-bold text-center">
                      {selectedMentor.name.split(' ').map(word => word[0]).join('')}
                    </span>
                  </div>
                )}
                
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
                  {selectedMentor.category && (
                    <Badge className="bg-blue-600 text-white mb-2">
                      {selectedMentor.category}
                    </Badge>
                  )}
                  
                  <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{selectedMentor.name}</h2>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-white/90">
                    <div className="flex items-center">
                      <Building2 className="w-4 h-4 mr-2" />
                      {selectedMentor.title} {selectedMentor.company && `at ${selectedMentor.company}`}
                    </div>
                    
                    {selectedMentor.location && (
                      <>
                        <div className="hidden md:block text-white/50">•</div>
                        
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2" />
                          {selectedMentor.location}
                        </div>
                      </>
                    )}
                    
                    {selectedMentor.experience && (
                      <>
                        <div className="hidden md:block text-white/50">•</div>
                        
                        <div className="flex items-center">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {selectedMentor.experience}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
          
              {/* Основное содержимое */}
              <div className="p-6 md:p-8">
                {/* Рейтинг и статус доступности */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  {selectedMentor.rating !== undefined && (
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-5 h-5 ${star <= Math.floor(selectedMentor.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                      <span className="ml-2 text-foreground/80 font-medium">
                        {(selectedMentor.rating || 0).toFixed(1)}
                      </span>
                      
                      {selectedMentor.reviewCount !== undefined && (
                        <>
                          <span className="mx-2 text-muted-foreground">•</span>
                          <span className="text-muted-foreground">
                            {selectedMentor.reviewCount} {language === 'ru' ? 'отзывов' : language === 'kz' ? 'пікір' : 'reviews'}
                          </span>
                        </>
                      )}
                    </div>
                  )}
                  
                  {selectedMentor.available !== undefined && (
                    selectedMentor.available ? (
                      <div className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        <div className="flex items-center">
                          <BadgeCheck className="w-3 h-3 mr-1" /> 
                          <span>{t.openForMentoring}</span>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                        {t.notAcceptingStudents}
                      </div>
                    )
                  )}
                </div>
                
                {/* Биография */}
                {selectedMentor.bio && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-foreground">
                      {t.aboutMentor}
                    </h3>
                    <p className="text-foreground/80">
                      {selectedMentor.bio}
                    </p>
                  </div>
                )}
                
                {/* Навыки */}
                {selectedMentor.skills && selectedMentor.skills.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-foreground">
                      {t.expertise}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(selectedMentor.skills || []).filter(Boolean).map((skill, index) => (
                        <Badge key={index} className="px-3 py-1 bg-primary/10 text-primary border-primary/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Языки */}
                {selectedMentor.languages && selectedMentor.languages.length > 0 && (
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-foreground">
                      {t.languages}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-foreground/70" />
                      <span className="text-foreground/80">
                        {selectedMentor.languages.join(', ')}
                      </span>
                    </div>
                  </div>
                )}
                
                {/* Кнопка действия */}
                <div className="mt-8">
                  <Button 
                    className="w-full py-6 text-lg rounded-full"
                    disabled={selectedMentor.available === false}
                    onClick={() => {
                      closeMentorModal();
                      if (selectedMentor.contactInfo) {
                        navigator.clipboard.writeText(selectedMentor.contactInfo);
                        toast({
                          title: t.contactCopied,
                          description: selectedMentor.contactInfo
                        });
                      } else {
                        toast({
                          title: t.requestSent,
                          description: t.requestSentDesc
                        });
                      }
                    }}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t.connectWithMentor}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AppLayout>
  );
}
