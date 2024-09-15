import { useState, useEffect } from "react";
import { AiOutlineEdit } from "react-icons/ai";

// components
import CreateConfession from "./subComponents/CreateConfession";
import ConfessionCard from "./ConfessionCard";

// utils + types
import { useInView } from 'react-intersection-observer'
import { serverApi } from "../Auth/AuthProvider";
import { ConfessionType } from "../definations/backendTypes";

const Confessions = () => {
    const { ref, inView } = useInView();
    const [create, setCreate] = useState(false);
    const [cursor, setCursor] = useState<string|null>('')
    const [confessions, setConfessions] = useState<ConfessionType[]>([]);

    useEffect(() => {
        const fetchConfessions = async () => {
            if (cursor == null) return;

            try {
                const response = await serverApi.get<{ data: ConfessionType[], nextCursor: string | null }>(`/confess${cursor ? `?cursor=${cursor}` : ''}`);
                const { data, nextCursor } = response.data;

                if (Array.isArray(data)) {
                    setConfessions([...confessions, ...data]); // Ensure the response is an array
                    // cursor for next pagination
                    setCursor(nextCursor)
                } else {
                    console.error('Response data is not an array:', response.data);
                }
            } catch (error) {
                console.error('Failed to fetch confessions:', error);
            }
        };
        fetchConfessions();
    }, [inView]);


    return (
        <>
            {create && <CreateConfession setCreate={setCreate} setConfessions={setConfessions} />}
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

                {
                    cursor != null ?
                        <section className="flex justify-center items-center w-full">
                            <div ref={ref}>
                                <img
                                    src="/spinner.svg"
                                    alt="spinner"
                                    width={56}
                                    height={56}
                                    className="object-contain"
                                />
                            </div>
                        </section>
                        :
                        ''
                }
            </div>
        </>
    );
};

export default Confessions;
