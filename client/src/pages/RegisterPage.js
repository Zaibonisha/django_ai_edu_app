import React from 'react';
import RegisterForm from '../components/RegisterForm';
import './register.css'; // New CSS file

const RegisterPage = () => {
  return (
    <div className="register-page">
      <div className="overlay">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
