import React from 'react';
import { 
  Home, BookOpen, Briefcase, Users, HelpCircle, Award, 
  Scroll, Settings, User, Bell, Search
} from 'lucide-react';
import { Link, useLocation } from 'wouter';
import { getTranslation } from '@/lib/translations';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import LanguageSwitcher from '@/components/LanguageSwitcher';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const { language } = useTheme();
  
  // Don't render layout on profile page
  if (location === '/profile') {
    return <>{children}</>;
  }
  
  const navItems = [
    { path: '/dashboard', icon: <Home className="w-5 h-5" />, label: getTranslation('dashboard.home', language) },
    { path: '/courses', icon: <BookOpen className="w-5 h-5" />, label: getTranslation('dashboard.courses', language) },
    { path: '/opportunities', icon: <Briefcase className="w-5 h-5" />, label: getTranslation('dashboard.opportunities', language) },
    { path: '/mentors', icon: <Users className="w-5 h-5" />, label: getTranslation('dashboard.mentors', language) },
    { path: '/advice', icon: <HelpCircle className="w-5 h-5" />, label: getTranslation('dashboard.advice', language) },
    { path: '/achievements', icon: <Award className="w-5 h-5" />, label: getTranslation('dashboard.achievements', language) },
    { path: '/certificates', icon: <Scroll className="w-5 h-5" />, label: getTranslation('dashboard.certificates', language) },
    { path: '/settings', icon: <Settings className="w-5 h-5" />, label: getTranslation('dashboard.settings', language) },
  ];

  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
};

export default Layout;