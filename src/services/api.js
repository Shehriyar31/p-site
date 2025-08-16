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
  validateReferral: (code) => api.get(`/auth/validate-referral/${code}`)
};

export const userAPI = {
  getUsers: () => api.get('/users'),
  getUsersByRole: (role) => api.get(`/users/role/${role}`),
  getCurrentUser: (id) => api.get(`/users/${id}`),
  getUserTransactions: (id) => api.get(`/users/${id}/transactions`),
  getSpinnerStatus: (id) => api.get(`/users/${id}/spinner`),
  spinWheel: (id) => api.post(`/users/${id}/spin`),
  createUser: (userData) => api.post('/users', userData),
  updateUser: (id, userData) => api.put(`/users/${id}`, userData),
  deleteUser: (id) => api.delete(`/users/${id}`),
  updateBalance: (id, balanceData) => api.post(`/users/${id}/balance`, balanceData),

  getUserReferrals: (id) => api.get(`/users/${id}/referrals`),
  createWithdrawalRequest: (withdrawalData) => api.post('/requests/withdrawal', withdrawalData)
};

export const requestAPI = {
  getRequests: () => api.get('/requests'),
  createRequest: (requestData) => api.post('/requests', requestData),
  approveRequest: (id) => api.post(`/requests/${id}/approve`),
  rejectRequest: (id) => api.post(`/requests/${id}/reject`),
  deleteRequest: (id) => api.delete(`/requests/${id}`),
  cleanupRejected: () => api.post('/requests/cleanup')
};

export const contactAPI = {
  getContacts: () => api.get('/contacts'),
  createContact: (contactData) => api.post('/contacts', contactData),
  markAsRead: (id) => api.post(`/contacts/${id}/read`),
  deleteContact: (id) => api.delete(`/contacts/${id}`)
};

export const videoAPI = {
  getVideos: () => api.get('/videos/list'),
  getVideoStatus: (userId) => api.get(`/videos/status/${userId}`),
  clickVideo: (userId, videoData) => api.post(`/videos/click/${userId}`, videoData),
  createVideo: (videoData) => api.post('/videos', videoData),
  updateVideo: (id, videoData) => api.put(`/videos/${id}`, videoData),
  deleteVideo: (id) => api.delete(`/videos/${id}`)
};

export default api;