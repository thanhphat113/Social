import clsx from "clsx";
import Avatar from "../Avatar";
import styles from './Connection.module.scss'
import Tippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css';
import PropTypes from 'prop-types'
import { FaUserFriends } from "react-icons/fa"
import { FaLocationDot } from "react-icons/fa6"
import { AiFillMessage } from "react-icons/ai"
import Button from "../Button";
import { Link } from "react-router-dom";

function Connection({ item }) {
    const renderResult = (attrs) => (
        <div className={clsx(styles.wrapper)} {...attrs}>
            <div className={clsx(styles.container)}>
                <Link to={`/profile/${item.userId}`}>
                    <Avatar shape="circle" size={'100px'} src={item.profilePicture?.src} />
                </Link>
                <div className={clsx(styles.info)}>
                    <div className={clsx(styles.name)}>
                        {item.lastName + " " + item.firstName}
                    </div>
                    <div className={clsx(styles.location)}>
                        <FaLocationDot />
                        <p>Sống tại {item.location || 'Chưa cập nhật'}</p>
                    </div>
                </div>
            </div>
            <div className={clsx(styles.buttonContainer)}>
                <Button size="large" color="thirdary">
                    <FaUserFriends style={{ fontSize: '16px', marginRight: '5px' }} /> Kết bạn
                </Button>
                <Button size="large">
                    <AiFillMessage style={{ fontSize: '16px', marginRight: '5px' }} /> Nhắn tin ngay
                </Button>
            </div>
        </div>
    );

    return (
        <Tippy
            interactive
            render={renderResult}
            delay={[500, 0]}
            placement="bottom"
        >
            <div className={clsx(styles.connection)}>
                <Link to={`/profile/${item.userId}`}>
                    <Avatar shape="square" size={'100%'} src={item.profilePicture?.src} />
                    <h1 className={clsx(styles.connectionName)}>{item.lastName + " " + item.firstName}</h1>
                </Link>
            </div>
        </Tippy>
    );
}


export default Connection;