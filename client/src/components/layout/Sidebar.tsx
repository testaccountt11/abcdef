import { useAuthContext } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import UserProfile from "./UserProfile";
import SettingsPanel from "./SettingsPanel";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect } from "react";
import { useTranslations } from "@/hooks/use-translations";
import { ChevronLeft, ChevronRight, Home } from "lucide-react";
import logoLight from '../../img/light_version.svg';
import logoDark from '../../img/dark_version.svg';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  isCollapsed: boolean;
}

export default function Sidebar({ isOpen, onClose, onToggle, isCollapsed }: SidebarProps) {
  const [location] = useLocation();
  const { user } = useAuthContext();
  const { theme } = useTheme();
  
  // Use the hook for translations
  const { t } = useTranslations();
  
  // Determine which logo to use based on theme
  const isDarkMode = theme === 'dark' || 
    (theme === 'system' && typeof window !== 'undefined' && 
     window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const logoSrc = isDarkMode ? logoDark : logoLight;
  
  // Handle clicks outside sidebar on mobile
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const sidebarElement = document.getElementById('sidebar');
      if (sidebarElement && !sidebarElement.contains(e.target as Node) && isOpen) {
        onClose();
      }
    };

    // Only add this handler if we're on mobile
    if (window.innerWidth < 768 && isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen, onClose]);
  
  // Close sidebar on location change (mobile only)
  useEffect(() => {
    if (window.innerWidth < 768) {
      onClose();
    }
  }, [location, onClose]);

  const links = [
    { path: "/", icon: "ri-home-line", labelKey: "dashboard.mainPage" },
    { path: "/dashboard", icon: "ri-dashboard-line", labelKey: "dashboard.home" },
    { path: "/courses", icon: "ri-book-open-line", labelKey: "dashboard.courses" },
    { path: "/mentors", icon: "ri-user-star-line", labelKey: "dashboard.mentors" },
    { path: "/certificates", icon: "ri-medal-line", labelKey: "dashboard.certificates" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && window.innerWidth < 768 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        id="sidebar"
        className={`sidebar fixed inset-y-0 left-0 z-30 ${isCollapsed ? 'w-20' : 'w-64'} flex-col bg-card/80 backdrop-blur-sm border-r border-border/30 shadow-sm transform transition-all duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } flex md:flex`}
      >
        {/* Logo and Toggle Button */}
        <div className="px-4 py-6 flex items-center justify-between relative">
          <div className={`logo-container transition-all duration-200 ${isCollapsed ? 'hidden' : 'flex items-center'}`}>
            <img src={logoSrc} alt="Portfol.IO" className="h-8 w-auto" />
          </div>
          
          {/* Collapse toggle button (desktop only) */}
          <button 
            onClick={onToggle}
            className={`p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors hidden md:flex ${isCollapsed ? 'absolute left-1/2 -translate-x-1/2' : ''}`}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map((link) => (
            <a 
              key={link.path}
              href={link.path}
              className={`flex items-center ${isCollapsed ? 'justify-center' : ''} px-3 py-2 text-sm font-medium rounded-md ${
                location === link.path 
                  ? "bg-primary/10 text-primary"
                  : "text-foreground/70 hover:bg-muted hover:text-foreground"
              }`}
              title={isCollapsed ? t(link.labelKey) : undefined}
            >
              <i className={`${link.icon} ${isCollapsed ? '' : 'mr-3'} ${location === link.path ? "text-primary" : "text-foreground/70"}`}></i>
              {!isCollapsed && <span>{t(link.labelKey)}</span>}
            </a>
          ))}
        </nav>
        
        {/* Settings Panel (hide when collapsed) */}
        {!isCollapsed && <SettingsPanel />}
        
        {/* User Profile (hide when collapsed) */}
        {user && !isCollapsed && <UserProfile />}
      </aside>
    </>
  );
}

export function SidebarWithProvider(props: SidebarProps) {
  const { AuthProvider } = require('@/contexts/AuthContext');
  return (
    <AuthProvider>
      <Sidebar {...props} />
    </AuthProvider>
  );
}
