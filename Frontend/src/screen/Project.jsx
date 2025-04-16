import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Project() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarOpen = () => setIsSidebarOpen(true);
  const handleSidebarClose = () => setIsSidebarOpen(false);

  if (!location.state || !location.state.project) {
    return (
      <div className="bg-[#0f172a] text-white flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold">No Project Selected</h1>
      </div>
    );
  }

  return (
    <div className="relative bg-[#0f172a]">
      <div className=" flex text-white h-screen p-5 overflow-hidden">
        {/* Left Panel */}
        <div className="w-[40%] flex flex-col  justify-between rounded-2xl bg-blue-gray-500 p-8">
          {/* Header */}
          <div className="flex flex-col gap-3 mb-3">
            <h1
              className="text-3xl text-[#0f172a] font-bold "
            >
              <i className="ri-menu-line cursor-pointer" onClick={handleSidebarOpen}></i> {location.state.project.name}
            </h1>

            {/* Messages */}
            <div className="chat h-full max-h-[570px] rounded-lg  overflow-y-auto w-full flex flex-col gap-2 py-5 ">
              {/* Left-aligned message */}




              <div className="flex">
                <div className="bg-[#0f172a] w-fit px-4 py-2 rounded-r-3xl rounded-b-3xl">
                  <h6 className='text-sm text-gray-600 font-light -mb-1'>user</h6>
                  <p>wrsdv iug </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="bg-[#0f172a] w-fit max-w-2/4 px-4 py-2 rounded-l-3xl rounded-b-3xl">
                  <h6 className='text-sm text-gray-600 font-light -mb-1'>user</h6>

                  <p>wrsdv iug </p>
                </div>
              </div>

            </div>
          </div>

          {/* Input Box */}
          <div className="bg-[#0f172a] w-full flex justify-between items-center px-4 py-3 rounded-full">
            <input
              type="text"
              className="bg-transparent text-lg w-full ml-3 outline-none"
              placeholder="Enter your message"
            />
            <i class="ri-send-plane-2-line text-2xl rounded-full text-white "></i>
          </div>
        </div>

        {/* Right Panel */}
        <div className="w-[60%] h-screen p-10"></div>
      </div>

      {/* Sidebar with Slide Animation */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-30"
            onClick={handleSidebarClose}
          ></div>

          {/* Sliding Sidebar */}
          <div
            className={` overflow-hidden p-2 max-h-[600px] max-w-[20%]   bg-[#0f172a] rounded-3xl text-white shadow-lg transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? '-translate-x-0' : '-translate-x-full'
              }`}
          >
            
            <div className="flex justify-between items-center p-4 ">
              <h2 className="text-xl font-bold">Users</h2>
              <button onClick={handleSidebarClose} className="text-white text-2xl">
                &times;
              </button>
            </div>
            <div className="chat max-h-[500px]  ">

            {/* Profile Section */}
            <div className=" flex h-fit items-center gap-4 p-4 mx-10 ">
              <img
                src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" // Replace with actual profile image URL or base64
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold">John Doe</p> {/* Replace with dynamic username */}
                <Link to={'/user/:id'} className="text-sm text-blue-400">View Profile</Link>
              </div>
            </div>
            <div className=" flex h-fit items-center gap-4 p-4 mx-10 ">
              <img
                src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" // Replace with actual profile image URL or base64
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold">John Doe</p> {/* Replace with dynamic username */}
                <Link to={'/user/:id'} className="text-sm text-blue-400">View Profile</Link>
              </div>
            </div>
            <div className=" flex h-fit items-center gap-4 p-4 mx-10 ">
              <img
                src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" // Replace with actual profile image URL or base64
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold">John Doe</p> {/* Replace with dynamic username */}
                <Link to={'/user/:id'} className="text-sm text-blue-400">View Profile</Link>
              </div>
            </div>
            <div className=" flex h-fit items-center gap-4 p-4 mx-10 ">
              <img
                src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" // Replace with actual profile image URL or base64
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold">John Doe</p> {/* Replace with dynamic username */}
                <Link to={'/user/:id'} className="text-sm text-blue-400">View Profile</Link>
              </div>
            </div>
            <div className=" flex h-fit items-center gap-4 p-4 mx-10 ">
              <img
                src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" // Replace with actual profile image URL or base64
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold">John Doe</p> {/* Replace with dynamic username */}
                <Link to={'/user/:id'} className="text-sm text-blue-400">View Profile</Link>
              </div>
            </div>
            <div className=" flex h-fit items-center gap-4 p-4 mx-10 ">
              <img
                src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" // Replace with actual profile image URL or base64
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold">John Doe</p> {/* Replace with dynamic username */}
                <Link to={'/user/:id'} className="text-sm text-blue-400">View Profile</Link>
              </div>
            </div>
            <div className=" flex h-fit items-center gap-4 p-4 mx-10 ">
              <img
                src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" // Replace with actual profile image URL or base64
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold">John Doe</p> {/* Replace with dynamic username */}
                <Link to={'/user/:id'} className="text-sm text-blue-400">View Profile</Link>
              </div>
            </div>
            <div className=" flex h-fit items-center gap-4 p-4 mx-10 ">
              <img
                src="https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg" // Replace with actual profile image URL or base64
                alt="Profile"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold">John Doe</p> {/* Replace with dynamic username */}
                <Link to={'/user/:id'} className="text-sm text-blue-400">View Profile</Link>
              </div>
              </div>
            </div>

            {/* Sidebar Content */}

          </div>
        </div>
      )}

    </div>
  );
}
