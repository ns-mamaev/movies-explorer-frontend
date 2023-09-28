import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mainApi from '../../utills/MainApi';

const initialState = {
  allMovies: {
    movies: [],
    totalCount: 0,
  },
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
    setAllMovies(state, { payload }) {
      state.allMovies.movies = payload;
    },
    setMoviePageData(state, { payload }) {
      state.moviePageData = payload;
    }
  },
  extraReducers: {
    [fetchMovieData.fulfilled](state, { payload }) {
      state.moviePageData = payload;
    },
    [fetchMovies.fulfilled](state, { payload: { totalCount, movies } }) {
      if (!totalCount) {
        state.allMovies.movies = [];
        state.allMovies.totalCount = 0;
        return;
      }
      state.allMovies.movies = movies;
      state.allMovies.totalCount = totalCount;
    },
  }
});

export const { setMovies, setMoviePageData } = moviesSlice.actions;

export default moviesSlice.reducer;
