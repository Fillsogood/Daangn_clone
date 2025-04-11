import { useState, useEffect } from 'react';
import React from 'react';
import styles from './SignupForm.module.css';
import { signupApi } from '../../api/auth';
import { fetchRegions, Region } from '../../api/region';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    nickname: '',
    regionId: 1,
  });
  const [regions, setRegions] = useState<Region[]>([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 지역 목록 불러오기
  useEffect(() => {
    const loadRegions = async () => {
      try {
        const res = await fetchRegions();
        setRegions(res);
        if (res.length > 0) {
          setForm((prev) => ({ ...prev, regionId: res[0].id }));
        }
      } catch {
        setError('지역 정보를 불러올 수 없습니다.');
      }
    };
    loadRegions();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'regionId' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signupApi(form);
      alert('회원가입이 완료되었습니다!');
      navigate('/login');
    } catch {
      setError('회원가입 실패');
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

      <select name="regionId" value={form.regionId} onChange={handleChange} required>
        {regions.map((region) => (
          <option key={region.id} value={region.id}>
            {region.name}
          </option>
        ))}
      </select>

      {error && <p className={styles.error}>{error}</p>}
      <button type="submit">회원가입</button>
    </form>
  );
};

export default SignupForm;
