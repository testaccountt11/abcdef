import { useState, useRef, useEffect } from "react";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslations } from "@/hooks/use-translations";
import { useLocation } from "wouter";
import { 
  Search, Filter, GraduationCap, Award, Clock, Users, 
  ArrowRight, CheckCircle2, BookOpen, Star, Layers, 
  Globe, BrainCircuit, LucideIcon, BarChart, Code, PenTool
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PublicPageLayout } from "@/components/layouts/PublicPageLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { useTheme } from "@/contexts/ThemeContext";
import { AnimatePresence } from "framer-motion";
import { Dialog } from "@/components/ui/dialog"; // Если доступен компонент диалога

// Сначала определим тип для курса в начале файла
type Course = {
  id: number;
  title: string;
  titleRu?: string;
  titleKz?: string;
  description: string;
  descriptionRu?: string;
  descriptionKz?: string;
  category: string;
  imageUrl: string;
  duration: string;
  level: string;
  provider: string;
  isPartnerCourse: boolean;
  students: number;
  rating: number;
  featured: boolean;
  skills: string[];
  lessons: number;
  projects: number;
};

// Улучшенные данные о курсах с дополнительными полями для красивого отображения
const dummyCourses = [
  {
    id: 1,
    title: "Web Development Fundamentals",
    description: "Learn the basics of HTML, CSS, and JavaScript to build responsive websites from scratch.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "8 weeks",
    level: "Beginner",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    students: 1245,
    rating: 4.8,
    featured: true,
    skills: ["HTML", "CSS", "JavaScript", "Responsive Design"],
    lessons: 32,
    projects: 5
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    description: "Master data analysis, visualization and machine learning algorithms for real-world applications.",
    category: "Data Science",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "12 weeks",
    level: "Intermediate",
    provider: "Tech Academy",
    isPartnerCourse: true,
    students: 890,
    rating: 4.9,
    featured: true,
    skills: ["Python", "Data Analysis", "Machine Learning", "Statistics"],
    lessons: 48,
    projects: 7
  },
  {
    id: 3,
    title: "UX/UI Design Essentials",
    description: "Learn user experience and interface design principles to create beautiful, user-friendly products.",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "10 weeks",
    level: "Beginner",
    provider: "Design School",
    isPartnerCourse: true,
    students: 1120,
    rating: 4.7,
    featured: false,
    skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
    lessons: 40,
    projects: 6
  },
  {
    id: 4,
    title: "Mobile App Development with React Native",
    description: "Build cross-platform mobile applications using React Native and JavaScript.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "10 weeks",
    level: "Intermediate",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    students: 756,
    rating: 4.6,
    featured: false,
    skills: ["React Native", "JavaScript", "Mobile Development", "API Integration"],
    lessons: 38,
    projects: 4
  },
  {
    id: 5,
    title: "Digital Marketing Fundamentals",
    description: "Learn SEO, social media marketing, email campaigns, and analytics to grow your online presence.",
    category: "Marketing",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "6 weeks",
    level: "Beginner",
    provider: "Marketing Masters",
    isPartnerCourse: true,
    students: 1340,
    rating: 4.5,
    featured: true,
    skills: ["SEO", "Social Media", "Email Marketing", "Analytics"],
    lessons: 28,
    projects: 3
  },
  {
    id: 6,
    title: "Cloud Computing with AWS",
    description: "Master Amazon Web Services and learn to deploy, scale, and maintain applications in the cloud.",
    category: "Cloud Computing",
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "9 weeks",
    level: "Advanced",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    students: 672,
    rating: 4.8,
    featured: false,
    skills: ["AWS", "Cloud Architecture", "DevOps", "Serverless"],
    lessons: 36,
    projects: 5
  },
  {
    id: 7,
    title: "Blockchain Development",
    description: "Learn to build secure and efficient blockchain applications with Ethereum and Solidity.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "11 weeks",
    level: "Advanced",
    provider: "Blockchain Institute",
    isPartnerCourse: true,
    students: 480,
    rating: 4.7,
    featured: true,
    skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js"],
    lessons: 44,
    projects: 6
  },
  {
    id: 8,
    title: "Artificial Intelligence Principles",
    description: "Explore the fundamentals of AI, neural networks and deep learning with practical applications.",
    category: "Data Science",
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "14 weeks",
    level: "Advanced",
    provider: "AI Academy",
    isPartnerCourse: true,
    students: 560,
    rating: 4.9,
    featured: true,
    skills: ["Python", "TensorFlow", "Neural Networks", "Computer Vision"],
    lessons: 56,
    projects: 8
  },
  {
    id: 9,
    title: "Cyber Security Fundamentals",
    description: "Learn to protect systems and networks from digital attacks with comprehensive cyber security training.",
    category: "Security",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "10 weeks",
    level: "Intermediate",
    provider: "Security Academy",
    isPartnerCourse: true,
    students: 720,
    rating: 4.5,
    featured: false,
    skills: ["Network Security", "Ethical Hacking", "Cryptography", "Threat Analysis"],
    lessons: 38,
    projects: 5
  },
  {
    id: 10,
    title: "3D Modeling & Animation",
    description: "Create stunning 3D models and animations for games, movies, and virtual environments.",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1615673947648-511d9d3cd8e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "14 weeks",
    level: "Intermediate",
    provider: "Creative Arts Institute",
    isPartnerCourse: true,
    students: 645,
    rating: 4.7,
    featured: false,
    skills: ["Blender", "Maya", "3D Modeling", "Animation"],
    lessons: 52,
    projects: 7
  },
  {
    id: 11,
    title: "DevOps & CI/CD Pipeline",
    description: "Master DevOps methodologies and build efficient CI/CD pipelines for modern software development.",
    category: "DevOps",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "11 weeks",
    level: "Advanced",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    students: 530,
    rating: 4.8,
    featured: true,
    skills: ["Docker", "Kubernetes", "Jenkins", "GitLab CI"],
    lessons: 42,
    projects: 6
  },
  {
    id: 12,
    title: "Product Management Essentials",
    description: "Learn the strategies and techniques for successful product development and management.",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "8 weeks",
    level: "Intermediate",
    provider: "Business School",
    isPartnerCourse: true,
    students: 890,
    rating: 4.6,
    featured: false,
    skills: ["Market Research", "Roadmapping", "Agile", "User Stories"],
    lessons: 32,
    projects: 4
  },
  {
    id: 13,
    title: "iOS App Development with Swift",
    description: "Build powerful and beautiful iOS applications using Swift and modern frameworks.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "12 weeks",
    level: "Intermediate",
    provider: "Apple Development Academy",
    isPartnerCourse: true,
    students: 760,
    rating: 4.7,
    featured: true,
    skills: ["Swift", "UIKit", "SwiftUI", "Core Data"],
    lessons: 45,
    projects: 5
  },
  {
    id: 14,
    title: "Data Visualization with D3.js",
    description: "Create interactive and dynamic data visualizations for the web with D3.js.",
    category: "Data Science",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "8 weeks",
    level: "Intermediate",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    students: 510,
    rating: 4.5,
    featured: false,
    skills: ["JavaScript", "D3.js", "SVG", "Web Development"],
    lessons: 30,
    projects: 4
  },
  {
    id: 15,
    title: "Agile Project Management",
    description: "Master Agile methodologies to deliver successful projects with higher efficiency and team collaboration.",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "6 weeks",
    level: "Beginner",
    provider: "Agile Institute",
    isPartnerCourse: true,
    students: 1150,
    rating: 4.6,
    featured: false,
    skills: ["Scrum", "Kanban", "Sprint Planning", "Team Leadership"],
    lessons: 24,
    projects: 3
  },
  {
    id: 16,
    title: "Flutter Cross-Platform Development",
    description: "Create beautiful native apps for iOS and Android from a single codebase with Flutter.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "10 weeks",
    level: "Intermediate",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    students: 680,
    rating: 4.8,
    featured: true,
    skills: ["Dart", "Flutter", "Firebase", "State Management"],
    lessons: 40,
    projects: 5
  },
  {
    id: 17,
    title: "Game Development with Unity",
    description: "Design and develop engaging games for multiple platforms using Unity engine.",
    category: "Game Development",
    imageUrl: "https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "14 weeks",
    level: "Intermediate",
    provider: "Game Dev Studio",
    isPartnerCourse: true,
    students: 790,
    rating: 4.7,
    featured: false,
    skills: ["C#", "Unity3D", "Game Design", "3D Graphics"],
    lessons: 56,
    projects: 7
  },
  {
    id: 18,
    title: "SEO & Content Marketing",
    description: "Learn proven strategies to increase website traffic and create engaging content that converts.",
    category: "Marketing",
    imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "7 weeks",
    level: "Beginner",
    provider: "Digital Marketing Institute",
    isPartnerCourse: true,
    students: 945,
    rating: 4.5,
    featured: false,
    skills: ["SEO", "Content Strategy", "Keywords Research", "Analytics"],
    lessons: 28,
    projects: 4
  },
  {
    id: 19,
    title: "Ethical Hacking & Penetration Testing",
    description: "Learn ethical hacking techniques to identify and fix security vulnerabilities in systems and networks.",
    category: "Security",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "12 weeks",
    level: "Advanced",
    provider: "Cyber Security Academy",
    isPartnerCourse: true,
    students: 520,
    rating: 4.9,
    featured: true,
    skills: ["Penetration Testing", "Vulnerability Assessment", "Exploitation", "Security Tools"],
    lessons: 48,
    projects: 6
  },
  {
    id: 20,
    title: "Augmented Reality Development",
    description: "Create immersive AR experiences for mobile devices and wearable technology.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "11 weeks",
    level: "Advanced",
    provider: "AR Institute",
    isPartnerCourse: true,
    students: 410,
    rating: 4.7,
    featured: false,
    skills: ["ARKit", "ARCore", "3D Modeling", "Unity"],
    lessons: 44,
    projects: 5
  }
];

// Добавляем больше курсов к существующему массиву dummyCourses
const additionalCourses = [
  {
    id: 9,
    title: "Cyber Security Fundamentals",
    description: "Learn to protect systems and networks from digital attacks with comprehensive cyber security training.",
    category: "Security",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "10 weeks",
    level: "Intermediate",
    provider: "Security Academy",
    isPartnerCourse: true,
    students: 720,
    rating: 4.5,
    featured: false,
    skills: ["Network Security", "Ethical Hacking", "Cryptography", "Threat Analysis"],
    lessons: 38,
    projects: 5
  },
  {
    id: 10,
    title: "3D Modeling & Animation",
    description: "Create stunning 3D models and animations for games, movies, and virtual environments.",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1615673947648-511d9d3cd8e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "14 weeks",
    level: "Intermediate",
    provider: "Creative Arts Institute",
    isPartnerCourse: true,
    students: 645,
    rating: 4.7,
    featured: false,
    skills: ["Blender", "Maya", "3D Modeling", "Animation"],
    lessons: 52,
    projects: 7
  },
  {
    id: 11,
    title: "DevOps & CI/CD Pipeline",
    description: "Master DevOps methodologies and build efficient CI/CD pipelines for modern software development.",
    category: "DevOps",
    imageUrl: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "11 weeks",
    level: "Advanced",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    students: 530,
    rating: 4.8,
    featured: true,
    skills: ["Docker", "Kubernetes", "Jenkins", "GitLab CI"],
    lessons: 42,
    projects: 6
  },
  {
    id: 12,
    title: "Product Management Essentials",
    description: "Learn the strategies and techniques for successful product development and management.",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "8 weeks",
    level: "Intermediate",
    provider: "Business School",
    isPartnerCourse: true,
    students: 890,
    rating: 4.6,
    featured: false,
    skills: ["Market Research", "Roadmapping", "Agile", "User Stories"],
    lessons: 32,
    projects: 4
  },
  {
    id: 13,
    title: "iOS App Development with Swift",
    description: "Build powerful and beautiful iOS applications using Swift and modern frameworks.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "12 weeks",
    level: "Intermediate",
    provider: "Apple Development Academy",
    isPartnerCourse: true,
    students: 760,
    rating: 4.7,
    featured: true,
    skills: ["Swift", "UIKit", "SwiftUI", "Core Data"],
    lessons: 45,
    projects: 5
  },
  {
    id: 14,
    title: "Data Visualization with D3.js",
    description: "Create interactive and dynamic data visualizations for the web with D3.js.",
    category: "Data Science",
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "8 weeks",
    level: "Intermediate",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    students: 510,
    rating: 4.5,
    featured: false,
    skills: ["JavaScript", "D3.js", "SVG", "Web Development"],
    lessons: 30,
    projects: 4
  },
  {
    id: 15,
    title: "Agile Project Management",
    description: "Master Agile methodologies to deliver successful projects with higher efficiency and team collaboration.",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "6 weeks",
    level: "Beginner",
    provider: "Agile Institute",
    isPartnerCourse: true,
    students: 1150,
    rating: 4.6,
    featured: false,
    skills: ["Scrum", "Kanban", "Sprint Planning", "Team Leadership"],
    lessons: 24,
    projects: 3
  },
  {
    id: 16,
    title: "Flutter Cross-Platform Development",
    description: "Create beautiful native apps for iOS and Android from a single codebase with Flutter.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "10 weeks",
    level: "Intermediate",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    students: 680,
    rating: 4.8,
    featured: true,
    skills: ["Dart", "Flutter", "Firebase", "State Management"],
    lessons: 40,
    projects: 5
  },
  {
    id: 17,
    title: "Game Development with Unity",
    description: "Design and develop engaging games for multiple platforms using Unity engine.",
    category: "Game Development",
    imageUrl: "https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "14 weeks",
    level: "Intermediate",
    provider: "Game Dev Studio",
    isPartnerCourse: true,
    students: 790,
    rating: 4.7,
    featured: false,
    skills: ["C#", "Unity3D", "Game Design", "3D Graphics"],
    lessons: 56,
    projects: 7
  },
  {
    id: 18,
    title: "SEO & Content Marketing",
    description: "Learn proven strategies to increase website traffic and create engaging content that converts.",
    category: "Marketing",
    imageUrl: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "7 weeks",
    level: "Beginner",
    provider: "Digital Marketing Institute",
    isPartnerCourse: true,
    students: 945,
    rating: 4.5,
    featured: false,
    skills: ["SEO", "Content Strategy", "Keywords Research", "Analytics"],
    lessons: 28,
    projects: 4
  },
  {
    id: 19,
    title: "Ethical Hacking & Penetration Testing",
    description: "Learn ethical hacking techniques to identify and fix security vulnerabilities in systems and networks.",
    category: "Security",
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "12 weeks",
    level: "Advanced",
    provider: "Cyber Security Academy",
    isPartnerCourse: true,
    students: 520,
    rating: 4.9,
    featured: true,
    skills: ["Penetration Testing", "Vulnerability Assessment", "Exploitation", "Security Tools"],
    lessons: 48,
    projects: 6
  },
  {
    id: 20,
    title: "Augmented Reality Development",
    description: "Create immersive AR experiences for mobile devices and wearable technology.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1626379953822-baec19c3accd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "11 weeks",
    level: "Advanced",
    provider: "AR Institute",
    isPartnerCourse: true,
    students: 410,
    rating: 4.7,
    featured: false,
    skills: ["ARKit", "ARCore", "3D Modeling", "Unity"],
    lessons: 44,
    projects: 5
  }
];

// Создаем дополнительные 10 курсов с новыми ID, чтобы у нас было ровно 30 уникальных курсов
const extraCourses = [
  {
    id: 21,
    title: "GraphQL Advanced Techniques",
    description: "Master advanced GraphQL techniques for efficient and flexible APIs in your applications.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "8 weeks",
    level: "Advanced",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    students: 580,
    rating: 4.7,
    featured: false,
    skills: ["GraphQL", "API Design", "Node.js", "Apollo"],
    lessons: 32,
    projects: 4
  },
  {
    id: 22,
    title: "Vue.js Application Development",
    description: "Build responsive and elegant web applications with Vue.js and its ecosystem.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1537884944318-390069bb8665?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "9 weeks",
    level: "Intermediate",
    provider: "Vue Masters",
    isPartnerCourse: true,
    students: 720,
    rating: 4.6,
    featured: false,
    skills: ["Vue.js", "Vuex", "JavaScript", "Single Page Applications"],
    lessons: 36,
    projects: 5
  },
  {
    id: 23,
    title: "Go Programming Language",
    description: "Learn Go (Golang) for building fast, efficient backend services and microservices.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1590856029826-c7a73142bbf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "10 weeks",
    level: "Intermediate",
    provider: "Golang Institute",
    isPartnerCourse: true,
    students: 650,
    rating: 4.8,
    featured: false,
    skills: ["Go", "Concurrency", "Microservices", "REST APIs"],
    lessons: 40,
    projects: 6
  },
  {
    id: 24,
    title: "Natural Language Processing",
    description: "Dive into NLP techniques to build applications that understand and generate human language.",
    category: "Data Science",
    imageUrl: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "12 weeks",
    level: "Advanced",
    provider: "AI Academy",
    isPartnerCourse: true,
    students: 480,
    rating: 4.9,
    featured: false,
    skills: ["Python", "NLTK", "SpaCy", "Transformers"],
    lessons: 48,
    projects: 7
  },
  {
    id: 25,
    title: "Responsive Web Design Masterclass",
    description: "Create modern responsive websites that work flawlessly across all devices and screen sizes.",
    category: "Design",
    imageUrl: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "7 weeks",
    level: "Beginner",
    provider: "Design School",
    isPartnerCourse: true,
    students: 850,
    rating: 4.7,
    featured: false,
    skills: ["HTML5", "CSS3", "Flexbox", "CSS Grid"],
    lessons: 28,
    projects: 5
  },
  {
    id: 26,
    title: "TypeScript Programming",
    description: "Master TypeScript to build scalable and maintainable JavaScript applications with static typing.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1599507593548-0187ac4043c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "8 weeks",
    level: "Intermediate",
    provider: "Portfol.IO Academy",
    isPartnerCourse: false,
    students: 730,
    rating: 4.8,
    featured: false,
    skills: ["TypeScript", "JavaScript", "OOP", "Static Typing"],
    lessons: 32,
    projects: 4
  },
  {
    id: 27,
    title: "Docker & Kubernetes",
    description: "Learn containerization with Docker and orchestration with Kubernetes for modern deployment.",
    category: "DevOps",
    imageUrl: "https://images.unsplash.com/photo-1605745341112-85968b19335b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "9 weeks",
    level: "Advanced",
    provider: "Cloud Academy",
    isPartnerCourse: true,
    students: 620,
    rating: 4.9,
    featured: false,
    skills: ["Docker", "Kubernetes", "Containerization", "Microservices"],
    lessons: 36,
    projects: 5
  },
  {
    id: 28,
    title: "Financial Literacy",
    description: "Build essential financial skills to manage personal finances, investments, and achieve financial goals.",
    category: "Business",
    imageUrl: "https://images.unsplash.com/photo-1567427018141-0584cfcbf1b8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "6 weeks",
    level: "Beginner",
    provider: "Finance Academy",
    isPartnerCourse: true,
    students: 920,
    rating: 4.6,
    featured: false,
    skills: ["Budgeting", "Investing", "Debt Management", "Retirement Planning"],
    lessons: 24,
    projects: 3
  },
  {
    id: 29,
    title: "Android Development with Kotlin",
    description: "Create native Android applications using Kotlin and modern Android development practices.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "11 weeks",
    level: "Intermediate",
    provider: "Android Academy",
    isPartnerCourse: true,
    students: 780,
    rating: 4.7,
    featured: false,
    skills: ["Kotlin", "Android SDK", "Jetpack", "Material Design"],
    lessons: 44,
    projects: 6
  },
  {
    id: 30,
    title: "MongoDB for Developers",
    description: "Master MongoDB for building scalable, high-performance applications with NoSQL database technology.",
    category: "Programming",
    imageUrl: "https://images.unsplash.com/photo-1603322327561-68afe6a2b908?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
    duration: "7 weeks",
    level: "Intermediate",
    provider: "Database Institute",
    isPartnerCourse: true,
    students: 590,
    rating: 4.8,
    featured: false,
    skills: ["MongoDB", "NoSQL", "Aggregation", "Data Modeling"],
    lessons: 28,
    projects: 4
  }
];

// Добавляем русский и казахский перевод для новых курсов
const extraCoursesTranslations = {
  21: {
    titleRu: "Продвинутые техники GraphQL",
    titleKz: "GraphQL күрделі әдістері",
    descriptionRu: "Освойте продвинутые техники GraphQL для эффективных и гибких API в ваших приложениях.",
    descriptionKz: "Сіздің қосымшаларыңызда тиімді және икемді API үшін GraphQL күрделі әдістерін игеріңіз."
  },
  22: {
    titleRu: "Разработка приложений на Vue.js",
    titleKz: "Vue.js көмегімен қосымшаларды әзірлеу",
    descriptionRu: "Создавайте отзывчивые и элегантные веб-приложения с помощью Vue.js и его экосистемы.",
    descriptionKz: "Vue.js және оның экожүйесінің көмегімен жауап беретін және элегантты веб-қосымшаларды құрыңыз."
  },
  23: {
    titleRu: "Язык программирования Go",
    titleKz: "Go бағдарламалау тілі",
    descriptionRu: "Изучите Go (Golang) для создания быстрых, эффективных бэкенд-сервисов и микросервисов.",
    descriptionKz: "Жылдам, тиімді бэкенд-қызметтер мен микросервистерді құру үшін Go (Golang) тілін үйреніңіз."
  },
  24: {
    titleRu: "Обработка естественного языка",
    titleKz: "Табиғи тілді өңдеу",
    descriptionRu: "Погрузитесь в техники NLP для создания приложений, понимающих и генерирующих человеческий язык.",
    descriptionKz: "Адам тілін түсінетін және генерациялайтын қосымшаларды құру үшін NLP әдістеріне бойлаңыз."
  },
  25: {
    titleRu: "Мастер-класс по адаптивному веб-дизайну",
    titleKz: "Икемді веб-дизайн бойынша шеберлік сабағы",
    descriptionRu: "Создавайте современные адаптивные веб-сайты, которые безупречно работают на всех устройствах и размерах экрана.",
    descriptionKz: "Барлық құрылғылар мен экран өлшемдерінде мінсіз жұмыс істейтін заманауи икемді веб-сайттарды жасаңыз."
  },
  26: {
    titleRu: "Программирование на TypeScript",
    titleKz: "TypeScript тіліндегі бағдарламалау",
    descriptionRu: "Осваивайте TypeScript для создания масштабируемых и поддерживаемых JavaScript-приложений со статической типизацией.",
    descriptionKz: "Статикалық типтеумен масштабталатын және қолдау көрсетілетін JavaScript қосымшаларын құру үшін TypeScript тілін игеріңіз."
  },
  27: {
    titleRu: "Docker и Kubernetes",
    titleKz: "Docker және Kubernetes",
    descriptionRu: "Изучите контейнеризацию с Docker и оркестрацию с Kubernetes для современного развертывания.",
    descriptionKz: "Заманауи орналастыру үшін Docker арқылы контейнерлеу және Kubernetes арқылы оркестрацияны үйреніңіз."
  },
  28: {
    titleRu: "Финансовая грамотность",
    titleKz: "Қаржылық сауаттылық",
    descriptionRu: "Развивайте основные финансовые навыки для управления личными финансами, инвестициями и достижения финансовых целей.",
    descriptionKz: "Жеке қаржыны, инвестицияларды басқару және қаржылық мақсаттарға жету үшін негізгі қаржылық дағдыларды дамытыңыз."
  },
  29: {
    titleRu: "Разработка Android на Kotlin",
    titleKz: "Kotlin көмегімен Android қосымшаларын әзірлеу",
    descriptionRu: "Создавайте нативные Android-приложения с использованием Kotlin и современных практик разработки Android.",
    descriptionKz: "Kotlin және Android әзірлеудің заманауи тәжірибелерін қолдана отырып, нативті Android қосымшаларын жасаңыз."
  },
  30: {
    titleRu: "MongoDB для разработчиков",
    titleKz: "Әзірлеушілерге арналған MongoDB",
    descriptionRu: "Освойте MongoDB для создания масштабируемых, высокопроизводительных приложений с технологией NoSQL баз данных.",
    descriptionKz: "NoSQL дерекқор технологиясымен масштабталатын, жоғары өнімді қосымшаларды құру үшін MongoDB-ді игеріңіз."
  }
};

// В начале компонента PublicCourses, добавьте код для объединения массивов:
const allCourses = [...dummyCourses, ...additionalCourses, ...extraCourses];

// Добавляем переводы для всех популярных курсов
// Перед вызовом .filter(course => course.featured) добавьте эти переводы:

const coursesWithTranslations = allCourses.map(course => {
  // Добавляем переводы на русский и казахский языки для всех курсов
  const translations: Record<number, {
    titleRu: string;
    titleKz: string;
    descriptionRu: string;
    descriptionKz: string;
  }> = {
    1: {
      titleRu: "Основы веб-разработки",
      titleKz: "Веб-әзірлеу негіздері",
      descriptionRu: "Изучите основы HTML, CSS и JavaScript для создания адаптивных веб-сайтов с нуля.",
      descriptionKz: "Икемді веб-сайттарды нөлден бастап құру үшін HTML, CSS және JavaScript негіздерін үйреніңіз."
    },
    2: {
      titleRu: "Наука о данных и машинное обучение",
      titleKz: "Деректер ғылымы және машиналық оқыту",
      descriptionRu: "Освойте анализ данных, визуализацию и алгоритмы машинного обучения для практических приложений.",
      descriptionKz: "Практикалық қолданбалар үшін деректерді талдауды, визуализацияны және машиналық оқыту алгоритмдерін меңгеріңіз."
    },
    3: {
      titleRu: "Основы UX/UI дизайна",
      titleKz: "UX/UI дизайн негіздері",
      descriptionRu: "Изучите принципы пользовательского опыта и интерфейса для создания красивых, удобных продуктов.",
      descriptionKz: "Әдемі, ыңғайлы өнімдерді жасау үшін пайдаланушы тәжірибесі мен интерфейс принциптерін үйреніңіз."
    },
    4: {
      titleRu: "Разработка мобильных приложений на React Native",
      titleKz: "React Native арқылы мобильді қосымшаларды әзірлеу",
      descriptionRu: "Создавайте кросс-платформенные мобильные приложения с использованием React Native и JavaScript.",
      descriptionKz: "React Native және JavaScript көмегімен кросс-платформалық мобильді қосымшаларды құрыңыз."
    },
    5: {
      titleRu: "Основы цифрового маркетинга",
      titleKz: "Цифрлық маркетинг негіздері",
      descriptionRu: "Изучите SEO, маркетинг в социальных сетях, email-кампании и аналитику для роста вашего онлайн-присутствия.",
      descriptionKz: "Онлайн қатысуыңызды арттыру үшін SEO, әлеуметтік желілердегі маркетинг, электрондық пошта науқандары мен аналитиканы үйреніңіз."
    },
    6: {
      titleRu: "Облачные вычисления с AWS",
      titleKz: "AWS арқылы бұлтты есептеу",
      descriptionRu: "Освойте Amazon Web Services и научитесь развертывать, масштабировать и поддерживать приложения в облаке.",
      descriptionKz: "Amazon Web Services-ті меңгеріп, бұлтта қосымшаларды орналастыруды, масштабтауды және қолдауды үйреніңіз."
    },
    7: {
      titleRu: "Разработка блокчейн-приложений",
      titleKz: "Блокчейн қосымшаларын әзірлеу",
      descriptionRu: "Научитесь создавать безопасные и эффективные блокчейн-приложения с использованием Ethereum и Solidity.",
      descriptionKz: "Ethereum және Solidity көмегімен қауіпсіз және тиімді блокчейн қосымшаларын құруды үйреніңіз."
    },
    8: {
      titleRu: "Принципы искусственного интеллекта",
      titleKz: "Жасанды интеллект принциптері",
      descriptionRu: "Изучите основы ИИ, нейронные сети и глубокое обучение с практическими примерами применения.",
      descriptionKz: "Практикалық қолдану мысалдарымен ЖИ негіздерін, нейрондық желілерді және терең оқытуды зерттеңіз."
    },
    9: {
      titleRu: "Основы кибербезопасности",
      titleKz: "Киберқауіпсіздік негіздері",
      descriptionRu: "Научитесь защищать системы и сети от цифровых атак с комплексным обучением кибербезопасности.",
      descriptionKz: "Жан-жақты киберқауіпсіздік оқытуымен жүйелер мен желілерді сандық шабуылдардан қорғауды үйреніңіз."
    },
    10: {
      titleRu: "3D-моделирование и анимация",
      titleKz: "3D-модельдеу және анимация",
      descriptionRu: "Создавайте потрясающие 3D-модели и анимации для игр, фильмов и виртуальных сред.",
      descriptionKz: "Ойындар, фильмдер және виртуалды орталар үшін керемет 3D-модельдер мен анимацияларды жасаңыз."
    },
    11: {
      titleRu: "DevOps и CI/CD конвейеры",
      titleKz: "DevOps және CI/CD конвейерлері",
      descriptionRu: "Освойте методологии DevOps и создавайте эффективные CI/CD конвейеры для современной разработки ПО.",
      descriptionKz: "DevOps әдістемелерін меңгеріп, заманауи бағдарламалық жасақтаманы әзірлеу үшін тиімді CI/CD конвейерлерін құрыңыз."
    },
    12: {
      titleRu: "Основы управления продуктом",
      titleKz: "Өнімді басқару негіздері",
      descriptionRu: "Изучите стратегии и методы успешной разработки и управления продуктами.",
      descriptionKz: "Өнімдерді табысты әзірлеу және басқару стратегиялары мен әдістерін үйреніңіз."
    },
    13: {
      titleRu: "Разработка iOS-приложений на Swift",
      titleKz: "Swift арқылы iOS қосымшаларын әзірлеу",
      descriptionRu: "Создавайте мощные и красивые iOS-приложения с использованием Swift и современных фреймворков.",
      descriptionKz: "Swift және заманауи фреймворктерді қолдана отырып, күшті және әдемі iOS қосымшаларын құрыңыз."
    },
    14: {
      titleRu: "Фронтенд-разработка на React",
      titleKz: "React негізіндегі фронтенд-әзірлеу",
      descriptionRu: "Создавайте современные, отзывчивые веб-приложения с помощью библиотеки React и экосистемы JavaScript.",
      descriptionKz: "React кітапханасы және JavaScript экожүйесін қолдана отырып, заманауи, интерактивті веб-қосымшаларды құрыңыз."
    },
    15: {
      titleRu: "Бэкенд-разработка на Node.js",
      titleKz: "Node.js негізіндегі бэкенд-әзірлеу",
      descriptionRu: "Изучите создание масштабируемых и производительных серверных приложений с помощью Node.js и Express.",
      descriptionKz: "Node.js және Express көмегімен масштабталатын және өнімді серверлік қосымшаларды құруды үйреніңіз."
    },
    16: {
      titleRu: "Python для инженерии данных",
      titleKz: "Деректер инженериясына арналған Python",
      descriptionRu: "Осваивайте управление данными, ETL-процессы и создание конвейеров данных с помощью Python.",
      descriptionKz: "Python көмегімен деректерді басқаруды, ETL процестерін және деректер конвейерлерін құруды меңгеріңіз."
    },
    17: {
      titleRu: "Разработка игр на Unity",
      titleKz: "Unity арқылы ойын әзірлеу",
      descriptionRu: "Научитесь создавать увлекательные 2D и 3D игры с использованием популярного движка Unity.",
      descriptionKz: "Танымал Unity қозғалтқышын қолдана отырып, қызықты 2D және 3D ойындарды жасауды үйреніңіз."
    },
    18: {
      titleRu: "Продвинутое программирование на JavaScript",
      titleKz: "JavaScript-те күрделі бағдарламалау",
      descriptionRu: "Углубите знания в JavaScript, изучая асинхронное программирование, паттерны и продвинутые концепции.",
      descriptionKz: "Асинхронды бағдарламалау, паттерндер және күрделі тұжырымдамаларды зерттеу арқылы JavaScript білімдеріңізді тереңдетіңіз."
    },
    19: {
      titleRu: "Проектирование баз данных и SQL",
      titleKz: "Деректер қорын жобалау және SQL",
      descriptionRu: "Изучите проектирование эффективных баз данных и освойте продвинутые SQL-запросы для работы с данными.",
      descriptionKz: "Тиімді деректер қорын жобалауды үйреніп, деректермен жұмыс істеу үшін күрделі SQL сұрауларын меңгеріңіз."
    },
    20: {
      titleRu: "Мастерство цифровой фотографии",
      titleKz: "Цифрлық фотография шеберлігі",
      descriptionRu: "От базовых до продвинутых техник фотографии: композиция, освещение, обработка и создание портфолио.",
      descriptionKz: "Фотографияның негізгі және күрделі техникалары: композиция, жарықтандыру, өңдеу және портфолио құру."
    },
    ...extraCoursesTranslations
  };

  // Добавляем переводы к текущему курсу, если они существуют
  if (translations[course.id]) {
    return { ...course, ...translations[course.id] };
  }
  
  return course;
});

// Карточки для преимуществ курсов
interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description, color }) => {
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
};

// Улучшенная карточка курса с анимацией
interface CourseCardProps {
  course: Course;
  onRegisterClick: (e: React.MouseEvent) => void;
  onClick?: () => void; // Убедитесь, что этот параметр есть
  index: number;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  onRegisterClick, 
  onClick,
  index 
}) => {
  const { language } = useTranslations();
  
  // Локализованные заголовки курсов
  const localizedTitle = () => {
    if (language === 'ru' && course.titleRu) {
      return course.titleRu;
    } else if (language === 'kz' && course.titleKz) {
      return course.titleKz;
    }
    return course.title;
  };
  
  // Локализованные описания курсов
  const localizedDescription = () => {
    if (language === 'ru' && course.descriptionRu) {
      return course.descriptionRu;
    } else if (language === 'kz' && course.descriptionKz) {
      return course.descriptionKz;
    }
    return course.description;
  };
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
      className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-md group transition-all duration-300 flex flex-col h-[550px] cursor-pointer"
      onClick={onClick}
    >
      {/* Изображение курса с оверлеем */}
      <div className="h-64 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
        <img 
          src={course.imageUrl} 
          alt={localizedTitle()} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        {/* Category badge */}
        <Badge className="absolute top-4 left-4 z-20 bg-blue-600 text-white border-none">
          {language === 'ru' ? getCategoryRu(course.category) :
           language === 'kz' ? getCategoryKz(course.category) :
           course.category}
        </Badge>
        {/* Level indicator */}
        <div className="absolute top-4 right-4 z-20 bg-black/70 text-xs text-white px-2 py-1 rounded-full flex items-center">
          <Star className="w-3 h-3 mr-1 text-yellow-400" />
          <span>
            {language === 'ru' ? 
              course.level === 'Beginner' ? 'Начинающий' : 
              course.level === 'Intermediate' ? 'Средний' : 
              course.level === 'Advanced' ? 'Продвинутый' : course.level 
              : 
            language === 'kz' ? 
              course.level === 'Beginner' ? 'Бастаушы' : 
              course.level === 'Intermediate' ? 'Орташа' : 
              course.level === 'Advanced' ? 'Жоғары' : course.level
              : 
            course.level}
          </span>
        </div>
        {/* Provider logo/name in bottom corner */}
        <div className="absolute bottom-4 left-4 z-20 text-white text-sm font-medium">
          {course.isPartnerCourse ? (
            <Badge variant="outline" className="bg-black/70 text-white border-white/30">
              {course.provider}
            </Badge>
          ) : (
            <Badge className="bg-blue-600 text-white border-none">
              {course.provider}
            </Badge>
          )}
        </div>
      </div>
      
      {/* Content area */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Заголовок */}
        <div className="h-14 mb-3">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-tight line-clamp-2">
            {localizedTitle()}
          </h3>
        </div>
        
        {/* Описание */}
        <div className="h-14 mb-3">
          <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
            {localizedDescription()}
          </p>
        </div>
        
        {/* Skills */}
        <div className="h-8 mb-5 flex flex-wrap gap-2">
          {course.skills.slice(0, 3).map((skill: string, i: number) => (
            <Badge key={i} variant="secondary" className="text-xs font-normal bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-none">
              {language === 'ru' ? getSkillRu(skill) :
               language === 'kz' ? getSkillKz(skill) :
               skill}
            </Badge>
          ))}
          {course.skills.length > 3 && (
            <Badge variant="outline" className="text-xs border-blue-400 dark:border-blue-500 text-blue-600 dark:text-blue-400">
              +{course.skills.length - 3}
            </Badge>
          )}
        </div>
        
        {/* Course details */}
        <div className="grid grid-cols-3 gap-2 mb-6 text-center text-xs text-gray-600 dark:text-gray-400 h-16">
          <div className="flex flex-col items-center justify-center">
            <Clock className="w-4 h-4 mb-1 text-blue-600 dark:text-blue-400" />
            <span>
              {course.duration.replace('weeks', 
                language === 'ru' ? 'недель' : 
                language === 'kz' ? 'апта' : 
                'weeks'
              )}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <BookOpen className="w-4 h-4 mb-1 text-blue-600 dark:text-blue-400" />
            <span>{course.lessons} {language === 'ru' ? 'занятий' : language === 'kz' ? 'сабақтар' : 'lessons'}</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Layers className="w-4 h-4 mb-1 text-blue-600 dark:text-blue-400" />
            <span>{course.projects} {language === 'ru' ? 'проектов' : language === 'kz' ? 'жобалар' : 'projects'}</span>
          </div>
        </div>
        
        {/* Action bar - всегда внизу */}
        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4 h-6">
          <div className="flex items-center space-x-1">
              <Users className="w-4 h-4 text-gray-500 dark:text-gray-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {course.students.toLocaleString()} 
                {language === 'ru' ? ' студентов' : 
                 language === 'kz' ? ' студенттер' : 
                 ' students'}
              </span>
          </div>
          <div className="flex items-center space-x-1">
              <span className="text-sm font-bold text-gray-800 dark:text-gray-200">{course.rating}</span>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                  key={i} 
                    className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Button */}
        <Button 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300"
            onClick={(e) => {
              e.stopPropagation();
              onRegisterClick(e);
            }}
        >
          {language === 'ru' ? 'Записаться' : 
           language === 'kz' ? 'Тіркелу' : 
           'Enroll Now'}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
        </div>
      </div>
    </motion.div>
  );
};

// Вспомогательные функции для переводов
// Перевод категорий
function getCategoryRu(category: string): string {
  const categoryMap: Record<string, string> = {
    'Programming': 'Программирование',
    'Data Science': 'Наука о данных',
    'Design': 'Дизайн',
    'Marketing': 'Маркетинг',
    'Cloud Computing': 'Облачные вычисления',
    'Security': 'Безопасность',
    'DevOps': 'DevOps',
    'Business': 'Бизнес'
  };
  return categoryMap[category] || category;
}

function getCategoryKz(category: string): string {
  const categoryMap: Record<string, string> = {
    'Programming': 'Бағдарламалау',
    'Data Science': 'Деректер ғылымы',
    'Design': 'Дизайн',
    'Marketing': 'Маркетинг',
    'Cloud Computing': 'Бұлтты есептеу',
    'Security': 'Қауіпсіздік',
    'DevOps': 'DevOps',
    'Business': 'Бизнес'
  };
  return categoryMap[category] || category;
}

// Перевод провайдеров
function getProviderRu(provider: string): string {
  const providerMap: Record<string, string> = {
    'Portfol.IO Academy': 'Академия Portfol.IO',
    'Tech Academy': 'Техническая Академия',
    'Design School': 'Школа Дизайна',
    'Marketing Masters': 'Мастера Маркетинга',
    'Business School': 'Школа Бизнеса',
    'AI Academy': 'Академия ИИ',
    'Blockchain Institute': 'Институт Блокчейна',
    'Security Academy': 'Академия Безопасности',
    'Creative Arts Institute': 'Институт Творческих Искусств'
  };
  return providerMap[provider] || provider;
}

function getProviderKz(provider: string): string {
  const providerMap: Record<string, string> = {
    'Portfol.IO Academy': 'Portfol.IO Академиясы',
    'Tech Academy': 'Техникалық Академия',
    'Design School': 'Дизайн Мектебі',
    'Marketing Masters': 'Маркетинг Шеберлері',
    'Business School': 'Бизнес Мектебі',
    'AI Academy': 'ЖИ Академиясы',
    'Blockchain Institute': 'Блокчейн Институты',
    'Security Academy': 'Қауіпсіздік Академиясы',
    'Creative Arts Institute': 'Шығармашылық Өнер Институты'
  };
  return providerMap[provider] || provider;
}

// Перевод навыков
function getSkillRu(skill: string): string {
  const skillMap: Record<string, string> = {
    'HTML': 'HTML',
    'CSS': 'CSS',
    'JavaScript': 'JavaScript',
    'Responsive Design': 'Адаптивный дизайн',
    'Python': 'Python',
    'Data Analysis': 'Анализ данных',
    'Machine Learning': 'Машинное обучение',
    'Statistics': 'Статистика',
    'Figma': 'Figma',
    'Adobe XD': 'Adobe XD',
    'Prototyping': 'Прототипирование',
    'User Research': 'Пользовательские исследования',
    'React Native': 'React Native',
    'Mobile Development': 'Мобильная разработка',
    'API Integration': 'Интеграция API',
    'SEO': 'SEO',
    'Social Media': 'Социальные сети',
    'Email Marketing': 'Email маркетинг',
    'Analytics': 'Аналитика'
  };
  return skillMap[skill] || skill;
}

function getSkillKz(skill: string): string {
  const skillMap: Record<string, string> = {
    'HTML': 'HTML',
    'CSS': 'CSS',
    'JavaScript': 'JavaScript',
    'Responsive Design': 'Бейімделгіш дизайн',
    'Python': 'Python',
    'Data Analysis': 'Деректерді талдау',
    'Machine Learning': 'Машиналық оқыту',
    'Statistics': 'Статистика',
    'Figma': 'Figma',
    'Adobe XD': 'Adobe XD',
    'Prototyping': 'Прототиптеу',
    'User Research': 'Пайдаланушы зерттеулері',
    'React Native': 'React Native',
    'Mobile Development': 'Мобильді әзірлеу',
    'API Integration': 'API интеграциясы',
    'SEO': 'SEO',
    'Social Media': 'Әлеуметтік желілер',
    'Email Marketing': 'Email маркетинг',
    'Analytics': 'Аналитика'
  };
  return skillMap[skill] || skill;
}

// Перевод продолжительности
function getDurationRu(duration: string): string {
  return duration
    .replace('weeks', 'недель')
    .replace('week', 'неделя');
}

function getDurationKz(duration: string): string {
  return duration
    .replace('weeks', 'апта')
    .replace('week', 'апта');
}

export default function PublicCourses() {
  const { t, language } = useTranslations();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [levelFilter, setLevelFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("all");
  
  // Добавляем состояние для сортировки
  const [sortBy, setSortBy] = useState("popularity");
  
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  // Refs
  const featuredCoursesRef = useRef<HTMLDivElement>(null);
  
  // Добавляем состояние для модального окна
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  
  // 1. Добавьте эти состояния в компонент PublicCourses
  const [debugMessage, setDebugMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);
  
  // 2. Функция для открытия модального окна с отладкой
  const handleCourseClick = (course: Course) => {
    setDebugMessage(`Clicked on course: ${course.id}`);
    setCurrentCourse(course);
    setShowModal(true);
    console.log("Opening modal for course:", course.id, course.title);
  };
  
  // Функция для закрытия модального окна
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
  };
  
  // Filter courses based on search query, category, and level
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = searchQuery === "" || 
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
    const matchesLevel = levelFilter === "all" || course.level === levelFilter;
    
    // Additional filtering based on the active tab
    const matchesTab = activeTab === "all" || 
      (activeTab === "featured" && course.featured) ||
      (activeTab === "partner" && course.isPartnerCourse);
    
    return matchesSearch && matchesCategory && matchesLevel && matchesTab;
  });

  // Extract unique categories and levels for the filters
  const categories = ["all", ...Array.from(new Set(allCourses.map(course => course.category)))];
  const levels = ["all", ...Array.from(new Set(allCourses.map(course => course.level)))];
  
  // Scroll-based animations
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, 50]);
  
  // Features
  const features = [
    {
      icon: GraduationCap,
      title: language === 'ru' ? 'Экспертный контент' : language === 'kz' ? 'Сарапшы мазмұны' : 'Expert Content',
      description: language === 'ru' ? 'Курсы от ведущих специалистов и преподавателей' : language === 'kz' ? 'Жетекші мамандар мен оқытушылардан курстар' : 'Courses from leading industry experts and educators',
      color: 'bg-gradient-to-r from-primary/90 to-blue-600/90'
    },
    {
      icon: Award,
      title: language === 'ru' ? 'Сертификаты' : language === 'kz' ? 'Сертификаттар' : 'Certificates',
      description: language === 'ru' ? 'Получите признанные индустрией сертификаты' : language === 'kz' ? 'Индустрия мойындаған сертификаттарға ие болыңыз' : 'Earn industry-recognized certificates',
      color: 'bg-gradient-to-r from-blue-500/90 to-blue-700/90'
    },
    {
      icon: Users,
      title: language === 'ru' ? 'Сообщество' : language === 'kz' ? 'Қауымдастық' : 'Community',
      description: language === 'ru' ? 'Учитесь вместе с единомышленниками' : language === 'kz' ? 'Пікірлестермен бірге оқыңыз' : 'Learn with like-minded peers',
      color: 'bg-gradient-to-r from-blue-400/90 to-blue-600/90'
    },
    {
      icon: BrainCircuit,
      title: language === 'ru' ? 'AI-рекомендации' : language === 'kz' ? 'AI-ұсыныстар' : 'AI Recommendations',
      description: language === 'ru' ? 'Персонализированные пути обучения' : language === 'kz' ? 'Жекеленген оқу жолдары' : 'Personalized learning paths',
      color: 'bg-gradient-to-r from-blue-600/90 to-primary/90'
    }
  ];
  
  // Переводы для первой страницы курсов
  const firstPageCoursesWithTranslations = 
    // Определяем набор курсов, которые показываются на первой странице
    (activeTab === "all" ? 
      allCourses :
      activeTab === "featured" ? 
        allCourses.filter(c => c.featured) :
        allCourses.filter(c => c.isPartnerCourse)
    ).slice(0, 12).map(course => {
      // Web Development Fundamentals (id: 1)
      if (course.id === 1) {
        return {
          ...course,
          titleRu: "Основы веб-разработки",
          titleKz: "Веб-әзірлеу негіздері",
          descriptionRu: "Изучите основы HTML, CSS и JavaScript для создания адаптивных веб-сайтов с нуля.",
          descriptionKz: "Икемді веб-сайттарды нөлден бастап құру үшін HTML, CSS және JavaScript негіздерін үйреніңіз."
        };
      }
      
      // Data Science & Machine Learning (id: 2)
      if (course.id === 2) {
        return {
          ...course,
          titleRu: "Наука о данных и машинное обучение",
          titleKz: "Деректер ғылымы және машиналық оқыту",
          descriptionRu: "Освойте анализ данных, визуализацию и алгоритмы машинного обучения для практических приложений.",
          descriptionKz: "Практикалық қолданбалар үшін деректерді талдауды, визуализацияны және машиналық оқыту алгоритмдерін меңгеріңіз."
        };
      }
      
      // UX/UI Design Essentials (id: 3)
      if (course.id === 3) {
        return {
          ...course,
          titleRu: "Основы UX/UI дизайна",
          titleKz: "UX/UI дизайн негіздері",
          descriptionRu: "Изучите принципы пользовательского опыта и интерфейса для создания красивых, удобных продуктов.",
          descriptionKz: "Әдемі, ыңғайлы өнімдерді жасау үшін пайдаланушы тәжірибесі мен интерфейс принциптерін үйреніңіз."
        };
      }
      
      // Mobile App Development with React Native (id: 4)
      if (course.id === 4) {
        return {
          ...course,
          titleRu: "Разработка мобильных приложений на React Native",
          titleKz: "React Native арқылы мобильді қосымшаларды әзірлеу",
          descriptionRu: "Создавайте кросс-платформенные мобильные приложения с использованием React Native и JavaScript.",
          descriptionKz: "React Native және JavaScript көмегімен кросс-платформалық мобильді қосымшаларды құрыңыз."
        };
      }
      
      // Digital Marketing Fundamentals (id: 5)
      if (course.id === 5) {
        return {
          ...course,
          titleRu: "Основы цифрового маркетинга",
          titleKz: "Цифрлық маркетинг негіздері",
          descriptionRu: "Изучите SEO, маркетинг в социальных сетях, email-кампании и аналитику для роста вашего онлайн-присутствия.",
          descriptionKz: "Онлайн қатысуыңызды арттыру үшін SEO, әлеуметтік желілердегі маркетинг, электрондық пошта науқандары мен аналитиканы үйреніңіз."
        };
      }
      
      // Cloud Computing with AWS (id: 6)
      if (course.id === 6) {
        return {
          ...course,
          titleRu: "Облачные вычисления с AWS",
          titleKz: "AWS арқылы бұлтты есептеу",
          descriptionRu: "Освойте Amazon Web Services и научитесь развертывать, масштабировать и поддерживать приложения в облаке.",
          descriptionKz: "Amazon Web Services-ті меңгеріп, бұлтта қосымшаларды орналастыруды, масштабтауды және қолдауды үйреніңіз."
        };
      }
      
      // Blockchain Development (id: 7)
      if (course.id === 7) {
        return {
          ...course,
          titleRu: "Разработка блокчейн-приложений",
          titleKz: "Блокчейн қосымшаларын әзірлеу",
          descriptionRu: "Научитесь создавать безопасные и эффективные блокчейн-приложения с использованием Ethereum и Solidity.",
          descriptionKz: "Ethereum және Solidity көмегімен қауіпсіз және тиімді блокчейн қосымшаларын құруды үйреніңіз."
        };
      }
      
      // Artificial Intelligence Principles (id: 8)
      if (course.id === 8) {
        return {
          ...course,
          titleRu: "Принципы искусственного интеллекта",
          titleKz: "Жасанды интеллект принциптері",
          descriptionRu: "Изучите основы ИИ, нейронные сети и глубокое обучение с практическими примерами применения.",
          descriptionKz: "Практикалық қолдану мысалдарымен ЖИ негіздерін, нейрондық желілерді және терең оқытуды зерттеңіз."
        };
      }
      
      // Cyber Security Fundamentals (id: 9)
      if (course.id === 9) {
        return {
          ...course,
          titleRu: "Основы кибербезопасности",
          titleKz: "Киберқауіпсіздік негіздері",
          descriptionRu: "Научитесь защищать системы и сети от цифровых атак с комплексным обучением кибербезопасности.",
          descriptionKz: "Жан-жақты киберқауіпсіздік оқытуымен жүйелер мен желілерді сандық шабуылдардан қорғауды үйреніңіз."
        };
      }
      
      // 3D Modeling & Animation (id: 10)
      if (course.id === 10) {
        return {
          ...course,
          titleRu: "3D-моделирование и анимация",
          titleKz: "3D-модельдеу және анимация",
          descriptionRu: "Создавайте потрясающие 3D-модели и анимации для игр, фильмов и виртуальных сред.",
          descriptionKz: "Ойындар, фильмдер және виртуалды орталар үшін керемет 3D-модельдер мен анимацияларды жасаңыз."
        };
      }
      
      // DevOps & CI/CD Pipeline (id: 11)
      if (course.id === 11) {
        return {
          ...course,
          titleRu: "DevOps и CI/CD конвейеры",
          titleKz: "DevOps және CI/CD конвейерлері",
          descriptionRu: "Освойте методологии DevOps и создавайте эффективные CI/CD конвейеры для современной разработки ПО.",
          descriptionKz: "DevOps әдістемелерін меңгеріп, заманауи бағдарламалық жасақтаманы әзірлеу үшін тиімді CI/CD конвейерлерін құрыңыз."
        };
      }
      
      // Product Management Essentials (id: 12)
      if (course.id === 12) {
        return {
          ...course,
          titleRu: "Основы управления продуктом",
          titleKz: "Өнімді басқару негіздері",
          descriptionRu: "Изучите стратегии и методы успешной разработки и управления продуктами.",
          descriptionKz: "Өнімдерді табысты әзірлеу және басқару стратегиялары мен әдістерін үйреніңіз."
        };
      }
      
      // iOS App Development with Swift (id: 13)
      if (course.id === 13) {
        return {
          ...course,
          titleRu: "Разработка iOS-приложений на Swift",
          titleKz: "Swift арқылы iOS қосымшаларын әзірлеу",
          descriptionRu: "Создавайте мощные и красивые iOS-приложения с использованием Swift и современных фреймворков.",
          descriptionKz: "Swift және заманауи фреймворктерді қолдана отырып, күшті және әдемі iOS қосымшаларын құрыңыз."
        };
      }
      
      // Front-End Development with React (id: 14)
      if (course.id === 14) {
        return {
          ...course,
          titleRu: "Фронтенд-разработка на React",
          titleKz: "React негізіндегі фронтенд-әзірлеу",
          descriptionRu: "Создавайте современные, отзывчивые веб-приложения с помощью библиотеки React и экосистемы JavaScript.",
          descriptionKz: "React кітапханасы және JavaScript экожүйесін қолдана отырып, заманауи, интерактивті веб-қосымшаларды құрыңыз."
        };
      }
      
      // Back-End Development with Node.js (id: 15)
      if (course.id === 15) {
        return {
          ...course,
          titleRu: "Бэкенд-разработка на Node.js",
          titleKz: "Node.js негізіндегі бэкенд-әзірлеу",
          descriptionRu: "Изучите создание масштабируемых и производительных серверных приложений с помощью Node.js и Express.",
          descriptionKz: "Node.js және Express көмегімен масштабталатын және өнімді серверлік қосымшаларды құруды үйреніңіз."
        };
      }
      
      // Python for Data Engineering (id: 16)
      if (course.id === 16) {
        return {
          ...course,
          titleRu: "Python для инженерии данных",
          titleKz: "Деректер инженериясына арналған Python",
          descriptionRu: "Осваивайте управление данными, ETL-процессы и создание конвейеров данных с помощью Python.",
          descriptionKz: "Python көмегімен деректерді басқаруды, ETL процестерін және деректер конвейерлерін құруды меңгеріңіз."
        };
      }
      
      // Game Development with Unity (id: 17)
      if (course.id === 17) {
        return {
          ...course,
          titleRu: "Разработка игр на Unity",
          titleKz: "Unity арқылы ойын әзірлеу",
          descriptionRu: "Научитесь создавать увлекательные 2D и 3D игры с использованием популярного движка Unity.",
          descriptionKz: "Танымал Unity қозғалтқышын қолдана отырып, қызықты 2D және 3D ойындарды жасауды үйреніңіз."
        };
      }
      
      // Advanced JavaScript Programming (id: 18)
      if (course.id === 18) {
        return {
          ...course,
          titleRu: "Продвинутое программирование на JavaScript",
          titleKz: "JavaScript-те күрделі бағдарламалау",
          descriptionRu: "Углубите знания в JavaScript, изучая асинхронное программирование, паттерны и продвинутые концепции.",
          descriptionKz: "Асинхронды бағдарламалау, паттерндер және күрделі тұжырымдамаларды зерттеу арқылы JavaScript білімдеріңізді тереңдетіңіз."
        };
      }
      
      // Database Design and SQL (id: 19)
      if (course.id === 19) {
        return {
          ...course,
          titleRu: "Проектирование баз данных и SQL",
          titleKz: "Деректер қорын жобалау және SQL",
          descriptionRu: "Изучите проектирование эффективных баз данных и освойте продвинутые SQL-запросы для работы с данными.",
          descriptionKz: "Тиімді деректер қорын жобалауды үйреніп, деректермен жұмыс істеу үшін күрделі SQL сұрауларын меңгеріңіз."
        };
      }
      
      // Digital Photography Mastery (id: 20)
      if (course.id === 20) {
        return {
          ...course,
          titleRu: "Мастерство цифровой фотографии",
          titleKz: "Цифрлық фотография шеберлігі",
          descriptionRu: "От базовых до продвинутых техник фотографии: композиция, освещение, обработка и создание портфолио.",
          descriptionKz: "Фотографияның негізгі және күрделі техникалары: композиция, жарықтандыру, өңдеу және портфолио құру."
        };
      }
      
      return course;
    });
  
  // В компоненте или перед ним добавляем определение для featuredCourses:
  const featuredCourses = coursesWithTranslations.filter(course => course.featured).slice(0, 8);
  
  // В начале компонента Public Courses убедимся, что у нас есть нужные состояния
  // Если они уже определены, не добавляйте их повторно
  const [showBasicModal, setShowBasicModal] = useState(false);
  const [modalCourse, setModalCourse] = useState<Course | null>(null);
  
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
          <div className="container mx-auto px-4 max-w-7xl relative z-10">
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
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600 leading-relaxed pb-2 pt-1"
              >
                {language === 'ru' ? 'Онлайн курсы для вашего роста' : 
                language === 'kz' ? 'Сіздің өсуіңіз үшін онлайн курстар' : 
                'Online Courses for Your Growth'}
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-xl text-foreground/80 mb-8"
              >
                {language === 'ru' ? 'Изучайте новые навыки, развивайте свою карьеру и раскройте свой потенциал с нашими экспертными курсами' : 
                language === 'kz' ? 'Жаңа дағдыларды үйреніңіз, мансабыңызды дамытыңыз және біздің сарапшы курстарымызбен әлеуетіңізді ашыңыз' : 
                'Learn new skills, advance your career, and unlock your potential with our expert-led courses'}
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="flex justify-center mb-16"
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className={`rounded-full ${isMobile ? 'px-6 py-4 text-base' : 'px-8 py-6 text-lg'} bg-card border-2 border-primary/30 text-primary hover:bg-primary/10 hover:border-primary/50 transition-all duration-500 shadow-lg`}
                    onClick={() => {
                      const element = document.getElementById('courses-section');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                  >
                    <span className="flex items-center">
                      {language === 'ru' ? 'Изучить все курсы' : 
                      language === 'kz' ? 'Барлық курстарды қарау' : 
                      'Explore All Courses'}
                      <motion.span aria-hidden="true">
                        <ArrowRight className={`ml-2 ${isMobile ? 'w-4 h-4' : 'w-5 h-5'}`} />
                      </motion.span>
                    </span>
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Градиентные элементы */}
          <motion.div 
            className="absolute top-20 left-[10%] w-96 h-96 bg-gradient-to-r from-indigo-400/10 to-primary/10 dark:from-indigo-400/20 dark:to-primary/20 blur-3xl -z-10"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.25, 0.2],
              rotate: [0, 5, 0]
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            aria-hidden="true"
          />
          <motion.div 
            className="absolute bottom-40 right-[15%] w-72 h-72 bg-gradient-to-r from-purple-500/5 to-blue-500/5 dark:from-purple-500/15 dark:to-blue-500/15 blur-3xl -z-10"
            animate={{
              scale: [1.1, 0.9, 1.1],
              opacity: [0.25, 0.3, 0.25],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Плавающие иконки */}
          <motion.div 
            className="absolute top-[15%] left-[15%] text-primary/30 z-0"
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 10, 0]
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
            className="absolute top-[25%] right-[15%] text-indigo-600/30 z-0"
            animate={{
              y: [0, 15, 0],
              x: [0, -10, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <GraduationCap className="w-12 h-12" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-[25%] left-[12%] text-blue-500/30 z-0"
            animate={{ 
              y: [0, 10, 0],
              x: [0, -5, 0],
              rotate: [0, 8, 0]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Layers className="w-14 h-14" />
          </motion.div>
          
          <motion.div 
            className="absolute bottom-[20%] right-[12%] text-purple-500/30 z-0"
            animate={{
              y: [0, -8, 0],
              x: [0, 5, 0],
              rotate: [0, -5, 0]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Code className="w-10 h-10" />
          </motion.div>

            <motion.div 
            className="absolute top-[35%] left-[10%] text-indigo-500/30 z-0"
            animate={{
              y: [0, 18, 0],
              x: [0, -10, 0],
              rotate: [0, 15, 0]
            }}
            transition={{
              duration: 10.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <PenTool className="w-12 h-12" />
          </motion.div>
          
          <motion.div 
            className="absolute top-[45%] right-[10%] text-primary/30 z-0"
            animate={{
              y: [0, -14, 0],
              x: [0, -7, 0],
              rotate: [0, 8, 0]
            }}
            transition={{
              duration: 9.8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Star className="w-10 h-10" />
          </motion.div>

          <motion.div 
            className="absolute bottom-[15%] left-[20%] text-green-500/30 z-0"
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
            <BarChart className="w-13 h-13" />
            </motion.div>
      </section>

        {/* FEATURES SECTION */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-indigo-600/90">
                {language === 'ru' ? 'Почему выбирают наши курсы' : 
                language === 'kz' ? 'Неліктен біздің курстарды таңдайды' : 
                'Why Choose Our Courses'}
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                {language === 'ru' ? 'Мы предлагаем уникальные возможности для развития вашей карьеры и навыков' : 
                language === 'kz' ? 'Біз сіздің мансабыңыз бен дағдыларыңызды дамыту үшін бірегей мүмкіндіктер ұсынамыз' : 
                'We offer unique opportunities to advance your career and skills'}
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

        {/* FEATURED COURSES SECTION */}
        <section className="py-8 md:py-16 bg-primary/5">
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-blue-600/90">
                {language === 'ru' ? 'Популярные курсы' : 
                language === 'kz' ? 'Танымал курстар' : 
                'Featured Courses'}
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                {language === 'ru' ? 'Исследуйте наши самые популярные и высоко оцененные курсы' : 
                language === 'kz' ? 'Біздің ең танымал және жоғары бағаланған курстарымызды зерттеңіз' : 
                'Explore our most popular and highest-rated courses'}
              </p>
            </motion.div>
            
            {/* Grid with consistent sizing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {coursesWithTranslations.filter(course => course.featured).slice(0, 8).map((course: Course, index: number) => (
                  <CourseCard 
                    key={course.id} 
                    course={course} 
                    onRegisterClick={(e) => {
                      e.stopPropagation();
                      navigate("/register");
                    }}
                    onClick={() => {
                      setModalCourse(course);
                      setShowBasicModal(true);
                    }}
                    index={index}
                  />
                ))}
            </div>
            
            {/* View all courses button */}
            <div className="text-center mt-10">
              <Button 
                className="rounded-full px-8 py-3 bg-gradient-to-r from-primary/90 to-blue-600/90 hover:from-primary/80 hover:to-blue-600/80 text-white"
                onClick={() => {
                  const coursesSection = document.getElementById('courses-section');
                  if (coursesSection) {
                    coursesSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                {language === 'ru' ? 'Просмотреть все курсы' : 
                language === 'kz' ? 'Барлық курстарды қарау' : 
                'View All Courses'}
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
          </div>
        </div>
      </section>

        {/* ALL COURSES SECTION с интегрированным отображением курсов */}
        <section id="courses-section" className="py-16 md:py-24 relative overflow-hidden">
          {/* Декоративные элементы фона */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10"></div>
          <motion.div 
            className="absolute right-0 top-20 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl -z-10"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity }}
          ></motion.div>
          
          <div className="container mx-auto px-4 max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary/90 to-blue-600/90 pb-1">
                {language === 'ru' ? 'Исследуйте все курсы' : 
                language === 'kz' ? 'Барлық курстарды зерттеңіз' : 
                'Explore All Courses'}
              </h2>
              <p className="text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto mb-8">
                {language === 'ru' ? 'Найдите идеальный курс для развития ваших навыков и карьеры' : 
                 language === 'kz' ? 'Дағдыларыңыз бен мансабыңызды дамыту үшін тамаша курсты табыңыз' : 
                 'Find the perfect course to advance your skills and career'}
              </p>
            </motion.div>
            
            {/* Эта функция обеспечивает состояние и логику пагинации */}
            {(() => {
              // Состояния для фильтрации и пагинации
              const [currentPage, setCurrentPage] = useState(1);
              const coursesPerPage = 6; // 6 курсов на страницу
              const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
              const [durationFilter, setDurationFilter] = useState("all");
              const [priceFilter, setPriceFilter] = useState("all");
              
              // Функция фильтрации курсов - применяем все фильтры
              const getFilteredCourses = () => {
                return coursesWithTranslations.filter(course => {
                  // Улучшенный фильтр по поиску с учетом переводов
                  const matchesSearch = searchQuery === "" || 
                    // Поиск в оригинальном заголовке
                    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    // Поиск в переведенных заголовках, если они есть
                    (course.title && course.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (course.title && course.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    // Поиск в оригинальном описании
                    course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    // Поиск в переведенных описаниях, если они есть
                    (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    (course.description && course.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
                    // Поиск в категории
                    course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    // Поиск в категории с учетом перевода
                    getCategoryRu(course.category).toLowerCase().includes(searchQuery.toLowerCase()) ||
                    getCategoryKz(course.category).toLowerCase().includes(searchQuery.toLowerCase()) ||
                    // Поиск в провайдере
                    course.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    // Поиск в навыках
                    course.skills.some(skill => {
                      return skill.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        getSkillRu(skill).toLowerCase().includes(searchQuery.toLowerCase()) ||
                        getSkillKz(skill).toLowerCase().includes(searchQuery.toLowerCase());
                    });
                  
                  // Остальные фильтры остаются без изменений
                  const matchesCategory = categoryFilter === "all" || course.category === categoryFilter;
                  const matchesLevel = levelFilter === "all" || course.level === levelFilter;
                  
                  // Фильтр по длительности
                  let matchesDuration = true;
                  if (durationFilter !== "all") {
                    const weekMatch = course.duration.match(/(\d+)/);
                    const weeks = weekMatch ? parseInt(weekMatch[0]) : 0;
                    
                    if (durationFilter === "short" && weeks > 8) matchesDuration = false;
                    if (durationFilter === "medium" && (weeks < 8 || weeks > 12)) matchesDuration = false;
                    if (durationFilter === "long" && weeks < 12) matchesDuration = false;
                  }
                  
                  // Фильтр по цене (для примера - используем provider как суррогат для типа курса)
                  let matchesPrice = true;
                  if (priceFilter !== "all") {
                    if (priceFilter === "free" && !course.isPartnerCourse) matchesPrice = false;
                    if (priceFilter === "paid" && course.isPartnerCourse) matchesPrice = false;
                  }
                  
                  return matchesSearch && matchesCategory && matchesLevel && matchesDuration && matchesPrice;
                });
              };
              
              // Функция сортировки курсов
              const getSortedCourses = (courses: Course[]): Course[] => {
                if (sortBy === "popularity") {
                  return [...courses].sort((a, b) => b.students - a.students);
                } else if (sortBy === "rating") {
                  return [...courses].sort((a, b) => b.rating - a.rating);
                } else if (sortBy === "newest") {
                  // Для демонстрации - используем обратный порядок ID как "новизну"
                  return [...courses].sort((a, b) => b.id - a.id);
                }
                return courses;
              };
              
              // Получаем отфильтрованные и отсортированные курсы, исключая дубликаты
              const filteredCourses = getFilteredCourses();

              // Убедимся, что у нас нет дубликатов курсов по ID
              const uniqueCourses = filteredCourses.reduce((unique: Course[], course) => {
                // Проверим, есть ли курс с таким ID уже в массиве
                const exists = unique.some(item => item.id === course.id);
                // Добавляем курс только если его ID еще не встречался
                if (!exists) {
                  unique.push(course);
                }
                return unique;
              }, []);

              // Сортируем уже уникальные курсы
              const sortedCourses = getSortedCourses(uniqueCourses);
              
              // Получаем курсы для текущей страницы
              const indexOfLastCourse = currentPage * coursesPerPage;
              const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
              // Делаем slice с убедившись, что не выходим за пределы массива
              const currentCourses = sortedCourses.slice(indexOfFirstCourse, indexOfLastCourse);
              
              // Рассчитываем общее количество страниц
              const totalPages = Math.ceil(sortedCourses.length / coursesPerPage);
              
              // Функция для очистки всех фильтров
              const clearAllFilters = () => {
                setSearchQuery("");
                setCategoryFilter("all");
                setLevelFilter("all");
                setDurationFilter("all");
                setPriceFilter("all");
                setSortBy("popularity");
                setCurrentPage(1);
              };
              
              return (
                <div className="bg-card/40 backdrop-blur-sm border border-border/20 rounded-xl p-6 md:p-8 shadow-sm">
                  {/* Секция фильтров с улучшенным дизайном */}
                  <div className="mb-8">
                    {/* Основной поиск и кнопка расширенных фильтров */}
                    <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
                      <div className="flex-1 relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={18} />
                <Input
                          placeholder={
                            language === 'ru' ? 'Поиск по названию, категории или навыкам...' : 
                            language === 'kz' ? 'Атау, санат немесе дағдылар бойынша іздеу...' : 
                            'Search by title, category or skills...'
                          }
                          className="pl-10 py-6 text-base"
                  value={searchQuery}
                          onChange={(e) => {
                            setSearchQuery(e.target.value);
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
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {/* Фильтр по категории */}
                            <div>
                              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                <Filter size={14} />
                                {language === 'ru' ? 'Категория' : 
                                language === 'kz' ? 'Санат' : 
                                'Category'}
                              </h4>
                  <select
                                className="w-full px-3 py-2 appearance-none bg-background border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    value={categoryFilter}
                                onChange={(e) => {
                                  setCategoryFilter(e.target.value);
                                  setCurrentPage(1); // Сбрасываем страницу при изменении фильтра
                                }}
                              >
                                <option value="all">
                                  {language === 'ru' ? 'Все категории' : 
                                  language === 'kz' ? 'Барлық санаттар' : 
                                  'All Categories'}
                      </option>
                                {categories.filter(cat => cat !== "all").map(category => (
                                  <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
          </div>
          
                            {/* Фильтр по уровню */}
                            <div>
                              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                <GraduationCap size={14} />
                                {language === 'ru' ? 'Уровень' : 
                                language === 'kz' ? 'Деңгей' : 
                                'Level'}
                              </h4>
                              <select
                                className="w-full px-3 py-2 appearance-none bg-background border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                value={levelFilter}
                                onChange={(e) => {
                                  setLevelFilter(e.target.value);
                                  setCurrentPage(1);
                                }}
                              >
                                <option value="all">
                                  {language === 'ru' ? 'Все уровни' : 
                                  language === 'kz' ? 'Барлық деңгейлер' : 
                                  'All Levels'}
                                </option>
                                {levels.filter(level => level !== "all").map(level => (
                                  <option key={level} value={level}>{level}</option>
                                ))}
                              </select>
            </div>
            
                            {/* Фильтр по длительности */}
                            <div>
                              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                <Clock size={14} />
                                {language === 'ru' ? 'Длительность' : 
                                language === 'kz' ? 'Ұзақтығы' : 
                                'Duration'}
                              </h4>
                              <select
                                className="w-full px-3 py-2 appearance-none bg-background border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                value={durationFilter}
                                onChange={(e) => {
                                  setDurationFilter(e.target.value);
                                  setCurrentPage(1);
                                }}
                              >
                                <option value="all">
                                  {language === 'ru' ? 'Любая длительность' : 
                                  language === 'kz' ? 'Кез келген ұзақтық' : 
                                  'Any Duration'}
                                </option>
                                <option value="short">
                                  {language === 'ru' ? 'До 8 недель' : 
                                  language === 'kz' ? '8 аптаға дейін' : 
                                  'Under 8 weeks'}
                                </option>
                                <option value="medium">
                                  {language === 'ru' ? '8-12 недель' : 
                                  language === 'kz' ? '8-12 апта' : 
                                  '8-12 weeks'}
                                </option>
                                <option value="long">
                                  {language === 'ru' ? 'Более 12 недель' : 
                                  language === 'kz' ? '12 аптадан астам' : 
                                  'Over 12 weeks'}
                                </option>
                              </select>
                  </div>
                            
                            {/* Фильтр по цене (демонстрационный) */}
                            <div>
                              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                                <span className="flex items-center justify-center w-3.5 h-3.5">$</span>
                                {language === 'ru' ? 'Цена' : 
                                language === 'kz' ? 'Баға' : 
                                'Price'}
                              </h4>
                              <select
                                className="w-full px-3 py-2 appearance-none bg-background border border-input rounded-md text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                value={priceFilter}
                                onChange={(e) => {
                                  setPriceFilter(e.target.value);
                                  setCurrentPage(1);
                                }}
                              >
                                <option value="all">
                                  {language === 'ru' ? 'Все курсы' : 
                                  language === 'kz' ? 'Барлық курстар' : 
                                  'All Courses'}
                                </option>
                                <option value="free">
                                  {language === 'ru' ? 'Бесплатные' : 
                                  language === 'kz' ? 'Тегін' : 
                                  'Free'}
                                </option>
                                <option value="paid">
                                  {language === 'ru' ? 'Платные' : 
                                  language === 'kz' ? 'Ақылы' : 
                                  'Paid'}
                                </option>
                              </select>
                  </div>
              </div>
                          
                          {/* Кнопки сброса и применения фильтров */}
                          <div className="flex justify-end mt-6 gap-3">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={clearAllFilters}
                              className="border-primary/30 text-primary hover:bg-primary/10"
                            >
                              {language === 'ru' ? 'Сбросить все' : 
                              language === 'kz' ? 'Барлығын тазалау' : 
                              'Reset All'}
                            </Button>
                            <Button 
                              size="sm"
                              className="bg-primary text-white"
                              onClick={() => setShowAdvancedFilters(false)}
                            >
                              {language === 'ru' ? 'Применить' : 
                              language === 'kz' ? 'Қолдану' : 
                              'Apply'}
                            </Button>
                  </div>
                        </motion.div>
                )}
                    </AnimatePresence>
              </div>
                  
                  {/* Секция с результатами поиска и курсами - теперь внутри того же блока */}
                  <div className="border-t border-border/20 pt-8">
                    <div className="flex justify-between items-center mb-6">
                      <p className="text-foreground/70">
                        {language === 'ru' ? 'Найдено курсов:' : 
                        language === 'kz' ? 'Табылған курстар:' : 
                        'Courses found:'} <span className="font-semibold text-foreground">{sortedCourses.length}</span>
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <p className="text-sm text-foreground/60">
                          {language === 'ru' ? 'Сортировать:' : 
                          language === 'kz' ? 'Сұрыптау:' : 
                          'Sort by:'}
                        </p>
                        <select
                          className="h-8 pl-3 pr-7 py-0 appearance-none bg-background border border-input rounded-md text-xs ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring focus:ring-offset-1"
                          value={sortBy}
                          onChange={(e) => {
                            setSortBy(e.target.value);
                            setCurrentPage(1);
                          }}
                        >
                          <option value="popularity">
                            {language === 'ru' ? 'По популярности' : 
                            language === 'kz' ? 'Танымалдылық бойынша' : 
                            'By Popularity'}
                          </option>
                          <option value="rating">
                            {language === 'ru' ? 'По рейтингу' : 
                            language === 'kz' ? 'Рейтинг бойынша' : 
                            'By Rating'}
                          </option>
                          <option value="newest">
                            {language === 'ru' ? 'Сначала новые' : 
                            language === 'kz' ? 'Жаңалары бірінші' : 
                            'Newest First'}
                          </option>
                        </select>
          </div>
        </div>
                    
                    {/* Сетка курсов с проверкой на пустые результаты */}
                    {currentCourses.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        {/* Выводим карточки текущей страницы (они уже отфильтрованы до 6 штук) */}
                        {currentCourses.map((course: Course, index: number) => (
                          <CourseCard 
                            key={course.id} 
                            course={course} 
                            onRegisterClick={(e: React.MouseEvent) => {
                              e.stopPropagation();
                              navigate(`/CourseDetail?id=${course.id}`);
                            }}
                            onClick={() => {
                              setModalCourse(course);
                              setShowBasicModal(true);
                            }}
                            index={index}
                          />
                        ))}
        </div>
                    ) : (
                      <div className="py-16 text-center">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="text-4xl mb-4">🔍</div>
                          <h3 className="text-xl font-medium mb-2">
                            {language === 'ru' ? 'Курсы не найдены' : 
                            language === 'kz' ? 'Курстар табылмады' : 
                            'No Courses Found'}
                          </h3>
                          <p className="text-foreground/60 max-w-md mx-auto mb-6">
                            {language === 'ru' ? 'Попробуйте изменить параметры поиска или фильтры' : 
                            language === 'kz' ? 'Іздеу параметрлерін немесе сүзгілерді өзгертіп көріңіз' : 
                            'Try adjusting your search parameters or filters'}
                          </p>
                          <Button 
                            variant="outline"
                            onClick={clearAllFilters}
                            className="border-primary/30 text-primary hover:bg-primary/10"
                          >
                            {language === 'ru' ? 'Сбросить все фильтры' : 
                            language === 'kz' ? 'Барлық сүзгілерді тазалау' : 
                            'Clear All Filters'}
                          </Button>
                        </motion.div>
      </div>
                    )}
                    
                    {/* Улучшенная пагинация */}
                    {sortedCourses.length > coursesPerPage && (
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
    </div>
              );
            })()}
          </div>
        </section>
      </main>
      {/* В конце компонента публичных курсов, ПРЯМО ПЕРЕД закрывающим тегом </PublicPageLayout> */}
      {/* Базовое модальное окно с высоким z-index */}
      {showBasicModal && modalCourse && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-4 overflow-hidden"
          onClick={() => setShowBasicModal(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Верхний блок с изображением и основной информацией */}
            <div className="relative">
              {/* Баннер курса */}
              <div className="h-72 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10"></div>
                <img 
                  src={modalCourse.imageUrl} 
                  alt={language === 'ru' && modalCourse.titleRu ? modalCourse.titleRu : 
                      language === 'kz' && modalCourse.titleKz ? modalCourse.titleKz : 
                      modalCourse.title} 
                  className="w-full h-full object-cover" 
                />
                
                {/* Кнопка закрытия в правом верхнем углу */}
                <button 
                  className="absolute top-4 right-4 z-20 bg-black/70 text-white rounded-full p-2 hover:bg-black transition-colors"
                  onClick={() => setShowBasicModal(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6L6 18M6 6l12 12"></path>
                  </svg>
                </button>
                
                {/* Основная информация на баннере */}
                <div className="absolute bottom-6 left-6 right-6 z-20 text-white">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge className="bg-blue-600 text-white border-none">
                      {language === 'ru' ? getCategoryRu(modalCourse.category) :
                       language === 'kz' ? getCategoryKz(modalCourse.category) :
                       modalCourse.category}
                    </Badge>
                    <Badge variant="outline" className="bg-black/70 text-white border-white/50">
                      {language === 'ru' ? 
                        modalCourse.level === 'Beginner' ? 'Начинающий' : 
                        modalCourse.level === 'Intermediate' ? 'Средний' : 
                        modalCourse.level === 'Advanced' ? 'Продвинутый' : modalCourse.level 
                        : 
                      language === 'kz' ? 
                        modalCourse.level === 'Beginner' ? 'Бастаушы' : 
                        modalCourse.level === 'Intermediate' ? 'Орташа' : 
                        modalCourse.level === 'Advanced' ? 'Жоғары' : modalCourse.level
                        : 
                      modalCourse.level}
                    </Badge>
                    <Badge variant="outline" className="bg-black/70 text-white border-white/50">
                      {modalCourse.isPartnerCourse ? modalCourse.provider : 'Portfol.IO Academy'}
                    </Badge>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-bold">
                    {language === 'ru' && modalCourse.titleRu ? modalCourse.titleRu : 
                     language === 'kz' && modalCourse.titleKz ? modalCourse.titleKz : 
                     modalCourse.title}
                  </h2>
                </div>
              </div>
            </div>
            
            {/* Контент модального окна */}
            <div className="p-6 md:p-8 bg-white dark:bg-gray-900 text-black dark:text-white">
              {/* Описание курса */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-3 text-black dark:text-white">
                  {language === 'ru' ? 'О курсе' : 
                   language === 'kz' ? 'Курс туралы' : 
                   'About the Course'}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {language === 'ru' && modalCourse.descriptionRu ? modalCourse.descriptionRu : 
                   language === 'kz' && modalCourse.descriptionKz ? modalCourse.descriptionKz : 
                   modalCourse.description}
                </p>
              </div>
              
              {/* Детали курса */}
              <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex flex-col items-center">
                  <Clock className="w-6 h-6 mb-2 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-medium mb-1 text-black dark:text-white">
                    {language === 'ru' ? 'Продолжительность' : 
                     language === 'kz' ? 'Ұзақтығы' : 
                     'Duration'}
                  </h4>
                  <p className="text-center text-gray-700 dark:text-gray-300">
                    {modalCourse.duration.replace('weeks', 
                      language === 'ru' ? 'недель' : 
                      language === 'kz' ? 'апта' : 
                      'weeks'
                    )}
                  </p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex flex-col items-center">
                  <BookOpen className="w-6 h-6 mb-2 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-medium mb-1 text-black dark:text-white">
                    {language === 'ru' ? 'Занятий' : 
                     language === 'kz' ? 'Сабақтар' : 
                     'Lessons'}
                  </h4>
                  <p className="text-center text-gray-700 dark:text-gray-300">{modalCourse.lessons}</p>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg flex flex-col items-center">
                  <Layers className="w-6 h-6 mb-2 text-blue-600 dark:text-blue-400" />
                  <h4 className="font-medium mb-1 text-black dark:text-white">
                    {language === 'ru' ? 'Проектов' : 
                     language === 'kz' ? 'Жобалар' : 
                     'Projects'}
                  </h4>
                  <p className="text-center text-gray-700 dark:text-gray-300">{modalCourse.projects}</p>
                </div>
              </div>
              
              {/* Структура курса */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
                  {language === 'ru' ? 'Структура курса' : 
                   language === 'kz' ? 'Курс құрылымы' : 
                   'Course Structure'}
                </h3>
                
                <div className="space-y-3">
                  {/* Модуль 1 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center">
                        <div className="bg-blue-100 dark:bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-blue-600 dark:text-blue-300 font-semibold">1</div>
                        <h4 className="font-medium text-black dark:text-white">
                          {language === 'ru' ? 'Введение и основы' : 
                           language === 'kz' ? 'Кіріспе және негіздер' : 
                           'Introduction and Basics'}
                        </h4>
                      </div>
                      <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-none">
                        {language === 'ru' ? '4 урока' : 
                         language === 'kz' ? '4 сабақ' : 
                         '4 lessons'}
                      </Badge>
                    </div>
                    
                    <div className="px-4 py-2">
                      <ul className="space-y-2 pl-11 py-2">
                        <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-5 h-5 rounded-full border border-blue-400 dark:border-blue-500 mr-3 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                          </div>
                          {language === 'ru' ? 'Знакомство с курсом' : 
                           language === 'kz' ? 'Курспен танысу' : 
                           'Course Introduction'}
                        </li>
                        <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-5 h-5 rounded-full border border-blue-400 dark:border-blue-500 mr-3 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                          </div>
                          {language === 'ru' ? 'Установка необходимого ПО' : 
                           language === 'kz' ? 'Қажетті бағдарламалық жасақтаманы орнату' : 
                           'Setting up Essential Software'}
                        </li>
                        <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-5 h-5 rounded-full border border-blue-400 dark:border-blue-500 mr-3 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                          </div>
                          {language === 'ru' ? 'Базовые концепции' : 
                           language === 'kz' ? 'Негізгі тұжырымдамалар' : 
                           'Core Concepts'}
                        </li>
                        <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-5 h-5 rounded-full border border-blue-400 dark:border-blue-500 mr-3 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                          </div>
                          {language === 'ru' ? 'Первый практический проект' : 
                           language === 'kz' ? 'Бірінші практикалық жоба' : 
                           'First Hands-on Project'}
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Модуль 2 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center">
                        <div className="bg-blue-100 dark:bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-blue-600 dark:text-blue-300 font-semibold">2</div>
                        <h4 className="font-medium text-black dark:text-white">
                          {language === 'ru' ? 'Продвинутые техники' : 
                           language === 'kz' ? 'Кеңейтілген техникалар' : 
                           'Advanced Techniques'}
                        </h4>
                      </div>
                      <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-none">
                        {language === 'ru' ? '5 уроков' : 
                         language === 'kz' ? '5 сабақ' : 
                         '5 lessons'}
                      </Badge>
                    </div>
                    
                    <div className="px-4 py-2">
                      <ul className="space-y-2 pl-11 py-2">
                        <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-5 h-5 rounded-full border border-blue-400 dark:border-blue-500 mr-3 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                          </div>
                          {language === 'ru' ? 'Оптимизация производительности' : 
                           language === 'kz' ? 'Өнімділікті оңтайландыру' : 
                           'Performance Optimization'}
                        </li>
                        <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-5 h-5 rounded-full border border-blue-400 dark:border-blue-500 mr-3 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                          </div>
                          {language === 'ru' ? 'Лучшие практики и шаблоны' : 
                           language === 'kz' ? 'Үздік тәжірибелер мен үлгілер' : 
                           'Best Practices and Patterns'}
                        </li>
                        <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-5 h-5 rounded-full border border-blue-400 dark:border-blue-500 mr-3 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                          </div>
                          {language === 'ru' ? 'Работа с внешними API' : 
                           language === 'kz' ? 'Сыртқы API-мен жұмыс' : 
                           'Working with External APIs'}
                        </li>
                        <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-5 h-5 rounded-full border border-blue-400 dark:border-blue-500 mr-3 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                          </div>
                          {language === 'ru' ? 'Обработка ошибок и исключений' : 
                           language === 'kz' ? 'Қателер мен ерекшеліктерді өңдеу' : 
                           'Error and Exception Handling'}
                        </li>
                        <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-5 h-5 rounded-full border border-blue-400 dark:border-blue-500 mr-3 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                          </div>
                          {language === 'ru' ? 'Создание сложных компонентов' : 
                           language === 'kz' ? 'Күрделі компоненттерді құру' : 
                           'Building Complex Components'}
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Модуль 3 */}
                  <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center">
                        <div className="bg-blue-100 dark:bg-blue-900 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-blue-600 dark:text-blue-300 font-semibold">3</div>
                        <h4 className="font-medium text-black dark:text-white">
                          {language === 'ru' ? 'Итоговый проект' : 
                           language === 'kz' ? 'Қорытынды жоба' : 
                           'Final Project'}
                        </h4>
                      </div>
                      <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-none">
                        {language === 'ru' ? '3 урока' : 
                         language === 'kz' ? '3 сабақ' : 
                         '3 lessons'}
                      </Badge>
                    </div>
                    
                    <div className="px-4 py-2">
                      <ul className="space-y-2 pl-11 py-2">
                        <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-5 h-5 rounded-full border border-blue-400 dark:border-blue-500 mr-3 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                          </div>
                          {language === 'ru' ? 'Планирование проекта' : 
                           language === 'kz' ? 'Жобаны жоспарлау' : 
                           'Project Planning'}
                        </li>
                        <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-5 h-5 rounded-full border border-blue-400 dark:border-blue-500 mr-3 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                          </div>
                          {language === 'ru' ? 'Разработка и реализация' : 
                           language === 'kz' ? 'Әзірлеу және іске асыру' : 
                           'Development and Implementation'}
                        </li>
                        <li className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                          <div className="w-5 h-5 rounded-full border border-blue-400 dark:border-blue-500 mr-3 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 dark:bg-blue-400"></div>
                          </div>
                          {language === 'ru' ? 'Тестирование, отладка и развертывание' : 
                           language === 'kz' ? 'Тестілеу, түзету және орналастыру' : 
                           'Testing, Debugging and Deployment'}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Требования к курсу */}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 text-black dark:text-white">
                  {language === 'ru' ? 'Требования к курсу' : 
                   language === 'kz' ? 'Курс талаптары' : 
                   'Course Requirements'}
                </h3>
                
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {language === 'ru' ? 'Базовые знания программирования' : 
                       language === 'kz' ? 'Бағдарламалаудың негізгі білімі' : 
                       'Basic programming knowledge'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {language === 'ru' ? 'Компьютер с доступом в интернет' : 
                       language === 'kz' ? 'Интернетке қосылған компьютер' : 
                       'Computer with internet access'}
                    </span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">
                      {language === 'ru' ? 'Желание учиться и экспериментировать' : 
                       language === 'kz' ? 'Оқуға және тәжірибе жасауға деген ынта' : 
                       'Willingness to learn and experiment'}
                    </span>
                  </li>
                </ul>
              </div>
              
              {/* Кнопки действий */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="flex-1 py-6 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300"
                  onClick={() => {
                    setShowBasicModal(false);
                    navigate("/register");
                  }}
                >
                  {language === 'ru' ? 'Записаться на курс' : 
                   language === 'kz' ? 'Курсқа тіркелу' : 
                   'Enroll in Course'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                
                <Button 
                  variant="outline"
                  className="flex-1 py-6 border-blue-600 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900/20"
                  onClick={() => {
                    setShowBasicModal(false);
                    navigate("/login");
                  }}
                >
                  {language === 'ru' ? 'Добавить в избранное' : 
                   language === 'kz' ? 'Таңдаулыларға қосу' : 
                   'Add to Wishlist'}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </PublicPageLayout>
  );
} 