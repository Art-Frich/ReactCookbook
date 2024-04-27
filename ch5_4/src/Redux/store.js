import axiosMiddleware from './axiosMiddleware';
import dataSlice from './dataSlice';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: {
    searchData: dataSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(axiosMiddleware),
});

export default store;
