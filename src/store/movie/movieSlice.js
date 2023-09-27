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

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  async (queryObj) => {
  const response = await mainApi.getMovies(queryObj);
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
    [fetchMovieData.fulfilled](state, { payload }) {
      state.moviePageData = payload;
    },
    [fetchMovies.pending](state, action) {
      console.log(action);
    },
    [fetchMovies.fulfilled](state, { payload }) {
      state.list = payload;
    },
    [fetchMovies.rejected](state, action) {
      console.log(action.error)
    }
  }
});

export const { setMovies, setMoviePageData } = moviesSlice.actions;

export default moviesSlice.reducer;
