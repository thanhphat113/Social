import clsx from "clsx";
import PropTypes from 'prop-types';
import Image from "../Image";
import styles from './SubHeader.module.scss'
import Avatar from "../Avatar";
import { FaCameraRotate, FaLocationDot } from "react-icons/fa6";
import Button from "../Button";
import { TickBlueIcon } from "../Icon";
import { FaBriefcase, FaCalendarAlt,FaLock,FaUserFriends } from "react-icons/fa";
import { BiWorld } from "react-icons/bi";
import { useState } from "react";

function SubHeader({type='user', data,children}) {
    const [isActive, setIsActive] = useState(0)
    const handleClick = (index) => {
        setIsActive(index)
      }
    const avatarSize = window.innerWidth <= 768 ? '100px' : '120px'
    return ( 
        <div className={clsx(styles.subHeader)}>
                <div className={clsx(styles.wrapper)}>
                    <div className={clsx(styles.coverPhoto)}>
                        <Image
                        src={data.coverPhoto}
                        />
                        <Button color='secondary' size='large' className={clsx(styles.coverButton)}>
                        <FaCameraRotate className={clsx(styles.icon)} />
                        Đổi ảnh bìa</Button>
                    </div>
                    <div className={clsx(styles.info)}>
                        {type==='user' ? (
                        <div className={clsx(styles.avatarHolder)}>
                            <div className={clsx(styles.avatar)}>
                                <Avatar 
                                shape='circle'
                                src={data.avatar}
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
                                <h1>{data.name}</h1>
                                {(type==='user'&& data.tickBlue) && <TickBlueIcon size='1.7rem'/>}
                            </div>
                            {type==='user'&&(
                                <p>{data.totalConnections} friends</p>
                            )}
                            <div className={clsx(styles.description)}>
                                {type==='user'?(
                                <>
                                    <div>
                                        <FaBriefcase />
                                        <p>{data.job}</p>
                                    </div>
                                    <div>
                                        <FaLocationDot />
                                        <p>{data.location}</p>
                                    </div>
                                </>
                                ):(
                                <>
                                    <div>
                                        {data.isPublic?(<BiWorld />):(<FaLock />)}
                                        <p>{data.isPublic ?'Public':'Private'}</p>
                                    </div>
                                    <div>
                                        <FaUserFriends />
                                        <p>{data.totalConnections} members</p>
                                    </div>
                                </>
                                )}
                                <div>
                                    <FaCalendarAlt />
                                    <p>Created at {data.createdDate}</p>
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
                         className={`${styles.item} ${isActive === 2 ? styles.active : ''}`}>Members {data.totalConnections?data.totalConnections:0}</a>
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
    type: PropTypes.string,
    data: PropTypes.shape({
        name: PropTypes.string.isRequired,
        totalConnections: PropTypes.number.isRequired,
        connections: PropTypes.array.isRequired,
        job: PropTypes.string,
        location: PropTypes.string,
        coverPhoto: PropTypes.string,
        avatar: PropTypes.string,
        isPublic: PropTypes.bool,
        createdDate: PropTypes.string.isRequired,
        tickBlue: PropTypes.bool,
    }).isRequired,
    children: PropTypes.node,
};

export default SubHeader;