import { useState } from "react";
// import { AiOutlineClose, AiOutlineComment, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { AiOutlineClose, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { IoHeartDislikeOutline } from "react-icons/io5";

import Confession from "./Confession.tsx";
// types
import { ConfessionType } from "../definations/backendTypes.ts";
import { timeParser } from "../utils/timeParser.ts";

const ConfessionCard = ({ confession }: { confession: ConfessionType }) => {
    const [openPost, setOpenPost] = useState(false);
    // const [editPost, setEditPost] = useState(false);

    return (
        <>
            <div onClick={() => {
                document.body.style.overflowY = 'hidden';
            }} className=" bg-gray-50 border border-blue-100 cursor-pointer rounded p-3 flex flex-col gap-2">
                <div className={`flex justify-between`}>
                    <div className={`flex gap-3.5 items-center`}>
                        <img src="https://avatar.iran.liara.run/public" className={`w-14 h-14 bg-red-200 rounded-full`} alt="" />
                        <div className={`flex flex-col gap-0`}>
                            <p className={`font-semibold`}>{confession.fullName}</p>
                            <p className={`text-sm font-semibold text-gray-500`}>{timeParser(confession.updatedAt)}</p>
                        </div>
                    </div>
                </div>
                <div>
                    <p className={` text-gray-700 line-clamp-5 pt-3`}>{confession.description}</p>
                    <div className={`flex mt-5 gap-3`}>
                        <div className={`flex items-center gap-2`}>
                            <AiOutlineHeart className={`text-lg`} />
                            <p className={`font-semibold text-sm`}>{confession.like} likes</p>
                        </div>
                        <div className={`flex items-center gap-2 hover:bg-emerald-100 p-2 rounded-full cursor-pointer`}>
                            <IoHeartDislikeOutline className={`text-lg`} />
                            <p className={`font-semibold text-sm`}>{confession.dislike} dislikes</p>
                        </div>
                        <div onClick={()=> setOpenPost(true)} className={`flex items-center gap-2`}>
                            <AiOutlineComment className={`text-lg`} />
                            <p className={`font-semibold text-sm`}>{confession.comments.length || 0} comments</p>
                        </div>
                    </div>
                </div>
            </div>
            {openPost &&
                <div className={`py-20 fixed inset-0 w-full pb-8 overflow-y-scroll backdrop-blur h-full bg-gray-600/30`}>
                    <div className={`flex justify-end sticky top-0`}>
                        <div onClick={() => {
                            setOpenPost(false);
                            document.body.style.overflowY = 'auto';
                        }} className={`p-3 shadow cursor-pointer backdrop-blur m-3 rounded-full text-2xl bg-white`}>
                            <AiOutlineClose />
                        </div>
                    </div>
                    <Confession confessionId={confession._id} />
                </div>
            }
        </>
    );
};

export default ConfessionCard;
