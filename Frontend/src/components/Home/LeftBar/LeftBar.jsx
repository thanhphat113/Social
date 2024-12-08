import React from 'react';
import styles from './LeftBar.module.scss';
import { FaHome, FaUsers, FaNewspaper, FaCalendarAlt, FaBell, FaUserFriends } from 'react-icons/fa';
import { useSelector } from "react-redux";

const LeftBar = () => {
  const user = useSelector((state) => state.user.information);

  const {
    firstName,
    lastName,
    bio,
    profilePicture,
    email,
  } = user;

  console.log(user)

  const defaultProfilePicture = user.genderId === 2 ? "./../../../../public/img/default/woman_default.png"
                                                    : "./../../../../public/img/default/man_default.png";

  return (
    <div className={styles.card}>
      <div className={styles.coverPhoto}>
        <img
          src={user.profilePicture?.src || "src/assets/img/avata/avata.png"} // Hiển thị ảnh mặc định nếu không có ảnh cá nhân
          alt="Cover"
          className={styles.coverImg}
        />
      </div>
      <div className={styles.profilePhoto}>
        <img
          src={user.profilePicture?.src || defaultProfilePicture} // Hiển thị ảnh mặc định nếu không có ảnh cá nhân
          alt="Profile"
          className={styles.profileImg}
        />
      </div>
      <div className={styles.info}>
        <h2>{firstName} {lastName}</h2> {/* Hiển thị họ và tên */}
        <p>{email}</p> {/* Hiển thị email người dùng */}
        <p className={styles.bio}>
          {bio || "No bio available"} {/* Hiển thị bio hoặc giá trị mặc định */}
        </p>
      </div>
    </div>
  );
};

export default LeftBar;
