import { axiosInstance } from '~/utils/axiosInstance';
import axios from 'axios';


export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/api/Auth/login', { email, password });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const registerUser = async (userData) => {
  try {
    // const response = await axiosInstance.post('/api/Auth/register', userData);
    const response = await axios.post('https://localhost:7294/api/Auth/register', userData);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};