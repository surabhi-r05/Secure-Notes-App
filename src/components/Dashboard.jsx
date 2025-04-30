import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/');
      return;
    }
    const allNotes = JSON.parse(localStorage.getItem('notes')) || {};
    setNotes(allNotes[currentUser] || []);
  }, [navigate]);

  const handleAddNote = () => {
    navigate('/edit-note');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/');
  };

  const handleEditNote = (id) => {
    navigate(`/edit-note?id=${id}`);
  };

  return (
    <div className="notes-page">
      <div className="header">
        <h2>Your Notes</h2>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <div className="notes-list">
        {notes.map((note) => (
          <div key={note.id} className="note-card" onClick={() => handleEditNote(note.id)}>
  {note.label && <div className="note-label">{note.label}</div>}
  <h3>{note.title}</h3>
  <p>{note.content}</p>
</div>

        ))}
      </div>
      <div className="add-note-btn-container">
        <button className="add-note-btn" onClick={handleAddNote}>Add Note</button>
      </div>
    </div>
  );
}

export default Dashboard;
