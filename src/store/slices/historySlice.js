import { createSlice } from '@reduxjs/toolkit';
const LIST_LIMIT = 8;

const initialState = {
  list: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addToHistory(state, { payload }) {
      const { list } = state;
      const inListIndex = list.findIndex(({ id }) => id === payload.id);
      console.log(inListIndex)
      if (inListIndex !== -1) {
        state.list = [list[inListIndex], ...list.slice(0, inListIndex), ...list.slice(inListIndex + 1)];
        return;
      }
      if (list.length >= LIST_LIMIT) {
        state.list = list.slice(0, 1);
      }
      state.list.unshift(payload);
    },
  },
});

export const { addToHistory } = historySlice.actions;

export default historySlice.reducer;
