//@ts-check
import { emptySplitApi } from './baseAPI';
const entityBase = `binance`;

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createBinancePortfolio: builder.mutation({
      query(body) {
        return {
          url: entityBase,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'portfolios', id: 'LIST' }, { type: 'account' }],
    }),
    resyncBinancePortfolio: builder.mutation({
      query(body) {
        return {
          url: `${entityBase}/resync`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['portfolios'],
    }),
  }),
  overrideExisting: false,
});

export const { useCreateBinancePortfolioMutation, useResyncBinancePortfolioMutation } = extendedApi;
