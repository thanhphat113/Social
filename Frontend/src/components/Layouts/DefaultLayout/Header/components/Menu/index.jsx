import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./Menu.module.scss";
import { CustomTooltip } from "../../../../../GlobalStyles";

function Menu({ type , onHandleClick}) {
    

    return (
        <div className={clsx(styles.content)}>
            <CustomTooltip title="Trang chủ">
                <Link
                    to="/"
                    className={clsx(styles.choice, {
                        [styles.active]: type === "/",
                    })}
                    onClick={() => {
                        onHandleClick("/");
                    }}
                >
                    <i className="fa-solid fa-house-chimney"></i>
                </Link>
            </CustomTooltip>
            <CustomTooltip title="Nhóm">
                <Link
                    to="/group"
                    className={clsx(styles.choice, {
                        [styles.active]: type === "/group",
                    })}
                    onClick={() => {
                        onHandleClick("/group");
                    }}
                >
                    <i className="fa-solid fa-user-group"></i>
                </Link>
            </CustomTooltip>
            <CustomTooltip title="Tin nhắn">
                <Link
                    to="/message"
                    className={clsx(styles.choice, {
                        [styles.active]: type === '/message',
                    })}
                    onClick={() => onHandleClick('/message')}
                >
                    <i className="fa-solid fa-message"></i>
                </Link>
            </CustomTooltip>
        </div>
    );
}

export default Menu;
