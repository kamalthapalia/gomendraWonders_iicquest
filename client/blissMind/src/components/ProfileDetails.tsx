import { NavLink } from "react-router-dom";
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
                <div className={`flex gap-3 mt-8 font-medium `}>
                    {user.type == "student" ?
                        <NavLink to={`/profile/journal`}>
                            <p>My Journals</p>
                        </NavLink>
                        :
                        <NavLink to={`/profile/blog`}>
                            <p>My Blogs</p>
                        </NavLink>
                    }
                    <NavLink to={`/profile/confession`}>
                        <p>My Confession</p>
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default ProfileDetails;