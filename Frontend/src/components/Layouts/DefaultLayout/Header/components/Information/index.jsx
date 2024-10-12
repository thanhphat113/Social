import { useState } from "react";

import styles from "./Information.module.scss";
import AccountIcon from "./components/AccountIcon";
import Notifications from "./components/Notifications";

function Imformation() {
    // const [type, setType] = useState();
    // const [isClick,setIsClick] = useState(false)

    // const handleClick = (choice) => {
    //     setType(choice);
    // };

    const [activeId, setActiveId] = useState(null);  // Quản lý ID của component đang bật

    const handleToggle = (id) => {
        if (activeId === id) {
            setActiveId(null);  // Nếu component đã bật, tắt nó
        } else {
            setActiveId(id);  // Nếu component chưa bật, bật nó và tắt cái khác
        }
    };

    return (
        <>
            <div className={styles.wrapper}>
                <Notifications
                    title={"Thông báo"}
                    nameicon={"fa-solid fa-bell"}
                    isActive={activeId === "A"} 
                    onToggle={handleToggle} 
                />
                <AccountIcon
                    title={"Tài khoản"}
                    img={"/public/img/Cloudy.png"}
                    name={"thanh phat"}
                    isActive={activeId === "B"} 
                    onToggle={handleToggle} 
                />
            </div>
        </>
    );
}

export default Imformation;
