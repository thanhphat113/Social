import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import styles from "./Profile.module.scss";
import { useEffect } from "react";
import SubHeader from "../../components/SubHeader";
import Connections from "../../components/Connections";
import PostedPhotos from "../../components/PostedPhotos";
import PostList from "../../components/PostList";
import Button from "../../components/Button";

import { getUserProfile } from "../../components/Redux/Actions/ProfileAction";
import { clearProfile } from '../../components/Redux/Slices/ProfileSlice';


function Profile() {


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
        },{
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



    const {userId} = useParams()
    const dispatch = useDispatch()
    const {profile, loading, error} = useSelector((state)=>state.profile)
    useEffect(()=>{
        dispatch(getUserProfile(userId))
        return ()=>{
            dispatch(clearProfile())
        }
    },[dispatch,userId])

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!profile) return <p>No profile found</p>;

    return (
        <>
        {profile &&(
            <div className={clsx(styles.container)}>
            <SubHeader>
                <Button color='primary'
                    size='large'
                    className={clsx(styles.editButton)}>
                        edit profile
                </Button>
            </SubHeader>
            <div className={clsx(styles.main)}>
            <div className={clsx(styles.sideBar)}>
                    <div style={{ width: "100%", marginBottom: "10px" }}>
                        <Connections />
                    </div>

                    <PostedPhotos data={{totalPhotos: user.totalPhotos,photos: user.photos}}/>
                </div>
                <div className={clsx(styles.content)}>
                    <div className={clsx(styles.wrapper)}>
                        {/* Chỗ nhét bài viết */}
                        content
                    </div>
                </div>
                
            </div>
        </div>
        )}
        </>
     );
}

export default Profile;