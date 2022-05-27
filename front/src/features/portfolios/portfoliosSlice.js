import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'currentPortfolio',
  initialState: '',
  reducers: {
    setCurrentPortfolio: (state, { payload }) => {
      // console.log(payload);
      state = payload;
      return state;
    },
    unsetCurrentPortfolio: (state, {payload}) => {
      state = '';
      return state;
    }
  },
});

export const { setCurrentPortfolio, unsetCurrentPortfolio } = slice.actions;

export default slice.reducer;

export const selectCurrentPortfolio = (state) =>  state.currentPortfolio;
