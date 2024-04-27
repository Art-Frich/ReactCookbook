import { createSlice } from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'searchData',
  initialState: {
    data: [],
    error: null,
    loading: null,
  },
  reducers: {
    handleData: (state, action) => {
      const { data, error, loading } = action.payload;
      state.data = data;
      state.error = error;
      state.loading = loading;
    },
  },
});

export default dataSlice;
export const { handleData } = dataSlice.actions;
