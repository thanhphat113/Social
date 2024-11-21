import styles from './File.module.scss'

function File() {
	return ( 
		<div className={styles.wrapper}>
			<h1 className='have-line'>Danh sách file</h1>
			<div className={styles.list}>
				<li className={styles.item}>123</li>
				<li className={styles.item}>123</li>
				<li className={styles.item}>123</li>
			</div>
		</div>
	 );
}

export default File;