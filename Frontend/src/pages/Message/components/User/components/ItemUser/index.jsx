import styles from "./ItemUser.module.scss";
import { useSelector,useDispatch } from "react-redux";
import { findMessById } from "../../../../../../components/Redux/Actions/MessageActions";
import { setCurrentUser } from "../../../../../../components/Redux/Slices/MessageSlice";

function ItemUser() {
    const friends = useSelector( (state) => state.user.friends)
    const userId = useSelector( (state) => state.user.information.userId)
    const dispatch =useDispatch()

    const handleClick = async (value) =>{
        const user1 = userId; // Ví dụ về user1
        const user2 = value; 
        await dispatch(setCurrentUser(value))
        await dispatch(findMessById({user1,user2}))
    }

    return (
        <div className={styles.wrapper}>
            {friends.map((item) => (
                <button key={item.userId} onClick={() => handleClick(item.userId)} className={styles.item}>
                    <img src={item.profilePicture || `/public/img/default/${item.genderId !==2 ? "man" : "woman"}_default.png`}></img>
                    <div className={styles.content}>
                        <strong>
                            {item.lastName} {item.firstName}
                        </strong>
                        <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
					{item.is_read === 0 && <span></span>}
                </button>
            ))}
        </div>
    );
}

export default ItemUser;
