// src/router/index.tsx
import { createBrowserRouter } from 'react-router-dom';
// import Layout from '../components/Layout/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Layout from '../componets/Layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // Layout은 공통
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
    ],
  },
]);
