import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  timeout: 30000,
});

export const generateBrand = (data) => API.post('/brand/generate', data);
export const selectConcept = (data) => API.post('/brand/select', data);
export const getKit = (id) => API.get(`/brand/${id}`);
export const getStats = () => API.get('/stats');
export const getReviews = () => API.get('/reviews');
export const submitReview = (data) => API.post('/reviews', data);

export default API;
