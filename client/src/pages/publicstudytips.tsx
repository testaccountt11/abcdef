import { useState, useRef, useMemo, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { useLocation } from "wouter";
import { 
  Search, Filter, BookOpen, ArrowRight, GraduationCap, 
  Award, Brain, BookMarked, ArrowUpRight, Calendar,
  CheckCircle2, Users, FileText, Target,
  Clock, X, Tag, Bookmark,
  Share2, ChevronRight, Star, TrendingUp,
  Eye, ThumbsUp, Mail, Bell, Check
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublicPageLayout } from "@/components/layouts/PublicPageLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/contexts/ThemeContext";
import { AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

interface StudyTip {
  id: number;
  title: string;
  titleRu?: string;
  titleKz?: string;
  description: string;
  descriptionRu?: string;
  descriptionKz?: string;
  category: string;
  imageUrl: string;
  date: string;
  author: string;
  tags: string[];
  readTime: string;
  featured: boolean;
}

const dummyStudyTips = [
  {
    id: 1,
    title: "How to Prepare for IELTS Exam: Step-by-Step Guide",
    titleRu: "Как подготовиться к экзамену IELTS: пошаговое руководство",
    titleKz: "IELTS емтиханына қалай дайындалу керек: қадамдық нұсқаулық",
    description: "The IELTS test has four parts: Listening, Reading, Writing, and Speaking. Prepare strategically by understanding each component and practicing with real exam materials. IDP IELTS Kazakhstan offers both Paper-based and Computer-based formats.",
    descriptionRu: "Тест IELTS состоит из четырех частей: Аудирование, Чтение, Письмо и Говорение. Готовьтесь стратегически, понимая каждый компонент и практикуясь с реальными экзаменационными материалами. IDP IELTS Казахстан предлагает как бумажный, так и компьютерный формат.",
    descriptionKz: "IELTS тесті төрт бөліктен тұрады: Тыңдау, Оқу, Жазу және Сөйлеу. Әрбір компонентті түсініп, нақты емтихан материалдарымен жаттығу арқылы стратегиялық түрде дайындалыңыз. IDP IELTS Қазақстан қағаз және компьютерлік форматтардың екеуін де ұсынады.",
    category: "Exam Preparation",
    imageUrl: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "2023-09-15",
    author: "IDP IELTS Kazakhstan",
    tags: ["IELTS", "English", "Exam Tips", "International Tests"],
    readTime: "8 min",
    featured: true
  },
  {
    id: 2,
    title: "ENT Preparation: Top Strategies for Success",
    titleRu: "Подготовка к ЕНТ: лучшие стратегии для успеха",
    titleKz: "ҰБТ-ға дайындық: жетістікке жету үшін жоғары стратегиялар",
    description: "Preparation for Kazakhstan's Unified National Testing requires systematic approach. TestCenter.kz offers comprehensive practice tests that simulate the actual exam environment. Regular practice with diverse question types and time management skills are key to success.",
    descriptionRu: "Подготовка к Единому национальному тестированию Казахстана требует систематического подхода. TestCenter.kz предлагает комплексные практические тесты, имитирующие реальную экзаменационную среду. Регулярная практика с разнообразными типами вопросов и навыки управления временем – ключ к успеху.",
    descriptionKz: "Қазақстанның Ұлттық бірыңғай тестілеуіне дайындық жүйелі тәсілді қажет етеді. TestCenter.kz нақты емтихан ортасын имитациялайтын кешенді практикалық тесттерді ұсынады. Сұрақтардың әртүрлі түрлерімен жүйелі түрде жаттығу және уақытты басқару дағдылары – жетістіктің кілті.",
    category: "Exam Preparation",
    imageUrl: "https://images.unsplash.com/photo-1616531770192-6eaea74c2456?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "2023-10-02",
    author: "TestCenter.kz Team",
    tags: ["ENT", "ҰБТ", "University", "Exams", "Kazakhstan"],
    readTime: "10 min",
    featured: true
  },
  {
    id: 3,
    title: "IELTS Computer-Based Test: Everything You Need to Know",
    titleRu: "Компьютерный IELTS: все, что вам нужно знать",
    titleKz: "Компьютерлік IELTS: сізге білу қажет барлық нәрсе",
    description: "IELTS on Computer offers the same test format as paper-based but with added benefits. Results are available in 2-5 days compared to 13 days for paper tests. Practice with IELTS simulation tools to get comfortable with the digital interface before your exam.",
    descriptionRu: "Компьютерный IELTS предлагает тот же формат теста, что и бумажный, но с дополнительными преимуществами. Результаты доступны через 2-5 дней по сравнению с 13 днями для бумажных тестов. Практикуйтесь с инструментами симуляции IELTS, чтобы освоиться с цифровым интерфейсом перед экзаменом.",
    descriptionKz: "Компьютерлік IELTS қағаз нұсқасымен бірдей тест форматын, бірақ қосымша артықшылықтармен ұсынады. Нәтижелер қағаз тесттерінің 13 күніне қарағанда 2-5 күн ішінде қол жетімді. Емтиханға дейін сандық интерфейспен таныс болу үшін IELTS симуляция құралдарымен жаттығыңыз.",
    category: "Exam Preparation",
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "2023-08-20",
    author: "IELTS Test Simulation",
    tags: ["IELTS", "Digital Exams", "Computer Testing", "English"],
    readTime: "6 min",
    featured: false
  },
  {
    id: 4,
    title: "Effective Time Management for GMAT Success",
    titleRu: "Эффективное управление временем для успеха в GMAT",
    titleKz: "GMAT-та жетістікке жету үшін тиімді уақытты басқару",
    description: "The GMAT exam requires strategic time allocation across sections. TestVerbal's approach focuses on question prioritization and section-specific timing strategies. Practice with timed sections to build the mental endurance needed for the 3+ hour test.",
    descriptionRu: "Экзамен GMAT требует стратегического распределения времени по разделам. Подход TestVerbal фокусируется на приоритизации вопросов и стратегиях распределения времени для каждого раздела. Практикуйтесь с ограничением по времени, чтобы выработать психологическую выносливость, необходимую для 3+ часового теста.",
    descriptionKz: "GMAT емтиханы бөлімдер бойынша стратегиялық уақыт бөлуді талап етеді. TestVerbal-дің тәсілі сұрақтардың басымдықтарын анықтауға және бөлімге тән уақытты басқару стратегияларына бағытталған. 3+ сағаттық тестке қажетті психикалық төзімділікті қалыптастыру үшін уақыт шектеулі бөлімдермен жаттығыңыз.",
    category: "Study Skills",
    imageUrl: "https://images.unsplash.com/photo-1513128034602-7814ccaddd4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "2023-09-05",
    author: "TestVerbal.ru Team",
    tags: ["Time Management", "GMAT", "Business School", "MBA"],
    readTime: "7 min",
    featured: false
  },
  {
    id: 5,
    title: "How to Choose the Right University Program",
    titleRu: "Как выбрать правильную университетскую программу",
    titleKz: "Дұрыс университеттік бағдарламаны қалай таңдау керек",
    description: "Choosing the right university program requires balancing passion, practicality, and future prospects. According to Ucheba.ru, factors to consider include employment rates, curriculum relevance, teaching quality, and availability of internships. Research both program content and institution reputation.",
    descriptionRu: "Выбор правильной университетской программы требует баланса между увлечением, практичностью и перспективами на будущее. По данным Ucheba.ru, следует учитывать показатели трудоустройства, актуальность учебной программы, качество преподавания и наличие стажировок. Исследуйте как содержание программы, так и репутацию учебного заведения.",
    descriptionKz: "Дұрыс университеттік бағдарламаны таңдау құштарлық, практикалық және болашақ перспективалар арасындағы теңгерімді талап етеді. Ucheba.ru мәліметтеріне сәйкес, жұмыспен қамту көрсеткіштері, оқу бағдарламасының өзектілігі, оқыту сапасы және тағылымдамалардың болуы ескерілуі керек. Бағдарламаның мазмұнын да, оқу орнының беделін де зерттеңіз.",
    category: "Career Guidance",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "2023-07-12",
    author: "Ucheba.ru Education Portal",
    tags: ["University", "Career Planning", "Education", "Program Selection"],
    readTime: "8 min",
    featured: false
  },
  {
    id: 6,
    title: "IELTS Reading Strategies: Improving Your Score",
    titleRu: "Стратегии чтения IELTS: повышение вашего балла",
    titleKz: "IELTS оқу стратегиялары: балыңызды жақсарту",
    description: "Master IELTS Reading with proven techniques from IELTSTestSimulation. Practice skimming for general understanding, scanning for specific information, and detailed reading for complete comprehension. Understand different question types and develop strategies for each one.",
    descriptionRu: "Освойте секцию чтения IELTS с проверенными техниками от IELTSTestSimulation. Практикуйте быстрое чтение для общего понимания, сканирование текста для поиска конкретной информации и детальное чтение для полного понимания. Изучите различные типы вопросов и разработайте стратегии для каждого из них.",
    descriptionKz: "IELTSTestSimulation ұсынған дәлелденген техникалармен IELTS оқу бөлімін меңгеріңіз. Жалпы түсіну үшін жылдам оқу, нақты ақпаратты іздеу үшін мәтінді сканерлеу және толық түсіну үшін егжей-тегжейлі оқуды практикалаңыз. Әртүрлі сұрақ түрлерін зерттеп, әрқайсысына стратегиялар жасаңыз.",
    category: "Exam Preparation",
    imageUrl: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "2023-10-10",
    author: "IELTS Test Simulation",
    tags: ["IELTS", "Reading Skills", "English", "Test Strategies"],
    readTime: "9 min",
    featured: true
  },
  {
    id: 7,
    title: "GMAT Verbal Section: Critical Reasoning Mastery",
    titleRu: "Вербальная секция GMAT: мастерство критического мышления",
    titleKz: "GMAT вербалды бөлімі: сыни ойлау шеберлігі",
    description: "The GMAT Verbal section challenges test-takers with critical reasoning questions that require careful analysis. TestVerbal.ru experts recommend focusing on argument structure, identifying conclusion and premise, and recognizing common logical flaws in reasoning.",
    descriptionRu: "Вербальная часть GMAT бросает вызов участникам теста вопросами критического мышления, требующими тщательного анализа. Эксперты TestVerbal.ru рекомендуют сосредоточиться на структуре аргументов, выявлении заключения и посылок, а также распознавании распространенных логических ошибок в рассуждениях.",
    descriptionKz: "GMAT вербалды бөлімі тест тапсырушыларға мұқият талдауды қажет ететін сыни ойлау сұрақтарымен қиындық тудырады. TestVerbal.ru сарапшылары аргумент құрылымына, қорытынды мен алғышарттарды анықтауға және ойлаудағы жалпы логикалық қателерді тануға назар аударуды ұсынады.",
    category: "Exam Preparation",
    imageUrl: "https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "2023-11-05",
    author: "TestVerbal.ru Team",
    tags: ["GMAT", "Critical Thinking", "Verbal Skills", "Logic", "Business School"],
    readTime: "11 min",
    featured: false
  },
  {
    id: 8,
    title: "Effective Study Techniques for Academic Success",
    titleRu: "Эффективные методы обучения для академического успеха",
    titleKz: "Академиялық жетістікке жету үшін тиімді оқу әдістері",
    description: "Research-backed study methods can dramatically improve learning outcomes. Techniques like spaced repetition, active recall, and the Pomodoro time management method help optimize study sessions and enhance information retention. Creating a dedicated study environment minimizes distractions.",
    descriptionRu: "Научно обоснованные методы обучения могут значительно улучшить результаты обучения. Такие техники, как распределенное повторение, активное воспроизведение и метод управления временем Помодоро, помогают оптимизировать учебные сессии и улучшить запоминание информации. Создание специальной учебной среды минимизирует отвлекающие факторы.",
    descriptionKz: "Ғылыми негізделген оқу әдістері оқу нәтижелерін айтарлықтай жақсартады. Мерзімді қайталау, белсенді еске түсіру және Pomodoro уақытты басқару әдісі сияқты техникалар оқу сессияларын оңтайландыруға және ақпаратты есте сақтауды жақсартуға көмектеседі. Арнайы оқу ортасын құру алаңдаушылықты азайтады.",
    category: "Study Skills",
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    date: "2023-08-15",
    author: "Education Research Team",
    tags: ["Study Methods", "Time Management", "Learning", "Productivity", "Academic Performance"],
    readTime: "8 min",
    featured: false
  }
];

// Add tags for filtering
const tags = [
  "#IELTS", "#ҰБТ_ENT", "#ExamPrep", "#TestCenter", "#GMAT", 
  "#StudyTips", "#TimeManagement", "#UniversityChoice", 
  "#ComputerTest", "#CareerPlanning", "#EnglishExam",
  "#ReadingSkills", "#TestStrategies", "#PracticeTests"
];

function TagButton({ tag, selected, onClick }: { tag: string; selected: boolean; onClick: () => void }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      <Button 
        variant={selected ? "default" : "ghost"} 
        size="sm"
        className={`rounded-full text-xs h-8 px-3 transition-all duration-300 ${
          selected 
            ? 'bg-primary text-white shadow-md shadow-primary/20' 
            : 'hover:bg-primary/10 text-foreground/70 hover:text-foreground'
        }`}
        onClick={onClick}
      >
        {tag}
      </Button>
    </motion.div>
  );
}

// Featured study tip card (large version)
function FeaturedStudyTipCard({ tip, onClick }: { tip: StudyTip; onClick: (tip: StudyTip) => void }) {
  const { language } = useTranslations();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const getTitle = () => {
    if (language === 'ru' && tip.titleRu) return tip.titleRu;
    if (language === 'kz' && tip.titleKz) return tip.titleKz;
    return tip.title;
  };
  
  const getDescription = () => {
    if (language === 'ru' && tip.descriptionRu) return tip.descriptionRu;
    if (language === 'kz' && tip.descriptionKz) return tip.descriptionKz;
    return tip.description;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(
      language === 'ru' ? 'ru-RU' : language === 'kz' ? 'kk-KZ' : 'en-US', 
      { day: 'numeric', month: 'long', year: 'numeric' }
    ).format(date);
  };
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group border border-border/10"
      onClick={() => onClick(tip)}
    >
      <div className="relative h-72 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-20">
            <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
          </div>
        )}
        <img 
          src={tip.imageUrl} 
          alt={getTitle()} 
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            // Fallback image on error
            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${tip.id}`;
            setImageLoaded(true);
          }}
        />
        
        <div className="absolute top-4 left-4 z-20 flex gap-3">
          <Badge className="bg-yellow-500 text-white border-none flex items-center gap-1.5">
            <Star className="w-3 h-3" fill="white" />
            {language === 'ru' ? 'Рекомендуем' : language === 'kz' ? 'Ұсынамыз' : 'Featured'}
          </Badge>
          
          <Badge className="bg-blue-600 text-white border-none">
            {tip.category}
          </Badge>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-8 h-8 border-2 border-white">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tip.author}`} />
              <AvatarFallback>{tip.author.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="text-white/90 text-sm">{tip.author}</div>
            <div className="text-white/70 text-xs">•</div>
            <div className="text-white/70 text-xs flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5" />
              {formatDate(tip.date)}
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors">
            {getTitle()}
          </h3>
          
          <p className="text-white/80 text-sm line-clamp-2">
            {getDescription()}
          </p>
        </div>
      </div>
      
      <div className="p-5 flex justify-between items-center">
        <div className="flex items-center gap-4 text-sm text-foreground/60">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1.5" />
            {tip.readTime}
          </div>
          
          <div className="flex items-center">
            <Eye className="w-4 h-4 mr-1.5" />
            {Math.floor(Math.random() * 1000) + 100}
          </div>
          
          <div className="flex items-center">
            <ThumbsUp className="w-4 h-4 mr-1.5" />
            {Math.floor(Math.random() * 50) + 5}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
            <Bookmark className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full w-8 h-8">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

// Enhanced compact study tip card
function StudyTipCard({ tip, onClick }: { tip: StudyTip; onClick: (tip: StudyTip) => void }) {
  const { language } = useTranslations();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const getTitle = () => {
    if (language === 'ru' && tip.titleRu) return tip.titleRu;
    if (language === 'kz' && tip.titleKz) return tip.titleKz;
    return tip.title;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(
      language === 'ru' ? 'ru-RU' : language === 'kz' ? 'kk-KZ' : 'en-US', 
      { day: 'numeric', month: 'numeric', year: 'numeric' }
    ).format(date);
  };
  
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      className="flex flex-col md:flex-row gap-4 p-4 rounded-lg hover:bg-card/60 transition-all cursor-pointer border border-transparent hover:border-border/20 hover:shadow-sm"
      onClick={() => onClick(tip)}
    >
      {/* Image - small square thumbnail with gradient overlay */}
      <div className="w-full md:w-40 h-40 md:h-28 flex-shrink-0 rounded-lg overflow-hidden relative group bg-muted/30">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20 z-20">
            <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 opacity-70 group-hover:opacity-100 transition-opacity z-10"></div>
        <img 
          src={tip.imageUrl} 
          alt={getTitle()} 
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            // Fallback image on error
            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${tip.id}`;
            setImageLoaded(true);
          }}
        />
        {tip.featured && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-xs text-white px-2 py-1 rounded-full flex items-center z-20">
            <Star className="w-3 h-3 mr-1" fill="white" />
            <span>
              {language === 'ru' ? 'Топ' : language === 'kz' ? 'Топ' : 'Top'}
            </span>
          </div>
        )}
        
        {/* Reading time overlay */}
        <div className="absolute bottom-2 right-2 bg-black/70 text-xs text-white px-2 py-1 rounded-full flex items-center z-20">
          <Clock className="w-3 h-3 mr-1" />
          {tip.readTime}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1">
        {/* Date and category */}
        <div className="flex items-center text-xs text-foreground/60 mb-2">
          <Calendar className="w-3.5 h-3.5 mr-1.5" />
          {formatDate(tip.date)}
          
          <span className="mx-2">•</span>
          
          <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
            {tip.category}
          </Badge>
        </div>
        
        <h3 className="text-base md:text-lg font-bold text-foreground hover:text-primary transition-colors mb-1 line-clamp-2">
          {getTitle()}
        </h3>
        
        {/* Author with avatar */}
        <div className="flex items-center text-xs text-foreground/60 mb-3">
          <Avatar className="w-5 h-5 mr-1.5">
            <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${tip.author}`} />
            <AvatarFallback>{tip.author.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          {tip.author}
        </div>
        
        {/* Tags - first 2 only */}
        <div className="flex flex-wrap gap-1.5">
          {tip.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs px-2 py-0 h-5">
              #{tag}
            </Badge>
          ))}
          {tip.tags.length > 2 && (
            <Badge variant="outline" className="text-xs px-2 py-0 h-5">
              +{tip.tags.length - 2}
            </Badge>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Condensed list item for "What's New" section
function NewTipListItem({ tip, onClick }: { tip: StudyTip; onClick: (tip: StudyTip) => void }) {
  const { language } = useTranslations();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const getTitle = () => {
    if (language === 'ru' && tip.titleRu) return tip.titleRu;
    if (language === 'kz' && tip.titleKz) return tip.titleKz;
    return tip.title;
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(
      language === 'ru' ? 'ru-RU' : language === 'kz' ? 'kk-KZ' : 'en-US', 
      { day: 'numeric', month: 'numeric' }
    ).format(date);
  };
  
  return (
    <div 
      className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
      onClick={() => onClick(tip)}
    >
      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-border/20 bg-muted/30 relative">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
            <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
          </div>
        )}
        <img 
          src={tip.imageUrl} 
          alt={getTitle()} 
          className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setImageLoaded(true)}
          onError={(e) => {
            // Fallback image on error
            (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${tip.id}`;
            setImageLoaded(true);
          }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-medium truncate">{getTitle()}</h4>
        <div className="flex items-center text-xs text-foreground/60">
          <Calendar className="w-3 h-3 mr-1" />
          {formatDate(tip.date)}
          
          <span className="mx-1">•</span>
          
          <span className="truncate">{tip.category}</span>
        </div>
      </div>
    </div>
  );
}

// Main component with enhancements
export default function PublicStudyTips() {
  const { language } = useTranslations();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedTip, setSelectedTip] = useState<StudyTip | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [savedArticles, setSavedArticles] = useState<number[]>([]);
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const { toast } = useToast();
  
  // Add these state variables for the newsletter subscription
  const [isSuccess, setIsSuccess] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");
  
  // Refs for animation
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, 50]);
  
  // Sort tips by date for "What's New" section
  const recentTips = useMemo(() => {
    return [...dummyStudyTips].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }).slice(0, 5);
  }, []);
  
  // Get featured tips
  const featuredTips = useMemo(() => 
    dummyStudyTips.filter(tip => tip.featured),
    []
  );
  
  // Group tips by category
  const tipsByCategory = useMemo(() => {
    const grouped: Record<string, StudyTip[]> = {};
    dummyStudyTips.forEach(tip => {
      if (!grouped[tip.category]) {
        grouped[tip.category] = [];
      }
      grouped[tip.category].push(tip);
    });
    return grouped;
  }, []);
  
  // Handler for saving/bookmarking articles
  const toggleSaveArticle = (id: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setSavedArticles(prev => 
      prev.includes(id) 
        ? prev.filter(articleId => articleId !== id)
        : [...prev, id]
    );
  };
  
  // Get related articles based on selected tip
  const relatedArticles = useMemo(() => {
    if (!selectedTip) return [];
    
    return dummyStudyTips
      .filter(tip => 
        tip.id !== selectedTip.id && 
        (tip.category === selectedTip.category || 
         tip.tags.some(tag => selectedTip.tags.includes(tag)))
      )
      .slice(0, 3);
  }, [selectedTip]);
  
  // Filtered tips based on search, category, tag and tab
  const filteredTips = useMemo(() => {
    let filtered = dummyStudyTips.filter(tip => {
      const matchesSearch = searchQuery === "" || 
        tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (tip.titleRu && tip.titleRu.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (tip.titleKz && tip.titleKz.toLowerCase().includes(searchQuery.toLowerCase())) ||
        tip.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = categoryFilter === "all" || tip.category === categoryFilter;
      
      const matchesTag = !selectedTag || tip.tags.some(tag => 
        `#${tag.toLowerCase()}` === selectedTag.toLowerCase()
      );
      
      return matchesSearch && matchesCategory && matchesTag;
    });
    
    // Filter by active tab
    if (activeTab === "featured") {
      filtered = filtered.filter(tip => tip.featured);
    } else if (activeTab === "saved") {
      filtered = filtered.filter(tip => savedArticles.includes(tip.id));
    }
    
    return filtered;
  }, [searchQuery, categoryFilter, selectedTag, activeTab, savedArticles]);
  
  // Handler functions
  const openTipModal = (tip: StudyTip) => {
    setSelectedTip(tip);
    setIsModalOpen(true);
  };
  
  const closeTipModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTip(null), 300);
  };
  
  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setSelectedTag(null);
    setActiveTab("all");
  };
  
  const handleTagClick = (tag: string) => {
    setSelectedTag(selectedTag === tag ? null : tag);
  };
  
  // Translations for the page
  const translations = {
    en: {
      pageTitle: "Study Tips & Guides",
      pageSubtitle: "Discover actionable advice, exam preparation strategies, and learning resources to excel in your academic journey",
      browseResources: "Browse Resources",
      whyUseOurGuides: "Why Use Our Study Guides",
      expertAdvice: "Expert Advice",
      expertAdviceDesc: "Tips and strategies from education professionals and experienced students",
      examPrep: "Exam Preparation",
      examPrepDesc: "Targeted guides for IELTS, ENT, GMAT, and other standardized tests",
      practicalTools: "Practical Tools",
      practicalToolsDesc: "Actionable templates, checklists, and methods you can apply immediately",
      allCategories: "All Categories",
      findResources: "Find Learning Resources",
      findResourcesDesc: "Browse our collection of study tips, exam preparation guides, and learning resources",
      search: "Search",
      searchPlaceholder: "Search by title, topic, or exam...",
      category: "Category",
      featured: "Featured",
      all: "All",
      clearFilters: "Clear Filters",
      found: "Found",
      articles: "articles",
      article: "article",
      noArticles: "No articles found",
      noArticlesDesc: "Try changing your search criteria or browse all articles",
      clearFiltersBtn: "Clear All Filters",
      readMore: "Read Full Article",
      // New translations for additional elements
      trending: "Trending",
      viewAllTrending: "View all trending",
      popularNow: "Popular Now",
      top: "Top",
      topics: "Topics",
      read: "Read",
      filters: "Filters",
      saved: "Saved",
      savedArticles: "Saved Articles",
      noSavedArticles: "No saved articles",
      saveArticlesDesc: "Save interesting articles to view later",
      whatsNew: "What's New",
      popularCategories: "Popular Categories",
      subscribeToUpdates: "Subscribe to Updates",
      getNewMaterials: "Get new materials delivered to your inbox",
      yourEmail: "Your email",
      subscribe: "Subscribe",
      noSpam: "No spam, we send twice a month",
      relatedArticles: "Related Articles",
      keyTakeaways: "Key Takeaways"
    },
    ru: {
      pageTitle: "Учебные советы и руководства",
      pageSubtitle: "Откройте для себя практические советы, стратегии подготовки к экзаменам и учебные ресурсы для успеха в вашем академическом пути",
      browseResources: "Просмотреть ресурсы",
      whyUseOurGuides: "Почему стоит использовать наши руководства",
      expertAdvice: "Экспертные советы",
      expertAdviceDesc: "Советы и стратегии от профессионалов в области образования и опытных студентов",
      examPrep: "Подготовка к экзаменам",
      examPrepDesc: "Целевые руководства для IELTS, ЕНТ, GMAT и других стандартизированных тестов",
      practicalTools: "Практические инструменты",
      practicalToolsDesc: "Шаблоны, чек-листы и методы, которые можно применить сразу",
      allCategories: "Все категории",
      findResources: "Найти учебные ресурсы",
      findResourcesDesc: "Просмотрите нашу коллекцию учебных советов, руководств по подготовке к экзаменам и учебных ресурсов",
      search: "Поиск",
      searchPlaceholder: "Поиск по названию, теме или экзамену...",
      category: "Категория",
      featured: "Рекомендуемые",
      all: "Все",
      clearFilters: "Очистить фильтры",
      found: "Найдено",
      articles: "статей",
      article: "статья",
      noArticles: "Статьи не найдены",
      noArticlesDesc: "Попробуйте изменить критерии поиска или просмотрите все статьи",
      clearFiltersBtn: "Очистить все фильтры",
      readMore: "Читать полную статью",
      // New translations for additional elements
      trending: "В тренде",
      viewAllTrending: "Все популярные",
      popularNow: "Популярное сейчас",
      top: "Топ",
      topics: "Темы",
      read: "Читать",
      filters: "Фильтры",
      saved: "Сохраненные",
      savedArticles: "Сохраненные статьи",
      noSavedArticles: "Нет сохраненных статей",
      saveArticlesDesc: "Сохраняйте интересные статьи для просмотра позже",
      whatsNew: "Что нового",
      popularCategories: "Популярные категории",
      subscribeToUpdates: "Подпишитесь на обновления",
      getNewMaterials: "Получайте свежие материалы на почту",
      yourEmail: "Ваш email",
      subscribe: "Подписаться",
      noSpam: "Без спама, отправляем дважды в месяц",
      relatedArticles: "Похожие статьи",
      keyTakeaways: "Ключевые выводы"
    },
    kz: {
      pageTitle: "Оқу кеңестері мен нұсқаулықтары",
      pageSubtitle: "Академиялық жолыңызда жетістікке жету үшін практикалық кеңестерді, емтиханға дайындық стратегияларын және оқу ресурстарын ашыңыз",
      browseResources: "Ресурстарды шолу",
      whyUseOurGuides: "Біздің нұсқаулықтарды неге қолдану керек",
      expertAdvice: "Сарапшы кеңестері",
      expertAdviceDesc: "Білім беру саласындағы кәсіпқойлар мен тәжірибелі студенттерден кеңестер мен стратегиялар",
      examPrep: "Емтиханға дайындық",
      examPrepDesc: "IELTS, ҰБТ, GMAT және басқа стандартталған тесттер үшін нысаналы нұсқаулықтар",
      practicalTools: "Практикалық құралдар",
      practicalToolsDesc: "Дереу қолдануға болатын іс-қимыл үлгілері, тексеру тізімдері және әдістер",
      allCategories: "Барлық санаттар",
      findResources: "Оқу ресурстарын табу",
      findResourcesDesc: "Біздің оқу кеңестерінің, емтиханға дайындық нұсқаулықтарының және оқу ресурстарының жинағын қараңыз",
      search: "Іздеу",
      searchPlaceholder: "Атауы, тақырыбы немесе емтиханы бойынша іздеу...",
      category: "Санаты",
      featured: "Ұсынылған",
      all: "Барлығы",
      clearFilters: "Сүзгілерді тазалау",
      found: "Табылды",
      articles: "мақалалар",
      article: "мақала",
      noArticles: "Мақалалар табылмады",
      noArticlesDesc: "Іздеу критерийлерін өзгертіп көріңіз немесе барлық мақалаларды шолыңыз",
      clearFiltersBtn: "Барлық сүзгілерді тазалау",
      readMore: "Толық мақаланы оқу",
      // New translations for additional elements
      trending: "Трендте",
      viewAllTrending: "Барлық танымал",
      popularNow: "Қазір танымал",
      top: "Топ",
      topics: "Тақырыптар",
      read: "Оқу",
      filters: "Сүзгілер",
      saved: "Сақталған",
      savedArticles: "Сақталған мақалалар",
      noSavedArticles: "Сақталған мақалалар жоқ",
      saveArticlesDesc: "Қызықты мақалаларды кейінірек қарау үшін сақтаңыз",
      whatsNew: "Жаңа не бар",
      popularCategories: "Танымал санаттар",
      subscribeToUpdates: "Жаңартуларға жазылыңыз",
      getNewMaterials: "Жаңа материалдарды поштаға алыңыз",
      yourEmail: "Сіздің email",
      subscribe: "Жазылу",
      noSpam: "Спамсыз, айына екі рет жібереміз",
      relatedArticles: "Ұқсас мақалалар",
      keyTakeaways: "Негізгі тұжырымдар"
    }
  };

  // Then define t based on the current language
  const t = translations[language as keyof typeof translations] || translations.en;
  
  // Обновляем компонент NewsletterBlock для отображения элегантного интегрированного уведомления в стиле приложения
  const NewsletterBlock = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isError, setIsError] = useState(false);
    const { toast } = useToast();
    const { language } = useTranslations();
    // Удаляем состояние для отладочных сообщений
    // const [debugMessages, setDebugMessages] = useState<string[]>([]);

    // Удаляем функцию отладки
    // const addDebugMessage = (message: string) => {
    //   // Выводим отладочные сообщения только в режиме разработки
    //   if (process.env.NODE_ENV === 'development') {
    //     console.log("[NewsletterBlock Debug]:", message);
    //     setDebugMessages(prev => [...prev, message]);
    //   }
    // };

    // Текст для разных языков
    const translations = {
      en: {
        title: "Subscribe to Updates",
        subtitle: "Get fresh materials in your inbox",
        placeholder: "Your email",
        button: "Subscribe",
        disclaimer: "No spam, we send twice a month",
        successToast: "Successfully subscribed!",
        successMessage: "Your request has been successfully submitted!",
        errorToast: "Subscription failed. Please try again.",
        invalidEmail: "Please enter a valid email address"
      },
      ru: {
        title: "Подпишитесь на обновления",
        subtitle: "Получайте свежие материалы на почту",
        placeholder: "Ваш email",
        button: "Подписаться",
        disclaimer: "Без спама, отправляем дважды в месяц",
        successToast: "Вы успешно подписались!",
        successMessage: "Ваша заявка была успешно отправлена!",
        errorToast: "Ошибка подписки. Пожалуйста, попробуйте еще раз.",
        invalidEmail: "Пожалуйста, введите корректный email"
      },
      kz: {
        title: "Жаңартуларға жазылыңыз",
        subtitle: "Жаңа материалдарды поштаңызға алыңыз",
        placeholder: "Сіздің email",
        button: "Жазылу",
        disclaimer: "Спамсыз, айына екі рет жібереміз",
        successToast: "Сіз сәтті жазылдыңыз!",
        successMessage: "Сіздің өтінішіңіз сәтті жіберілді!",
        errorToast: "Жазылу қатесі. Қайталап көріңіз.",
        invalidEmail: "Жарамды email енгізіңіз"
      }
    };

    const t = translations[language as keyof typeof translations] || translations.en;

    const validateEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubscribe = async () => {
      console.log("🚀 ПОДПИСКА: Кнопка нажата, email:", email);
      
      if (!email || !validateEmail(email)) {
        console.log("❌ ПОДПИСКА: Невалидный email:", email);
        toast({ 
          title: t.invalidEmail,
          variant: "destructive"
        });
        return;
      }

      setIsSubmitting(true);
      try {
        console.log("📧 ПОДПИСКА: Отправка запроса на сервер...", email);
        
        const response = await fetch("/api/newsletter-subscribe", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({ email })
        });

        console.log("📨 ПОДПИСКА: Ответ от сервера получен. Статус:", response.status);
        
        // Упрощаем обработку ответа - если статус 2xx, считаем успехом
        if (response.status >= 200 && response.status < 300) {
          console.log("✅ ПОДПИСКА: УСПЕХ! Email:", email);
          
          // Сохраняем email перед очисткой формы
          setSubmittedEmail(email);
        setEmail("");
          setIsSuccess(true);
          console.log("🎉 ПОДПИСКА: Состояние успеха установлено в TRUE");
          
          // Показываем более заметное toast уведомление с большим временем отображения
        toast({ 
            title: language === 'ru' ? 'Подписка оформлена!' : 
                   language === 'kz' ? 'Жазылым рәсімделді!' : 
                   'Subscription confirmed!',
            description: language === 'ru' ? `${email} успешно добавлен в список рассылки` : 
                         language === 'kz' ? `${email} тарату тізіміне сәтті қосылды` : 
                         `${email} was successfully added to our mailing list`,
            variant: "default",
            duration: 8000, // Увеличиваем время отображения до 8 секунд
          });
          
          // Автоматически скрываем встроенное сообщение об успехе через 8 секунд
          setTimeout(() => {
            setIsSuccess(false);
            console.log("⏰ ПОДПИСКА: Состояние успеха сброшено через таймаут");
          }, 8000);
        } else {
          // Если статус не 2xx, считаем ошибкой
          const errorText = await response.text();
          console.error("❌ ПОДПИСКА: Ошибка ответа сервера:", errorText);
          throw new Error(errorText || "Subscription failed");
        }
      } catch (error) {
        console.error("❌ ПОДПИСКА: ОШИБКА:", error);
        setSubmittedEmail(email);
        setIsError(true);
        toast({
          title: language === 'ru' ? 'Ошибка подписки!' : 
                 language === 'kz' ? 'Жазылу қатесі!' : 
                 'Subscription error!',
          description: language === 'ru' ? 'Пожалуйста, попробуйте позже' : 
                       language === 'kz' ? 'Кейінірек қайталап көріңіз' : 
                       'Please try again later',
          variant: "destructive",
          duration: 5000
        });
        
        // Автоматически скрываем сообщение об ошибке через 8 секунд
        setTimeout(() => {
          setIsError(false);
        }, 8000);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="p-6 relative">
        {isSuccess ? (
          <div className="bg-card border border-primary/20 rounded-lg p-6 shadow-md transition-all duration-300">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30">
                <CheckCircle2 className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              
              <div>
                <h3 className="text-2xl font-semibold mb-2">
                  {language === 'ru' ? 'Подписка оформлена!' : 
                   language === 'kz' ? 'Жазылым рәсімделді!' : 
                   'Subscription confirmed!'}
                </h3>
                
                <p className="text-muted-foreground mb-6">
                  {language === 'ru' ? 'Спасибо! Вы успешно подписались на нашу рассылку.' : 
                   language === 'kz' ? 'Рахмет! Сіз біздің таратылымға сәтті жазылдыңыз.' : 
                   'Thank you! You have successfully subscribed to our newsletter.'}
                </p>
                
                <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md mb-6 border border-green-200 dark:border-green-900/50">
                  <p className="text-green-600 dark:text-green-400 font-medium">{submittedEmail}</p>
                </div>
                
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => setIsSuccess(false)}
                >
                  {language === 'ru' ? 'Закрыть' : 
                   language === 'kz' ? 'Жабу' : 
                   'Close'}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">{t.title}</h3>
            <p className="text-sm text-foreground/70">{t.subtitle}</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder}
            className="bg-background/80"
                disabled={isSubmitting}
          />
          
          <Button 
            className="w-full"
            onClick={handleSubscribe}
                disabled={isSubmitting}
          >
                {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                {t.button}
              </span>
            ) : (
              t.button
            )}
          </Button>
          
          <p className="text-xs text-center text-foreground/60">
            {t.disclaimer}
          </p>
        </div>
          </>
        )}
        
        {/* Удалены большие модальные окна успеха и ошибки */}
      </div>
    );
  };
  
  return (
    <PublicPageLayout>
      {/* Gradient background remains the same */}
      <div className={`fixed inset-0 overflow-hidden pointer-events-none -z-50 ${theme === 'dark' ? 'bg-gradient-background' : ''}`}>
        <div className="absolute top-0 left-0 right-0 h-[60vh] bg-gradient-to-br from-primary/5 via-transparent to-indigo-400/5 dark:from-primary/10 dark:via-transparent dark:to-indigo-400/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-tr from-blue-400/5 via-transparent to-primary/5 dark:from-blue-500/10 dark:via-transparent dark:to-primary/10 blur-3xl"></div>
      </div>
      
      <main className="relative overflow-hidden">
        {/* HERO SECTION with animated icons */}
        <section className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center py-16 md:py-24 overflow-hidden">
          <div className="container mx-auto px-4 max-w-7xl relative z-10" ref={heroRef}>
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
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 pt-4 pb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 leading-relaxed"
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
                      const section = document.getElementById('tips-section');
                      if (section) {
                        section.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span className="flex items-center">
                      {t.browseResources}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Floating animation elements - ADD THESE */}
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
            <BookOpen className="w-16 h-16" />
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
            <FileText className="w-10 h-10" />
          </motion.div>

          <motion.div 
            className="absolute bottom-[15%] right-[20%] text-blue-400/30 z-0"
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
            <BookMarked className="w-13 h-13" />
          </motion.div>
          
          <motion.div 
            className="absolute top-[20%] left-[30%] text-yellow-400/20 z-0"
            animate={{
              y: [0, 10, 0],
              x: [0, -5, 0],
              rotate: [0, 8, 0]
            }}
            transition={{
              duration: 9.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Award className="w-14 h-14" />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-[40%] right-[25%] text-indigo-400/20 z-0"
            animate={{
              y: [0, -12, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 7.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Target className="w-12 h-12" />
          </motion.div>
        </section>
        
        {/* MAIN CONTENT SECTION - REDESIGNED */}
        <section id="tips-section" className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            {/* Two-column layout with adjusted proportions */}
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Main content area - reduce width */}
              <div className="flex-1 lg:max-w-[65%]">
                {/* Enhanced Trending Section with reduced width */}
                {featuredTips.length > 0 && !selectedTag && categoryFilter === "all" && !searchQuery && activeTab === "all" && (
                  <div className="mb-12">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold flex items-center">
                        <TrendingUp className="w-6 h-6 mr-2 text-primary" />
                        {language === 'ru' ? 'В тренде' : 
                         language === 'kz' ? 'Трендте' : 
                         'Trending'}
                      </h2>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-primary hover:text-primary/80"
                      >
                        {language === 'ru' ? 'Все популярные' : 
                         language === 'kz' ? 'Барлық танымал' : 
                         'View all trending'} <ArrowRight className="ml-1 w-4 h-4" />
                      </Button>
                    </div>
                    
                    {/* Restructured trending grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      {/* Featured article */}
                      <div 
                        className="lg:col-span-2 relative group cursor-pointer overflow-hidden rounded-xl"
                        onClick={() => openTipModal(featuredTips[0])}
                      >
                        <div className="relative aspect-[16/9] overflow-hidden rounded-xl">
                            <img 
                              src={featuredTips[0].imageUrl} 
                            alt={featuredTips[0].title}
                            className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-500"
                            />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                          <div className="absolute bottom-4 left-4 right-4">
                            <Badge className="mb-2 bg-primary/90">
                              {featuredTips[0].category}
                              </Badge>
                            <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                                {language === 'ru' && featuredTips[0].titleRu ? featuredTips[0].titleRu : 
                                 language === 'kz' && featuredTips[0].titleKz ? featuredTips[0].titleKz : 
                                 featuredTips[0].title}
                              </h3>
                            <div className="flex items-center text-sm text-white/80">
                              <Clock className="w-4 h-4 mr-1" />
                                {featuredTips[0].readTime}
                              <span className="mx-2">•</span>
                              <Eye className="w-4 h-4 mr-1" />
                              {Math.floor(Math.random() * 1000) + 500}
                              </div>
                            </div>
                        </div>
                      </div>
                      
                      {/* Side list */}
                      <div className="lg:col-span-1">
                        <div className="space-y-1">
                            {featuredTips.slice(1, 4).map((tip, index) => (
                              <div 
                                key={tip.id}
                              className="p-3 hover:bg-muted/30 transition-colors cursor-pointer flex gap-3 items-center rounded-lg"
                                onClick={() => openTipModal(tip)}
                              >
                                <div className="font-bold text-xl text-primary/20 w-6 flex-shrink-0">
                                {index + 2}
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium line-clamp-2">
                                    {language === 'ru' && tip.titleRu ? tip.titleRu : 
                                     language === 'kz' && tip.titleKz ? tip.titleKz : 
                                     tip.title}
                                  </div>
                                  <div className="flex items-center mt-1 text-xs text-foreground/60">
                                    <Badge className="text-xs mr-2 px-1.5 py-0 h-4">
                                      {tip.category}
                                    </Badge>
                                    <Clock className="w-3 h-3 mr-1" />
                                    {tip.readTime}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Tabs Navigation */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
                  <TabsList className="grid grid-cols-3 w-full md:w-auto">
                    <TabsTrigger value="all" className="text-sm px-4">
                      {language === 'ru' ? 'Все' : 
                       language === 'kz' ? 'Барлығы' : 
                       'All'}
                    </TabsTrigger>
                    <TabsTrigger value="featured" className="text-sm px-4">
                      {language === 'ru' ? 'Рекомендуемые' : 
                       language === 'kz' ? 'Ұсынылған' : 
                       'Featured'}
                    </TabsTrigger>
                    <TabsTrigger value="saved" className="text-sm px-4">
                      {language === 'ru' ? 'Сохраненные' : 
                       language === 'kz' ? 'Сақталған' : 
                       'Saved'} ({savedArticles.length})
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
                
                {/* Tags scrolling horizontal row */}
                <div className="mb-8 overflow-x-auto pb-2">
                  <div className="flex gap-2 min-w-max">
                    {tags.map((tag) => (
                      <TagButton
                        key={tag}
                        tag={tag}
                        selected={selectedTag === tag}
                        onClick={() => handleTagClick(tag)}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Search and filters */}
                <div className="mb-8">
                  <div className="bg-card/40 backdrop-blur-sm border border-border/20 rounded-xl p-4 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="flex-1 relative w-full">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
                        <Input
                          type="text"
                          placeholder={t.searchPlaceholder}
                          className="pl-10 py-3 text-base"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      
                      {/* Active filters display */}
                      {(selectedTag || categoryFilter !== "all" || searchQuery) && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-foreground/60">Filters:</span>
                          <div className="flex gap-1">
                            {selectedTag && (
                              <Badge className="bg-primary/10 text-primary flex items-center gap-1 px-2 py-1">
                                {selectedTag}
                                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedTag(null)} />
                              </Badge>
                            )}
                            
                            {categoryFilter !== "all" && (
                              <Badge className="bg-primary/10 text-primary flex items-center gap-1 px-2 py-1">
                                {categoryFilter}
                                <X className="w-3 h-3 cursor-pointer" onClick={() => setCategoryFilter("all")} />
                              </Badge>
                            )}
                            
                            {searchQuery && (
                              <Badge className="bg-primary/10 text-primary flex items-center gap-1 px-2 py-1">
                                "{searchQuery}"
                                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchQuery("")} />
                              </Badge>
                            )}
                          </div>
                          
                          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs h-8">
                            {t.clearFiltersBtn}
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Category Quick Filters */}
                <div className="mb-8 flex flex-wrap gap-2">
                  <Button 
                    variant={categoryFilter === "all" ? "default" : "outline"}
                    size="sm"
                    className="rounded-full"
                    onClick={() => setCategoryFilter("all")}
                  >
                    {language === 'ru' ? 'Все категории' : 
                     language === 'kz' ? 'Барлық санаттар' : 
                     'All Categories'}
                  </Button>
                  
                  {Object.keys(tipsByCategory).slice(0, 3).map(category => (
                    <Button
                      key={category}
                      variant={categoryFilter === category ? "default" : "outline"}
                      size="sm"
                      className="rounded-full"
                      onClick={() => setCategoryFilter(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
                
                {/* Articles by Category or Filtered Results */}
                {activeTab === "all" && !selectedTag && categoryFilter === "all" && !searchQuery ? (
                  Object.entries(tipsByCategory).map(([category, tips]) => (
                    <div key={category} className="mb-12">
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold">{category}</h2>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-primary hover:text-primary/80"
                          onClick={() => setCategoryFilter(category)}
                        >
                          {language === 'ru' ? 'Все статьи' : 
                           language === 'kz' ? 'Барлық мақалалар' : 
                           'View all'} <ArrowRight className="ml-1 w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-1 gap-6 divide-y divide-border/10">
                        {tips.slice(0, 3).map((tip) => (
                          <StudyTipCard key={tip.id} tip={tip} onClick={openTipModal} />
                        ))}
                      </div>
                      
                      <Separator className="my-8" />
                    </div>
                  ))
                ) : (
                  <>
                    {/* Filtered results heading */}
                    <h2 className="text-2xl font-bold mb-6">
                      {activeTab === "saved" 
                        ? (language === 'ru' ? 'Сохраненные статьи' : 
                           language === 'kz' ? 'Сақталған мақалалар' : 
                           'Saved Articles') 
                        : `${t.found}: ${filteredTips.length} ${filteredTips.length === 1 ? t.article : t.articles}`}
                    </h2>
                    
                    {/* Filtered results */}
                    {filteredTips.length > 0 ? (
                      <div className="grid grid-cols-1 gap-6 divide-y divide-border/10">
                        {filteredTips.map((tip) => (
                          <StudyTipCard key={tip.id} tip={tip} onClick={openTipModal} />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-16 bg-muted/30 rounded-xl">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                          <BookOpen className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          {activeTab === "saved" 
                            ? (language === 'ru' ? 'Нет сохраненных статей' : 
                               language === 'kz' ? 'Сақталған мақалалар жоқ' : 
                               'No saved articles') 
                            : t.noArticles}
                        </h3>
                        <p className="text-foreground/70 max-w-md mx-auto mb-6">
                          {activeTab === "saved" 
                            ? (language === 'ru' ? 'Сохраняйте интересные статьи для просмотра позже' : 
                               language === 'kz' ? 'Қызықты мақалаларды кейінірек қарау үшін сақтаңыз' : 
                               'Save interesting articles to view later') 
                            : t.noArticlesDesc}
                        </p>
                        <Button onClick={clearFilters}>
                          {t.clearFiltersBtn}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
              
              {/* Sidebar - explicitly set width */}
              <div className="w-full lg:w-[35%] lg:min-w-[320px] mt-8 lg:mt-0">
                {/* What's New Section */}
                <Card className="mb-8">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold flex items-center">
                        <Bell className="w-4 h-4 mr-2 text-primary" />
                        {language === 'ru' ? 'Что нового' : 
                         language === 'kz' ? 'Жаңа не бар' : 
                         'What\'s New'}
                      </h3>
                    </div>
                    
                    <div className="space-y-3">
                      {recentTips.map(tip => (
                        <div key={tip.id} className="group">
                          <NewTipListItem tip={tip} onClick={openTipModal} />
                          {tip !== recentTips[recentTips.length - 1] && <Separator className="mt-3 opacity-30" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Popular Categories */}
                <Card className="mb-8">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">
                        {language === 'ru' ? 'Популярные категории' : 
                         language === 'kz' ? 'Танымал санаттар' : 
                         'Popular Categories'}
                      </h3>
                    </div>
                    
                    <div className="space-y-2">
                      {Object.entries(tipsByCategory).map(([category, tips]) => (
                        <div 
                          key={category}
                          className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 cursor-pointer transition-colors"
                          onClick={() => setCategoryFilter(category)}
                        >
                          <span className="text-sm font-medium">{category}</span>
                          <Badge variant="outline" className="text-xs">
                            {tips.length}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                {/* Newsletter Subscription */}
                <Card className="bg-gradient-to-br from-primary/5 to-blue-500/5 border-primary/10">
                  <CardContent className="p-6">
                    <NewsletterBlock />
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Enhanced Modal for tip details */}
      <Dialog open={isModalOpen} onOpenChange={(open) => !open && closeTipModal()}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] p-0 overflow-hidden flex flex-col">
          <DialogHeader className="sr-only">
            <DialogTitle>
              {selectedTip && (language === 'ru' && selectedTip.titleRu ? selectedTip.titleRu : 
               language === 'kz' && selectedTip.titleKz ? selectedTip.titleKz : 
               selectedTip.title)}
            </DialogTitle>
            <DialogDescription>
              {selectedTip && (language === 'ru' && selectedTip.descriptionRu ? selectedTip.descriptionRu : 
               language === 'kz' && selectedTip.descriptionKz ? selectedTip.descriptionKz : 
               selectedTip.description)}
            </DialogDescription>
          </DialogHeader>
          {selectedTip && (
            <div className="flex flex-col h-full max-h-[90vh]">
              {/* Hero Image with Gradient Overlay */}
              <div className="h-64 md:h-72 relative bg-muted/30 flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                {/* Image loading spinner */}
                <div className="absolute inset-0 flex items-center justify-center z-20 bg-muted/20">
                  <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin"></div>
                </div>
                <img 
                  src={selectedTip.imageUrl} 
                  alt={language === 'ru' && selectedTip.titleRu ? selectedTip.titleRu : 
                       language === 'kz' && selectedTip.titleKz ? selectedTip.titleKz : 
                       selectedTip.title} 
                  className="w-full h-full object-cover" 
                  onLoad={(e) => {
                    // Hide spinner when image loads
                    const target = e.target as HTMLImageElement;
                    const spinner = target.previousElementSibling as HTMLElement;
                    if (spinner) spinner.style.display = 'none';
                  }}
                  onError={(e) => {
                    // Fallback image on error
                    (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/shapes/svg?seed=${selectedTip.id}`;
                    // Hide spinner when fallback loads
                    const target = e.target as HTMLImageElement;
                    const spinner = target.previousElementSibling as HTMLElement;
                    if (spinner) spinner.style.display = 'none';
                  }}
                />
              </div>
                
                {/* Article Info */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <Badge className="bg-blue-600 text-white mb-2 border-none">
                      {selectedTip.category}
                    </Badge>
                    
                    {selectedTip.featured && (
                      <Badge className="bg-yellow-500 text-white border-none flex items-center gap-1.5">
                        <Star className="w-3 h-3" fill="white" />
                        {language === 'ru' ? 'Рекомендуем' : 
                         language === 'kz' ? 'Ұсынамыз' : 
                         'Featured'}
                      </Badge>
                    )}
                  </div>
                  
                  <h2 className="text-xl md:text-2xl font-bold text-white">
                    {language === 'ru' && selectedTip.titleRu ? selectedTip.titleRu : 
                     language === 'kz' && selectedTip.titleKz ? selectedTip.titleKz : 
                     selectedTip.title}
                  </h2>
                </div>
                
                {/* Action Buttons */}
                <div className="absolute top-4 right-4 z-30 flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full"
                    onClick={(e) => toggleSaveArticle(selectedTip.id, e)}
                  >
                    <Bookmark 
                      className="w-5 h-5" 
                      fill={savedArticles.includes(selectedTip.id) ? "currentColor" : "none"} 
                    />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full"
                  >
                    <Share2 className="w-5 h-5" />
                  </Button>
              </div>
              
              {/* Article Content - Fixed scrolling issues */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-6">
                  {/* Article metadata */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>{selectedTip.author.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="text-sm font-medium">{selectedTip.author}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(selectedTip.date).toLocaleDateString()} · {selectedTip.readTime}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{Math.floor(Math.random() * 900) + 100}</span>
                      </Badge>
                      <Badge variant="outline" className="flex items-center space-x-1">
                        <ThumbsUp className="h-3 w-3" />
                        <span>{Math.floor(Math.random() * 50) + 5}</span>
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Full article text - Improved structure */}
                  <div className="prose dark:prose-invert max-w-none">
                    {/* Introduction */}
                    <div className="bg-muted/30 p-4 rounded-lg border border-border/20 mb-6">
                      <p className="text-lg font-medium">
                        {language === 'ru' && selectedTip.descriptionRu 
                          ? selectedTip.descriptionRu 
                          : language === 'kz' && selectedTip.descriptionKz 
                            ? selectedTip.descriptionKz 
                            : selectedTip.description}
                    </p>
                    </div>
                    
                    {/* Key Takeaways Section */}
                    <div className="mb-8">
                      <div className="flex items-start gap-2 mb-4">
                        <div className="p-2 rounded-full bg-primary/10 text-primary">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <h3 className="text-xl font-bold mt-1">{t.keyTakeaways}</h3>
                      </div>
                      
                      <div className="bg-card rounded-xl p-4 border border-border/20 shadow-sm">
                        <ul className="space-y-3">
                          {Array.from({ length: 3 }).map((_, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                                {i + 1}
                        </div>
                        <div>
                                <p className="font-medium">
                                  {language === 'ru' 
                                    ? `${selectedTip.descriptionRu?.split(".")[i] || "Важная информация для учащихся"}`
                                    : language === 'kz'
                                      ? `${selectedTip.descriptionKz?.split(".")[i] || "Оқушыларға арналған маңызды ақпарат"}`
                                      : `${selectedTip.description.split(".")[i] || "Important information for students"}`}
                                </p>
                        </div>
                      </li>
                          ))}
                        </ul>
                        </div>
                        </div>
                    
                    {/* Main Content - More structured and useful */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" />
                        {language === 'ru' ? 'Подробная информация' : language === 'kz' ? 'Толық ақпарат' : 'Detailed Information'}
                      </h3>
                      
                      <div className="space-y-4">
                        <p>
                          {language === 'ru' 
                            ? 'В этом разделе представлена детальная информация о теме. Тщательное изучение материалов поможет лучше подготовиться и добиться высоких результатов.'
                            : language === 'kz'
                              ? 'Бұл бөлімде тақырып туралы толық ақпарат берілген. Материалдарды мұқият зерттеу жақсы дайындалуға және жоғары нәтижелерге қол жеткізуге көмектеседі.'
                              : 'This section provides detailed information about the topic. Careful study of the materials will help you better prepare and achieve high results.'}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                          <div className="bg-muted/20 p-4 rounded-lg border border-border/20">
                            <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
                              <Target className="h-4 w-4 text-primary" />
                              {language === 'ru' ? 'Цели' : language === 'kz' ? 'Мақсаттар' : 'Goals'}
                            </h4>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</div>
                                <span>
                                  {language === 'ru' 
                                    ? 'Понимание ключевых концепций и принципов'
                                    : language === 'kz'
                                      ? 'Негізгі тұжырымдамалар мен принциптерді түсіну'
                                      : 'Understanding key concepts and principles'}
                                </span>
                      </li>
                              <li className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</div>
                                <span>
                                  {language === 'ru' 
                                    ? 'Развитие необходимых навыков и стратегий'
                                    : language === 'kz'
                                      ? 'Қажетті дағдылар мен стратегияларды дамыту'
                                      : 'Developing necessary skills and strategies'}
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0 mt-0.5">✓</div>
                                <span>
                                  {language === 'ru' 
                                    ? 'Подготовка к успешной сдаче экзаменов и тестов'
                                    : language === 'kz'
                                      ? 'Емтихандар мен тесттерді сәтті тапсыруға дайындық'
                                      : 'Preparing for successful completion of exams and tests'}
                                </span>
                              </li>
                            </ul>
                        </div>
                          
                          <div className="bg-muted/20 p-4 rounded-lg border border-border/20">
                            <h4 className="font-semibold text-base mb-2 flex items-center gap-2">
                              <BookOpen className="h-4 w-4 text-primary" />
                              {language === 'ru' ? 'Ресурсы' : language === 'kz' ? 'Ресурстар' : 'Resources'}
                            </h4>
                            <ul className="space-y-2">
                              <li className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0 mt-0.5">•</div>
                                <span>
                                  {language === 'ru' 
                                    ? 'Официальные учебные материалы и руководства'
                                    : language === 'kz'
                                      ? 'Ресми оқу материалдары мен нұсқаулықтар'
                                      : 'Official study materials and guides'}
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0 mt-0.5">•</div>
                                <span>
                                  {language === 'ru' 
                                    ? 'Онлайн-курсы и интерактивные практические задания'
                                    : language === 'kz'
                                      ? 'Онлайн курстар және интерактивті практикалық тапсырмалар'
                                      : 'Online courses and interactive practice exercises'}
                                </span>
                              </li>
                              <li className="flex items-start gap-2">
                                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs flex-shrink-0 mt-0.5">•</div>
                                <span>
                                  {language === 'ru' 
                                    ? 'Сообщества учащихся и форумы для обмена опытом'
                                    : language === 'kz'
                                      ? 'Тәжірибе алмасу үшін студенттер қауымдастықтары мен форумдар'
                                      : 'Student communities and forums for experience sharing'}
                                </span>
                      </li>
                    </ul>
                          </div>
                        </div>
                        
                        <p>
                          {language === 'ru' 
                            ? 'Каждый учебный материал разработан экспертами в своей области, чтобы обеспечить максимальную пользу для учащихся. Следуя рекомендациям, вы сможете значительно улучшить свои показатели.'
                            : language === 'kz'
                              ? 'Әрбір оқу материалы оқушыларға барынша пайдалы болу үшін өз саласының мамандарымен әзірленген. Ұсыныстарды орындау арқылы көрсеткіштеріңізді айтарлықтай жақсарта аласыз.'
                              : 'Each study material is developed by experts in their field to provide maximum benefit to students. By following the recommendations, you can significantly improve your performance.'}
                        </p>
                      </div>
                    </div>
                    
                    {/* Practical Tips Section */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <BookMarked className="h-5 w-5 text-primary" />
                        {language === 'ru' ? 'Практические советы' : language === 'kz' ? 'Практикалық кеңестер' : 'Practical Tips'}
                      </h3>
                      
                      <div className="bg-gradient-to-br from-primary/5 to-blue-500/5 p-5 rounded-lg border border-primary/10">
                        <ol className="space-y-4 list-decimal ml-5">
                          <li>
                            <p className="font-medium">
                              {language === 'ru' 
                                ? 'Создайте регулярное расписание занятий и придерживайтесь его'
                                : language === 'kz'
                                  ? 'Тұрақты сабақ кестесін жасаңыз және оны ұстаныңыз'
                                  : 'Create a regular study schedule and stick to it'}
                            </p>
                            <p className="text-sm text-foreground/80 mt-1">
                              {language === 'ru' 
                                ? 'Регулярность — ключ к эффективному обучению. Выделите конкретное время каждый день для занятий.'
                                : language === 'kz'
                                  ? 'Тұрақтылық - тиімді оқытудың кілті. Күн сайын сабаққа нақты уақыт бөліңіз.'
                                  : 'Consistency is key to effective learning. Set aside specific times each day for studying.'}
                            </p>
                          </li>
                          <li>
                            <p className="font-medium">
                              {language === 'ru' 
                                ? 'Разбивайте материал на небольшие, управляемые части'
                                : language === 'kz'
                                  ? 'Материалды кішкене, басқарылатын бөліктерге бөліңіз'
                                  : 'Break down material into small, manageable chunks'}
                            </p>
                            <p className="text-sm text-foreground/80 mt-1">
                              {language === 'ru' 
                                ? 'Изучение небольших порций информации более эффективно, чем попытка освоить всё сразу.'
                                : language === 'kz'
                                  ? 'Ақпараттың шағын бөліктерін зерттеу бәрін бірден игеруге тырысқаннан гөрі тиімдірек.'
                                  : 'Studying small portions of information is more effective than trying to master everything at once.'}
                            </p>
                          </li>
                          <li>
                            <p className="font-medium">
                              {language === 'ru' 
                                ? 'Практикуйтесь с реальными примерами экзаменационных заданий'
                                : language === 'kz'
                                  ? 'Емтихан тапсырмаларының нақты мысалдарымен практика жасаңыз'
                                  : 'Practice with real examples of exam tasks'}
                            </p>
                            <p className="text-sm text-foreground/80 mt-1">
                              {language === 'ru' 
                                ? 'Регулярное решение практических заданий поможет вам ознакомиться с форматом и требованиями экзамена.'
                                : language === 'kz'
                                  ? 'Практикалық тапсырмаларды үнемі шешу емтихан форматымен және талаптарымен танысуға көмектеседі.'
                                  : 'Regularly solving practice tasks will help you become familiar with the exam format and requirements.'}
                    </p>
                          </li>
                        </ol>
                      </div>
                    </div>
                    
                    {/* Tags in a more visually appealing section */}
                    <div className="bg-muted/20 p-4 rounded-lg border border-border/20 mt-8">
                      <h4 className="font-semibold text-sm mb-3 flex items-center gap-2">
                        <Tag className="h-4 w-4 text-primary" />
                        {language === 'ru' ? 'Темы и теги' : language === 'kz' ? 'Тақырыптар мен тегтер' : 'Topics & Tags'}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTip.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary/10 transition-colors">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                    {/* Related articles section with improved design */}
                    <div className="mt-10">
                      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <ArrowUpRight className="h-5 w-5 text-primary" />
                        {t.relatedArticles}
                    </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {dummyStudyTips
                          .filter(tip => tip.id !== selectedTip.id && tip.category === selectedTip.category)
                          .slice(0, 2)
                          .map(tip => (
                        <div 
                              key={tip.id}
                              className="bg-card rounded-lg p-4 cursor-pointer hover:shadow-md transition-all hover:border-primary/30 border border-border/20"
                          onClick={() => {
                            closeTipModal();
                                setTimeout(() => openTipModal(tip), 300);
                          }}
                        >
                              <div className="flex items-start gap-3">
                                <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-muted/50">
                            <img 
                                    src={tip.imageUrl} 
                                    alt={language === 'ru' && tip.titleRu ? tip.titleRu : 
                                          language === 'kz' && tip.titleKz ? tip.titleKz : 
                                          tip.title}
                                    className="w-full h-full object-cover"
                            />
                          </div>
                                <div className="flex-1">
                                  <h4 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                                    {language === 'ru' && tip.titleRu 
                                      ? tip.titleRu 
                                      : language === 'kz' && tip.titleKz 
                                        ? tip.titleKz 
                                        : tip.title}
                          </h4>
                                  <div className="flex items-center justify-between mt-1">
                                    <Badge variant="outline" className="text-xs">
                                      {tip.category}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                                      {tip.readTime}
                                    </span>
                                  </div>
                                </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Floating notification removed - it was causing TypeScript errors */}
    </PublicPageLayout>
  );
}
