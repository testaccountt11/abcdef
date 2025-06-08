import { HHVacancy } from '../types/headhunter';
import type { HHResume } from "../types/headhunter";

const HH_API_BASE_URL = 'https://api.hh.ru';

interface SearchParams {
  text?: string;
  area?: string | number; // Код региона (Казахстан = 40)
  experience?: string; // noExperience, between1And3, between3And6, moreThan6
  schedule?: string; // fullDay, shift, flexible, remote, flyInFlyOut
  industry?: string;
  per_page?: number;
  page?: number;
  order_by?: string; // relevance, publication_time, salary_desc, salary_asc
  period?: number; // Количество дней, в пределах которых нужно найти вакансии
  professional_role?: string;
  employment?: string; // probation, full, part, project, volunteer
}

class HeadHunterAPI {
  private baseUrl: string;
  private defaultParams: SearchParams;

  constructor() {
    this.baseUrl = HH_API_BASE_URL;
    this.defaultParams = {
      area: 40, // Казахстан
      per_page: 100,
      period: 30, // За последние 30 дней
    };
  }

  private async fetchWithHeaders(endpoint: string, params: SearchParams = {}): Promise<any> {
    const queryParams = new URLSearchParams({
      ...this.defaultParams,
      ...params,
    } as any).toString();

    const url = `${this.baseUrl}${endpoint}?${queryParams}`;
    console.log('Fetching URL:', url);

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Portfol.io Job Search App (info@portfol.io)',
        'Accept': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error response:', errorText);
      throw new Error(`HeadHunter API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('API Response data:', data);
    return data;
  }

  async searchVacancies(params: SearchParams = {}): Promise<{ items: HHVacancy[], found: number, pages: number, per_page: number, page: number }> {
    const searchParams = {
      text: 'стажер',
      area: '40',
      per_page: 100,
      order_by: 'publication_time'
    };

    console.log('Search params:', searchParams);
    return this.fetchWithHeaders('/vacancies', searchParams);
  }

  async getVacancy(id: string): Promise<HHVacancy> {
    return this.fetchWithHeaders(`/vacancies/${id}`);
  }

  async getAreas(): Promise<any> {
    return this.fetchWithHeaders('/areas');
  }

  async getIndustries(): Promise<any> {
    return this.fetchWithHeaders('/industries');
  }

  async getDictionaries(): Promise<any> {
    return this.fetchWithHeaders('/dictionaries');
  }
}

export const headHunterAPI = new HeadHunterAPI();

const HH_API_URL = 'https://api.hh.ru';

export async function fetchHHResume(resumeId: string): Promise<HHResume> {
  const response = await fetch(`${HH_API_URL}/resumes/${resumeId}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch resume: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchHHResumes(query: string = '', page: number = 1, perPage: number = 20): Promise<{
  items: HHResume[];
  found: number;
  pages: number;
  page: number;
  per_page: number;
}> {
  const params = new URLSearchParams({
    text: query,
    page: page.toString(),
    per_page: perPage.toString(),
  });

  const response = await fetch(`${HH_API_URL}/resumes?${params.toString()}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch resumes: ${response.statusText}`);
  }

  return response.json();
} 