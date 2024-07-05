import { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import CreateConfession from "./subComponents/CreateConfession";
import ConfessionCard from "./ConfessionCard";
import { serverApi } from "../Auth/AuthProvider";
import { ConfessionType } from "../definations/backendTypes";



const Confessions = () => {
    const [create, setCreate] = useState(false);
    const [confessions, setConfessions] = useState<ConfessionType[]>([]); // Initialize as an empty array with Confession type

    useEffect(() => {
        const fetchConfessions = async () => {
            try {
                const response = await serverApi.get<{ data: ConfessionType[] }>('/confess');
                console.log(response)
                if (Array.isArray(response.data.data)) {
                    setConfessions(response.data.data); // Ensure the response is an array
                } else {
                    console.error('Response data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch confessions:', error);
            }
        };
        fetchConfessions();
    }, [create]);

    return (
        <>
            {create && <CreateConfession setCreate={setCreate} />}
            <div className={`container mx-auto my-2 w-full max-w-[900px] text-justify flex flex-col gap-5`}>
                <div onClick={() => { setCreate(true) }} className={`flex gap-3 border bg-gray-100 border-blue-100 rounded p-2 items-center`}>
                    <img src="https://avatar.iran.liara.run/public" className={`w-14 h-14 bg-red-200 rounded-full`} alt="" />
                    <div className={`border-b w-full my-5 py-2 text-gray-500 flex items-center gap-2`}>
                        <AiOutlineEdit size={`1.3em`} />Share your thoughts.
                    </div>
                </div>
                {confessions.map(confession => (
                    <ConfessionCard key={confession._id} confession={confession} />
                ))}
            </div>
        </>
    );
};

export default Confessions;
