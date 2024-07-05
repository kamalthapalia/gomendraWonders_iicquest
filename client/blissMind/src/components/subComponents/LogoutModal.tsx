import { Dispatch, SetStateAction } from "react"
import { useAuth } from "../../Auth/AuthProvider"
import { AiOutlineClose } from "react-icons/ai"
import { useNavigate } from "react-router-dom";

const LogoutModal = ({ setLogout }: { setLogout: Dispatch<SetStateAction<boolean>> }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async() => {
        try {
            await logout();
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="h-40 w-80 absolute left-1/2 bottom-0 transform -translate-x-1/2 flex justify-center bg-gray-200/90">
            <div className="center-child | flex-col gap-2">
                <div className="flex gap-3.5 items-center">
                    <img src="https://avatar.iran.liara.run/public" className="w-14 h-14 bg-red-200 rounded-full" alt="" />
                    <div className="flex flex-col gap-0">
                        <p className="font-semibold">{user.fullName}</p>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className=" font-semibold text-center">Are you Sure ?</p>
                    <div className=" flex justify-between gap-2 text-white">
                        <button className=" font-semibold bg-rose-400 px-6 py-0.5 rounded-[0.25rem]" onClick={handleLogout}>Yes</button>
                        <button className=" font-semibold bg-cyan-400 px-6 py-0.5 rounded-[0.25rem]" onClick={() => setLogout(false)}>No</button>
                    </div>
                </div>

            </div>

            <div className="center-child rotate-to-right | absolute h-10 w-10 -top-5 text-2xl bg-gray-200 text-rose-400 rounded-full cursor-pointer" onClick={() => setLogout(false)}>
                <AiOutlineClose />
            </div>
        </div>
    )
}

export default LogoutModal