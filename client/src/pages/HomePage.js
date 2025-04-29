import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import api from '../axios';
import './home.css';

import welcomeImage from '../assets/welcome.png';
import goalImage from '../assets/goal1.png';
import recallImage from '../assets/recall.png';
import organizeImage from '../assets/organize.png';
import chunksImage from '../assets/chunks.png';
import resourcesImage from '../assets/resources.png';
import restImage from '../assets/rest.png';
import bookIcon from '../assets/book.png';
import pencilIcon from '../assets/pencil.png';
import hatIcon from '../assets/graduation-hat.png';
import microscopeIcon from '../assets/microscope.png';
import atomIcon from '../assets/atom.png';

const HomePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));
  const navigate = useNavigate();

  const studyTips = [
    {
      title: 'Set Clear Goals',
      image: goalImage,
      description: 'Break your study sessions into clear, manageable goals to stay motivated and track progress.',
    },
    {
      title: 'Use Active Recall',
      image: recallImage,
      description: 'Actively test yourself on the material instead of passively rereading.',
    },
    {
      title: 'Stay Organized',
      image: organizeImage,
      description: 'Keep your notes and schedule organized to reduce stress and save time.',
    },
    {
      title: 'Study in Chunks',
      image: chunksImage,
      description: 'Use spaced repetition and study in short bursts for better memory retention.',
    },
    {
      title: 'Use the Right Resources',
      image: resourcesImage,
      description: 'Reliable resources give accurate information, helping you build a strong foundation.',
    },
    {
      title: 'Take Breaks and Rest',
      image: restImage,
      description: 'Short breaks and enough rest improve focus and prevent burnout.',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('access_token');
      setIsAuthenticated(!!token);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {!isAuthenticated ? (
        <div className="welcome-container">
          <div className="welcome-container">
  <h1 className="welcome-title">Welcome to Learning Companion</h1>
  <h2 className="welcome-desc">
    Please sign in to explore educational topics and resources tailored for you.
  </h2>
  <div className="welcome-img-wrapper">
    <img src={welcomeImage} alt="Welcome" className="welcome-img" />
  </div>
</div>

        </div>
      ) : (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '5rem', color: 'orange'}}>Explore</h1>
          <div style={{ marginTop: '20px' }}>
            <button
              onClick={() => navigate('/topics')}
              style={{
                padding: '20px 45px',
                margin: '10px',
                fontSize: '1rem',
                backgroundColor: '#f39c12',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              View Topics
            </button>
            <button
              onClick={() => navigate('/resources')}
              style={{
                padding: '20px 35px',
                margin: '10px',
                fontSize: '1rem',
                backgroundColor: '#3498db',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              View Resources
            </button>
            
            <button
              onClick={() => navigate('/study-plan')}
              style={{
                padding: '20px 35px',
                margin: '10px',
                fontSize: '1rem',
                backgroundColor: '#f67280',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Get a study plan
            </button>
            <button
              onClick={() => navigate('/mental-health')}
              style={{
                padding: '20px 35px',
                margin: '10px',
                fontSize: '1rem',
                backgroundColor: '#2ecc71',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              Tips for student mental health
            </button>
          </div>
        </div>
      )}

      <div style={{ padding: '50px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', fontSize: '4rem', marginBottom: '30px', color: 'orange' }}>
       Study Tips
      </h2>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
          }}
        >
          {studyTips.map((tip, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #ccc',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                backgroundColor: '#fff',
                transition: 'transform 0.2s',
              }}
            >
              <img
                src={tip.image}
                alt={tip.title}
                style={{
                  width: '100%',
                  height: '250px',
                  objectFit: 'cover',
                }}
              />
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{tip.title}</h3>
                <p style={{ fontSize: '1.1rem' }}>{tip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
