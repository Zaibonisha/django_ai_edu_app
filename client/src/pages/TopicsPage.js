import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios';
import './topics.css';

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState('');
  const [aiResources, setAiResources] = useState('');
  const navigate = useNavigate();

  const majorTopics = [
    'Artificial Intelligence',
    'Machine Learning',
    'Mathematics',
    'Biology',
    'Economics',
    'Climate Change',
    'Quantum Computing',
    'Data Science',
    'Cybersecurity',
    'Mental Health in Education',
    'Sustainable Development',
    'Financial Literacy',
    'Cloud Computing',
    'Entrepreneurship',
    'Software Engineering',
    'Digital Literacy',
    'Global History',
    'Modern Literature',
    'Biotechnology',
    'Blockchain Technology',
    'Software Development',
    'Psychology',
    'Physics',
    'Digital Marketing',
    'Computer Networking'
  ];

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/login');
      return;
    }

    api.get('topics/')
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setTopics(res.data);
        } else {
          setTopics(majorTopics.map((name, index) => ({ id: index + 1, name })));
        }
      })
      .catch((err) => {
        console.error(err);
        setTopics(majorTopics.map((name, index) => ({ id: index + 1, name })));
      });
  }, [navigate]);

  const getColorClass = (index) => {
    const colors = ['topic-yellow', 'topic-pink', 'topic-green', 'topic-blue', 'topic-purple'];
    return colors[index % colors.length];
  };

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setAiResources("Loading AI-generated resources...");

    api.post('ai-resources/', { topic })
      .then((res) => setAiResources(res.data.resources))
      .catch((err) => {
        console.error("Error fetching AI-generated resources:", err);

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
          setAiResources(
            `⚠️ OpenAI API quota has been exceeded.\n\n` +
            `🔔 We are actvely working on resolving the issue. Full access to resources for Topics will be available soon.\n\n` +
            `Here’s a demo AI resource list for "${topic}":\n\n` +
            "1. Title: Understanding the Basics\n   URL: example.com/intro\n   Description: Beginner-friendly explanation\n\n" +
            "2. Title: Video Lecture\n   URL: example.com/video\n   Description: In-depth walkthrough\n\n" +
            "3. Title: Quiz or Summary Sheet\n   URL: example.com/quiz\n   Description: Interactive way to test knowledge" 
            
          );
        } else {
          setAiResources(
            `⚠️ Unable to fetch AI-generated resources at this time. Showing fallback:\n\n` +
            `Sample resources for "${topic}":\n` +
            "- Introductory guide or Wikipedia article\n" +
            "- Top YouTube explainer video\n" +
            "- A short course or playlist\n" +
            "- Key terms and glossary\n"
          );
        }
      });
  };

  return (
    <div>
      <h2 style={{ color: '#f67280' }}>Explore Educational Topics</h2>
      <h3 style={{ color: 'blue' }}>Select a topic and view resources below and scroll down to view resources</h3>

      <div className="topics-grid">
        {topics.map((topic, index) => (
          <div
            key={topic.id}
            onClick={() => handleTopicSelect(topic.name)}
            className={`topic-card ${getColorClass(index)}`}
          >
            {topic.name}
          </div>
        ))}
      </div>

      {selectedTopic && (
        <div className="resources-container">
          <h1>AI-Generated Resources for "{selectedTopic}"</h1>
          <pre>{aiResources}</pre>
        </div>
      )}
    </div>
  );
};

export default TopicsPage;
