import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:7294',
  withCredentials: true
});