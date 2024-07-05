
// const ConfessionCardFrame = () => {
//     return (
//         <div className=" bg-gray-50 border border-blue-100 rounded p-3 flex flex-col gap-2">
//             <div className={`flex justify-between`}>
//                 <div className={`flex gap-3.5 items-center`}>
//                     <img src="https://avatar.iran.liara.run/public" className={`w-14 h-14 bg-red-200 rounded-full`} alt="" />
//                     <div className={`flex flex-col gap-0`}>
//                         <p className={`font-semibold`}>{confession.fullName}</p>
//                         <p className={`text-sm font-semibold text-gray-500`}>{timeParser(confession.updatedAt)}</p>
//                     </div>
//                 </div>
//             </div>
//             <div>
//                 <p className={` text-gray-700 line-clamp-5 pt-3`}>{confession.description}</p>
//                 <div className={`flex mt-5 gap-3`}>
//                     <div onClick={handleLike} className={`flex items-center gap-2 hover:bg-rose-200 py-2 px-4 rounded-full cursor-pointer`}>
//                         <AiOutlineHeart className={`text-lg ${reaction == Reaction.LIKE && "text-rose-500"}`} />
//                         <p className={`font-semibold text-sm`}>{numOfReaction.like} likes</p>
//                     </div>
//                     <div onClick={handleDislike} className={`flex items-center gap-2 hover:bg-gray-200 py-2 px-4 rounded-full cursor-pointer`}>
//                         <IoHeartDislikeOutline className={`text-lg ${reaction == Reaction.DISLIKE && "text-fuchsia-500"}`} />
//                         <p className={`font-semibold text-sm`}>{numOfReaction.dislike} dislikes</p>
//                     </div>
//                     <div onClick={handleOpenPost} className={`flex items-center gap-2 hover:bg-emerald-100 py-2 px-4 rounded-full cursor-pointer`}>
//                         <AiOutlineComment className={`text-lg`} />
//                         <p className={`font-semibold text-sm`}>{confession.comments.length || 0} comments</p>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default ConfessionCardFrame
