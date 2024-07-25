import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Ensure this points to your backend
});

export const createSubscription = (data) => API.post('/subscriptions/create', data);
export const getSubscriptions = () => API.get('/subscriptions');
export const getPlans = (page = 1) => API.get(`/subscriptions/plans?page=${page}`);
export const updatePlan = (id, data) => API.patch(`/subscriptions/plans/${id}`, data);
export const deactivatePlan = (id) => API.post(`/subscriptions/plans/${id}/deactivate`);
export const activatePlan = (id) => API.post(`/subscriptions/plans/${id}/activate`);
