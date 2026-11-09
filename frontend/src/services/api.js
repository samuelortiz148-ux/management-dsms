import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const rawToken = localStorage.getItem('token');
  if (rawToken) {
    const token = decodeURIComponent(rawToken);
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Autenticación y Equipos (Sprint 1)
export const loginApi = (data) => API.post('/auth/login', data);
export const getEquipmentsApi = () => API.get('/equipments');
export const createEquipmentApi = (data) => API.post('/equipments', data);

// Reporte de Fallas y Mantenimiento (Sprint 2)
export const createIssueApi = (data) => API.post('/issues', data);
export const getIssuesApi = (params) => API.get('/issues', { params });

export const assignIssueApi = (issueId, data) => 
  API.patch(`/issues/${encodeURIComponent(String(issueId))}/assign`, data);

export const updateIssueStatusApi = (issueId, data) => 
  API.patch(`/issues/${encodeURIComponent(String(issueId))}/status`, data);

export const getUsersApi = () => API.get('/users');

export const updateUserRoleApi = (userId, newRole) => 
  API.patch(`/users/${encodeURIComponent(String(userId))}/role`, { newRole });

export default API;