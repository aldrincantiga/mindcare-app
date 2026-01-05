import axios from 'axios';

// When we deploy, we will change this URL to the real backend URL
const API_URL = 'http://localhost:5000/api'; 

const api = axios.create({
  baseURL: API_URL,
});

export default api;