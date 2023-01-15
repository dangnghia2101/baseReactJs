import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { rootReducerName } from '../store/type';

export interface IPost {
  id: string;
  title: string;
  body: string;
}

interface PostState {
  posts: IPost[];
}

const initialState: PostState = {
  posts: [],
};

export const postSlice = createSlice({
  name: rootReducerName.post,
  initialState,
  reducers: {
    createPost: (state, action: PayloadAction<IPost>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.posts = [...state.posts, action.payload];
    },
    deletePost: (state, action: PayloadAction<{ id: string }>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      // eslint-disable-next-line no-underscore-dangle
      const handleData = state.posts.filter((post) => post.id !== action.payload.id);
      state.posts = handleData;
    },
  },
});

export const { createPost, deletePost } = postSlice.actions;
// ? Export the authSlice.reducer to be included in the store.
export const PostReducer = postSlice.reducer;
