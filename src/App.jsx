import React, { useState } from 'react';
import NotesPage from './NotesPage';
import './App.css';
import { Button, TextField } from '@mui/material';

function App() {
  const [username, setUsername] = useState('');
  const [tempUser, setTempUser] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    const userData = { username: tempUser, password };
    console.log('User data:', JSON.stringify(userData));
    setUsername(tempUser);
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      <video autoPlay muted loop id="bg-video">
        <source src="matrix-bg-1.mp4" type="video/mp4" />
      </video>
      <div className="overlay">
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
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
            >
              Login / Register
            </Button>
          </div>
        ) : (
          // ✅ make sure this is JSX (not object)
          <NotesPage username={username} onLogout={() => setIsLoggedIn(false)} />
        )}
      </div>
    </div>
  );
}

export default App;
