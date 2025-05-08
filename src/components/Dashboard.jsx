import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [selectedLabel, setSelectedLabel] = useState('');
  const [majorityLabels, setMajorityLabels] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState('default-profile.jpg');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('currentUser'));
  const [recentlyAccessed, setRecentlyAccessed] = useState([]);

  const loadUserNotes = useCallback(() => {
    const allNotes = JSON.parse(localStorage.getItem('notes')) || {};
    const userNotes = allNotes[currentUser] || [];

    const filteredNotes = userNotes.filter(
      note => note.label === selectedLabel || !selectedLabel
    );
    setNotes(filteredNotes);

    const labelCount = {};
    userNotes.forEach(note => {
      labelCount[note.label] = (labelCount[note.label] || 0) + 1;
    });

    const sortedLabels = Object.entries(labelCount)
      .sort(([, a], [, b]) => b - a)
      .map(([label]) => label);

    setMajorityLabels(sortedLabels);
  }, [currentUser, selectedLabel]);

  useEffect(() => {
    const recentNotes = JSON.parse(localStorage.getItem('recentlyAccessed')) || [];
    setRecentlyAccessed(recentNotes);

    const storedPhotos = JSON.parse(localStorage.getItem('profilePhotos')) || {};
    if (storedPhotos[currentUser]) {
      setProfilePhoto(storedPhotos[currentUser]);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      navigate('/');
      return;
    }
    loadUserNotes();
  }, [navigate, selectedLabel, currentUser, loadUserNotes]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleAddNote = () => {
    navigate('/edit-note');
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    navigate('/');
  };

  const handleProfilePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoURL = reader.result;
        setProfilePhoto(photoURL);
        const storedPhotos = JSON.parse(localStorage.getItem('profilePhotos')) || {};
        storedPhotos[currentUser] = photoURL;
        localStorage.setItem('profilePhotos', JSON.stringify(storedPhotos));
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleEditNote = (id) => {
    const updatedRecentlyAccessed = [id, ...recentlyAccessed.filter(n => n !== id)].slice(0, 5);
    setRecentlyAccessed(updatedRecentlyAccessed);
    localStorage.setItem('recentlyAccessed', JSON.stringify(updatedRecentlyAccessed));
    navigate(`/edit-note?id=${id}`);
  };

  const handleDeleteNote = (id) => {
    const allNotes = JSON.parse(localStorage.getItem('notes')) || {};
    const userNotes = allNotes[currentUser] || [];
    const updatedNotes = userNotes.filter(note => note.id !== id);

    allNotes[currentUser] = updatedNotes;
    localStorage.setItem('notes', JSON.stringify(allNotes));

    loadUserNotes();
  };

  return (
    <div className="notes-page">
      <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-profile">
          <button
            className="close-sidebar-btn"
            onClick={toggleSidebar}
            style={{ float: 'right', background: 'transparent', color: 'white', border: 'none', fontSize: '1.5rem', cursor: 'pointer' }}
          >
            ×
          </button>

          <img src={profilePhoto} alt="Profile" className="profile-photo" />
          <h3>{currentUser}</h3>

          <div className="file-upload-container">
            <input
              type="file"
              id="file-upload"
              onChange={handleProfilePhotoUpload}
              style={{ display: 'none' }}
            />
            <label htmlFor="file-upload" className="file-upload-label">Choose File</label>
          </div>
        </div>

        <div className="sidebar-section">
          <h4>Majority</h4>
          {majorityLabels.map(label => (
            <div key={label} className="note-label majority-label">{label}</div>
          ))}
        </div>

        <div className="sidebar-section">
          <h4>Recently Accessed</h4>
          {recentlyAccessed.map(id => {
            const note = notes.find(note => note.id === id);
            return note ? (
              <div
                key={id}
                className="note-label recently-accessed-label"
                style={{ cursor: 'pointer' }}
                onClick={() => handleEditNote(id)}
              >
                {note.title}
              </div>
            ) : null;
          })}
        </div>
      </div>

      <div className="main-content">
        <div className="header">
          <button className="menu-btn" onClick={toggleSidebar}>&#9776;</button>
          <h2>{`Welcome, ${currentUser}`}</h2>
          <div style={{ display: 'flex', gap: '10px' }}>
          <button className="share-btn" onClick={() => navigate('/share')}>Share</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>

        <div className="filter-container">
          <select
            value={selectedLabel}
            onChange={(e) => setSelectedLabel(e.target.value)}
            className="label-dropdown"
          >
            <option value="">All Labels</option>
            <option value="Work">Work</option>
            <option value="Education">Education</option>
            <option value="Devices">Devices</option>
            <option value="Financial">Financial</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>

        <div className="notes-list">
          {notes.map(note => (
            <div
              key={note.id}
              className={`note-card ${note.label.toLowerCase()}`}
              onClick={() => handleEditNote(note.id)}
            >
              {note.label && <div className="note-label">{note.label}</div>}
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button
                className="delete-note-btn"
                style={{ marginTop: '10px' }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteNote(note.id);
                }}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className="add-note-btn-container">
          <button className="add-note-btn" onClick={handleAddNote}>Add Note</button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
