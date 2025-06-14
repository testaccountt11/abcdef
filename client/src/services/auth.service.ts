import { apiRequest } from '@/lib/queryClient';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export const loginWithEmail = async (email: string, password: string) => {
  const response = await apiRequest('/auth/login', {
    method: 'POST',
    body: { email, password }
  });
  return response.user;
};

export const registerWithEmail = async (email: string, password: string, name: string) => {
  const response = await apiRequest('/auth/register', {
    method: 'POST',
    body: { email, password, name }
  });
  return response.user;
};

export const logout = async () => {
  await apiRequest('/auth/logout', { method: 'POST' });
};

export const resetPassword = async (email: string) => {
  await apiRequest('/auth/reset-password', {
    method: 'POST',
    body: { email }
  });
};

export const checkAuth = async () => {
  try {
    const response = await apiRequest('/auth/me', { method: 'GET' });
    return response.user;
  } catch (error) {
    return null;
  }
}; 