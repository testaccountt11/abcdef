export interface Internship {
  id: number;
  title: string;
  titleRu?: string;
  titleKz?: string;
  company: string;
  companyLogo: string;
  location: string;
  locationType: 'remote' | 'onsite' | 'hybrid';
  description: string;
  descriptionRu?: string;
  descriptionKz?: string;
  duration: string;
  applicationDeadline: string;
  category: string;
  skills: string[];
  isPaid: boolean;
  featured: boolean;
  appliedCount?: number;
  level?: string;
  externalUrl?: string;
  type?: 'full-time' | 'part-time' | 'remote';
  status?: 'active' | 'inactive' | 'draft';
  created_at?: string;
  requirements?: string[];
}

export interface InternshipApplication {
  id: number;
  internshipId: number;
  userId: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
  coverLetter?: string;
  resume?: string;
}

export interface InternshipFilter {
  search?: string;
  category?: string;
  locationType?: 'remote' | 'onsite' | 'hybrid';
  isPaid?: boolean;
  level?: string;
  sortBy?: 'newest' | 'popularity';
} 