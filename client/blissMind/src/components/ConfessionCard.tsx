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
        like: confession.like.length,
        dislike: confession.dislike.length
    })

    const confessionCardFrameProps = {
        confession,
        setNumOfReaction,
        numOfReaction,
        // openPost,
        setOpenPost,
        reaction,
        setReaction
    };

    return (
        <>
            <ConfessionCardFrame {...confessionCardFrameProps} sideEffectOnUnmount/>
            

            {openPost &&
                <div className={`z-50 py-20 fixed inset-0 w-full pb-8 overflow-y-scroll backdrop-blur h-full bg-gray-600/30`}>
                    <div className={`flex justify-end sticky top-0`}>
                        <div onClick={handleModalClose} className={`p-3 shadow cursor-pointer backdrop-blur m-3 rounded-full text-2xl bg-white`}>
                            <AiOutlineClose />
                        </div>
                    </div>

                    <div className={`h-[40vh] max-h-[60vh] max-w-[900px] p-5 rounded container mx-auto bg-gray-50`}>
                        <ConfessionCardFrame {...confessionCardFrameProps} sideEffectOnUnmount={false} />
                        <ConfessionCommentFrame confessionId={confession._id}/>
                    </div>
                </div>
            }
        </>
    );
};

export default ConfessionCard;
