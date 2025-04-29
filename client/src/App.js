import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/About/AboutPage';
import TopicsPage from './pages/TopicsPage';
import ResourcesPage from './pages/ResourcesPage';
import StudyPlanPage from './pages/StudyPlanPage';
import Navbar from './components/Navbar';
import MentalHealthPage from './pages/MentalHealthPage'; // Already imported
import AiTutorPage from './pages/AiTutorPage'; // Import AI Tutor page
import Flashcards from './pages/Flashcards';


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  useEffect(() => {
    const handleAuthChange = () => {
      const token = localStorage.getItem('access_token');
      setIsAuthenticated(!!token);
    };

    window.addEventListener('storage', handleAuthChange);
    window.addEventListener('authChanged', handleAuthChange); // Listen to custom event

    return () => {
      window.removeEventListener('storage', handleAuthChange);
      window.removeEventListener('authChanged', handleAuthChange);
    };
  }, []);

  return (
    <Router>
      <div className="App">
        {/* Navbar will show on all pages */}
        <Navbar isAuthenticated={isAuthenticated} />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Protected Routes */}
          <Route
            path="/topics"
            element={isAuthenticated ? <TopicsPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/resources"
            element={isAuthenticated ? <ResourcesPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/study-plan"
            element={isAuthenticated ? <StudyPlanPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/mental-health"
            element={isAuthenticated ? <MentalHealthPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/ai-tutor"
            element={isAuthenticated ? <AiTutorPage /> : <Navigate to="/login" />}
          />
          <Route
            path="/flashcards"
            element={isAuthenticated ? <Flashcards /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
