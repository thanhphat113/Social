import { axiosInstance } from '~/utils/axiosInstance';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

///////////////// Auth API ///////////////////
export const loginUser = createAsyncThunk(
  "auth/login",
 async (values) => {
  try {
    // const response = await axios.post('https://localhost:7294/api/Auth/login',values);
    const response = await axiosInstance.post('/api/Auth/login', values);
    console.log(response.data)
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
})

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post('/api/Auth/register', userData);
    // const response = await axios.post('https://localhost:7294/api/Auth/login', userData);

    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

///////////// User API ////////////////
export const fetchUserInfo = async (userId) => {
  try {
    const response = await axiosInstance.get(`/api/User/${userId}`);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};


export const updateUser = async (userId, userData) => {
  try {
    const response = await axiosInstance.put(`/api/User/${userId}`, userData);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
}
