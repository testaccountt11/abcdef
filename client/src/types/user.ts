export interface User {
  id: number;
  email: string;
  name: string;
  role: 'admin' | 'user' | 'mentor';
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
  profile?: {
    avatar_url?: string;
    bio?: string;
    location?: string;
    company?: string;
    position?: string;
  };
} 