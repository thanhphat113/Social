import clsx from 'clsx';
import styles from './PostList.module.scss';
import PropTypes from 'prop-types';
import Image from '../Image';
import { useSelector } from 'react-redux';

function PostList() {
    // Lấy danh sách bài viết từ Redux state
    const posts = useSelector((state) => state.user.post);

    if (!posts || posts.length === 0) {
        return <p>No posts available.</p>; // Xử lý nếu không có bài viết
    }

    return (
        <div className={clsx(styles.list)}>
            {posts.map((post, index) => (
                <div key={post.postId || index} className={clsx(styles.card)}>
                    {/* Header */}
                    <div className={clsx(styles.header)}>
                        <h3>
                            {post.createdByUser
                                ? `${post.createdByUser.firstName} ${post.createdByUser.lastName}`
                                : 'User'}
                        </h3>
                        <p>{new Date(post.dateCreated).toLocaleString()}</p>
                    </div>
                    
                    {/* Content */}
                    <div className={clsx(styles.content)}>
                        <p>{post.content}</p>
                    </div>
                    
                    {/* Media */}
                    {post.postMedia && post.postMedia.length > 0 && (
                        <div className={clsx(styles.media)}>
                            {post.postMedia.map((media, mediaIndex) => (
                                <Image
                                    key={mediaIndex}
                                    src={media.media.src.replace(/\\/g, '/')}
                                    shape="square"
                                    size="100%"
                                />
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}

// PropTypes kiểm tra kiểu dữ liệu
PostList.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            postId: PropTypes.number.isRequired,
            content: PropTypes.string,
            dateCreated: PropTypes.string.isRequired,
            createdByUser: PropTypes.shape({
                firstName: PropTypes.string,
                lastName: PropTypes.string,
            }),
            postMedia: PropTypes.arrayOf(
                PropTypes.shape({
                    media: PropTypes.shape({
                        src: PropTypes.string.isRequired,
                    }),
                })
            ),
        })
    ),
};

export default PostList;
