import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContextContext';

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthContext is not available');
  return ctx;
};
