// src/components/MyPage/index.tsx
import MyProfile from './MyProfile';

const MyPage = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>마이페이지</h2>
      <MyProfile />
      {/* 앞으로 여기에 MyPosts, MyLikes 추가 가능 */}
    </div>
  );
};

export default MyPage;
