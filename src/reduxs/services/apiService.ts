import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  retry,
} from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';

import Env from 'config/Env';
import { authToken, hideLoading, showLoading, signOut } from 'reduxs/reducers';
import { RootState } from 'reduxs/store';

import { EndPoint } from './endPoint';

const mutex = new Mutex();

const handleError = (responseError: {
  error: FetchBaseQueryError;
  data?: undefined;
  meta?: FetchBaseQueryMeta | undefined;
}) => {
  if (responseError.error.status !== 400) {
    return 'ngh';
  } else {
    return 'nga';
  }
};

const baseQuery = retry(
  fetchBaseQuery({
    baseUrl: Env.API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).root.auth.refreshToken;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  {
    maxRetries: 0, //  retry 3 times
  },
);
const baseQueryRefreshToken = retry(
  fetchBaseQuery({
    baseUrl: Env.API_BASE_URL,
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const refreshToken = (getState() as RootState).root.auth.refreshToken;
      if (refreshToken) {
        headers.set('authorization', `Bearer ${refreshToken}`);
      }

      return headers;
    },
  }),
  {
    maxRetries: 0, //  retry 3 times
  },
);

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions,
) => {
  // console.log('[REQUEST DATA]', JSON.stringify({ args, url: api.endpoint }));
  if (api.endpoint !== 'getCampaignList') {
    api.dispatch(showLoading());
  }
  await mutex.waitForUnlock(); // wait until the mutex is available without locking it
  let result = await baseQuery(args, api, extraOptions);

  if (!result.error) {
    api.dispatch(hideLoading());
    return result;
  }

  if (result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQueryRefreshToken(EndPoint.refresh_token, api, extraOptions); // send refresh token to get new access token
        if (refreshResult.data) {
          const { data } = refreshResult.data as any;
          api.dispatch(authToken(data)); // store the new token
          result = await baseQuery(args, api, extraOptions); // retry the initial query
        } else {
          api.dispatch(signOut());
        }
      } finally {
        release(); // release must be called once the mutex should be released again.
      }
    } else {
      await mutex.waitForUnlock(); // wait until the mutex is available without locking it
      result = await baseQuery(args, api, extraOptions);
    }
  } else {
    console.error([`status :${result.error.status}`], JSON.stringify(result, null, 5));
    //  handleError(result);
  }
  api.dispatch(hideLoading());

  return result;
};

export const apiService = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

// demo: https://github.dev/gitdagray/redux_jwt_auth/tree/main/src
// demo: https://redux-toolkit.js.org/rtk-query/usage/customizing-queries#axios-basequery
