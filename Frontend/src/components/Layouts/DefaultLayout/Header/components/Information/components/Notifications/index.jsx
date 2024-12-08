import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./Notifications.module.scss";
import { CustomTooltip } from "../../../../../../../GlobalStyles";
import ItemRequestNotification from "./components/ItemRequestNotification";
import ItemPostNotification from "./components/ItemPostNotification";
import clsx from "clsx";

function Notifications({ title, nameicon, onToggle, isActive }) {
    const [type, setType] = useState("request");
    const requests = useSelector((state) => state.user.requests);
    const postRequests = useSelector((state) => state.user.postrequests);
    
    const list = type === "request" ? requests : postRequests;

    const handleClick = (newType) => {
        setType(newType);
    };

    return (
        <div className={styles.wrapper}>
            <CustomTooltip title={title}>
                <i
                    className={clsx(nameicon, { [styles.active]: isActive })}
                    onClick={() => {
                        onToggle("A");
                    }}
                ></i>
            </CustomTooltip>
            {isActive && (
                <div className={styles.content}>
                    <h1>Thông báo</h1>
                    <div className={styles.choice}>
                        <button
                            onClick={() => handleClick("request")}
                            className={clsx({
                                [styles.active]: type === "request",
                            })}
                        >
                            Kết bạn
                        </button>
                        <button
                            onClick={() => handleClick("post")}
                            className={clsx({
                                [styles.active]: type === "post",
                            })}
                        >
                            Thông báo
                        </button>
                    </div>
                    <div className={clsx(styles.list)} key={type}>
                        {list?.map((item) =>
                            type === "request" ? (
                                <ItemRequestNotification
                                    key={item.userId}
                                    package={item}
                                />
                            ) : (
                                <ItemPostNotification
                                    key={item.postNotificationId}
                                    package={item}
                                />
                            )
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notifications;
