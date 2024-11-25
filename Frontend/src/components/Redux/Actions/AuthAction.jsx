import { createAsyncThunk } from '@reduxjs/toolkit';
import {axiosInstance}  from '~/utils/axiosInstance';
import axios from 'axios';

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

export const logout = createAsyncThunk(
  "user/logout",
  async (thunkAPI) => {
      try {
          const response = await axios.post(
              "http://localhost:5164/api/Auth/logout",
              {},
              { withCredentials: true }
          );
          return response.data;
      } catch {
          return thunkAPI.rejectWithValue(false);
      }
  }
);
