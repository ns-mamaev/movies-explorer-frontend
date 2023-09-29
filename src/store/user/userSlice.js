import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import mainApi from '../../utills/MainApi';

const initialState = {
  user: null,
  userSettings: {},
};

export const fetchUserLogin = createAsyncThunk(
  'user/fetchLogin',
  async (userData) => {
    const response = await mainApi.login(userData);
    return response.data;
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {

    },
  },
  extraReducers: {
    [fetchUserLogin.fulfilled](state, { payload }) {
      const { email, name, _id } = payload;
      state.user = { email, name, _id };
    }
  }
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
