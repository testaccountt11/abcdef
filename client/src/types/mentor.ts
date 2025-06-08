export interface MentorResume {
  id: number;
  first_name: string;
  last_name: string;
  title: string;
  photo?: {
    medium?: string;
  };
  area: {
    name: string;
  };
  education: {
    level: string;
  };
  skills: string[];
  language: Array<{
    name: string;
    level: string;
  }>;
  total_experience: number;
  updated_at: string;
  salary?: {
    amount: number;
    currency: string;
  };
  url?: string;
} 