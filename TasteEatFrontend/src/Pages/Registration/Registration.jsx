import React, { useState, useEffect } from "react";
import "./Registration.css";
import { Select, MenuItem } from "@mui/material";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const handleCategoryChange = (event) => {
    setRole(event.target.value);
  };

  const handleRegistration = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const response = await fetch("http://localhost:3000/api/authorization/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: username, password, role, email })
    });

    const data = await response.json();
    if (!response.ok) {
      alert(data.error || "Registration failed");
    } else {
      alert("Registration successful!");
    }
  };

  return (
    <div>
      <label>Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Create Username" />
      
      <label>E-mail</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Input Your E-mail" />
      
      <label>Password</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter A password" />
      
      <label>Confirm password</label>
      <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Repeat A password" />
      
      <Select
        value={role}
        onChange={handleCategoryChange}
        displayEmpty
        style={{ marginLeft: "10px", minWidth: "120px" }}
      >
        <MenuItem value="customer">Customer</MenuItem>
        <MenuItem value="deliverer">Deliverer</MenuItem>
      </Select>
      
      <input type="checkbox" required />
      <label>Agree to terms</label>
      <button onClick={handleRegistration}>Register</button>
    </div>
  );
};

export default Registration;