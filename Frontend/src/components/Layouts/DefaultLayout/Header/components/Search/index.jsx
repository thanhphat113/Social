import { useState } from "react";
import clsx from "clsx";
import styles from "./Search.module.scss";

function Search() {
    const [isClick, setIsClick] = useState(false);
    const [search, setSearch] = useState();

    return (
        <div className={clsx(styles.wrapper)}>
            <img src="/public/img/Cloudy.png" alt="logo" className={clsx(styles.logo)}></img>
            <div className={clsx(styles.search)}>
                {!isClick && (
                    <i
                        className={clsx(
                            styles.icon,
                            "fa-solid fa-magnifying-glass"
                        )}
                    ></i>
                )}
                <input
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    onFocus={() => setIsClick(true)}
                    onBlur={() => setIsClick(false)}
                    className={clsx(styles.searcharea, {
                        [styles.clicked]: isClick,
                    })}
                    placeholder="Tìm kiếm trên Cloudy"
                />
            </div>
        </div>
    );
}

export default Search;
