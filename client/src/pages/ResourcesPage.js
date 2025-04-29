import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios';

const ResourcesPage = () => {
  const [resources, setResources] = useState([]);
  const [topic, setTopic] = useState('');
  const [aiContent, setAiContent] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    api.get('resources/')
      .then((res) => setResources(res.data))
      .catch((err) => console.error(err));
  }, [navigate]);

  const handleGenerate = async () => {
    if (!topic.trim()) return;

    setAiContent("Generating AI content...");

    try {
      const res = await api.post('ai-resources/', { topic });
      setAiContent(res.data.resources);
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
        setAiContent(
          `⚠️ OpenAI API quota has been exceeded.\n\n` +
          `Here's a demo AI resource list for "${topic}":\n\n` +
          "1. Title: Intro to the topic\n   URL: example.com/intro\n   Description: A beginner-friendly overview\n\n" +
          "2. Title: Deep Dive Video\n   URL: example.com/video\n   Description: In-depth lecture or walkthrough\n\n" +
          "3. Title: Practice Quiz\n   URL: example.com/quiz\n   Description: Test your understanding interactively\n\n" +
          "🔔 We are actvely working on resolving the issue. Full access to Resources will be available soon."
        );
      } else {
        setAiContent(
          "⚠️ Unable to fetch AI-generated content. Showing fallback content:\n\n" +
          `Example resources for "${topic}":\n` +
          "- Introductory YouTube video\n" +
          "- Beginner’s guide or Wikipedia page\n" +
          "- Useful PDF or blog post\n" +
          "- Key concepts summary\n"
        );
      }
    }
  };

  return (
    <div style={{ padding: '40px' }}>
      <h2 style={{ color: 'red' }}>Resources</h2>

      <ul>
        {resources.map((resource) => (
          <li key={resource.id}>
            <a href={resource.url} target="_blank" rel="noreferrer">
              {resource.title}
            </a>
          </li>
        ))}
      </ul>

      

      <div style={{ marginTop: '30px' }}>
        <h3 style={{ color: 'red' }}>Get AI-Suggested Resources</h3>
        <input
          type="text"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter a topic (e.g., Machine Learning)"
          style={{ padding: '8px', width: '60%' }}
        />
        <button
        onClick={handleGenerate}
        style={{
        marginLeft: '10px',
        padding: '8px 16px',
        backgroundColor: 'purple',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'background-color 0.3s ease',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#45a049')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#4CAF50')}
        >
        Generate
        </button>

        {aiContent && (
          <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap', backgroundColor: '#f8f8f8', padding: '15px' }}>
            <h4>AI-Generated Suggestions:</h4>
            <p>{aiContent}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;
