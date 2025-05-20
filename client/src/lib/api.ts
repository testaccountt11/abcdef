const API_BASE_URL = 'http://localhost:3000';

export const api = {
  courses: {
    list: () => `${API_BASE_URL}/api/courses`,
    enroll: () => `${API_BASE_URL}/api/enrollments`,
    getEnrollments: () => `${API_BASE_URL}/api/enrollments`,
    getCourse: (id: string) => `${API_BASE_URL}/api/courses/${id}`,
  },
  stats: {
    get: () => `${API_BASE_URL}/api/stats`,
  },
  opportunities: {
    list: () => `${API_BASE_URL}/api/opportunities`,
  },
  mentors: {
    list: () => `${API_BASE_URL}/api/mentors`,
  },
  articles: {
    list: () => `${API_BASE_URL}/api/articles`,
  },
  auth: {
    login: () => `${API_BASE_URL}/api/auth/login`,
    register: () => `${API_BASE_URL}/api/auth/register`,
    me: () => `${API_BASE_URL}/api/auth/me`,
  },
}; 