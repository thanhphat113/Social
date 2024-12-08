<<<<<<< HEAD
import React from "react";
import styles from "./Itemgroup.module.scss"; // Import the SCSS file


function ItemGroup({list}) {
  console.log(list);
  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
            {list.map((item, index) => (
                <div key={index} className={styles.groupcard}>
                    {<img src={item.img} alt={item.title} />}
                    <div className={styles.info}>
                        <h3 className={styles.title}>{item.groupName}</h3>
                        <p className={styles.description}>{item.bio}</p>
                        {<button className={styles.joinbtn}>Tham gia nhóm</button>}
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ItemGroup;


=======
import React from "react";
import styles from "./Itemgroup.module.scss"; // Import the SCSS file


function ItemGroup({list, handle}) {
  return (
    <div className={styles.wrapper} onScroll={handle}>
      <div className={styles.frame}>
            {list.map((item, index) => (
                <div key={index} className={styles.item}>
                    <img src={item.img} alt={item.title} />
                    <div className={styles.info}>
                        <h3 className={styles.title}>{item.groupName}</h3>
                        <p className={styles.description}>{item.bio}</p>
                        <button className={styles.joinbtn}>Tham gia nhóm</button>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default ItemGroup;


>>>>>>> origin/main
