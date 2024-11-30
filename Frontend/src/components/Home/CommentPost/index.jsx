import React, { useState, useEffect } from 'react';
import styles from './CommentPost.Module.scss';
import { FaCloud, FaRegComment, FaRegShareSquare, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from 'axios'; // Import axios
import {getLikeUser, getLikeCount, LikePost, UnlikePost} from './../../../apis/index';
import { IoIosMore } from "react-icons/io";



const CommentPost = ({
    postId, // Thêm postId
    onClose,
    author,
    time,
    status,
    imageUrls,
    currentImageIndex,
    handlePrevImage,
    handleNextImage,
    avatar,
    commentCounts,
    currentUser
}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentCount, setCommentCount] = useState(0); // Thêm state để theo dõi số lần gửi bình luận
    const [likesUser , setLikesUser ] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [likeCommentCount, setLikeCommentCount] = useState(0);
    const [likedComments, setLikedComments] = useState({});
    const [commentLikeStatus, setCommentLikeStatus] = useState({});
    const [checkUserLikeComment, setCheckUserLikeComment] = useState(false);
    const [activeCommentOptionsId, setActiveCommentOptionsId] = useState(null);
    const [editingComment, setEditingComment] = useState(null);


    const isCurrentUserComment = (comment) => {
        return currentUser && comment.user && currentUser === comment.userId;
    };



    // Bắt đầu sửa xóa comment

    const handleEditCommentChange = (e) => {
        setEditingComment({
            ...editingComment,
            content: e.target.value
        });
    };

    // Hàm toggle dropdown options
    const toggleCommentOptions = (commentId) => {
        setActiveCommentOptionsId(
            activeCommentOptionsId === commentId ? null : commentId
        );
    };

    // Hàm bắt đầu chỉnh sửa comment
    const handleStartEditComment = (comment) => {
        setEditingComment({
            commentId: comment.commentId,
            content: comment.content
        });
        setActiveCommentOptionsId(null); // Đóng dropdown
    };

    // Hàm lưu comment đã chỉnh sửa
    const handleSaveEditComment = async () => {
        console.log(editingComment.commentId)
        try {
            const response = await axios.put(
                `http://localhost:5164/api/Comment?commentId=${editingComment.commentId}`, 
                { 
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true 
                }
            );


            setComments(comments.map(comment => 
                comment.commentId === editingComment.commentId 
                    ? {...comment, content: editingComment.content} 
                    : comment
            ));

            // Reset trạng thái chỉnh sửa
            setEditingComment(null);
        } catch (error) {
            console.error('Error updating comment:', error);
            alert('Không thể cập nhật bình luận. Vui lòng thử lại.');
        }
    };

    // Hàm xử lý xóa comment
    const handleDeleteComment = async (commentId) => {
        try {
            await axios.delete(`http://localhost:5164/api/Comment?commentId=${commentId}`, {
                withCredentials: true
            });
            
            // Cập nhật danh sách comment sau khi xóa
            setComments(comments.filter(comment => comment.commentId !== commentId));
        } catch (error) {
            console.error('Error deleting comment:', error);
            alert('Không thể xóa bình luận. Vui lòng thử lại.');
        }
    };

    // Thêm useEffect để đóng dropdown khi click ngoài
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(`.${styles.commentActions}`)) {
                setActiveCommentOptionsId(null);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Kết thúc sửa xóa comment

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
    useEffect(() => {
        const fetchLikesCount = async () => {
            try {
                // const response = await axios.get(`http://localhost:5164/api/Post/likes?postId=${postId}/`);
                const response = await getLikeCount(postId);
                setLikesCount(response.data);
            } catch (error) {
                console.error("Error fetching likes count:", error);
            }
        };
        fetchLikesCount();
    }, [postId]);


    useEffect(() => {
        const fetchUserLikeComments = async () => {
            try {
                // Lặp qua từng comment để kiểm tra
                const likeStatusPromises = comments.map(async (comment) => {
                    console.log('COMMENT', comment);
                    try {
                        const response = await axios.get(`http://localhost:5164/api/Comment/userlikecomment?commentId=${comment.commentId}`,
                            {
                                withCredentials: true, // Gửi kèm cookie
                            }
                        );
                        setCheckUserLikeComment(response.data); 
                        console.log(`Checkuserlikecomment 0 ${comment.commentId}`, checkUserLikeComment);
                        } catch (error) {
                        console.error(`Error checking like status for comment ${comment.commentId}:`, error);
                        return {
                            commentId: comment.commentId,
                            isLiked: false
                        };
                    }
                });
            } catch (error) {
                console.error("Error fetching likes user:", error);
            }
        };
    
        // Chỉ chạy khi comments đã được tải
        if (comments.length > 0) {
            fetchUserLikeComments();
        }
    }, [comments]);

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


    const handleLikeCommentClick = async (commentId) => {
        try {
            console.log("commentId", commentId);
            const isCurrentlyLiked = checkUserLikeComment;
            console.log("checkUserLikeComment 1", checkUserLikeComment);
            setCheckUserLikeComment(!checkUserLikeComment);
            console.log("checkUserLikeComment 2", checkUserLikeComment);
            if (isCurrentlyLiked != false) {
                // Nếu đã like, gọi API để unlike
                const response = await axios.post(`http://localhost:5164/api/Comment/unlike?commentId=${commentId}`,
                    {}, // Body (nếu không có body, để trống)
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true, // Gửi kèm cookie
                    }
                );
                setCheckUserLikeComment(!checkUserLikeComment);
                console.log("checkUserLikeComment", checkUserLikeComment);
                
                // Giảm số lượng like
                setLikedComments(prev => ({
                    ...prev,
                    [commentId]: Math.max((prev[commentId] || 0) - 1, 0)
                }));

                // Cập nhật trạng thái like
                setCommentLikeStatus(prev => ({
                    ...prev,
                    [commentId]: false
                }));

                console.log("checkUserLikeComment 3", checkUserLikeComment);


            } else {
                // Nếu chưa like, gọi API để like
                const response = await axios.post(`http://localhost:5164/api/Comment/react?commentId=${commentId}`,
                    {}, // Body (nếu không có body, để trống)
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true, // Gửi kèm cookie
                    }
                );
                
                // Tăng số lượng like
                setLikedComments(prev => ({
                    ...prev,
                    [commentId]: (prev[commentId] || 0) + 1
                }));

                // Cập nhật trạng thái like
                setCommentLikeStatus(prev => ({
                    ...prev,
                    [commentId]: true
                }));

                console.log("checkUserLikeComment 4", checkUserLikeComment);
            }
        } catch (error) {
            console.error("Error liking the comment:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };
    // Fetch comments khi component mount hoặc khi commentCount thay đổi
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5164/api/Comment?postid=${postId}`);
                setComments(response.data);
                const initialLikedComments = {};
                response.data.forEach(comment => {
                    initialLikedComments[comment.commentId] = comment.reactsComments.length; // Giả sử reactsComments chứa số lượt thích
                });
                setLikedComments(initialLikedComments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        fetchComments();
    }, [postId, commentCount]); // Thêm commentCount vào dependency array

    const formatTimeAgo = (date) => {
        const now = new Date();
        const commentDate = new Date(date);
        commentDate.setHours(commentDate.getHours() + 7); 
        const diffInSeconds = Math.floor((now - commentDate) / 1000);

        if (diffInSeconds < 60) {
            return `${diffInSeconds} giây trước`;
        } else if (diffInSeconds < 3600) {
            const diffInMinutes = Math.floor(diffInSeconds / 60);
            return `${diffInMinutes} phút trước`;
        } else {
            const diffInHours = Math.floor(diffInSeconds / 3600);
            return `${diffInHours} giờ trước`;
        }
    };

    const handleSubmitComment = async () => {
        if (!newComment.trim()) return;

        try {
            const response = await axios.post(`http://localhost:5164/api/Comment/create?postId=${postId}`, {
                content: newComment
            }, {
                withCredentials: true // Gửi cookie cùng với yêu cầu
            });

            // Thêm comment mới vào danh sách
            setComments([...comments, response.data]);
            
            // Xóa nội dung input
            setNewComment('');

            // Tăng commentCount để gọi lại useEffect
            setCommentCount(prevCount => prevCount + 1);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    
    return (
        <div className={styles.postContainer}>
            <div className={styles.postTitle}>
                <h2></h2>
                <button className={styles.closeButton} onClick={onClose}>X</button>
            </div>
            <div className={styles.contentContainer}>
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
                                <span>{likesCount} likes</span>
                            </a>
                        </div>
                        <div className={styles.postComments}>
                            <a href="">
                                <span>{commentCounts} bình luận</span>
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
                        <FaRegComment className={styles.postComment}/>
                        <FaRegShareSquare className={styles.postShare}/>
                    </div>
                </div>
                <div className={styles.commentSection}>
                    {comments.map(comment => (
                        <div key={comment.commentId} className={styles.comment}>
                            <div className={styles.commentProfilePic}>
                                <img
                                    src={comment.user?.profilePicture || (comment.user?.genderId === 2 ? './../../../../public/img/default/woman_default.png' : './../../../../public/img/default/man_default.png')} // Sử dụng avatar từ API
                                />
                            </div>
                            <div className={styles.commentContentContainer}>
                                <div className={styles.commentHeader}>
                                    {editingComment?.commentId === comment.commentId ? (
                                        <div className={styles.editCommentContainer}>
                                            <input 
                                                type="text"
                                                value={editingComment.content}
                                                onChange={handleEditCommentChange}
                                                className={styles.editCommentInput}
                                                autoFocus // Tự động focus vào input khi chỉnh sửa
                                            />
                                            <div className={styles.editCommentActions}>
                                                <button 
                                                    onClick={handleSaveEditComment}
                                                    className={styles.saveButton}
                                                >
                                                    Lưu
                                                </button>
                                                <button 
                                                    onClick={() => setEditingComment(null)}
                                                    className={styles.cancelButton}
                                                >
                                                    Hủy
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div className={styles.commentContent}>
                                                <span>
                                                    <strong>
                                                        {comment.user 
                                                            ? `${comment.user.firstName} ${comment.user.lastName}` 
                                                            : 'Ẩn danh'}
                                                    </strong>
                                                </span>
                                                <br></br>
                                                <span>{comment.content}</span>
                                            </div>
                                            {/* Nút chỉnh sửa chỉ hiện với comment của người dùng hiện tại */}
                                            {isCurrentUserComment(comment) && (
                                                <div className={styles.commentActions}>
                                                    <IoIosMore 
                                                        onClick={() => toggleCommentOptions(comment.commentId)} 
                                                    />
                                                    {activeCommentOptionsId === comment.commentId && (
                                                        <div className={styles.actionDropdown}>
                                                            <button onClick={() => handleStartEditComment(comment)}>
                                                                Chỉnh sửa
                                                            </button>
                                                            <button onClick={() => handleDeleteComment(comment.commentId)}>
                                                                Xóa
                                                            </button>
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>

                                    )}  
                            
                                    
                                </div>
                                <div className={styles.commentReact}>
                                    <span>{formatTimeAgo(comment.dateCreated)}</span>
                                    <span className={`
                                        ${styles.likeComment} 
                                        ${commentLikeStatus[comment.commentId] ? styles.likeActive : ''}
                                        `} 
                                        onClick={() => handleLikeCommentClick(comment.commentId)}
                                    >
                                        Thích
                                    </span>
                                    <span>{(likedComments[comment.commentId] || 0).toLocaleString()}</span>
                                    <span>Phản hồi</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className={styles.commentInput}>
                    <div className={styles.commentProfilePic}>
                        {/* Thêm ảnh avatar người dùng hiện tại */}
                    </div>
                    <div className={styles.commentContentInput}>
                        <input 
                            type="text" 
                            placeholder="Bình luận dưới tên Đức Toàn"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    handleSubmitComment();
                                }
                            }}
                        />
                        <button onClick={handleSubmitComment}>Gửi</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CommentPost;