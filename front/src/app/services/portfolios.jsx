import { emptySplitApi, genericIdMutation, genericIdQuery, genericMutation } from './baseAPI';

import { cacher } from '../rtkQueryCacheUtils';
import { setCurrentPortfolio } from 'features/portfolios/portfoliosSlice';
import { current } from '@reduxjs/toolkit';

const entityBase = `portfolios`;

export const portfoliosExtendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createPortfolio: builder.mutation({
      query(body) {
        return {
          url: entityBase,
          method: 'POST',
          body,
        };
      },
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          // console.log(data.savedPortfolio.id);
          
          const patchResult = dispatch(
            portfoliosExtendedApi.util.updateQueryData(
              'getPortfolios',
              undefined,
              (draft) => {
                // console.log(current(draft));
                draft.portfolios.push(data.savedPortfolio);
                return draft;
              },
            ),
          );
          dispatch(setCurrentPortfolio(data.savedPortfolio.id));
        } catch (e) {
          // console.log(e);
        }
      },
    }),
    // genericMutation(builder, { url: entityBase, type: entityBase }),
    getPortfolios: builder.query({
      query: () => entityBase,
      providesTags: cacher.providesNestedList(entityBase),
    }),
    getGlobalPortfolio: builder.query({
      query: () => `${entityBase}/all`,
      providesTags: (result, error) => [{ type: 'coins', id: 'GLOBAL' }],
    }),
    getCoinsFromPortfolio: builder.query({
      query: ({ id }) => `portfolios/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'coins', id: 'LIST' }],
    }),
    deletePortfolio: builder.mutation({
      query({ id }) {
        return {
          url: `${entityBase}/${id}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
        const patchResult = dispatch(
          portfoliosExtendedApi.util.updateQueryData(
            'getPortfolios',
            undefined,
            (draft) => {
              draft.portfolios = draft.portfolios.filter((portfolio) => portfolio.id !== id);
              return draft
            },
          ),
        );
        dispatch(setCurrentPortfolio(null));
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
    overrideExisting: false,
  }),
});

export const {
  useCreatePortfolioMutation,
  useGetCoinsFromPortfolioQuery,
  useGetPortfoliosQuery,
  useDeletePortfolioMutation,
  useGetGlobalPortfolioQuery,
} = portfoliosExtendedApi;
