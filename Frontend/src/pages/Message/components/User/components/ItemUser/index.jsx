import {useState,useContext} from 'react'
import styles from "./ItemUser.module.scss";
import { selectedItemContext } from '../../../..';

function ItemUser(props) {
	const list = props.list;
	const selected = useContext(selectedItemContext)
    
    return (
        <div className={styles.wrapper}>
            {list.map((item) => (
                <div key={item.user_id} onClick={() => selected(item.user_id)} className={styles.item}>
                    <img src={item.profile_picture}></img>
                    <div className={styles.content}>
                        <strong>
                            {item.last_name} {item.first_name}
                        </strong>
                        <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                    </div>
					{item.is_read === 0 && <span></span>}
                </div>
            ))}
        </div>
    );
}

export default ItemUser;
