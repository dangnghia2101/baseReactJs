import { createSlice } from '@reduxjs/toolkit';
import { rootReducerName } from 'reduxs/store/type';
import { LoadingState } from 'reduxs/types/loadingType';

const defaultAuthState: LoadingState = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: rootReducerName.loading,
  initialState: defaultAuthState,
  reducers: {
    showLoading(state: LoadingState) {
      state.isLoading = true;
    },
    hideLoading(state: LoadingState) {
      state.isLoading = false;
    },
  },
});

export const { hideLoading, showLoading } = loadingSlice.actions;
export const LoadingReducer = loadingSlice.reducer;
