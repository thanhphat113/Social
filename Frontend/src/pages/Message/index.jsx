import {useState, createContext} from 'react'
import clsx from "clsx";
import styles from './Message.module.scss'
import User from "./components/User";
import DetailMessage from './components/DetailMessage';
import InforMess from './components/InforMess';

const searchs = [
    {
        user_id: 1,
        last_name: "Phat",
		first_name: "thanh",
        profile_picture: "/public/img/Cloudy.png",
		is_read:0
    },
    {
        user_id: 2,
        group_name: "Thanh phat",
        profile_picture: "/public/img/Cloudy.png",
		is_read:0
    },
    {
        user_id: 3,
        group_name: "Thanh phat",
        profile_picture: "/public/img/Cloudy.png",
    },
    {
        user_id: 4,
        group_name: "Thanh phat",
        profile_picture: "/public/img/Cloudy.png",
    },
    {
        user_id: 5,
        group_name: "Thanh phat",
        profile_picture: "/public/img/Cloudy.png",
    },
    {
        user_id: 2,
        group_name: "Thanh phat",
        profile_picture: "/public/img/Cloudy.png",
		is_read:0
    },
    {
        user_id: 2,
        group_name: "Thanh phat",
        profile_picture: "/public/img/Cloudy.png",
		is_read:0
    },
    {
        user_id: 2,
        group_name: "Thanh phat",
        profile_picture: "/public/img/Cloudy.png",
		is_read:0
    },
    {
        user_id: 2,
        group_name: "Thanh phat",
        profile_picture: "/public/img/Cloudy.png",
		is_read:0
    }
];

export const selectedItemContext = createContext()

function Message() {
	const [selected, setSelected] = useState(searchs[0])
	const [show,setShow] = useState(true)

	const handleSelected = (value) =>{
		setSelected(value)
	}
	
	const handleShowInfor = () =>{
		setShow(!show)
	}

	return (
		
		<selectedItemContext.Provider value={handleSelected}>
			<div className={clsx(styles.wrapper)}>
				<div className={clsx(styles.left)}>
					<User list={searchs}/>
				</div>
				<div className={clsx(styles.center)}>
					<DetailMessage onShow={handleShowInfor}></DetailMessage>
				</div>
				{show && <div className={clsx(styles.right)}>
					<InforMess/>
				</div>}
			</div>
		</selectedItemContext.Provider>
	 );
}

export default Message;