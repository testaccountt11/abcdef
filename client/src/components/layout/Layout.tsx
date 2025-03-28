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
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card hidden md:flex md:flex-col">
        <div className="p-4 border-b border-border">
          <div className="font-bold text-xl flex items-center">
            <span className="text-primary">Portfol.IO</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path}>
              <a 
                className={`flex items-center gap-3 px-3 py-2 rounded-md
                  ${location === item.path 
                    ? 'bg-accent text-accent-foreground font-medium' 
                    : 'text-muted-foreground hover:bg-accent/50'}
                `}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.path === '/achievements' && (
                  <Badge className="ml-auto bg-primary text-primary-foreground">2</Badge>
                )}
              </a>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <Link href="/profile">
            <a className={`flex items-center gap-3 px-3 py-2 rounded-md
              ${location === '/profile'
                ? 'bg-accent text-accent-foreground font-medium' 
                : 'text-muted-foreground hover:bg-accent/50'}
            `}>
              <User className="w-5 h-5" />
              <span>{getTranslation('dashboard.profile', language)}</span>
            </a>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <header className="h-16 border-b border-border flex items-center px-4 justify-between">
          <div className="md:hidden font-bold text-lg text-primary">Portfol.IO</div>
          
          <div className="hidden md:flex items-center relative max-w-md w-full">
            <Search className="w-4 h-4 absolute left-3 text-muted-foreground" />
            <Input 
              className="pl-10" 
              placeholder="Search..." 
              type="search"
            />
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeSwitcher />
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="relative">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>New achievement unlocked</DropdownMenuItem>
                <DropdownMenuItem>New course recommendation</DropdownMenuItem>
                <DropdownMenuItem>Message from mentor</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Link href="/profile">
              <a className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-medium">
                  US
                </div>
                <span className="hidden sm:inline font-medium">User</span>
              </a>
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;