import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
    },
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
