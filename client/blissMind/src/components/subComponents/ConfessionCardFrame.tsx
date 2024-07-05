import { AiOutlineComment, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// enum + utils + type
import { Reaction } from "../ConfessionCard";
import { timeParser } from "../../utils/timeParser";
import { ConfessionCardFrameProps } from "../../definations/frontendTypes";
import { useAuth } from "../../Auth/AuthProvider";

const ConfessionCardFrame: React.FC<ConfessionCardFrameProps> = ({ confession, setNumOfReaction, numOfReaction, setOpenPost, reaction, setReaction }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleLike = () => {
        setReaction(Reaction.LIKE)
        setNumOfReaction({
            like: confession.like + 1,
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
    const handleConfessionEdit = () => {
        navigate(`/confession/${confession._id}`);
        document.body.style.overflowY = "scroll";
    }

    return (
        <div className="relative bg-gray-50 border border-blue-100 rounded p-3 flex flex-col gap-2">
            <div className={`flex justify-between`}>
                <div className={`flex gap-3.5 items-center`}>
                    <img src="https://avatar.iran.liara.run/public" className={`w-14 h-14 bg-red-200 rounded-full`} alt="" />
                    <div className={`flex flex-col gap-0`}>
                        <p className={`font-semibold`}>{confession.fullName}</p>
                        <p className={`text-sm font-semibold text-gray-500`}>{timeParser(confession.updatedAt)}</p>
                    </div>
                </div>
                {user.userId == confession.userId && (
                    <div onClick={handleConfessionEdit} className=" ">
                        <AiOutlineEdit size={`1.7em`} className="cursor-pointer" />
                    </div>
                )
                }
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
    )
}

export default ConfessionCardFrame
