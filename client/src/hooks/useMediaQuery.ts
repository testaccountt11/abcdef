import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia(query);
      
      // Установить начальное значение
      setMatches(media.matches);
      
      // Обработчик изменений
      const listener = (e: MediaQueryListEvent) => {
        setMatches(e.matches);
      };
      
      // Добавить слушатель
      media.addEventListener('change', listener);
      
      // Очистка
      return () => {
        media.removeEventListener('change', listener);
      };
    }
    
    return undefined;
  }, [query]);
  
  return matches;
} 