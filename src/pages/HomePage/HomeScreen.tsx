import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/order
import Container from '@mui/material/Container';
import 'App.css';
import { PostForm, PostList } from 'features/posts';
import TitleTypography from 'libs/ui/components/TitleTypography';
import { useAppDispatch, useAppSelector } from 'reduxs/store/hooks';
import { createPost, deletePost, IPost } from 'reduxs/reducers';
import { useEffect } from 'react';

export const HomeScreen = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.root.post);

  useEffect(() => {
    console.log('[dataPost] ', posts);
  }, [posts]);

  const handleDeletePost = (post: IPost) => {
    dispatch(deletePost({ id: post.id }));
  };

  return (
    <>
      <TitleTypography title={t('home.title')} />

      <Container maxWidth="xs">
        <PostForm
          onSubmitClick={(data) => {
            dispatch(createPost({ ...data, id: Math.floor(Math.random() * 10000).toString() }));
          }}
        />
      </Container>
      <Container sx={{ py: 4 }} maxWidth="md">
        <PostList posts={posts} onDeletePost={handleDeletePost} onUpdatePost={() => {}} />
      </Container>
    </>
  );
};
