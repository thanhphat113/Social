import React from 'react';
import styles from './ChatWindow.module.scss';
import { FaPhone, FaVideo, FaEllipsisH, FaTimes  } from 'react-icons/fa';

const ChatWindow = ({ contact, onClose }) => {
  return (
    <div className={styles.chatWindow}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <img
            src="https://via.placeholder.com/40"
            alt="User"
            className={styles.userAvatar}
          />
          <div>
            <h4 className={styles.userName}>Buỳnh Như Quế</h4>
            <span className={styles.userStatus}>Đang hoạt động</span>
          </div>
        </div>
        <div className={styles.actions}>
          <FaPhone />
          <FaVideo />
          <FaEllipsisH />
          <FaTimes onClick={onClose} style={{ cursor: 'pointer' }} /> {/* Nút đóng */}
        </div>
      </div>

      <div className={styles.messages}>
        <div className={`${styles.message} ${styles.received}`}>
          <p>Kkkk</p>
        </div>
        <div className={`${styles.message} ${styles.sent}`}>
          <p>Kkk</p>
        </div>
        <div className={`${styles.message} ${styles.received}`}>
          <p>Hử</p>
        </div>
        <div className={`${styles.message} ${styles.sent}`}>
          <p>hử</p>
        </div>
        <div className={`${styles.message} ${styles.received}`}>
          <p>Ăn j v</p>
        </div>
        <div className={`${styles.message} ${styles.sent}`}>
          <p>ăn cơm</p>
        </div>
        <div className={`${styles.message} ${styles.received}`}>
          <p>Okii</p>
        </div>
        <div className={`${styles.message} ${styles.sent}`}>
          <p>okee</p>
        </div>
      </div>

      <div className={styles.inputContainer}>
        <div className={styles.icons}>
          <span>😊</span>
          <span>📷</span>
          <span>GIF</span>
        </div>
        <input type="text" placeholder="Aa" className={styles.input} />
        <span className={styles.sendButton}>📤</span>
      </div>
    </div>
  );
};

export default ChatWindow;
