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
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1508962914676-134849a727f0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
    imageUrl: "https://images.unsplash.com/photo-1456081445129-830eb8d4bfc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
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
        <img 
          src={tip.imageUrl} 
          alt={getTitle()} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
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
      <div className="w-full md:w-40 h-40 md:h-28 flex-shrink-0 rounded-lg overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 opacity-70 group-hover:opacity-100 transition-opacity z-10"></div>
        <img 
          src={tip.imageUrl} 
          alt={getTitle()} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
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
      <div className="w-10 h-10 rounded-md overflow-hidden flex-shrink-0">
        <img src={tip.imageUrl} alt={getTitle()} className="w-full h-full object-cover" />
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
  
  const NewsletterBlock = () => {
    const [email, setEmail] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const { toast } = useToast();
    const { language } = useTranslations();

    // Тексты для разных языков
    const translations = {
      en: {
        title: "Subscribe to Updates",
        subtitle: "Get fresh materials in your inbox",
        placeholder: "Your email",
        button: "Subscribe",
        disclaimer: "No spam, we send twice a month",
        successToast: "Successfully subscribed!",
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
        errorToast: "Жазылу қатесі. Қайталап көріңіз.",
        invalidEmail: "Жарамды email енгізіңіз"
      }
    };

    const t = translations[language as keyof typeof translations];

    const validateEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSubscribe = async () => {
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        toast({ 
          title: "Пожалуйста, введите корректный email",
          variant: "destructive"
        });
        return;
      }

      setIsSubmitting(true);
      try {
        console.log("Отправка запроса на подписку:", email);
        
        const response = await fetch("/api/newsletter-subscribe", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json" 
          },
          body: JSON.stringify({ email })
        });

        // Для отладки
        console.log("Статус ответа:", response.status);
        const responseData = await response.json();
        console.log("Ответ сервера:", responseData);

        if (!response.ok) {
          throw new Error(responseData.message || "Ошибка подписки");
        }

        setEmail("");
        toast({ 
          title: "Вы успешно подписались!",
          description: email 
        });
      } catch (error) {
        console.error("Ошибка при подписке:", error);
        toast({
          title: "Ошибка подписки",
          description: "Пожалуйста, попробуйте позже",
          variant: "destructive"
        });
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <div className="p-6">
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
            disabled={isSubmitting || isSuccess}
          />
          
          <Button 
            className="w-full"
            onClick={handleSubscribe}
            disabled={isSubmitting || isSuccess}
          >
            {isSuccess ? (
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4" />
                {t.button}
              </span>
            ) : isSubmitting ? (
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Main Featured Article - Smaller width */}
                      <div className="md:col-span-1">
                        <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group border border-border/10 h-full">
                          <div className="relative h-48 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                            <img 
                              src={featuredTips[0].imageUrl} 
                              alt={language === 'ru' && featuredTips[0].titleRu ? featuredTips[0].titleRu : 
                                   language === 'kz' && featuredTips[0].titleKz ? featuredTips[0].titleKz : 
                                   featuredTips[0].title} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                            
                            <div className="absolute top-3 left-3 z-20 flex gap-2">
                              <Badge className="bg-yellow-500 text-white border-none flex items-center gap-1">
                                <Star className="w-3 h-3" fill="white" />
                                {language === 'ru' ? 'Топ' : language === 'kz' ? 'Топ' : 'Top'}
                              </Badge>
                            </div>
                            
                            <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                              <h3 className="text-lg font-bold text-white group-hover:text-blue-100 transition-colors line-clamp-2">
                                {language === 'ru' && featuredTips[0].titleRu ? featuredTips[0].titleRu : 
                                 language === 'kz' && featuredTips[0].titleKz ? featuredTips[0].titleKz : 
                                 featuredTips[0].title}
                              </h3>
                            </div>
                          </div>
                          
                          <div className="p-4">
                            <div className="flex items-center gap-3 mb-3">
                              <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                                {featuredTips[0].category}
                              </Badge>
                              <div className="text-foreground/60 text-xs flex items-center">
                                <Clock className="w-3.5 h-3.5 mr-1.5" />
                                {featuredTips[0].readTime}
                              </div>
                            </div>
                            
                            <p className="text-sm text-foreground/70 line-clamp-2 mb-3">
                              {language === 'ru' && featuredTips[0].descriptionRu ? featuredTips[0].descriptionRu.substring(0, 100) + '...' : 
                               language === 'kz' && featuredTips[0].descriptionKz ? featuredTips[0].descriptionKz.substring(0, 100) + '...' : 
                               featuredTips[0].description.substring(0, 100) + '...'}
                            </p>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center text-xs text-foreground/60">
                                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                                {new Date(featuredTips[0].date).toLocaleDateString()}
                              </div>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-primary p-0 h-8"
                              >
                                {language === 'ru' ? 'Читать' : 
                                 language === 'kz' ? 'Оқу' : 
                                 'Read'} <ArrowRight className="ml-1 w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Secondary Trending Articles - Vertical Stack */}
                      <div className="md:col-span-1">
                        <div className="flex flex-col h-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md border border-border/10">
                          <div className="p-3 border-b border-border/10 bg-primary/5">
                            <h3 className="font-medium text-sm text-primary flex items-center">
                              <Star className="w-4 h-4 mr-1.5" fill="currentColor" />
                              {language === 'ru' ? 'Популярное сейчас' : 
                               language === 'kz' ? 'Қазір танымал' : 
                               'Popular Now'}
                            </h3>
                          </div>
                          
                          <div className="divide-y divide-border/10">
                            {featuredTips.slice(1, 4).map((tip, index) => (
                              <div 
                                key={tip.id}
                                className="p-3 hover:bg-muted/30 transition-colors cursor-pointer flex gap-3 items-center"
                                onClick={() => openTipModal(tip)}
                              >
                                <div className="font-bold text-xl text-primary/20 w-6 flex-shrink-0">
                                  {index + 1}
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
                    
                    {/* Trending Tags - Compact */}
                    <div className="mt-4 p-3 bg-muted/20 rounded-lg border border-border/10">
                      <div className="flex items-center gap-2 flex-wrap">
                        <div className="text-xs font-medium text-foreground/70">
                          {language === 'ru' ? 'Темы:' : 
                           language === 'kz' ? 'Тақырыптар:' : 
                           'Topics:'}
                        </div>
                        
                        {tags.slice(0, 5).map((tag) => (
                          <Badge 
                            key={tag}
                            variant="outline" 
                            className="bg-background hover:bg-primary/5 cursor-pointer transition-colors text-xs py-0 h-5"
                            onClick={() => handleTagClick(tag)}
                          >
                            {tag}
                          </Badge>
                        ))}
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
                    
                    <div className="space-y-2">
                      {recentTips.map(tip => (
                        <NewTipListItem key={tip.id} tip={tip} onClick={openTipModal} />
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
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-hidden p-0">
          {selectedTip && (
            <div className="flex flex-col h-full">
              {/* Hero Image with Gradient Overlay */}
              <div className="h-64 md:h-72 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                <img 
                  src={selectedTip.imageUrl} 
                  alt={language === 'ru' && selectedTip.titleRu ? selectedTip.titleRu : 
                       language === 'kz' && selectedTip.titleKz ? selectedTip.titleKz : 
                       selectedTip.title} 
                  className="w-full h-full object-cover" 
                />
                
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
              </div>
              
              <div className="flex flex-col md:flex-row">
                {/* Main Article Content */}
                <div className="p-6 md:p-8 flex-1">
                  <div className="flex items-center text-sm text-foreground/60 mb-6">
                    <Avatar className="w-8 h-8 mr-3 border border-border/20">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedTip.author}`} />
                      <AvatarFallback>{selectedTip.author.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">{selectedTip.author}</div>
                      <div className="text-xs flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 inline mr-1" />
                        {new Date(selectedTip.date).toLocaleDateString(
                          language === 'ru' ? 'ru-RU' : 
                          language === 'kz' ? 'kk-KZ' : 
                          'en-US',
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                        <span>•</span>
                        <Clock className="w-3.5 h-3.5 inline mr-1" />
                        {selectedTip.readTime}
                      </div>
                    </div>
                  </div>
                  
                  <ScrollArea className="pr-4 max-h-[400px]">
                    <p className="text-foreground/80 mb-6">
                      {language === 'ru' && selectedTip.descriptionRu ? selectedTip.descriptionRu : 
                       language === 'kz' && selectedTip.descriptionKz ? selectedTip.descriptionKz : 
                       selectedTip.description}
                    </p>
                    
                    {/* Article content based on tip ID */}
                    {selectedTip.id === 1 && (
                      <>
                        <h3 className="text-xl font-bold mt-8 mb-4">Understanding the IELTS Test</h3>
                        <p className="text-foreground/80 mb-6">
                          IELTS (International English Language Testing System) assesses your English language proficiency through four components: Listening, Reading, Writing, and Speaking. There are two formats: Paper-based IELTS and IELTS on Computer, with identical content but different delivery methods.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          The total test time is 2 hours and 45 minutes. The Listening, Reading, and Writing sections are completed on the same day, with no breaks between them. The Speaking section may be completed up to a week before or after the other tests.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          In Kazakhstan, IDP IELTS offers both Academic and General Training modules, with tests available in Almaty, Astana, Shymkent, and other major cities.
                        </p>
                      </>
                    )}
                    
                    {selectedTip.id === 2 && (
                      <>
                        <h3 className="text-xl font-bold mt-8 mb-4">ENT (ҰБТ) Preparation Approach</h3>
                        <p className="text-foreground/80 mb-6">
                          The Unified National Testing is a standardized test in Kazakhstan that serves as both a high school graduation assessment and a university entrance exam. TestCenter.kz provides comprehensive preparation resources that simulate the actual testing environment.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          Systematic preparation should include regular practice with diverse question formats across all subject areas. Focus on understanding the question patterns and developing efficient time management strategies during the test.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          Online practice tests can help you get familiar with the computer-based testing format and improve your speed and accuracy in answering questions.
                        </p>
                      </>
                    )}
                    
                    {selectedTip.id === 3 && (
                      <>
                        <h3 className="text-xl font-bold mt-8 mb-4">Benefits of IELTS on Computer</h3>
                        <p className="text-foreground/80 mb-6">
                          IELTS on Computer offers several advantages over the paper-based format. The most significant benefit is faster results – available online within 2-5 days compared to 13 days for the paper test. The test content, format, level of difficulty, and scoring are identical for both versions.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          The computer-delivered test gives you the ability to highlight text, make notes on screen, and adjust font size for greater readability. The speaking section is still face-to-face with an examiner, maintaining the interactive nature of the assessment.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          Before your exam, practice with IELTS simulation tools to get comfortable with the digital interface. IELTSTestSimulation.com offers free practice tests that mimic the computer-based format, helping you develop familiarity with the system.
                        </p>
                      </>
                    )}
                    
                    {selectedTip.id === 4 && (
                      <>
                        <h3 className="text-xl font-bold mt-8 mb-4">GMAT Time Management Techniques</h3>
                        <p className="text-foreground/80 mb-6">
                          The GMAT exam is 3 hours and 7 minutes long and consists of four sections: Analytical Writing Assessment, Integrated Reasoning, Quantitative, and Verbal. According to TestVerbal.ru, effective time management is critical for success in each section.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          For the Quantitative section, allocate approximately 2 minutes per problem-solving question and slightly less for data sufficiency. In the Verbal section, sentence correction questions should take about 1-1.5 minutes, while critical reasoning and reading comprehension require 2-3 minutes each.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          Practice with timed sections regularly to build the mental stamina needed for the lengthy test. Learn to recognize when to move on from difficult questions to maximize your overall score.
                        </p>
                      </>
                    )}
                    
                    {selectedTip.id === 5 && (
                      <>
                        <h3 className="text-xl font-bold mt-8 mb-4">Choosing Your University Path</h3>
                        <p className="text-foreground/80 mb-6">
                          According to Ucheba.ru, selecting the right university program involves researching both the content of the curriculum and the reputation of the institution. Consider program accreditation, faculty qualifications, and the experiences of current students and alumni.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          Employment statistics are crucial indicators of program quality. Research the employment rate of graduates, average starting salaries, and common career paths. Programs with strong industry connections and internship opportunities often provide better career prospects.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          Balance your personal interests with practical considerations such as program cost, location, and future job market demand. Visit university campuses if possible and speak with department representatives to get a feel for the program environment.
                        </p>
                      </>
                    )}
                    
                    {selectedTip.id === 6 && (
                      <>
                        <h3 className="text-xl font-bold mt-8 mb-4">IELTS Reading Techniques</h3>
                        <p className="text-foreground/80 mb-6">
                          The IELTS Reading section consists of three passages of increasing difficulty with 40 questions to complete in 60 minutes. IELTSTestSimulation recommends a three-step reading approach: skimming, scanning, and detailed reading.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          Start by skimming each passage for 2-3 minutes to grasp the main ideas. Look at headings, subheadings, first and last paragraphs, and any highlighted text. Then scan for specific information based on the questions, looking for keywords and relevant sections.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          For different question types, apply specific strategies. For multiple-choice questions, eliminate wrong answers rather than searching for the right one. For matching headings, focus on the main idea of each paragraph. For true/false/not given questions, remember that "not given" means the information is neither confirmed nor contradicted by the text.
                        </p>
                      </>
                    )}
                    
                    {selectedTip.id === 7 && (
                      <>
                        <h3 className="text-xl font-bold mt-8 mb-4">GMAT Critical Reasoning Approach</h3>
                        <p className="text-foreground/80 mb-6">
                          GMAT Critical Reasoning questions test your ability to analyze and evaluate arguments. TestVerbal.ru recommends first identifying the conclusion of the argument – the main point the author is trying to make. Then, locate the premises that support this conclusion, and identify any assumptions that bridge the gap between premise and conclusion.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          Common question types include strengthening or weakening arguments, identifying assumptions, finding flaws, and evaluating conclusions. For each type, develop specific approaches. For example, in weakening questions, look for information that introduces doubt about the connection between premise and conclusion.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          Logical fallacies frequently appear in GMAT arguments. Be on the lookout for common flaws like confusing correlation with causation, relying on inappropriate analogies, or using a small sample to make broad generalizations. Recognizing these patterns can significantly improve your performance.
                        </p>
                      </>
                    )}
                    
                    {selectedTip.id === 8 && (
                      <>
                        <h3 className="text-xl font-bold mt-8 mb-4">Effective Study Methodologies</h3>
                        <p className="text-foreground/80 mb-6">
                          Spaced repetition and active recall are among the most effective learning techniques according to cognitive science research. Spaced repetition involves reviewing material at gradually increasing intervals, while active recall means testing yourself rather than simply re-reading materials. Combined, these techniques significantly enhance long-term retention.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          The Pomodoro Technique – working in focused 25-minute blocks followed by 5-minute breaks – helps maintain concentration and prevents burnout. After completing four "pomodoros," take a longer break of 15-30 minutes. This structured approach keeps your mind fresh and improves productivity.
                        </p>
                        <p className="text-foreground/80 mb-6">
                          Create an optimal study environment by minimizing distractions. Turn off notifications on your devices, use website blockers if necessary, and communicate boundaries to friends and family during study sessions. Consider factors like lighting, noise level, and ergonomics to maximize comfort and focus during long study periods.
                        </p>
                      </>
                    )}
                    
                    {/* Key Takeaways Section */}
                    <h3 className="text-xl font-bold mt-8 mb-4">
                      {language === 'ru' ? 'Ключевые выводы' : 
                       language === 'kz' ? 'Негізгі тұжырымдар' : 
                       'Key Takeaways'}
                    </h3>
                    
                    <ul className="space-y-3 mb-6">
                      {selectedTip.id === 1 && (
                        <>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Practice all four IELTS components (Listening, Reading, Writing, Speaking) regularly with official materials.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Consider whether IELTS on Computer or Paper-based fits your preferences and strengths.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Familiarize yourself with test day procedures and attend free introductory sessions offered by IDP IELTS.
                            </div>
                          </li>
                        </>
                      )}
                      
                      {selectedTip.id === 2 && (
                        <>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Take regular practice tests that simulate the actual ENT environment to build test-taking stamina.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Create a systematic study schedule covering all subject areas with extra focus on your weaker subjects.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Learn to manage time effectively during the test by practicing with timed sections.
                            </div>
                          </li>
                        </>
                      )}
                      
                      {selectedTip.id === 3 && (
                        <>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Get results faster with IELTS on Computer – available in 2-5 days instead of 13 days for paper tests.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Use online practice tools to become familiar with the digital interface before your test day.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Take advantage of features like text highlighting, on-screen note-taking, and adjustable font size.
                            </div>
                          </li>
                        </>
                      )}
                      
                      {selectedTip.id === 4 && (
                        <>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Develop section-specific timing strategies – about 2 minutes for problem-solving and 1-1.5 minutes for sentence correction.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Practice identifying question difficulty early and knowing when to move on from challenging questions.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Build mental endurance through regular practice with full-length, timed mock exams.
                            </div>
                          </li>
                        </>
                      )}
                      
                      {selectedTip.id === 5 && (
                        <>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Research employment rates and career opportunities for graduates of your potential program.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Evaluate the program's curriculum for relevance to current industry standards and practices.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Consider both academic quality and practical factors like location, cost, and available scholarships.
                            </div>
                          </li>
                        </>
                      )}
                      
                      {selectedTip.id === 6 && (
                        <>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Use a three-step approach: skim for main ideas, scan for specific information, then read in detail.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Practice recognizing different question types and apply specific strategies for each type.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              For true/false/not given questions, remember that "not given" means the information is neither confirmed nor contradicted.
                            </div>
                          </li>
                        </>
                      )}
                      
                      {selectedTip.id === 7 && (
                        <>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Always identify the conclusion first, then locate the premises and assumptions in Critical Reasoning questions.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Develop specific approaches for each question type (strengthen, weaken, assumption, flaw, etc.).
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Learn to recognize common logical fallacies like correlation vs. causation and hasty generalizations.
                            </div>
                          </li>
                        </>
                      )}
                      
                      {selectedTip.id === 8 && (
                        <>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Use spaced repetition and active recall techniques instead of passive re-reading for better retention.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Apply the Pomodoro Technique: 25-minute focused work periods with 5-minute breaks between them.
                            </div>
                          </li>
                          <li className="flex gap-2 items-start">
                            <div className="bg-primary/10 rounded-full p-1 text-primary mt-1">
                              <CheckCircle2 className="w-4 h-4" />
                            </div>
                            <div>
                              Create an optimal study environment by minimizing distractions and optimizing comfort factors.
                            </div>
                          </li>
                        </>
                      )}
                    </ul>
                  </ScrollArea>
                  
                  <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t border-border/10">
                    {selectedTip.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="px-2 py-1">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Related Articles Sidebar */}
                {relatedArticles.length > 0 && (
                  <div className="w-full md:w-64 bg-muted/30 p-4 border-t md:border-t-0 md:border-l border-border/10">
                    <h3 className="font-semibold mb-4">
                      {language === 'ru' ? 'Похожие статьи' : 
                       language === 'kz' ? 'Ұқсас мақалалар' : 
                       'Related Articles'}
                    </h3>
                    
                    <div className="space-y-4">
                      {relatedArticles.map(article => (
                        <div 
                          key={article.id}
                          className="group cursor-pointer"
                          onClick={() => {
                            closeTipModal();
                            setTimeout(() => openTipModal(article), 300);
                          }}
                        >
                          <div className="h-24 rounded-md overflow-hidden mb-2">
                            <img 
                              src={article.imageUrl} 
                              alt={article.title} 
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                            />
                          </div>
                          <h4 className="text-sm font-medium group-hover:text-primary transition-colors line-clamp-2">
                            {language === 'ru' && article.titleRu ? article.titleRu : 
                             language === 'kz' && article.titleKz ? article.titleKz : 
                             article.title}
                          </h4>
                          <div className="text-xs text-foreground/60 mt-1 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {article.readTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </PublicPageLayout>
  );
}
