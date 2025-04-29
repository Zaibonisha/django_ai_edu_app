import React from 'react';
import LoginForm from '../components/LoginForm';
import './login.css'; // Add this new CSS file

const LoginPage = () => {
  return (
    <div className="login-page">
      <div className="overlay">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
