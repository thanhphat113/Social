import React, { useState } from "react";
import { axiosInstance } from "~/utils/axiosInstance"; // Đảm bảo import axiosInstance

const UploadForm = ({ type }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("files", file);

    // Thêm trường tùy thuộc vào loại upload
    if (type === "avatar") {
      formData.append("IsPictureProfile", true);
    } else if (type === "coverPhoto") {
      formData.append("IsCoverPhoto", true);
    }

    try {
      const response = await axiosInstance.post("/api/Post/WithMedia", formData);
      console.log("Upload success:", response.data);
      alert("Upload thành công!");
    } catch (error) {
      console.error("Upload error:", error.response?.data || error.message);
      alert("Upload thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div>
      <h2>{type === "avatar" ? "Thay đổi Avatar" : "Đổi ảnh bìa"}</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default UploadForm;
