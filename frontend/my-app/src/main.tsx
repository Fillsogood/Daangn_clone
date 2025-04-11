import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router/';
import { ChatProvider } from './contexts/ChatContext';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChatProvider>
      <RouterProvider router={router} />
    </ChatProvider>
  </React.StrictMode>
);
