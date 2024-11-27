// import React, { useState } from 'react';
// import styles from './Post.module.scss';
// import Button from 'react-bootstrap/Button';
// import { FaPhotoVideo } from "react-icons/fa";
// import axios from 'axios';

// const Post = ({ onClose, postImage }) => {
  
//   const [text, setText] = useState("Bạn đang nghĩ gì thế?");
//   const [dragActive, setDragActive] = useState(false);
//   const [files, setFiles] = useState([]);
//   const [previews, setPreviews] = useState([]);
//   const [fileNames, setFileNames] = useState([]);
//   const [isDragVisible, setIsDragVisible] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if(!currentUser || !token) {
//       alert("Vui lòng đăng nhập để đăng bài");
//       return;
//     }
    
    
//     const formData = new FormData();
//     formData.append('Content', text);

//     files.forEach(file => {
//       formData.append('files', file);
//     });

//     try {
//       const response = await axios.post('http://localhost:5164/api/Post', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Post created:', response.data);
//     } catch (error) {
//       console.error('Error creating post:', error);
//     }
//   };

//   const handleFocus = () => {
//     if (text === "Bạn đang nghĩ gì thế?") {
//       setText('');
//     }
//   };

//   const handleBlur = () => {
//     if (text === "") {
//       setText("Bạn đang nghĩ gì thế?");
//     }
//   };

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.type === "dragenter" || e.type === "dragover") {
//       setDragActive(true);
//     } else if (e.type === "dragleave") {
//       setDragActive(false);
//     }
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setDragActive(false);
//     if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
//       handleFiles(Array.from(e.dataTransfer.files));
//     }
//   };

//   const handleFileInput = (e) => {
//     if (e.target.files && e.target.files.length > 0) {
//       handleFiles(Array.from(e.target.files));
//     }
//   };

//   const handleFiles = (newFiles) => {
//     const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'video/mp4', 'video/webm'];
//     const validFiles = newFiles.filter(file => allowedTypes.includes(file.type));

//     setFiles(prev => [...prev, ...validFiles]);

//     const newPreviews = validFiles.map(file => ({
//       url: URL.createObjectURL(file),
//       type: file.type.startsWith('image') ? 'image' : 'video',
//       name: file.name
//     }));

//     setPreviews(prev => [...prev, ...newPreviews]);
//     setFileNames(prev => [...prev, ...validFiles.map(file => file.name)]);
//   };

//   const toggleDragDrop = () => {
//     setIsDragVisible(!isDragVisible);
//   };

//   return (
//       <div className={styles.chatWindow}>
//         <div className={styles.title}>
//           <h3>Tạo bài viết</h3>
//           <button className={styles.closePost} onClick={onClose}>X</button>
//         </div>
//         <div className={styles.header}>
//           <div className={styles.avatar}>
//             <img src="./../../../../public/img/Cloudy.png" alt="Avatar" />
//           </div>
//           <div className={styles.name}>Đức Toàn</div>
//         </div>

//         <div className={styles.message}>
//           <form onSubmit={handleSubmit}>
//             <div className={styles.textBox} style={{ height: isDragVisible ? '100px' : '200px' }}>
//             <textarea
//                 value={text}
//                 onChange={(e) => setText(e.target.value)}
//                 onFocus={handleFocus}
//                 onBlur={handleBlur}
//                 style={{ height: isDragVisible ? '100px' : '100%' }}
//             />
//             </div>
//             <div>
//               {isDragVisible && (
//                   <div
//                       className={`${styles.form} ${dragActive ? styles.dragActive : ''}`}
//                       onDragEnter={handleDrag}
//                       onDragOver={handleDrag}
//                       onDrop={handleDrop}
//                   >
//                     <input
//                         type="file"
//                         id="input-file-upload"
//                         className={styles.fileInput}
//                         onChange={handleFileInput}
//                         multiple
//                         accept="image/*,video/!*"
//                     />
//                     <label htmlFor="input-file-upload" className={styles.fileLabel}>
//                       <div>
//                         <p>Kéo và thả ảnh/video vào đây hoặc</p>
//                         <button
//                             type="button"
//                             className={styles.uploadButton}
//                             onClick={() => document.getElementById('input-file-upload').click()}
//                         >
//                           Tải tệp lên
//                         </button>
//                       </div>
//                     </label>
//                   </div>
//               )}

//               <div className={styles.previewContainer}>
//                 {previews.map((file, index) => (
//                     <div key={index} className={styles.previewItem}>
//                       {file.type === 'image' ? (
//                           <img src={file.url} alt="preview" className={styles.preview} />
//                       ) : (
//                           <video controls className={styles.preview}>
//                             <source src={file.url} type="video/mp4" />
//                           </video>
//                       )}
//                       <p>{file.name}</p>
//                     </div>
//                 ))}
//               </div>

//               {dragActive && (
//                   <div
//                       className={styles.dragOverlay}
//                       onDragEnter={handleDrag}
//                       onDragLeave={handleDrag}
//                       onDragOver={handleDrag}
//                       onDrop={handleDrop}
//                   ></div>
//               )}
//             </div>
//             <button className={styles.btnUpPost}>Đăng</button>
//           </form>
//         </div>

//         <div className={styles.options}>
//           <div className={styles.option} onClick={toggleDragDrop}>
//             <FaPhotoVideo className={styles.icon} />
//             <span>Ảnh/video</span>
//           </div>
//         </div>
//       </div>
//   );
// };

// export default Post;


import React, { useState, useEffect } from "react";
import styles from "./Post.module.scss";
import Button from "react-bootstrap/Button";
import { FaPhotoVideo } from "react-icons/fa";
import axios from "axios";

const Post = ({ onClose }) => {
  const [text, setText] = useState("Bạn đang nghĩ gì thế?");
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [isDragVisible, setIsDragVisible] = useState(false);

  const allowedTypes = ["image/jpeg", "image/png", "video/mp4", "video/webm"];

  // Xóa URL được tạo tạm thời khi component unmount
  useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview.url));
    };
  }, [previews]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text.trim() === "Bạn đang nghĩ gì thế?" || text.trim() === "") {
      alert("Vui lòng nhập nội dung bài viết!");
      return;
    }
    if (files.length === 0) {
      alert("Vui lòng chọn ít nhất một ảnh hoặc video!");
      return;
    }

    const formData = new FormData();
    formData.append("Content", text);
    files.forEach((file) => {
      formData.append("files", file);
    });

          
    try {
        const response = await axios.post(
          "http://localhost:5164/api/Post/WithMedia",
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
          <img src="./../../../../public/img/Cloudy.png" alt="Avatar" />
        </div>
        <div className={styles.name}>Đức Toàn</div>
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
              onBlur={handleBlur}
              style={{ height: isDragVisible ? "100px" : "100%" }}
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
