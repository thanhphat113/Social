import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import clsx from "clsx";
import styles from "./Profile.module.scss";
import { useEffect } from "react";
import SubHeader from "../../components/SubHeader";
import Connections from "../../components/Connections";
import PostedPhotos from "../../components/PostedPhotos";
import PostList from "../../components/Home/PostList";
import Button from "../../components/Button";
import PostInput from '../../components/Home/PostInput/PostInput.jsx';
import Popup from '../../components/Popup/Popup.jsx';



import { getUserProfile } from "../../components/Redux/Actions/ProfileAction";
import { clearProfile } from '../../components/Redux/Slices/ProfileSlice';


function Profile() {


    const user = {
    }



    const { userId } = useParams()
    const dispatch = useDispatch()
    const { profile, loading, error } = useSelector((state) => state.profile)
    const currentUser = useSelector((state) => state.user)

    useEffect(() => {
        dispatch(getUserProfile(userId))
        return () => {
            dispatch(clearProfile())
        }
    }, [dispatch, userId])

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!profile) return <p>No profile found</p>;



    return (
        <>
            <Popup
            />

            {profile && (
                <div className={clsx(styles.container)}>
                    <SubHeader />

                    <div className={clsx(styles.main)}>
                        <div className={clsx(styles.sideBar)}>
                            <div style={{ width: "100%", marginBottom: "10px" }}>
                                <Connections />
                            </div>

                            <PostedPhotos data={{ totalPhotos: user.totalPhotos, photos: user.photos }} />
                        </div>
                        <div className={clsx(styles.content)}>
                            <div className={clsx(styles.wrapper)}>
                                <PostInput />
                                <PostList style={{
                                    width: "100%",
                                }}
                                userId={userId}
                                 />
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
}

export default Profile;