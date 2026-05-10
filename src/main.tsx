import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './app/App.tsx';
import RecurListProjectPage from './pages/projects/recurlist.tsx';
import TaskManagerProjectPage from './pages/projects/taskmanager.tsx';
import './styles/index.css';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/projects/recurlist" element={<RecurListProjectPage />} />
      <Route path="/projects/taskmanager" element={<TaskManagerProjectPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);
