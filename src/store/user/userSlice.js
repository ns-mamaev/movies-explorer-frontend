import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import mainApi from '../../utills/MainApi';
import { FETCH_STATUS } from '../../utills/constants';

const initialState = {
  user: null,
  userSettings: {},
  fetchLoginState: {
    status: null,
    error: null,
  },
  fetchRegisterState: {
    status: null,
    error: null,
  },
};

export const fetchUserLogin = createAsyncThunk(
  'user/fetchLogin',
  async (userData) => {
    const response = await mainApi.login(userData);
    return response.data;
  }
);

export const fetchUserRegister = createAsyncThunk(
  'user/fetchRegister',
  async (userData) => {
    const response = await mainApi.register(userData);
    return response;
  }
);

const setUserByPayload = (state, payload) => {
  const { email, name, _id } = payload;
  state.user = { email, name, _id };
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
    },
    clearFetchLoginStatus(state) {
      state.fetchLoginState.status = null;
    },
    clearFetchRegisterStatus(state) {
      state.fetchLoginState.status = null;
    },
  },
  extraReducers: {
    [fetchUserLogin.pending](state) {
      state.fetchLoginState.status = FETCH_STATUS.pending;
    },
    [fetchUserLogin.fulfilled](state, { payload }) {
      setUserByPayload(state, payload);
      state.fetchLoginState.status = FETCH_STATUS.fulfilled;
    },
    [fetchUserLogin.rejected](state, { error }) {
      state.fetchLoginState.status = FETCH_STATUS.rejected;
      state.fetchLoginState.error = error.message;
    },
    [fetchUserRegister.pending](state) {
      state.fetchRegisterState.status = FETCH_STATUS.pending;
    },
    [fetchUserRegister.fulfilled](state, { payload }) {
      setUserByPayload(state, payload);
      state.fetchRegisterState.status = FETCH_STATUS.fulfilled;
    },
    [fetchUserRegister.rejected](state, { error }) {
      state.fetchRegisterState.status = FETCH_STATUS.rejected;
      state.fetchRegisterState.error = error.message;
    },
  }
});

export const { setUser, clearFetchLoginStatus, clearFetchRegisterStatus } = userSlice.actions;

export default userSlice.reducer;
