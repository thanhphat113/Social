import clsx from "clsx";
import styles from './Message.module.scss'

function Message() {
	return ( 
		<div className={clsx(styles.wrapper)}>
			<div className={clsx(styles.left)}>User</div>
			<div className={clsx(styles.center)}>Chat</div>
			<div className={clsx(styles.right)}>Information</div>
		</div>
	 );
}

export default Message;