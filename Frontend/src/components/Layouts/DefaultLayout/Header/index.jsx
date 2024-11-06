import clsx from "clsx";
import { useState, createContext,useEffect } from "react";
import styles from "./Header.module.scss";
import Search from "./components/search";
import Menu from "./components/Menu";
import Imformation from "./components/Information";

export const typeContext = createContext();

function Header() {
    const [using, setUsing] = useState("home");

    const handleClick = (type) => {
        setUsing(type);
    };


    return (
        <typeContext.Provider
            value={{ type: using, handleClick }}
        >
            <div className={clsx(styles.header)}>
                <div className={clsx(styles.left)}>
                    <Search />
                </div>
                <div className={clsx(styles.center)}>
                    <Menu type={using} onHandleClick={handleClick} />
                </div>
                <div className={clsx(styles.right)}>
                    <Imformation type={using} onHandleClick={handleClick} />
                </div>
            </div>
        </typeContext.Provider>
    );
}

export default Header;
