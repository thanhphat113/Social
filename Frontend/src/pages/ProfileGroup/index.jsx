import clsx from 'clsx';
import styles from './ProfileGroup.module.scss'
import Connections from '../../components/Connections';
import SubHeader from '../../components/SubHeader';


const group = {
    groupName:'Fanclub Bích Phương',
    totalMembers:250,
    members:[{
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
    isPublic:true,
    createdDate:'Nov 27, 2019',
    coverPhoto:null,
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
                <Connections
                type='group'
                data={{ connections: group.members, totalConnections: group.totalMembers }}
                />
             </div>
    </div>         
     );
}

export default ProfileGroup;