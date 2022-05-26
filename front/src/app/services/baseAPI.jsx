//@ts-check
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { cfg } from '../../config/config';
import { cacher } from '../rtkQueryCacheUtils';

const {apiUrl} = cfg;

export const emptySplitApi = createApi({
  tagTypes: [
    'auth',
    'portfolios',
    'coins',
    'transactions',
    'profile',
    'account',
    'UNAUTHORIZED',
    'UNKNOWN_ERROR',
    'binance',
  ],
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
    
    prepareHeaders: (headers, { getState }) => {
      // By default, if we have a token in the store, let's use that for authenticated requests
      // @ts-ignore
      const token = getState()?.auth?.user?.token;
      // console.log(getState());
      if (token) {
        headers.set('JWT', `${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export const genericMutation = (builder,  { url, method = 'POST', type = '' }) =>
  builder.mutation({
    query(body) {
      return {
        url,
        method,
        body,
      };
    },
    invalidatesTags: type ? cacher.invalidatesList(type) : [],
  });

export const genericIdMutation = (builder, { url, method = 'DELETE', type = '' }) =>
  builder.mutation({
    query(data) {
      const { id, ...body } = data;
      return {
        url: `${url}/${id}`,
        method,
        body,
      };
    },
    invalidatesTags: type ? cacher.cacheByIdArgProperty(type) : '',
  });

export const genericIdQuery = (builder, {url, type}) =>
  builder.query({
    query: ({ id }) => `${url}/${id}`,
    providesTags: cacher.providesSimpleList({type, id:'LIST'}),
  });
