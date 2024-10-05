import { Link } from 'react-router-dom'
import styles from './ItemPostNotification.module.scss'

function ItemPostNotification( props ) {
	const item = props.package
	return ( 
		<Link className={styles.wrapper}>
			<img src={item.from_user_id.profile_picture}></img>
			<p><strong>{item.from_user_id.first_name} {item.from_user_id.last_name}</strong> {item.type_id.content}</p>
			<div className={styles.isread}>{ item.isRead === 0 && <span></span>}</div>
		</Link>
	 );
}

export default ItemPostNotification;