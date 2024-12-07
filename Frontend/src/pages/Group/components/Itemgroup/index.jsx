import React from "react";
import styles from "./Itemgroup.module.scss"; // Import the SCSS file

// Sample group data
const groups = [
  {
    img: "https://via.placeholder.com/150",
    title: "Hiep Hoi Co Khi Viet Nam",
    description: "17k thành viên",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Hội Tuyển Dụng Thủ May",
    description: "7.6k thành viên",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Hội Câu Cá TP.HCM",
    description: "6k thành viên",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Vip Phongnhamy Outlet",
    description: "23k thành viên",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Tôi Yêu Và Nghệ Thuật Dân Gian",
    description: "29k thành viên",
  },
  {
    img: "https://via.placeholder.com/150",
    title: "Chuyên Thiết Kế - Thi Công",
    description: "12k thành viên",
  },
];

function ItemGroup() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
            {groups.map((group, index) => (
                <div key={index} className={styles.groupcard}>
                    {<img src={group.img} alt={group.title} />}
                    <div className={styles.info}>
                        <h3 className={styles.title}>{group.title}</h3>
                        <p className={styles.description}>{group.description}</p>
                        {<button className={styles.joinbtn}>Tham gia nhóm</button>}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ItemGroup;


