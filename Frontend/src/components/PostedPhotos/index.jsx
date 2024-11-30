import clsx from "clsx";
import styles from './PostedPhotos.module.scss';
import PropTypes from 'prop-types';
import Image from "~/components/Image";
import { useSelector } from "react-redux";

function PostedPhotos() {
    // Lấy dữ liệu từ Redux store
    const { profile, isUser, isGroup, loading, error } = useSelector((state) => state.profile);

    // Nếu không có dữ liệu hoặc không có ảnh
    if (!profile || !profile.posts.postMedia || profile.posts.postMedia.length === 0) {
        return (
            <div className={clsx(styles.sideBarWrapper)}>
                <h1>Ảnh</h1>
                <p style={{ color: '#cfcece', paddingLeft: '5px' }}>0 ảnh</p>
                <p>Không có ảnh nào được đăng.</p>
            </div>
        );
    }

    return (
        <div className={clsx(styles.sideBarWrapper)}>
            <h1>Ảnh</h1>
            <p style={{ color: '#cfcece', paddingLeft: '5px' }}>
                {profile.posts.postMedia.length} ảnh
            </p>
            <div className={clsx(styles.photoWrapper)}>
                {profile.posts.postMedia.map((item, index) => (
                    <div key={index} className={clsx(styles.photo)}>
                        <Image shape="square" size="100%" src={item.media.src.replace(/\\/g, "/")} />
                    </div>
                ))}
            </div>
            <h2>Xem tất cả</h2>
        </div>
    );
}

PostedPhotos.propTypes = {
    profile: PropTypes.shape({
        postMedia: PropTypes.arrayOf(
            PropTypes.shape({
                media: PropTypes.shape({
                    src: PropTypes.string.isRequired,
                }).isRequired,
            })
        ).isRequired,
    }),
};

export default PostedPhotos;
