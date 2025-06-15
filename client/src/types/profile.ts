export interface SkillFormValues {
  name: string;
  category: string;
  level: number;
}

export interface EducationFormValues {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  isPresent: boolean;
}

export interface LanguageFormValues {
  name: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";
  certificate?: string;
}

export interface ProjectFormValues {
  title: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  isPresent: boolean;
  projectUrl?: string;
  githubUrl?: string;
}

export interface Language {
  id: number;
  userId: string;
  name: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";
  proficiency: string;
  certificate?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface NewLanguage extends Omit<Language, 'id' | 'createdAt' | 'updatedAt'> {}

export interface SkillFormData {
  name: string;
  category: string;
  level: number;
  yearsOfExperience?: number;
}

export interface EducationFormData {
  institution: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  isPresent: boolean;
}

export interface LanguageFormData {
  name: string;
  level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "Native";
  certificate?: string;
}

export interface ProjectFormData {
  title: string;
  description: string;
  technologies: string[];
  startDate: string;
  endDate?: string;
  isPresent: boolean;
  projectUrl?: string;
  githubUrl?: string;
} 