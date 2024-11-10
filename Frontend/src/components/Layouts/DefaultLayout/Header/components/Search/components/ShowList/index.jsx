import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./ShowList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    addHistory,
    deleteHistory,
    updateHistory,
} from "../../../../../../../Redux/Actions/HistorySearchAction";

function ShowList(props) {
    const list = props.list;
    const history = props.history;
    const user = useSelector((state) => state.user.information);
    const dispatch = useDispatch();

    const handleClick = async (FromUser, OtherUser, HistoryId) => {
        const result = history.some((item) => item.userId === OtherUser);
        result
            ? await dispatch(updateHistory(HistoryId))
            : await dispatch(addHistory({ FromUser, OtherUser }));
    };

    return (
        <div>
            {list.map((item) => (
                <Link
                    to={`/${item.userId}`}
                    className={clsx(styles.wrapper)}
                    key={item.userId}
                    onClick={() => handleClick(user.userId, item.userId, item.historyId)}
                >
                    <img
                        className={clsx(styles.profile)}
                        src={
                            item.profilePicture ||
                            `/public/img/default/${
                                item.genderId !== 2 ? "man" : "woman"
                            }_default.png`
                        }
                    ></img>
                    <p className={clsx(styles.name)}>
                        {item.group_name ||
                            item.lastName + " " + item.firstName}
                    </p>
                    <div
                        className={clsx(styles.delete)}
                        onClick={async (e) => {
                            e.preventDefault();
                            // e.stopPropagation();
                            await dispatch(deleteHistory(item.historyId));
                        }}
                    >
                        <i className="fa-solid fa-x"></i>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default ShowList;
