//ts-check
import { emptySplitApi } from './baseAPI';
const entityBase = `kucoin`;

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    createKucoinPortfolio: builder.mutation({
      query(body) {
        return {
          url: entityBase,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'portfolios', id: 'LIST' }, { type: 'account' }],
    }),
    resyncKucoinPortfolio: builder.mutation({
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

export const { useCreateKucoinPortfolioMutation, useResyncKucoinPortfolioMutation } = extendedApi;
