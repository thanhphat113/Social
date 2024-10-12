import clsx from "clsx";
import styles from './Connections.module.scss'
import Connection from "../Connection";
import PropTypes from 'prop-types';
function Connections({type='user',data}) {
    return ( 
    <>
        <div className ={clsx(styles.sideBarWrapper)}>
            <h1>{type==='user'?'Bạn bè':'Thành viên'}</h1>
            <p style={{color:'#cfcece',paddingLeft: '5px'}}>{data.totalConnections} người</p>
            <div className={clsx(styles.avatarWrapper)}>
                {data.connections.map((item, index) => (
                <Connection
                    key={index}
                    item={item}
                >
                </Connection>
                ))}
            </div> 
            <h2>Xem tất cả</h2>        
        </div>
    </>
     );
}
Connections.propTypes = {
    type: PropTypes.string.isRequired,
    data: PropTypes.shape({
        connections: PropTypes.arrayOf(
            PropTypes.shape({
                username: PropTypes.string.isRequired,
                chungFriends: PropTypes.number.isRequired,
                avatar: PropTypes.string,
                location: PropTypes.string.isRequired,
            })
        ).isRequired,
        totalConnections: PropTypes.number.isRequired,
    }).isRequired,
};
export default Connections;