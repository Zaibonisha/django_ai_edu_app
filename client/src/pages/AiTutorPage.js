import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import api from '../axios'; // Assuming you're using axios for API calls

const AiTutorPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiError, setAiError] = useState('');
  const navigate = useNavigate();

  // Check if the user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  // Handle submitting a question to the AI tutor
  const handleAskQuestion = async () => {
    if (!question) return;

    setLoading(true);
    setAnswer('');
    setAiError('');

    try {
      const response = await api.post('ai-tutor/', { question });
      setAnswer(response.data.answer);
    } catch (err) {
      console.error('Error fetching AI answer:', err);
      
      const rawError = err.response?.data;
      const errorString = typeof rawError === 'string' ? rawError : JSON.stringify(rawError || {});

      if (
        err.response?.status === 429 ||
        errorString.includes('insufficient_quota') ||
        errorString.includes('You exceeded your current quota') ||
        errorString.includes('check your plan and billing')
      ) {
        setAiError('⚠️ OpenAI API quota has been exceeded. This is a demo response.');
        setAnswer('This is a demo answer from the AI Tutor. Normally, your question would be processed with a detailed explanation. Stay tuned while we resolve the issue!');
      } else {
        setAiError('⚠️ There was an error processing your request. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ color: 'green' }}>AI Tutor</h2>
      <div style={{ marginTop: '30px' }}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask your question here..."
          rows="5"
          style={{ width: '100%', padding: '15px', fontSize: '16px' }}
        />
        <br />
        <button
          onClick={handleAskQuestion}
          style={{
            padding: '15px 20px',
            backgroundColor: 'blue',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontWeight: 'bold',
            marginTop: '10px',
            transition: 'background-color 0.3s ease',
          }}
          disabled={loading}
        >
          {loading ? 'Asking...' : 'Ask AI'}
        </button>
      </div>

      {answer && (
        <div style={{ marginTop: '20px', backgroundColor: '#f0f0f0', padding: '15px', borderRadius: '8px' }}>
          <h4>AI's Answer:</h4>
          <p>{answer}</p>
        </div>
      )}

      {aiError && (
        <div style={{ marginTop: '20px', backgroundColor: '#ffcccc', padding: '15px', borderRadius: '8px' }}>
          <h4>{aiError}</h4>
        </div>
      )}
    </div>
  );
};

export default AiTutorPage;
