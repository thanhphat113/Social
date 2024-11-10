import { useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./Search.module.scss";
import ShowList from "./components/ShowList";
import axios from "axios";

function Search() {
    const [isClick, setIsClick] = useState(false);
    const [search, setSearch] = useState("");
    const [searchs, setSearchs] = useState([]);

    useEffect( () => {
        const fetchData = async () => {
            if (search) { 
                const results = await GetListByName();
                if (results) {
                    setSearchs(results); 
                }
            }
        };
        fetchData();
    }, [search]);

    const GetListByName = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5164/api/User/findbyname`,{
                params: { name: search },
                withCredentials: true 
            });
            return response.data;
        } catch {
            return null;
        }
    };

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
                        ) : (
                            <p style={{ paddingLeft: "10px" }}>
                                Không có tìm kiếm nào gần đây
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Search;
