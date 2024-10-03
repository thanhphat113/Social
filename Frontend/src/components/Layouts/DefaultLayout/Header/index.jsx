import clsx from "clsx";
import styles from "./Header.module.scss";
import Search from "./components/search";
import Menu from "./components/Menu";

function Header() {
    return (
        <div className={clsx(styles.header)}>
            <div className={clsx(styles.left)}>
                <Search />
            </div>
            <div className={clsx(styles.center)}>
                <Menu />
            </div>
            <div className={clsx(styles.right)}>Information</div>
        </div>
    );
}

export default Header;
