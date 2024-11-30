import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import styles from "./MainTopic.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { setTopic } from "../../../../../../components/Redux/Slices/MessageSlice";
import {  staticMess } from "../../../../../../components/Redux/Slices/FriendSlice";

function MainTopic() {
    const mainTopic = useSelector((state) => state.message.currentMessage);
    const currentFriendId = useSelector( (state) => state.message.currentUserId ) 

    const [select, setSelect] = useState(
        mainTopic.mainTopicNavigation?.topicId
    );

    const [isLoading, setIsLoading] = useState(false)
    const [topics, setTopics] = useState([]);

    const dispatch = useDispatch();

    const item = topics.find((t) => t.topicId === select);

    useEffect(() => {
        getMainTopic();
    }, []);

    useEffect( () => {
        // connection.on("ReceiveMessage", async (message) => {
        //     await dispatch(receiveMess(message));
        // });
    })

    const updateTopic = async (TopicId, MessageId, currentFriendId) => {
        if (isLoading) return

        setIsLoading(true)
        if (TopicId === mainTopic.mainTopicNavigation.topicId) return;
        try {
            const response = await axios.put(
                `http://localhost:5164/api/Message/topic`,
                { TopicId, MessageId },
                {
                    withCredentials: true,
                }
            );
            dispatch(staticMess({chat:response.data.result, id:currentFriendId}))
            dispatch(setTopic(response.data.mainTopic));
        } catch (error){
            console.log(error)
        }
        setIsLoading(false)
    };

    const getMainTopic = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5164/api/MainTopic`,
                {
                    withCredentials: true,
                }
            );
            setTopics(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className={styles.wrapper}>
            <h1 className="have-line">Xem trước và thay đổi chủ đề</h1>
            <div className={styles.content}>
                <div className={clsx(styles.item, styles.left)}>
                    {topics.length > 0 &&
                        topics.map((item) => (
                            <div
                                key={item.topicId}
                                className={clsx(styles.choise, "have-line")}
                                onClick={() => setSelect(item.topicId)}
                            >
                                <div
                                    className={styles.circle}
                                    style={{ borderColor: item.color }}
                                ></div>
                                <span>{item.topicName}</span>
                                {item.topicId === select && (
                                    <i className="fa-solid fa-check"></i>
                                )}
                            </div>
                        ))}
                </div>
                <div className={clsx(styles.item, styles.right)}>
                    <div className={styles.user}>
                        <p
                            className={styles.chat}
                            style={{ backgroundColor: item?.color }}
                        >
                            Tin nhắn của bạn sẽ như thế này
                        </p>
                    </div>
                    <div className={styles.other}>
                        <p className={styles.chat}>Tin nhắn của người khác</p>
                    </div>
                </div>
            </div>
            <div className={styles.action}>
                <button
                    onClick={() =>
                        updateTopic(item.topicId, mainTopic.messagesId,currentFriendId)
                    }
                >
                    Xác nhận
                </button>
            </div>
        </div>
    );
}

export default MainTopic;
