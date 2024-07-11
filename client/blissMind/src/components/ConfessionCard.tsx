import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

// types
import { ConfessionType } from "../definations/backendTypes.ts";
import ConfessionCardFrame from "./subComponents/ConfessionCardFrame.tsx";
import ConfessionCommentFrame from "./ConfessionCommentFrame.tsx";
import { serverApi, useAuth } from "../Auth/AuthProvider.tsx";
import { ConfessionCardFrameProps, Reaction, reactionRefType } from "../definations/frontendTypes.ts";

const ConfessionCard = ({ confession }: { confession: ConfessionType }) => {
    const { user } = useAuth();

    const [openPost, setOpenPost] = useState(false);
    const [reaction, setReaction] = useState<Reaction>(Reaction.NONE);

    const reactionRef = useRef<reactionRefType>({
        defaultLike: 0,
        defaultDislike: 0,
        userReaction: 0,
        numOfReaction: {
            like: 0,
            dislike: 0
        }
    });

    const [numOfReaction, setNumOfReaction] = useState({
        like: 0,
        dislike: 0,
        comment: confession.comments.length
    })
    

    const handleModalClose = () => {
        setOpenPost(false);
        document.body.style.overflowY = 'auto';
    }

    const confessionCardFrameProps: Omit<ConfessionCardFrameProps, "sideEffectOnUnmount"> = {
        confession,
        setNumOfReaction,
        numOfReaction,
        setOpenPost,
        reaction,
        reactionRef,
        setReaction
    };

    useEffect(() => {
        const fetchReaction = async () => {
            try {
                const res = await serverApi.get(`/confess/reactions/${confession.reactionId}`);

                const likeArr = res.data.data.like;
                const dislikeArr = res.data.data.dislike;
                const likeCount = likeArr.length;
                const dislikeCount = dislikeArr.length;

                reactionRef.current = {
                    defaultLike: likeCount,
                    defaultDislike: dislikeCount,
                    numOfReaction: {
                        like: likeCount,
                        dislike: dislikeCount
                    },
                    userReaction: 0
                }

                setNumOfReaction(prev => ({
                    like: likeCount,
                    dislike: dislikeCount,
                    comment: prev.comment
                }))

                if (likeArr.includes(user.userId)) {
                    setReaction(Reaction.LIKE)
                } else if (dislikeArr.includes(user.userId)) {
                    setReaction(Reaction.DISLIKE)
                } else {
                    setReaction(Reaction.NONE)
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchReaction();
    }, [])
    

    return (
        <div>
            <ConfessionCardFrame {...confessionCardFrameProps} sideEffectOnUnmount />

            {openPost &&
                <div className={`z-50 py-20 fixed inset-0 w-full pb-8 overflow-y-scroll backdrop-blur h-full bg-gray-600/30`}>
                    <div className={`flex justify-end sticky top-0`}>
                        <div onClick={handleModalClose} className={`p-3 shadow cursor-pointer backdrop-blur m-3 rounded-full text-2xl bg-white`}>
                            <AiOutlineClose />
                        </div>
                    </div>

                    <div className={`h-[40vh] max-h-[60vh] max-w-[900px] p-5 rounded container mx-auto bg-gray-50`}>
                        <ConfessionCardFrame {...confessionCardFrameProps} sideEffectOnUnmount={false} />
                        <ConfessionCommentFrame confessionId={confession._id} setNumOfReaction={setNumOfReaction} />
                    </div>
                </div>
            }
        </div>
    );
};

export default ConfessionCard;