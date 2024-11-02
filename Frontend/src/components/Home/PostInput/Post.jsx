import React, { useState } from 'react';
import styles from './Post.module.scss';
import Button from 'react-bootstrap/Button';
import { FaPhotoVideo } from "react-icons/fa";
import axios from 'axios';

const Post = ({ onClose }) => {
  const [text, setText] = useState("Bạn đang nghĩ gì thế?");
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]); // Updated for multiple files
  const [previews, setPreviews] = useState([]); // Store previews for images and videos
  const [fileNames, setFileNames] = useState([]); // State lưu tên tệp
  const [isDragVisible, setIsDragVisible] = useState(false); // State kiểm soát hiển thị drag and drop


  //Đăng bài
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Content', text); // Thêm nội dung bài viết

    // Thêm các tệp vào formData
    files.forEach(file => {
        formData.append('files', file);
    });

    try {
        const response = await axios.post('http://localhost:5164/api/Post', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Post created:', response.data);
        // Reset form hoặc thực hiện các hành động khác sau khi đăng bài thành công
    } catch (error) {
        console.error('Error creating post:', error);
    }
  };


  const handleFocus = () => {
    if (text === "Bạn đang nghĩ gì thế?") {
      setText('');
    }
  };

  const handleBlur = () => {
    if (text === "") {
      setText("Bạn đang nghĩ gì thế?");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleFiles = (newFiles) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
    const validFiles = newFiles.filter(file => allowedTypes.includes(file.type));

    setFiles(prev => [...prev, ...validFiles]);

    const newPreviews = validFiles.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image') ? 'image' : 'video',
      name: file.name // Lưu tên tệp
    }));

    setPreviews(prev => [...prev, ...newPreviews]);
    setFileNames(prev => [...prev, ...validFiles.map(file => file.name)]); // Lưu tên tệp
  };

  const toggleDragDrop = () => {
    setIsDragVisible(!isDragVisible);
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.title}>
        <h3>Tạo bài viết</h3>
        <button className={styles.closePost} onClick={onClose}>X</button>
      </div>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src="./../../../../public/img/Cloudy.png" alt="Avatar" />
        </div>
        <div className={styles.name}>Đức Toàn</div>
      </div>

      <div className={styles.message}>
        <form onSubmit={handleSubmit}>
          <div className={styles.textBox} style={{ height: isDragVisible ? '100px' : '200px' }}>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={handleFocus}
              onBlur={handleBlur}
              style={{ height: isDragVisible ? '100px' : '100%' }} // Cập nhật chiều cao dựa vào trạng thái
            />
          </div>
          <div>
            {isDragVisible && ( // Chỉ hiển thị phần drag and drop nếu isDragVisible là true
              <form
                className={`${styles.form} ${dragActive ? styles.dragActive : ''}`}
                onDragEnter={handleDrag}
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="file"
                  id="input-file-upload"
                  className={styles.fileInput}
                  onChange={handleFileInput}
                  multiple // Allow multiple files
                  accept="image/*,video/*" // Restrict to image and video files
                />
                <label htmlFor="input-file-upload" className={styles.fileLabel}>
                  <div>
                    <p>Kéo và thả ảnh/video vào đây hoặc</p>
                    <button className={styles.uploadButton}>Tải tệp lên</button>
                  </div>
                </label>
              </form>
            )}

            {/* Display file previews và tên tệp */}
            <div className={styles.previewContainer}>
              {previews.map((file, index) => (
                <div key={index} className={styles.previewItem}>
                  {file.type === 'image' ? (
                    <img src={file.url} alt="preview" className={styles.preview} />
                  ) : (
                    <video controls className={styles.preview}>
                      <source src={file.url} type="video/mp4" />
                    </video>
                  )}
                  <p>{file.name}</p> {/* Hiển thị tên tệp */}
                </div>
              ))}
            </div>

            {dragActive && (
              <div
                className={styles.dragOverlay}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              ></div>
            )}
          </div>
          <button className={styles.btnUpPost}>Đăng</button>
        </form>
      </div>

      <div className={styles.options}>
        <div className={styles.option} onClick={toggleDragDrop}> {/* Thay đổi sự kiện click */}
          <FaPhotoVideo className={styles.icon} />
          <span>Ảnh/video</span>
        </div>
      </div>
    </div>
  );
};

export default Post;
