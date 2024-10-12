import { Link } from "react-router-dom";
import styles from "./ItemRequestNotification.module.scss";

function ItemRequestNotification(props) {
    const item = props.package;
    return (
        <Link className={styles.wrapper}>
            <img src={item.from_user_id.profile_picture}></img>
            <div className={styles.content}>
                <p>
                    <strong>
                        {item.from_user_id.first_name}{" "}
                        {item.from_user_id.last_name}
                    </strong>{" "}
                    {item.type_id.content}
                </p>
				<div className={styles.choice}>
					<button className={styles.accept}>Chấp nhận</button>
					<button className={styles.deny}>Từ chối</button>
				</div>
            </div>
            <div className={styles.isread}>
                {item.isRead === 0 && <span></span>}
            </div>
        </Link>
    );
}

export default ItemRequestNotification;
