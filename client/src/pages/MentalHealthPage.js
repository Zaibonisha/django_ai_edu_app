import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios';

const MentalHealthPage = () => {
  const [level, setLevel] = useState('college');
  const [practices, setPractices] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleGenerate = async () => {
    setPractices('Generating AI content...');

    try {
      const res = await api.post('mental-health/', { level });
      setPractices(res.data.practices);
    } catch (err) {
      console.error('Error fetching AI content:', err);

      const rawError = err.response?.data;
      const errorString = typeof rawError === 'string'
        ? rawError
        : JSON.stringify(rawError || {});

      if (
        err.response?.status === 429 ||
        errorString.includes('insufficient_quota') ||
        errorString.includes('You exceeded your current quota') ||
        errorString.includes('check your plan and billing')
      ) {
        setPractices(
          `⚠️ OpenAI API quota has been exceeded.\n\nHere's a sample list of mental health practices:\n\n` +
          "1. Practice daily mindfulness meditation (5-10 mins).\n" +
          "2. Create a simple study–break schedule.\n" +
          "3. Journal your thoughts every evening.\n" +
          "4. Reach out to a peer or counselor weekly.\n" +
          "5. Move your body – 15 min walk, dance, or stretch.\n\n" +
          "💡 Stay kind to yourself – progress, not perfection!"
        );
      } else {
        setPractices(
          "⚠️ Unable to fetch AI-generated practices. Here's a fallback list:\n\n" +
          "- Practice deep breathing for 3 minutes daily\n" +
          "- Take screen-free breaks during study sessions\n" +
          "- Talk to a friend or mentor once a week\n" +
          "- Maintain a gratitude list\n" +
          "- Get 7–8 hours of sleep\n"
        );
      }
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ color: 'red' }}>Student Mental Health Tips</h2>

      <div style={{ marginTop: '30px' }}>
        <h3 style={{ color: 'red' }}>Get Personalized Practices</h3>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          style={{ padding: '20px', marginRight: '10px', width: '20%' }}
        >
          <option value="middle school">Middle School</option>
          <option value="high school">High School</option>
          <option value="college">College</option>
          <option value="university">University</option>
        </select>
        <button
          onClick={handleGenerate}
          style={{
            padding: '15px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s ease',
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = 'blue')}
          onMouseOut={(e) => (e.target.style.backgroundColor = 'yellow')}
        >
          Generate
        </button>

        {practices && (
          <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap', backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
            <h4>AI-Generated Practices:</h4>
            <p>{practices}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MentalHealthPage;
