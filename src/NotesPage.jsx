import { useState, useEffect } from "react";
import {
  Fab,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

function NotesPage() {
  const [open, setOpen] = useState(false);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({
    title: "",
    category: "",
    content: "",
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("notes")) || [];
    setNotes(saved);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setNewNote({ title: "", category: "", content: "" });
  };

  const handleChange = (e) =>
    setNewNote({ ...newNote, [e.target.name]: e.target.value });

  const handleSave = () => {
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    handleClose();
  };

  return (
    <div style={{ padding: 20 }}>
      <Typography variant="h4" gutterBottom>
        My Notes
      </Typography>

      <Grid container spacing={2}>
        {notes.map((note, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card>
              <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="subtitle2" color="text.secondary">
                  {note.category}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {note.content}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Fab
        color="primary"
        aria-label="add"
        onClick={handleOpen}
        sx={{ position: "fixed", bottom: 20, right: 20 }}
      >
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create a Note</DialogTitle>
        <DialogContent>
          <TextField
            name="title"
            label="Title"
            fullWidth
            sx={{ mt: 1 }}
            onChange={handleChange}
            value={newNote.title}
          />
          <TextField
            name="category"
            label="Category / Labels"
            fullWidth
            sx={{ mt: 2 }}
            onChange={handleChange}
            value={newNote.category}
          />
          <TextField
            name="content"
            label="Content"
            fullWidth
            multiline
            rows={4}
            sx={{ mt: 2 }}
            onChange={handleChange}
            value={newNote.content}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default NotesPage;
