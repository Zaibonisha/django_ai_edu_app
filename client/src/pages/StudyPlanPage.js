import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios';

const StudyPlanPage = () => {
  const [topic, setTopic] = useState('');
  const [studyPlan, setStudyPlan] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const handleGeneratePlan = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setStudyPlan('');

    try {
      const res = await api.post('generate-study-plan/', { topic });
      setStudyPlan(res.data.plan);
    } catch (err) {
      console.error('Error generating study plan:', err);

      const rawError = err.response?.data;
      const errorString = typeof rawError === 'string'
        ? rawError
        : JSON.stringify(rawError || {});

      if (
        errorString.includes('insufficient_quota') ||
        errorString.includes('You exceeded your current quota') ||
        errorString.includes('check your plan and billing')
      ) {
        setStudyPlan(
          "⚠️ OpenAI API quota has been exceeded.\n\n" +
          `Here's a demo study plan for "${topic}":\n\n` +
          "1. Week 1: Introduction and basic concepts\n" +
          "2. Week 2: Deep dive into core topics\n" +
          "3. Week 3: Practical exercises or mini project\n" +
          "4. Week 4: Final review and self-assessment\n\n" +
          "🔔 We are actvely working on resolving the issue. Full access to Study Plans will be available soon."
        );
      } else {
        setStudyPlan(
          "⚠️ Unable to fetch AI-generated study plan. Displaying fallback content:\n\n" +
          `Sample Plan for "${topic}":\n\n` +
          "• Read a beginner-friendly article or book\n" +
          "• Watch 2–3 educational videos\n" +
          "• Take notes on core concepts\n" +
          "• Complete exercises or quizzes\n"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ color: 'orange' }}>Generate Study Plan</h2>
      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic (e.g., Data Structures)"
        style={{ padding: '8px', width: '60%' }}
      />
      <button
      onClick={handleGeneratePlan}
      style={{
      marginLeft: '10px',
      padding: '8px 16px',
      backgroundColor: loading ? '#ccc' : '#2196F3',
      color: 'white',
      border: 'none',
      borderRadius: '6px',
      cursor: loading ? 'not-allowed' : 'pointer',
      fontWeight: 'bold',
      transition: 'background-color 0.3s ease',
     }}
     disabled={loading}
     onMouseOver={(e) => {
     if (!loading) e.target.style.backgroundColor = '#1976D2';
     }}
     onMouseOut={(e) => {
     if (!loading) e.target.style.backgroundColor = '#2196F3';
     }}
     >
     {loading ? 'Generating...' : 'Generate Plan'}
</button>


      {studyPlan && (
        <div
          style={{
            marginTop: '30px',
            backgroundColor: '#f9f9f9',
            padding: '20px',
            whiteSpace: 'pre-wrap',
            borderRadius: '8px',
          }}
        >
          <h4>AI-Generated Study Plan:</h4>
          <p>{studyPlan}</p>
        </div>
      )}
    </div>
  );
};

export default StudyPlanPage;
