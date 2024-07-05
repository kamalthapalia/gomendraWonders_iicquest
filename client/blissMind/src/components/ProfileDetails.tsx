import { NavLink } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import LogoutModal from "./subComponents/LogoutModal";




const ProfileDetails = () => {
    const { user } = useAuth();
    const [logout, setLogout] = useState(false);

    return (
        <div className={`relative flex items-center gap-8`}>

            {logout && <LogoutModal setLogout={setLogout} />}

            <div className="flex flex-col gap-y-4 items-center">
                <img className={`w-40 h-40 rounded-full`} src="https://avatar.iran.liara.run/public" alt="" />
                <button onClick={() => setLogout(true)} className=" text-white bg-rose-500 px-6 py-1 rounded-[0.25rem]">Logout</button>
            </div>
            <div>
                <p className={`font-bold text-lg`}>{user.fullName}</p>
                <p className={`text-gray-600`}>{user.email}</p>
                <p className={`px-3 uppercase mt-1.5 font-semibold text-xs p-0.5 rounded-full bg-green-200 w-fit`}>{user?.type}</p>
                {user?.type == "student" && <div className={`flex gap-3 mt-8 font-medium `}>
                    <NavLink to={``}>
                        <p className={`/profile`}>My
                            Journals</p>
                    </NavLink>
                </div>}
                {user?.type == "professional" && <div className={`flex gap-3 mt-8 font-medium `}>
                    <NavLink to={`/blog/create`}>
                        <button
                            className={`flex items-center gap-2 px-2 py-2 border-2 border-blue-500 hover:bg-blue-100 transition text-sm font-semibold text-gray-700 rounded-full`}>
                            <AiOutlinePlus />Create Blog
                        </button>
                    </NavLink>
                </div>}
            </div>
        </div>
    );
};

export default ProfileDetails;