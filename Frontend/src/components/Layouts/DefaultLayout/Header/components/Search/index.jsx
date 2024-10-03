import { useState } from "react";
import clsx from "clsx";
import styles from "./Search.module.scss";
import ShowList from "../../../../ShowList";

const searchs = [
    {
        user_id: 1,
        group_name: "Thanh phat",
        profile_picture: "/public/img/Cloudy.png",
    },
    {
        user_id: 2,
        group_name: "Thanh phat",
        profile_picture: "/public/img/Cloudy.png",
    },
    {
        user_id: 3,
        group_name: "Thanh phat",
        profile_picture: "/public/img/Cloudy.png",
    },
    {
        user_id: 4,
        group_name: "Thanh phat",
        profile_picture: "/public/img/Cloudy.png",
    },
    {
        user_id: 5,
        group_name: "Thanh phat",
        profile_picture: "/public/img/Cloudy.png",
    },
];

function Search() {
    const [isClick, setIsClick] = useState(false);
    const [search, setSearch] = useState();

    return (
        <div className={clsx(styles.wrapper)}>
            <img
                src="/public/img/Cloudy.png"
                alt="logo"
                className={clsx(styles.logo)}
            ></img>
            <div className={clsx(styles.search, { [styles.clicked]: isClick })}>
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
                {isClick && (
                    <div className={styles.showlist}>
                    {searchs && searchs.length > 0 ? (
                        <ShowList list={searchs} type={true} />
                    ):(
                        <p style={ {paddingLeft:'10px'} }>Không có tìm kiếm nào gần đây</p>
                    )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
