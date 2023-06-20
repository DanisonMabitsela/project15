import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import bg from "./img/bg.png";
import { MainLayout } from "./styles/Layouts";
import Navigation from "./Components/Navigation/Navigation";
import Dashboard from "./Components/Dashboard/Dashboard";
import Income from "./Components/Income/Income";
import Expenses from "./Components/Expenses/Expenses";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import AdminComponent from "./Components/Admin/AdminComponent";
import { useGlobalContext } from "./context/globalContext";
import "./App.css";

const App = () => {
  const [active, setActive] = useState(2);
  const [signedIn, setSignedIn] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setSignedIn(true);
      setActive(1);
    }

    const userIsAdmin = localStorage.getItem("isAdmin");
    if (userIsAdmin) {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });

      if (response.status === 200) {
        const { token, isAdmin } = response.data;
        setSignedIn(true);
        setActive(1);
        navigate("/");
        localStorage.setItem("token", token);

        console.log("Logged in as:", username);
        console.log("Is admin:", isAdmin);

        if (isAdmin) {
          setIsAdmin(true);
          localStorage.setItem("isAdmin", "true");
        }
      } else {
        throw new Error("Login failed.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed.");
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isAdmin");
    setSignedIn(false);
    setIsAdmin(false);
    navigate("/login");
  };

  const global = useGlobalContext();
  console.log(global);

  const handleRegisterClick = () => {
    setShowRegister(true);
  };

  const handleGoBackClick = () => {
    setShowRegister(false);
  };

  const displayData = () => {
    if (showRegister) {
      return <Register handleGoBackClick={handleGoBackClick} />;
    } else {
      switch (active) {
        case 1:
          return <Dashboard />;
        case 2:
          return (
            <Login
              handleLogin={handleLogin}
              handleRegisterClick={handleRegisterClick}
            />
          );
        case 3:
          return <Income />;
        case 4:
          return <Expenses />;
        case 5:
          return <AdminComponent isAdmin={isAdmin} setIsAdmin={setIsAdmin} />;
        default:
          return <Dashboard />;
      }
    }
  };

  return (
    <div className="App" style={{ backgroundImage: `url(${bg})` }}>
      <MainLayout>
        {signedIn && (
          <Navigation
            active={active}
            setActive={setActive}
            setSignedIn={setSignedIn}
            handleSignOut={handleSignOut}
          />
        )}
        <main>{displayData()}</main>
      </MainLayout>
      <a
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      ></a>
    </div>
  );
};

export default App;
