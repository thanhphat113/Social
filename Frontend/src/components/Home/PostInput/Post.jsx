import React, { useState, useEffect } from "react";
import styles from "./Post.module.scss";
import Button from "react-bootstrap/Button";
import { FaPhotoVideo } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux";

const Post = ({ onClose, groupId }) => {
  const [text, setText] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isDragVisible, setIsDragVisible] = useState(false);

  const allowedTypes = ["image/jpeg", "image/png", "video/mp4", "video/webm"];

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


  // Xóa URL được tạo tạm thời khi component unmount
  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("Content", text);
  
    // Thêm groupId nếu tồn tại
    if (groupId) {
      formData.append("GroupId", groupId);
    }
  
    // Kiểm tra xem có tệp nào không
    if (files.length > 0) {
      files.forEach((file) => {
        formData.append("files", file);
      });
    } else {
      if (text.trim() === "Bạn đang nghĩ gì thế?" || text.trim() === "") {
        alert("Vui lòng nhập nội dung.");
        return;
      }
    }
  
    try {
      const response = await axios.post(
        files.length > 0
          ? "http://localhost:5164/api/Post/WithMedia"
          : "http://localhost:5164/api/Post",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      console.log("Post created:", response.data);
      alert("Bài viết đã được đăng thành công!");
      setText("Bạn đang nghĩ gì thế?");
      setFiles([]);
      setPreviews([]);
      onClose();
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Có lỗi xảy ra khi đăng bài.");
    }
  };
  

  const handleFocus = () => {
    if (text === "Bạn đang nghĩ gì thế?") setText("");
  };

  const handleBlur = () => {
    if (text.trim() === "") setText("Bạn đang nghĩ gì thế?");
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      addFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(e.target.files);
    }
  };

  const addFiles = (fileList) => {
    const newFiles = Array.from(fileList).filter((file) =>
      allowedTypes.includes(file.type)
    );
    if (newFiles.length === 0) {
      alert("Chỉ hỗ trợ ảnh và video (jpeg, png, mp4, webm).");
      return;
    }
    const newPreviews = newFiles.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("image") ? "image" : "video",
      name: file.name,
    }));

    setFiles((prev) => [...prev, ...newFiles]);
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  const removePreview = (index) => {
    const updatedFiles = [...files];
    const updatedPreviews = [...previews];
    updatedFiles.splice(index, 1);
    URL.revokeObjectURL(previews[index].url); // Giải phóng bộ nhớ
    updatedPreviews.splice(index, 1);
    setFiles(updatedFiles);
    setPreviews(updatedPreviews);
  };

  const toggleDragDrop = () => {
    setIsDragVisible(!isDragVisible);
  };

  return (
    <div className={styles.chatWindow}>
      <div className={styles.title}>
        <h3>Tạo bài viết</h3>
        <button className={styles.closePost} onClick={onClose}>
          X
        </button>
      </div>
      <div className={styles.header}>
        <div className={styles.avatar}>
          <img src={user.profilePicture.src || defaultProfilePicture} alt="Avatar" />
        </div>
        <div className={styles.name}>{firstName} {lastName}</div>
      </div>

      <div className={styles.message}>
        <form onSubmit={handleSubmit}>
          <div
            className={styles.textBox}
            style={{ height: isDragVisible ? "100px" : "200px" }}
          >
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={handleFocus}
              style={{ height: isDragVisible ? "100px" : "100%" }}
              placeholder="Bạn đang nghĩ gì thế?"
            />
          </div>
          {isDragVisible && (
            <div
              className={`${styles.form} ${
                dragActive ? styles.dragActive : ""
              }`}
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="input-file-upload"
                className={styles.fileInput}
                onChange={handleFileInput}
                multiple
                accept="image/*,video/*"
              />
              <label htmlFor="input-file-upload" className={styles.fileLabel}>
                <p>Kéo và thả ảnh/video vào đây hoặc</p>
                <button
                  type="button"
                  className={styles.uploadButton}
                  onClick={() =>
                    document.getElementById("input-file-upload").click()
                  }
                >
                  Tải tệp lên
                </button>
              </label>
            </div>
          )}

          <div className={styles.previewContainer}>
            {previews.map((file, index) => (
              <div key={index} className={styles.previewItem}>
                {file.type === "image" ? (
                  <img src={file.url} alt="preview" className={styles.preview} />
                ) : (
                  <video controls className={styles.preview}>
                    <source src={file.url} type="video/mp4" />
                  </video>
                )}
                <p>{file.name}</p>
                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => removePreview(index)}
                >
                  Xóa
                </button>
              </div>
            ))}
          </div>
        </form>
      </div>

      <div className={styles.options}>
        <div className={styles.option} onClick={toggleDragDrop}>
          <FaPhotoVideo className={styles.icon} />
          <span>Ảnh/video</span>
        </div>
      </div>
      <Button type="submit" onClick={handleSubmit} className={styles.btnUpPost}>
        Đăng
      </Button>
    </div>
  );
};

export default Post;
