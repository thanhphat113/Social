import { useState } from "react";
import styles from "./Nickname.module.scss";
import clsx from "clsx";

function Nickname() {
    const [nickName1, setNickName1] = useState("");
    const [nickName2, setNickName2] = useState("hâhhaha");
	const [focus, setFocus] = useState(0)

    return (
        <div className={styles.wrapper}>
            <h1 className="have-line">Biệt danh</h1>
            <div>
                <p>Biệt danh của user1</p>
                <input
					className={clsx({[styles.focus]: focus === 1})}
					onFocus={()=>setFocus(1)}
					onBlur={()=>setFocus(0)}
                    type="text"
                    value={nickName1}
                    onChange={(e) => setNickName1(e.target.value)}
                />
            </div>
            <div>
                <p>Biệt danh của user2</p>
                <input
					className={clsx({[styles.focus]: focus === 2})}
					onFocus={()=>setFocus(2)}
					onBlur={()=>setFocus(0)}
                    type="text"
                    value={nickName2}
                    onChange={(e) => setNickName2(e.target.value)}
                />
            </div>
			<div className={styles.action}>
				<button className={styles.accept}>Xác nhận</button>
			</div>
        </div>
    );
}

export default Nickname;
