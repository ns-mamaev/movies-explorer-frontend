import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mainApi from '../../utills/MainApi';
import { SORT_OPTIONS } from './contants';

const fetchGenres = createAsyncThunk(
  'filter/fetchGenres',
  async () => {
    const response = await mainApi.getGenres();
    return response.data;
  }
);

const initialState = {
  searchValue: '',
  filters: {
    genres: [],
    years: [],
    rating: null,
    sortType: SORT_OPTIONS[0].type,
  },
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
      state.filters.genres = payload;
      state.filtersActive = checkFiltersActive(state.filters);
    },
    setRating(state, { payload }) {
      state.filters.rating = payload;
      state.filtersActive = checkFiltersActive(state.filters);
    },
    setYears(state, { payload }) {
      state.filters.years = payload;
      state.filtersActive = checkFiltersActive(state.filters);
    },
    setSortType(state, { payload }) {
      state.filters.sortType = payload;
    },
    resetFilters(state) {
      state.filters.years = [];
      state.filters.genres = [];
      state.filters.rating = null;
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
