import logo from '../assets/logo.jpg'
import {LuUser} from "react-icons/lu";
import {NavLink} from "react-router-dom";
import { useAuth } from '../Auth/AuthProvider';

const Navbar = () => {
    const {user} = useAuth();

    return (
        <div className={`flex sticky top-0 bg-white z-[999] justify-between py-3 border-b px-10 items-center`}>
            <div className={`flex items-center gap-8`}>
                <div className={`text-2xl font-semibold`}>
                    <img src={logo} className={`h-16 rounded-full`} alt=""/>
                </div>
                <div>
                    <ul className={`flex gap-5  font-semibold`}>
                        <NavLink to={'/'}>
                            <li className={`hover:text-green-600 cursor-pointer`}>Home</li>
                        </NavLink>
                        <NavLink to={'/mygoals'}>
                            <li className={`hover:text-green-600 cursor-pointer`}>Daily Goals</li>
                        </NavLink>
                        <NavLink to={'/chat'}>
                            <li className={`hover:text-green-600 cursor-pointer`}>Chat</li>
                        </NavLink>
                        <NavLink to={'/confessions'}>
                            <li className={`hover:text-green-600 cursor-pointer`}>Confessions</li>
                        </NavLink>
                        <NavLink to={'/blogs'}>
                            <li className={`hover:text-green-600 cursor-pointer`}>Articles</li>
                        </NavLink>
                    </ul>
                </div>
            </div>
            <NavLink to={`${ user.type == "student" ? "/profile/journal" : "/profile/blog" }`}>
                <div>
                    <LuUser className={`cursor-pointer`} size={`1.5em`}/>
                </div>
            </NavLink>
        </div>
    );
};

export default Navbar;