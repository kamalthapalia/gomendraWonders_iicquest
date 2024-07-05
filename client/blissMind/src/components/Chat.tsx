import { useEffect, useState } from "react"

import { LuSend } from "react-icons/lu";
import  Message  from "./subComponents/Messages";
import { serverApi } from "../Auth/AuthProvider";

export interface MessageType {
    text: string,
    senderId: string,
    _id: string
}

// type responseType = {
//     message: string,
//     data: MessageType[]
// }

const Chat = () => {
    const [message, setMessage] = useState([] as MessageType[])
    const [input, setInput] = useState('');

    const defaultAiMessage = [
        "How to reduce my anxiety ? ",
        "How to meditate properly ?"
    ]

    const handleSubmitMsg = async() => {
        const data = await serverApi.post('/aichat', {prompt: message});
        console.log(data)
    }

    useEffect(() => {
        const fetchMessages = async()=> {
            setMessage([])
            // const res = await serverApi.get('/aichat');
            // console.log(res)
            // setMessage(res.data.data);
        }
        fetchMessages();
    }, [])

    return (

        // 4xl -> 896
        <div className={`${message.length ? " flex items-end" : "center-child"} w-full m-auto relative max-w-4xl p-4 py-24  `}>
            <div className="messages | w-full flex flex-col gap-1 items-center">
                {message.map(message => (
                    <Message message={message} key={message._id}/>
                    // <span key={message._id} className={` relative ${message.senderId == myself ? " self-end " : "self-start"}`}>
                    //     {/* <span className={` z-[-1] absolute -bottom-3 h-4 w-4 bg-black ${message.senderId == myself? "right-0": "left-0"}`}></span> */}
                    //     <p className={`${message.senderId == myself ? "bg-cyan-100" : " bg-cyan-50"}  p-1 px-2 z-10 rounded-lg`}> {message.text} </p>
                    // </span>
                ))
                }
                {!message.length && (
                    <div className="ai-req | flex flex-col items-center gap-y-16">
                        <div className="intro | center-child flex-col">
                            <h2 className="main-heading | font-semibold bg-gradient-to-r from-[#00A6E8] to-[#DB00FF] inline-block text-transparent bg-clip-text">Hello User</h2>
                            <h5 className="sub-heading | ">How can I help you today?</h5>
                        </div>

                        <div className="possible-question | center-child flex-wrap gap-4 text-white">
                            <div onClick={()=> setInput(defaultAiMessage[0])} className=" paragraph-text | sm:max-w-80 text-center bg-slate-500 p-4 rounded-md cursor-pointer leading-10">
                                <p> {defaultAiMessage[0]}</p>   
                            </div>
                            <div onClick={()=> setInput(defaultAiMessage[1])} className=" paragraph-text | sm:max-w-80 text-center bg-slate-500 p-4 rounded-md cursor-pointer leading-10">
                                <p>{defaultAiMessage[1]} </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>


            <div className="  absolute bottom-8 max-w-4xl w-full px-12">
                <input type="text" value={input} onChange={e => setInput(e.target.value)} placeholder="Message to Ai" className="w-full border-2 p-2 px-4 pr-12 rounded-3xl outline-none" />
                <div onClick={handleSubmitMsg} className=" w-[2rem] absolute top-[50%] translate-y-[-50%] right-14 cursor-pointer">
                    <LuSend className=" text-cyan-500 text-2xl" />
                </div>
            </div>
        </div>
    )
}

export default Chat;