import clsx from 'clsx';
import styles from './Profile.module.scss'
import Image from '../../components/Image';
import { FaCameraRotate } from "react-icons/fa6";
import Avatar from '../../components/Avatar';
import { TickBlueIcon } from '../../components/Icon';
import { FaBriefcase,FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import Button from '../../components/Button';
import { useState } from 'react';

const user = {
    username:'Nguyễn Trí Dũng',
    tickBlue:true,
    totalFriends:250,
    Friend:[],
    job:'Student',
    location:'niu dót',
    createdDate:'Nov 26, 2019',
    avatar:null,
    coverPhoto:null,
}

function Profile() {
    const [isActive, setIsActive] = useState(0);
    const handleClick = (index) => {
        setIsActive(index)
      }
    return ( 
        <div className={clsx(styles.container)}>
            <div className={clsx(styles.subHeader)}>
                <div className={clsx(styles.wrapper)}>
                    <div className={clsx(styles.coverPhoto)}>
                        <Image
                        src={user.coverPhoto}
                        />
                        <Button color='secondary' size='large' className={clsx(styles.coverButton)}>
                        <FaCameraRotate className={clsx(styles.icon)} />
                        Đổi ảnh bìa</Button>
                    </div>
                    <div className={clsx(styles.info)}>
                        <div className={clsx(styles.avatarHolder)}>
                            <div className={clsx(styles.avatar)}>
                                <Avatar 
                                src={user.avatar}
                                size={120}
                                className={clsx(styles.avatarShadow)}
                                />
                            </div>
                        </div>
                        <div className={clsx(styles.detail)}>
                            <div className={clsx(styles.userName)}>
                                <h1>{user.username}</h1>
                                {user.tickBlue && <TickBlueIcon size='1.7rem'/>}
                            </div>
                            <p>250 connections</p>
                            <div className={clsx(styles.description)}>
                                <div className={clsx(styles.job)}>
                                    <FaBriefcase />
                                    <p>{user.job}</p>
                                </div>
                                <div className={clsx(styles.location)}>
                                    <FaLocationDot />
                                    <p>{user.location}</p>
                                </div>
                                <div className={clsx(styles.createdDate)}>
                                    <FaCalendarAlt />
                                    <p>{user.createdDate}</p>
                                </div>
                            </div>
                        </div>
                        <div className={clsx(styles.editInfo)}>
                            <div className={clsx(styles.editInfoWrapper)}> 
                                <Button color='primary'
                                 size='large'
                                 className={clsx(styles.editButton)}
                                 >edit profile</Button>
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
                         className={`${styles.item} ${isActive === 2 ? styles.active : ''}`}>Connection {user.totalFriends?user.totalFriends:0}</a>
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
            <div className={clsx(styles.content)}>
                <div className={clsx(styles.wrapper)}>
                    content
                </div>
            </div>
            <div className={clsx(styles.sideBar)}>
                <div className={clsx(styles.wrapper)}>
                    friend
                </div>               
            </div>
        </div>
     );
}

export default Profile;