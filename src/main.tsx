import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './app/App.tsx';
import './styles/index.css';

const RecurListProjectPage = lazy(() => import('./pages/projects/recurlist.tsx'));
const TaskManagerProjectPage = lazy(() => import('./pages/projects/taskmanager.tsx'));
const SentryMindProjectPage = lazy(() => import('./pages/projects/sentrymind.tsx'));
const FixxoProjectPage = lazy(() => import('./pages/projects/fixxo.tsx'));

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Suspense
      fallback={
        <div
          style={{
            background: '#0C0C10',
            width: '100vw',
            height: '100vh',
          }}
        />
      }
    >
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/projects/recurlist" element={<RecurListProjectPage />} />
        <Route path="/projects/taskmanager" element={<TaskManagerProjectPage />} />
        <Route path="/projects/sentrymind" element={<SentryMindProjectPage />} />
        <Route path="/projects/fixxo" element={<FixxoProjectPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
