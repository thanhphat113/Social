import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from '../../../apis';

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
    },
    loginFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
    extraReducers:(builder) => {
      builder
          .addCase(loginUser.fulfilled,(state,action) => {

          })
          .addCase(loginUser.rejected,(state,action) => {
            
          })
          .addCase(loginUser.pending,(state,action) => {
            
          })

          
    }
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
