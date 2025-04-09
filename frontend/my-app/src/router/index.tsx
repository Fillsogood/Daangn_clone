import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Layout from '../componets/Layout/Layout';
import KakaoCallback from '../pages/\bKakaoCallback';
import PostCreatePage from '../pages/PostCreatePage';
import MyPage from '../pages/MyProfile';
import MyPosts from '../componets/MyFrom/MyPosts';
import MyLikes from '../componets/MyFrom/MyLikes';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // 공통 레이아웃
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'auth/kakao/callback', element: <KakaoCallback /> }, //콜백 경로 추가
      { path: 'posts/create', element: <PostCreatePage /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'myposts', element: <MyPosts /> },
      { path: 'mylikes', element: <MyLikes /> },
    ],
  },
]);
