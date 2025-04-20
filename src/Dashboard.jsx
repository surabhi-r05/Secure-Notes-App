import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from './NotesContext';
import { useTheme } from './ThemeContext';
import { Button } from '@mui/material'; // Added MUI Button

function Dashboard({ username, onLogout }) {
  const { notes, deleteNote } = useNotes();
  const navigate = useNavigate();
  const { isDarkTheme } = useTheme();

  return (
    <div className={`notes-page ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="wrapper">
        <div className="header">
          <h2>Welcome, {username}</h2>
          <Button variant="contained" color="error" onClick={onLogout}> {/* MUI button */}
            Logout
          </Button>
        </div>

        <div className="notes-list">
          {notes.map((note) => (
            <div
              key={note.id}
              className="note-card"
              onClick={() => navigate(`/note/${note.id}`)}
            >
              {note.label && <div className="note-label">{note.label}</div>}
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <Button
                variant="text"
                color="error"
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNote(note.id);
                }}
              >
                🗑️
              </Button>
            </div>
          ))}
        </div>

        <div className="add-note-btn-container">
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/note/new')}
            sx={{ mt: 2 }}
          >
            + Add Note
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
