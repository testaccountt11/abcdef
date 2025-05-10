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

    try {
      // Выполняем запрос к API HeadHunter
      const response = await fetch(url.toString(), { headers });
      
      if (!response.ok) {
        throw new Error(`HeadHunter API error: ${response.status}`);
      }

      const data = await response.json();

      // Устанавливаем заголовки кэширования
      res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
      
      // Отправляем данные клиенту
      return res.status(200).json(data);
    } catch (error: unknown) {
      // Проверяем тип ошибки
      if (error instanceof Error) {
        throw new Error(`API request failed: ${error.message}`);
      }
      throw error;
    }
  } catch (error) {
    console.error('Error fetching HeadHunter vacancies:', error);
    return res.status(500).json({ 
      error: 'Failed to fetch vacancies',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
