import { NextApiRequest, NextApiResponse } from 'next';

// Константы для API
const HH_API_BASE_URL = 'https://api.hh.ru/vacancies';

// Простая локальная реализация rate limiting
const rateLimit = new Map<string, { count: number, timestamp: number }>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Базовый rate limiting
    const ip = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown') as string;
    const now = Date.now();
    const windowMs = 60 * 1000; // 1 минута
    const maxRequests = 10; // 10 запросов в минуту
    
    // Проверяем текущий счетчик для IP
    const current = rateLimit.get(ip) || { count: 0, timestamp: now };
    
    // Если прошла минута, сбрасываем счетчик
    if (now - current.timestamp > windowMs) {
      current.count = 0;
      current.timestamp = now;
    }
    
    // Увеличиваем счетчик
    current.count++;
    rateLimit.set(ip, current);
    
    // Устанавливаем заголовки для rate limiting
    res.setHeader('X-RateLimit-Limit', maxRequests.toString());
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - current.count).toString());
    
    // Если превышен лимит, возвращаем ошибку
    if (current.count > maxRequests) {
      return res.status(429).json({ 
        error: 'Too many requests',
        message: 'Превышен лимит запросов. Пожалуйста, повторите запрос позже.',
        retryAfter: Math.ceil((current.timestamp + windowMs - now) / 1000)
      });
    }

    // Получаем параметры из запроса с валидацией
    let { text, employment, area } = req.query;
    
    // Валидация параметров
    text = typeof text === 'string' ? text : 'стажировка';
    employment = typeof employment === 'string' ? employment : 'probation';
    area = typeof area === 'string' ? area : '159';

    // Формируем URL для запроса к API HeadHunter
    const url = new URL(HH_API_BASE_URL);
    url.searchParams.append('text', text);
    url.searchParams.append('employment', employment);
    url.searchParams.append('area', area);
    url.searchParams.append('per_page', '20');
    url.searchParams.append('page', '0');
    url.searchParams.append('host', 'hh.kz');

    // Добавляем заголовки для API HeadHunter
    const headers = {
      'User-Agent': 'Mozilla/5.0 (compatible; YourAppName/1.0; +https://example.com)',
      'HH-User-Agent': 'YourAppName/1.0 (example@example.com)',
    };

    console.log(`Выполняем запрос к HeadHunter API: ${url.toString()}`);

    // Добавляем таймаут для запроса
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 секунд
    
    try {
      // Выполняем запрос к API HeadHunter
      const response = await fetch(url.toString(), { 
        headers, 
        signal: controller.signal 
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HeadHunter API error: ${response.status}`);
      }

      const data = await response.json();

      // Устанавливаем заголовки кэширования
      res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
      
      // Отправляем данные клиенту
      return res.status(200).json(data);
    } catch (fetchError) {
      if (fetchError.name === 'AbortError') {
        throw new Error('HeadHunter API request timed out');
      }
      throw fetchError;
    }
  } catch (error) {
    console.error('Error fetching HeadHunter vacancies:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch vacancies',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 