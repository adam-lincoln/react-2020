import React from 'react';
import styles from './Blog.module.scss';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';

const Blog = () => {
  return (
    <div>
      <section className={styles.Posts} style={{
        display: 'flex',
        flexFlow: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}>
        <Post />
        <Post />
        <Post />
      </section>
      <section>
        <FullPost />
      </section>
      <section>
        <NewPost />
      </section>
    </div>
  );
}

export default Blog;
