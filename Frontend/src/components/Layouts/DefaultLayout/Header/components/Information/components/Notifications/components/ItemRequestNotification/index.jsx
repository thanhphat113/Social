import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { acceptRequests, deleteRequests } from "../../../../../../../../../Redux/Actions/UserAction";
import styles from "./ItemRequestNotification.module.scss";

function ItemRequestNotification(props) {
    const [isFocus, setIsFocus] = useState(false);
    const dispatch = useDispatch();
    const item = props.package;

    return (
        <Link
            className={styles.wrapper}
            onMouseEnter={() => setIsFocus(true)}
            onMouseLeave={() => setIsFocus(false)}
        >
            <img
                src={
                    item.profilePicture ||
                    `/public/img/default/${
                        item.genderId !== 2 ? "man" : "woman"
                    }_default.png`
                }
            ></img>
            <div className={styles.content}>
                {item.isAccept === false ? (
                    <>
                        <p>
                            <strong>
                                {item.firstName} {item.lastName}
                            </strong>{" "}
                            {`đã gửi lời mời kết bạn`}
                        </p>
                        <div className={styles.choice}>
                            <button onClick={async ()=> await dispatch(acceptRequests(item.userId))} className={styles.accept}>Chấp nhận</button>
                            <button className={styles.deny}>Từ chối</button>
                        </div>
                    </>
                ) : (
                    <>
                        <p>
                            {`Bạn đã chấp nhận lời mời kết bạn của `}
                            <strong>
                                {item.firstName} {item.lastName}
                            </strong>{" "}
                        </p>
                        
                    </>
                )}
            </div>
            {isFocus && item.isAccept && <i onClick={async () => await dispatch(deleteRequests(item.notificationId))} className="fa-regular fa-trash-can"></i>}
            <div className={styles.isread}>
                {item.isRead === false && <span></span>}
            </div>
        </Link>
    );
}

export default ItemRequestNotification;
