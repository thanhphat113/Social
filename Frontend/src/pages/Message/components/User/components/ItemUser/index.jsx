import styles from "./ItemUser.module.scss";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../../../../../components/Redux/Slices/MessageSlice";
import { readMess } from "../../../../../../components/Redux/Actions/MessageActions";

function ItemUser({ list }) {
    const userId = useSelector((state) => state.user.information.userId);
    const [currentTime, setCurrentTime] = useState(new Date());

    const dispatch = useDispatch();

    const compareIds = (id1, id2) => {
        return id1 === id2;
    };

    useEffect(() => {
        // Tạo interval mỗi 10 phút (600000ms)
        const intervalId = setInterval(() => {
            setCurrentTime(new Date());
        }, 600000);

        return () => clearInterval(intervalId);
    }, [currentTime]);

    const handleClick = async (value, lastMess, compareId) => {
        dispatch(setCurrentUser(value));
        lastMess &&
            !compareId &&
            !lastMess.isRead &&
            (await dispatch(readMess(lastMess.chatId)));
    };

    const formatTimeDifference = (time) => {
        const messageTime = new Date(time);

        const Milliseconds = currentTime - messageTime;

        const Minutes = Math.floor(Milliseconds / 1000 / 60);
        const Hours = Math.floor(Milliseconds / 1000 / 60 / 60);
        const Days = Math.floor(Milliseconds / 1000 / 60 / 60 / 24);

        if (Days >= 1) {
            return `${Days} ngày`;
        }

        if (Hours >= 1) {
            return `${Hours} giờ`;
        }
        if (Minutes >= 1) return `${Minutes} phút`;
        return `Vừa gửi`;
    };

    return (
        <div className={styles.wrapper}>
            {list.map((item) => {
                const lastMess =
                    item.chatInMessages[item.chatInMessages.length - 1];
                const compareId = compareIds(lastMess.fromUser, userId);

                return (
                    <button
                        key={item.userId}
                        onClick={() =>
                            handleClick(item.userId, lastMess, compareId)
                        }
                        className={styles.item}
                    >
                        <img
                            src={
                                item.profilePicture?.src
                                    ? `${item.profilePicture.src}`
                                    : `/public/img/default/${
                                          item.genderId !== 2 ? "man" : "woman"
                                      }_default.png`
                            }
                        ></img>
                        <div className={styles.content}>
                            <strong>
                                {item.lastName} {item.firstName}
                            </strong>

                            <div
                                className={clsx(
                                    {
                                        [styles.NotRead]:
                                            !lastMess.isRead && !compareId,
                                    },
                                    styles.lastmess
                                )}
                            >
                                <p>
                                    {lastMess
                                        ? compareId
                                            ? `Bạn: ${lastMess.content || "Đã gửi một file"}`
                                            : lastMess.content || "Đã gửi một file"
                                        : "Hãy Gửi một lời chào với bạn mới!!!"}
                                </p>
                                <small>
                                    {lastMess
                                        ? formatTimeDifference(
                                              lastMess.dateCreated
                                          )
                                        : ""}
                                </small>
                            </div>
                        </div>
                        {lastMess && !compareId && !lastMess.isRead && (
                            <span></span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export default ItemUser;
