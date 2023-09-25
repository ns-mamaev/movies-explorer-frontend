import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './slices/movieSlice';
import historyReducer from './slices/historySlice';
import filterReducer from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    movies: moviesReducer,
    history: historyReducer,
    filter: filterReducer,
  },
})
