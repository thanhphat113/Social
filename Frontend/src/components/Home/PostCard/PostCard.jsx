import React, { useState, useEffect } from 'react';
import { FaCloud, FaRegComment, FaRegShareSquare, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiOutlineEdit } from "react-icons/ai";
import styles from './PostCard.module.scss';
import CommentPost from './../CommentPost/index';
import axios from 'axios';
import {getLikeUser, getLikeCount, LikePost, UnlikePost} from './../../../apis/index';
import { IoIosMore } from "react-icons/io";

function PostCard({ author, time, status, imageUrls, avatar, postId,userId }) {
    // const [liked, setLiked] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [showComments, setShowComments] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [commentCount, setCommentCount] = useState(0);
    const [likesUser , setLikesUser ] = useState(false);
    const [refreshComments, setRefreshComments] = useState(false);

    const [showEditMenu, setShowEditMenu] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(status);
    const [editImages, setEditImages] = useState(imageUrls);
    const [postVersion, setPostVersion] = useState(0);

    useEffect(() => {
        const fetchLikesCount = async () => {
            try {
                const response = await axios.get(`http://localhost:5164/api/Post/likes?postId=${postId}`);
                const responseComment = await axios.get(`http://localhost:5164/api/Post/comment?postId=${postId}`);
                setLikesCount(response.data);
                setCommentCount(responseComment.data);
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

    const toggleEditMenu = () => {
        setShowEditMenu(prev => !prev);
    };

    const handleEditPost = async () => {
        // Gọi API để cập nhật bài viết
        try {
            const response = await axios.put(`http://localhost:5164/api/Post?postId=${postId}`, 
                {
                    content: editContent
                },
                {
                    headers: {
                        'Content-Type': 'application/json' // Không cần thiết nhưng rõ ràng
                    }, 
                    withCredentials: true 
                }
            );
            // Cập nhật lại trạng thái sau khi chỉnh sửa
            setIsEditing(false);
            setShowEditMenu(false);
            window.location.reload();
            // Cập nhật lại nội dung bài viết nếu cần
        } catch (error) {
            console.error("Error updating post:", error);
        }
    };
    
    const handleDeletePost = async () => {
        // Xác nhận và gọi API để xóa bài viết
        if (window.confirm("Bạn có chắc chắn muốn xóa bài viết này không?")) {
            try {
                await axios.delete(`http://localhost:5164/api/Post/${postId}`);
                // Xử lý sau khi xóa, ví dụ: gọi lại API để lấy danh sách bài viết
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
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
                    {userId === 11 && ( // So sánh userId của người dùng hiện tại với userId của bài viết
                        <div className={styles.postEdit}>
                            <IoIosMore onClick={toggleEditMenu} />
                            {showEditMenu && (
                                <div className={styles.editMenu}>
                                    <button onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
                                    <button onClick={handleDeletePost}>Xóa</button>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {isEditing && (
                    <div className={styles.editFormOverlay}>
                        <div className={styles.editForm}>
                            <button 
                                className={styles.closeButton} 
                                onClick={() => setIsEditing(false)}
                            >
                                &times;
                            </button>
                            <h2 className={styles.formTitle}>Chỉnh sửa bài viết</h2>
                            <div className={styles.editFormContent}>
                                {editImages.length > 0 && (
                                    <div className={styles.imagePreviewContainer}>
                                        {editImages.length > 1 && (
                                            <button 
                                                className={styles.prevButton} 
                                                onClick={handlePrevImage}
                                            >
                                                &#10094;
                                            </button>
                                        )}
                                        
                                        <div className={styles.imagePreview}>
                                            <img 
                                                src={editImages[currentImageIndex]} 
                                                alt={`Preview ${currentImageIndex}`} 
                                            />
                                        </div>
                                        
                                        {editImages.length > 1 && (
                                            <button 
                                                className={styles.nextButton} 
                                                onClick={handleNextImage}
                                            >
                                                &#10095;
                                            </button>
                                        )}
                                    </div>
                                )}

                                <textarea
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    placeholder="Thêm mô tả..."
                                />
                            </div>

                            
                            <div className={styles.formActions}>
                                <button 
                                    className={styles.saveButton}
                                    onClick={handleEditPost}
                                >
                                    Lưu
                                </button>
                                <button 
                                    className={styles.cancelButton}
                                    onClick={() => setIsEditing(false)}
                                >
                                    Hủy
                                </button>
                            </div>
                        </div>
                    </div>
                )}

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