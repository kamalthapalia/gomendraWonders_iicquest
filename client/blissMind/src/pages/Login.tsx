import {ChangeEvent, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

const Login = () => {
    const {login} = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    // Handle input change
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await login(formData.email, formData.password);
            navigate('/')
        }
        catch(err){
            console.log(err)
        }
    };

    return (
        <div>
            <div className={`h-[89vh]`}>
                <div className={`grid grid-cols-2 h-full`}>
                    <div className={`relative`}>
                        <div className={`h-full p-10 gap-10 flex flex-col absolute inset-0`}>
                            <div className={`w-32 h-56 relative top-96 bg-red-200 rounded-full`}></div>
                            <div className={`w-72 h-72 absolute top-[400px] right-52 border-4 border-blue-400 rounded-full`}></div>
                            <div className={`h-[200px] bg-yellow-400 w-[85%] relative left-28 bottom-64 rounded-full overflow-y-hidden`}></div>
                            <div className={`h-[32%] w-full relative left-`}></div>
                        </div>
                        <div className={`h-full p-10 gap-10 flex flex-col`}>
                            <div className={`h-[200px] w-[85%] relative left-32 rounded-full overflow-y-hidden`}>
                                <img
                                    className={`w-full h-full object-cover start`}
                                    src="https://images.pexels.com/photos/5846282/pexels-photo-5846282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt=""
                                />
                            </div>
                            <div className={`h-fit w-full relative`}>
                                <div className={`flex flex-col gap-2`}>
                                    <p className={`text-3xl font-black`}>Login and Get Started.</p>
                                    <p className={`font-medium text-gray-700`}>Find affordable workers near you for a variety of tasks. Get the help you need quickly and efficiently.</p>
                                </div>
                            </div>
                            <div className={`h-[32%] bg-green-600 w-[55%] self-end relative left-12 rounded-full overflow-hidden`}>
                                <img
                                    className={`w-full h-full object-cover object-top`}
                                    src="https://www.scoutnetworkblog.com/wp-content/uploads/2018/11/Plumber-Sink-201709-003.jpg"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                    <div className={`pt-24 justify-center px-28`}>
                        <p className={`font-semibold mb-10`}>Enter your details to login.</p>
                        <form onSubmit={handleSubmit} className={`flex flex-col gap-5 w-full`}>
                            <div className={`flex flex-col`}>
                                <label className={`block text-sm font-medium text-gray-700`}>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`border border-blue-400/50 p-2 text-sm rounded outline-none`}
                                    required
                                />
                            </div>
                            <div className={`flex flex-col`}>
                                <label className={`block text-sm font-medium text-gray-700`}>Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`border text-sm border-blue-400/50 p-2 rounded outline-none`}
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className={`bg-blue-500 text-white font-semibold p-2 rounded hover:bg-blue-600 transition`}
                            >
                                Login
                            </button>
                        </form>
                        <p className={`font-semibold text-sm mt-10 text-center`}>Not a user? <span className={`text-base text-blue-600 cursor-pointer`}><Link to={"/signup"}>Signup</Link></span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
