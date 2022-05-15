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
  },
});

export const { setCurrentPortfolio } = slice.actions;

export default slice.reducer;

export const selectCurrentPortfolio = (state) =>  state.currentPortfolio;
