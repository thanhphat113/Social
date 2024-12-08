import clsx from "clsx";
import styles from './PostedPhotos.module.scss';
import PropTypes from 'prop-types';
import Image from "~/components/Image";
import { useSelector } from "react-redux";

function PostedPhotos() {
    // Lấy dữ liệu từ Redux store
    const { profile } = useSelector((state) => state.profile);

    // Nếu không có dữ liệu hoặc không có bài đăng
    if (!profile || !profile.posts || profile.posts.length === 0) {
        return (
            <div className={clsx(styles.sideBarWrapper)}>
                <h1>Ảnh</h1>
                <p style={{ color: '#cfcece', paddingLeft: '5px' }}>0 ảnh</p>
                <p>Không có ảnh nào được đăng.</p>
            </div>
        );
    }

    // Tạo danh sách ảnh từ tất cả các bài đăng
    const allMedia = profile.posts
        .flatMap((post) => post.medias || []) // Lấy `medias` từ mỗi bài đăng
        .map((media) => ({
            src: media.src.replace(/\\/g, "/"), // Đảm bảo định dạng đường dẫn hợp lệ
        }));

    // Nếu không có ảnh nào trong các bài đăng
    if (allMedia.length === 0) {
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
                {allMedia.length} ảnh
            </p>
            <div className={clsx(styles.photoWrapper)}>
                {allMedia.map((item, index) => (
                    <div key={index} className={clsx(styles.photo)}>
                        <Image shape="square" size="100%" src={"http://localhost:5164/media/"+item.src}/>
                    </div>
                ))}
            </div>
            <h2>Xem tất cả</h2>
        </div>
    );
}

PostedPhotos.propTypes = {
    profile: PropTypes.shape({
        posts: PropTypes.arrayOf(
            PropTypes.shape({
                medias: PropTypes.arrayOf(
                    PropTypes.shape({
                        src: PropTypes.string.isRequired,
                    })
                ),
            })
        ),
    }),
};

export default PostedPhotos;
