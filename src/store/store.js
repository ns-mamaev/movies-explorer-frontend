import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './movie/movieSlice';
import historyReducer from './slices/historySlice';
import filterReducer from './filter/filterSlice';
import rouletteReducer from './roulette/rouletteSlice';
import userReducer from './user/userSlice';
import savedMoviesReducer from './savedMovies/savedMoviesSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    savedMovies: savedMoviesReducer,
    history: historyReducer,
    filter: filterReducer,
    roulette: rouletteReducer,
    user: userReducer,
  },
})
