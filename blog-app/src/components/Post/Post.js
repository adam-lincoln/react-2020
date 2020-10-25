import React from 'react';
import styles from './Post.module.scss';

const Post = () => {
  return (
    <div style={{
      // display: 'flex',
      // flexFlow: 'column',
      height: '100px',
      width: '100px',
      boxShadow: '10px 8px 8px rgba(0, 0, 0, 0.5)',
      borderRadius: '4px'
    }}>
      <p>Post</p>
      <p>Title</p>
      <p>Author</p>
    </div>
  );
}

export default Post;
