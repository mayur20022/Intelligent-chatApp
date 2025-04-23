import React, { useContext, useEffect, useState } from 'react';
import { getSocket, initialiseSocket, recivetSocket } from '../config/socket';
import { useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

export default function ChatBox() {
    const location = useLocation();
    const projectId = location.state?.project._id;
    const { user } = useContext(UserContext);

    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');

    useEffect(() => {
        initialiseSocket(projectId);
        recivetSocket('project-message', (data) => {
            setMessages(prev => [...prev, data]);
        });
    }, []);

    const sendMessage = () => {
        if (!inputMessage.trim()) return;

        const message = {
            text: inputMessage,
            sender: user._id,
        };

        getSocket("project-message", {
            ...message,
            sender: user.email
            
        });
        
        setMessages(prev => [...prev, message]); // optional: show instantly
        setInputMessage('');
    };

    

    return (
        <div className="flex flex-col justify-between h-full max-h-[670px] rounded-lg overflow-hidden">
            {/* Chat Messages */}
            <div className="chat flex flex-col gap-2 py-4 px-2 mb-2 rounded-lg overflow-y-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.sender === user._id ? 'justify-end' : ''}`}
                    >
                        <div
                            className={`bg-[#0f172a] w-fit px-4 py-2 ${msg.sender === user._id
                                    ? 'rounded-l-3xl rounded-b-3xl'
                                    : 'rounded-r-3xl rounded-b-3xl'
                                }`}
                        >
                            <h6 className="text-sm text-gray-600 font-light -mb-1">
                                {msg.sender == user._id ? 'You' : msg.sender}
                            </h6>
                            <p>{msg.text}</p>
          
                        </div>
                    </div>
                ))}
            </div>

            {/* Input Box */}
            <div className="bg-[#0f172a] w-full flex justify-between items-center px-4 py-3 rounded-full">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
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
