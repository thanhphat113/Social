import { useState, createContext } from "react";
import { useSelector } from "react-redux";
import clsx from "clsx";
import styles from "./Message.module.scss";
import User from "./components/User";
import DetailMessage from "./components/DetailMessage";
import InforMess from "./components/InforMess";

function Message() {
    const currentUser = useSelector((state) => state.message.currentUser);

    const [show, setShow] = useState(true);

    const handleShowInfor = () => {
        setShow(!show);
    };

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
                    {show && <div className={clsx(styles.right)}>
                        <InforMess />
                    </div>}
                </>
            ):(<h1 className={styles.validate}>Hãy chọn đoạn tin nhắn muốn hiển thị</h1>)}
        </div>
    );
}

export default Message;
