import clsx from "clsx";
import styles from './Connections.module.scss';
import Connection from "../Connection";
import { useSelector } from "react-redux";

function Connections() {
    const { profile, isUser, isGroup, loading, error } = useSelector((state) => state.profile);
    const data = isUser ? profile.friend : profile.userInGroups.map(uig => uig.user); // Lấy user từ userInGroups

    return (
        <div className={clsx(styles.connectionsWrapper)}>
            <div className={clsx(styles.header)}>
                <h1>{isUser ? 'Bạn bè' : 'Thành viên'}</h1>
                <span>{isUser ? profile.friend.length : profile.userInGroups.length} người</span>
                {(isUser ? profile.friend.length : profile.userInGroups.length) > 0 && (
                    <button className={clsx(styles.viewAll)}>Xem tất cả</button>
                )}
            </div>
            <div className={clsx(styles.connectionsGrid)}>
                {data.map((item, index) => (
                    <Connection key={index} item={item} />
                ))}
            </div>
        </div>
    );
}


export default Connections;
