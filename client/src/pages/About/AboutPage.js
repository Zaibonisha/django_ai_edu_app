import React from 'react';
import './about.css';

const AboutPage = () => {
  return (
    <div className="about-container">
      <div className="about-hero">
        <h1>About Learning Companion</h1>
        <p>Empowering personalized learning with AI technology.</p>
      </div>

      <div className="about-content">
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>To make quality education accessible and engaging for everyone using intelligent tools.</p>
        </div>
        <div className="about-card">
          <h2>Features</h2>
          <p>Explore curated topics, personalized learning paths, and AI-generated content tailored to your needs.</p>
        </div>
        <div className="about-card">
          <h2>Get Involved</h2>
          <p>We welcome contributors and feedback as we grow and shape the future of education together.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
