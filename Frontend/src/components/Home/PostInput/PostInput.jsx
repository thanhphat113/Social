import { FaVideo, FaPhotoVideo, FaSmile } from "react-icons/fa";
import styles from './PostInput.module.scss'; 
import {useState} from 'react';
import Post from './Post.jsx';
import { useSelector } from "react-redux";


function PostInput() {

  const user = useSelector((state) => state.user.information);

  const {
    firstName,
    lastName,
    bio,
    profilePicture,
    email,
  } = user;

  const defaultProfilePicture = user.genderId === 2 ? "./../../../../public/img/default/woman_default.png"
                                                    : "./../../../../public/img/default/man_default.png";


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
          src={ user.profilePicture.src || defaultProfilePicture} 
          className={styles.avatar}
          alt="Avatar"
        />
        <input 
          type="text" 
          placeholder="Bạn đang nghĩ gì thế?`" 
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
