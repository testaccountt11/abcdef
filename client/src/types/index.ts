export interface User {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePicture?: string;
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
  id: string;
  achievementId: string;
  achievement: AchievementDetails;
  progress: number;
  isCompleted: boolean;
  completedAt?: string;
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