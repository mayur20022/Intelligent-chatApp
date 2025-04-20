import React, { useEffect } from "react";
import axios from "../config/axios";setUsersList



const ViewUsersModal = ({ isOpen, onClose, projectId }) => {
    if (!isOpen) return null;
    const [usersList, setUsersList] = React.useState([]);
    useEffect(() => {
        axios.get(`/projects/get-project/${projectId}`)
            .then(response => {
                // console.log(response.data.users);
                setUsersList(response.data.users);
                // Handle the response data as needed
            })
            .catch(error => {
                console.error("Error fetching project data:", error);
            })
    }, []);
    

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg w-96 p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">View Users</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                        ✕
                    </button>
                </div>
                <div className="overflow-y-auto max-h-64">
                    {usersList && usersList.length > 0 ? (
                        <ul className="space-y-2">
                            {usersList.map((user, index) => (
                                <li
                                    key={index}
                                    className="p-2 border rounded-md hover:bg-gray-100"
                                >
                                    {user.email}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No users found.</p>
                    )}
                </div>
                <div className="mt-4">
                    <button
                        onClick={onClose}
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewUsersModal;