import { useState } from "react";
import styles from "./DetailMessage.module.scss";

function DetailMessage({ onShow }) {
    const [mess, setMess] = useState("");

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <div className={styles.information}>
                    <img src="/public/img/Cloudy.png"></img>
                    <h2>Thanh phát</h2>
                </div>
                <div className={styles.action}>
                    <i className="fa-solid fa-phone"></i>
                    <i className="fa-solid fa-video"></i>
                    <i
                        onClick={() => onShow()}
                        className="fa-solid fa-circle-info"
                    ></i>
                </div>
            </div>
            <div className={styles.content}>
                <p className={styles.usermessage}>aaaaaaaaa</p>
                <p className={styles.usermessage}>aaaaaaaaa</p>
                <p className={styles.othermessage}>aaaaaaaaa</p>
                <p className={styles.othermessage}>aaaaaaaaa</p>
            </div>
            <div className={styles.chat}>
                <input
                    value={mess}
                    onChange={(e) => setMess(e.target.value)}
                    placeholder="Aa"
                ></input>
                <i className="fa-solid fa-paper-plane"></i>
            </div>
        </div>
    );
}

export default DetailMessage;
