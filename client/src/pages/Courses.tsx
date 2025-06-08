import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import CourseCard from "@/components/dashboard/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuthContext } from "@/contexts/AuthContext";
import { useTranslations } from "@/hooks/use-translations";
import { Search, Filter, ArrowRight, Star, Clock, BookOpen, Layers, Users, CheckCircle2, GraduationCap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { api } from "@/lib/api";

// Define our own interface for courses with all the fields we need
interface ExtendedCourse {
  id: number;
  title: string;
  titleRu?: string;
  titleKz?: string;
  description: string;
  descriptionRu?: string;
  descriptionKz?: string;
  imageUrl?: string;
  category?: string;
  provider?: string;
  isPartnerCourse?: boolean;
  isPaid?: boolean; // Add new field for paid/free status
  progress?: number;
  level?: string;
  students?: number;
  rating?: number;
  lessons?: number;
  projects?: number;
  skills?: string[];
  duration?: string;
  contactInfo?: string;
}

// Mock course data to ensure courses are displayed
const mockCourses: ExtendedCourse[] = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    titleRu: "Основы веб-разработки",
    titleKz: "Веб-әзірлеу негіздері",
    description: "Learn the core concepts of HTML, CSS, and JavaScript to build modern web applications.",
    descriptionRu: "Изучите основные концепции HTML, CSS и JavaScript для создания современных веб-приложений.",
    descriptionKz: "Заманауи веб-қосымшаларды құру үшін HTML, CSS және JavaScript негізгі тұжырымдамаларын үйреніңіз.",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    category: "Programming",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    isPaid: true,
    progress: 0,
    level: "Beginner",
    students: 12548,
    rating: 4.7,
    duration: "8 weeks",
    lessons: 24,
    projects: 3,
    skills: ["HTML5", "CSS3", "JavaScript", "Responsive Design"],
    contactInfo: ""
  },
  {
    id: 2,
    title: "Data Science Essentials",
    titleRu: "Основы науки о данных",
    titleKz: "Деректер ғылымының негіздері",
    description: "Master the fundamentals of data analysis, machine learning, and data visualization with Python.",
    descriptionRu: "Освойте основы анализа данных, машинного обучения и визуализации данных с использованием Python.",
    descriptionKz: "Python арқылы деректерді талдау, машиналық оқыту және деректерді визуализациялау негіздерін игеріңіз.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Data Science",
    provider: "DataMasters",
    isPartnerCourse: true,
    isPaid: false,
    progress: 0,
    level: "Intermediate",
    students: 8934,
    rating: 4.9,
    duration: "12 weeks",
    lessons: 36,
    projects: 5,
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Machine Learning"],
    contactInfo: ""
  },
  {
    id: 3,
    title: "UI/UX Design Principles",
    titleRu: "Принципы UI/UX дизайна",
    titleKz: "UI/UX дизайн принциптері",
    description: "Learn how to create beautiful, intuitive user interfaces and enhance user experiences.",
    descriptionRu: "Научитесь создавать красивые, интуитивно понятные пользовательские интерфейсы и улучшать опыт взаимодействия.",
    descriptionKz: "Әдемі, интуитивті пайдаланушы интерфейстерін жасауды және пайдаланушы тәжірибесін жақсартуды үйреніңіз.",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2064&q=80",
    category: "Design",
    provider: "DesignAcademy",
    isPartnerCourse: true,
    progress: 0,
    level: "Beginner",
    students: 7245,
    rating: 4.6,
    duration: "6 weeks",
    lessons: 18,
    projects: 4,
    skills: ["Figma", "Adobe XD", "Wireframing", "Prototyping", "Color Theory"],
    contactInfo: ""
  },
  {
    id: 4,
    title: "React.js Advanced Patterns",
    titleRu: "Продвинутые паттерны React.js",
    titleKz: "React.js қосымша үлгілері",
    description: "Dive deep into React.js advanced concepts, hooks, state management, and performance optimization.",
    descriptionRu: "Погрузитесь в продвинутые концепции React.js, хуки, управление состоянием и оптимизацию производительности.",
    descriptionKz: "React.js-тің кеңейтілген тұжырымдамаларын, ілгектерін, күй басқаруын және өнімділікті оңтайландыруды үйреніңіз.",
    imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Programming",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    progress: 0,
    level: "Advanced",
    students: 5621,
    rating: 4.8,
    duration: "10 weeks",
    lessons: 28,
    projects: 4,
    skills: ["React.js", "Redux", "Context API", "Performance Optimization", "Testing"],
    contactInfo: ""
  },
  {
    id: 5,
    title: "Cloud Computing with AWS",
    titleRu: "Облачные вычисления с AWS",
    titleKz: "AWS арқылы бұлттық есептеу",
    description: "Learn to deploy, scale, and manage applications using Amazon Web Services.",
    descriptionRu: "Научитесь развертывать, масштабировать и управлять приложениями с использованием Amazon Web Services.",
    descriptionKz: "Amazon Web Services көмегімен қосымшаларды орналастыруды, масштабтауды және басқаруды үйреніңіз.",
    imageUrl: "https://images.unsplash.com/photo-1543966888-7c1dc482a810?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2068&q=80",
    category: "Cloud Computing",
    provider: "CloudMasters",
    isPartnerCourse: true,
    progress: 0,
    level: "Intermediate",
    students: 4587,
    rating: 4.5,
    duration: "14 weeks",
    lessons: 32,
    projects: 6,
    skills: ["AWS", "EC2", "S3", "Lambda", "CloudFormation", "Docker"],
    contactInfo: ""
  },
  {
    id: 6,
    title: "Cybersecurity Fundamentals",
    titleRu: "Основы кибербезопасности",
    titleKz: "Киберқауіпсіздік негіздері",
    description: "Learn the basics of cybersecurity, threat detection, and protection strategies.",
    descriptionRu: "Изучите основы кибербезопасности, обнаружения угроз и стратегий защиты.",
    descriptionKz: "Киберқауіпсіздік негіздерін, қауіптерді анықтау және қорғау стратегияларын үйреніңіз.",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Security",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    progress: 0,
    level: "Beginner",
    students: 6823,
    rating: 4.7,
    duration: "9 weeks",
    lessons: 26,
    projects: 3,
    skills: ["Network Security", "Encryption", "Authentication", "Vulnerability Assessment"],
    contactInfo: ""
  },
  {
    id: 7,
    title: "Mobile App Development with Flutter",
    titleRu: "Разработка мобильных приложений на Flutter",
    titleKz: "Flutter арқылы мобильді қосымшаларды әзірлеу",
    description: "Build cross-platform mobile applications with Google's Flutter framework and Dart language.",
    descriptionRu: "Создавайте кроссплатформенные мобильные приложения с помощью фреймворка Flutter от Google и языка Dart.",
    descriptionKz: "Google Flutter фреймворкі және Dart тілі арқылы кросс-платформалық мобильді қосымшалар жасаңыз.",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    category: "Mobile Development",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    progress: 0,
    level: "Intermediate",
    students: 7854,
    rating: 4.8,
    duration: "10 weeks",
    lessons: 28,
    projects: 4,
    skills: ["Flutter", "Dart", "Firebase", "State Management", "UI Design"],
    contactInfo: ""
  },
  {
    id: 8,
    title: "DevOps Engineering and CI/CD",
    titleRu: "DevOps инженерия и CI/CD",
    titleKz: "DevOps инженериясы және CI/CD",
    description: "Learn how to implement continuous integration, delivery, and deployment in modern software development.",
    descriptionRu: "Узнайте, как внедрить непрерывную интеграцию, доставку и развертывание в современной разработке программного обеспечения.",
    descriptionKz: "Заманауи бағдарламалық жасақтама әзірлеуде үздіксіз интеграциялауды, жеткізуді және орналастыруды қалай іске асыру керектігін үйреніңіз.",
    imageUrl: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "DevOps",
    provider: "DevOpsHub",
    isPartnerCourse: true,
    progress: 0,
    level: "Advanced",
    students: 4235,
    rating: 4.6,
    duration: "12 weeks",
    lessons: 30,
    projects: 6,
    skills: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "Terraform", "AWS"],
    contactInfo: ""
  },
  {
    id: 9,
    title: "AI and Deep Learning Fundamentals",
    titleRu: "Основы ИИ и глубокого обучения",
    titleKz: "Жасанды интеллект және терең оқыту негіздері",
    description: "Understand the concepts behind artificial intelligence and deep learning neural networks.",
    descriptionRu: "Поймите концепции, лежащие в основе искусственного интеллекта и нейронных сетей глубокого обучения.",
    descriptionKz: "Жасанды интеллект пен терең оқыту нейрондық желілерінің негізіндегі тұжырымдамаларды түсініңіз.",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Artificial Intelligence",
    provider: "AI Academy",
    isPartnerCourse: true,
    progress: 0,
    level: "Advanced",
    students: 6578,
    rating: 4.9,
    duration: "16 weeks",
    lessons: 42,
    projects: 8,
    skills: ["TensorFlow", "PyTorch", "Neural Networks", "Computer Vision", "NLP"],
    contactInfo: ""
  },
  {
    id: 10,
    title: "Digital Marketing Strategy",
    titleRu: "Стратегия цифрового маркетинга",
    titleKz: "Цифрлық маркетинг стратегиясы",
    description: "Learn to create and implement effective digital marketing strategies across multiple channels.",
    descriptionRu: "Научитесь создавать и внедрять эффективные стратегии цифрового маркетинга по нескольким каналам.",
    descriptionKz: "Бірнеше арналар бойынша тиімді цифрлық маркетинг стратегияларын жасауды және іске асыруды үйреніңіз.",
    imageUrl: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Marketing",
    provider: "MarketingPro",
    isPartnerCourse: true,
    progress: 0,
    level: "Beginner",
    students: 9823,
    rating: 4.5,
    duration: "6 weeks",
    lessons: 18,
    projects: 4,
    skills: ["SEO", "Social Media Marketing", "Content Strategy", "Email Marketing", "Analytics"],
    contactInfo: ""
  },
  {
    id: 11,
    title: "Game Development with Unity",
    titleRu: "Разработка игр на Unity",
    titleKz: "Unity арқылы ойын әзірлеу",
    description: "Build 2D and 3D games using the Unity engine and C# programming.",
    descriptionRu: "Создавайте 2D и 3D игры с использованием движка Unity и программирования на C#.",
    descriptionKz: "Unity қозғалтқышы және C# бағдарламалауын қолдана отырып, 2D және 3D ойындарын жасаңыз.",
    imageUrl: "https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Game Development",
    provider: "GameDevAcademy",
    isPartnerCourse: true,
    progress: 0,
    level: "Intermediate",
    students: 7245,
    rating: 4.7,
    duration: "14 weeks",
    lessons: 35,
    projects: 5,
    skills: ["Unity", "C#", "3D Modeling", "Game Design", "Animation"],
    contactInfo: ""
  },
  {
    id: 12,
    title: "Blockchain and Cryptocurrency",
    titleRu: "Блокчейн и криптовалюта",
    titleKz: "Блокчейн және криптовалюта",
    description: "Understand blockchain technology, smart contracts, and the cryptocurrency ecosystem.",
    descriptionRu: "Поймите технологию блокчейн, смарт-контракты и экосистему криптовалют.",
    descriptionKz: "Блокчейн технологиясын, смарт-келісімшарттарды және криптовалюта экожүйесін түсініңіз.",
    imageUrl: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Blockchain",
    provider: "BlockchainInstitute",
    isPartnerCourse: true,
    progress: 0,
    level: "Intermediate",
    students: 5134,
    rating: 4.6,
    duration: "10 weeks",
    lessons: 26,
    projects: 3,
    skills: ["Ethereum", "Smart Contracts", "Solidity", "Web3.js", "DApps"],
    contactInfo: ""
  },
  {
    id: 13,
    title: "Project Management Professional",
    titleRu: "Профессиональное управление проектами",
    titleKz: "Кәсіби жобаларды басқару",
    description: "Prepare for the PMP certification and learn modern project management methodologies.",
    descriptionRu: "Подготовьтесь к сертификации PMP и изучите современные методологии управления проектами.",
    descriptionKz: "PMP сертификатына дайындалыңыз және заманауи жобаларды басқару әдістемелерін үйреніңіз.",
    imageUrl: "https://images.unsplash.com/photo-1572177812156-58036aae439c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Business",
    provider: "PMInstitute",
    isPartnerCourse: true,
    progress: 0,
    level: "Intermediate",
    students: 8756,
    rating: 4.8,
    duration: "12 weeks",
    lessons: 30,
    projects: 5,
    skills: ["Agile", "Scrum", "Kanban", "Risk Management", "Stakeholder Management"],
    contactInfo: ""
  },
  {
    id: 14,
    title: "Python for Finance",
    titleRu: "Python для финансов",
    titleKz: "Қаржы үшін Python",
    description: "Apply Python programming to financial analysis, algorithmic trading, and risk management.",
    descriptionRu: "Применяйте программирование на Python для финансового анализа, алгоритмической торговли и управления рисками.",
    descriptionKz: "Қаржылық талдау, алгоритмдік сауда және тәуекелдерді басқару үшін Python бағдарламалауды қолданыңыз.",
    imageUrl: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Finance",
    provider: "FinanceTech",
    isPartnerCourse: true,
    progress: 0,
    level: "Advanced",
    students: 4325,
    rating: 4.7,
    duration: "10 weeks",
    lessons: 28,
    projects: 6,
    skills: ["Python", "Pandas", "NumPy", "Matplotlib", "Financial Analysis"],
    contactInfo: ""
  },
  {
    id: 15,
    title: "iOS App Development with Swift",
    titleRu: "Разработка iOS-приложений на Swift",
    titleKz: "Swift көмегімен iOS қосымшаларын әзірлеу",
    description: "Build native iOS applications using Swift and the latest Apple frameworks.",
    descriptionRu: "Создавайте нативные iOS-приложения с использованием Swift и новейших фреймворков Apple.",
    descriptionKz: "Swift және ең жаңа Apple фреймворктері арқылы нативті iOS қосымшаларын жасаңыз.",
    imageUrl: "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    category: "Mobile Development",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    progress: 0,
    level: "Intermediate",
    students: 6234,
    rating: 4.8,
    duration: "12 weeks",
    lessons: 32,
    projects: 5,
    skills: ["Swift", "UIKit", "SwiftUI", "Core Data", "XCode"],
    contactInfo: ""
  },
  {
    id: 16,
    title: "Node.js Backend Development",
    titleRu: "Разработка бэкенда на Node.js",
    titleKz: "Node.js арқылы бэкенд әзірлеу",
    description: "Build scalable and robust backend applications with Node.js and Express.",
    descriptionRu: "Создавайте масштабируемые и надежные бэкенд-приложения с использованием Node.js и Express.",
    descriptionKz: "Node.js және Express көмегімен масштабталатын және сенімді бэкенд қосымшаларын жасаңыз.",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    category: "Programming",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    progress: 0,
    level: "Intermediate",
    students: 7123,
    rating: 4.7,
    duration: "10 weeks",
    lessons: 26,
    projects: 4,
    skills: ["Node.js", "Express", "MongoDB", "REST API", "Authentication", "JWT"],
    contactInfo: ""
  },
  {
    id: 17,
    title: "Business Analytics",
    titleRu: "Бизнес-аналитика",
    titleKz: "Бизнес-аналитика",
    description: "Learn to analyze business data to drive decision-making and strategy development.",
    descriptionRu: "Научитесь анализировать бизнес-данные для принятия решений и разработки стратегии.",
    descriptionKz: "Шешім қабылдау және стратегия әзірлеу үшін бизнес деректерін талдауды үйреніңіз.",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Business",
    provider: "BusinessSchool",
    isPartnerCourse: true,
    progress: 0,
    level: "Beginner",
    students: 8234,
    rating: 4.5,
    duration: "8 weeks",
    lessons: 20,
    projects: 3,
    skills: ["Data Analysis", "Excel", "Power BI", "SQL", "Visualization"],
    contactInfo: ""
  },
  {
    id: 18,
    title: "Advanced JavaScript and TypeScript",
    titleRu: "Продвинутый JavaScript и TypeScript",
    titleKz: "Кеңейтілген JavaScript және TypeScript",
    description: "Master advanced JavaScript concepts and learn TypeScript for building robust applications.",
    descriptionRu: "Освойте продвинутые концепции JavaScript и изучите TypeScript для создания надежных приложений.",
    descriptionKz: "Сенімді қосымшаларды құру үшін кеңейтілген JavaScript тұжырымдамаларын игеріп, TypeScript-ті үйреніңіз.",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    category: "Programming",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    progress: 0,
    level: "Advanced",
    students: 5823,
    rating: 4.9,
    duration: "9 weeks",
    lessons: 27,
    projects: 5,
    skills: ["JavaScript", "TypeScript", "Design Patterns", "Functional Programming", "Async Programming"],
    contactInfo: ""
  },
  {
    id: 19,
    title: "Human-Computer Interaction",
    titleRu: "Взаимодействие человека с компьютером",
    titleKz: "Адам мен компьютердің өзара әрекеттесуі",
    description: "Learn the principles of designing effective user interfaces and improving user experiences.",
    descriptionRu: "Изучите принципы проектирования эффективных пользовательских интерфейсов и улучшения пользовательского опыта.",
    descriptionKz: "Тиімді пайдаланушы интерфейстерін жобалау және пайдаланушы тәжірибесін жақсарту принциптерін үйреніңіз.",
    imageUrl: "https://images.unsplash.com/photo-1559028012-481c04fa702d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
    category: "Design",
    provider: "UXInstitute",
    isPartnerCourse: true,
    progress: 0,
    level: "Intermediate",
    students: 4532,
    rating: 4.6,
    duration: "7 weeks",
    lessons: 21,
    projects: 4,
    skills: ["UX Research", "Usability Testing", "Information Architecture", "Interaction Design"],
    contactInfo: ""
  },
  {
    id: 20,
    title: "Big Data with Apache Spark",
    titleRu: "Большие данные с Apache Spark",
    titleKz: "Apache Spark арқылы үлкен деректер",
    description: "Process and analyze large datasets using Apache Spark and big data technologies.",
    descriptionRu: "Обрабатывайте и анализируйте большие наборы данных с помощью Apache Spark и технологий больших данных.",
    descriptionKz: "Apache Spark және үлкен деректер технологияларын қолдана отырып, үлкен деректер жиындарын өңдеңіз және талдаңыз.",
    imageUrl: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2021&q=80",
    category: "Data Science",
    provider: "DataTech",
    isPartnerCourse: true,
    progress: 0,
    level: "Advanced",
    students: 3985,
    rating: 4.7,
    duration: "12 weeks",
    lessons: 32,
    projects: 5,
    skills: ["Apache Spark", "Hadoop", "PySpark", "Scala", "Data Processing"],
    contactInfo: ""
  },
  {
    id: 21,
    title: "Full Stack Web Development",
    titleRu: "Полный стек веб-разработки",
    titleKz: "Толық стек веб-әзірлеу",
    description: "Build complete web applications from front-end to back-end using modern technologies.",
    descriptionRu: "Создавайте полноценные веб-приложения от фронтенда до бэкенда, используя современные технологии.",
    descriptionKz: "Заманауи технологияларды қолдана отырып, фронтэндтен бастап бэкэндке дейін толық веб-қосымшаларды құрыңыз.",
    imageUrl: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Programming",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    progress: 0,
    level: "Intermediate",
    students: 9235,
    rating: 4.8,
    duration: "16 weeks",
    lessons: 48,
    projects: 8,
    skills: ["JavaScript", "React", "Node.js", "MongoDB", "Express", "RESTful API"],
    contactInfo: ""
  },
  {
    id: 22,
    title: "Ethical Hacking",
    titleRu: "Этичный хакинг",
    titleKz: "Этикалық хакерлік",
    description: "Learn ethical hacking techniques to identify and fix security vulnerabilities.",
    descriptionRu: "Изучите методы этичного хакинга для выявления и устранения уязвимостей безопасности.",
    descriptionKz: "Қауіпсіздік осалдықтарын анықтау және жою үшін этикалық хакерлік техникаларын үйреніңіз.",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Security",
    provider: "CyberSecInstitute",
    isPartnerCourse: true,
    progress: 0,
    level: "Advanced",
    students: 6734,
    rating: 4.9,
    duration: "14 weeks",
    lessons: 35,
    projects: 6,
    skills: ["Penetration Testing", "Network Security", "Web Security", "Cryptography", "Social Engineering"],
    contactInfo: ""
  },
  {
    id: 23,
    title: "Docker and Kubernetes Mastery",
    titleRu: "Мастерство Docker и Kubernetes",
    titleKz: "Docker және Kubernetes шеберлігі",
    description: "Master containerization with Docker and orchestration with Kubernetes for modern applications.",
    descriptionRu: "Овладейте контейнеризацией с Docker и оркестрацией с Kubernetes для современных приложений.",
    descriptionKz: "Заманауи қосымшалар үшін Docker-мен контейнерлеуді және Kubernetes-пен оркестрлеуді меңгеріңіз.",
    imageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80",
    category: "DevOps",
    provider: "CloudMasters",
    isPartnerCourse: true,
    progress: 0,
    level: "Intermediate",
    students: 5243,
    rating: 4.7,
    duration: "10 weeks",
    lessons: 28,
    projects: 5,
    skills: ["Docker", "Kubernetes", "Microservices", "CI/CD", "Container Orchestration"],
    contactInfo: ""
  },
  {
    id: 24,
    title: "Vue.js Framework",
    titleRu: "Фреймворк Vue.js",
    titleKz: "Vue.js фреймворкі",
    description: "Learn to build dynamic web applications using the Vue.js framework and its ecosystem.",
    descriptionRu: "Научитесь создавать динамические веб-приложения с использованием фреймворка Vue.js и его экосистемы.",
    descriptionKz: "Vue.js фреймворкі мен оның экожүйесін қолдана отырып, динамикалық веб-қосымшаларды құруды үйреніңіз.",
    imageUrl: "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    category: "Programming",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    progress: 0,
    level: "Intermediate",
    students: 6243,
    rating: 4.6,
    duration: "8 weeks",
    lessons: 24,
    projects: 4,
    skills: ["Vue.js", "Vuex", "Vue Router", "Composition API", "Pinia"],
    contactInfo: ""
  }
];

// Enhanced course card component similar to the one in publiccourses.tsx
interface EnhancedCourseCardProps {
  course: ExtendedCourse;
  onEnroll?: () => void;
  showEnrollButton?: boolean;
  showProgress?: boolean;
  onClick?: () => void;
}

const EnhancedCourseCard = ({ course, onEnroll, showEnrollButton = false, showProgress = false, onClick }: EnhancedCourseCardProps) => {
  const { language } = useTranslations();
  const { 
    title, titleRu, titleKz,
    description, descriptionRu, descriptionKz, 
    imageUrl, progress, isPartnerCourse, category, level, provider,
    skills, duration, lessons, projects, students, rating
  } = course;
  
  // Get localized title
  const getLocalizedTitle = () => {
    if (language === 'ru' && titleRu) return titleRu;
    if (language === 'kz' && titleKz) return titleKz;
    return title;
  };
  
  // Get localized description
  const getLocalizedDescription = () => {
    if (language === 'ru' && descriptionRu) return descriptionRu;
    if (language === 'kz' && descriptionKz) return descriptionKz;
    return description;
  };
  
  // Helper function to get translated level
  const getLocalizedLevel = (level?: string) => {
    if (!level) return "";
    
    if (language === 'ru') {
      return level === 'Beginner' ? 'Начинающий' : 
             level === 'Intermediate' ? 'Средний' : 
             level === 'Advanced' ? 'Продвинутый' : level;
    } else if (language === 'kz') {
      return level === 'Beginner' ? 'Бастаушы' : 
             level === 'Intermediate' ? 'Орташа' : 
             level === 'Advanced' ? 'Жоғары' : level;
    }
    return level;
  };
  
  // Helper function for translated category
  const getLocalizedCategory = (category?: string) => {
    if (!category) return "";
    
    if (language === 'ru') {
      const categoryMap: Record<string, string> = {
        'Programming': 'Программирование',
        'Data Science': 'Наука о данных',
        'Design': 'Дизайн',
        'Marketing': 'Маркетинг',
        'Cloud Computing': 'Облачные вычисления',
        'Security': 'Безопасность',
        'DevOps': 'DevOps',
        'Business': 'Бизнес',
        'Mobile Development': 'Мобильная разработка',
        'Artificial Intelligence': 'Искусственный интеллект',
        'Blockchain': 'Блокчейн',
        'Game Development': 'Разработка игр',
        'Finance': 'Финансы'
      };
      return categoryMap[category] || category;
    } else if (language === 'kz') {
      const categoryMap: Record<string, string> = {
        'Programming': 'Бағдарламалау',
        'Data Science': 'Деректер ғылымы',
        'Design': 'Дизайн',
        'Marketing': 'Маркетинг',
        'Cloud Computing': 'Бұлтты есептеу',
        'Security': 'Қауіпсіздік',
        'DevOps': 'DevOps',
        'Business': 'Бизнес',
        'Mobile Development': 'Мобильді әзірлеу',
        'Artificial Intelligence': 'Жасанды интеллект',
        'Blockchain': 'Блокчейн',
        'Game Development': 'Ойын әзірлеу',
        'Finance': 'Қаржы'
      };
      return categoryMap[category] || category;
    }
    return category;
  };
  
  const courseProgress = progress || 0;
  const courseImage = imageUrl || '/assets/default-course.jpg';
  
  return (
    <div 
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md group transition-all duration-300 flex flex-col h-[550px] cursor-pointer hover:-translate-y-2 hover:shadow-xl"
      onClick={onClick}
    >
      {/* Image section */}
      <div className="h-64 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <img 
          src={courseImage} 
          alt={getLocalizedTitle()} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        
        {/* Category badge */}
        {category && (
          <Badge className="absolute top-4 left-4 z-20 bg-blue-600 text-white border-none">
            {getLocalizedCategory(category)}
          </Badge>
        )}
        
        {/* Level indicator */}
        {level && (
          <div className="absolute top-4 right-4 z-20 bg-black/70 text-xs text-white px-2 py-1 rounded-full flex items-center">
            <Star className="w-3 h-3 mr-1 text-yellow-400" />
            <span>{getLocalizedLevel(level)}</span>
          </div>
        )}
        
        {/* Provider badge */}
        <div className="absolute bottom-4 left-4 z-20 text-white text-sm font-medium">
          {isPartnerCourse ? (
            <Badge variant="outline" className="bg-black/70 text-white border-white/30">
              {provider}
            </Badge>
          ) : (
            <Badge className="bg-blue-600 text-white border-none">
              {provider}
            </Badge>
          )}
        </div>
        
        {/* Progress bar */}
        {showProgress && courseProgress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-800 z-20">
            <div 
              className="h-full bg-blue-600" 
              style={{ width: `${courseProgress}%` }}
            ></div>
          </div>
        )}
      </div>
      
      {/* Content area */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Title */}
        <div className="h-14 mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
            {getLocalizedTitle()}
          </h3>
        </div>
        
        {/* Description */}
        <div className="h-14 mb-3">
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {getLocalizedDescription()}
          </p>
        </div>
        
        {/* Skills */}
        {skills && skills.length > 0 && (
          <div className="h-8 mb-5 flex flex-wrap gap-2">
            {skills.slice(0, 3).map((skill: string, i: number) => (
              <Badge key={i} variant="secondary" className="text-xs font-normal bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-none">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="outline" className="text-xs border-blue-400 dark:border-blue-500 text-blue-600 dark:text-blue-400">
                +{skills.length - 3}
              </Badge>
            )}
          </div>
        )}
        
        {/* Course metrics */}
        <div className="grid grid-cols-3 gap-2 mb-6 text-center text-xs text-gray-600 dark:text-gray-400 h-16">
          <div className="flex flex-col items-center justify-center">
            <Clock className="w-4 h-4 mb-1 text-blue-600 dark:text-blue-400" />
            <span>
              {duration || 
                (language === 'ru' ? '8 недель' : 
                 language === 'kz' ? '8 апта' : 
                 '8 weeks')}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <BookOpen className="w-4 h-4 mb-1 text-blue-600 dark:text-blue-400" />
            <span>{lessons || 32} {language === 'ru' ? 'занятий' : language === 'kz' ? 'сабақтар' : 'lessons'}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Layers className="w-4 h-4 mb-1 text-blue-600 dark:text-blue-400" />
            <span>{course.projects || 4} {language === 'ru' ? 'проектов' : language === 'kz' ? 'жобалар' : 'projects'}</span>
          </div>
        </div>
        
        {/* Stats and actions */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4 h-6">
            <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {(course.students || 0).toLocaleString()} 
                {language === 'ru' ? ' студентов' : 
                 language === 'kz' ? ' студенттер' : 
                 ' students'}
              </span>
            </div>
            {course.rating && (
              <div className="flex items-center space-x-1">
                <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{course.rating}</span>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(course.rating || 0) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Buttons */}
          {showProgress && courseProgress > 0 ? (
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card's onClick
              }}
            >
              {language === 'ru' ? 'Продолжить обучение' : 
               language === 'kz' ? 'Оқуды жалғастыру' : 
               'Continue Learning'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : showEnrollButton ? (
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card's onClick
                onEnroll && onEnroll();
              }}
            >
              {language === 'ru' ? 'Записаться на курс' : 
               language === 'kz' ? 'Тіркелу' : 
               'Enroll Now'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300"
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering the card's onClick
              }}
            >
              {language === 'ru' ? 'Подробнее' : 
               language === 'kz' ? 'Толығырақ' : 
               'View Details'}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

// Создадим переиспользуемый компонент пагинации с переводами
const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  paginate,
  language
}: { 
  currentPage: number, 
  totalPages: number, 
  paginate: (page: number) => void,
  language: string
}) => {
  return (
    <div className="flex justify-center mt-10">
      <nav className="flex flex-col md:flex-row items-center gap-3">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 md:mb-0 md:mr-4">
          {language === 'ru' ? `Страница ${currentPage} из ${totalPages}` : 
            language === 'kz' ? `${currentPage} / ${totalPages} бет` : 
            `Page ${currentPage} of ${totalPages}`}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${
              currentPage === 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
            aria-label={
              language === 'ru' ? 'Предыдущая страница' : 
              language === 'kz' ? 'Алдыңғы бет' : 
              'Previous page'
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"></path>
            </svg>
          </button>
          
          {/* Page numbers */}
          {Array.from({ length: totalPages }).map((_, index) => {
            // Show current page, first page, last page, and one page before and after current page
            if (
              index + 1 === currentPage ||
              index + 1 === 1 || 
              index + 1 === totalPages ||
              index + 1 === currentPage - 1 ||
              index + 1 === currentPage + 1
            ) {
              return (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`w-9 h-9 flex items-center justify-center rounded-md ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                  }`}
                  aria-label={
                    language === 'ru' ? `Страница ${index + 1}` : 
                    language === 'kz' ? `${index + 1} бет` : 
                    `Page ${index + 1}`
                  }
                >
                  {index + 1}
                </button>
              );
            } else if (
              (index + 1 === currentPage - 2 && currentPage > 3) ||
              (index + 1 === currentPage + 2 && currentPage < totalPages - 2)
            ) {
              // Show ellipsis
              return (
                <span key={index} className="w-9 h-9 flex items-center justify-center text-gray-400">
                  ...
                </span>
              );
            }
            return null;
          })}
          
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-md ${
              currentPage === totalPages 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
            }`}
            aria-label={
              language === 'ru' ? 'Следующая страница' : 
              language === 'kz' ? 'Келесі бет' : 
              'Next page'
            }
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"></path>
            </svg>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default function Courses() {
  const { user } = useAuthContext();
  const { language } = useTranslations();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [sortBy, setSortBy] = useState("popularity");
  const [currentTab, setCurrentTab] = useState("all");
  
  // Advanced filter states
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [durationFilter, setDurationFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  // Categories with translations
  const categories = [
    { value: "all", label: { en: "All Categories", ru: "Все категории", kz: "Барлық санаттар" } },
    { value: "Programming", label: { en: "Programming", ru: "Программирование", kz: "Бағдарламалау" } },
    { value: "Data Science", label: { en: "Data Science", ru: "Наука о данных", kz: "Деректер ғылымы" } },
    { value: "Design", label: { en: "Design", ru: "Дизайн", kz: "Дизайн" } },
    { value: "Marketing", label: { en: "Marketing", ru: "Маркетинг", kz: "Маркетинг" } },
    { value: "Cloud Computing", label: { en: "Cloud Computing", ru: "Облачные вычисления", kz: "Бұлтты есептеу" } },
    { value: "Security", label: { en: "Security", ru: "Безопасность", kz: "Қауіпсіздік" } },
    { value: "DevOps", label: { en: "DevOps", ru: "DevOps", kz: "DevOps" } },
    { value: "Business", label: { en: "Business", ru: "Бизнес", kz: "Бизнес" } },
    { value: "Mobile Development", label: { en: "Mobile Development", ru: "Мобильная разработка", kz: "Мобильді әзірлеу" } },
    { value: "Artificial Intelligence", label: { en: "Artificial Intelligence", ru: "Искусственный интеллект", kz: "Жасанды интеллект" } },
    { value: "Blockchain", label: { en: "Blockchain", ru: "Блокчейн", kz: "Блокчейн" } },
    { value: "Game Development", label: { en: "Game Development", ru: "Разработка игр", kz: "Ойын әзірлеу" } },
    { value: "Finance", label: { en: "Finance", ru: "Финансы", kz: "Қаржы" } }
  ];

  // Levels with translations
  const levels = [
    { value: "all", label: { en: "All Levels", ru: "Все уровни", kz: "Барлық деңгейлер" } },
    { value: "Beginner", label: { en: "Beginner", ru: "Начинающий", kz: "Бастаушы" } },
    { value: "Intermediate", label: { en: "Intermediate", ru: "Средний", kz: "Орташа" } },
    { value: "Advanced", label: { en: "Advanced", ru: "Продвинутый", kz: "Жоғары" } }
  ];

  // Duration options with translations
  const durations = [
    { value: "all", label: { en: "Any Duration", ru: "Любая длительность", kz: "Кез келген ұзақтық" } },
    { value: "4 weeks", label: { en: "4 weeks", ru: "4 недели", kz: "4 апта" } },
    { value: "8 weeks", label: { en: "8 weeks", ru: "8 недель", kz: "8 апта" } },
    { value: "12 weeks", label: { en: "12 weeks", ru: "12 недель", kz: "12 апта" } }
  ];

  // Price options with translations
  const prices = [
    { value: "all", label: { en: "Any Price", ru: "Любая цена", kz: "Кез келген баға" } },
    { value: "free", label: { en: "Free", ru: "Бесплатные", kz: "Тегін" } },
    { value: "paid", label: { en: "Paid", ru: "Платные", kz: "Ақылы" } }
  ];

  // Sort options with translations
  const sortOptions = [
    { value: "popularity", label: { en: "Popularity", ru: "Популярности", kz: "Танымалдығы" } },
    { value: "rating", label: { en: "Rating", ru: "Рейтингу", kz: "Рейтингі" } },
    { value: "newest", label: { en: "Newest", ru: "Новизне", kz: "Жаңалығы" } }
  ];
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 9;
  
  // Course detail modal state
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<ExtendedCourse | null>(null);

  // Payment modal states
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCVC, setCardCVC] = useState("");
  const [cardName, setCardName] = useState("");
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Fetch all courses
  const { data: apiCourses = [], isLoading: isLoadingAllCourses } = useQuery<ExtendedCourse[]>({
    queryKey: ['/api/courses'],
    queryFn: async ({ queryKey }) => {
      try {
      const response = await fetch(queryKey[0] as string);
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      return response.json();
      } catch (error) {
        console.error("Error fetching courses:", error);
        return [];
      }
    },
  });
  
  // Use mock data if API returns empty array
  const allCourses = apiCourses.length > 0 ? apiCourses : mockCourses;

  // Handle course enrollment
  const handleEnroll = async (courseId: number) => {
    if (!user) {
      toast({
        title: language === 'ru' ? 'Требуется авторизация' : 'Authentication required',
        description: language === 'ru' ? 'Пожалуйста, войдите в систему для записи на курсы' : 'Please log in to enroll in courses',
        variant: "destructive",
      });
      return;
    }

    const course = allCourses.find(c => c.id === courseId);
    if (!course) return;

    // If course is paid, show payment modal
    if (course.isPaid) {
      setSelectedCourse(course);
      setShowPaymentModal(true);
      return;
    }

    // For free courses, proceed with enrollment
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await fetch(api.courses.enroll(), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ courseId }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to enroll in course');
      }
      
      toast({
        title: language === 'ru' ? 'Успешно' : 'Success',
        description: language === 'ru' ? 'Вы успешно записались на курс' : 'You have been enrolled in the course',
      });

      // Refresh the courses list
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      queryClient.invalidateQueries({ queryKey: ["enrollments"] });
    } catch (error) {
      console.error('Enrollment error:', error);
      toast({
        title: language === 'ru' ? 'Ошибка' : 'Error',
        description: error instanceof Error ? error.message : (language === 'ru' ? 'Не удалось записаться на курс' : 'Failed to enroll in course'),
        variant: "destructive",
      });
    }
  };

  // Filter and sort courses based on current filters
  const filteredCourses = allCourses.filter(course => {
    // Search in all fields including descriptions
    const searchLower = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === "" || 
      course.title.toLowerCase().includes(searchLower) ||
      course.description.toLowerCase().includes(searchLower) ||
      (course.titleRu && course.titleRu.toLowerCase().includes(searchLower)) ||
      (course.titleKz && course.titleKz.toLowerCase().includes(searchLower)) ||
      (course.descriptionRu && course.descriptionRu.toLowerCase().includes(searchLower)) ||
      (course.descriptionKz && course.descriptionKz.toLowerCase().includes(searchLower));

    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    
    const matchesDuration = durationFilter === "all" || 
      (course.duration && course.duration.includes(durationFilter));
    
    // Исправленная логика фильтрации платных/бесплатных курсов
    const matchesPrice = priceFilter === "all" || 
      (priceFilter === "free" && (course.isPaid === false || course.isPaid === undefined)) ||
      (priceFilter === "paid" && course.isPaid === true);

    // Filter by tab
    let matchesTab = true;
    if (currentTab === "enrolled" && user) {
      matchesTab = course.progress !== undefined && course.progress > 0;
    } else if (currentTab === "recommended") {
      matchesTab = (course.rating || 0) >= 4.5;
    }

    return matchesSearch && matchesCategory && matchesLevel && matchesDuration && matchesPrice && matchesTab;
  });

  // Sort courses
  const sortedCourses = [...filteredCourses].sort((a, b) => {
    switch (sortBy) {
      case "popularity":
        return (b.students || 0) - (a.students || 0);
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  // Reset filters when changing tabs
  useEffect(() => {
    setSearchQuery("");
    setCategoryFilter("all");
    setLevelFilter("all");
    setDurationFilter("all");
    setPriceFilter("all");
    setSortBy("popularity");
    setCurrentPage(1);
  }, [currentTab]);

  // Pagination
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);
  const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Handle payment submission
  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;

    setIsProcessingPayment(true);
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // After successful payment, enroll in course
      await handleEnroll(selectedCourse.id);
      setShowPaymentModal(false);
      setPaymentMethod("card");
      setCardNumber("");
      setCardExpiry("");
      setCardCVC("");
      setCardName("");
    } catch (error) {
      toast({
        title: "Payment Error",
        description: "Failed to process payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  // Add clear filters function
  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setLevelFilter("all");
    setDurationFilter("all");
    setPriceFilter("all");
    setSortBy("popularity");
    setShowAdvancedFilters(false);
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            {language === 'ru' ? 'Все курсы' : 
             language === 'kz' ? 'Барлық курстар' : 
             'All Courses'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {language === 'ru' ? 'Исследуйте нашу коллекцию курсов' : 
             language === 'kz' ? 'Біздің курс жинағымызды зерттеңіз' : 
             'Explore our collection of courses'}
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">
              {language === 'ru' ? 'Все курсы' : 
               language === 'kz' ? 'Барлық курстар' : 
               'All Courses'}
            </TabsTrigger>
            <TabsTrigger value="enrolled">
              {language === 'ru' ? 'Мои курсы' : 
               language === 'kz' ? 'Менің курстарым' : 
               'My Courses'}
            </TabsTrigger>
            <TabsTrigger value="recommended">
              {language === 'ru' ? 'Рекомендуемые' : 
               language === 'kz' ? 'Ұсынылған' : 
               'Recommended'}
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                  type="text"
                placeholder={
                    language === 'ru' ? 'Поиск по названию и описанию курсов...' : 
                    language === 'kz' ? 'Курстардың атауы мен сипаттамасы бойынша іздеу...' : 
                    'Search by course name and description...'
                  }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
              />
            </div>
          </div>
            <div className="flex gap-4">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={
                    language === 'ru' ? 'Категория' : 
                    language === 'kz' ? 'Санат' : 
                    'Category'
                        } />
                      </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label[language as keyof typeof category.label]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder={
                    language === 'ru' ? 'Уровень' : 
                    language === 'kz' ? 'Деңгей' : 
                    'Level'
                  } />
                </SelectTrigger>
                <SelectContent>
                  {levels.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label[language as keyof typeof level.label]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
            </div>
                  </div>
                  
          {/* Advanced Filters */}
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              {language === 'ru' ? 'Дополнительные фильтры' : 
               language === 'kz' ? 'Қосымша сүзгілер' : 
               'Advanced Filters'}
            </Button>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder={
                  language === 'ru' ? 'Сортировать по' : 
                  language === 'kz' ? 'Сұрыптау' : 
                  'Sort by'
                        } />
                      </SelectTrigger>
              <SelectContent>
                {sortOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label[language as keyof typeof option.label]}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
            {/* Add Clear Filters Button */}
            {(searchQuery || categoryFilter !== "all" || levelFilter !== "all" || 
              durationFilter !== "all" || priceFilter !== "all" || sortBy !== "popularity") && (
              <Button
                variant="ghost"
                onClick={clearFilters}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 6h18"></path>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                </svg>
                {language === 'ru' ? 'Очистить фильтры' : 
                 language === 'kz' ? 'Сүзгілерді тазалау' : 
                 'Clear Filters'}
              </Button>
            )}
                  </div>
                  
          {/* Advanced Filters Panel */}
          {showAdvancedFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg">
              <div>
                <Label>
                      {language === 'ru' ? 'Длительность' : 
                      language === 'kz' ? 'Ұзақтығы' : 
                      'Duration'}
                </Label>
                    <Select value={durationFilter} onValueChange={setDurationFilter}>
                  <SelectTrigger>
                        <SelectValue placeholder={
                          language === 'ru' ? 'Выберите длительность' : 
                          language === 'kz' ? 'Ұзақтықты таңдаңыз' : 
                          'Select duration'
                        } />
                      </SelectTrigger>
                  <SelectContent>
                    {durations.map((duration) => (
                      <SelectItem key={duration.value} value={duration.value}>
                        {duration.label[language as keyof typeof duration.label]}
                        </SelectItem>
                    ))}
                      </SelectContent>
                    </Select>
                  </div>
              <div>
                <Label>
                      {language === 'ru' ? 'Цена' : 
                   language === 'kz' ? 'Бағасы' : 
                      'Price'}
                </Label>
                    <Select value={priceFilter} onValueChange={setPriceFilter}>
                  <SelectTrigger>
                        <SelectValue placeholder={
                      language === 'ru' ? 'Выберите цену' : 
                      language === 'kz' ? 'Бағаны таңдаңыз' : 
                      'Select price'
                        } />
                      </SelectTrigger>
                  <SelectContent>
                    {prices.map((price) => (
                      <SelectItem key={price.value} value={price.value}>
                        {price.label[language as keyof typeof price.label]}
                        </SelectItem>
                    ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
          )}
        </div>

        {/* Course Grid */}
              {isLoadingAllCourses ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[550px] rounded-xl" />
            ))}
                    </div>
        ) : (
          <>
            {sortedCourses.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {currentTab === "enrolled" ? (
                    language === 'ru' ? 'У вас пока нет записанных курсов' : 
                    language === 'kz' ? 'Сізде әзірше тіркелген курс жоқ' : 
                    'You have no enrolled courses yet'
                  ) : currentTab === "recommended" ? (
                    language === 'ru' ? 'Нет рекомендуемых курсов' : 
                    language === 'kz' ? 'Ұсынылған курс жоқ' : 
                    'No recommended courses'
                  ) : (
                    language === 'ru' ? 'Курсы не найдены' : 
                     language === 'kz' ? 'Курстар табылмады' : 
                    'No courses found'
                  )}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {language === 'ru' ? 'Попробуйте изменить параметры поиска' : 
                   language === 'kz' ? 'Іздеу параметрлерін өзгертіп көріңіз' : 
                   'Try adjusting your search parameters'}
                  </p>
                </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentCourses.map((course) => (
                  <EnhancedCourseCard 
                    key={course.id} 
                    course={course} 
                    onEnroll={() => handleEnroll(course.id)}
                      showEnrollButton={currentTab === "all"}
                      showProgress={currentTab === "enrolled"}
                    onClick={() => {
                      setSelectedCourse(course);
                      setShowCourseModal(true);
                    }}
                  />
                  ))}
            </div>
            
                {/* Pagination */}
                {totalPages > 1 && (
              <PaginationControls 
                currentPage={currentPage}
                totalPages={totalPages}
                paginate={paginate}
                language={language}
              />
            )}
              </>
            )}
          </>
        )}
      
      {/* Course Detail Modal */}
        <Dialog open={showCourseModal} onOpenChange={setShowCourseModal}>
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {selectedCourse && (language === 'ru' && selectedCourse.titleRu ? selectedCourse.titleRu : 
                 language === 'kz' && selectedCourse.titleKz ? selectedCourse.titleKz : 
                 selectedCourse.title)}
              </DialogTitle>
              <DialogDescription>
                {selectedCourse && (language === 'ru' && selectedCourse.descriptionRu ? selectedCourse.descriptionRu : 
                 language === 'kz' && selectedCourse.descriptionKz ? selectedCourse.descriptionKz : 
                 selectedCourse.description)}
              </DialogDescription>
            </DialogHeader>
            {selectedCourse && (
              <div className="space-y-8">
                {/* Header Section */}
                <div className="relative h-64 rounded-lg overflow-hidden">
                <img 
                  src={selectedCourse.imageUrl || '/assets/default-course.jpg'} 
                    alt={selectedCourse.title}
                  className="w-full h-full object-cover" 
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-blue-600 text-white border-none">
                        {selectedCourse.category}
                      </Badge>
                      <Badge variant="outline" className="bg-black/70 text-white border-white/30">
                        {selectedCourse.level}
                    </Badge>
                  </div>
                    <h2 className="text-3xl font-bold mb-2">
                    {language === 'ru' && selectedCourse.titleRu ? selectedCourse.titleRu : 
                     language === 'kz' && selectedCourse.titleKz ? selectedCourse.titleKz : 
                     selectedCourse.title}
                  </h2>
                    <p className="text-gray-200">
                  {language === 'ru' && selectedCourse.descriptionRu ? selectedCourse.descriptionRu : 
                   language === 'kz' && selectedCourse.descriptionKz ? selectedCourse.descriptionKz : 
                   selectedCourse.description}
                </p>
                  </div>
              </div>
              
                {/* Course Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Clock className="w-5 h-5 text-blue-600" />
                      {language === 'ru' ? 'Длительность' : 
                     language === 'kz' ? 'Ұзақтығы' : 
                     'Duration'}
                    </h3>
                    <p className="text-2xl font-bold">{selectedCourse.duration}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {language === 'ru' ? 'Общее время обучения' : 
                       language === 'kz' ? 'Жалпы оқу уақыты' : 
                       'Total learning time'}
                  </p>
                </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-blue-600" />
                      {language === 'ru' ? 'Уроки' : 
                     language === 'kz' ? 'Сабақтар' : 
                     'Lessons'}
                    </h3>
                    <p className="text-2xl font-bold">{selectedCourse.lessons}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {language === 'ru' ? 'Интерактивных занятий' : 
                       language === 'kz' ? 'Интерактивті сабақтар' : 
                       'Interactive lessons'}
                  </p>
                </div>
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                    <h3 className="font-semibold mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      {language === 'ru' ? 'Студенты' : 
                       language === 'kz' ? 'Студенттер' : 
                       'Students'}
                    </h3>
                    <p className="text-2xl font-bold">{selectedCourse.students?.toLocaleString()}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {language === 'ru' ? 'Активных студентов' : 
                       language === 'kz' ? 'Белсенді студенттер' : 
                       'Active students'}
                  </p>
                </div>
              </div>
              
                {/* Course Structure */}
                <div className="space-y-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <Layers className="w-6 h-6 text-blue-600" />
                  {language === 'ru' ? 'Структура курса' : 
                   language === 'kz' ? 'Курс құрылымы' : 
                   'Course Structure'}
                </h3>
                
                  <div className="space-y-4">
                  {/* Module 1 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-between">
                        <h4 className="font-semibold">
                          {language === 'ru' ? 'Модуль 1: Введение' : 
                           language === 'kz' ? 'Модуль 1: Кіріспе' : 
                           'Module 1: Introduction'}
                        </h4>
                        <span className="text-sm text-gray-500">
                        {language === 'ru' ? '4 урока' : 
                         language === 'kz' ? '4 сабақ' : 
                         '4 lessons'}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>
                            {language === 'ru' ? 'Основы и концепции' : 
                             language === 'kz' ? 'Негіздер мен тұжырымдамалар' : 
                             'Basics and concepts'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>
                            {language === 'ru' ? 'Настройка окружения' : 
                             language === 'kz' ? 'Ортаны орнату' : 
                             'Environment setup'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>
                            {language === 'ru' ? 'Практические упражнения' : 
                             language === 'kz' ? 'Практикалық жаттығулар' : 
                             'Practical exercises'}
                          </span>
                        </div>
                    </div>
                  </div>
                  
                  {/* Module 2 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-between">
                        <h4 className="font-semibold">
                          {language === 'ru' ? 'Модуль 2: Основные концепции' : 
                           language === 'kz' ? 'Модуль 2: Негізгі тұжырымдамалар' : 
                           'Module 2: Core Concepts'}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {language === 'ru' ? '6 уроков' : 
                           language === 'kz' ? '6 сабақ' : 
                           '6 lessons'}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>
                            {language === 'ru' ? 'Углубленное изучение' : 
                             language === 'kz' ? 'Терең зерттеу' : 
                             'In-depth study'}
                          </span>
                    </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>
                            {language === 'ru' ? 'Практические примеры' : 
                             language === 'kz' ? 'Практикалық мысалдар' : 
                             'Practical examples'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>
                            {language === 'ru' ? 'Тесты и задания' : 
                             language === 'kz' ? 'Тесттер мен тапсырмалар' : 
                             'Tests and assignments'}
                          </span>
                  </div>
                </div>
              </div>
              
                    {/* Module 3 */}
                    <div className="border rounded-lg overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-800 p-4 flex items-center justify-between">
                        <h4 className="font-semibold">
                          {language === 'ru' ? 'Модуль 3: Продвинутые темы' : 
                           language === 'kz' ? 'Модуль 3: Кеңейтілген тақырыптар' : 
                           'Module 3: Advanced Topics'}
                        </h4>
                        <span className="text-sm text-gray-500">
                          {language === 'ru' ? '8 уроков' : 
                           language === 'kz' ? '8 сабақ' : 
                           '8 lessons'}
                        </span>
                      </div>
                      <div className="p-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>
                            {language === 'ru' ? 'Сложные концепции' : 
                             language === 'kz' ? 'Күрделі тұжырымдамалар' : 
                             'Complex concepts'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>
                            {language === 'ru' ? 'Реальные проекты' : 
                             language === 'kz' ? 'Нақты жобалар' : 
                             'Real projects'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                          <span>
                            {language === 'ru' ? 'Финальный проект' : 
                             language === 'kz' ? 'Қорытынды жоба' : 
                             'Final project'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Skills and Requirements */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <GraduationCap className="w-6 h-6 text-blue-600" />
                      {language === 'ru' ? 'Чему вы научитесь' : 
                       language === 'kz' ? 'Нені үйренесіз' : 
                       'What You\'ll Learn'}
                    </h3>
                    <div className="space-y-2">
                      {selectedCourse.skills?.map((skill, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <span>{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <Star className="w-6 h-6 text-blue-600" />
                      {language === 'ru' ? 'Требования' : 
                       language === 'kz' ? 'Талаптар' : 
                       'Requirements'}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span>
                          {language === 'ru' ? 'Базовые знания компьютера' : 
                           language === 'kz' ? 'Компьютердің негізгі білімі' : 
                           'Basic computer knowledge'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span>
                          {language === 'ru' ? 'Доступ к интернету' : 
                           language === 'kz' ? 'Интернетке қол жеткізу' : 
                           'Internet access'}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        <span>
                          {language === 'ru' ? 'Желание учиться' : 
                           language === 'kz' ? 'Оқуға деген құштарлық' : 
                           'Desire to learn'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                  <Button 
                    variant="outline"
                    onClick={() => setShowCourseModal(false)}
                  >
                    {language === 'ru' ? 'Закрыть' : 
                     language === 'kz' ? 'Жабу' : 
                     'Close'}
                  </Button>
                  <Button
                    onClick={() => {
                      setShowCourseModal(false);
                      handleEnroll(selectedCourse.id);
                    }}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {language === 'ru' ? 'Записаться на курс' : 
                     language === 'kz' ? 'Тіркелу' : 
                     'Enroll Now'}
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Payment Modal */}
        <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {language === 'ru' ? 'Оплата курса' : 
                 language === 'kz' ? 'Курс төлемі' : 
                 'Course Payment'}
              </DialogTitle>
              <DialogDescription>
                {language === 'ru' ? 'Введите данные для оплаты' : 
                 language === 'kz' ? 'Төлем деректерін енгізіңіз' : 
                 'Enter payment details'}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">
                    {language === 'ru' ? 'Кредитная карта' : 
                     language === 'kz' ? 'Несие картасы' : 
                     'Credit Card'}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="paypal" id="paypal" />
                  <Label htmlFor="paypal">PayPal</Label>
                </div>
              </RadioGroup>

              {paymentMethod === "card" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">
                      {language === 'ru' ? 'Номер карты' : 
                       language === 'kz' ? 'Карта нөірі' : 
                       'Card Number'}
                    </Label>
                    <Input
                      id="cardNumber"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">
                        {language === 'ru' ? 'Срок действия' : 
                         language === 'kz' ? 'Жарамдылық мерзімі' : 
                         'Expiry Date'}
                      </Label>
                      <Input
                        id="expiry"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input
                        id="cvc"
                        value={cardCVC}
                        onChange={(e) => setCardCVC(e.target.value)}
                        placeholder="123"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="cardName">
                      {language === 'ru' ? 'Имя на карте' : 
                       language === 'kz' ? 'Картадағы аты' : 
                       'Name on Card'}
                    </Label>
                    <Input
                      id="cardName"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4">
                  <Button 
                  type="button"
                  variant="outline"
                  onClick={() => setShowPaymentModal(false)}
                >
                  {language === 'ru' ? 'Отмена' : 
                   language === 'kz' ? 'Бас тарту' : 
                   'Cancel'}
                  </Button>
                <Button
                  type="submit"
                  disabled={isProcessingPayment}
                >
                  {isProcessingPayment ? (
                    language === 'ru' ? 'Обработка...' : 
                    language === 'kz' ? 'Өңделуде...' : 
                    'Processing...'
                  ) : (
                    language === 'ru' ? 'Оплатить' : 
                    language === 'kz' ? 'Төлеу' : 
                    'Pay Now'
                  )}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
            </div>
    </AppLayout>
  );
}