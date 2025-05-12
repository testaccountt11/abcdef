import { ReactNode } from 'react';
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";

interface PublicPageLayoutProps {
  children: ReactNode;
}

export function PublicPageLayout({ children }: PublicPageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <Toaster />
    </div>
  );
} 