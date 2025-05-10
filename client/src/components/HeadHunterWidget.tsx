import React, { useState, useEffect } from 'react';
import { Loader2, ExternalLink, AlertCircle, Check } from 'lucide-react';

interface HeadHunterWidgetProps {
  widgetType?: 'search' | 'similar' | 'employer';
  count?: number;
  area?: string | number;
  text?: string;
  employment?: string;
  locale?: 'RU' | 'EN';
  themeColor?: string;
}

const HeadHunterWidget: React.FC<HeadHunterWidgetProps> = ({
  widgetType = 'search',
  count = 6,
  area = 159, // Казахстан
  text = 'стажировка стажер intern практика',
  employment = 'probation',
  locale = 'RU',
  themeColor = '1560b2'
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [widgetId] = useState(`hh-widget-${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    let isMounted = true;
    let scriptElement: HTMLScriptElement | null = null;

    const loadWidget = async () => {
      try {
        if (!isMounted) return;
        
        setIsLoading(true);
        setError(null);
        
        // Формируем URL для виджета в зависимости от типа
        let widgetUrl = '';
        
        if (widgetType === 'search') {
          widgetUrl = `https://api.hh.ru/widgets/vacancies/search?count=${count}&locale=${locale}&links_color=${themeColor}&border_color=${themeColor}&employment=${employment}&area=${area}&text=${encodeURIComponent(text)}&host=hh.kz`;
        } else if (widgetType === 'employer') {
          widgetUrl = `https://api.hh.ru/widgets/employer?locale=${locale}&links_color=${themeColor}&border_color=${themeColor}&id=${area}`;
        } else if (widgetType === 'similar') {
          widgetUrl = `https://api.hh.ru/widgets/vacancies/similar?locale=${locale}&links_color=${themeColor}&border_color=${themeColor}&vacancy_id=${area}`;
        }
        
        // Удаляем старый скрипт, если он существует
        const oldScript = document.getElementById(widgetId + '-script');
        if (oldScript && oldScript.parentNode) {
          oldScript.parentNode.removeChild(oldScript);
        }
        
        // Создаем новый скрипт
        scriptElement = document.createElement('script');
        scriptElement.id = widgetId + '-script';
        scriptElement.src = widgetUrl;
        scriptElement.async = true;
        
        // Добавляем обработчики событий
        scriptElement.onerror = () => {
          if (isMounted) {
            setError('Не удалось загрузить виджет HeadHunter');
            setIsLoading(false);
          }
        };
        
        scriptElement.onload = () => {
          if (isMounted) {
            setIsLoading(false);
            setIsLoaded(true);
            console.log('HeadHunter виджет успешно загружен');
          }
        };
        
        // Вставляем скрипт в контейнер
        const widgetContainer = document.getElementById(widgetId);
        if (widgetContainer) {
          widgetContainer.appendChild(scriptElement);
        } else {
          setError('Контейнер виджета не найден');
          setIsLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Ошибка загрузки виджета HeadHunter:', err);
          setError('Произошла ошибка при загрузке виджета');
          setIsLoading(false);
        }
      }
    };

    loadWidget();
    
    // Функция очистки при размонтировании
    return () => {
      isMounted = false;
      
      // Удаляем скрипт при размонтировании
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, [widgetType, count, area, text, employment, locale, themeColor, widgetId]);
  
  return (
    <div className="w-full rounded-xl overflow-hidden bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold">
          {widgetType === 'search' ? 'Вакансии HeadHunter' : 
           widgetType === 'employer' ? 'Вакансии компании' : 
           'Похожие вакансии'}
        </h3>
        
        <div className="flex items-center">
          {isLoading && (
            <div className="flex items-center text-gray-500 text-sm">
              <Loader2 className="w-4 h-4 mr-1 animate-spin" />
              Загрузка...
            </div>
          )}
          
          {isLoaded && !error && (
            <div className="flex items-center text-green-500 text-sm">
              <Check className="w-4 h-4 mr-1" />
              Загружено
            </div>
          )}
          
          <a 
            href={`https://hh.kz/search/vacancy?${new URLSearchParams({
              text: text,
              area: area.toString(),
              employment: employment
            }).toString()}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 text-sm text-blue-600 hover:text-blue-800 flex items-center"
          >
            Все вакансии <ExternalLink className="w-3 h-3 ml-1" />
          </a>
        </div>
      </div>
      
      {error && (
        <div className="flex items-center justify-center p-6 text-red-500 text-sm border border-red-200 rounded-lg bg-red-50">
          <AlertCircle className="w-5 h-5 mr-2" />
          {error}
        </div>
      )}
      
      <div id={widgetId} className="hh-widget-container min-h-[200px]">
        {/* Виджет HeadHunter будет загружен сюда */}
      </div>
      
      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
        <span>Powered by HeadHunter API</span>
        <span>Last updated: {new Date().toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default HeadHunterWidget; 