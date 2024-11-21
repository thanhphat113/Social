import { Link } from 'react-router-dom'
import styles from './ItemPostNotification.module.scss'
import { useNavigate } from 'react-router-dom';

function ItemPostNotification( props ) {
	const item = props.package
	const navigate = useNavigate()

	return ( 
		<Link className={styles.wrapper}
		to={`post/${item.postId}`}>
			<img onClick={async(e) =>{
				e.preventDefault(),
				navigate(`/${item.fromUser.userId}`)
			}} src={item.fromUser.profilePicture ? `/public/img/Picture/${item.fromUser.profilePicture.src}`:`/public/img/default/${item.genderId !==2 ? "man" : "woman"}_default.png`}></img>
			<p><strong>{item.fromUser.lastName} {item.fromUser.firstName}</strong> {item.type.content}</p>
			<div className={styles.isread}>{ item.isRead === 0 && <span></span>}</div>
		</Link>
	 );
}

export default ItemPostNotification;