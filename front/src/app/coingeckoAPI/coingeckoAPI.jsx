//@ts-check
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { cfg } from '../../config/config';

const { coingeckoAPI: coingeckoApiUrl } = cfg;

export const coingeckoApi = createApi({
  tagTypes: [
    'CoingeckoCoins',
  ],
  reducerPath: 'coingeckoApi',
  baseQuery: fetchBaseQuery({
    baseUrl: coingeckoApiUrl,
  }),
  endpoints: (builder) => ({
    searchCoins: builder.query({
      query: () => `search`,
      providesTags: ['CoingeckoCoins'],
    }),
    
  }),
});

export const {useSearchCoinsQuery} = coingeckoApi