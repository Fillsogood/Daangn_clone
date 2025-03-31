// src/components/AuthForm/LoginForm.tsx
import { useState } from 'react';
import styles from './LoginForm.module.css';
import { loginApi } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import React from 'react';
interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [form, setForm] = useState<LoginFormData>({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginApi(form);
      navigate('/'); // 로그인 성공 시 홈으로 이동
    } catch (err: any) {
      setError(err.response?.data?.error || '로그인 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>로그인</h2>
      <input
        name="email"
        type="email"
        placeholder="이메일"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        name="password"
        type="password"
        placeholder="비밀번호"
        value={form.password}
        onChange={handleChange}
        required
      />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit">로그인</button>
    </form>
  );
};

export default LoginForm;
