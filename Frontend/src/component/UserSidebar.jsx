import React from 'react';
import { Link } from 'react-router-dom';

export default function UserSidebar({ isOpen, onClose, users }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 p-6">
            <div
                className="absolute inset-0 bg-black bg-opacity-30"
                onClick={onClose}
            ></div>

            <div className="overflow-hidden p-2 max-h-[600px] max-w-[20%] bg-[#0f172a] rounded-3xl text-white shadow-lg transform transition-transform duration-300 ease-in-out">
                <div className="flex justify-between items-center p-4">
                    <h2 className="text-xl font-bold">
                        <small>{users.length} <i className="ri-group-fill"></i></small>
                    </h2>
                    <button onClick={onClose} className="text-white text-2xl">&times;</button>
                </div>

                <div className="chat max-h-[500px] overflow-y-auto">
                    {users.map((user, index) => (
                        <div key={index} className="flex h-fit items-center gap-4 p-4 mx-10">
                            <img
                                src={user.profilePicture || "https://via.placeholder.com/40"}
                                alt={user.name}
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <p className="text-lg font-semibold">{user.name}</p>
                                <Link to={`/user/${user.id}`} className="text-sm text-blue-400">View Profile</Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
