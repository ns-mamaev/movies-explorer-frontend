import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import mainApi from '../../utills/MainApi';
import { MOOD_TYPES, ROULETTE_FILTERS } from './constants';

const initialState = {
  mood: MOOD_TYPES[0],
  filters: Object.fromEntries(ROULETTE_FILTERS.map(({ type }) => [type, ''])),
  movie: null,
};

export const fetchRandomMovie = createAsyncThunk(
  'roulette/fetchRandomMovie',
  async (_, thunkAPI) => {
    const { mood, filters } = thunkAPI.getState().roulette;
    const queryParams = { ...filters, mood }
    const response = await mainApi.getRandomMovie(queryParams);
    return response.data;
  }
)

export const rouletteSlice = createSlice({
  name: 'roulette',
  initialState,
  reducers: {
    setMood(state, { payload }) {
      state.mood = payload;
    },
    setFilters(state, { payload: { type, name } }) {
      if (state.filters[type] === name) {
        state.filters[type] = '';
      } else {
        state.filters[type] = name;
      }
    },
    setMovie(state, { payload }) {
      this.state.movie = payload;
    } 
  },
  extraReducers: {
    [fetchRandomMovie.fulfilled]: (state, { payload }) => {
      state.movie = payload;
    }
  }
});

export const { setMood, setFilters } = rouletteSlice.actions;

export default rouletteSlice.reducer;
