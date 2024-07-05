import { AiOutlineClockCircle } from "react-icons/ai";
import { TfiWrite } from "react-icons/tfi";
import BlogCards from "./BlogCards";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { serverApi } from "../Auth/AuthProvider";

import { BlogType } from "../definations/backendTypes";
import { timeParser } from "../utils/timeParser";


const BlogPage = () => {
    const { id } = useParams<{ id: string }>();
    const [blog, setBlog] = useState({} as BlogType);

    useEffect(() => {
        const fetchSingleBlog = async () => {
            try {
                const response = await serverApi.get(`/blogs/${id}`);
                setBlog(response.data.data);
            } catch (error) {
                console.error('Error fetching the blog:', error);
            }
        };

        if (id) {
            fetchSingleBlog();
        }
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto my-10">

            <div className="flex flex-col gap-1.5 mt-4">
                <div className="flex gap-2 text-sm font-semibold text-gray-700">
                    <div className="flex gap-2 items-center">
                        <TfiWrite />
                    </div>
                    <div className="flex gap-2 items-center">
                        <AiOutlineClockCircle />
                        <p>{timeParser(blog.updatedAt)}</p>
                    </div>
                </div>
                <h1 className="font-bold text-lg mt-2">{blog.title}</h1>
                <p className="font-medium text-gray-700 mt-2">{blog.description}</p>
            </div>
            <div>
                <BlogCards />
            </div>
        </div>
    );
};

export default BlogPage;
