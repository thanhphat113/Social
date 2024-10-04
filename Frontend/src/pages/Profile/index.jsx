import clsx from 'clsx';
import styles from './Profile.module.scss'
import Button from '../../components/Button';
import Connections from '../../components/Connections';
import SubHeader from '../../components/SubHeader';

const user = {
    username:'Nguyễn Trí Dũng',
    tickBlue:true,
    totalFriends:250,
    friends:[{
        username:'Negav',
        chungFriends:5,
        avatar:null,
        location:'HCM'
    },
    {
        username:'Hieuthuhai',
        chungFriends:10,
        avatar:null,
        location:'Bình Dương'
    },
    {
        username:'Hurrykang',
        chungFriends:6,
        avatar:null,
        location:'An Giang'
    },
    {
        username:'Anh Tú Atus',
        chungFriends:3,
        location:'An Giang',
        avatar:null,
    },
    {
        username:'Erik',
        chungFriends:8,
        avatar:null,
        location:'HCM'
    },
    {
        username:'Pháp Kiều',
        chungFriends:10,
        avatar:null,
        location:'HCM'
    },],
    job:'Student',
    location:'niu dót',
    createdDate:'Nov 26, 2019',
    avatar:null,
    coverPhoto:null,
}


function Profile() {
    let data = {
        name: user.username,
        totalConnections: user.totalFriends,
        connections: user.friends,
        ...user,
    }
    return ( 
        <div className={clsx(styles.container)}>
            <SubHeader type='user' data={data}>
                <Button color='primary'
                    size='large'
                    className={clsx(styles.editButton)}>
                        edit profile
                </Button>
            </SubHeader>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.content)}>
                    <div className={clsx(styles.wrapper)}>
                        {/* Chỗ nhét bài viết */}
                        content
                    </div>
                </div>
                <Connections 
                type='user'
                data={{ connections: user.friends, totalConnections: user.totalFriends }}/>
            </div>
        </div>
     );
}

export default Profile;