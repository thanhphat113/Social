import React, { useState, useEffect } from 'react';
import { FaCloud, FaRegComment, FaRegShareSquare, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import styles from './PostCard.module.scss';
import CommentPost from './../CommentPost/index';
import axios from 'axios';
import {getLikeUser, getLikeCount, LikePost, UnlikePost} from './../../../apis/index';

function PostCard({ author, time, status, imageUrls, avatar, postId,userId }) {
    // const [liked, setLiked] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [likesUser , setLikesUser ] = useState(false);
    const [refreshComments, setRefreshComments] = useState(false);

    useEffect(() => {
        const fetchLikesCount = async () => {
            try {
                const response = await axios.get(`http://localhost:5164/api/Post/likes?postId=${postId}`);
                const responseComment = await axios.get(`http://localhost:5164/api/Post/comment?postId=${postId}`);
                console.log(response.data);
                console.log(responseComment.data);
                setLikesCount(response.data);
                setCommentCount(responseComment.data);
                console.log(responseComment.data);
            } catch (error) {
                if (error.response) {
                    // Server trả về status code không thành công
                    console.error("Error status:", error.response.status);
                    console.error("Error data:", error.response.data);
                } else if (error.request) {
                    // Không nhận được phản hồi từ server
                    console.error("No response received:", error.request);
                } else {
                    // Lỗi khi thiết lập yêu cầu
                    console.error("Axios error:", error.message);
                }
            }
        };
        fetchLikesCount();
    }, [postId, refreshComments]);
    const fetchLikesUser  = async () => {
        try {
            // const response = await axios.get(`http://localhost:5164/api/Post/likeuser?postId=${postId}`);
            const response = await getLikeUser(postId);
            setLikesUser (response.data);
        } catch (error) {
            console.error("Error fetching likes user:", error);
        }
    };
    fetchLikesUser();
    const handleLikeClick = async () => {
        try {
            if (!likesUser) {
                // Nếu chưa thích, gọi API để thêm lượt thích
                // await axios.post(`http://localhost:5164/api/Post/like/${postId}`);
                const response = await LikePost(postId);
                setLikesCount((prevCount) => prevCount + 1); // Tăng số lượt thích
            } else {
                // Nếu đã thích, gọi API để xóa lượt thích
                const response = await UnlikePost(postId);
                setLikesCount((prevCount) => prevCount - 1); // Giảm số lượt thích
            }

        } catch (error) {
            console.error("Error updating like status:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };

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
        setRefreshComments(prev => !prev); // Cập nhật state để refresh comments
    };

    return (
        <>
            <div className={styles.postCard}>
                <div className={styles.postHeader}>
                    <img
                        src={avatar}
                        className={styles.avatar}
                        alt="Avatar"
                    />  
                    <div className={styles.postInfo}>
                        <span className={styles.postAuthor}>{author}</span>
                        <span className={styles.postTime}>{time}</span>
                    </div>
                    <div className={styles.postEdit}>
                        <AiOutlineEdit/>
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

                                {imageUrls.length > 1 && (
                                    <div className={styles.dots}>
                                        {imageUrls.map((_, index) => (
                                            <span
                                                key={index}
                                                className={`${styles.dot} ${index === currentImageIndex ? styles.active : ''}`}
                                                onClick={() => setCurrentImageIndex(index )}
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
                                <span>{(likesCount || 0).toLocaleString()} likes</span>
                            </a>
                        </div>
                        <div className={styles.postComments}>
                            <a href="">
                                <span>{(commentCount || 0).toLocaleString()} bình luận</span>
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
                            className={`${styles.reactionIcon} ${!likesUser ? 'bounce-animation' : styles.reactionIconActive}`}
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
                            postId={postId} // Thêm dòng này
                            onClose={handleCloseComment}
                            author={author}
                            time={time}
                            status={status}
                            imageUrls={imageUrls}
                            currentImageIndex={currentImageIndex}
                            handlePrevImage={handlePrevImage}
                            handleNextImage={handleNextImage}
                            avatar={avatar}
                            likesCount={likesCount}
                            commentCounts={commentCount}
                            currentUser={userId}
                        />
                    </div>
                </div>
            )}
        </>
    );
}

export default PostCard;