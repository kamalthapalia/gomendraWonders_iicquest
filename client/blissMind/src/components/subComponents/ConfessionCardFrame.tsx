import { AiOutlineComment, AiOutlineEdit, AiOutlineHeart } from "react-icons/ai";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// enum + utils + type
import { Reaction } from "../ConfessionCard";
import { timeParser } from "../../utils/timeParser";
import { ConfessionCardFrameProps } from "../../definations/frontendTypes";
import { serverApi, useAuth } from "../../Auth/AuthProvider";
import { useEffect } from "react";


const globalReactionCount = {
    like: 0,
    dislike: 0
}
let globalConfessionReaction = 0

const ConfessionCardFrame: React.FC<ConfessionCardFrameProps> = ({ confession, setNumOfReaction, numOfReaction, setOpenPost, reaction, setReaction, sideEffectOnUnmount }) => {
    const navigate = useNavigate();
    const { user } = useAuth();

    // client handler + helper
    const handleLike = () => {
        const addLike = (reaction != Reaction.LIKE);

        setNumOfReaction(prev => ({
            like: addLike ? prev.like + 1 : prev.like - 1,
            dislike: reaction == Reaction.DISLIKE ? prev.dislike - 1 : prev.dislike
        }));
        setReaction(addLike ? Reaction.LIKE : Reaction.NONE);
    }

    const handleDislike = () => {
        const addDislike = (reaction != Reaction.DISLIKE);

        setNumOfReaction(prev => ({
            like: reaction == Reaction.LIKE ? prev.like - 1 : prev.like,
            dislike: addDislike ? prev.dislike + 1 : prev.dislike - 1
        }));
        setReaction(addDislike ? Reaction.DISLIKE : Reaction.NONE);
    }

    const handleOpenPost = () => {
        setOpenPost(true)
        document.body.style.overflowY = "hidden";
    }

    const changesInReactionCount = (): boolean => {
        return confession.like.length != globalReactionCount.like || confession.dislike.length != globalReactionCount.dislike
    }

    // server handler
    const handleConfessionEdit = () => {
        navigate(`/confession/${confession._id}`);
        document.body.style.overflowY = "scroll";
    }

    useEffect(() => {
        return () => {
            if (sideEffectOnUnmount && changesInReactionCount()) {
                
                const postReaction = async() => {
                    const action = Reaction[globalConfessionReaction]; // dang, my 2 celled brain
                    try {
                        await serverApi.post(`/confess/${confession._id}/reaction`, { action })
                    } catch (error) {
                        console.log('Error on updating post')
                    }
                }

                postReaction();
            }
        }
    }, [])


    useEffect(() => {
        if (confession.like.includes(user.userId)) {
            setReaction(Reaction.LIKE)
        } else if (confession.dislike.includes(user.userId)) {
            setReaction(Reaction.DISLIKE)
        } else {
            setReaction(Reaction.NONE)
        }
    }, [])

    useEffect(() => {
        globalConfessionReaction = reaction
        globalReactionCount.like = numOfReaction.like
        globalReactionCount.dislike = numOfReaction.dislike
    }, [reaction])

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
