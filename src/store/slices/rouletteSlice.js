import { createSlice } from '@reduxjs/toolkit';

export const MOOD_TYPES = ["funny", "basic", "sad", "amazed", "tense"];

export const ROULETTE_FILTERS = [
  { name: '5years', caption: "не старше 5 лет", type: "year" },
  { name: 'new', caption: "новые", type: "year" },
  { name: 'hight', caption: "высокий рейтинг", type: "rating" },
  { name: 'top250', caption: "топ 250", type: "rating" },
  { name: 'russian', caption: "российские", type: "country" },
  { name: 'foreign', caption: "зарубежные", type: "country" },
];

const initialState = {
  mood: MOOD_TYPES[0],
  filters: Object.fromEntries(ROULETTE_FILTERS.map(({ type }) => [type, ''])),
};

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
    }
  },
});

export const { setMood, setFilters } = rouletteSlice.actions;

export default rouletteSlice.reducer;
