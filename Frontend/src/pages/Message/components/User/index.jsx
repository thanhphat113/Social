import { useState } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import styles from "./User.module.scss";
import ItemUser from "./components/ItemUser";


function User() {
    const friends = useSelector( (state) => state.user.friends)
    const [search, setSearch] = useState("");
    const [isShow, setIsShow] = useState(false);
    const [ischoice, setIsChoice] = useState("mess");
	

    const handleClick = () => {
        setSearch("");
        setIsShow(false);
    };

    return (
        <div className={styles.wrapper}>
            <h1>Đoạn chat</h1>
            <div className={styles.search}>
                {isShow && (
                    <button onClick={handleClick} className={styles.circle}>
                        <i className="fa-solid fa-arrow-left"></i>
                    </button>
                )}
                <input
                    onClick={() => setIsShow(true)}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Tìm kiếm bạn bè"
                />
            </div>
            <div className={styles.choice}>
                <button
                    onClick={() => setIsChoice("mess")}
                    className={clsx({ [styles.active]: ischoice === "mess" })}
                >
                    Hộp thư
                </button>
                <button
                    onClick={() => setIsChoice("group")}
                    className={clsx({ [styles.active]: ischoice === "group" })}
                >
                    Nhóm
                </button>
            </div>
            <div className={styles.content}>
                {friends && friends.length > 0 ? (<ItemUser/>):
					(<p style={ {paddingLeft:'10px'} }>Không có ai để nhắn tin cả</p>
				)}
            </div>
        </div>
    );
}

export default User;
