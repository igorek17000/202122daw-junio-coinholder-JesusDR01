import { cacher } from 'app/rtkQueryCacheUtils';
import { emptySplitApi, genericMutation, genericIdMutation } from './baseAPI';
const base = `auth`;

const extendedApi = emptySplitApi.injectEndpoints({
  endpoints: (builder) => ({
    login:
    builder.mutation({
      query(body) {
        return {
          url: `${base}/login`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: cacher.invalidatesUnauthorized(),
    }),
    forgotPassword: genericMutation(builder, { url: `${base}/forgot` }),
    recoverPassword: genericMutation(builder, { url: `${base}/reset` }),
    register: genericMutation(builder, { url: `${base}/signup` }),
    validateToken: builder.query({
      query: (token) => ({
        url: `${base}/validate`,
        headers: { JWT: token },
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useRecoverPasswordMutation,
  useRegisterMutation,
  useValidateTokenQuery,
} = extendedApi;
