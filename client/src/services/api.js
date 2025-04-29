// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/';  // Use your Django API base URL

const api = axios.create({
  baseURL: API_URL,
});

// Automatically attach token to each request if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // For JWT
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth endpoints
export const registerUser = (data) => api.post('register/', data);
export const loginUser = (data) => api.post('login/', data); // Typically returns a JWT

export default api;
