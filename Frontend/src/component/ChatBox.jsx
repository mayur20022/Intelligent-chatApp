import React, { useEffect, useState } from 'react';
import { initialiseSocket, resetSocket } from '../config/socket';
import { useLocation } from 'react-router-dom';
import User from '../../../Backend/models/userModel.js';


export default function ChatBox() {
    const location = useLocation();
    const projectId = location.state?.project._id;
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [user, setUser] = useState({});


    useEffect(() => {
       initialiseSocket(projectId);
        resetSocket('project-message', (data) => {
            console.log(data)
        })



        

        return () => {
           
        };
    }, [projectId]);

    const sendMessage = () => {

        resetSocket('project-message', {
            messages,
            sender: user._id
        });


        if (currentMessage.trim() === '') return;

        const newMsg = { id: Date.now(), sender: 'me', text: currentMessage };

        setMessages((prev) => [...prev, newMsg]);
        setCurrentMessage('');

    };
    return (
        <div className="flex flex-col justify-between h-full max-h-[670px] rounded-lg overflow-hidden">
            {/* Chat History */}
            <div className="chat flex flex-col gap-2 py-4 px-2 mb-2 rounded-lg overflow-hidden">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex ${msg.sender === 'me' ? 'justify-end' : ''}`}
                    >
                        <div
                            className={`bg-[#0f172a] w-fit px-4 py-2 ${msg.sender === 'me'
                                    ? 'rounded-l-3xl rounded-b-3xl'
                                    : 'rounded-r-3xl rounded-b-3xl'
                                }`}
                        >
                            <h6 className="text-sm text-gray-600 font-light -mb-1">{msg.sender}</h6>
                            <p>{msg.text}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Input */}
            <div className="bg-[#0f172a] w-full flex justify-between items-center px-4 py-3 rounded-full">
                <input
                    type="text"
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    className="bg-transparent text-lg w-full ml-3 outline-none placeholder:opacity-50 placeholder:text-gray-400"
                    placeholder="Enter your message"
                />
                <button onClick={sendMessage}>
                    <i className="ri-send-plane-2-line text-2xl rounded-full text-white "></i>
                </button>
            </div>
        </div>
    );
}
