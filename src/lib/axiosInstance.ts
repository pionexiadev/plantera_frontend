// src/lib/axiosInstance.ts
import axios from 'axios';

const instance = axios.create({
  baseURL: import.meta.env.PROD
    ? 'https://plant-era-backend.onrender.com/api'
    : 'http://localhost:8080/api',
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('plantera_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
