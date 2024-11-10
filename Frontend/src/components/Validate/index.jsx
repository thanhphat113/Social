import styles from "./Validate.module.scss";

function Validate({ onAccept, onCancel, message }) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                <div className={styles.title}>Thông báo</div>
                <div className="line"></div>
                <p>{message || "Bạn có chắc chắn muốn thực hiện hành động này"}</p>
                <div className={styles.action}>
                    <button className={styles.accept} onClick={() => onAccept()}>Xác nhận</button>
                    <button className={styles.cancel} onClick={() => onCancel()}>Huỷ</button>
                </div>
            </div>
        </div>
    );
}

export default Validate;
