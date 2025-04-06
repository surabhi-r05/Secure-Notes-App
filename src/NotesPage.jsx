import React, { useState } from 'react';
import { Button, TextField, MenuItem } from '@mui/material';

const labelOptions = ['Personal', 'College', 'Work', 'Other'];

const NotesPage = ({ username, onLogout }) => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [label, setLabel] = useState('Personal');
  const [showPopup, setShowPopup] = useState(false);

  const handleAddNote = () => {
    if (!title.trim() || !content.trim()) return;
    setNotes([...notes, { title, content, label }]);
    setTitle('');
    setContent('');
    setLabel('Personal');
    setShowPopup(false);
  };

  const handleDeleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <div className="notes-page">
      <div className="header">
        <h2>Welcome, {username}!</h2>
        <button className="logout-btn" onClick={onLogout}>
            Logout
        </button>

      </div>

      <div className="add-note-btn-container">
        <button className="add-note-btn" onClick={() => setShowPopup(true)}>
          ＋ Add Note
        </button>
      </div>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <TextField
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              sx={{ mb: 1 }}
            />
            <TextField
              label="Content"
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              fullWidth
              multiline
              rows={3}
              sx={{ mb: 1 }}
            />
            <TextField
              label="Label"
              select
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              fullWidth
              sx={{ mb: 2 }}
            >
              {labelOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField>
            <div className="popup-actions">
              <Button variant="contained" onClick={handleAddNote}>
                Save
              </Button>
              <Button variant="text" color="error" onClick={() => setShowPopup(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="notes-list">
        {notes.map((note, index) => (
          <div className="note-card" key={index}>
            <div className="note-label">{note.label}</div>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <button className="delete-btn" onClick={() => handleDeleteNote(index)}>
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotesPage;
