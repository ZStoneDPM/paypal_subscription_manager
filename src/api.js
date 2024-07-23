// src/api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this points to your backend
});

export const createSubscription = (data) => API.post('/create-subscription', data);
export const getSubscriptions = () => API.get('/subscriptions');
export const getPlans = () => API.get('/subscriptions/plans');
export const updatePlan = (id, data) => API.patch(`/subscriptions/plans/${id}`, data);

