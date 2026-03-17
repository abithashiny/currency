import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
});

// Currency APIs
export const convertCurrency = (amount, from, to) =>
  API.post('/currency/convert', { amount, from, to });

export const convertMultiple = (amount, from) =>
  API.post('/currency/convert-multiple', { amount, from });

export const getTrends = (from, to, range) =>
  API.get('/currency/trends', { params: { from, to, range } });

export const getComparison = (target, range) =>
  API.get('/currency/comparison', { params: { target, range } });

// History APIs
export const saveHistory = (data) => API.post('/history', data);
export const getHistory = () => API.get('/history');

// News API
export const getNews = () => API.get('/news');

// AI Chat API
export const sendChat = (message) => API.post('/ai/chat', { message });

// Prediction API
export const getPrediction = (from, to) =>
  API.get('/predict/predict-ml', { params: { from, to } });

export default API;