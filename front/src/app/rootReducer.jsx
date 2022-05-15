import { emptySplitApi } from './services/baseAPI';
import authReducer from '../features/auth/authSlice';
import portfolioReducer from '../features/portfolios/portfoliosSlice';
import coinReducer from '../features/coins/coinsSlice';
import { combineReducers } from '@reduxjs/toolkit';
import { coingeckoApi } from './coingeckoAPI/coingeckoAPI';

//Sadly at the moment there is not way to prevent creating a rootReducer using redux-persist :(

export const rootReducer = combineReducers({
  [emptySplitApi.reducerPath]: emptySplitApi.reducer,
  [coingeckoApi.reducerPath]: coingeckoApi.reducer,
  auth: authReducer,
  currentPortfolio: portfolioReducer,
  currentCoin: coinReducer
});
