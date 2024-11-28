import clsx from "clsx";
import PropTypes from 'prop-types';
import Image from "~/components/Image";
import styles from './SubHeader.module.scss'
import Avatar from "~/components/Avatar";
import { FaCameraRotate, FaLocationDot } from "react-icons/fa6";
import Button from "~/components/Button";
// import { TickBlueIcon } from "../Icon";
import {  FaCalendarAlt,FaLock,FaUserFriends } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { useState } from "react";
import { useSelector } from "react-redux";

function SubHeader({children}) {


        const {profile, isUser, isGroup, loading, error} = useSelector((state)=>state.profile)
        const [isActive, setIsActive] = useState(0)
        const handleClick = (index) => {
            setIsActive(index)
          }
          console.log(profile)
        const avatarSize = window.innerWidth <= 768 ? '100px' : '120px'



    return ( 
        <div className={clsx(styles.subHeader)}>
                <div className={clsx(styles.wrapper)}>
                    <div className={clsx(styles.coverPhoto)}>
                        <Image
                        src={profile.coverPhoto}
                        />
                        <Button color='secondary' size='large' className={clsx(styles.coverButton)}>
                        <FaCameraRotate className={clsx(styles.icon)} />
                        Đổi ảnh bìa</Button>
                    </div>
                    <div className={clsx(styles.info)}>
                        {isUser ? (
                        <div className={clsx(styles.avatarHolder)}>
                            <div className={clsx(styles.avatar)}>
                                <Avatar 
                                shape='circle'
                                src={profile.information.profilePicture}
                                size={avatarSize}
                                className={clsx(styles.avatarShadow)}
                                />
                            </div>
                        </div>
                            ):(
                                <div style={{marginLeft:'20px'}}></div>
                            )}
                        <div className={clsx(styles.detail)}>
                            <div className={clsx(styles.userName)}>
                                <h1>{isUser?(profile.information.firstName+" "+profile.information.lastName):profile.groupName}</h1>
                                {/* {(isUser&& data.tickBlue) && <TickBlueIcon size='1.7rem'/>} */}
                            </div>
                            {isUser &&(
                                <p>{profile.friend.length} friends</p>
                            )}
                            <div className={clsx(styles.description)}>
                                {isUser?(
                                <>
                                    <div>
                                        <p style={{ fontSize: '18px' }}>{profile.information.bio}</p>
                                    </div>
                                    <div>
                                        <FaLocationDot />
                                        <p>{profile.information.location}</p>
                                    </div>
                                </>
                                ):(
                                <>
                                    <div>
                                        {profile.privacy?(<BiWorld />):(<FaLock />)}
                                        <p>{profile.isPublic ?'Public':'Private'}</p>
                                    </div>
                                    <div>
                                        <FaUserFriends />
                                        <p>{profile.membersCount} members</p>
                                    </div>
                                </>
                                )}
                                <div>
                                    <FaCalendarAlt />
                                    {/* <p style={{margin: 0}}>Created at {profile.information.dateCreated}</p> */}
                                </div>
                            </div>
                        </div>
                        <div className={clsx(styles.editInfo)}>
                            <div className={clsx(styles.editInfoWrapper)}> 
                                {children}
                            </div>
                        </div>
                    </div>
                    <div className={clsx(styles.subBar)}>
                        <a
                         onClick={() => handleClick(0)} 
                         className={`${styles.item} ${isActive === 0 ? styles.active : ''}`}>Feed</a>
                        <a
                         onClick={() => handleClick(1)} 
                         className={`${styles.item} ${isActive === 1 ? styles.active : ''}`}>About</a>
                        <a
                         onClick={() => handleClick(2)} 
                         className={`${styles.item} ${isActive === 2 ? styles.active : ''}`}>Review</a>
                        <a
                         onClick={() => handleClick(3)} 
                         className={`${styles.item} ${isActive === 3 ? styles.active : ''}`}>Media</a>
                        <a
                         onClick={() => handleClick(4)} 
                         className={`${styles.item} ${isActive === 4 ? styles.active : ''}`}>Video</a>
                        <a
                         onClick={() => handleClick(5)} 
                         className={`${styles.item} ${isActive === 5 ? styles.active : ''}`}>Events</a>
                        <a
                         onClick={() => handleClick(6)} 
                         className={`${styles.item} ${isActive === 6 ? styles.active : ''}`}>Activity</a>
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