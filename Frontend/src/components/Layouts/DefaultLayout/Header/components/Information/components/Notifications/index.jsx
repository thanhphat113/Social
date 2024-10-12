import { useState, useEffect } from "react";
import styles from "./Notifications.module.scss";
import { CustomTooltip } from "../../../../../../../GlobalStyles";
import ItemRequestNotification from "./components/ItemRequestNotification";
import ItemPostNotification from "./components/ItemPostNotification";
import clsx from "clsx";

const list = [
    {
        post_notification_id: 1,
        post_id: 1,
        from_user_id: {
            user_id: 1,
            first_name: "Thanh",
            last_name: "Phat",
            profile_picture: "/public/img/Cloudy.png",
        },
        type_id: {
            type_id: 1,
            type_name: "newPost",
            content: "Aloooooooo",
        },
        date_created: "05/10/2024",
        to_user_id: {
            user_id: 2,
            first_name: "Thanh",
            last_name: "PDn",
            profile_picture: "/public/img/Cloudy.png",
        },
        isRead: 0,
    },
    {
        post_notification_id: 2,
        post_id: 2,
        from_user_id: {
            user_id: 2,
            first_name: "Thanh",
            last_name: "Lime",
            profile_picture: "/public/img/Cloudy.png",
        },
        type_id: {
            type_id: 2,
            type_name: "newPost",
            content: "Aloooooooo",
        },
        date_created: "05/10/2024",
        to_user_id: {
            user_id: 5,
            first_name: "Thanh",
            last_name: "Phat",
            profile_picture: "/public/img/Cloudy.png",
        },
        isRead: 1,
    },
];

function Notifications({ title, nameicon, onToggle, isActive }) {
    console.log(onToggle, isActive);
    const [type, setType] = useState("request");

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
                            onClick={() => setType("request")}
                            className={clsx({
                                [styles.active]: type === "request",
                            })}
                        >
                            Kết bạn
                        </button>
                        <button
                            onClick={() => setType("post")}
                            className={clsx({
                                [styles.active]: type === "post",
                            })}
                        >
                            Thông báo
                        </button>
                    </div>
                    <div className={clsx(styles.list)}>
                        {list.map((item) =>
                            type === "request" ? (
                                <ItemRequestNotification
                                    key={item.post_notification_id}
                                    package={item}
                                />
                            ) : (
                                <ItemPostNotification
                                    key={item.post_notification_id}
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
