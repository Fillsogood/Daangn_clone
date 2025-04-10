// src/components/PostForm.tsx
import { useState } from 'react';
import styles from './PostCreate.module.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, updatePost, deleteImageFromS3 } from '../../api/post';
import { uploadToS3 } from '../../utils/uploadToS3';

interface PostFormProps {
  initialData?: {
    title: string;
    content: string;
    price: number;
    images: string[];
  };
  postId?: number;
}

const PostForm = ({ initialData, postId }: PostFormProps) => {
  const [form, setForm] = useState({
    title: initialData?.title || '',
    content: initialData?.content || '',
    price: initialData?.price || 0,
    images: initialData?.images || [],
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
      if (postId) {
        await updatePost(postId, form);
        alert('게시글이 수정되었습니다!');
      } else {
        await createPost(form);
        alert('게시글이 등록되었습니다!');
      }
      navigate('/');
    } catch {
      setError(postId ? '수정 실패' : '등록 실패');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await uploadToS3(file);
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, imageUrl],
      }));
    } catch {
      setError('이미지 업로드 실패');
    }
  };

  const handleImageRemove = async (url: string) => {
    const key = url.split('.com/')[1];
    try {
      await deleteImageFromS3(key!);
      const updatedImages = form.images.filter((img) => img !== url);

      // 🔥 바로 서버에도 반영
      if (postId) {
        await updatePost(postId, { ...form, images: updatedImages });
      }
      setForm((prev) => ({
        ...prev,
        images: prev.images.filter((img) => img !== url),
      }));
    } catch {
      alert('이미지 삭제 실패');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2>{postId ? '게시글 수정' : '게시글 등록'}</h2>
      <input name="title" placeholder="제목" value={form.title} onChange={handleChange} required />
      <textarea
        name="content"
        placeholder="내용"
        value={form.content}
        onChange={handleChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="가격"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input type="file" onChange={handleFileChange} />
      {form.images.length > 0 && (
        <div className={styles.imagePreview}>
          {form.images.map((url, idx) => (
            <div key={idx} className={styles.previewWrapper}>
              <img src={url} alt={`uploaded-${idx}`} className={styles.previewImg} />
              <button type="button" onClick={() => handleImageRemove(url)}>
                삭제
              </button>
            </div>
          ))}
        </div>
      )}
      {error && <p className={styles.error}>{error}</p>}
      <button type="submit">{postId ? '수정하기' : '등록하기'}</button>
    </form>
  );
};

export default PostForm;
