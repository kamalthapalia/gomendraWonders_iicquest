import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useAuth } from "../Auth/AuthProvider.tsx";

const Signup = () => {
    const { signUp } = useAuth();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        fullName: "",
        gender: "male",
        age: "",
        type: "student"
    });

    const navigate = useNavigate();

    // Handle input change
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handle form submit
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await signUp(formData);
            navigate("/");
        } catch (error) {
            console.error('Error during sign up:', error);
        }
    };

    return (
        <div className={`h-[89vh] grid grid-cols-2`}>
            <div className={`relative`}>
                <div className={`h-full p-10 gap-10 flex flex-col absolute inset-0`}>
                    <div className={`w-32 h-56 relative top-96 bg-red-200 rounded-full`}></div>
                    <div className={`w-72 h-72 absolute top-[400px] right-52 border-4 border-blue-400 rounded-full`}></div>
                    <div className={`h-[200px] bg-yellow-400 w-[85%] relative left-28 bottom-64 rounded-full overflow-y-hidden`}>
                    </div>
                    <div className={`h-[32%] w-full relative left-`}></div>
                </div>
                <div className={`h-full p-10 gap-10 flex flex-col`}>
                    <div className={`h-[200px] w-[85%] relative left-32 rounded-full overflow-y-hidden`}>
                        <img className={`w-full h-full object-cover start`} src="https://images.pexels.com/photos/5846282/pexels-photo-5846282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                    </div>
                    <div className={`h-fit w-full relative`}>
                        <div className={`flex flex-col gap-2`}>
                            <p className={`text-3xl font-black`}>Signup and Get Started.</p>
                            <p className={`font-medium text-gray-700`}>Find affordable workers near you for a variety of tasks. Get the help you need quickly and efficiently.</p>
                        </div>
                    </div>
                    <div className={`h-[32%] bg-green-600 w-[55%] self-end relative left-12 rounded-full overflow-hidden`}>
                        <img className={`w-full h-full object-cover object-top`} src="https://www.scoutnetworkblog.com/wp-content/uploads/2018/11/Plumber-Sink-201709-003.jpg" alt="" />
                    </div>
                </div>
            </div>
            <div className={`flex flex-col justify-center items-center p-10`}>
                <form onSubmit={handleSubmit} className={`flex flex-col gap-4 w-full max-w-md`}>
                    <p className={`text-xl font-bold mb-6`}>Signup and Get Started.</p>
                    <div className={`flex flex-col`}>
                        <label className={`text-sm font-medium`}>Full Name:</label>
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            className={`border border-gray-300 p-2 rounded outline-none`}
                            required
                        />
                    </div>
                    <div className={`flex flex-col`}>
                        <label className={`text-sm font-medium`}>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`border border-gray-300 p-2 rounded outline-none`}
                            required
                        />
                    </div>
                    <div className={`flex flex-col`}>
                        <label className={`text-sm font-medium`}>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className={`border border-gray-300 p-2 rounded outline-none`}
                            required
                        />
                    </div>
                    <div className={`flex flex-col`}>
                        <label className={`text-sm font-medium`}>Gender:</label>
                        <select name="gender" value={formData.gender} defaultValue={formData.gender} onChange={handleChange} className={`border border-gray-300 p-2 rounded outline-none`} required>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className={`flex flex-col`}>
                        <label className={`text-sm font-medium`}>User Type:</label>
                        <select defaultValue={"student"} name="type" value={formData.type} onChange={handleChange} className={`border border-gray-300 p-2 rounded outline-none`} required>
                            <option value="student">Student</option>
                            <option value="professional">Professional</option>
                        </select>
                    </div>
                    <div className={`flex flex-col`}>
                        <label className={`text-sm font-medium`}>Age:</label>
                        <input
                            type="text"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            className={`border border-gray-300 p-2 rounded outline-none`}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className={`bg-blue-500 text-white font-semibold p-3 rounded hover:bg-blue-600 transition`}
                    >
                        Sign Up
                    </button>
                </form>
                <p className={`text-center mt-6`}>
                    Already a user? <Link to={"/login"} className={`text-blue-600`}>Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
