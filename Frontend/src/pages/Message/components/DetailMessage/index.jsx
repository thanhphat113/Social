import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import moment from "moment";

import styles from "./DetailMessage.module.scss";
import { CustomTooltip } from "../../../../components/GlobalStyles";
import {
    addMess,
    findMessById,
} from "../../../../components/Redux/Actions/MessageActions";

function DetailMessage({ onShow }) {
    const friends = useSelector((state) => state.user.friends);
    const userid = useSelector((state) => state.user.information.userId);
    const currentFriendId = useSelector((state) => state.message.currentUser);
    const InforCurrentFriend = friends.find(
        (u) => u.userId === currentFriendId
    );
    const { messageId, message } = useSelector((state) => state.message);

    const dispatch = useDispatch();
    const [isSending, setIsSending] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hoveredMessageId, setHoveredMessageId] = useState(null);
    const [mess, setMess] = useState("");

    const messagesEndRef = useRef(null);

    useEffect(() => {
        setMess("");
    }, [currentFriendId]);

    useEffect(() => {
        scrollToBottom();
    }, [message]);

    const handleSendMessage = async () => {
        if (mess.trim()) {
            const MessagesId = messageId;
            const FromUser = userid;
            const Content = mess;

            if (isSending) return; // Ngăn không cho gửi thêm tin nhắn nếu đang gửi

            setIsSending(true);

            const response = await dispatch(
                addMess({ MessagesId, FromUser, Content })
            );
            if (addMess.fulfilled.match(response)) {
                await dispatch(
                    findMessById({ user1: userid, user2: currentFriendId })
                );
                setMess("");
            } else {
                console.log("Lỗi chat");
            }

            setIsSending(false);
        }
    };

    const handleKeyDown = async (e) => {
        if (e.key === "Enter" && isFocused) {
            handleSendMessage();
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    };

    const groupedMessages = message.reduce((acc, message) => {
        const date = new Date(message.dateCreated).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(message);
        return acc;
    }, {});

    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <CustomTooltip title="Trang cá nhân">
                    <div className={styles.information}>
                        <img
                            src={
                                InforCurrentFriend.profilePicture ||
                                `/public/img/default/${
                                    InforCurrentFriend.genderId !== 2
                                        ? "man"
                                        : "woman"
                                }_default.png`
                            }
                        ></img>
                        <h2>
                            {InforCurrentFriend.lastName}{" "}
                            {InforCurrentFriend.firstName}
                        </h2>
                    </div>
                </CustomTooltip>
                <div className={styles.action}>
                    <CustomTooltip title="Gọi">
                        <i className="fa-solid fa-phone"></i>
                    </CustomTooltip>
                    <CustomTooltip title="Gọi video">
                        <i className="fa-solid fa-video"></i>
                    </CustomTooltip>
                    <CustomTooltip title="Xem thông tin">
                        <i
                            onClick={() => onShow()}
                            className="fa-solid fa-circle-info"
                        ></i>
                    </CustomTooltip>
                </div>
            </div>
            <div className={styles.content}>
                {Object.keys(groupedMessages).map((date) => (
                    <div key={date} className={styles.chatzone}>
                        <small>{date}</small>
                        {groupedMessages[date].map((mess) => {
                            const formattedTime = moment(
                                mess.dateCreated
                            ).format("HH:mm");
                            return (
                                <div
                                    onMouseEnter={() =>
                                        setHoveredMessageId(mess.chatId)
                                    }
                                    onMouseLeave={() =>
                                        setHoveredMessageId(null)
                                    }
                                    key={mess.chatId}
                                    className={clsx(styles.contentchat, {
                                        [styles.usermessage]:
                                            userid === mess.fromUser,
                                        [styles.othermessage]:
                                            userid !== mess.fromUser,
                                    })}
                                >
                                    {hoveredMessageId === mess.chatId &&
                                        userid === mess.fromUser && (
                                            <>
                                                <CustomTooltip title="Thu hồi">
                                                    <i
                                                        className={clsx(
                                                            styles.delete,
                                                            "fa-solid fa-trash-can"
                                                        )}
                                                    ></i>
                                                </CustomTooltip>
                                                <CustomTooltip title="Chỉnh sửa">
                                                    <i
                                                        className={clsx(
                                                            styles.update,
                                                            "fa-solid fa-pencil"
                                                        )}
                                                    ></i>
                                                </CustomTooltip>
                                            </>
                                        )}
                                    <CustomTooltip title={formattedTime}>
                                        <div className={styles.mess}>
                                            <p> {mess.content}</p>
                                        </div>
                                    </CustomTooltip>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                ))}
            </div>
            <div className={styles.chat}>
                <input
                    value={mess}
                    onBlur={() => setIsFocused(false)}
                    onFocus={() => setIsFocused(true)}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setMess(e.target.value)}
                    placeholder="Aa"
                ></input>
                <i
                    onClick={() => handleSendMessage()}
                    className="fa-solid fa-paper-plane"
                ></i>
            </div>
        </div>
    );
}

export default DetailMessage;
