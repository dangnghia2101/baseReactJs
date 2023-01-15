import { ParamBodySignUp, ResponseSignUpAPI } from 'reduxs/types/signUpType';
import { apiService } from './apiService';

export const signUpAPI = apiService.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation<ResponseSignUpAPI, ParamBodySignUp>({
      query: ({ body }) => {
        return {
          url: 'URL call api',
          method: 'POST',
          body,
        };
      },
      transformResponse: (response: { data: ResponseSignUpAPI }) => response.data,
      async onQueryStarted({ body: { email, password } }, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
        } catch (error) {}
      },
    }),
  }),
});

export const { useSignUpMutation } = signUpAPI;
