import React, { useState } from "react";
import "./Login.css";

const Login = ({ handleRegisterClick, handleLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClick = () => {
    handleLogin(username, password);
    console.log("Logging in as:", username);
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="login-input"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="login-input"
      />

      <button onClick={handleLoginClick} className="login-button">
        Login
      </button>
      <p className="register-link">
        Don't have an account?{" "}
        <span onClick={handleRegisterClick} className="register-link-text">
          Register
        </span>
      </p>
    </div>
  );
};

export default Login;
