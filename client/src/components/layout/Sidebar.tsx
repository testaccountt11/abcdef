import { useAuthContext } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import UserProfile from "./UserProfile";
import SettingsPanel from "./SettingsPanel";
import { useTheme } from "@/contexts/ThemeContext";
import { useEffect } from "react";
import { getTranslation } from "@/lib/translations";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  const { user } = useAuthContext();
  const { language } = useTheme();
  
  // Function to get translated text
  const t = (key: string) => getTranslation(key as any, language);
  
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
    { path: "/dashboard", icon: "ri-dashboard-line", labelKey: "dashboard.home" },
    { path: "/courses", icon: "ri-book-open-line", labelKey: "dashboard.courses" },
    { path: "/opportunities", icon: "ri-briefcase-line", labelKey: "dashboard.opportunities" },
    { path: "/mentors", icon: "ri-user-star-line", labelKey: "dashboard.mentors" },
    { path: "/advice", icon: "ri-article-line", labelKey: "dashboard.advice" },
    { path: "/achievements", icon: "ri-award-line", labelKey: "dashboard.achievements" },
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
        className={`sidebar fixed inset-y-0 left-0 z-30 w-64 flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-sm transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } flex md:flex`}
      >
        {/* Logo */}
        <div className="px-6 py-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-primary-600 flex items-center justify-center text-white mr-2">
              <i className="ri-stack-line text-xl"></i>
            </div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">Portfol.IO</span>
          </div>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {links.map((link) => (
            <a 
              key={link.path}
              href={link.path}
              className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                location === link.path 
                  ? "bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <i className={`${link.icon} mr-3 ${location === link.path ? "text-primary-500" : "text-gray-400"}`}></i>
              {t(link.labelKey)}
            </a>
          ))}
        </nav>
        
        {/* Settings Panel */}
        <SettingsPanel />
        
        {/* User Profile */}
        {user && <UserProfile />}
      </aside>
    </>
  );
}
