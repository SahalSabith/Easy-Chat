import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

// Retrieve user data safely from local storage
const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
const token = localStorage.getItem('token') || null;
const refreshToken = localStorage.getItem('refreshToken') || null;

// Async thunk for registering a user
export const register = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/api/signup/`, userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for logging in a user
export const login = createAsyncThunk(
  'auth/login',
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/api/login/`, userData);
      const { access, refresh } = response.data;

      // Store tokens in local storage
      localStorage.setItem('token', access);
      localStorage.setItem('refreshToken', refresh);

      return { token: access, refreshToken: refresh };
    } catch (error) {
      const message = error.response?.data || error.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Async thunk for logging out a user
export const logout = createAsyncThunk('auth/logout', async () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
});

// Async thunk to refresh the token
export const refreshAuthToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, thunkAPI) => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return thunkAPI.rejectWithValue("No refresh token found.");
      }

      const response = await axios.post(`${API_URL}/api/token/refresh/`, { refresh: refreshToken });
      const newAccessToken = response.data.access;

      // Update the token in local storage
      localStorage.setItem('token', newAccessToken);

      return newAccessToken;
    } catch (error) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      return thunkAPI.rejectWithValue("Token refresh failed.");
    }
  }
);

// Axios interceptor for refreshing token on 401 errors
export const setupAxiosInterceptors = (store) => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response && error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await store.dispatch(refreshAuthToken()).unwrap();

          if (newAccessToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axios(originalRequest);
          }
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

// Initial state
const initialState = {
  user: user || null,
  token: token || null,
  refreshToken: refreshToken || null,
  isAuthenticated: !!token,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: ''
};

// Authentication slice
export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    }
  },
  extraReducers: (builder) => {
    builder
      // Register cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })

      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })

      // Logout cases
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })

      // Refresh token cases
      .addCase(refreshAuthToken.fulfilled, (state, action) => {
        state.token = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(refreshAuthToken.rejected, (state) => {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      });
  }
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
