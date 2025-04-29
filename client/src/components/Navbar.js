import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import logo from '../assets/logo4.png';

const Navbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Notify app
    window.dispatchEvent(new Event('authChanged'));
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="Logo" className="logo" />
        <h2 className="brand-title">Learning Companion</h2>
      </div>

      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/topics">Topics</Link></li>
            <li><Link to="/resources">Resources</Link></li>
            <li><Link to="/study-plan">Get A Study Plan</Link></li>
            <li><Link to="/mental-health">Get Mental Health Tips</Link></li>
            <li><Link to="/ai-tutor">AI Tutor</Link></li>
            <li><Link to="/flashcards">Flashcards</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/about">About</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
