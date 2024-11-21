import { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import styles from "./Message.module.scss";
import User from "./components/User";
import DetailMessage from "./components/DetailMessage";
import InforMess from "./components/InforMess";
import { setCurrentUser } from "../../components/Redux/Slices/MessageSlice";

function Message() {
    const currentUser = useSelector((state) => state.message.currentUserId);
    const dispatch = useDispatch();

    const [show, setShow] = useState(true);

    const handleShowInfor = () => {
        setShow(!show);
    };

    useEffect(() => {
        return () => dispatch(setCurrentUser(null));
    }, []);

    return (
        <div className={clsx(styles.wrapper)}>
            <div className={clsx(styles.left)}>
                <User />
            </div>
            {currentUser ? (
                <>
                    <div className={clsx(styles.center)}>
                        <DetailMessage onShow={handleShowInfor}></DetailMessage>
                    </div>
                    {show && (
                        <div className={clsx(styles.right)}>
                            <div className={styles.infor}>
                                <InforMess />
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <h1 className={clsx(styles.validate, styles.center)}>
                    Hãy chọn đoạn tin nhắn muốn hiển thị
                </h1>
            )}
        </div>
    );
}

export default Message;
