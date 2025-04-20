import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { NotesProvider } from './NotesContext';
import Dashboard from './Dashboard';
import NoteEditor from './NoteEditor';
import './App.css';
import { TextField, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from './ThemeContext';

function App() {
  const [username, setUsername] = useState('');
  const [tempUser, setTempUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { toggleTheme, isDarkTheme } = useTheme();

  const handleLogin = () => {
    setUsername(tempUser);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <video autoPlay muted loop id="bg-video">
        <source src="matrix-bg-1.mp4" type="video/mp4" />
      </video>

      <div className="overlay">
        <div className="content-wrapper">
          {!isLoggedIn ? (
            <div className="login-box">
              <h1>Secure Notes</h1>
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                value={tempUser}
                onChange={(e) => setTempUser(e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Button
                variant="contained"
                fullWidth
                onClick={handleLogin}
                sx={{
                  bgcolor: 'var(--primary)',
                  color: '#fff',
                  '&:hover': {
                    bgcolor: 'var(--primary)',
                  },
                }}
              >
                Login / Register
              </Button>
            </div>
          ) : (
            <NotesProvider>
              <Router>
                <Routes>
                  <Route path="/dashboard" element={<Dashboard username={username} onLogout={() => setIsLoggedIn(false)} />} />
                  <Route path="/note/new" element={<NoteEditor />} />
                  <Route path="/note/:id" element={<NoteEditor />} />
                  <Route path="*" element={<Navigate to="/dashboard" />} />
                </Routes>
              </Router>
            </NotesProvider>
          )}
        </div>
      </div>

      {/* Theme Toggle */}
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {isDarkTheme ? '☀️' : '🌙'}
        </button>
      </div>
    </div>
  );
}

export default App;
