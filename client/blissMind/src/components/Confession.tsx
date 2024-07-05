// import { useState, useEffect } from "react";
import { AiOutlineComment, AiOutlineEdit, AiOutlineHeart, AiOutlineSend } from "react-icons/ai";
import { IoHeartDislikeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// components
import Comment from "./Comment";

// types + utils
import { ConfessionType } from "../definations/backendTypes";
// import { serverApi } from "../Auth/AuthProvider";


interface ConfessionProps {
    confessionId: string;
    confession: ConfessionType;
    numOfReaction: {
        like: number,
        dislike: number
    }
}

const Confession: React.FC<ConfessionProps> = ({ confessionId, confession, numOfReaction }) => {
    // const [confession, setConfession] = useState({} as ConfessionType);
    const navigate = useNavigate();
    console.log(confessionId)

    // useEffect(() => {
    //     const fetchConfession = async () => {
    //         try {
    //             const response = await serverApi.get<{ confess: ConfessionType }>(`/confess/${confessionId}`);
    //             setConfession(response.data.confess);
    //         } catch (error) {
    //             console.error('Failed to fetch confession:', error);
    //         }
    //     };

    //     fetchConfession();
    // }, [confessionId]);

    if (!confession) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`bg-gray-50 max-h-[60vh] max-w-[900px] p-5 rounded container mx-auto`}>
            <div className={`flex justify-between`}>
                <div className={`flex gap-3.5 items-center`}>
                    <img src="https://avatar.iran.liara.run/public" className={`w-14 h-14 bg-red-200 rounded-full`} alt="" />
                    <div className={`flex flex-col gap-0`}>
                        <p className={`font-semibold`}>{confession.fullName}</p>
                        <p className={`text-sm font-semibold text-gray-500`}>{new Date(confession.createdAt).toLocaleString()}</p>
                    </div>
                </div>
                <div onClick={() => {
                    navigate(`/edit/${confession._id}`)
                    document.body.style.overflowY = 'scroll'
                }}>
                    <AiOutlineEdit size={`1.7em`} className="cursor-pointer" />
                </div>
            </div>
            <div>
                <p className={`text-gray-700`}>{confession.description}</p>
                <div className={`flex mt-5 gap-3`}>
                    <div className={`flex items-center gap-2 hover:bg-emerald-100 p-2 rounded-full cursor-pointer`}>
                        <AiOutlineHeart className={`text-lg`} />
                        {/* <p className={`font-semibold text-sm`}>{confession.like} likes</p> */}
                        <p className={`font-semibold text-sm`}>{numOfReaction.like} likes</p>
                    </div>
                    <div className={`flex items-center gap-2 hover:bg-emerald-100 p-2 rounded-full cursor-pointer`}>
                        <IoHeartDislikeOutline className={`text-lg`} />
                        {/* <p className={`font-semibold text-sm`}>{confession.dislike} dislikes</p> */}
                        <p className={`font-semibold text-sm`}>{numOfReaction.dislike} dislikes</p>
                    </div>
                    <div className={`flex items-center gap-2 p-2`}>
                        <AiOutlineComment className={`text-lg`} />
                        <p className={`font-semibold text-sm`}>{confession.comments ? confession.comments.length : 0} comments</p>
                    </div>
                </div>

                <div className={`mt-5`}>
                    <p className={`font-semibold`}>Comments</p>
                    <div className={`my-3 mb-5 cursor-pointer flex gap-2`}>
                        <input className={`border border-blue-200 text-sm rounded flex-grow outline-none p-1.5`}
                               placeholder={`Enter the comment.`} type="text" />
                        <div className={`flex items-center p-3 mx-1 bg-green-500 hover:bg-green-600 transition text-xl text-white rounded`}>
                            <AiOutlineSend />
                        </div>
                    </div>
                    <div className={`h-[50vh] overflow-y-auto flex gap-5 flex-col`}>
                        {/* {confession.comments && confession.comments.map((comment, index) => (
                            <Comment comment={comment} key={index} />
                        ))} */}
                        {new Array(7).fill(2).map((comment, index) => (
                            <Comment comment={comment} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Confession;
