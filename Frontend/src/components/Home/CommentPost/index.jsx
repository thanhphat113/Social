import React from 'react';
import styles from './CommentPost.Module.scss';
import { useState } from 'react'; 
import { FaCloud, FaRegComment, FaRegShareSquare, FaChevronLeft, FaChevronRight } from "react-icons/fa";


const commentPost = ({
    onClose,
    author,
    time,
    status,
    imageUrls,
    currentImageIndex,
    handlePrevImage,
    handleNextImage
}) => {

    const [liked, setLiked] = useState(false);
    
    const handleLikeClick = () => {
        setLiked(!liked);
    }
    
    return (
        <div className={styles.postContainer}>
            <div className={styles.postTitle}>
                <h2></h2>
                <button className={styles.closeButton} onClick={onClose}>X</button>
            </div>
            <div className={styles.contentContainer}>
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

                    {imageUrls.length > 0 && (
                        <div className={styles.slider}>
                            <div className={styles.containImage}>
                                {imageUrls.length > 1 && (
                                    <>
                                        <button className={styles.prevButton} onClick={handlePrevImage}>
                                            <FaChevronLeft/>
                                        </button>
                                        <button className={styles.nextButton} onClick={handleNextImage}>
                                            <FaChevronRight/>
                                        </button>
                                    </>
                                )}
                                <img
                                    src={imageUrls[currentImageIndex]}
                                    className={styles.postImage}
                                    alt="Post"
                                />

                                {imageUrls.length > 1 && (
                                    <div className={styles.dots}>
                                        {imageUrls.map((_, index) => (
                                            <span
                                                key={index}
                                                className={`${styles.dot} ${index === currentImageIndex ? styles.active : ''}`}
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
                        {liked ? (
                            <FaCloud className={`${styles.reactionIconActive}`} onClick={handleLikeClick}/>
                        ) : (
                            <FaCloud className={`${styles.reactionIcon} bounce-animation`} onClick={handleLikeClick}/>
                        )}
                        <FaRegComment className={styles.postComment}/>
                        <FaRegShareSquare className={styles.postShare}/>
                    </div>
                </div>
                <div className={styles.commentSection}>
                    <div className={styles.comment}>
                        <div className={styles.commentProfilePic}>

                        </div>
                        <div className={styles.commentContentContainer}>
                            <div className={styles.commentContent}>
                                <p>
                                    Thanh Thao Vo Tuấn Đạt kịch bản cũng giống ha 😢
                                </p>
                            </div>
                            <div className={styles.commentReact}>
                                <span>Thích</span>
                            </div>
                        </div>

                    </div>
                    <div className={styles.comment}>
                        <div className={styles.commentProfilePic}>

                        </div>
                        <div className={styles.commentContentContainer}>
                            <div className={styles.commentContent}>
                                <p>
                                    Thanh Thao Vo Tuấn Đạt kịch bản cũng giống ha 😢
                                </p>
                            </div>
                            <div className={styles.commentReact}>
                                <span>Thích</span>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className={styles.commentInput}>
                <div className={styles.commentProfilePic}>

                </div>
                <div className={styles.commentContentInput}>
                    <input type="text" placeholder="Bình luận dưới tên Đức Toàn">
                    </input>
                </div>
            </div>

        </div>
    )
};

export default commentPost;