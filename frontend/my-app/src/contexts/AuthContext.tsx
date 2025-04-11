import React, { useState, useEffect, useCallback } from 'react';
import { logoutApi } from '../api/auth';
import { getMeApi } from '../api/user';
import { useNavigate } from 'react-router-dom';
import { AuthContext, AuthUser } from './AuthContextContext';
import { setAuthHandlers } from './AuthState';

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = useCallback((user: AuthUser) => {
    setUser(user);
  }, []);

  const logout = useCallback(async () => {
    await logoutApi();
    setUser(null);
    navigate('/');
  }, [navigate]);

  useEffect(() => {
    const fetchMe = async () => {
      setAuthHandlers(login, logout);
      try {
        const data = await getMeApi();
        if (data.user) {
          setUser(data.user);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
      } finally {
        setLoading(false); // <- 이걸 너무 빨리 하지 않아야 함
      }
    };

    fetchMe();
  }, [login, logout]);

  if (loading) return null;
  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>{children}</AuthContext.Provider>
  );
};
