import React from 'react';
import ReactDOM from 'react-dom/client';
import NotesPage from './NotesPage.jsx';  // 👈 use this instead of App
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotesPage />
  </React.StrictMode>
);
