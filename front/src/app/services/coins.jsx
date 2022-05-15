import { emptySplitApi, genericIdMutation, genericIdQuery, genericMutation } from './baseAPI';
import { cacher } from '../rtkQueryCacheUtils';
import { current } from '@reduxjs/toolkit';
const entityBase = `coins`;

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createCoin: builder.mutation({
      query(body) {
        return {
          url: entityBase,
          method: 'POST',
          body,
        };
      },
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const portfolioId = getState().currentPortfolio;
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            extendedApi.util.updateQueryData(
              'getCoinsFromPortfolio',
              { id: portfolioId },
              (draft) => {
                draft.portfolio.coins.push(data.savedCoin);
                return draft;
              },
            ),
          );
        } catch(e) {
          // console.log(e);
        }
      },
    }),
    getCoins: builder.query({
      query: () => entityBase,
      providesTags: cacher.providesNestedList(entityBase),
    }),
    getTopCoins: builder.query({
      query: () => `coins/top`,
      providesTags: cacher.providesNestedList(entityBase),
    }),
    getTransactionsFromCoin: genericIdQuery(builder, { url: entityBase, type: entityBase }),
    deleteCoin: builder.mutation({
      query({ id }) {
        return {
          url: `${entityBase}/${id}`,
          method: 'DELETE',
        };
      },
      async onQueryStarted({ id }, { dispatch, queryFulfilled, getState }) {
        const portfolioId = getState().currentPortfolio;
        const patchResult = dispatch(
          extendedApi.util.updateQueryData(
            'getCoinsFromPortfolio',
            { id: portfolioId },
            (draft) => {
              draft.portfolio.coins = draft.portfolio.coins.filter((coin) => coin._id !== id);
              // console.log(current(draft));
              return draft;
            },
          ),
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCoinMutation,
  useGetTopCoinsQuery,
  useGetCoinsQuery,
  useSearchCoinQuery,
  useGetTransactionsFromCoinMutation,
  useDeleteCoinMutation,
} = extendedApi;
