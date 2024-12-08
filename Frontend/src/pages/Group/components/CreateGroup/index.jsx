import React, { useEffect } from 'react';
import { useState } from "react";
import axios from "axios";
import styles from "./creategroup.module.scss";
import { useNavigate } from 'react-router-dom';



function CreateGroup({ onCancel }){
  const [groupName, setGroupName] = useState('');
  const [privacy, setPrivacy] = useState('Công khai');
  const [groupCreated, setGroupCreated] = useState(false);  // Trạng thái tạo nhóm
  const [error, setError] = useState(null);  // Trạng thái lỗi

  // useEffect theo dõi sự thay đổi của groupCreated
  useEffect(() => {
    if (groupCreated) {
      const createGroup = async () => {
        // const data = {
        //   name: groupName,
        //   description: bio
        // };
        try {
          const response = await axios.post('http://localhost:5164/api/Group1', 
            {
              params: { name: groupName },
              withCredentials: true,
            });
          console.log(response.data);
          const result = await response.json();

          if (response.ok) {
            alert("Nhóm đã được tạo thành công!");
          } else {
            setError(result.message || 'Có lỗi xảy ra khi tạo nhóm.');
          }
        } catch (err) {
          setError('Lỗi kết nối với server.');
        }
      };

      createGroup();  // Gọi hàm tạo nhóm
    }
  }, [groupCreated]);  // useEffect sẽ chạy mỗi khi groupCreated thay đổi

  const handleCreateGroup = () => {
    console.log('Tạo nhóm:', groupName, 'Quyền riêng tư:', privacy);
    setGroupCreated(true);
  };

  const navigate = useNavigate();

  return (
    <div className={styles.groupcreatecontainer}>
      {/* Sidebar */}
      <div className={styles.left}>
        <div className={styles.sidebar}>
          <h1>Tạo nhóm</h1>
          <div className={styles.inputgroup}>
            <label htmlFor="group-name">Tên nhóm</label>
            <input
              type="text"
              id="group-name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder=" Nhập tên nhóm"
            />
          </div>
          <div className={styles.inputgroup}>
            <label>Chọn quyền riêng tư</label>
            <select value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
              <option value="Công khai">Công khai</option>
              <option value="Riêng tư">Riêng tư</option>
            </select>
          </div>
          <button className={styles.createbutton} onClick={handleCreateGroup}>Tạo</button>
          <button className={styles.createbutton} onClick={onCancel}>Hủy</button>
        </div>
      </div>

      {/* Preview */}
      <div className={styles.preview}>
        <div className={styles.previewcard}>
          <div className={styles.bannerplaceholder}></div>
          <h3>{groupName || 'Tên nhóm của bạn'}</h3>
          <p>{privacy} • 1 thành viên</p>
          <div className={styles.boder}></div>
          <div className={styles.tabs}>
            <span>Giới thiệu</span>
            <span>Bài viết</span>
            <span>Thành viên</span>
            <span>Sự kiện</span>
          </div>
          <div className={styles.introbox}>
            <textarea placeholder="Giới thiệu về nhóm..."></textarea>
          </div>
        </div>
      </div>
    </div>
  );

}

export default CreateGroup;
