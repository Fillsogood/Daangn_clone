import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5173',
  withCredentials: true, // 쿠키 사용 시 필수
});

export default api;
