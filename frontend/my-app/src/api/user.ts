import api from './axios';

interface User {
  id: number;
  nickname: string;
  email: string;
  region: {
    id: number;
    name: string;
  };
}

export const getMeApi = async (): Promise<{ user: User }> => {
  const res = await api.get<{ user: User }>('/users/me');
  return res.data;
};

interface UserInput {
  nickname: string;
  email: string;
  region: number;
}

export const updateMeApi = async (data: UserInput): Promise<{ user: User }> => {
  const res = await api.patch<{ user: User }>('/users/me', data);
  return res.data;
};
