import clsx from "clsx";
import styles from "./MainTopic.module.scss";

function MainTopic() {
    return (
        <div className={styles.wrapper}>
            <h1 className="have-line">Xem trước và thay đổi chủ đề</h1>
            <div className={styles.content}>
                <div className={clsx(styles.item, styles.left)}>
                    <div>
                        <li>1</li>
                        <li>2</li>
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                    </div>
                </div>
                <div className={clsx(styles.item, styles.right)}>
                    <div className={styles.user}>
                        <p className={styles.chat}>
                            Tin nhắn của bạn sẽ như thế này
                        </p>
                    </div>
                    <div className={styles.other}>
                        <p className={styles.chat}>Tin nhắn của người khác</p>
                    </div>
                </div>
            </div>
            <div className={styles.action}>
                <button>Xác nhận</button>
            </div>
        </div>
    );
}

export default MainTopic;
