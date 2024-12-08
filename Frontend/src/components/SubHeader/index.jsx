import clsx from "clsx";
import PropTypes from 'prop-types';
import Image from "~/components/Image";
import styles from './SubHeader.module.scss'
import Avatar from "~/components/Avatar";
import { FaCameraRotate, FaLocationDot } from "react-icons/fa6";
import Button from "~/components/Button";
// import { TickBlueIcon } from "../Icon";
import { FaCalendarAlt, FaLock, FaUserFriends } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { useState } from "react";
import { useSelector } from "react-redux";
import { sendFriendRequest, checkExistRelationship, unfriend, checkUserInGroup, sendJoinGroupRequest } from "~/apis/";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { openPopup } from "~/components/Redux/Slices/PopupSlice";


function SubHeader() {


    const { profile, isUser, isGroup, loading, error } = useSelector((state) => state.profile)
    const [isActive, setIsActive] = useState(0)
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.user)
    const handleClick = (index) => {
        setIsActive(index)
    }

    const dispatch = useDispatch();

    const handleAvatarClick = () => {
        dispatch(openPopup({ type: "avatar" }));
    };

    const handleCoverPhotoClick = () => {
        dispatch(openPopup({ type: "coverPhoto" }));
    };

    const avatarSize = window.innerWidth <= 768 ? '100px' : '120px'

    const isCurrentUser = isGroup
        ? currentUser?.information?.userId === profile?.createdByUserId
        : currentUser?.information?.userId === profile?.information?.userId


    console.log("day la profile", profile)

    const [relationshipType, setRelationshipType] = useState(null);
    const [loadingRelationship, setLoadingRelationship] = useState(true);


    const handleSendFriendReq = () => {
        if (!isUser || relationshipType === 2) return; // Không gửi nếu đã là bạn bè
        sendFriendRequest(profile.information.userId)
            .then(() => {
                setRelationshipType(1); // Cập nhật trạng thái khi gửi thành công
            })
            .catch((error) => {
                console.error("Error sending friend request:", error);
            });
    };

    const handleJoinGroup = () => {
        if (!isGroup || relationshipType === 2) return; // Không thực hiện nếu đã tham gia nhóm

        sendJoinGroupRequest(profile.groupId) // Có thể cần thay đổi API này cho phù hợp
            .then(() => {
                setRelationshipType(1); // Cập nhật trạng thái sau khi gửi yêu cầu tham gia
            })
            .catch((error) => {
                console.error("Error joining group:", error);
            });
    };


    useEffect(() => {
        if (isUser && profile?.information?.userId) {
            setLoadingRelationship(true);
            checkExistRelationship(profile.information.userId)
                .then((type) => {
                    setRelationshipType(type); // type trả về từ API (1 hoặc 2, hoặc null)
                })
                .catch((error) => {
                    console.error("Error fetching relationship type:", error);
                    setRelationshipType(null);
                })
                .finally(() => setLoadingRelationship(false));
        }

        if (isGroup && profile?.groupId) {
            setLoadingRelationship(true);
            checkUserInGroup(profile.groupId)
                .then((type) => {
                    setRelationshipType(type); // type trả về từ API (1 hoặc 2, hoặc null)
                }
                )
                .catch((error) => {
                    console.error("Error fetching relationship type:", error);
                    setRelationshipType(null);
                }
                )
                .finally(() => setLoadingRelationship(null));
        }

    }, [isUser, profile?.information?.userId]);


    const renderButtonLabel = () => {
        if (loadingRelationship) return 'Đang kiểm tra...';

        if (!isUser) {
            if (relationshipType === null) return 'Tham gia';
            if (relationshipType === 1) return 'Đã tham gia';
        }

        if (isUser) {
            if (relationshipType === null) return 'Thêm bạn';
            if (relationshipType === 1) return 'Đã gửi lời mời';
            if (relationshipType === 2) return 'Bạn bè';
        }

        return 'Thêm bạn';
    };

    const handleUnfriend = () => {
        if (!isUser || relationshipType !== 2) return; // Chỉ hủy nếu đang là bạn bè

        unfriend(profile.information.userId)
            .then(() => {
                setRelationshipType(null); // Cập nhật trạng thái sau khi hủy kết bạn
            })
            .catch((error) => {
                console.error("Error unfriending user:", error);
            });
    };


    return (
        <div className={clsx(styles.subHeader)}>
            <div className={clsx(styles.wrapper)}>
                <div className={clsx(styles.coverPhoto)}>
                    <Image
                        src={profile.information?.coverPicture?.src}
                    />
                    {isCurrentUser && (
                        <Button
                            color="secondary"
                            size="large"
                            className={clsx(styles.coverButton)}
                            onClick={handleCoverPhotoClick}
                        >
                            <FaCameraRotate className={clsx(styles.icon)} />
                            Đổi ảnh bìa
                        </Button>
                    )}
                </div>
                <div className={clsx(styles.info)}>
                    {isUser ? (
                        <div className={clsx(styles.avatarHolder)}>
                            <div className={clsx(styles.avatar)} onClick={handleAvatarClick}>
                                <Avatar
                                    shape='circle'
                                    src={profile.information?.profilePicture?.src}
                                    size={avatarSize}
                                    className={clsx(styles.avatarShadow)}
                                />
                            </div>
                        </div>
                    ) : (
                        <div style={{ marginLeft: '20px' }}></div>
                    )}
                    <div className={clsx(styles.detail)}>
                        <div className={clsx(styles.userName)}>
                            <h1>{isUser ? (profile.information.firstName + " " + profile.information.lastName) : profile.groupName}</h1>
                            {/* {(isUser&& data.tickBlue) && <TickBlueIcon size='1.7rem'/>} */}
                        </div>
                        {isUser && (
                            <p>{profile.friend.length} Bạn bè</p>
                        )}
                        <div className={clsx(styles.description)}>
                            {isUser ? (
                                <>
                                    <div>
                                        <p style={{ fontSize: '18px', margin: "0px" }}>{profile.information.bio}</p>
                                    </div>
                                    <div>
                                        <FaLocationDot />
                                        <p style={{ margin: "0px" }}>{profile.information.location}</p>
                                    </div>

                                    <div>
                                        <FaCalendarAlt />
                                        <p style={{ margin: 0 }}>Tham gia ngày {new Date(profile.information.dateCreated).toLocaleDateString()}</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div>
                                        {profile.privacy ? (<BiWorld />) : (<FaLock />)}
                                        <p style={{ margin: "0px" }}>{profile.privacy}</p>
                                    </div>
                                    <div>
                                        <FaUserFriends />
                                        <p style={{ margin: "0px" }}>{profile.memberCount} members</p>
                                    </div>

                                    <div>
                                        <FaCalendarAlt />
                                        <p style={{ margin: 0 }}>Tạo ngày {new Date(profile.dateCreated).toLocaleDateString()}</p>
                                    </div>
                                </>
                            )}

                        </div>
                    </div>
                    {isCurrentUser ? (
                        <div className={clsx(styles.editInfo)}>
                            <div className={clsx(styles.editInfoWrapper)}>
                                <Button color='primary'
                                    size='large'
                                    className={clsx(styles.editButton)}
                                    onClick={() => { isUser ? navigate('/information') : navigate('/GroupInfo') }}>
                                    Chỉnh sửa thông tin
                                </Button>
                            </div>
                        </div>
                    ) : (

                        <div className={clsx(styles.editInfo)}>
                            {isGroup ? (
                                <div className={clsx(styles.editInfoWrapper)}>
                                    <Button
                                        color="primary"
                                        size="large"
                                        className={clsx(styles.editButton)}
                                        onClick={handleJoinGroup}
                                        disabled={loadingRelationship || relationshipType === 1}
                                    >
                                        {renderButtonLabel()}
                                    </Button>
                                    {relationshipType === 2 && (
                                        <Button
                                            color="secondary"
                                            size="large"
                                            className={clsx(styles.editButton, styles.unfriendButton)}
                                            onClick={handleUnfriend}
                                        >
                                            Rời khỏi nhóm
                                        </Button>
                                    )}
                                </div>
                            ) : (
                                <div className={clsx(styles.editInfoWrapper)}>
                                    <Button
                                        color="primary"
                                        size="large"
                                        className={clsx(styles.editButton)}
                                        onClick={handleSendFriendReq}
                                        disabled={loadingRelationship || relationshipType === 1}
                                    >
                                        {renderButtonLabel()}
                                    </Button>
                                    {relationshipType === 2 && (
                                        <Button
                                            color="secondary"
                                            size="large"
                                            className={clsx(styles.editButton, styles.unfriendButton)}
                                            onClick={handleUnfriend}
                                        >
                                            Hủy kết bạn
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}



                </div>

                <div className={clsx(styles.divider)}></div>
            </div>
        </div>
    );
}
SubHeader.propTypes = {
    children: PropTypes.node,
};

export default SubHeader;