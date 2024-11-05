import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostCard from './../PostCard/PostCard.jsx';

export default function PostList() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://localhost:5164/api/Post');
                if (response.data && Array.isArray(response.data)) {
                    setPosts(response.data);
                } else if (response.data && typeof response.data === 'object') {
                    const parsedData = Object.values(response.data);
                    if (Array.isArray(parsedData)) {
                        setPosts(parsedData);
                    } else {
                        console.log('Dữ liệu trả về không phải là mảng');
                    }
                } else {
                    console.log('Dữ liệu trả về không phải là mảng');
                }
            } catch (e) {
                console.log('Error fetching posts:', e);
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
                        author={post.createdByUser ? post.createdByUser.name : 'Anonymous'}
                        time={new Date(post.dateCreated).toLocaleString()}
                        status={post.content || 'No content available'}
                        imageUrls={post.media && Array.isArray(post.media) ? post.media.map(m => m.url) : []}
                    />
                ))
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
}