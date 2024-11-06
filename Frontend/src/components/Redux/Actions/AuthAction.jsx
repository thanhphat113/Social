import { loginUser } from '~/apis';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = (values) => async (dispatch) => {
  try {
    await dispatch(loginUser(values));
  } catch (error) {
    console.error("Login failed: ", error);
  }
};

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
