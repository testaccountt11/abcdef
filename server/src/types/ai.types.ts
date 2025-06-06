export interface PortfolioAnalysis {
  skills: string[];
  recommendations: string[];
  educationPath: string[];
  strengths: string[];
  areasToImprove: string[];
}

export interface ChatResponse {
  message: string;
  analysis?: PortfolioAnalysis;
}

export interface PortfolioData {
  education: {
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
    gpa?: number;
  }[];
  skills: {
    name: string;
    level: string;
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    url?: string;
  }[];
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }[];
  interests: string[];
  languages: {
    name: string;
    level: string;
  }[];
} 