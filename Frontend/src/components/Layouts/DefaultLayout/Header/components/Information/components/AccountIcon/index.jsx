import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CustomTooltip } from "../../../../../../../GlobalStyles";
import styles from "./AccountIcon.module.scss";
import { typeContext } from "../../../..";

function AccountIcon(props) {
    const [isClicked, setIsClicked] = useState(false);
    const user = props;

    const {  handleClick } = useContext(typeContext);

    
    return (
        <>
            <CustomTooltip title={user.title}>
                <img
                    onClick={() => {
                        setIsClicked(!isClicked);
                    }}
                    className={styles.circle}
                    src={user.img}
                ></img>
            </CustomTooltip>
            {isClicked && (
                <div className={styles.content}>
                    <Link to="/profile" onClick={() => handleClick("profile")}>
                        <div className={styles.account}>
                            <img src={user.img}></img>
                            <span>{user.name}</span>
                        </div>
                    </Link>
                    <Link
                        to="/information"
                        onClick={() => handleClick("imformation")}
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
        </>
    );
}

export default AccountIcon;
