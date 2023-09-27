import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/movieSlice';
import historyReducer from './slices/historySlice';
import filterReducer from './filter/filterSlice';
import rouletteReducer from './slices/rouletteSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    history: historyReducer,
    filter: filterReducer,
    roulette: rouletteReducer,
    user: userReducer,
  },
})
