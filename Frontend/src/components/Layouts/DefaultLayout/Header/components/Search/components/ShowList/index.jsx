import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./ShowList.module.scss";

function ShowList(props) {
    const list = props.list;
    return (
        <>
            {list.map((item) => (
                <Link to={`/${item.UserId}`}
                    className={clsx(styles.wrapper)}
                    key={item.UserId}
                >
                    <img
                        className={clsx(styles.profile)}
                        src={item.profilePicture || `/public/img/default/${item.genderId !==2 ? "man" : "woman"}_default.png`}
                    ></img>
                    <p className={clsx(styles.name)}>
                        {item.group_name ||
                            item.lastName + " " + item.firstName}
                    </p>
					{/* {props.type && <a className={clsx(styles.delete)}><i className="fa-solid fa-x"></i></a>} */}
                </Link>
            ))}
        </>
    );
}

export default ShowList;
