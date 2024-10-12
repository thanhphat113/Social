import React from 'react';
import styles from './FriendRequest.module.scss';

function FriendRequest() {
    return (
        <div className={styles.friendRequest}>
            <span>Lời mời kết bạn</span>
            <a href="#" className={styles.seeAll}>Xem tất cả</a>
            <div className={styles.friendRequestItem}>
                <img src="https://via.placeholder.com/40" alt="profile" />
                <div className={styles.info}>
                    <p>Friend Request</p>
                    <span>6 ngày</span>
                </div>
            </div>
            <div className={styles.actions}>
                    <a className={styles.accept}>Xác nhận</a>
                    <a className={styles.decline}>Xóa</a>
                </div>
        </div>
    );
}

export default FriendRequest;
