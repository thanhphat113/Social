import { createSlice } from '@reduxjs/toolkit';
import { getGroupProfile, getUserProfile } from '../Actions/ProfileAction';


const initialState = {
  profile: null,
  error: null,
  loading: false,
  isUser:false,
  isGroup:false,
  groupInfo: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    clearProfile(state) {
      state.profile = null;
      state.isUser = false;
      state.isGroup = false;
    },
    updateGroupInfo: (state, action) => {
      state.groupInfo = action.payload;
  },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.isUser = true;
        state.error = null;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getGroupProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroupProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
        state.isGroup = true;
        state.error = null;
      })
      .addCase(getGroupProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      ;
  },
});

export const { clearProfile, updateGroupInfo  } = profileSlice.actions;

export default profileSlice.reducer;