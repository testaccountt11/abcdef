import { useEffect } from 'react';

interface GoogleTagManagerProps {
  id: string;
}

export function GoogleTagManager({ id }: GoogleTagManagerProps) {
  useEffect(() => {
    try {
      // Initialize dataLayer
      window.dataLayer = window.dataLayer || [];
      
      // Load GTM script
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
      script.onerror = () => {
        console.log('Google Tag Manager blocked or failed to load');
      };
      
      document.head.appendChild(script);

      // Initialize gtag
      window.gtag = function() {
        window.dataLayer.push(arguments);
      };
      window.gtag('js', new Date());
      window.gtag('config', id, {
        send_page_view: false // We'll handle page views manually
      });
    } catch (error) {
      console.log('Error initializing Google Tag Manager:', error);
    }
  }, [id]);

  return null;
}

// Add TypeScript declarations
declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
} 