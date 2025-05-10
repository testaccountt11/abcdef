import { NextApiRequest, NextApiResponse } from 'next';

// Константы для API
const HH_API_BASE_URL = 'https://api.hh.ru/vacancies';

// Простая локальная реализация rate limiting
const rateLimit = new Map<string, { count: number, timestamp: number }>();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Для начала всегда возвращаем тестовые данные
  const sampleData = {
    items: [
      {
        id: "123456",
        name: "Frontend стажер",
        employer: {
          name: "ТехноКомпания",
          logo_urls: {
            original: "https://via.placeholder.com/150"
          }
        },
        area: {
          name: "Астана"
        },
        salary: {
          from: 100000,
          to: 200000,
          currency: "KZT" 
        },
        snippet: {
          requirement: "Знание JavaScript, React",
          responsibility: "Разработка веб-приложений"
        },
        schedule: {
          id: "remote",
          name: "Удаленно"
        },
        experience: {
          id: "noExperience",
          name: "Нет опыта"
        },
        key_skills: [
          { name: "JavaScript" },
          { name: "React" }
        ],
        published_at: "2023-05-01",
        alternate_url: "https://hh.ru/vacancy/123456"
      },
      {
        id: "789012",
        name: "Intern Java Developer",
        employer: {
          name: "ITSolutions",
          logo_urls: {
            original: "https://via.placeholder.com/150" 
          }
        },
        area: {
          name: "Алматы"
        },
        salary: null,
        snippet: {
          requirement: "Базовые знания Java, Spring",
          responsibility: "Помощь в разработке серверной части"
        },
        schedule: {
          id: "fullDay",
          name: "Полный день"
        },
        experience: {
          id: "noExperience",
          name: "Нет опыта"
        },
        key_skills: [
          { name: "Java" },
          { name: "Spring" }
        ],
        published_at: "2023-05-05",
        alternate_url: "https://hh.ru/vacancy/789012"
      }
    ],
    found: 2,
    pages: 1,
    per_page: 20,
    page: 0
  };

  // Устанавливаем заголовки кэширования
  res.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  
  // Отправляем данные клиенту
  return res.status(200).json(sampleData);
}
