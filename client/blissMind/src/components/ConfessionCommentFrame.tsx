// components
import Comment from "./Comment";

// types + utils
import type{ NumOfReactionType } from "../definations/frontendTypes";
import { CommentType } from "../definations/backendTypes";

import { AiOutlineSend } from "react-icons/ai";
import { serverApi } from "../Auth/AuthProvider";
import { Dispatch, SetStateAction, useEffect, useState } from "react";


interface ConfessionProps {
    confessionId: string,
    setNumOfReaction: Dispatch<SetStateAction<NumOfReactionType>>
}

const ConfessionCommentFrame: React.FC<ConfessionProps> = ({ confessionId, setNumOfReaction }) => {
    const [comments, setComments] = useState<CommentType[]>([]);
    const [userComment, setUserComment] = useState('');
    
    useEffect(()=> {
        const fetchComments = async() => {
            try {
                const res = await serverApi.get(`/confess/comments/${confessionId}`)
                setComments(res.data.data);
                setNumOfReaction(prev=> ({...prev, comment: res.data.data.length}))
            } catch (error) {
                console.log(error)
            }
        };

        fetchComments();
    }, [])

    if (!confessionId) {
        return <div>Loading...</div>;
    }

    const handleCommentSend = async() => {
        if (userComment){
            try {
                // console.log(userComment)
                const res = await serverApi.post(`/confess/comment/${confessionId}`, {userComment});
                setNumOfReaction(prev=> ({...prev, comment: prev.comment+1}))
                setComments(prev=> [res.data.data, ...prev]);
                setUserComment('');
            } catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <div className={`mt-5`}>
            <p className={`font-semibold`}>Comments</p>
            <div className={`my-3 mb-5 cursor-pointer flex gap-2`}>
                <input value={userComment} onChange={(e)=> setUserComment(e.target.value)} className={`border border-blue-200 text-sm rounded flex-grow outline-none p-1.5`}
                    placeholder={`Enter the comment.`} type="text" />
                <div onClick={handleCommentSend} className={`flex items-center p-3 mx-1 bg-green-500 hover:bg-green-600 transition text-xl text-white rounded`}>
                    <AiOutlineSend />
                </div>
            </div>
            <div className={`h-[40vh] overflow-y-auto flex gap-5 flex-col`}>
                {comments && comments.map((comment, index) => (
                    <Comment comment={comment} key={index} />
                ))}
 
            </div>
        </div>
    );
};

export default ConfessionCommentFrame;
