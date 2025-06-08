export interface User {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName?: string;
  role: 'admin' | 'user' | 'mentor';
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  profilePicture?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  telegram?: string;
  whatsapp?: string;
  bio?: string;
  company?: string;
  position?: string;
  skills?: UserSkill[];
  education?: Education[];
  languages?: Language[];
  projects?: Project[];
}

export interface UserSkill {
  id: number;
  name: string;
  category: string;
  level: number; // 1-5
  yearsOfExperience?: number;
}

export interface Education {
  id: number;
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  isPresent: boolean;
  gpa?: string;
  activities?: string;
  description?: string;
}

export interface Language {
  id: number;
  name: string;
  level: 'basic' | 'intermediate' | 'advanced' | 'native';
  certificate?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  githubUrl?: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  isPresent: boolean;
}