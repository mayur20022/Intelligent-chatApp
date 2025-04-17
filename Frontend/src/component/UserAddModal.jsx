import React from 'react';

export default function UserAddModal({ isOpen, onClose, users, onAddUser }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="  bg-[#0f172a] rounded-lg p-6 w-[90%] max-w-md">
                <h2 className="text-xl font-bold mb-4 text-white">Select User to Add</h2>
                <div className="chat flex flex-col gap-4  max-h-[450px] ">
                    {users.map((user) => (
                        <div
                            key={user.id}
                            className="flex items-center justify-between p-2 border rounded-lg"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={user.profilePicture || "https://via.placeholder.com/40"}
                                    alt={user.name}
                                    className="w-10 h-10 rounded-full"
                                />
                                <p className="text-lg text-white">{user.name}</p>
                            </div>
                            <button
                                className="bg-blue-500 text-white px-4 py-1 rounded-lg"
                                onClick={() => onAddUser(user.id)}
                            >
                                Add
                            </button>
                        </div>
                    ))}
                </div>
                <button
                    className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg w-full"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
