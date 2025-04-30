import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function NoteEditor() {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const noteId = queryParams.get('id');

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/');
      return;
    }
    const allNotes = JSON.parse(localStorage.getItem('notes')) || {};
    const userNotes = allNotes[currentUser] || [];

    if (noteId) {
      const existingNote = userNotes.find((note) => note.id === noteId);
      if (existingNote) {
        setTitle(existingNote.title);
        setContent(existingNote.content);
      }
    }
  }, [navigate, noteId]);

  const handleSave = () => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) return;

    const allNotes = JSON.parse(localStorage.getItem('notes')) || {};
    const userNotes = allNotes[currentUser] || [];

    if (noteId) {
      // Update existing note
      const updatedNotes = userNotes.map((note) =>
        note.id === noteId ? { ...note, title, content } : note
      );
      allNotes[currentUser] = updatedNotes;
    } else {
      // Create new note
      const newNote = {
        id: Date.now().toString(),
        title,
        content,
      };
      allNotes[currentUser] = [...userNotes, newNote];
    }

    localStorage.setItem('notes', JSON.stringify(allNotes));
    navigate('/dashboard');
  };

  return (
    <div className="note-editor-page">
      <input
        type="text"
        placeholder="Note Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        rows="10"
        placeholder="Write your note here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={handleSave}>Save Note</button>
    </div>
  );
}

export default NoteEditor;
