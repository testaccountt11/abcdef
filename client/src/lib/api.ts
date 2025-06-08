import { User, Internship, Message } from '@/types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Users
export async function getUsers(): Promise<User[]> {
  return fetchWithAuth('/admin/users');
}

export async function updateUser(id: number, data: Partial<User>): Promise<User> {
  return fetchWithAuth(`/admin/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteUser(id: number): Promise<void> {
  await fetchWithAuth(`/admin/users/${id}`, {
    method: 'DELETE',
  });
}

// Internships
export async function getInternships(): Promise<Internship[]> {
  return fetchWithAuth('/admin/internships');
}

export async function updateInternship(id: number, data: Partial<Internship>): Promise<Internship> {
  return fetchWithAuth(`/admin/internships/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteInternship(id: number): Promise<void> {
  await fetchWithAuth(`/admin/internships/${id}`, {
    method: 'DELETE',
  });
}

// Messages
export async function getMessages(): Promise<Message[]> {
  return fetchWithAuth('/admin/messages');
}

export async function updateMessage(id: number, data: Partial<Message>): Promise<Message> {
  return fetchWithAuth(`/admin/messages/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

export async function deleteMessage(id: number): Promise<void> {
  await fetchWithAuth(`/admin/messages/${id}`, {
    method: 'DELETE',
  });
}

// Dashboard Stats
export interface DashboardStats {
  totalUsers: number;
  totalInternships: number;
  totalApplications: number;
  totalMessages: number;
  recentActivity: {
    id: number;
    type: 'user_registered' | 'application_submitted' | 'message_received' | 'internship_created';
    description: string;
    timestamp: string;
  }[];
}

export async function getDashboardStats(): Promise<DashboardStats> {
  return fetchWithAuth('/admin/stats');
}

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