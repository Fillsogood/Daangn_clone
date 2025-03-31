import api from './axios';

interface LoginInput {
  email: string;
  password: string;
}

export const loginApi = async (data: LoginInput) => {
  const res = await api.post('/auth/login', data, {});
  return res.data;
};

interface SignupInput {
  email: string;
  password: string;
  nickname: string;
  regionId: number;
}

export const signupApi = async (data: SignupInput) => {
  const res = await api.post('/auth/signup', data, {});
  return res.data;
};
