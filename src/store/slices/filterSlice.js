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
  extraReducers: {
    [fetchGenres.pending]: (state, action) => {
      console.log('Отправка');
    },
    [fetchGenres.fulfilled]: (state, action) => {
      console.log(state);
    },
    [fetchGenres.rejected]: (state, action) => {
      console.log('Ошибка');
    },
  }
});

export const {
  setMovies,
  setGenres,
} = filterSlice.actions;

export default filterSlice.reducer;
