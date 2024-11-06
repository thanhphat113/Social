import { useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import styles from "./InforMess.module.scss";
import { CustomTooltip } from "../../../../components/GlobalStyles";

function InforMess( ) {
    const friends = useSelector((state) => state.user.friends);
    const currentFriend = useSelector((state) => state.message.currentUser);
    const InforCurrentFriend = friends.find((u) => u.userId === currentFriend);
    const [click, setClick] = useState(false);
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img
                    className={clsx(styles.background)}
                    src="/public/img/Cloudy.png"
                ></img>
                <img
                    className={clsx(styles.profile)}
                    src={
                        InforCurrentFriend.profilePicture ||
                        `/public/img/default/${
                            InforCurrentFriend.genderId !== 2 ? "man" : "woman"
                        }_default.png`
                    }
                ></img>
            </div>
            <div className={styles.action}>
                <CustomTooltip title="Trang cá nhân">
                    <i className="fa-solid fa-circle-user"></i>
                </CustomTooltip>
                <CustomTooltip title="Tìm kiếm">
                    <i
                        onClick={() => setClick(!click)}
                        className={clsx("fa-solid fa-magnifying-glass", {
                            [styles.active]: click,
                        })}
                    ></i>
                </CustomTooltip>
            </div>
            {click && <input placeholder="Nhập nội dung tin nhắn"></input>}
        </div>
    );
}

export default InforMess;
