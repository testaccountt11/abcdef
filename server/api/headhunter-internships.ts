import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { text = 'стажировка стажер intern практика', area = '159', employment = 'probation' } = req.query;
    
    let apiUrl = 'https://api.hh.ru/vacancies?';
    apiUrl += `text=${encodeURIComponent(String(text))}&`;
    apiUrl += `area=${area}&`;
    apiUrl += `employment=${employment}&`;
    apiUrl += 'per_page=30';
    
    console.log('Requesting HeadHunter API:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'User-Agent': 'ВашСайт/1.0 (ваш@email.com)',
        'HH-User-Agent': 'ВашСайт/1.0 (ваш@email.com)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.items || data.items.length === 0) {
      console.log('No internships found in HeadHunter API');
      return res.status(200).json(getFallbackData());
    }
    
    // Кэшируем результаты на стороне клиента на 1 час
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.status(200).json(data);
  } catch (error) {
    console.error('HeadHunter API error:', error);
    res.status(200).json(getFallbackData());
  }
}

// Функция для получения запасных данных в случае ошибки API
function getFallbackData() {
  return {
    items: [
      {
        id: "1001",
        name: "Стажер-разработчик (Frontend)",
        employer: {
          name: "ООО Технологии будущего",
          logo_urls: {
            original: "https://hhcdn.ru/employer-logo/5578232.png"
          }
        },
        area: { name: "Алматы" },
        snippet: {
          responsibility: "Разработка интерфейсов, тестирование и отладка кода, работа с React и TypeScript"
        },
        alternate_url: "https://hh.kz/search/vacancy?text=стажер",
        salary: { from: 150000, to: 200000, currency: "KZT" },
        professional_roles: [{ name: "Программист, разработчик" }],
        key_skills: [{ name: "React" }, { name: "TypeScript" }],
        published_at: new Date().toISOString(),
        schedule: { id: "fullDay", name: "Полный день" }
      },
      {
        id: "1002",
        name: "Стажер по маркетингу",
        employer: {
          name: "Kaspi Bank",
          logo_urls: {
            original: "https://hhcdn.ru/employer-logo/3504603.jpeg"
          }
        },
        area: { name: "Астана" },
        snippet: {
          responsibility: "Помощь в проведении маркетинговых исследований, анализ рынка и конкурентов"
        },
        alternate_url: "https://hh.kz/search/vacancy?text=стажер+маркетинг",
        salary: { from: 100000, to: 150000, currency: "KZT" },
        professional_roles: [{ name: "Маркетолог" }],
        key_skills: [{ name: "Маркетинговый анализ" }, { name: "SMM" }],
        published_at: new Date().toISOString(),
        schedule: { id: "fullDay", name: "Полный день" }
      },
      {
        id: "1003",
        name: "Стажер-аналитик данных",
        employer: {
          name: "Колеса Групп",
          logo_urls: {
            original: "https://hhcdn.ru/employer-logo/3785887.png"
          }
        },
        area: { name: "Алматы" },
        snippet: {
          responsibility: "Обработка и анализ данных, создание отчетов и визуализаций, работа с SQL и Python"
        },
        alternate_url: "https://hh.kz/search/vacancy?text=стажер+аналитик",
        salary: { from: 120000, to: 180000, currency: "KZT" },
        professional_roles: [{ name: "Аналитик" }],
        key_skills: [{ name: "SQL" }, { name: "Python" }, { name: "Data Analysis" }],
        published_at: new Date().toISOString(),
        schedule: { id: "fullDay", name: "Полный день" }
      }
    ],
    found: 3,
    pages: 1,
    per_page: 30,
    page: 0
  };
} 