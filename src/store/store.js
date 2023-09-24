import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/movieSlice';
import historyReducer from './slices/historySlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    history: historyReducer,
  },
})
