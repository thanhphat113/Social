import { useState } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import styles from "./InforMess.module.scss";
import { CustomTooltip } from "../../../../components/GlobalStyles";
import Nickname from "./components/Nickname";
import MainTopic from "./components/MainTopic";
import Media from "./components/Media";
import File from "./components/File";

function InforMess() {
    const friends = useSelector((state) => state.friends.allFriends);
    const currentFriendId = useSelector((state) => state.message.currentUserId);
    const InforCurrentFriend = friends.find(
        (u) => u.userId === currentFriendId
    );
    const [typeDrop, setTypeDrop] = useState("mmm");
    const [click, setClick] = useState(false);
    const [dropSetting, setDropSetting] = useState(false);
    const [dropFile, setDropFile] = useState(false);
    const [isFileTheme, setIsFileTheme] = useState(false);

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <img
                    className={clsx(styles.profile)}
                    src={
                        InforCurrentFriend.profilePicture
                            ? `/public/img/Picture/${InforCurrentFriend.profilePicture.src}`
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
                    <i className="fa-solid fa-circle-user"></i>
                </CustomTooltip>
                <CustomTooltip title="Tìm kiếm">
                    <i
                        onClick={() => setClick(!click)}
                        className={clsx("fa-solid fa-magnifying-glass", {
                            [styles.active]: click,
                        })}
                    ></i>
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
                        <div className={styles.item}>
                            <button>Thay đổi chủ đề</button>
                            <div className={styles.icon}></div>
                        </div>
                        <div className={clsx(styles.item)}>
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
                        <button className={styles.item}>File</button>
                        <button className={styles.item}>
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
                            <File />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default InforMess;
