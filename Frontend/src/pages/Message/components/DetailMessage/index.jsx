import { useState, useEffect, useRef, useContext } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import moment from "moment";

import styles from "./DetailMessage.module.scss";
import { CustomTooltip } from "../../../../components/GlobalStyles";
import {
    getMess,
    addMess,
    recallMess,
    deleteMess,
    addMessWithMedia,
} from "../../../../components/Redux/Actions/MessageActions";
import Validate from "../../../../components/Validate";

function DetailMessage({ onShow }) {
    const friends = useSelector((state) => state.friends.allFriends);
    const userid = useSelector((state) => state.user.information.userId);
    const currentFriendId = useSelector((state) => state.message.currentUserId);


    const mainTopic = useSelector(
        (state) => state.message.currentMessage?.mainTopicNavigation
    );
    const { user1, nickName1, nickName2 } = useSelector(
        (state) => state.message.currentMessage
    );

    const dispatch = useDispatch();
    const [isSending, setIsSending] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [hoveredMessageId, setHoveredMessageId] = useState(null);
    const [mess, setMess] = useState("");

    const [typeShow, setTypeShow] = useState();
    const [targetMess, setTargetMess] = useState([]);

    const [medias, setMedias] = useState([]);

    const messagesEndRef = useRef(null);
    const listRef = useRef(null);
    const scrollPosition = useRef(0);
    const audioRef = useRef(null);

    const InforCurrentFriend = friends.find(
        (u) => u.userId === currentFriendId
    );

    useEffect(() => {
        // connection.on("ReceiveMessage", async (message) => {
        //     await dispatch(receiveMess(message));
        // });
        // connection.on("ReceiveTopic", async (message) => {
        //     // await dispatch(receiveMess(message));
        //     console.log(message)
        // });
        
    });

    const notifications = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    useEffect(() => {
        getMessage();
        scrollPosition.current = 0;
    }, [currentFriendId]);

    const getMessage = async () => {
        try {
            await dispatch(getMess(currentFriendId));
        } catch (error) {
            console.log("Lỗi: " + error);
        }
    };

    useEffect(() => {
        if (scrollPosition.current === 0) {
            scrollToBottom();
        } else {
            listRef.current.scrollTop = scrollPosition.current;
        }
    }, [friends]);

    const handleCall = () => {
        window.open("/call", "_blank", "width=400,height=600");
    };

    const toggleListVisibility = () => {
        scrollPosition.current = listRef.current.scrollTop;
    };

    const messageId = InforCurrentFriend?.chatInMessages[0].messagesId || -1;

    const message = InforCurrentFriend?.chatInMessages;

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
            const Otheruser = currentFriendId;

            if (isSending) return;

            setIsSending(true);

            const response = await dispatch(
                addMess({ MessagesId, FromUser, Content, Otheruser })
            );

            if (addMess.fulfilled.match(response)) {
                setMess("");
            }

            setIsSending(false);
        }
    };

    const handleSendMedia = async (medias) => {
        if (medias.length > 0) {
            const MessageId = messageId;
            const friendId = currentFriendId;

            if (isSending) return;
            setIsSending(true);

            for (const item of medias) {
                const file = item.file;
                const fileType = item.type;
                try {
                    const response = await dispatch(
                        addMessWithMedia({
                            MessageId,
                            file,
                            fileType,
                            friendId,
                        })
                    );
                    if (addMessWithMedia.fulfilled.match(response)) {
                        setMedias([]);
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            setIsSending(false);
        }
    };

    const handleKeyDown = async (e) => {
        if (e.key === "Enter" && isFocused) {
            handleSendMessage();
            handleSendMedia(medias);
        }
    };

    const onAccept = () => {
        typeShow === "recall"
            ? dispatch(
                  recallMess({ id: targetMess, Otheruser: currentFriendId })
              )
            : dispatch(
                  deleteMess({ id: targetMess, Otheruser: currentFriendId })
              );
        setTypeShow(null);
    };

    const onCancel = () => {
        setTypeShow(null);
    };

    const scrollToBottom = () => {
        scrollPosition.current === 0 &&
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

    const handleDeleteMedia = (indexSelect) => {
        setMedias(medias.filter((_, index) => index !== indexSelect));
    };

    const handleFileChange = (event) => {
        const selectedFiles = event.target.files;

        const newImages = Array.from(selectedFiles).map((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                // Lưu ảnh dưới dạng base64 trong state
                setMedias((prevImages) => [
                    ...prevImages,
                    {
                        src: reader.result,
                        type: file.type.startsWith("image")
                            ? 1
                            : file.type.startsWith("video")
                            ? 2
                            : 3,
                        file: file,
                    },
                ]);
            };
            reader.readAsDataURL(file);
        });
        event.target.value = null;
    };

    return (
        <div className={styles.wrapper}>
            <audio
                ref={audioRef}
                src="/public/sound/notification.mp3"
                style={{ display: "none" }}
            />
            <div className={styles.top}>
                <CustomTooltip title="Trang cá nhân">
                    <div className={styles.information}>
                        <img
                            src={
                                InforCurrentFriend.profilePicture
                                    ? `${InforCurrentFriend.profilePicture.src}`
                                    : `/public/img/default/${
                                          InforCurrentFriend.genderId !== 2
                                              ? "man"
                                              : "woman"
                                      }_default.png`
                            }
                        ></img>
                        <strong>
                            {user1 === currentFriendId
                                ? nickName1 ||
                                  `${InforCurrentFriend.lastName} ${InforCurrentFriend.firstName}`
                                : nickName2 ||
                                  `${InforCurrentFriend.lastName} ${InforCurrentFriend.firstName}`}
                        </strong>
                    </div>
                </CustomTooltip>
                <div
                    className={styles.action}
                    style={{
                        color: mainTopic?.color,
                    }}
                >
                    <CustomTooltip title="Gọi">
                        <i
                            onClick={() => handleCall()}
                            className="fa-solid fa-phone"
                        ></i>
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
            <div ref={listRef} className={clsx(styles.content)}>
                {Object.keys(groupedMessages).map((date) => (
                    <div key={date} className={clsx(styles.chatzone)}>
                        <small>{date}</small>
                        {groupedMessages[date].map((mess) => {
                            const formattedTime = moment(
                                mess.dateCreated
                            ).format("HH:mm");
                            if (mess.isNoti)
                                return (
                                    <div
                                        key={mess.chatId}
                                        className={styles.noti}
                                    >
                                        {mess.content}
                                    </div>
                                );
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
                                                {!mess.isRecall ? (
                                                    <>
                                                        {" "}
                                                        <CustomTooltip title="Thu hồi">
                                                            <i
                                                                className={clsx(
                                                                    styles.delete,
                                                                    "fa-solid fa-rotate-left"
                                                                )}
                                                                onClick={() => {
                                                                    toggleListVisibility();
                                                                    setTypeShow(
                                                                        "recall"
                                                                    );
                                                                    setTargetMess(
                                                                        mess.chatId
                                                                    );
                                                                }}
                                                            ></i>
                                                        </CustomTooltip>
                                                    </>
                                                ) : (
                                                    <CustomTooltip title="Xoá">
                                                        <i
                                                            className={clsx(
                                                                styles.update,
                                                                "fa-solid fa-trash"
                                                            )}
                                                            onClick={() => {
                                                                toggleListVisibility();
                                                                setTypeShow(
                                                                    "delete"
                                                                );
                                                                setTargetMess(
                                                                    mess.chatId
                                                                );
                                                            }}
                                                        ></i>
                                                    </CustomTooltip>
                                                )}
                                            </>
                                        )}
                                    <CustomTooltip title={formattedTime}>
                                        <div
                                            className={clsx(styles.mess)}
                                            style={{
                                                backgroundColor:
                                                    userid === mess.fromUser &&
                                                    mainTopic &&
                                                    mainTopic.color,
                                            }}
                                        >
                                            {mess.media && !mess.isRecall ? (
                                                mess.media.mediaType === 1 ? (
                                                    <img
                                                        src={mess.media.src}
                                                        alt={mess.media.mediaId}
                                                        className={styles.file}
                                                    />
                                                ) : mess.media.mediaType ===
                                                  2 ? (
                                                    <video
                                                        src={mess.media.src}
                                                        className={styles.file}
                                                        controls
                                                        alt={mess.media.mediaId}
                                                    />
                                                ) : (
                                                    <iframe
                                                        src={mess.media.src}
                                                        className={styles.file}
                                                        alt={mess.media.mediaId}
                                                    />
                                                )
                                            ) : (
                                                <p
                                                    className={clsx({
                                                        [styles.recall]:
                                                            mess.isRecall,
                                                    })}
                                                >
                                                    {!mess.isRecall
                                                        ? mess.content
                                                        : "Bạn đã thu hồi tin nhắn"}
                                                </p>
                                            )}
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
                <div className={styles.medias}>
                    {medias.length > 0 &&
                        medias.map((media, index) => (
                            <div
                                className={styles.mediaFrame}
                                key={index}
                                style={{
                                    display: "inline-block",
                                    margin: "8px",
                                }}
                            >
                                <div
                                    className={styles.delete}
                                    onClick={() => handleDeleteMedia(index)}
                                >
                                    x
                                </div>
                                {media.type === 2 ? (
                                    <video
                                        src={media.src}
                                        alt={media.file.name}
                                        className={styles.show}
                                    />
                                ) : media.type === 1 ? (
                                    <img
                                        src={media.src}
                                        alt={media.file.name}
                                        className={styles.show}
                                    />
                                ) : (
                                    <iframe
                                        src={media.src}
                                        alt={media.file.name}
                                        className={styles.show}
                                    />
                                )}
                                <p>{media.name}</p>
                            </div>
                        ))}
                </div>
                <div className={styles.chatAction}>
                    <input
                        type="file"
                        id="fileInput"
                        multiple
                        onChange={handleFileChange}
                        style={{ display: "none" }}
                    />
                    <i
                        style={{
                            color: mainTopic?.color,
                        }}
                        className={clsx("fa-solid fa-plus")}
                        onClick={() =>
                            document.getElementById("fileInput").click()
                        }
                    ></i>
                    <input
                        value={mess}
                        onBlur={() => setIsFocused(false)}
                        onFocus={() => setIsFocused(true)}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setMess(e.target.value)}
                        placeholder="Aa"
                    ></input>
                    <i
                        style={{
                            color: mainTopic?.color,
                        }}
                        onClick={() => handleSendMessage()}
                        className={clsx("fa-solid fa-paper-plane")}
                    ></i>
                </div>
            </div>

            {typeShow && (
                <Validate
                    onAccept={onAccept}
                    onCancel={onCancel}
                    message={`Bạn có chắc chắn muốn ${
                        typeShow === "recall" ? `thu hồi` : `xoá`
                    } tin nhắn này?`}
                />
            )}
        </div>
    );
}

export default DetailMessage;
