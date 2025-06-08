import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import { useIsMobile } from "@/hooks/use-mobile";
import { Menu } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import logoLight from '../../img/light_version.svg';
import logoDark from '../../img/dark_version.svg';

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // Store the collapsed state in localStorage
  useEffect(() => {
    const storedCollapsedState = localStorage.getItem('sidebarCollapsed');
    if (storedCollapsedState) {
      setIsSidebarCollapsed(storedCollapsedState === 'true');
    }
  }, []);
  
  // Save the sidebar state when it changes
  useEffect(() => {
    localStorage.setItem('sidebarCollapsed', isSidebarCollapsed.toString());
  }, [isSidebarCollapsed]);
  
  useEffect(() => {
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);
  
  // Toggle sidebar collapse state
  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };
  
  // Determine which logo to use based on theme
  const isDarkMode = theme === 'dark' || 
    (theme === 'system' && typeof window !== 'undefined' && 
     window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  const logoSrc = isDarkMode ? logoDark : logoLight;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        onToggle={toggleSidebar} 
        isCollapsed={isSidebarCollapsed} 
      />
      
      {/* Main Content */}
      <main 
        className={`main-content flex-1 overflow-y-auto overflow-x-hidden transition-all duration-200
          ${isSidebarOpen && !isMobile 
            ? isSidebarCollapsed 
              ? 'md:ml-20' // When collapsed
              : 'md:ml-64' // When expanded
            : ''
          }`}
      >
        {/* Mobile Header */}
        {isMobile && (
          <div className="md:hidden bg-card/80 backdrop-blur-sm border-b border-border/30 p-4 sticky top-0 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img src={logoSrc} alt="Portfol.IO" className="h-8 w-auto mr-2" />
              </div>
              <button
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                onClick={() => setIsSidebarOpen(true)}
                aria-label="Open menu"
                >
                <Menu size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Page Content */}
        {children}
      </main>
      
      {/* Mobile Navigation (Bottom) */}
      {isMobile && <MobileNav />}
    </div>
  );
}
