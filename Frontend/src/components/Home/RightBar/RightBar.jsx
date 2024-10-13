import React from 'react';
import Contacts from './Contact/Contact';
import styles from './RightBar.module.scss';

function RightBar() {
  return (
    <div className={styles.app}>
      <Contacts />
    </div>
  );
}

export default RightBar;
// 