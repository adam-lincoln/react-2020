import React from 'react';
import styles from './NewPost.module.scss';

const NewPost = () => {
  return (
    <div>
      <h1>NewPost - Add a Post</h1>
      <form>
        <label>
          Title
          <input type='text' />
        </label>
        <label>
          Content
          <input type='textarea' />
        </label>
        <label>
          Author
          <select>

          </select>
        </label>
        <button type='submit'>Add Post</button>
      </form>
    </div>
  );
}

export default NewPost;
