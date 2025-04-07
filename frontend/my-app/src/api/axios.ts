// api/axios.ts
import axios from 'axios';
import { getMeApi } from './user';
import { triggerLogin, triggerLogout } from '../contexts/AuthState';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        await api.get('/auth/refresh');
        const me = await getMeApi();
        triggerLogin(me.user);
        return api(originalRequest);
      } catch (refreshError) {
        triggerLogout();

        // ✅ 여기서 새로고침 하지 말고 그냥 reject
        return Promise.reject(refreshError);
      }
    }

    if (
      error.response?.status === 403 &&
      error.response?.data?.error?.includes('재사용된 Refresh Token')
    ) {
      triggerLogout();

      // ✅ 마찬가지로 강제 새로고침 말고 reject
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
