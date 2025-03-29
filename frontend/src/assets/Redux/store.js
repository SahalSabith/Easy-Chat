import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './themeSlice.js';
import authReducer from './authSlice';
import roomReducer from './roomSlice.js'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    rooms:roomReducer,
  },
});

export default store;