import { useState } from 'react';
import styles from './LoginForm.module.css';
import { loginApi } from '../../api/auth';
import { getMeApi } from '../../api/user'; // getMeApi 추가
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth'; // context import
import React from 'react';
import KakaoLoginButton from './KakaoLoginButton';
interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const [form, setForm] = useState<LoginFormData>({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); //context login 함수 사용

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await loginApi(form); // 쿠키 저장됨
      const res = await getMeApi(); // 유저 정보 받아오기
      login(res.user); // context에 유저 저장
      navigate('/');
    } catch {
      setError('로그인 실패');
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
      <KakaoLoginButton />
    </form>
  );
};

export default LoginForm;
