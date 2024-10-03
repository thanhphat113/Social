import styles from "./Information.module.scss";
import AccountIcon from "./components/AccountIcon";

function Imformation() {
    return (
        <>
            <div className={styles.wrapper}>
                {/* <Show title={'Thông báo'} name={'fa-solid fa-bell'}/> */}
				<AccountIcon title={'Tài khoản'} img={'/public/img/Cloudy.png'} name={'thanh phat'}/>
            </div>
        </>
    );
}

export default Imformation;
