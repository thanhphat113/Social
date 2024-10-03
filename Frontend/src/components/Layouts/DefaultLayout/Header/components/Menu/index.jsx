import clsx from "clsx";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Menu.module.scss";
import { CustomTooltip } from "../../../../../GlobalStyles";

function Menu() {
    const [page, setPage] = useState("home");

    useEffect(() => {
        console.log(page);
    }, [page]);

    return (
        <div className={clsx(styles.content)}>
            <CustomTooltip title="Trang chủ">
                <Link
                    to="/"
                    className={clsx(styles.choice,
                        {[styles.active] : page ==='home'}
                    )}
                    onClick={() => {
                        setPage("home");
                    }}
                >
                    <i className="fa-solid fa-house-chimney"></i>
                </Link>
            </CustomTooltip>
            <CustomTooltip title="Nhóm">
                <Link
                    to="/group"
                    className={clsx(styles.choice,
                        {[styles.active] : page ==='group'}
                    )}
                    onClick={() => {
                        setPage("group");
                    }}
                >
                    <i className="fa-solid fa-user-group"></i>
                </Link>
            </CustomTooltip>
        </div>
    );
}

export default Menu;
