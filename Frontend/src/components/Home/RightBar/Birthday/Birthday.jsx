import React from 'react';
import styles from './Birthday.module.scss';

function Birthday() {
  return (
    <div className={styles.birthday}>
      <h4>Sinh nhật</h4>
      <div className={styles.birthdayItem}>
        <span role="img" aria-label="gift">🎁</span>
        <p>Hôm nay là sinh nhật của ToànLD.</p>
      </div>
    </div>
  );
}

export default Birthday;
