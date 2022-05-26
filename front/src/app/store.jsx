import { configureStore } from '@reduxjs/toolkit';
import { emptySplitApi } from './services/baseAPI';
import { persistedReducer, ignoredActions } from './persist';
import { persistStore } from 'redux-persist';
import { coingeckoApi } from './coingeckoAPI/coingeckoAPI';
import { setupListeners } from '@reduxjs/toolkit/dist/query';

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      ignoredActions,
    })
      .concat(emptySplitApi.middleware)
      .concat(coingeckoApi.middleware),
});
setupListeners(store.dispatch);
export const persistor = persistStore(store);