// src/components/PostForm.tsx
import { useState } from 'react';
import styles from './PostCreate.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../api/post';
import { uploadToS3 } from '../../utils/uploadToS3';

const PostForm = () => {
  const [form, setForm] = useState<{
    title: string;
    content: string;
    price: number;
    images: string[]; // never[] 대신 string[]로 타입 지정
  }>({
    title: '',
    content: '',
    price: 0,
    images: [],
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'price' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createPost(form);
      alert('게시글이 등록되었습니다!');
      navigate('/');
    } catch {
      setError('등록 실패');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadToS3(file);
      setForm((prev) => ({
        ...prev,
        images: prev.images.length === 0 ? [imageUrl] : [...prev.images, imageUrl], // 빈 배열 체크
      }));
    } catch {
      setError('이미지 업로드 실패');
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>게시글 등록</h2>
      <input name="title" placeholder="제목" onChange={handleChange} required />
      <textarea name="content" placeholder="내용" onChange={handleChange} required />
      <input name="price" type="number" placeholder="가격" onChange={handleChange} required />
      <input type="file" onChange={handleFileChange} />
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit">등록하기</button>
    </form>
  );
};

export default PostForm;
