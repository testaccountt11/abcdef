import axios from 'axios';
import { CompetitionResponse } from '@/types/competitions';

const API_KEY = 'c7733276f0a36003b87d032fbb23acfe0f97aedf';
const API_SECRET = '98af2b6a8fa92f0aa5bf505bdc4c774db48bea62';

const api = axios.create({
  baseURL: 'https://clist.by/api/v2',
  headers: {
    'Authorization': `ApiKey ${API_KEY}:${API_SECRET}`,
    'Content-Type': 'application/json'
  }
});

export const getCompetitions = async () => {
  try {
    const response = await api.get<CompetitionResponse>('/contest/', {
      params: {
        upcoming: true,
        format: 'json',
        limit: 100,
        order_by: 'start'
      }
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching competitions:', error);
    throw error;
  }
}; 