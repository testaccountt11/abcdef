import { useAuthContext } from '@/contexts/AuthContext';
import { createContext, useContext } from 'react';

export type User = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
} | null;

export type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
});

export const useAuth = () => {
  const context = useAuthContext();
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}; 