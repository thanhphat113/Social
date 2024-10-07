import clsx from 'clsx';
import styles from './Profile.module.scss'
import Button from '../../components/Button';
import Connections from '../../components/Connections';
import SubHeader from '../../components/SubHeader';
import PostedPhotos from '../../components/PostedPhotos';


const user = {
    username:'Nguyễn Trí Dũng',
    tickBlue:true,
    totalFriends:250,
    friends:[{
        username:'Negav',
        chungFriends:5,
        profilePicture:null,
        location:'HCM'
    },
    {
        username:'Hieuthuhai',
        chungFriends:10,
        profilePicture:null,
        location:'Bình Dương'
    },
    {
        username:'Hurrykang',
        chungFriends:6,
        profilePicture:null,
        location:'An Giang'
    },
    {
        username:'Anh Tú Atus',
        chungFriends:3,
        location:'An Giang',
        profilePicture:null,
    },
    {
        username:'Erik',
        chungFriends:8,
        profilePicture:null,
        location:'HCM'
    },
    {
        username:'Pháp Kiều',
        chungFriends:10,
        profilePicture:null,
        location:'HCM'
    },],
    job:'Student',
    location:'niu dót',
    dateUpdated:'Nov 26, 2019',
    profilePicture:null,
    coverPhoto:null,
    totalPhotos:4,
    photos:[
        {
            photo:null,
        },
        {
            photo:null,
        },
        {
            photo:null,
        },
        {
            photo:null,
        },

    ]
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
                <div className={clsx(styles.sideBar)}>
                    <Connections 
                    type='user'
                    data={{ connections: user.friends, totalConnections: user.totalFriends }}/>
                    <PostedPhotos data={{totalPhotos: user.totalPhotos,photos: user.photos}}/>
                </div>
            </div>
        </div>
     );
}

export default Profile;