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
      const isAlreadyInList = state.list.find(({ id }) => id === payload.id);
      if (isAlreadyInList) {
        return;
      }
      let updatedList = [...state.list];
      if (state.length >= LIST_LIMIT) {
        updatedList = updatedList.slice(1);
      }
      updatedList.push(payload);
      state.list = updatedList;
    },
  },
});

export const { addToHistory } = historySlice.actions;

export default historySlice.reducer;
