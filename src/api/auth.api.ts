import { api } from './client';
import { User } from '../types';

interface RegisterData { email: string; password: string; name: string; }
interface LoginData { email: string; password: string; }
interface AuthResponse { accessToken: string; }

export const authApi = {
  register: (data: RegisterData) => api.post<User>('/auth/register', data),
  login: (data: LoginData) => api.post<AuthResponse>('/auth/login', data),
  me: () => api.get<User>('/users/me'),
};
