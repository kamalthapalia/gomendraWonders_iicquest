import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAuth } from '../../Auth/AuthProvider';
import { serverApi } from '../../Auth/AuthProvider';
import { ConfessionType } from "../../definations/backendTypes";

type Setter<T> = Dispatch<SetStateAction<T>>;

const CreateConfession = ({ setCreate, setConfessions }: { setCreate: Setter<boolean>, setConfessions: Setter<ConfessionType[]>  }) => {
    const { user } = useAuth();
    const [confession, setConfession] = useState('');
    const [isanonymous, setIsAnonymous] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (!user.userId) {
            console.error('User not authenticated');
            return;
        }

        try {
            if (confession) {
                const res = await serverApi.post('/confess', {
                    description: confession,
                    isanonymous,
                });
                const newConfession = res.data.data;
                setConfessions(prev => [newConfession, ...prev]);
                setCreate(false);
            }
        } catch (error) {
            console.error('Error posting confession', error);
        }
    };

    return (
        <>
            <div className="max-w-[900px] w-full m-auto flex flex-col gap-6 bg-gray-50 border border-blue-100 rounded p-3">
                <div className="flex justify-between">
                    <div className="flex gap-3.5 items-center">
                        <img src="https://avatar.iran.liara.run/public" className="w-14 h-14 bg-red-200 rounded-full" alt="" />
                        <div className="flex flex-col gap-0">
                            <p className="font-semibold">{user.fullName}</p>
                        </div>
                    </div>
                    <div className=" center-child | h-10 w-10 text-xl cursor-pointer rounded-full bg-gray-200" onClick={() => setCreate(false)}>
                        <AiOutlineClose />
                    </div>
                </div>
                <form onSubmit={handleSubmit} className="confession-box min-h-[400px] flex flex-col items-start gap-4">
                    <textarea
                        id="confession"
                        placeholder="Your confession here."
                        value={confession}
                        onChange={(e) => setConfession(e.target.value)}
                        maxLength={3000}
                        className="confession p-4 w-full flex-grow bg-white resize-none outline-green-100 rounded-md"
                    ></textarea>
                    <div className="confession-type flex items-center center-child gap-2">
                        <input
                            type="checkbox"
                            id="anonymous-post"
                            defaultChecked={false}
                            onClick={() => setIsAnonymous((prev) => !prev)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
                        />
                        <label htmlFor="anonymous-post" className="text-gray-700">
                            Anonymous Post
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-[200px] border-2 border-blue-600 ease-in-out duration-200 text-gray-700 hover:text-white font-semibold p-2 rounded hover:bg-blue-600 transition"
                    >
                        Post
                    </button>
                </form>
            </div>
        </>
    );
};

export default CreateConfession;
