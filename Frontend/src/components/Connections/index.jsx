import clsx from "clsx";
import styles from './Connections.module.scss'
import Connection from "../Connection";
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
function Connections() {
    const {profile,isUser,isGroup,loading,error} = useSelector((state)=>state.profile)
    let data
    data = isUser?profile.friends:profile.members
    return ( 
    <>
        <div className ={clsx(styles.sideBarWrapper)}>
            <h1>{isUser?'Bạn bè':'Thành viên'}</h1>
            <p style={{color:'#cfcece',paddingLeft: '5px'}}>{isUser?profile.friends.length:profile.members.length} người</p>
            <div className={clsx(styles.avatarWrapper)}>
                {data.map((item, index) => (
                <Connection
                    key={index}
                    item={item}
                >
                </Connection>
                ))}
            </div> 
            {(isUser ? profile.friends.length : profile.memberCount) > 0 && <h2>Xem tất cả</h2>}       
        </div>
    </>
     );
}

export default Connections;