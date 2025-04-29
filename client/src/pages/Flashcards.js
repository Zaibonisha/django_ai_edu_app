import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios';

const Flashcards = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const fetchFlashcards = async (topic) => {
    setLoading(true);
    setErrorMessage('');
    const token = localStorage.getItem('access_token');
    try {
      const response = await api.post('generate-flashcards/', { topic }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setFlashcards(response.data.flashcards);
    } catch (err) {
      console.error('Error fetching flashcards:', err);

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
        setErrorMessage(
          `⚠️ Flashcards couldn't be generated due to quota limits.\n\n` +
          `Here's a sample of what AI-generated flashcards would look like:`
        );
        setFlashcards([
          {
            question: `What is photosynthesis?`,
            answer: `Photosynthesis is the process by which green plants convert sunlight, water, and carbon dioxide into glucose and oxygen.`,
          },
          {
            question: `Which organelle is responsible for photosynthesis in plant cells?`,
            answer: `The chloroplast.`,
          },
          {
            question: `What is the main pigment involved in photosynthesis?`,
            answer: `Chlorophyll.`,
          },
          {
            question: `What are the two stages of photosynthesis?`,
            answer: `The light-dependent reactions and the Calvin cycle (light-independent reactions).`,
          },
          {
            question: `Why is photosynthesis important for life on Earth?`,
            answer: `It produces oxygen and is the foundation of most food chains.`,
          },
        ]);
      } else {
        setErrorMessage(`⚠️ Unable to fetch flashcards. Please try again later.`);
        setFlashcards([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleNextCard = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
    } else {
      setCurrentCardIndex(0);
    }
  };

  const handlePrevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
    } else {
      setCurrentCardIndex(flashcards.length - 1);
    }
  };

  const handleTopicChange = (e) => {
    setTopic(e.target.value);
  };

  const handleGenerateFlashcards = () => {
    if (topic) {
      fetchFlashcards(topic);
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ color: 'purple' }}>Flashcards</h2>

      <input
        type="text"
        value={topic}
        onChange={handleTopicChange}
        placeholder="Enter a topic"
        style={{ padding: '10px', width: '100%', marginBottom: '20px' }}
      />
      <button
        onClick={handleGenerateFlashcards}
        style={{
          padding: '10px 20px',
          backgroundColor: 'green',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
        }}
      >
        Generate Flashcards
      </button>

      {loading ? (
        <p>Loading flashcards...</p>
      ) : (
        <>
          {errorMessage && (
            <div
              style={{
                backgroundColor: '#f8d7da',
                padding: '10px',
                color: 'red',
                borderRadius: '8px',
                marginBottom: '20px',
              }}
            >
              <p>{errorMessage}</p>
            </div>
          )}

          {flashcards.length > 0 ? (
            <div>
              <div
                style={{
                  padding: '20px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '8px',
                  marginBottom: '20px',
                }}
              >
                <h4>{flashcards[currentCardIndex]?.question}</h4>
                <p>{flashcards[currentCardIndex]?.answer}</p>
              </div>

              <button
                onClick={handlePrevCard}
                style={{
                  padding: '10px 20px',
                  marginRight: '10px',
                  backgroundColor: 'orange',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                }}
              >
                Previous
              </button>
              <button
                onClick={handleNextCard}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'blue',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                }}
              >
                Next
              </button>
            </div>
          ) : (
            !loading && !errorMessage.includes('quota') && <p>No flashcards available</p>
          )}
        </>
      )}
    </div>
  );
};

export default Flashcards;
