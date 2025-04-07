import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import styles from './MyProfile.module.css';
import { updateMeApi } from '../../api/user';
import { fetchRegions, Region } from '../../api/region';
import React from 'react';

const MyProfile = () => {
  type FormData = {
    nickname: string;
    email: string;
    region: number;
  };
  const { user, login } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [regions, setRegions] = useState<Region[]>([]);
  const [form, setForm] = useState<FormData>({
    nickname: user?.nickname || '',
    email: user?.email || '',
    region: user?.region?.id || 0,
  });

  useEffect(() => {
    if (!editMode) return;
    const loadRegions = async () => {
      try {
        const data = await fetchRegions();
        setRegions(data);
      } catch {
        alert('지역 목록을 불러오지 못했습니다.');
      }
    };
    loadRegions();
  }, [editMode]);

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'region' ? Number(value) : value,
    }));
  };

  const handleUpdate = async () => {
    try {
      const updatedUser = await updateMeApi({ ...form }); // regionId 그대로 전달
      login(updatedUser.user);
      setEditMode(false);
    } catch {
      alert('정보 수정에 실패했습니다.');
    }
  };

  return (
    <section className={styles.profileSection}>
      <h3>👤 내 정보</h3>

      {editMode ? (
        <>
          <p>
            <strong>닉네임:</strong>
            <input
              name="nickname"
              value={form.nickname}
              onChange={handleChange}
              className={styles.input}
            />
          </p>
          <p>
            <strong>이메일:</strong>
            <input
              name="email"
              value={form.email}
              disabled // 회색 처리 + 포커스 불가
              className={styles.input}
            />
          </p>
          <p>
            <strong>지역:</strong>
            <select
              name="regionId"
              value={form.region}
              onChange={handleChange}
              className={styles.input}
            >
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          </p>
          <div className={styles.btnGroup}>
            <button onClick={handleUpdate}>저장</button>
            <button onClick={() => setEditMode(false)}>취소</button>
          </div>
        </>
      ) : (
        <>
          <p>
            <strong>닉네임:</strong> {user.nickname}
          </p>
          <p>
            <strong>이메일:</strong> {user.email}
          </p>
          <p>
            <strong>지역:</strong> {user.region?.name || '미지정'}
          </p>
          <button onClick={() => setEditMode(true)}>수정</button>
        </>
      )}
    </section>
  );
};

export default MyProfile;
