import React from 'react';
import FriendRequest from './FriendRequest/FriendRequest';
import Birthday from './Birthday/Birthday';
import Contacts from './Contact/Contact';
import styles from './RightBar.module.scss';

function RightBar() {
  return (
    <div className={styles.app}>
      <FriendRequest />
      <Birthday />
      <Contacts />
    </div>
  );
}

export default RightBar;
