import React, { useState } from 'react';
import styles from './Post.module.scss';
import Button from 'react-bootstrap/Button';

const Post = () => {
  const [text, setText] = useState("Bạn đang nghĩ gì thế?");


  return (
    <div className={styles.chatWindow}>
      <div className={styles.title}>
        <h3>Tạo bài viết</h3>
        <button className={styles.closePost}>X</button>
      </div>
      <div className={styles.header}>
        
        <div className={styles.avatar}>
          <img src="./../../../../public/img/Cloudy.png" alt="Avatar" />
        </div>
        <div className={styles.name}>Đức Toàn</div>
      </div>
      <div className={styles.message}>
        {/* <input type="text" placeholder="Đức ơi, bạn đang nghĩ gì thế?" /> */}
        <div className={styles.textBox}>
          <textarea name="" id=""></textarea>
        </div>
        <button className={styles.btnUpPost}>Đăng</button>
      </div>
    </div>
  );
};

export default Post;