import { AiOutlinePlus } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { serverApi } from "../../Auth/AuthProvider";
import { BlogType } from "../../definations/backendTypes";
import BlogCard from "../BlogCard";

const MyBlogs = () => {
    const [blogs, setBlogs] = useState<BlogType[]>([]);

    useEffect(() => {
        const fetchUserBlogs = async () => {
            try {
                const response = await serverApi.get("/blogs/user");
                setBlogs(response.data.data);
            } catch (error) {
                console.error("Error fetching Blogs:", error);
            }
        };

        fetchUserBlogs();
    }, []);

    return (
        <div className={`w-[900px] mx-auto`}>
            <div>
                <div className={`flex gap-3 items-center mb-5`}>
                    <p className={`font-semibold`}>Recent Blog</p>
                    <Link to={"/blog/create"}>
                        <button
                            className={`center-child | gap-2 px-4 py-2 border-2 border-blue-500 hover:bg-blue-100 transition text-sm font-semibold text-gray-700 rounded-full`} >
                            <AiOutlinePlus />
                            <p>New Blog</p>
                        </button>
                    </Link>
                </div>

                <div className={`flex flex-col gap-8 my-3`}>
                    {blogs.map((blog) => (
                        <>
                            <BlogCard key={blog._id} blog={blog} />
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyBlogs;
