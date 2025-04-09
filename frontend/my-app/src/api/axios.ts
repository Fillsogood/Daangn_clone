import axios from 'axios';
import { getMeApi } from './user';
import { triggerLogin, triggerLogout } from '../contexts/AuthState';

// 전역 상태
let isRefreshing = false;
let refreshSubscribers: ((_token?: string) => void)[] = [];

function onRefreshed(_token?: string) {
  refreshSubscribers.forEach((callback) => callback(_token));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback: (_token?: string) => void) {
  refreshSubscribers.push(callback);
}

// Axios 인스턴스
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  withCredentials: true,
});

// 인터셉터
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

      if (isRefreshing) {
        // 이미 refresh 중이면 기다림
        return new Promise((resolve) => {
          addRefreshSubscriber(() => {
            resolve(api(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        await api.get('/auth/refresh');
        const me = await getMeApi();
        triggerLogin(me.user);

        onRefreshed(); // 대기 중이던 요청들 실행
        return api(originalRequest);
      } catch (refreshError) {
        triggerLogout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    if (
      error.response?.status === 403 &&
      error.response?.data?.error?.includes('재사용된 Refresh Token')
    ) {
      triggerLogout();
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);

export default api;
