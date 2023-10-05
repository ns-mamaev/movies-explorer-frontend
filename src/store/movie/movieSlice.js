import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mainApi from '../../utills/MainApi';

const initialState = {
  allMovies: {
    movies: null,
    totalCount: 0,
    offset: 0,
  },
  moviePageData: null,
  randomMovie: null,
  randomFirstFetch: true,
  savedMovies: null,
  
};

export const fetchMovieData = createAsyncThunk(
  'movies/fetchMovieData',
  async (movieId) => {
    const response = await mainApi.getMovieData(movieId);
    return response.data;
  }
)

export const fetchRandomMovie = createAsyncThunk(
  'roulette/fetchRandomMovie',
  async (_, thunkAPI) => {
    const { mood, filters } = thunkAPI.getState().roulette;
    const queryParams = { ...filters, mood }
    const response = await mainApi.getRandomMovie(queryParams);
    return response.data;
  }
);

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

export const fetchSavedMovies = createAsyncThunk(
  'movies/fetchSavedMovies',
  async () => {
    const response = await mainApi.getSavedMovied();
    return response.data;
  }
);

export const fetchSave = createAsyncThunk(
  'movies/fetchSave',
  async (id) => {
    await mainApi.saveMovie(id);
    return id;
  }
);

export const fetchRemove = createAsyncThunk(
  'movies/fetchRemove',
  async (id) => {
    await mainApi.removeMovie(id);
    return id;
  }
);

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
    },
    setRandomFirstFetch(state) {
      state.randomFirstFetch = false;
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
    [fetchSavedMovies.fulfilled](state, { payload }) {
      state.savedMovies = payload;
    },
    [fetchSave.fulfilled] (state, { payload }) {
      if (state.savedMovies) {
        const movieIndex = state.allMovies.movies.findIndex(({ _id }) => _id === payload);
        if (movieIndex !== -1) {
          state.allMovies.movies[movieIndex].isLiked = true;
        }
      }
      if (state.moviePageData && state.moviePageData._id === payload) {
        state.moviePageData.isLiked = true;
      }
      if (state.randomMovie && state.randomMovie._id === payload) {
        state.randomMovie.isLiked = true;
      }
    },
    [fetchRemove.fulfilled] (state, { payload }) {
      if (state.savedMovies) {
        state.savedMovies = state.savedMovies.filter(({ _id }) => _id !== payload);
      }
      if (state.allMovies.movies) {
        const movieIndex = state.allMovies.movies.findIndex(({ _id }) => _id === payload);
        if (movieIndex !== -1) {
          state.allMovies.movies[movieIndex].isLiked = false;
        }
      }
      if (state.moviePageData && state.moviePageData._id === payload) {
        state.moviePageData.isLiked = false;
      }
      if (state.randomMovie && state.randomMovie._id === payload) {
        state.randomMovie.isLiked = false;
      }
    },
    [fetchRandomMovie.fulfilled]: (state, { payload }) => {
      state.randomMovie = payload;
      if (state.randomFirstFetch) {
        state.randomFirstFetch = false;
      }
    }
  }
});

export const { setMovies, setMoviePageData, setOffset, setRandomFirstFetch } = moviesSlice.actions;

export default moviesSlice.reducer;
