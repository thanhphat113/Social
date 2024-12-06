import { useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import styles from "./InforMess.module.scss";
import { CustomTooltip } from "../../../../components/GlobalStyles";
import Nickname from "./components/Nickname";
import MainTopic from "./components/MainTopic";
import Media from "./components/Media";
import File from "./components/File";
import { useNavigate } from "react-router-dom";

function InforMess() {
    const friends = useSelector((state) => state.friends.allFriends);
    const currentFriendId = useSelector((state) => state.message.currentUserId);
    const mainTopic = useSelector((state) => state.message.currentMessage);

    const InforCurrentFriend = friends.find(
        (u) => u.userId === currentFriendId
    );
    const [typeDrop, setTypeDrop] = useState(null);
    const [click, setClick] = useState(false);
    const [dropSetting, setDropSetting] = useState(false);
    const [dropFile, setDropFile] = useState(false);

    const navigate = useNavigate()

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img
                    className={clsx(styles.profile)}
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
            </div>
            <div className={styles.action}>
                <CustomTooltip title="Trang cá nhân">
                    <i onClick={() => navigate(`/${currentFriendId}`)} className="fa-solid fa-circle-user"></i>
                </CustomTooltip>
            </div>
            {click && <input placeholder="Nhập nội dung tin nhắn"></input>}
            <div className={clsx(styles.dropdownzone)}>
                <div
                    className={clsx(styles.itemdrop)}
                    onClick={() => setDropSetting(!dropSetting)}
                >
                    <button>Tuỳ chỉnh đoạn chat</button>
                    <i
                        className={
                            dropSetting
                                ? "fa-solid fa-caret-up"
                                : "fa-solid fa-caret-down"
                        }
                    ></i>
                </div>
                {dropSetting && (
                    <>
                        <div onClick={()=> setTypeDrop("maintopic")} className={styles.item}>
                            <button>Thay đổi chủ đề</button>
                            <div
                                className={styles.icon}
                                style={{
                                    borderColor:
                                        mainTopic.mainTopicNavigation?.color,
                                }}
                            ></div>
                        </div>
                        <div onClick={()=> setTypeDrop("nickname")} className={clsx(styles.item)}>
                            <button>Thay đổi biệt danh</button>
                        </div>
                    </>
                )}
                <div
                    className={clsx(styles.itemdrop)}
                    onClick={() => setDropFile(!dropFile)}
                >
                    <button>File phương tiện & file</button>
                    <i
                        className={
                            dropFile
                                ? "fa-solid fa-caret-up"
                                : "fa-solid fa-caret-down"
                        }
                    ></i>
                </div>
                {dropFile && (
                    <>
                        <button onClick={()=> setTypeDrop("media")} className={styles.item}>File</button>
                        <button onClick={()=> setTypeDrop("file")} className={styles.item}>
                            File phương tiện
                        </button>
                    </>
                )}
                {typeDrop && (
                    <div className={styles.show}>
                        <div className={styles.contentshow}>
                            <div className={styles.delete}>
                                <i
                                    onClick={() => setTypeDrop(null)}
                                    className="fa-solid fa-x"
                                ></i>
                            </div>
                            {typeDrop === "media" ? (
                                <File />
                            ): typeDrop === "nickname" ?(
                                <Nickname user={InforCurrentFriend}/>
                            ): typeDrop === "maintopic" ?(
                                <MainTopic/>
                            ): typeDrop === "file"  && (
                            <Media/>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InforMess;
