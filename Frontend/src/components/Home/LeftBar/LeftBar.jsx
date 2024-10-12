import React from 'react';
import styles from './LeftBar.module.scss';
import { FaHome, FaUsers, FaNewspaper, FaCalendarAlt, FaBell, FaUserFriends } from 'react-icons/fa';

const LeftBar = () => {
  return (
    <div className={styles.card}>
      <div className={styles.coverPhoto}>
        <img
          src="src/assets/img/avata/avata.png"
          alt="Cover"
          className={styles.coverImg}
        />
      </div>
      <div className={styles.profilePhoto}>
        <img
          src="src/assets/img/avata/avata.png"
          alt="Profile"
          className={styles.profileImg}
        />
      </div>
      <div className={styles.info}>
        <h2>Sam Lanson</h2>
        <p>Web Developer at Webestica</p>
        <p className={styles.bio}>
          I'd love to change the world, but they won’t give me the source code.
        </p>
      </div>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <h4>256</h4>
          <p>Post</p>
        </div>
        <div className={styles.stat}>
          <h4>2.5K</h4>
          <p>Followers</p>
        </div>
        <div className={styles.stat}>
          <h4>365</h4>
          <p>Following</p>
        </div>
      </div>
      <div className={styles.menu}>
        <div className={styles.menuItem}>
          <FaHome className={styles.icon} />
          <span>Feed</span>
        </div>
        <div className={styles.menuItem}>
          <FaUserFriends className={styles.icon} />
          <span>Connections</span>
        </div>
        <div className={styles.menuItem}>
          <FaNewspaper className={styles.icon} />
          <span>Latest News</span>
        </div>
        <div className={styles.menuItem}>
          <FaCalendarAlt className={styles.icon} />
          <span>Events</span>
        </div>
        <div className={styles.menuItem}>
          <FaUsers className={styles.icon} />
          <span>Groups</span>
        </div>
        <div className={styles.menuItem}>
          <FaBell className={styles.icon} />
          <span>Notifications</span>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
