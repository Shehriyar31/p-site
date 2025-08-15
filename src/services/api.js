import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
};

export const userAPI = {
  getUsers: () => api.get('/users'),
  getUsersByRole: (role) => api.get(`/users/role/${role}`),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  updateBalance: (id, balanceData) => api.post(`/users/${id}/balance`, balanceData)
};

export const requestAPI = {
  getRequests: () => api.get('/requests'),
  createRequest: (requestData) => api.post('/requests', requestData),
  approveRequest: (id) => api.post(`/requests/${id}/approve`),
  rejectRequest: (id) => api.post(`/requests/${id}/reject`),
  deleteRequest: (id) => api.delete(`/requests/${id}`),
  cleanupRejected: () => api.post('/requests/cleanup')
};

export default api;