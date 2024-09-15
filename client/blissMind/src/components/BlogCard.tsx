import React from 'react';
import {Link} from "react-router-dom";
import { BlogType } from '../definations/backendTypes';
import { timeParser } from '../utils/timeParser';

interface BlogCardProps {
    blog: BlogType;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    return (
        <Link to={`/blog/${blog._id}`}>
        <div className="cursor-pointer bg-gray-100 rounded p-3">
            {/*<img*/}
            {/*    className="h-[250px] w-full object-cover"*/}
            {/*    src="https://images.pexels.com/photos/1509607/pexels-photo-1509607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"*/}
            {/*    alt="Blog Image"*/}
            {/*/>*/}
            <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center text-sm mt-2 font-semibold text-gray-700">
                    {/* <p>1 min ago</p> */}
                    <p>{timeParser(blog.updatedAt)}</p>
                </div>
                <p className="font-bold text-lg">{blog.title}</p>
                <p className="text-sm font-medium text-gray-700 line-clamp-4 ">{blog.description}</p>
            </div>
        </div>
        </Link>
    );
};

export default BlogCard;
