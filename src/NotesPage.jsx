import React, { useState } from 'react';
import { Container, Typography, Fab, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Card, CardContent, Chip, Grid } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

function App() {
  const [notes, setNotes] = useState([
    {
      title: 'Acc_Details',
      category: 'Financial',
      content: 'Bank....',
    },
  ]);
  const [open, setOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: '', category: '', content: '' });

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setNewNote({ title: '', category: '', content: '' });
    setOpen(false);
  };

  const handleChange = (e) => {
    setNewNote({ ...newNote, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (newNote.title && newNote.category && newNote.content) {
      setNotes([...notes, newNote]);
      handleClose();
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Notes for Ritu_Sharma
      </Typography>

      <Grid container spacing={2}>
        {notes.map((note, idx) => (
          <Grid item xs={12} sm={6} key={idx}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Chip label={note.category} size="small" sx={{ my: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {note.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab color="primary" aria-label="add" onClick={handleOpen} sx={{ position: 'fixed', bottom: 24, right: 24 }}>
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Note</DialogTitle>
        <DialogContent>
          <TextField autoFocus margin="dense" name="title" label="Title" fullWidth variant="outlined" onChange={handleChange} />
          <TextField margin="dense" name="category" label="Category" fullWidth variant="outlined" onChange={handleChange} />
          <TextField margin="dense" name="content" label="Content" multiline rows={4} fullWidth variant="outlined" onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default App;
