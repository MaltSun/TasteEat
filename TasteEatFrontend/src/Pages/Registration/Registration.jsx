import React, { useState, useEffect } from "react";
import "./Registration.css";
import { Select, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const navigate = useNavigate();
  
  const handleCategoryChange = (event) => {
    setRole(event.target.value);
  };

  const handleRegistration = async () => {
    if (!username || !email || !password || !confirmPassword || !role) {
      alert("Please, fill all fields!");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Password do not match!");
      return;
    }

    const response = await fetch(
      "http://localhost:3000/api/authorization/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, role, email }),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      alert(data.error || "Ошибка регистрации");
    } else {
      console.log("Регистрация успешна!");
      
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("email", email);
      ssessionStorage.setItem("userId", data.id);

      navigate("/");
    }
  };

  return (
    <div className="registration">
      <div >
        <h1>Registration</h1>
        <span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Create Username"
          />

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Input Your E-mail"
          />
        </span>
        <span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter A password"
          />

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Repeat A password"
          />
        </span>

        <Select
          value={role}
          onChange={handleCategoryChange}
          displayEmpty
          style={{
            minWidth: "120px",
            height: "73px",
            width: "70%",
            background: "rgba(88, 105, 132, 0.822)",
          }}
        >
          <MenuItem value="user">Customer</MenuItem>
          <MenuItem value="deliverer">Deliverer</MenuItem>
        </Select>

        <span className="regButton">
          
          <Link className="button" to={"/login"}>
            back To Authorization
          </Link>
          <button className="button" onClick={handleRegistration}>
            Register
          </button>
        </span>
      </div>
    </div>
  );
};

export default Registration;
