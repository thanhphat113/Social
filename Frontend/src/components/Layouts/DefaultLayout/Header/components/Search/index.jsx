import { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import styles from "./Search.module.scss";
import ShowList from "./components/ShowList";
import axios from "axios";
import { useSelector } from "react-redux";

function Search() {
    const [isClick, setIsClick] = useState(false);
    const [search, setSearch] = useState("");
    const [history, setHistory] = useState([]);
    const [fakeSearchs, setFakeSearch] = useState([]);

    const lists = fakeSearchs.length > 0 ? fakeSearchs : history;

    const containerRef = useRef(null);

    const handleClickOutside = (event) => {
        if (
            containerRef.current &&
            !containerRef.current.contains(event.target)
        ) {
            setIsClick(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `http://localhost:5164/api/HistorySearch`,
                {
                    withCredentials: true,
                }
            );
            setHistory(response.data);
        };
        isClick && fetchData();
        return () => {
            setHistory([]);
        };
    }, [isClick]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(
                `http://localhost:5164/api/User/users-by-name`,
                { params: { name: search }, withCredentials: true }
            );
            console.log(response.data)
            setFakeSearch(response.data);
        };
        search !== "" ? fetchData() : setFakeSearch([]);
        return () => {
            setFakeSearch([]);
        };
    }, [search]);

    return (
        <div className={clsx(styles.wrapper)} ref={containerRef}>
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
                    className={clsx(styles.searcharea, {
                        [styles.clicked]: isClick,
                    })}
                    placeholder="Tìm kiếm trên Cloudy"
                />
                {isClick && (
                    <div className={styles.showlist}>
                        {lists && lists.length > 0 ? (
                            <ShowList
                                list={lists}
                                history={history}
                                search={search}
                                setHistory={setHistory}
                                type={true}
                                key="1"
                            />
                        ) : (
                            <p style={{ paddingLeft: "10px" }} key="2">
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
