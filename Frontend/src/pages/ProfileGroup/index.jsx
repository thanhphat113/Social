import clsx from 'clsx';
import styles from './ProfileGroup.module.scss'
import Connections from '../../components/Connections';
import SubHeader from '../../components/SubHeader';
import PostedPhotos from '../../components/PostedPhotos';



const group = {
    groupName:'Fanclub Bích Phương',
    totalMembers:250,
    members:[{
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
    isPublic:true,
    dateUpdated:'Nov 27, 2019',
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

function ProfileGroup() {
    let data = {
        name: group.groupName,
        totalConnections: group.totalMembers,
        connections: group.members,
        ...group
    }
    return ( 
        <div className={clsx(styles.container)}>
            <SubHeader type='group' data={data}>
                {/* Chỗ nhét các button và logic Page */}
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
                    type='group'
                    data={{ connections: group.members, totalConnections: group.totalMembers }}
                    />
                    <PostedPhotos data={{totalPhotos: group.totalPhotos,photos: group.photos}}/>
                </div>
                
             </div>
    </div>         
     );
}

export default ProfileGroup;