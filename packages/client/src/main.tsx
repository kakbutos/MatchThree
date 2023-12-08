import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { GamePage } from './pages/game';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
