import { useState } from "react";
// import { AiOutlineClose, AiOutlineComment, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { AiOutlineClose, AiOutlineComment, AiOutlineHeart } from "react-icons/ai";
import { IoHeartDislikeOutline } from "react-icons/io5";

import Confession from "./Confession.tsx";
// types
import { ConfessionType } from "../definations/backendTypes.ts";
import { timeParser } from "../utils/timeParser.ts";


enum Reaction {NONE, LIKE, DISLIKE}

const ConfessionCard = ({ confession }: { confession: ConfessionType }) => {
    const [openPost, setOpenPost] = useState(false);
    const [reaction, setReaction] = useState<Reaction>(Reaction.NONE);

    const [numOfReaction, setNumOfReaction] = useState({
        like: confession.like,
        dislike: confession.dislike
    })
    // const [editPost, setEditPost] = useState(false);

    const handleLike = () => {
        setReaction(Reaction.LIKE)
        setNumOfReaction({
            like: confession.like +1,
            dislike: confession.dislike
        })
    }
    const handleDislike = () => {
        setReaction(Reaction.DISLIKE)
        setNumOfReaction({
            like: confession.like,
            dislike: confession.dislike + 1
        });
    }


    const handleOpenPost = () => {
        setOpenPost(true)
        document.body.style.overflowY = "hidden";
    }

    return (
        <>
            <div className=" bg-gray-50 border border-blue-100 rounded p-3 flex flex-col gap-2">
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
                        <div onClick={handleLike} className={`flex items-center gap-2 hover:bg-rose-200 py-2 px-4 rounded-full cursor-pointer`}>
                            <AiOutlineHeart className={`text-lg ${reaction == Reaction.LIKE && "text-rose-500"}`} />
                            <p className={`font-semibold text-sm`}>{numOfReaction.like} likes</p>
                        </div>
                        <div onClick={handleDislike} className={`flex items-center gap-2 hover:bg-gray-200 py-2 px-4 rounded-full cursor-pointer`}>
                            <IoHeartDislikeOutline className={`text-lg ${reaction == Reaction.DISLIKE && "text-fuchsia-500"}`} />
                            <p className={`font-semibold text-sm`}>{numOfReaction.dislike} dislikes</p>
                        </div>
                        <div onClick={handleOpenPost} className={`flex items-center gap-2 hover:bg-emerald-100 py-2 px-4 rounded-full cursor-pointer`}>
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
                    {/* <Confession confessionId={confession._id} /> */}
                    <Confession  confession={confession} numOfReaction={numOfReaction} confessionId={confession._id} />
                </div>
            }
        </>
    );
};

export default ConfessionCard;
