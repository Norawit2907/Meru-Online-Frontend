import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import '../styles/Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img src="../logo.png"/>
        <Link to="/">Meru-Online</Link>
      </div>
      <div className="nav-buttons">
        <div className="Login-buttons">
          <Link to="">
            <button>Login</button>
          </Link>
        </div>
        <div className="Profile-buttons">
          <Link to="/Profile">
              <button>
                <img src="../user.png"/>
              </button>
          </Link>
        </div>
      </div>
        
    </nav>
  );
};

export default Navbar;
