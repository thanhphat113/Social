import { Link } from 'react-router-dom'
import styles from './ItemPostNotification.module.scss'
import { useNavigate } from 'react-router-dom';

function ItemPostNotification( props ) {
	const item = props.package
	console.log(item)
	const navigate = useNavigate()

	return ( 
		<Link className={styles.wrapper}
		to={`post/${item.postId}`}>
			<img onClick={async(e) =>{
				e.preventDefault(),
				navigate(`/${item.userId}`)
			}} src={item.profilePicture || `/public/img/default/${item.genderId !==2 ? "man" : "woman"}_default.png`}></img>
			<p><strong>{item.lastName} {item.firstName}</strong> {item.type.content}</p>
			<div className={styles.isread}>{ item.isRead === 0 && <span></span>}</div>
		</Link>
	 );
}

export default ItemPostNotification;