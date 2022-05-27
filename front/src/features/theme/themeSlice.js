import { createSlice } from '@reduxjs/toolkit';
import { THEMES } from 'constants/portfolio';

const slice = createSlice({
  name: 'theme',
  initialState: THEMES.DEFAULT,
  reducers: {
    setCurrentTheme: (state, { payload }) => {
      // console.log(payload);
      state = payload;
      return state;
    },
  },
});

export const { setCurrentTheme } = slice.actions;

export default slice.reducer;

export const selectCurrentTheme = (state) =>  state.currentTheme;
