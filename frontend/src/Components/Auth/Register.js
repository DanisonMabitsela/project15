import React, { useState } from "react";
import axios from "axios";
import "./Register.css";

const Register = ({ handleGoBackClick }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        username,
        password,
        isAdmin,
      });

      if (response.status === 201) {
        alert("Registration successful!");
      } else {
        throw new Error("Registration failed.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-heading">Register</h2>
      <div className="input-container">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="register-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="register-input"
        />
        <label>
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
          Register as Admin
        </label>
      </div>
      <button onClick={handleRegister} className="register-button">
        Register
      </button>
      <p className="go-back-link" onClick={handleGoBackClick}>
        Go back to Login
      </p>
    </div>
  );
};

export default Register;
