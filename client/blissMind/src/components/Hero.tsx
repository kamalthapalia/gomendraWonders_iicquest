import { Link } from "react-router-dom";

const Hero = () => {
    return (
        <div>
            <div className={`grid md:grid-cols-2 my-14 h-[80vh] bg-gradient-to-b rounded-lg from-white to-cyan-100`}>


                <div className={`flex flex-col justify-center px-20`}>
                    <div className={`flex flex-col gap-10`}>
                        <p className={`text-3xl font-black`}>Welcome to BlissMind – Embrace Calm, Empower
                            Yourself</p>
                        <p className={`font-medium text-gray-700`}>Explore a world of peace with BlissMind, crafted
                            for students in Nepal. Engage with our AI chat, follow simple meditation guidelines, and
                            share anonymously in a community that cares. Begin your journey to a stress-free student
                            life now!</p>
                    </div>
                    <Link to={"/mygoals"}
                        className={` w-fit bg-emerald-600 hover:bg-emerald-500 transition px-8 py-2 text-white font-medium mt-10 rounded`}>
                        Set Goals and start Feeling Better
                    </Link>
                </div>


                <div className={`relative`}>
                    <div className={`h-full absolute w-full inset-0 flex p-5 gap-6`}>
                        <div
                            className={`w-[30%] border-2 border-blue-400 h-[50%] relative top-[4%] left-8 rounded-full`}></div>
                        <div
                            className={`w-[20%] bg-emerald-400/20 h-[20%] self-end relative right-24 rounded-full`}></div>
                        <div className={`w-[30%] bg-pink-400 h-[30%] relative top-[10%] rounded-full`}></div>
                    </div>
                    <div className={`h-full flex p-5 gap-10`}>
                        <div className={`w-[32%] bg-red-800 h-[50%] relative overflow-hidden top-[10%] rounded-full`}>
                            <img className={`w-full h-full object-cover`}
                                 src="https://images.pexels.com/photos/9509586/pexels-photo-9509586.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                 alt=""/>
                        </div>
                        <div className={`w-[32%] bg-red-800 h-[90%] overflow-hidden relative self-center rounded-full`}>
                            <img className={`w-full h-full object-cover`}
                                 src="https://images.pexels.com/photos/10643520/pexels-photo-10643520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                 alt=""/>
                        </div>
                        <div className={`w-[32%] bg-red-800 h-[60%] relative overflow-hidden top-[30%] rounded-full`}>
                            <img className={`w-full h-full object-cover`}
                                 src="https://scontent.fktm10-1.fna.fbcdn.net/v/t39.30808-6/448164707_913371360833660_7331884977589964612_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeF11HPB-LRlBKrOGjdT0hf5Ywj7nAR6mRRjCPucBHqZFOCnNubqtUhtY3LZd_CFqJAYha6LWhNoHGy7dC5wB-5Y&_nc_ohc=eeapNOgKgdAQ7kNvgEeJ3eZ&_nc_ht=scontent.fktm10-1.fna&oh=00_AYDDXNIi51v9YwzpoGhZ-R81NiYLRABuHhQWkgfW5HSA6g&oe=666F3327"
                                 alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;