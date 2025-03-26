import { useAuthContext } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import UserProfile from "./UserProfile";
import { useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [location] = useLocation();
  const { user } = useAuthContext();
  
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
    { path: "/dashboard", icon: "ri-dashboard-line", label: "Dashboard" },
    { path: "/courses", icon: "ri-book-open-line", label: "Courses" },
    { path: "/opportunities", icon: "ri-briefcase-line", label: "Opportunities" },
    { path: "/mentors", icon: "ri-user-star-line", label: "Mentors" },
    { path: "/advice", icon: "ri-article-line", label: "Advice" },
    { path: "/certificates", icon: "ri-medal-line", label: "My Certificates" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && window.innerWidth < 768 && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={onClose}
        ></div>
      )}
      
      {/* Sidebar */}
      <aside 
        id="sidebar"
        className={`sidebar fixed inset-y-0 left-0 z-30 w-64 flex-col bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-200 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } flex md:flex`}
      >
        {/* Logo */}
        <div className="px-6 py-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-md bg-primary-600 flex items-center justify-center text-white mr-2">
              <i className="ri-stack-line text-xl"></i>
            </div>
            <span className="text-xl font-bold text-gray-900">Portfol.IO</span>
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
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <i className={`${link.icon} mr-3 ${location === link.path ? 'text-primary-500' : 'text-gray-400'}`}></i>
              {link.label}
            </a>
          ))}
        </nav>
        
        {/* User Profile */}
        {user && <UserProfile />}
      </aside>
    </>
  );
}
