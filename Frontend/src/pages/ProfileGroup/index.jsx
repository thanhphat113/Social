import clsx from 'clsx';
import styles from './ProfileGroup.module.scss'
import Connections from '../../components/Connections';
import SubHeader from '../../components/SubHeader';
import PostedPhotos from '../../components/PostedPhotos';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getGroupProfile } from '../../components/Redux/Actions/ProfileAction';
import { clearProfile, updateGroupInfo } from '../../components/Redux/Slices/ProfileSlice';
import PostList from "../../components/Home/PostList";

import PostInput from '../../components/Home/PostInput/PostInput.jsx';



const group = {

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

    useEffect(() => {
        if (profile) {
            dispatch(updateGroupInfo(profile));
        }
    }, [profile, dispatch]);

    
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
                <div className={clsx(styles.sideBar)}>
                    <div style={{ width: "100%" , marginBottom: "10px"}}>
                        <Connections />
                    </div>
                    <PostedPhotos data={{totalPhotos: group.totalPhotos,photos: group.photos}}/>
                </div>
                <div className={clsx(styles.content)}>
                    <div className={clsx(styles.wrapper)}>
                    <PostInput />
                    <PostList     style={{
                                        width: "100%",
                                    }} />
                    </div>
                </div>
                
                
             </div>
    </div>   
        )}
        
    </>      
     );
}

export default ProfileGroup;