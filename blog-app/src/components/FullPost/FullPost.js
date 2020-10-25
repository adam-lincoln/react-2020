import React from 'react';
import styles from './FullPost.module.scss';

const FullPost = () => {
  return (
    <div>
      <h1>FullPost</h1>
      <p>Please select a post!</p>
      <div className={styles.FullPost}>
        <h1>Title</h1>
        <p>Content</p>
        <div className={styles.Edit}>
          <button className={styles.Delete}>Delete</button>
        </div>
      </div>
    </div>
  );
}

export default FullPost;
