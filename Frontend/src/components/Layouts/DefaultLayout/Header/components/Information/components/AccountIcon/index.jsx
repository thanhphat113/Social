import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CustomTooltip } from "../../../../../../../GlobalStyles";
import styles from "./AccountIcon.module.scss";
import { typeContext } from "../../../..";

function AccountIcon(props) {
    const user = props;
    const {  handleClick } = useContext(typeContext);

    
    return (
        <div className={styles.accounticon}>
            <CustomTooltip title={user.title}>
                <img
                    onClick={() => {
                        props.onToggle('B')
                        // setIsClicked(!isClicked);
                    }}
                    className={styles.circle}
                    src={user.img}
                ></img>
            </CustomTooltip>
            {props.isActive && (
                <div className={styles.content}>
                    <Link to="/profile" onClick={() => handleClick("profile")}>
                        <div className={styles.account}>
                            <img src={user.img}></img>
                            <span>{user.name}</span>
                        </div>
                    </Link>
                    <Link
                        to="/profile"
                        onClick={() => handleClick("profile")}
                    >
                        <div className={styles.choise}>
                            <i className="fa-solid fa-gear"></i>
                            <span>Thông tin cá nhân</span>
                        </div>
                    </Link>
                    <Link>
                        <div className={styles.choise}>
                            <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            <span>Đăng xuất</span>
                        </div>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default AccountIcon;
