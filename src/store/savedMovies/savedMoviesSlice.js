import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mainApi from '../../utills/MainApi';

const initialState = {
  list: null,
};

export const fetchSavedMovies = createAsyncThunk(
  'savedMovies/fetchmovies',
  async () => {
    const response = await mainApi.getSavedMovied();
    return response.data;
  }
);

export const fetchSave = createAsyncThunk(
  'savedMovies/fetchSave',
  async (id) => {
    const response = await mainApi.saveMovie(id);
    return response.data;
  }
);

export const fetchRemove = createAsyncThunk(
  'savedMovies/fetchRemove',
  async (id) => {
    await mainApi.removeMovie(id);
  }
);

export const savedMoviesSlice = createSlice({
  name: 'savedMovies',
  initialState,
  reducers: {
    setList() {

    }
  },
  extraReducers: {
    [fetchSavedMovies.fulfilled](state, { payload }) {
      state.list = payload;
    },
    [fetchSave.fulfilled](state, action) {
      console.log(action)
    }
  },
});

export const { setList } = savedMoviesSlice.actions;

export default savedMoviesSlice.reducer;
