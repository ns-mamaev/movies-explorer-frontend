import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mainApi from '../../utills/MainApi';

const initialState = {
  list: [],
  moviePageData: {},
};

export const fetchMovieData = createAsyncThunk(
  'movies/fetchMovieData',
  async (movieId) => {
    const response = await mainApi.getMovieData(movieId);
    return response.data;
  }
)

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, { payload }) {
      state.list = payload;
    },
    setMoviePageData(state, { payload }) {
      state.moviePageData = payload;
    }
  },
  extraReducers: {
    [fetchMovieData.pending](state, action) {

    },
    [fetchMovieData.fulfilled](state, { payload }) {
      state.moviePageData = payload;
    },
  }
});

export const { setMovies, setMoviePageData } = moviesSlice.actions;

export default moviesSlice.reducer;
