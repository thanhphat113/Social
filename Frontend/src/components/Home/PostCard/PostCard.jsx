import React, { useState } from 'react';
import { FaCloud, FaRegComment, FaRegShareSquare, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import styles from './PostCard.module.scss';
import CommentPost from './../CommentPost/index';

function PostCard({ author, time, status, imageUrls }) {
    const [liked, setLiked] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showComments, setShowComments] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
    }

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1
        );
    }

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1
        );
    }

    const handleCloseComment = () => {
        setShowComments(false);
    }

    return (
        <>
            <div className={styles.postCard}>
                <div className={styles.postHeader}>
                    <img
                        src={'src/assets/img/avata.png'}
                        className={styles.avatar}
                        alt="Avatar"
                    />
                    <div className={styles.postInfo}>
                        <span className={styles.postAuthor}>{author}</span>
                        <span className={styles.postTime}>{time}</span>
                    </div>
                </div>

                <div className={styles.postContent}>
                    <p className={styles.postText}>{status}</p>

                    {/* Kiểm tra số lượng ảnh trong mảng imageUrls */}
                    {imageUrls.length > 0 && (
                        <div className={styles.slider}>
                            <div className={styles.containImage}>
                                {/* Hiển thị nút prev và next nếu có nhiều hơn 1 ảnh */}
                                {imageUrls.length > 1 && (
                                    <>
                                        <button className={styles.prevButton} onClick={handlePrevImage}>
                                            <FaChevronLeft />
                                        </button>
                                        <button className={styles.nextButton} onClick={handleNextImage}>
                                            <FaChevronRight />
                                        </button>
                                    </>
                                )}
                                <img
                                    src={imageUrls[currentImageIndex]}
                                    className={styles.postImage}
                                    alt="Post"
                                />

                                {/* Hiển thị chấm tròn nếu có nhiều hơn 1 ảnh */}
                                {imageUrls.length > 1 && (
                                    <div className={styles.dots}>
                                        {imageUrls.map((_, index) => (
                                            <span
                                                key={index}
                                                className={`${styles.dot} ${index === currentImageIndex ? styles.active : ''}`}
                                                onClick={() => setCurrentImageIndex(index)}
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className={styles.postFooter}>
                    <div className={styles.postFooterInfo}>
                        <div className={styles.postReactions}>
                            <a href="">
                                <span>200,000 likes</span>
                            </a>
                        </div>
                        <div className={styles.postComments}>
                            <a href="">
                                <span>1K bình luận</span>
                            </a>
                        </div>
                        <div className={styles.postShares}>
                            <a href="">
                                <span>100 lượt chia sẻ</span>
                            </a>
                        </div>
                    </div>

                    <div className={styles.postFooterButtons}>
                        <FaCloud
                            className={`${styles.reactionIcon} ${liked ? styles.reactionIconActive : 'bounce-animation'}`}
                            onClick={handleLikeClick}
                        />
                        <FaRegComment className={styles.postComment} onClick={() => setShowComments(!showComments)} />
                        <FaRegShareSquare className={styles.postShare} />
                    </div>
                </div>
            </div>

            {showComments && (
                <div className={styles.overlay}>
                    <div className={styles.postWrapper}>
                        <CommentPost
                            onClose={handleCloseComment}
                            author={author}
                            time={time}
                            status={status}
                            imageUrls={imageUrls}
                            currentImageIndex={currentImageIndex}
                            handlePrevImage={handlePrevImage}
                            handleNextImage={handleNextImage}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default PostCard;