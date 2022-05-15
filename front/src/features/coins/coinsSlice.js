import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'currentCoin',
  initialState: '',
  reducers: {
    setCurrentCoin: (state,  {payload} ) => {
      state = payload;
      return state;
    },
  },
});

export const { setCurrentCoin } = slice.actions;

export default slice.reducer;

export const selectCurrentCoin = (state) =>  state.currentCoin;
