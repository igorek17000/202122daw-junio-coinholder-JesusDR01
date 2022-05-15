//ts-check
import { emptySplitApi, genericMutation } from './baseAPI';

const entityBase = `account`;
const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    getExistingPortfolios: builder.query({
      query: () => `${entityBase}/existingPortfolios`,
      providesTags: [{ type: entityBase }],
    }),
    getProfile: builder.query({
      query: () => entityBase,
      providesTags: [{ type: entityBase }],
    }),
    modifyBinanceAPI: genericMutation(builder, {
      url: `${entityBase}/modifyBinanceApi`,
      method: 'PUT',
      type: entityBase,
    }),
    modifyKucoinAPI: genericMutation(builder, {
      url: `${entityBase}/modifyKucoinApi`,
      method: 'PUT',
      type: entityBase,
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetExistingPortfoliosQuery,
  useGetProfileQuery,
  useModifyBinanceAPIMutation,
  useModifyKucoinAPIMutation,
} = extendedApi;
