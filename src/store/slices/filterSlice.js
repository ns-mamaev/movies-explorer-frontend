import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
  genres: [],
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
    },
    setGenres(state, { payload }) {
      state.genres = payload;
    },
    setFilters(state, { payload }) {
      
    }
  },
});

export const {
  setMovies,
  setGenres,
} = filterSlice.actions;

export default filterSlice.reducer;
