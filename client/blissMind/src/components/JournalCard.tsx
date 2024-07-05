// import {AiOutlineEdit} from "react-icons/ai";
import { JournalType } from "../definations/backendTypes";
import { timeParser } from "../utils/timeParser";

const JournalCard = ({journal}: {journal: JournalType}) => {
    return (
        <div className={``}>
            <div className={`flex items-center gap-3`}>
                <p className={`font-medium`}>{timeParser(journal.updatedAt)}</p>
                {/* <button
                   className={`flex items-center gap-2 px-2 border-2 border-blue-500 hover:bg-blue-100 transition text-sm font-semibold text-gray-700 rounded-full`}>
                   <AiOutlineEdit/>Edit
                   Journal
                </button> */}
            </div>
            <p className={`font-medium cursor-pointer text-gray-800 line-clamp-3`}>{journal.description}</p>
        </div>
    );
};

export default JournalCard;