// src/lib/axiosInstance.ts
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://plantera-backend.onrender.com/api',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('plantera_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
