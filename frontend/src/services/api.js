import axios from 'axios';
import { toast } from 'react-toastify';

const API = axios.create({
  baseURL: '//3.253.15.40:8080/api',
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
    console.log('[AUTH HEADER]', req.headers.Authorization);
  }
  return req;
});

API.interceptors.response.use(
  res => res,
  err => {
    if (err.response && err.response.status === 401) {
      toast.error('Session expired, please log in again');
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default API;
