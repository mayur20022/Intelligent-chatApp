import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import UserAddModal from '../component/UserAddModal';
import UserSidebar from '../component/UserSidebar';
import ChatBox from '../component/ChatBox';
import axios from '../config/axios';
import ViewUsersModal from '../component/ViewUsersModal';

export default function Project() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState([]);
  const [isViewUsersModalOpen, setIsViewUsersModalOpen] = useState(false);

  const [availableUsers, setavailableUsers] = useState([]);


  useEffect(() => {
    axios.get('/users/getall')
      .then(response => {
        setavailableUsers(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const addCollaborators = () => {
    axios.put('/projects/add-user', {
      projectId: projectId,
      userId: Array.from(selectedId),
    })
      .then(response => {
        console.log(response.data);
        // Handle success (e.g., close modal, show success message)
      })
      .catch(error => {
        console.error(error);
      });
  }



  const handleAddUser = (userId) => {
    setSelectedId(prevSelectedId => {
      const updatedSet = new Set(prevSelectedId);
      if (updatedSet.has(userId)) {
        updatedSet.delete(userId);
      } else {
        updatedSet.add(userId);
      }
      return Array.from(updatedSet);
    });
  };


  const projectId = location.state.project._id;



  if (!location.state || !location.state.project) {
    return (
      <div className="bg-[#0f172a] text-white flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">No Project Selected</h1>
      </div>
    );
  }

  return (
    <div className="relative bg-[#0f172a]">
      <div className="flex text-white h-screen p-5 overflow-hidden">
        <div className="w-[40%] flex flex-col justify-between rounded-2xl bg-blue-gray-500 p-8">
          <div className="flex flex-col gap-3 mb-3">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl text-[#0f172a] font-bold">
                <i className="ri-menu-line cursor-pointer" onClick={() => setIsSidebarOpen(true)}></i> {location.state.project.name}
              </h1>
              <div className="flex gap-4 text-[#0f172a] font-bold text-2xl justify-between items-center">
                <button onClick={() => setIsModalOpen(true)}>
                  <i className="ri-user-add-line"></i>
                </button>
                <small className="">
                  <p>
                    <button onClick={() => setIsViewUsersModalOpen(true)}>
                    {location.state.project.users.length}
                      <i className="ri-group-fill"></i>
                    </button>
                  </p>
                </small>
              </div>
            </div>
          </div>

          <ChatBox />
        </div>

        <div className="w-[60%] h-screen p-10"></div>
      </div>

      {/* Separated Components */}
      <UserAddModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        users={availableUsers.users}
        onAddUser={handleAddUser}
        addCollaborators={addCollaborators}
      />

      <UserSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        users={location.state.project.users}
      />

      <ViewUsersModal
        isOpen={isViewUsersModalOpen}
        onClose={() => setIsViewUsersModalOpen(false)}
        projectId={projectId}
      />
    </div>
  );
}
