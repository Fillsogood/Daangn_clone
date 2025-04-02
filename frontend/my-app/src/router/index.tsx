import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Layout from '../componets/Layout/Layout';
import KakaoCallback from '../pages/\bKakaoCallback';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // 공통 레이아웃
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'auth/kakao/callback', element: <KakaoCallback /> }, //콜백 경로 추가
    ],
  },
]);
