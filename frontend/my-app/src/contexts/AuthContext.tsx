import React, { useState, useEffect, useCallback } from 'react';
import { getMeApi, logoutApi } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthUser } from './AuthContextContext';
import { setAuthHandlers } from './AuthState'; // 추가

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = (user: AuthUser) => {
    setUser(user);
  };

  const logout = useCallback(async () => {
    await logoutApi();
    setUser(null);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    setAuthHandlers(login, logout);
    const fetchMe = async () => {
      try {
        const data = await getMeApi();
        setUser(data.user);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
};
