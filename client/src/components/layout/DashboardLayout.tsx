import { useAuthContext } from "@/contexts/AuthContext";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { useEffect } from "react";
import { useLocation } from "wouter";
import type { User } from '@/types/user';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, isAuthenticated } = useAuthContext();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (!isAuthenticated) {
      setLocation('/login');
    }
  }, [isAuthenticated, setLocation]);

  if (!user) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <div className="flex-1">
          <DashboardNavbar user={user} />
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
} 