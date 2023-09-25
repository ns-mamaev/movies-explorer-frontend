import { createSlice } from '@reduxjs/toolkit';

export const MOOD_TYPES = ["funny", "basic", "sad", "amazed", "tense"];

const initialState = {
  mood: MOOD_TYPES[0],
};

export const rouletteSlice = createSlice({
  name: 'roulette',
  initialState,
  reducers: {
    setMood(state, { payload }) {
      state.mood = payload;
    },
  },
});

export const { setMood } = rouletteSlice.actions;

export default rouletteSlice.reducer;
