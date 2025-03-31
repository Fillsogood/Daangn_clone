// src/components/AuthForm/SignupForm.tsx
import { useState } from 'react';
import styles from './SignupForm.module.css';
import { signupApi } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import React from 'react';

interface SignupFormData {
  email: string;
  password: string;
  nickname: string;
  regionId: number;
}

const SignupForm = () => {
  const [form, setForm] = useState<SignupFormData>({
    email: '',
    password: '',
    nickname: '',
    regionId: 1, // 기본 지역
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'regionId' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signupApi(form);
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || '회원가입 실패');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>회원가입</h2>
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
      <input
        name="nickname"
        type="text"
        placeholder="닉네임"
        value={form.nickname}
        onChange={handleChange}
        required
      />
      <select name="regionId" value={form.regionId} onChange={handleChange}>
        <option value={1}>서울 강남구</option>
        <option value={2}>서울 서초구</option>
        <option value={3}>서울 송파구</option>
        {/* ⚠️ 실제 지역 목록은 API로 받아서 처리하는 것이 이상적 */}
      </select>
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignupForm;
