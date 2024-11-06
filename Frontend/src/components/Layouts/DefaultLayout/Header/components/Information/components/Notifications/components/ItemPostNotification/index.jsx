import { Link } from 'react-router-dom'
import styles from './ItemPostNotification.module.scss'

function ItemPostNotification( props ) {
	const item = props.package

	return ( 
		<Link className={styles.wrapper}>
			<img src={item.profilePicture || `/public/img/default/${item.genderId !==2 ? "man" : "woman"}_default.png`}></img>
			<p><strong>{item.lastName} {item.firstName}</strong> {item.type.content}</p>
			<div className={styles.isread}>{ item.isRead === 0 && <span></span>}</div>
		</Link>
	 );
}

export default ItemPostNotification;