import clsx from "clsx";
import { Link } from "react-router-dom";
import styles from "./ShowList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
    addHistory,
    deleteHistory,
    updateHistory,
} from "../../../../../../../Redux/Actions/HistorySearchAction";
import axios from "axios";
import { useState } from "react";

function ShowList(props) {
    const list = props.list;
    console.log(list);
    const history = props.history;
    console.log(history);
    const dispatch = useDispatch();

    async function selectItem(userId) {
        const index = history.findIndex((u) => u.userId === userId);

        if (index >= 0) {
            const [element] = history.splice(index, 1);
            history.unshift(element);
            console.log("Đã chạy vào đây");
            await dispatch(updateHistory(userId));
        } else {
            try {
                const response = await axios.post(
                    "http://localhost:5164/api/HistorySearch",
                    { OtherUserId: userId },
                    { withCredentials: true }
                );
                const user = list.find((u) => u.userId === userId);
                history.unshift({
                    historyId: response.data.historyId,
                    userId: user.userId,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profilePicture: user.profilePicture,
                    genderId: user.genderId,
                });
            } catch (ex) {
                console.log(ex);
            }
        }
    }

    return (
        <div>
            {list.map((item) => (
                <Link
                    to={`/${item.userId}`}
                    className={clsx(styles.wrapper)}
                    key={item.userId}
                    onClick={() => selectItem(item.userId)}
                >
                    <img
                        className={clsx(styles.profile)}
                        src={
                            item.profilePicture?.src
                                ? `/public/img/Picture/${item.profilePicture.src}`
                                : `/public/img/default/${
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
                            e.stopPropagation();
                            const isDelete = (await dispatch(deleteHistory(item.historyId))).payload;
                            if (isDelete) {
                                const result = history.filter(h => h.historyId !== item.historyId)
                                props.setHistory(result)
                            }
                        }}
                    >
                        {props.search === "" && <i className="fa-solid fa-x"></i>}
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default ShowList;
