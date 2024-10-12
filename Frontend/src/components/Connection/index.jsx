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

function Connection({item}) {
    const renderResult = (attrs)=>(
            <div className={clsx(styles.wrapper)}  {...attrs}>
                <div className={clsx(styles.container)}>
                    <Avatar shape="circle" size={'100px'} src={item.avatar}/>
                    <div className={clsx(styles.info)}>
                        <div className={clsx(styles.name)}>
                            {item.username}
                        </div>
                        <div className={clsx(styles.chungFriend)}>
                            <FaUserFriends />
                            <p>Có {item.chungFriends} bạn chung</p>
                        </div>
                        <div className={clsx(styles.location)}>
                            <FaLocationDot />
                            <p>Sống tại {item.location}</p>
                        </div>
                    </div>
                </div>
                <div className={clsx(styles.buttonContainer)} >
                        <Button size='large' color='thirdary' >
                            <FaUserFriends style={{ fontSize: '16px',marginRight:'5px' }}/> Bạn bè
                            </Button>
                        <Button size='large'>
                            <AiFillMessage style={{ fontSize: '16px',marginRight:'5px' }}/>Nhắn tin ngay
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
                <Avatar shape="square" size={'100%'} src={item.avatar} />
                    <h1 className={clsx(styles.connectionName)}>{item.username}</h1>
            </div>
            </Tippy>
        )
      }

Connection.propTypes = {
  item: PropTypes.shape({
    username: PropTypes.string.isRequired,       
    chungFriends: PropTypes.number.isRequired,   
    avatar: PropTypes.string,                    
    location: PropTypes.string.isRequired,       
  }).isRequired,                                 
};

export default Connection;