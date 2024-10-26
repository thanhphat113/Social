import { axiosInstance } from '~/utils/axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const loginUser = createAsyncThunk(
  "auth/login",
 async (Email, Password) => {
  try {
    const response = await axios.post('http://localhost:5164/api/Auth/Login',{Email,Password});
    // const response = await axiosInstance.post('/api/Auth/login', { email, password });
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
})

export const registerUser = async (userData) => {
  try {
    // const response = await axiosInstance.post('/api/Auth/register', userData);
    const response = await axios.post('http://localhost:5164/api/Auth/register', userData);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};