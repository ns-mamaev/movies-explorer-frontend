import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mainApi from '../../utills/MainApi';

const fetchGenres = createAsyncThunk(
  'filter/fetchGenres',
  async () => {
    const response = await mainApi.getGenres();
    return response.data;
  }
);

const initialState = {
  searchValue: '',
  genres: [],
  years: [],
  rating: null,
  sortType: "по умолчанию",
  filtersActive: false,
};

const checkFiltersActive = ({ genres, years, rating }) => {
  return Boolean(genres.length || years.length || rating);
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, { payload }) {
      state.searchValue = payload;
    },
    setGenres(state, { payload }) {
      state.genres = payload;
      state.filtersActive = checkFiltersActive(state);
    },
    setRating(state, { payload }) {
      state.rating = payload;
      state.filtersActive = checkFiltersActive(state);
    },
    setYears(state, { payload }) {
      state.years = payload;
      state.filtersActive = checkFiltersActive(state);
    },
    setSortType(state, { payload }) {
      state.sortType = payload;
    },
    resetFilters(state) {
      state.years = [];
      state.genres = [];
      state.rating = null;
      state.filtersActive = false;
    }
  },
  extraReducers: {
    [fetchGenres.fulfilled]: (state, action) => {
      console.log(state);
    },
  }
});

export const {
  setSearchValue,
  setRating,
  setGenres,
  setSortType,
  setYears,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
