import { combineReducers, configureStore } from '@reduxjs/toolkit';
import Env from 'config/Env';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import logger from 'redux-logger';
import { AuthReducer, PostReducer } from 'reduxs/reducers';
import { rootReducerName } from './type';

const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({
  history: createBrowserHistory(),
  reduxTravelling: Env.isDev(),
  savePreviousLocations: 1,
});

const rootReducer = combineReducers({
  [rootReducerName.auth]: AuthReducer,
  [rootReducerName.post]: PostReducer,
  // ...other reducers here
});

export const store = configureStore({
  reducer: {
    // ? Add the authReducer to the reducer object
    root: rootReducer,
    router: routerReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: false }).concat(routerMiddleware).concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const history = createReduxHistory(store);
