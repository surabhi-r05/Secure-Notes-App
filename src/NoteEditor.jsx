import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, MenuItem } from '@mui/material';
import { useNotes } from './NotesContext';
import { useTheme } from './ThemeContext';

const labelOptions = ['Personal', 'College', 'Work', 'Finance', 'Other'];

const NoteEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addNote, updateNote, getNoteById } = useNotes();
  const { isDarkTheme } = useTheme();

  const isEdit = !!id;
  const existingNote = isEdit ? getNoteById(id) : null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [label, setLabel] = useState('Personal');

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title);
      setContent(existingNote.content);
      setLabel(existingNote.label);
    }
  }, [existingNote]);

  const handleSave = () => {
    if (!title.trim() || !content.trim()) return;
    if (isEdit) {
      updateNote(id, { title, content, label });
    } else {
      addNote({ title, content, label });
    }
    navigate('/dashboard');
  };

  return (
    <div className={`notes-page ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
      <div className="header">
        <h2>{isEdit ? 'Edit Note' : 'New Note'}</h2>
        <div>
          <Button variant="text" onClick={() => navigate('/dashboard')}>
            ⬅️ Back
          </Button>
        </div>
      </div>

      <div className="popup-card">
        <TextField
          label="Title"
          variant="outlined"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          label="Content"
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          multiline
          rows={4}
          sx={{ mb: 2 }}
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
        <Button variant="contained" onClick={handleSave}>
          {isEdit ? 'Update Note' : 'Save Note'}
        </Button>
      </div>
    </div>
  );
};

export default NoteEditor;
