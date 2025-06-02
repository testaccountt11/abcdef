import { useState, useRef, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { useLocation } from "wouter";
import { 
  Search, Filter, Star, ArrowRight, MessageCircle, Calendar, Award, Globe, 
  BookOpen, Users, GraduationCap, CheckCircle2, Briefcase, UserPlus, Building2,
  MapPin, BadgeCheck, LucideIcon, X, Trophy, Code, Lightbulb, PenTool, CheckCircle,
  User, Send, MessageSquare, Mail
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
import { MentorResumeCard } from "@/components/MentorResumeCard";

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
  // Удаляем поле hhResumeId
  // hhResumeId?: string;
}

// Демо-данные менторов
const dummyMentors = [
  {
    id: 1,
    name: "Arman Bekov",
    title: "Senior Software Engineer",
    company: "TechCorp",
    location: "Almaty, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
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
    experience: "10+ years",
  },
  {
    id: 2,
    name: "Aizhan Nurmagambetova",
    title: "Data Scientist",
    company: "Analytics Co",
    location: "Nur-Sultan, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
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
    experience: "7 years",
  },
  {
    id: 3,
    name: "Daulet Kenesbek",
    title: "UX/UI Designer",
    company: "Design Studio",
    location: "Almaty, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
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
    experience: "5 years",
    hhResumeId: "13579"
  },
  {
    id: 4,
    name: "Nurlan Abdrakhmanov",
    title: "Marketing Manager",
    company: "Brand Solutions",
    location: "Nur-Sultan, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "Marketing professional focused on digital strategies, branding, and growth marketing. I help new businesses establish their presence and grow their audience.",
    bioRu: "Маркетолог, специализирующийся на цифровых стратегиях, брендинге и маркетинге роста. Я помогаю новым компаниям утвердить свое присутствие и увеличить свою аудиторию.",
    bioKz: "Сандық стратегияларға, брендингке және өсу маркетингіне бағытталған маркетинг маманы. Мен жаңа компанияларға өз қатысуын бекітуге және аудиториясын кеңейтуге көмектесемін.",
    category: "Marketing",
    categoryRu: "Маркетинг",
    categoryKz: "Маркетинг",
    skills: ["Digital Marketing", "SEO", "Content Strategy", "Social Media", "Analytics"],
    skillsRu: ["Цифровой маркетинг", "SEO", "Стратегия контента", "Соц. сети", "Аналитика"],
    skillsKz: ["Сандық маркетинг", "SEO", "Контент стратегиясы", "Әлеуметтік желілер", "Аналитика"],
    languages: ["English", "Russian"],
    rating: 4.6,
    reviewCount: 18,
    featured: false,
    available: false,
    experience: "8 years",
    hhResumeId: "24680"
  },
  {
    id: 5,
    name: "Kanat Zhumabekov",
    title: "Product Manager",
    company: "Product House",
    location: "Shymkent, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
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
    experience: "6 years",
    hhResumeId: "15975"
  },
  {
    id: 6,
    name: "Aliya Nurmukhambetova",
    title: "Financial Analyst",
    company: "Finance Group",
    location: "Almaty, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
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
    experience: "9 years",
    hhResumeId: "26753"
  }
];

// Дополнительные 15 менторов для пагинации
const additionalMentors = [
  {
    id: 7,
    name: "Maksat Ospanov",
    title: "DevOps Engineer",
    company: "CloudTech Solutions",
    location: "Nur-Sultan, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "DevOps engineer focused on automating infrastructure and optimizing deployment pipelines. I help teams implement CI/CD and cloud-native solutions.",
    bioRu: "DevOps-инженер, специализирующийся на автоматизации инфраструктуры и оптимизации процессов развертывания. Я помогаю командам внедрять CI/CD и облачные решения.",
    bioKz: "Инфрақұрылымды автоматтандыруға және орналастыру процестерін оңтайландыруға бағытталған DevOps инженері. Мен командаларға CI/CD және бұлтты шешімдерді енгізуге көмектесемін.",
    category: "DevOps",
    categoryRu: "DevOps",
    categoryKz: "DevOps",
    skills: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
    skillsRu: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
    skillsKz: ["Docker", "Kubernetes", "AWS", "Terraform", "CI/CD"],
    languages: ["English", "Russian"],
    rating: 4.7,
    reviewCount: 19,
    featured: false,
    available: true,
    experience: "6 years",
    hhResumeId: "14785"
  },
  {
    id: 8,
    name: "Saule Tulegenova",
    title: "Front-end Developer",
    company: "WebDev Agency",
    location: "Almaty, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "Front-end developer with expertise in modern JavaScript frameworks. I love creating beautiful, accessible, and performant user interfaces.",
    bioRu: "Front-end разработчик с опытом работы с современными JavaScript-фреймворками. Мне нравится создавать красивые, доступные и производительные пользовательские интерфейсы.",
    bioKz: "Заманауи JavaScript фреймворктерімен жұмыс тәжірибесі бар Front-end әзірлеуші. Маған әдемі, қолжетімді және өнімді пайдаланушы интерфейстерін жасау ұнайды.",
    category: "Software Development",
    categoryRu: "Разработка ПО",
    categoryKz: "БҚ әзірлеу",
    skills: ["React", "TypeScript", "CSS", "Responsive Design", "Web Performance"],
    skillsRu: ["React", "TypeScript", "CSS", "Адаптивный дизайн", "Производительность веб-сайтов"],
    skillsKz: ["React", "TypeScript", "CSS", "Бейімделгіш дизайн", "Веб-сайт өнімділігі"],
    languages: ["English", "Kazakh", "Russian"],
    rating: 4.9,
    reviewCount: 28,
    featured: true,
    available: true,
    experience: "4 years",
    hhResumeId: "25896"
  },
  {
    id: 9,
    name: "Rustem Bayzakov",
    title: "Cybersecurity Specialist",
    company: "SecureNet",
    location: "Karaganda, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "Cybersecurity expert with a focus on penetration testing and security assessments. I help companies strengthen their security posture and protect their assets.",
    bioRu: "Эксперт по кибербезопасности, специализирующийся на тестировании на проникновение и оценке безопасности. Я помогаю компаниям укрепить их безопасность и защитить их активы.",
    bioKz: "Енуді тестілеу және қауіпсіздікті бағалауға маманданған киберқауіпсіздік сарапшысы. Мен компанияларға олардың қауіпсіздігін нығайтуға және активтерін қорғауға көмектесемін.",
    category: "Security",
    categoryRu: "Безопасность",
    categoryKz: "Қауіпсіздік",
    skills: ["Penetration Testing", "Network Security", "Security Audits", "Security Tools", "OWASP"],
    skillsRu: ["Тестирование на проникновение", "Сетевая безопасность", "Аудит безопасности", "Инструменты безопасности", "OWASP"],
    skillsKz: ["Енуді тестілеу", "Желілік қауіпсіздік", "Қауіпсіздік аудиті", "Қауіпсіздік құралдары", "OWASP"],
    languages: ["English", "Russian"],
    rating: 4.8,
    reviewCount: 22,
    featured: false,
    available: false,
    experience: "7 years",
    hhResumeId: "16907"
  },
  {
    id: 10,
    name: "Aidana Iskakova",
    title: "Business Analyst",
    company: "Consulting Partners",
    location: "Nur-Sultan, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "Business analyst with expertise in requirements gathering, process modeling, and data analysis. I bridge the gap between business needs and technical solutions.",
    bioRu: "Бизнес-аналитик с опытом в сборе требований, моделировании процессов и анализе данных. Я связываю бизнес-потребности с техническими решениями.",
    bioKz: "Талаптарды жинау, процестерді модельдеу және деректерді талдау саласындағы тәжірибесі бар бизнес-аналитик. Мен бизнес қажеттіліктері мен техникалық шешімдер арасындағы алшақтықты жоямын.",
    category: "Business",
    categoryRu: "Бизнес",
    categoryKz: "Бизнес",
    skills: ["Requirements Analysis", "Business Process Modeling", "Data Analysis", "Stakeholder Management", "Agile"],
    skillsRu: ["Анализ требований", "Моделирование бизнес-процессов", "Анализ данных", "Управление стейкхолдерами", "Agile"],
    skillsKz: ["Талаптарды талдау", "Бизнес-процестерді модельдеу", "Деректерді талдау", "Стейкхолдерлерді басқару", "Agile"],
    languages: ["English", "Russian", "Kazakh"],
    rating: 4.7,
    reviewCount: 15,
    featured: false,
    available: true,
    experience: "5 years",
    hhResumeId: "27018"
  },
  {
    id: 11,
    name: "Bolat Nurpeisov",
    title: "Mobile Developer",
    company: "AppMaker",
    location: "Almaty, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "Mobile app developer with experience in native and cross-platform development. I create user-friendly and performant mobile applications for iOS and Android.",
    bioRu: "Разработчик мобильных приложений с опытом в нативной и кросс-платформенной разработке. Я создаю удобные и производительные мобильные приложения для iOS и Android.",
    bioKz: "Нативті және кросс-платформалық әзірлеу тәжірибесі бар мобильді қосымшалар әзірлеушісі. Мен iOS және Android үшін ыңғайлы және өнімді мобильді қосымшалар жасаймын.",
    category: "Mobile Development",
    categoryRu: "Мобильная разработка",
    categoryKz: "Мобильді әзірлеу",
    skills: ["iOS", "Android", "React Native", "Flutter", "Mobile UX"],
    skillsRu: ["iOS", "Android", "React Native", "Flutter", "Мобильный UX"],
    skillsKz: ["iOS", "Android", "React Native", "Flutter", "Мобильді UX"],
    languages: ["English", "Kazakh"],
    rating: 4.6,
    reviewCount: 17,
    featured: false,
    available: true,
    experience: "6 years",
    hhResumeId: "18129"
  },
  {
    id: 12,
    name: "Gulmira Satenova",
    title: "QA Engineer",
    company: "Quality Solutions",
    location: "Almaty, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "Quality assurance engineer with experience in manual and automated testing. I ensure software quality through comprehensive testing strategies and processes.",
    bioRu: "Инженер по обеспечению качества с опытом в ручном и автоматизированном тестировании. Я обеспечиваю качество программного обеспечения с помощью комплексных стратегий и процессов тестирования.",
    bioKz: "Қолмен және автоматтандырылған тестілеу тәжірибесі бар сапаны қамтамасыз ету инженері. Мен кешенді тестілеу стратегиялары мен процестері арқылы бағдарламалық жасақтама сапасын қамтамасыз етемін.",
    category: "Quality Assurance",
    categoryRu: "Обеспечение качества",
    categoryKz: "Сапаны қамтамасыз ету",
    skills: ["Manual Testing", "Automated Testing", "Selenium", "Test Planning", "QA Processes"],
    skillsRu: ["Ручное тестирование", "Автоматизированное тестирование", "Selenium", "Планирование тестирования", "QA-процессы"],
    skillsKz: ["Қолмен тестілеу", "Автоматтандырылған тестілеу", "Selenium", "Тестілеуді жоспарлау", "QA процестері"],
    languages: ["English", "Russian"],
    rating: 4.8,
    reviewCount: 24,
    featured: false,
    available: true,
    experience: "7 years",
    hhResumeId: "29230"
  },
  {
    id: 13,
    name: "Zhanat Musabekov",
    title: "Backend Developer",
    company: "ServerTech",
    location: "Shymkent, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "Backend developer with expertise in building scalable and secure APIs and services. I specialize in Python, Go, and microservices architecture.",
    bioRu: "Backend-разработчик с опытом создания масштабируемых и безопасных API и сервисов. Я специализируюсь на Python, Go и микросервисной архитектуре.",
    bioKz: "Масштабталатын және қауіпсіз API мен қызметтерді құру тәжірибесі бар Backend әзірлеуші. Мен Python, Go және микросервистік архитектурада маманданамын.",
    category: "Software Development",
    categoryRu: "Разработка ПО",
    categoryKz: "БҚ әзірлеу",
    skills: ["Python", "Go", "Microservices", "REST APIs", "Databases"],
    skillsRu: ["Python", "Go", "Микросервисы", "REST APIs", "Базы данных"],
    skillsKz: ["Python", "Go", "Микросервистер", "REST APIs", "Дерекқорлар"],
    languages: ["English", "Russian", "Kazakh"],
    rating: 4.9,
    reviewCount: 31,
    featured: true,
    available: true,
    experience: "8 years",
    hhResumeId: "10341"
  },
  {
    id: 14,
    name: "Dana Bekturova",
    title: "Project Manager",
    company: "Project Solutions",
    location: "Nur-Sultan, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "Experienced project manager with a track record of delivering complex technology projects on time and within budget. I mentor aspiring project managers.",
    bioRu: "Опытный проектный менеджер с опытом реализации сложных технологических проектов вовремя и в рамках бюджета. Я наставляю начинающих проектных менеджеров.",
    bioKz: "Күрделі технологиялық жобаларды уақытында және бюджет шеңберінде жүзеге асыру тәжірибесі бар тәжірибелі жоба менеджері. Мен жаңадан бастаған жоба менеджерлеріне тәлімгерлік етемін.",
    category: "Project Management",
    categoryRu: "Управление проектами",
    categoryKz: "Жобаларды басқару",
    skills: ["Agile", "Scrum", "Risk Management", "Stakeholder Management", "Project Planning"],
    skillsRu: ["Agile", "Scrum", "Управление рисками", "Управление стейкхолдерами", "Планирование проектов"],
    skillsKz: ["Agile", "Scrum", "Тәуекелдерді басқару", "Стейкхолдерлерді басқару", "Жобаларды жоспарлау"],
    languages: ["English", "Russian"],
    rating: 4.7,
    reviewCount: 19,
    featured: false,
    available: true,
    experience: "9 years",
    hhResumeId: "21452"
  },
  {
    id: 15,
    name: "Aslan Mukhamedov",
    title: "Machine Learning Engineer",
    company: "AI Solutions",
    location: "Almaty, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "Machine learning engineer with experience in building AI-powered products and solutions. I specialize in computer vision and natural language processing.",
    bioRu: "Инженер по машинному обучению с опытом создания продуктов и решений на базе ИИ. Я специализируюсь на компьютерном зрении и обработке естественного языка.",
    bioKz: "ЖИ негізіндегі өнімдер мен шешімдерді жасау тәжірибесі бар машиналық оқыту инженері. Мен компьютерлік көру және табиғи тілді өңдеуде маманданамын.",
    category: "Data Science",
    categoryRu: "Наука о данных",
    categoryKz: "Деректер ғылымы",
    skills: ["Machine Learning", "Computer Vision", "NLP", "Deep Learning", "TensorFlow"],
    skillsRu: ["Машинное обучение", "Компьютерное зрение", "NLP", "Глубокое обучение", "TensorFlow"],
    skillsKz: ["Машиналық оқыту", "Компьютерлік көру", "NLP", "Терең оқыту", "TensorFlow"],
    languages: ["English", "Russian"],
    rating: 4.9,
    reviewCount: 26,
    featured: true,
    available: false,
    experience: "5 years",
    hhResumeId: "12563"
  },
  {
    id: 16,
    name: "Erzhan Kasymov",
    title: "Game Developer",
    company: "GameStudio",
    location: "Almaty, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "Game developer with experience in Unity and Unreal Engine. I create engaging gaming experiences and mentor aspiring game developers.",
    bioRu: "Разработчик игр с опытом работы с Unity и Unreal Engine. Я создаю увлекательные игровые проекты и наставляю начинающих разработчиков игр.",
    bioKz: "Unity және Unreal Engine тәжірибесі бар ойын әзірлеуші. Мен қызықты ойын тәжірибелерін жасаймын және болашақ ойын әзірлеушілеріне тәлімгерлік етемін.",
    category: "Game Development",
    categoryRu: "Разработка игр",
    categoryKz: "Ойын әзірлеу",
    skills: ["Unity", "Unreal Engine", "C#", "Game Design", "3D Modeling"],
    skillsRu: ["Unity", "Unreal Engine", "C#", "Геймдизайн", "3D-моделирование"],
    skillsKz: ["Unity", "Unreal Engine", "C#", "Ойын дизайны", "3D модельдеу"],
    languages: ["English", "Russian"],
    rating: 4.8,
    reviewCount: 22,
    featured: false,
    available: true,
    experience: "7 years",
    hhResumeId: "23674"
  },
  {
    id: 17,
    name: "Aigul Amangeldieva",
    title: "Digital Marketer",
    company: "Digital Growth",
    location: "Nur-Sultan, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "Digital marketing specialist with a focus on growth marketing, SEO, and content strategy. I help businesses grow their online presence and reach their target audience.",
    bioRu: "Специалист по цифровому маркетингу с акцентом на маркетинг роста, SEO и стратегию контента. Я помогаю бизнесу расширить свое онлайн-присутствие и охватить целевую аудиторию.",
    bioKz: "Өсу маркетингіне, SEO және контент стратегиясына бағытталған сандық маркетинг маманы. Мен компанияларға онлайн-қатысуын кеңейтуге және мақсатты аудиторияға жетуге көмектесемін.",
    category: "Marketing",
    categoryRu: "Маркетинг",
    categoryKz: "Маркетинг",
    skills: ["Growth Marketing", "SEO", "Content Marketing", "Social Media", "PPC"],
    skillsRu: ["Маркетинг роста", "SEO", "Контент-маркетинг", "Социальные сети", "PPC"],
    skillsKz: ["Өсу маркетингі", "SEO", "Контент-маркетинг", "Әлеуметтік желілер", "PPC"],
    languages: ["English", "Russian", "Kazakh"],
    rating: 4.7,
    reviewCount: 18,
    featured: false,
    available: true,
    experience: "5 years",
    hhResumeId: "14785"
  },
  {
    id: 18,
    name: "Olzhas Mukanov",
    title: "Blockchain Developer",
    company: "BlockchainTech",
    location: "Almaty, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "Blockchain developer with experience in building decentralized applications and smart contracts. I help projects leverage blockchain technology.",
    bioRu: "Разработчик блокчейн с опытом создания децентрализованных приложений и смарт-контрактов. Я помогаю проектам использовать технологию блокчейн.",
    bioKz: "Орталықсыздандырылған қосымшалар мен смарт-келісімшарттарды құру тәжірибесі бар блокчейн әзірлеуші. Мен жобаларға блокчейн технологиясын пайдалануға көмектесемін.",
    category: "Blockchain",
    categoryRu: "Блокчейн",
    categoryKz: "Блокчейн",
    skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3", "DApps"],
    skillsRu: ["Solidity", "Ethereum", "Смарт-контракты", "Web3", "DApps"],
    skillsKz: ["Solidity", "Ethereum", "Смарт-келісімшарттар", "Web3", "DApps"],
    languages: ["English", "Russian"],
    rating: 4.8,
    reviewCount: 20,
    featured: false,
    available: true,
    experience: "4 years",
    hhResumeId: "25896"
  },
  {
    id: 19,
    name: "Zarina Tursynbekova",
    title: "UX Researcher",
    company: "User Insights",
    location: "Nur-Sultan, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "UX researcher with expertise in user research methodologies, user interviews, and usability testing. I help teams understand user needs and behaviors.",
    bioRu: "UX-исследователь с опытом в методологиях пользовательских исследований, интервью с пользователями и тестирования удобства использования. Я помогаю командам понять потребности и поведение пользователей.",
    bioKz: "Пайдаланушы зерттеу әдістері, пайдаланушылармен сұхбаттар және пайдалану ыңғайлылығын тестілеу саласындағы тәжірибесі бар UX зерттеуші. Мен командаларға пайдаланушылардың қажеттіліктері мен мінез-құлқын түсінуге көмектесемін.",
    category: "Design",
    categoryRu: "Дизайн",
    categoryKz: "Дизайн",
    skills: ["User Research", "Usability Testing", "User Interviews"],
    skillsRu: ["Пользовательские исследования", "Тестирование удобства", "Интервью"],
    skillsKz: ["Пайдаланушыларды зерттеу", "Пайдалануды тестілеу", "Cұхбаттар"],
    languages: ["English", "Kazakh", "Russian"],
    rating: 4.6,
    reviewCount: 16,
    featured: false,
    available: true,
    experience: "6 years",
    hhResumeId: "16907"
  },
  {
    id: 20,
    name: "Bakyt Kalibekov",
    title: "Cloud Architect",
    company: "Cloud Solutions",
    location: "Almaty, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "Cloud architect with expertise in designing scalable, secure, and cost-effective cloud solutions. I specialize in AWS, Azure, and GCP.",
    bioRu: "Облачный архитектор с опытом в разработке масштабируемых, безопасных и экономически эффективных облачных решений. Я специализируюсь на AWS, Azure и GCP.",
    bioKz: "Масштабталатын, қауіпсіз және үнемді бұлтты шешімдерді жобалау тәжірибесі бар бұлт архитекторы. Мен AWS, Azure және GCP мамандандырамын.",
    category: "Cloud Computing",
    categoryRu: "Облачные вычисления",
    categoryKz: "Бұлтты есептеу",
    skills: ["AWS", "Azure", "GCP", "Cloud Migration", "Infrastructure as Code"],
    skillsRu: ["AWS", "Azure", "GCP", "Миграция в облако", "Инфраструктура как код"],
    skillsKz: ["AWS", "Azure", "GCP", "Бұлтқа көшу", "Код ретінде инфрақұрылым"],
    languages: ["English", "Russian"],
    rating: 4.9,
    reviewCount: 29,
    featured: true,
    available: true,
    experience: "10 years",
    hhResumeId: "27018"
  },
  {
    id: 21,
    name: "Alikhan Tursunov",
    title: "AI Ethics Researcher",
    company: "Ethical AI",
    location: "Nur-Sultan, Kazakhstan",
    profileImage: "https://cdn-icons-png.flaticon.com/512/8650/8650189.png",
    bio: "Researcher focused on the ethical implications of artificial intelligence and machine learning. I help organizations develop responsible AI frameworks.",
    bioRu: "Исследователь, изучающий этические аспекты искусственного интеллекта и машинного обучения. Я помогаю организациям разрабатывать ответственные рамки для ИИ.",
    bioKz: "Жасанды интеллект пен машиналық оқытудың этикалық салдарын зерттеуге бағытталған зерттеуші. Мен ұйымдарға жауапты ЖИ шеңберлерін дамытуға көмектесемін.",
    category: "Ethics",
    categoryRu: "Этика",
    categoryKz: "Этика",
    skills: ["AI Ethics", "Ethical Frameworks", "Policy Development", "Fairness in ML", "Responsible AI"],
    skillsRu: ["Этика ИИ", "Этические рамки", "Разработка политик", "Справедливость в МО", "Ответственный ИИ"],
    skillsKz: ["ЖИ этикасы", "Этикалық шеңберлер", "Саясатты әзірлеу", "МО-дағы әділеттілік", "Жауапты ЖИ"],
    languages: ["English", "Kazakh", "Russian"],
    rating: 4.7,
    reviewCount: 14,
    featured: false,
    available: false,
    experience: "8 years",
    hhResumeId: "18129"
  }
];

// Merge the additional mentors with the existing ones
const allMentors = [...dummyMentors, ...additionalMentors];

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
  const [imageError, setImageError] = useState(false);
  
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
  
  const getInitials = () => {
    return mentor.name.split(' ').map(word => word[0]).join('');
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
          {!imageError ? (
            <div className="w-16 h-16 rounded-full overflow-hidden shadow-sm">
              <img 
                src={mentor.profileImage} 
                alt={mentor.name} 
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-500 to-primary text-white font-bold text-xl shadow-sm">
              {getInitials()}
            </div>
          )}
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
                  className={`w-3 h-3 ${star <= Math.floor(mentor.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="ml-1 text-xs text-foreground/70">
              {mentor.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>
      
      {/* Средняя часть - информация о категории, опыте и доступности */}
      <div className="h-[80px] px-5 py-3 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="flex flex-wrap gap-1 mb-2">
          <Badge className="bg-primary/90 text-white border-none text-xs">
            {getCategory()}
          </Badge>
          
          {mentor.available ? (
            <Badge variant="outline" className="text-xs py-0 h-5 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700">
              {language === 'ru' ? 'Принимает учеников' : language === 'kz' ? 'Оқушылар қабылдайды' : 'Available'}
            </Badge>
          ) : (
            <Badge variant="outline" className="text-xs py-0 h-5 bg-gray-50 text-gray-600 border-gray-200 dark:bg-gray-800/50 dark:text-gray-400 dark:border-gray-700">
              {language === 'ru' ? 'Группы укомплектованы' : language === 'kz' ? 'Топтар жасақталған' : 'Not accepting students'}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center gap-4 text-xs text-foreground/60">
          <div className="flex items-center">
            <MapPin className="w-3 h-3 mr-1" />
            <span className="truncate max-w-[100px]">{mentor.location}</span>
          </div>
          <div className="flex items-center">
            <Briefcase className="w-3 h-3 mr-1" />
            <span>{mentor.experience}</span>
          </div>
        </div>
      </div>
      
      {/* Навыки - фиксированная высота 100px */}
      <div className="h-[100px] px-5 py-3">
        <h4 className="text-xs font-medium text-foreground/70 mb-2">
          {language === 'ru' ? 'Навыки' : language === 'kz' ? 'Дағдылар' : 'Skills'}
        </h4>
        <div className="flex flex-wrap gap-1 overflow-hidden" style={{ maxHeight: '60px' }}>
          {getSkills().slice(0, 5).map((skill, index) => (
            <Badge key={index} variant="secondary" className="text-xs py-0.5 px-2 bg-primary/5 text-primary/80 border-primary/10">
              {skill}
            </Badge>
          ))}
          {getSkills().length > 5 && (
            <Badge variant="outline" className="text-xs py-0.5 px-2">
              +{getSkills().length - 5}
            </Badge>
          )}
        </div>
      </div>
      
      {/* Языки - фиксированная высота 50px */}
      <div className="h-[50px] px-5 py-3 bg-gray-50/50 dark:bg-gray-800/20">
        <div className="flex items-center gap-1.5 text-xs text-foreground/60">
          <Globe className="w-3 h-3" />
          <span className="truncate">{mentor.languages.join(', ')}</span>
        </div>
      </div>
      
      {/* Кнопка действия - всегда снизу, авто-высота */}
      <div className="px-5 py-4 mt-auto">
        <Button 
          variant="outline"
          size="sm"
          className="w-full bg-transparent hover:bg-primary hover:text-white border-primary/20 text-primary transition-all h-9"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(mentor);
          }}
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          {language === 'ru' ? 'Подробнее' : language === 'kz' ? 'Толығырақ' : 'Learn More'}
        </Button>
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
  
  // Добавляем состояние для пагинации
  const [currentPage, setCurrentPage] = useState(1);
  const mentorsPerPage = 6; // 6 менторов на страницу
  
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
  const categories = ["all", ...Array.from(new Set(allMentors.map(mentor => mentor.category)))];
  
  // Уникальные языки
  const languages = ["all", ...Array.from(new Set(allMentors.flatMap(mentor => mentor.languages)))];
  
  // Фильтрация менторов
  const filteredMentors = allMentors.filter(mentor => {
    const mentorText = `${mentor.name} ${mentor.title} ${mentor.company} ${mentor.bio} ${mentor.skills.join(' ')}`.toLowerCase();
    
    const matchesSearch = searchQuery === "" || mentorText.includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || mentor.category === categoryFilter;
    const matchesAvailability = availabilityFilter === "all" || 
                              (availabilityFilter === "available" && mentor.available) ||
                              (availabilityFilter === "unavailable" && !mentor.available);
    const matchesLanguage = languageFilter === "all" || mentor.languages.includes(languageFilter);
    
    return matchesSearch && matchesCategory && matchesAvailability && matchesLanguage;
  });
  
  // Расчеты для пагинации
  const indexOfLastMentor = currentPage * mentorsPerPage;
  const indexOfFirstMentor = indexOfLastMentor - mentorsPerPage;
  const currentMentors = filteredMentors.slice(indexOfFirstMentor, indexOfLastMentor);
  const totalPages = Math.ceil(filteredMentors.length / mentorsPerPage);
  
  // Обновленная функция очистки фильтров
  const clearFilters = () => {
    setSearchQuery("");
    setCategoryFilter("all");
    setAvailabilityFilter("all");
    setLanguageFilter("all");
    setCurrentPage(1);
    setShowAdvancedFilters(false);
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
  
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  
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
            <div className="mb-8 bg-card/40 backdrop-blur-sm border border-border/20 rounded-xl p-6 md:p-8 shadow-sm">
              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
                <Input
                    id="search"
                    type="text"
                    placeholder={t.searchPlaceholder}
                    className="pl-10 py-6 text-base"
                  value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
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
                      {/* Фильтр по категории */}
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                          <Filter size={14} />
                          {t.category}
                        </h4>
                  <select
                          className="w-full px-3 py-2 appearance-none bg-background border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                          <option value="all">{t.allCategories}</option>
                          {categories.filter(cat => cat !== "all").map(category => (
                            <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
          </div>
          
                      {/* Фильтр по доступности */}
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                          <Calendar size={14} />
                          {t.availability}
                        </h4>
                        <select
                          className="w-full px-3 py-2 appearance-none bg-background border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          value={availabilityFilter}
                          onChange={(e) => setAvailabilityFilter(e.target.value)}
                        >
                          <option value="all">{t.all}</option>
                          <option value="available">{t.available}</option>
                          <option value="unavailable">{t.unavailable}</option>
                        </select>
            </div>
            
                      {/* Фильтр по языку */}
                      <div>
                        <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                          <Globe size={14} />
                          {t.language}
                        </h4>
                        <select
                          className="w-full px-3 py-2 appearance-none bg-background border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                          value={languageFilter}
                          onChange={(e) => setLanguageFilter(e.target.value)}
                        >
                          <option value="all">{t.allLanguages}</option>
                          {languages.filter(lang => lang !== "all").map(lang => (
                            <option key={lang} value={lang}>{lang}</option>
                          ))}
                        </select>
                  </div>
              </div>
                    
                    <div className="mt-4 flex justify-end">
                      <Button 
                        variant="outline" 
                        className="gap-2"
                        onClick={clearFilters}
                      >
                        <X size={14} />
                        {t.clearFilters}
                      </Button>
                  </div>
                  </motion.div>
                )}
              </AnimatePresence>
              </div>
            
            {/* Results count */}
            <div className="mb-6 text-foreground/70">
              {t.found}: {filteredMentors.length} {filteredMentors.length === 1 ? t.mentor : t.mentors}
          </div>
          
            {/* Mentors Grid */}
            {filteredMentors.length > 0 ? (
                  <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {currentMentors.map((mentor, index) => (
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
            
                {/* Пагинация */}
                {filteredMentors.length > mentorsPerPage && (
                  <div className="flex justify-center mt-8 pt-6 border-t border-border/20">
                    <div className="flex flex-wrap gap-3 items-center justify-center">
                      {/* Кнопка "Предыдущая" */}
                      <Button
                        variant="outline"
                        className={`rounded-full px-5 py-2 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'border-primary/30 hover:bg-primary/10 hover:text-primary'}`}
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                      >
                        <ArrowRight className="w-4 h-4 mr-2 transform rotate-180" />
                        {language === 'ru' ? 'Предыдущая' : 
                         language === 'kz' ? 'Алдыңғы' : 
                         'Previous'}
                      </Button>
                      
                      {/* Номера страниц */}
                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }).map((_, i) => (
                          <Button
                            key={i}
                            variant={currentPage === i + 1 ? "default" : "outline"}
                            className={`rounded-full w-9 h-9 p-0 ${
                              currentPage === i + 1 
                                ? 'bg-primary text-white' 
                                : 'border-primary/30 hover:bg-primary/10'
                            }`}
                            onClick={() => setCurrentPage(i + 1)}
                          >
                            {i + 1}
                          </Button>
                        ))}
            </div>
            
                      {/* Кнопка "Следующая" */}
                      <Button
                        variant={currentPage === totalPages ? "outline" : "default"}
                        className={`rounded-full px-5 py-2 ${
                          currentPage === totalPages 
                            ? 'opacity-50 cursor-not-allowed' 
                            : 'bg-primary text-white'
                        }`}
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                      >
                        {language === 'ru' ? 'Следующая' : 
                         language === 'kz' ? 'Келесі' : 
                         'Next'}
                        <motion.div
                          animate={currentPage !== totalPages ? 
                            { x: [0, 3, 0] } : 
                            { x: 0 }
                          }
                          transition={{ 
                            duration: 1.2, 
                            repeat: currentPage !== totalPages ? Infinity : 0, 
                            repeatDelay: 1 
                          }}
                          className="ml-2"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </Button>
                  </div>
                  </div>
                )}
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
                      <BadgeCheck className="w-3 h-3 mr-1" /> {language === 'ru' ? 'Принимает учеников' : language === 'kz' ? 'Оқушыларды қабылдайды' : 'Open for mentoring'}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700">
                      {language === 'ru' ? 'Группы укомплектованы' : language === 'kz' ? 'Топтар жасақталған' : 'Not accepting students'}
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