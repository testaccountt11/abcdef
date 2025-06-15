export interface User {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePicture?: string;
  role: 'user' | 'admin' | 'mentor';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  type: string;
  displayOnProfile: boolean;
}

export interface UserBadge {
  id: string;
  badgeId: string;
  badge: Badge;
  displayOnProfile: boolean;
}

export interface UserStats {
  userId: number;
  coursesInProgress: number;
  certificatesEarned: number;
  mentorSessions: number;
  opportunitiesSaved: number;
}

export interface AchievementDetails {
  id: number;
  name: string;
  description: string;
  category: string;
  target: number;
  icon?: string;
}

export interface Achievement {
  id: number;
  title: string;
  description: string;
  unlockedAt: string;
  icon: string;
  userId: number;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  certificateUrl?: string;
  certificateFile?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface ApiResponse<T> {
  user?: T;
  error?: string;
  message?: string;
} 

export * from './internship';
export * from './message';

export interface Skill {
  id: number;
  name: string;
  category: string;
  level: number;
  yearsOfExperience?: number;
  userId: number;
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
  userId: number;
}

export interface Language {
  id: number;
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Native';
  certificate?: string;
  userId: number;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  isPresent: boolean;
  technologies: string[];
  projectUrl?: string;
  githubUrl?: string;
  userId: number;
}

export interface NewSkill extends Omit<Skill, 'id'> {}
export interface NewEducation extends Omit<Education, 'id'> {}
export interface NewLanguage extends Omit<Language, 'id'> {}
export interface NewProject extends Omit<Project, 'id'> {} 