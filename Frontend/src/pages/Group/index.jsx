import React from 'react';
import { useState } from "react";
import clsx from "clsx";
import styles from "./Group.module.scss";
import Itemgroup from "./components/Itemgroup";
import CreateGroup from './components/CreateGroup';

function Group(){
    const [isCreatingGroup, setIsCreatingGroup] = useState(false);
    const [showSidebar, setShowSidebar] = useState(true); // State để điều khiển sidebar

    const handleCreateGroupClick = () => {
        setIsCreatingGroup(!isCreatingGroup); // Toggle trạng thái
        setShowSidebar(!showSidebar); // Toggle sidebar
    };

    const handleCancelCreateGroup = () => {
        setIsCreatingGroup(false); // Đặt lại trạng thái ban đầu
        setShowSidebar(true); // Hiển thị lại sidebar
    };

    return (
        <div className={styles.wrapper}>
             <div className={clsx(styles.left, { [styles.hidden]: !showSidebar })}>
                <div className={styles.sidebar}>
                    <h1>Nhóm</h1>
                   
                    <div className={styles.search}>
                        <input type="text" placeholder=" Tìm kiếm nhóm"/>
                    </div>
                        
                    <button onClick={handleCreateGroupClick} className={styles.creategroup}> {isCreatingGroup ? 'Hủy tạo nhóm' : '+ Tạo nhóm mới'}</button>
                </div>
            </div>
            
            <div className={styles.right}>
                {isCreatingGroup ? <CreateGroup onCancel={handleCancelCreateGroup} /> : <Itemgroup />}
            </div>            
        </div>
    )
}

export default Group