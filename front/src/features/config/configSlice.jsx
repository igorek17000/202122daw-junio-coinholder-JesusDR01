import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'config',
  initialState: {},
  reducers: {
    setConfig: (state, { payload }) => {      
      state.config = {...payload};
    },
  },
});

export const { setConfig } = slice.actions;

export default slice.reducer;

export const selectConfig = (state) => state.config;