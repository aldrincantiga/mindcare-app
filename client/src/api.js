import axios from 'axios';

// When we deploy, we will change this URL to the real backend URL
// Change this line!
const API_URL = 'https://mindcare-server-v78p.onrender.com/api';

const api = axios.create({
  baseURL: API_URL,
});

export default api;