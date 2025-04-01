import { createContext } from 'react';

export interface AuthUser {
  id: number;
  nickname: string;
  email: string;
  region: {
    id: number;
    name: string;
  };
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: (_user: AuthUser) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
