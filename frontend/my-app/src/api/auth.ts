// src/api/auth.ts
import api from './axios';

export interface LoginInput {
  email: string;
  password: string;
}

export const loginApi = async (data: LoginInput) => {
  const res = await api.post('/auth/login', data);
  return res.data;
};

export interface SignupInput {
  email: string;
  password: string;
  nickname: string;
  regionId: number;
}

export const signupApi = async (data: SignupInput) => {
  const res = await api.post('/auth/signup', data);
  return res.data;
};

export const logoutApi = async () => {
  const res = await api.post('/auth/logout');
  return res.data;
};
