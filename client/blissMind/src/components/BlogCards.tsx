import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogCard from './BlogCard';
import { BlogType } from '../definations/backendTypes';

const BlogCards: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:8080/blogs/');
                setBlogs(response.data.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <div className="container mx-auto">
            <p className="font-semibold my-10 text-lg">Blogs</p>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                {blogs.map((blog) => (
                    <BlogCard key={blog._id} blog={blog} />
                ))}
            </div>
        </div>
    );
};

export default BlogCards;
