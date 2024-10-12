import { FaVideo, FaPhotoVideo, FaSmile } from "react-icons/fa";
import styles from './PostInput.module.scss'; 

function PostInput() {
  return (
    <div className={styles.postInput}>
      <div className={styles.inputBox}>
        <img 
          src={'src/assets/img/avata.png'} 
          className={styles.avatar}
          alt="Avatar"
        />
        <input 
          type="text" 
          placeholder="Đức ơi, bạn đang nghĩ gì thế?" 
          className={styles.input}
        />
      </div>
      <div className={styles.options}>
        
        <div className={styles.option}>
          <FaPhotoVideo className={styles.icon} />
          <span>Ảnh/video</span>
        </div>
      </div>
    </div>
  );
}

export default PostInput;
