import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, AuthState } from '@/types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loadingStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    loadingStop: (state) => {
      state.isLoading = false;
      state.error = null;
    },
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    loginSuccess: (state) => {
      state.isLoading = false;
      state.isAuthenticated = true;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
  },
});

export const {
  loadingStart,
  loadingStop,
  setUser,
  loginSuccess,
  loginFailure,
  logout,
} = authSlice.actions;
export default authSlice.reducer;
