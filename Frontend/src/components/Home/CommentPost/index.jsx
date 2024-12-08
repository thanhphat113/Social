import React, { useState, useEffect, useMemo } from 'react';
import styles from './CommentPost.Module.scss';
import { FaCloud, FaRegComment, FaRegShareSquare, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from 'axios'; // Import axios
import {getLikeUser, getLikeCount, LikePost, UnlikePost} from './../../../apis/index';
import { IoIosMore } from "react-icons/io";
import { useSelector } from "react-redux";


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
    currentUser,
    urlProfile
}) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [commentCount, setCommentCount] = useState(0); // Thêm state để theo dõi số lần gửi bình luận
    const [likesUser , setLikesUser ] = useState(false);
    const [likesCount, setLikesCount] = useState(0);
    const [likedComments, setLikedComments] = useState({});
    const [commentLikeStatus, setCommentLikeStatus] = useState({});
    const [activeCommentOptionsId, setActiveCommentOptionsId] = useState(null);
    const [editingComment, setEditingComment] = useState(null);
    const [replyContent, setReplyContent] = useState('');
    const [activeReplyCommentId, setActiveReplyCommentId] = useState(null);
    const [commentLikeCounts, setCommentLikeCounts] = useState({});
    const [userCommentID, setUserCommentID] = useState(null);   
    const [profilePictures, setProfilePictures] = useState({});
    const [editingReply, setEditingReply] = useState(null);
    const [replyEditingContent, setReplyEditingContent] = useState('');

    
    const handleStartEditReply = (reply) => {
        setEditingReply(reply.commentId);
        setReplyEditingContent(reply.content);
    };

    //=====================
    const handleSaveEditReply = async () => {
        try {
            const response = await axios.put(
                `http://localhost:5164/api/Comment?commentId=${editingReply}`, 
                { 
                    content: replyEditingContent 
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true 
                }
            );
    
            // Cập nhật phản hồi trong danh sách
            setComments(prevComments => prevComments.map(comment => {
                if (comment.inverseChildOfNavigation) {
                    return {
                        ...comment,
                        inverseChildOfNavigation: comment.inverseChildOfNavigation.map(reply => 
                            reply.commentId === editingReply 
                                ? { ...reply, content: replyEditingContent } 
                                : reply
                        )
                    };
                }
                return comment;
            }));
    
            // Reset trạng thái chỉnh sửa
            setEditingReply(null);
            setReplyEditingContent('');
        } catch (error) {
            console.error('Error updating reply:', error);
            alert('Không thể cập nhật phản hồi. Vui lòng thử lại.');
        }
    };

    const handleDeleteReply = async (replyId) => {
        try {
            await axios.delete(`http://localhost:5164/api/Comment?commentId=${replyId}`, {
                withCredentials: true
            });
    
            // Cập nhật danh sách phản hồi sau khi xóa
            setComments(prevComments => prevComments.map(comment => {
                if (comment.inverseChildOfNavigation) {
                    return {
                        ...comment,
                        inverseChildOfNavigation: comment.inverseChildOfNavigation.filter(reply => reply.commentId !== replyId)
                    };
                }
                return comment;
            }));
        } catch (error) {
            console.error('Error deleting reply:', error);
            alert('Không thể xóa phản hồi. Vui lòng thử lại.');
        }
    };

    const user = useSelector((state) => state.user.information);

    const {
      firstName,
      lastName,
      bio,
      profilePicture,
      email,
    } = user;
  
    const defaultProfilePicture = user.genderId === 2 ? "./../../../../public/img/default/woman_default.png"
                                                      : "./../../../../public/img/default/man_default.png";
  
  


    useEffect(() => {
        const fetchProfilePicture = async (userId) => {
            try {
                const response = await axios.get(`http://localhost:5164/api/Post/UserId?userId=${userId}`);
                // Giả sử bạn muốn lấy hình ảnh đầu tiên trong mảng
                const profilePicture = response.data[0]; // Lấy hình ảnh đầu tiên
                setProfilePictures(prevState => ({
                    ...prevState,
                    [userId]: profilePicture // Lưu hình ảnh vào state
                }));
            } catch (error) {
                console.error(`Error fetching profile picture for user ${userId}:`, error);
            }
        };

        comments.forEach(comment => {
            if (comment.userId && !profilePictures[comment.userId]) {
                fetchProfilePicture(comment.userId);
            }
        });


    }, [comments]);

    useEffect(() => {
        
        console.log('Comments:', comments);

        setUserCommentID(comments.map(comment => comment.userId));  
    }, [comments]);

    //Hàm fetch số lượt like cho comment
    const fetchCommentLikeCount = async (commentId) => {
        try {
            const respone = await axios.get(`http://localhost:5164/api/Comment/likes?commentId=${commentId}`);
            return respone.data;
        }
        catch (error) {
            console.error('Error fetching comment like count:', error);
            return 0;
        }
    }

    // useEffect để fetch số lượt like khi comments thay đổi
    useEffect(() => {
        const fetchAllCommentLikeCounts = async () => {
            try {
                const likeCounts = {};
                
                // Lặp qua comment cha
                for (const comment of comments) {
                    const likeCount = await fetchCommentLikeCount(comment.commentId);
                    likeCounts[comment.commentId] = likeCount;

                    // Nếu có comment con, fetch like cho chúng
                    if (comment.inverseChildOfNavigation) {
                        for (const reply of comment.inverseChildOfNavigation) {
                            const replyLikeCount = await fetchCommentLikeCount(reply.commentId);
                            likeCounts[reply.commentId] = replyLikeCount;
                        }
                    }
                }

                setCommentLikeCounts(likeCounts);
            } catch (error) {
                console.error('Error fetching comment like counts:', error);
            }
        };

        if (comments.length > 0) {
            fetchAllCommentLikeCounts();
        }
    }, [comments]);


    const isCurrentUserComment = (comment) => {
        return currentUser && comment.user && currentUser === comment.userId;
    };

    const isCurrentUserReplyComment = (reply) => {
        return currentUser && reply.user && currentUser === reply.userId;
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
        try {
            console.log('editingComment', editingComment.content, " Và đây cx là postId", postId);
            const response = await axios.put(
                `http://localhost:5164/api/Comment?commentId=${editingComment.commentId}`, 
                { 
                    postId: postId, // Gửi postId
                    content: editingComment.content, // Gửi nội dung đã chỉnh sửa
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true 
                }
            );
    
            // Cập nhật comment trong danh sách
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
            setComments(prevComments => {
                // Lọc bỏ comment cha
                const filteredComments = prevComments.filter(comment => 
                    comment.commentId !== commentId
                );
    
                // Lọc bỏ comment con
                return filteredComments.map(comment => {
                    if (comment.inverseChildOfNavigation) {
                        return {
                            ...comment,
                            inverseChildOfNavigation: comment.inverseChildOfNavigation.filter(
                                reply => reply.commentId !== commentId
                            )
                        };
                    }
                    return comment;
                });
            });
    
            setCommentCount(prevCount => prevCount - 1);
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
    }, [postId  ]);


    useEffect(() => {
        const fetchUserLikeComments = async () => {
            try {
                // Lặp qua từng comment để kiểm tra
                const likeStatusPromises = comments.map(async (comment) => {
                    try {
                        const response = await axios.get(
                            `http://localhost:5164/api/Comment/userlikecomment?commentId=${comment.commentId}`,
                            { withCredentials: true }
                        );
                        
                        // Cập nhật trạng thái like cho từng comment
                        setCommentLikeStatus(prev => ({
                            ...prev,
                            [comment.commentId]: response.data
                        }));
    
                        // Kiểm tra cả reply
                        if (comment.inverseChildOfNavigation) {
                            comment.inverseChildOfNavigation.forEach(async (reply) => {
                                try {
                                    const replyResponse = await axios.get(
                                        `http://localhost:5164/api/Comment/userlikecomment?commentId=${reply.commentId}`,
                                        { withCredentials: true }
                                    );
                                    
                                    setCommentLikeStatus(prev => ({
                                        ...prev,
                                        [reply.commentId]: replyResponse.data
                                    }));
                                } catch (error) {
                                    console.error(`Error checking like status for reply ${reply.commentId}:`, error);
                                }
                            });
                        }
                    } catch (error) {
                        console.error(`Error checking like status for comment ${comment.commentId}:`, error);
                        
                        // Đảm bảo mặc định là false nếu không thể fetch
                        setCommentLikeStatus(prev => ({
                            ...prev,
                            [comment.commentId]: false
                        }));
                    }
                });
    
                // Đợi tất cả các promise hoàn thành
                await Promise.all(likeStatusPromises);
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
            const isCurrentlyLiked = commentLikeStatus[commentId] || false;
    
            if (!isCurrentlyLiked) {
                await axios.post(
                    `http://localhost:5164/api/Comment/react?commentId=${commentId}`, 
                    {}, 
                    { 
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true 
                    }
                );
    
                // Update state trực tiếp
                setCommentLikeStatus(prev => ({
                    ...prev,
                    [commentId]: true
                }));
    
                setCommentLikeCounts(prev => ({
                    ...prev,
                    [commentId]: (prev[commentId] || 0) + 1
                }));
            } else {
                await axios.post(
                    `http://localhost:5164/api/Comment/unlike?commentId=${commentId}`, 
                    {}, 
                    { 
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true 
                    }
                );
    
                // Update state trực tiếp
                setCommentLikeStatus(prev => ({
                    ...prev,
                    [commentId]: false
                }));
    
                setCommentLikeCounts(prev => ({
                    ...prev,
                    [commentId]: Math.max((prev[commentId] || 0) - 1, 0)
                }));
            }
        } catch (error) {
            console.error("Error liking/unliking comment:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };
    // Fetch comments khi component mount hoặc khi commentCount thay đổi
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`http://localhost:5164/api/Comment?postid=${postId}`);
                const commentsData = response.data;
                console.log('Fetched Comments:', commentsData);
    
                // Sắp xếp bình luận sao cho bình luận con nằm sau bình luận cha
                const sortedComments = commentsData.sort((a, b) => {
                    if (a.childOf === null && b.childOf !== null) {
                        return -1; // a là bình luận cha, b là bình luận con
                    }
                    if (a.childOf !== null && b.childOf === null) {
                        return 1; // a là bình luận con, b là bình luận cha
                    }
                    return 0; // Giữ nguyên thứ tự
                });
    
                setComments(sortedComments);
                const initialLikedComments = {};
                sortedComments.forEach(comment => {
                    initialLikedComments[comment.commentId] = comment.reactsComments.length; // Giả sử reactsComments chứa số lượt thích
                });
                setLikedComments(initialLikedComments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
    
        fetchComments();
    }, [postId, commentCount]);

    const formatTimeAgo = (date) => {
        const now = new Date();
        const commentDate = new Date(date);
        commentDate.setHours(commentDate.getHours()); 
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


    const handleReplyComment = async (commentId) => {
        if (!replyContent.trim()) return;
    
        try {
            const response = await axios.post(`http://localhost:5164/api/Comment/reply?commentId=${commentId}`, {
                content: replyContent,
                postId: postId
            }, {
                withCredentials: true
            });
    
            // Tăng commentCount để kích hoạt lại useEffect
            setCommentCount(prevCount => prevCount + 1);
    
            // Reset nội dung reply
            setReplyContent('');
            setActiveReplyCommentId(null);
        } catch (error) {
            console.error('Error replying to comment:', error);
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
                        src={urlProfile}
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
                                <span>{comments.length} bình luận</span>
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
                    {comments
                    .filter(comment => comment.childOf === null)
                    .map(comment => (
                        <div key={comment.commentId} className={styles.commentWrapper}>
                            <div key={comment.commentId} className={styles.comment}>
                                <div className={styles.commentProfilePic}>
                                <img
                                    src={profilePictures[comment.userId] 
                                        ? `http://localhost:5164/media/${profilePictures[comment.userId]}`
                                        : (comment.user?.genderId === 2 
                                            ? './../../../../public/img/default/woman_default.png' 
                                            : './../../../../public/img/default/man_default.png')} 
                                    alt="Avatar" 
                                />
                                </div>
                                <div className={styles.commentContentContainer}>
                                    <div className={styles.commentHeader}>
                                        {editingComment?.commentId === comment.commentId ? (
                                            <div className={styles.editCommentContainer}>
                                                <textarea 
                                                    type="text"
                                                    value={editingComment.content}
                                                    onChange={handleEditCommentChange}
                                                    className={styles.editCommentInput}
                                                    autoFocus
                                                    onFocus={(e) => {
                                                        const valueLength = e.target.value.length;
                                                        e.target.setSelectionRange(valueLength, valueLength); // Đặt con trỏ ở cuối nội dung
                                                    }}
                                                    onInput={(e) => {
                                                        e.target.style.height = "auto"; // Đặt chiều cao về tự động trước
                                                        e.target.style.height = `${e.target.scrollHeight}px`; // Cập nhật chiều cao theo nội dung
                                                    }}
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
                                    {/* {formatTimeAgo(comment.dateCreated)} */}
                                        <span>{formatTimeAgo(comment.dateCreated)}</span>
                                        <span className={`
                                            ${styles.likeComment} 
                                            ${commentLikeStatus[comment.commentId] ? styles.likeActive : ''}
                                            `} 
                                            onClick={() => handleLikeCommentClick(comment.commentId)}
                                        >
                                            Thích
                                        </span>
                                        <span>{(commentLikeCounts[comment.commentId] || 0).toLocaleString()}</span>
                                        <span 
                                            onClick={() => setActiveReplyCommentId(
                                                activeReplyCommentId === comment.commentId ? null : comment.commentId
                                            )}
                                        >
                                            Phản hồi
                                        </span>
                                    </div>
                                    {/* Thêm phần input phản hồi */}
                                    {activeReplyCommentId === comment.commentId && (
                                        <div className={styles.replySection}>
                                            <div className={styles.replyInput}>
                                                <textarea
                                                    type="text"
                                                    placeholder="Nhập phản hồi..."
                                                    value={replyContent}
                                                    onChange={(e) => setReplyContent(e.target.value)}
                                                    onKeyPress={(e) => {
                                                        if (e.key === 'Enter') {
                                                            handleReplyComment(comment.commentId);
                                                        }
                                                    }}
                                                    onInput={(e) => {
                                                        e.target.style.height = "auto"; // Đặt chiều cao về tự động trước
                                                        e.target.style.height = `${e.target.scrollHeight}px`; // Cập nhật chiều cao theo nội dung
                                                    }}
                                                />
                                                <button onClick={() => handleReplyComment(comment.commentId)}>
                                                    Gửi
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* Phần phản hồi */}
                            {comment.inverseChildOfNavigation && comment.inverseChildOfNavigation.length > 0 && (
    <div className={styles.replySection}>
        {comment.inverseChildOfNavigation.map((reply) => (
            <div key={reply.commentId} className={styles.replyComment}>
                <div className={styles.commentProfilePicReply}>
                    <img
                        src={profilePictures[reply.userId] 
                            ? `http://localhost:5164/media/${profilePictures[reply.userId]}`
                            : (reply.user?.genderId === 2 
                                ? './../../../../public/img/default/woman_default.png' 
                                : './../../../../public/img/default/man_default.png')} 
                        alt="Avatar" 
                    />
                </div>
                <div className={styles.commentContentContainer}>
                    <div className={styles.commentHeader}>
                        {editingReply === reply.commentId ? (
                            <div className={styles.editCommentContainer}>
                                <textarea 
                                    type="text"
                                    value={replyEditingContent}
                                    onChange={(e) => setReplyEditingContent(e.target.value)}
                                    className={styles.editCommentInput}
                                    autoFocus
                                    onInput={(e) => {
                                        e.target.style.height = "auto";
                                        e.target.style.height = `${e.target.scrollHeight}px`;
                                    }}
                                />
                                <div className={styles.editCommentActions}>
                                    <button 
                                        onClick={handleSaveEditReply}
                                        className={styles.saveButton}
                                    >
                                        Lưu
                                    </button>
                                    <button 
                                        onClick={() => setEditingReply(null)}
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
                                            {reply.user 
                                                ? `${reply.user.firstName} ${reply.user.lastName}` 
                                                : 'Ẩn danh'}
                                        </strong>
                                    </span>
                                    <br />
                                    <span>{reply.content}</span>
                                </div>
                                {isCurrentUserReplyComment(reply) && (
                                    <div className={styles.commentActions}>
                                        <IoIosMore 
                                            onClick={() => toggleCommentOptions(reply.commentId)} 
                                        />
                                        {activeCommentOptionsId === reply.commentId && (
                                            <div className={styles.actionDropdown}>
                                                <button onClick={() => handleStartEditReply(reply)}>
                                                    Chỉnh sửa
                                                </button>
                                                <button onClick={() => handleDeleteReply(reply.commentId)}>
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
                        <span>{formatTimeAgo(reply.dateCreated)}</span>
                        <span 
                            className={`
                                ${styles.likeComment} 
                                ${commentLikeStatus[reply.commentId] ? styles.likeActive : ''}
                            `} 
                            onClick={() => handleLikeCommentClick(reply.commentId)}
                        >
                            Thích
                        </span>
                        <span>
                            {(commentLikeCounts[reply.commentId] || 0).toLocaleString()}
                        </span>
                    </div>
                </div>
            </div>
        ))}
    </div>
)}
                        </div>
                    ))}
                </div>

                
                
                <div className={styles.commentInput}>
                    <div className={styles.commentProfilePic}>
                    <img 
                        src={ user.profilePicture.src || defaultProfilePicture} 
                        className={styles.avatar}
                        alt="Avatar"
                        />
                    </div>
                    <div className={styles.commentContentInput}>
                        <textarea 
                            type="text" 
                            placeholder="Hãy nhập bình luận"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            onInput={(e) => {
                                e.target.style.height = "auto"; // Đặt chiều cao về tự động trước
                                e.target.style.height = `${e.target.scrollHeight}px`; // Cập nhật chiều cao theo nội dung
                            }}
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