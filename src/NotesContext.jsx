import React, { createContext, useContext, useEffect, useState } from 'react';

const NotesContext = createContext();

const NOTES_KEY = 'secure_notes_app';

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState(() => {
    const stored = localStorage.getItem(NOTES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes((prev) => [...prev, { ...note, id: Date.now().toString() }]);
  };

  const updateNote = (id, updatedNote) => {
    setNotes((prev) => prev.map((note) => (note.id === id ? { ...note, ...updatedNote } : note)));
  };

  const getNoteById = (id) => notes.find((n) => n.id === id);

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  return (
    <NotesContext.Provider value={{ notes, addNote, updateNote, getNoteById, deleteNote }}>
      {children}
    </NotesContext.Provider>
  );
};

export const useNotes = () => useContext(NotesContext);
