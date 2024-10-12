import React, { useState } from 'react';
import styles from './Post.module.scss';

const Post = () => {
  const [text, setText] = useState('');
  const handleChange = (e) => setText(e.target.value);

  return (
    <div className={styles.postContainer}>
      <textarea
        value={text}
        onChange={handleChange}
        placeholder="Bạn đang nghĩ gì?"
      />
      <button>Đăng</button>
    </div>
  );
};

export default Post;
