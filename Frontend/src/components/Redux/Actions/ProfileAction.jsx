import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGroupInfo, fetchUserInfo } from '../../../apis';


export const getUserProfile = createAsyncThunk('profile/getUserProfile', async (userId, { rejectWithValue }) => {
    try {
        const response = await fetchUserInfo(userId)
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
})


export const getGroupProfile = createAsyncThunk('profile/getGroupProfile', async (groupId, { rejectWithValue }) => {
  try {
      const response = await fetchGroupInfo(groupId)
    return response;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})