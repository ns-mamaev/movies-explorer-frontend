import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [],
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, { payload }) {
      state.list = payload;
    },
  },
});

export const { setMovies } = moviesSlice.actions;

export default moviesSlice.reducer;
