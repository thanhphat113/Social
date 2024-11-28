import { useState } from "react";
import styles from "./Nickname.module.scss";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { setNN, setTopic } from "../../../../../../components/Redux/Slices/MessageSlice";
import axios from "axios";
import { staticMess } from "../../../../../../components/Redux/Slices/FriendSlice";

function Nickname({ user }) {
    const message = useSelector((state) => state.message.currentMessage);
    const User = useSelector((state) => state.user.information);
    const friendId = useSelector((state) => state.message.currentUserId);
    const currentNickname1 =  User.userId === message.user1 ? message.nickName1 : message.nickName2
    const currentNickname2 =  User.userId === message.user1 ? message.nickName2 : message.nickName1
    console.log(currentNickname1, currentNickname2)
    const dispatch = useDispatch();

    const [nickName1, setNickName1] = useState(currentNickname1);
    const [nickName2, setNickName2] = useState(currentNickname2);
    const [focus, setFocus] = useState(0);

    const handleAccept = async (MessageId, Nickname1, Nickname2, friendId) => {
        console.log(MessageId, Nickname1, Nickname2)
        if (Nickname1 === currentNickname1 && Nickname2 === currentNickname2) return
        try {
            const response = await axios.put(
                `http://localhost:5164/api/Message/nickname`,
                { MessageId, Nickname1, Nickname2 },
                { withCredentials: true }
            );

            dispatch(staticMess({chat:response.data.result, id: friendId}));
            // console.log(response.data.message)
            dispatch(setNN(response.data.message));
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <h1 className="have-line">Biệt danh</h1>
            <div>
                <p>
                    {`Biệt danh của `}
                    <strong>{`${User.lastName} ${User.firstName}`}</strong>
                </p>
                <input
                    className={clsx({ [styles.focus]: focus === 1 })}
                    onFocus={() => setFocus(1)}
                    onBlur={() => setFocus(0)}
                    type="text"
                    placeholder="Hãy đặt biệt danh gì đó"
                    value={nickName1 || ""}
                    onChange={(e) => setNickName1(e.target.value)}
                />
            </div>
            <div>
                <p>
                    {`Biệt danh của `}
                    <strong>{`${user.lastName} ${user.firstName}`}</strong>
                </p>

                <input
                    className={clsx({ [styles.focus]: focus === 2 })}
                    onFocus={() => setFocus(2)}
                    onBlur={() => setFocus(0)}
                    type="text"
                    placeholder="Hãy đặt biệt danh gì đó"
                    value={nickName2 || ""}
                    onChange={(e) => setNickName2(e.target.value)}
                />
            </div>
            <div className={styles.action}>
                <button onClick={() => handleAccept(message.messagesId, nickName1, nickName2, friendId)} className={styles.accept}>Xác nhận</button>
            </div>
        </div>
    );
}

export default Nickname;
