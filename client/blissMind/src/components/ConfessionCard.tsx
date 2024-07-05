import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

// types
import { ConfessionType } from "../definations/backendTypes.ts";
import ConfessionCardFrame from "./subComponents/ConfessionCardFrame.tsx";
import ConfessionCommentFrame from "./ConfessionCommentFrame.tsx";

export enum Reaction { NONE, LIKE, DISLIKE }

const ConfessionCard = ({ confession }: { confession: ConfessionType }) => {
    const [openPost, setOpenPost] = useState(false);
    const [reaction, setReaction] = useState<Reaction>(Reaction.NONE);

    const handleModalClose = () => {
        setOpenPost(false);
        document.body.style.overflowY = 'auto';
    }

    const [numOfReaction, setNumOfReaction] = useState({
        like: confession.like,
        dislike: confession.dislike
    })

    const confessionCardFrameProps = {
        confession,
        setNumOfReaction,
        numOfReaction,
        setOpenPost,
        reaction,
        setReaction
    };

    return (
        <>
            <ConfessionCardFrame {...confessionCardFrameProps} />
            

            {openPost &&
                <div className={`py-20 fixed inset-0 w-full pb-8 overflow-y-scroll backdrop-blur h-full bg-gray-600/30`}>
                    <div className={`flex justify-end sticky top-0`}>
                        <div onClick={handleModalClose} className={`p-3 shadow cursor-pointer backdrop-blur m-3 rounded-full text-2xl bg-white`}>
                            <AiOutlineClose />
                        </div>
                    </div>

                    <div className={`h-[40vh] max-h-[60vh] max-w-[900px] p-5 rounded container mx-auto bg-gray-50`}>
                        <ConfessionCardFrame {...confessionCardFrameProps} />
                        <ConfessionCommentFrame confessionId={confession._id} comments={confession.comments} />
                    </div>
                </div>
            }
        </>
    );
};

export default ConfessionCard;
