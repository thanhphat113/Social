import clsx from "clsx";
import styles from "./ShowList.module.scss";

function ShowList(props) {
    const list = props.list;
    return (
        <>
            {list.map((item) => (
                <div
                    className={clsx(styles.wrapper)}
                    key={item.group_id || item.user_id}
                >
                    <img
                        className={clsx(styles.profile)}
                        src={item.profile_picture}
                    ></img>
                    <p className={clsx(styles.name)}>
                        {item.group_name ||
                            item.last_name + " " + item.first_name}
                    </p>
					{props.type && <a className={clsx(styles.delete)}><i className="fa-solid fa-x"></i></a>}
                </div>
            ))}
        </>
    );
}

export default ShowList;
