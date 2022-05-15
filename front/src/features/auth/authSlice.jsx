import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'auth',
  initialState: {},
  reducers: {
    setCredentials: (state, { payload }) => {
      state.user = {
        email: payload?.email,
        token: payload?.token,
        username: payload?.username,
      };
    },
    setRole: (state, { payload }) => {
      state.role = payload;
    },
    logout: (state, action) => {
      state.user = undefined;
      state.role = undefined;
    },
  },
});

export const { setCredentials, setRole, logout } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state) => state.auth.user;

export const selectCurrentRole = (state) => state.auth.role;
