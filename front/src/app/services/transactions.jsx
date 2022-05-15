import { cacher } from 'app/rtkQueryCacheUtils';
import { emptySplitApi,  genericIdQuery } from './baseAPI';
import { current } from '@reduxjs/toolkit';

const entityBase = `transactions`;
const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createTransaction: builder.mutation({
      query(body) {
        return {
          url: entityBase,
          method: 'POST',
          body,
        };
      },
      async onQueryStarted(body, { dispatch, queryFulfilled, getState }) {
        try {
          // console.log(body);
          const idCoin = body?.idCoin;
          const portfolioId = getState().currentPortfolio;
          const { data } = await queryFulfilled;
          const patchResult = dispatch(
            extendedApi.util.updateQueryData(
              'getCoinsFromPortfolio',
              { id: portfolioId },
              (draft) => {
                // console.log(current(draft));
                draft.portfolio.coins
                  .find((coin) => coin._id === idCoin)
                  .transactions.push(data.savedTransaction);
                return draft;
              },
            ),
          );
        } catch (e) {
          // console.log(e);
        }
      },
    }),

    getTransactions: builder.query({
      query: () => entityBase,
      providesTags: cacher.providesNestedList(entityBase),
    }),
    getTransaction: genericIdQuery(builder, { url: entityBase, type: entityBase }),
    updateTransaction: builder.mutation({
      query({ id, ...body }) {
        return {
          url: `${entityBase}/${id}`,
          method: 'PUT',
          body,
        };
      },
      async onQueryStarted({ id, ...body }, { dispatch, queryFulfilled, getState }) {
        // console.log(body);
        const portfolioId = getState().currentPortfolio;
        const patchResult = dispatch(
          extendedApi.util.updateQueryData(
            'getCoinsFromPortfolio',
            { id: portfolioId },
            (draft) => {
              const coin = draft.portfolio.coins.find((coin) =>
                coin.transactions.some((transaction) => transaction._id === id),
              );
              const coinTransaction = coin.transactions.find((transaction) => transaction._id === id);
              Object.assign(coinTransaction, body);
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
    deleteTransaction: builder.mutation({
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
              // console.log(current(draft));
              const coin = draft.portfolio.coins.find((coin) =>
                coin.transactions.some((transaction) => transaction._id === id),
              );
              draft.portfolio.coins[draft.portfolio.coins.indexOf(coin)].transactions =
                draft.portfolio.coins[draft.portfolio.coins.indexOf(coin)].transactions.filter(
                  (transaction) => transaction._id !== id,
                );
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
  useCreateTransactionMutation,
  useGetTransactionQuery,
  useGetTransactionsQuery,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = extendedApi;
