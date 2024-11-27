import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './../PostCard/PostCard.jsx';

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);  // Thêm trạng thái loading để hiển thị khi đang tải dữ liệu
    const [error, setError] = useState(null);  // Thêm trạng thái lỗi

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5164/api/Post');
                console.log(response.data);
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


    return (
        <div>
            {Array.isArray(posts) && posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard
                        key={post.postId}
                        author={post.createdByUser ? post.createdByUser.name : 'Ẩn danh'}  // Lấy tên tác giả từ createdByUser
                        time={new Date(post.dateCreated).toLocaleString()}
                        status={post.content || 'Không có nội dung'}
                        imageUrls={post.postMedia && Array.isArray(post.postMedia) 
                            ? post.postMedia.map(m => `http://localhost:5164/${m.media.src.split('\\').slice(-2).join('/')}`) // Đảm bảo đường dẫn hợp lệ
                            : []}
                    />
                ))
            ) : (
                <p>Không có bài viết.</p>  // Thông báo khi không có bài viết
            )}
        </div>
    );
}
