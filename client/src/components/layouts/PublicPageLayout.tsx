import { ReactNode, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { Footer } from "@/components/Footer";
import { FloatingChatButton } from "@/components/AIChat/FloatingChatButton";

interface PublicPageLayoutProps {
  children: ReactNode;
}

export function PublicPageLayout({ children }: PublicPageLayoutProps) {
  useEffect(() => {
    // Предварительная загрузка компонента чата
    const preloadChat = () => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = '/src/components/AIChat/AIChat.tsx';
      document.head.appendChild(link);
    };

    // Загружаем после того, как основной контент загрузился
    window.requestIdleCallback 
      ? window.requestIdleCallback(preloadChat) 
      : setTimeout(preloadChat, 1000);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col">
        {children}
      </main>
      <Footer />
      <Toaster />
      <FloatingChatButton />
    </div>
  );
} 