import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './../PostCard/PostCard.jsx';

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5164/api/Post');
                console.log("DDaay là json postlist" , response.data);
                if (response.data && Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    setPosts([]);  // Nếu dữ liệu không phải là mảng, đảm bảo setPosts là mảng rỗng
                }
            } catch (e) {
                setError('Lỗi tải bài viết: ' + e.message);
                setPosts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <p>Đang tải bài viết...</p>;  // Hiển thị thông báo khi đang tải
    }

    if (error) {
        return <p>{error}</p>;  // Hiển thị thông báo lỗi nếu có
    }

    return (
        <div>
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard
                        key={post.postId}
                        author={post.createdByUser  ? `${post.createdByUser .firstName} ${post.createdByUser .lastName}` : 'Ẩn danh'}  // Lấy tên tác giả từ createdByUser  
                        time={new Date(post.dateCreated).toLocaleString()}
                        status={post.content || ''}
                        imageUrls={post.postMedia && Array.isArray(post.postMedia) 
                            ? post.postMedia.map(m => `http://localhost:5164/${m.media.src.split('\\').slice(-2).join('/')}`) // Đảm bảo đường dẫn hợp lệ
                            : []}
                            avatar={post.createdByUser?.profilePicture || (post.createdByUser?.genderId === 2 ? './../../../../public/img/default/woman_default.png' : './../../../../public/img/default/man_default.png')}
                        postId={post.postId}
                        userId={post.createdByUser.userId}
                    />
                ))
            ) : (
                <p>Không có bài viết.</p>  // Thông báo khi không có bài viết
            )}
        </div>
    );
}