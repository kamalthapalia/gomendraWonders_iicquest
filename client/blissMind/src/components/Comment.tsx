import { CommentType } from "../definations/backendTypes";
import { timeParser } from "../utils/timeParser";

const Comment = ({ comment }: { comment: CommentType }) => {
    return (
        <div className={`p-2 rounded bg-gray-100 shadow-sm shadow-gray-400/80 `}>
            <div className={`flex gap-3.5 items-center`}>
                <img src="https://avatar.iran.liara.run/public" className={`w-8 h-8 bg-red-200 rounded-full`} alt="" />
                <div className={`flex flex-col gap-0`}>
                    <p className={`font-semibold text-sm`}>{comment.username}</p>
                    <p className={`text-xs font-semibold text-gray-500`}>{`${timeParser(comment.updatedAt)}`}</p>
                </div>
            </div>
            <p className={`text-gray-600 text-sm font-medium mt-2 ms-10 me-2 px-2 py-1 bg-gray-200/60 rounded-sm`}>{comment.userComment}</p>
        </div>
    );
};

export default Comment;