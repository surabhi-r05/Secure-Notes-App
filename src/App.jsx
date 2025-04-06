import { useState } from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

import "./App.css";

const buttonStyle = {
  width: "250px",
  textTransform: "none",
  borderWidth: "3px",
  borderStyle: "solid",
  borderRadius: "20px",
  fontSize: 28,
  marginTop: "10px",
};

function App() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = () => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    users[form.username] = form.password;
    localStorage.setItem("users", JSON.stringify(users));
    console.log("Registered:", form);
    navigate("/notes");
  };

  const handleLogin = () => {
    const users = JSON.parse(localStorage.getItem("users") || "{}");
    if (form.username in users) {
      console.log("Logged in:", form);
      navigate("/notes");
    } else {
      alert("User not registered");
    }
  };

  return (
    <>
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/matrix-bg-1.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div id="main">
        <Typography
          variant="h2"
          color="initial"
          sx={{ color: "white", background: "black", borderRadius: "20px" }}
        >
          Secure Notes
        </Typography>

        <TextField
          label="Username"
          name="username"
          variant="outlined"
          sx={{ input: { color: "white" }, background: "black", mt: 2 }}
          fullWidth
          onChange={handleChange}
          value={form.username}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          variant="outlined"
          sx={{ input: { color: "white" }, background: "black", mt: 2 }}
          fullWidth
          onChange={handleChange}
          value={form.password}
        />

        <Button variant="contained" color="primary" sx={buttonStyle} onClick={handleRegister}>
          Register
        </Button>
        <Button variant="contained" color="success" sx={buttonStyle} onClick={handleLogin}>
          Login
        </Button>
      </div>
    </>
  );
}

export default App;
