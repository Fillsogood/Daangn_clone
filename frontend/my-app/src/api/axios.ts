import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api',
  withCredentials: true, // 쿠키 사용 시 필수
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 액세스 토큰 만료로 401이 뜨고, 아직 재시도 안했을 때만
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      try {
        // 리프레시 요청
        await api.get('/auth/refresh');

        // 기존 요청 다시 시도
        return api(originalRequest);
      } catch (refreshError) {
        // refresh 실패 시 → 로그인 페이지로 이동
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
