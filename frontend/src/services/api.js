import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Helper de sanitización estricta por ID
const sanitizeId = (id) => {
  const num = Number(id);
  if (!Number.isNaN(num) && num > 0) {
    return num;
  }
  return String(id).replace(/[^a-zA-Z0-9_-]/g, '');
};

// Autenticación y Equipos (Sprint 1)
export const loginApi = (data) => API.post('/auth/login', data);
export const getEquipmentsApi = () => API.get('/equipments');
export const createEquipmentApi = (data) => API.post('/equipments', data);

// Reporte de Fallas y Mantenimiento (Sprint 2)
export const createIssueApi = (data) => API.post('/issues', data);
export const getIssuesApi = (params) => API.get('/issues', { params });

export const assignIssueApi = (issueId, data) => {
  const safeId = sanitizeId(issueId);
  return API.patch(`/issues/${safeId}/assign`, data);
};

export const updateIssueStatusApi = (issueId, data) => {
  const safeId = sanitizeId(issueId);
  return API.patch(`/issues/${safeId}/status`, data);
};

export const getUsersApi = () => API.get('/users');

export const updateUserRoleApi = (userId, newRole) => {
  const safeId = sanitizeId(userId);
  return API.patch(`/users/${safeId}/role`, { newRole });
};

export default API;