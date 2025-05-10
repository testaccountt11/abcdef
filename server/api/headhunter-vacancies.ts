import { NextApiRequest, NextApiResponse } from 'next';
import { Redis } from '@upstash/redis';
import { Ratelimit } from '@upstash/ratelimit';

// Создаем Redis клиент для ограничения частоты запросов
// Если у вас нет Redis, можно использовать локальное решение с Map
const ratelimitMap = new Map();
let lastReset = Date.now();

// Функция для ограничения частоты запросов без Redis
function localRateLimit(ip: string, limit: number, windowMs: number): { success: boolean, remaining: number, reset: number } {
  const now = Date.now();
  // Сбрасываем счетчики, если прошло время окна
  if (now - lastReset > windowMs) {
    ratelimitMap.clear();
    lastReset = now;
  }
  
  const key = `ratelimit_${ip}`;
  const count = (ratelimitMap.get(key) || 0) + 1;
  ratelimitMap.set(key, count);
  
  return {
    success: count <= limit,
    remaining: Math.max(0, limit - count),
    reset: lastReset + windowMs
  };
}

// Константы для API
const HH_API_BASE_URL = 'https://api.hh.ru/vacancies';
const RATE_LIMIT = 10; // Запросов в минуту
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 минута

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Получаем IP адрес для ограничения частоты запросов
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown';
    const rateLimit = localRateLimit(
      typeof ip === 'string' ? ip : Array.isArray(ip) ? ip[0] : 'unknown',
      RATE_LIMIT,
      RATE_LIMIT_WINDOW
    );

    // Устанавливаем заголовки X-RateLimit
    res.setHeader('X-RateLimit-Limit', RATE_LIMIT.toString());
    res.setHeader('X-RateLimit-Remaining', rateLimit.remaining.toString());
    res.setHeader('X-RateLimit-Reset', rateLimit.reset.toString());

    // Проверяем, не превышен ли лимит запросов
    if (!rateLimit.success) {
      return res.status(429).json({ 
        error: 'Too many requests',
        message: 'Превышен лимит запросов. Пожалуйста, повторите запрос позже.',
        retryAfter: Math.ceil((rateLimit.reset - Date.now()) / 1000)
      });
    }

    // Получаем параметры из запроса с валидацией
    let { text, employment, area } = req.query;
    
    // Валидация параметров
    text = typeof text === 'string' ? text : 'стажировка';
    employment = typeof employment === 'string' ? employment : 'probation';
    area = typeof area === 'string' ? area : '159';

    // Проверка параметров на наличие вредоносного кода
    const validateParam = (param: string) => {
      // Простая валидация - можно расширить при необходимости
      return param.replace(/[^\w\s+\-.,]/g, '');
    };

    text = validateParam(text);
    employment = validateParam(employment);
    area = validateParam(area);

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
        const errorData = await response.text();
        console.error(`HeadHunter API ответил с ошибкой ${response.status}: ${errorData}`);
        throw new Error(`HeadHunter API error: ${response.status} - ${errorData}`);
      }

      const data = await response.json();

      // Валидация ответа
      if (!data || !data.items || !Array.isArray(data.items)) {
        console.error('Неожиданный формат ответа от HeadHunter API:', data);
        throw new Error('Unexpected response format from HeadHunter API');
      }

      // Устанавливаем заголовки кэширования
      res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
      
      // Отправляем данные клиенту
      return res.status(200).json(data);
    } catch (fetchError) {
      if (fetchError.name === 'AbortError') {
        console.error('Запрос к HeadHunter API прерван из-за таймаута');
        throw new Error('HeadHunter API request timed out');
      }
      throw fetchError;
    }
  } catch (error) {
    console.error('Error fetching HeadHunter vacancies:', error);
    // Определяем тип ошибки и возвращаем соответствующий статус
    const status = error.message?.includes('timed out') ? 504 :
                   error.message?.includes('API error') ? 502 : 
                   500;
                   
    return res.status(status).json({ 
      error: 'Failed to fetch vacancies',
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
      path: req.url
    });
  }
} 