import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGroupInfo } from '../../../apis';
import axios from "axios";


export const getUserProfile = createAsyncThunk("profile/getUserProfile", async (userId) => {
  try {
      const response = await axios.get(
          `http://localhost:5164/api/User/${userId}`,
          {
              withCredentials: true,
          }
      );
      return response.data;
  } catch {
      return null;
  }
});

// Lấy thông tin nhóm
export const getGroupProfile = createAsyncThunk(
  'profile/getGroupProfile',
  async (groupId) => {
    try {
      const response = await axios.get(
        `http://localhost:5164/api/Group/${groupId}`,
        {
            withCredentials: true,
        }
    );
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data || 'Error fetching group profile';
      throw new Error(errorMessage);
      }
  }
);
