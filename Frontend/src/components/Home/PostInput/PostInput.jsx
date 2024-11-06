import { FaVideo, FaPhotoVideo, FaSmile } from "react-icons/fa";
import styles from './PostInput.module.scss'; 
import {useState} from 'react';
import Post from './Post.jsx';

function PostInput() {

  const [showPost, setShowPost] = useState(false);
  const [showPostWithImage, setShowPostWithImage] = useState(false);

  const handleInputClick = () => {
    setShowPost(true);
  }

  const handleSpanClick = () => {
    setShowPostWithImage(true);
  }

  const handleClosePost = () => {
    setShowPost(false);
  }

  

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
          onClick={handleInputClick}
        />
      </div>

      <div className={styles.options}>
        <div className={styles.option}>
          <FaPhotoVideo className={styles.icon} />
          <span onClick={handleSpanClick}>Ảnh/video</span>
        </div>
      </div>


      {showPost && (
        <div className={styles.overlay}>
          <div className={styles.postWrapper}>
            <Post onClose={handleClosePost} postImage={showPostWithImage}/>
          </div>
        </div>
      )}

    </div>
  );
}

export default PostInput;
