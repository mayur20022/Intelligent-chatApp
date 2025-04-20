import React, { useState } from 'react';

export default function UserAddModal({ isOpen, onClose, users, onAddUser, addCollaborators }) {
    // console.log(projectId);

    if (!isOpen) return null;

    // Toggle state per user
    const [toggledUsers, setToggledUsers] = useState({});

    const handleToggle = (userId) => {
        const isAdded = toggledUsers[userId];

        // Toggle the user
        setToggledUsers(prev => ({
            ...prev,
            [userId]: !isAdded
        }));

        // Notify parent
        onAddUser(userId, !isAdded); // you can change this logic as needed

        

       
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[#0f172a] rounded-lg p-6 w-[90%] max-w-md">
                <div className="flex justify-between items-center text-xl font-bold mb-4 text-white ">
                <h2 >Select User to Add/Remove</h2> 
                    <i onClick={onClose} class="ri-close-large-line cursor-pointer"></i>
                </div>
                <div className="chat flex flex-col gap-4 max-h-[450px] overflow-y-auto">
                    {users.map((user) => {
                        const isToggled = toggledUsers[user._id];
                        return (
                            <div
                                key={user._id}
                                className={`flex items-center justify-between p-2 border rounded-lg`}
                            >
                                <div className="flex items-center gap-3">
                                    <img
                                        src={user.profilePicture || "https://via.placeholder.com/40"}
                                        alt={user.email}
                                        className="w-10 h-10 rounded-full"
                                    />
                                    <p className="text-lg text-white">{user.email}</p>
                                </div>
                                <button
                                    className={`text-white px-4 py-1 rounded-lg ${isToggled ? 'bg-red-500' : 'bg-blue-500'}`}
                                    onClick={() => handleToggle(user._id)}
                                >
                                    {isToggled ? "Remove" : "Add"}
                                </button>
                            </div>
                        );
                    })}
                </div>
                <button
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg w-full"
                    onClick={() => {
                        addCollaborators();
                        onClose();
                    }}

                >
                    Add collaborator
                </button>
            </div>
        </div>
    );
}
