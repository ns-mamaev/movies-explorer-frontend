import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: '',
};

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
    },
    setFilters(state, { payload }) {
      
    }
  },
});

export const {
  setMovies,

} = filterSlice.actions;

export default filterSlice.reducer;
