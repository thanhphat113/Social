import clsx from 'clsx';
import styles from './ProfileGroup.module.scss'
import Connections from '../../components/Connections';
import SubHeader from '../../components/SubHeader';
import PostedPhotos from '../../components/PostedPhotos';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getGroupProfile } from '../../components/Redux/Actions/ProfileAction';
import { clearProfile } from '../../components/Redux/Slices/ProfileSlice';



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
    const {groupId} = useParams()
    const dispatch = useDispatch()
    const {profile, loading, error} = useSelector((state)=>state.profile)
    useEffect(()=>{
        dispatch(getGroupProfile(groupId))
        return ()=>{
            dispatch(clearProfile())
        }
    },[dispatch,groupId])
    let data = {
        name: group.groupName,
        totalConnections: group.totalMembers,
        connections: group.members,
        ...group
    }
    return ( 
        <>
        {profile &&(
            <div className={clsx(styles.container)}>
            <SubHeader >
                {/* Chỗ nhét các button và logic Page nè*/}
            </SubHeader>
            <div className={clsx(styles.main)}>
                <div className={clsx(styles.content)}>
                    <div className={clsx(styles.wrapper)}>
                        {/* Chỗ nhét bài viết */}
                        content
                    </div>
                </div>
                <div className={clsx(styles.sideBar)}>
                <div style={{ width: "100%" }}>
                        <Connections />
                    </div>
                    <PostedPhotos data={{totalPhotos: group.totalPhotos,photos: group.photos}}/>
                </div>
                
             </div>
    </div>   
        )}
        
    </>      
     );
}

export default ProfileGroup;