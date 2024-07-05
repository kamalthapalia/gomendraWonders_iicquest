// components
import Comment from "./Comment";

// types + utils
import { CommentType } from "../definations/backendTypes";
import { AiOutlineSend } from "react-icons/ai";
// import { serverApi } from "../Auth/AuthProvider";


interface ConfessionProps {
    confessionId: string,
    comments: CommentType[];
}

const ConfessionCommentFrame: React.FC<ConfessionProps> = ({ confessionId, comments }) => {
    if (!confessionId) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`mt-5`}>
            <p className={`font-semibold`}>Comments</p>
            <div className={`my-3 mb-5 cursor-pointer flex gap-2`}>
                <input className={`border border-blue-200 text-sm rounded flex-grow outline-none p-1.5`}
                    placeholder={`Enter the comment.`} type="text" />
                <div className={`flex items-center p-3 mx-1 bg-green-500 hover:bg-green-600 transition text-xl text-white rounded`}>
                    <AiOutlineSend />
                </div>
            </div>
            <div className={`h-[40vh] overflow-y-auto flex gap-5 flex-col`}>
                {comments && comments.map((comment, index) => (
                    <Comment comment={comment} key={index} />
                ))}
                {/* {new Array(7).fill(2).map((comment, index) => (
                    <Comment comment={comment} key={index} />
                ))} */}
            </div>
        </div>
    );
};

export default ConfessionCommentFrame;
