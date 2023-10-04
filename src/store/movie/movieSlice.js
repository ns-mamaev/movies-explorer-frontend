import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mainApi from '../../utills/MainApi';

const initialState = {
  allMovies: {
    movies: [],
    totalCount: 0,
    offset: 0,
  },
  wasFetched: false,
  moviePageData: {},
};

export const fetchMovieData = createAsyncThunk(
  'movies/fetchMovieData',
  async (movieId) => {
    const response = await mainApi.getMovieData(movieId);
    return response.data;
  }
)

const fetchMoviesPayloadCreator = async (queryObj, { getState }) => {
  const state = getState();
  const { offset } = state.movies.allMovies;
  const response = await mainApi.getMovies({ ...queryObj, offset });
  return response.data;
};

export const fetchMovies = createAsyncThunk(
  'movies/fetchMovies',
  fetchMoviesPayloadCreator,
)

export const fetchMoreMovies = createAsyncThunk(
  'movies/fetchMoreMovies',
  fetchMoviesPayloadCreator,
)

const clearAllMovies = (state) => {
  state.allMovies.totalCount = 0;
  state.allMovies.movies = [];
  state.offset = 0;
}

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setAllMovies(state, { payload }) {
      state.allMovies.movies = payload;
    },
    setOffset(state, { payload }) {
      state.allMovies.offset = payload;
    },
    setMoviePageData(state, { payload }) {
      state.moviePageData = payload;
    }
  },
  extraReducers: {
    [fetchMovieData.fulfilled](state, { payload }) {
      state.moviePageData = payload;
    },
    [fetchMovies.fulfilled](state, { payload }) {
      if (!payload) {
        clearAllMovies(state);
      } else {
        const { totalCount, offset, movies } = payload;
        state.allMovies.totalCount = totalCount;
        state.allMovies.movies = movies;
        state.allMovies.offset = offset;
      }
    },
    [fetchMoreMovies.fulfilled](state, { payload }) {
      if (!payload) {
        clearAllMovies(state);
      }
      const { totalCount, offset, movies } = payload;
      state.allMovies.totalCount = totalCount;
      state.allMovies.offset = offset;
      state.allMovies.movies = [...state.allMovies.movies, ...movies];
    },
  }
});

export const { setMovies, setMoviePageData, setOffset } = moviesSlice.actions;

export default moviesSlice.reducer;
