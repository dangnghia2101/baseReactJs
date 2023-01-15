import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { rootReducerName } from 'reduxs/store/type';
import { AuthState, ResponseData, UserInfo } from 'reduxs/types/authType';

const defaultAuthState: AuthState = {
  isAuth: false,
  token: '',
  refreshToken: '',
  typeLogin: '',
  showBoarding: true,
  user: {
    fullName: '',
    nickName: '',
    email: '',
    phone: '',
    gender: 'male',
    avatar: '',
    dateOfBirth: '',
  },
};

const authSlice = createSlice({
  name: rootReducerName.auth,
  initialState: defaultAuthState,
  reducers: {
    authToken(state: AuthState, action: PayloadAction<ResponseData>) {
      state.isAuth = true;
      state.token = action.payload.accessToken || '';
      state.refreshToken = action.payload.refreshToken || '';
      state.typeLogin = action.payload.typeLogin || state.typeLogin;
    },
    setUserInfo(state: AuthState, action: PayloadAction<UserInfo>) {
      state.user = action.payload;
    },
    signOut(state: AuthState) {
      state.isAuth = false;
      state.token = '';
      state.refreshToken = '';
      state.typeLogin = '';
      state.showBoarding = false;
      state.user = {
        fullName: '',
        nickName: '',
        email: '',
        phone: '',
        gender: 'male',
        avatar: '',
        dateOfBirth: '',
      };
    },
  },
});

export const { authToken, setUserInfo, signOut } = authSlice.actions;
export const AuthReducer = authSlice.reducer;
