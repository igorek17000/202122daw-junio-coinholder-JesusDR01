//@ts-check
import { emptySplitApi } from './baseAPI';
import { current } from '@reduxjs/toolkit';

const entityBase = `wallet`;

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createWalletPortfolio: builder.mutation({
      query(body) {
        return {
          url: entityBase,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'portfolios', id: 'LIST' }, { type: 'account' }],
    }),
    resyncWalletPortfolio: builder.mutation({
      query(body) {
        return {
          url: `${entityBase}/resync`,
          method: 'PUT',
          body,
        };
      },
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(
            emptySplitApi.util.updateQueryData(
              'getCoinsFromPortfolio',
              { id: body.id },
              (draft) => {
                // console.log(current(draft));
                draft.portfolio = Object.assign(draft.portfolio, data.portfolio);
                // console.log(current(draft));
                return draft;
              },
            ),
          );
        } catch (e) {
          console.log(e);
        }
      },
      // invalidatesTags: ['portfolios'],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateWalletPortfolioMutation, useResyncWalletPortfolioMutation } = extendedApi;
