import React from 'react'

export default function ChatContainer() {
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
      <div className="bg-[#0f172a] flex text-white h-screen p-5">
          {/* Left Panel */}
          <div className="w-[40%] flex flex-col  justify-between rounded-2xl bg-blue-gray-500 p-8">
              {/* Header */}
              <div className="flex flex-col gap-3 mb-3">
                  <h1
                      className="text-3xl text-[#0f172a] font-bold cursor-pointer"
                      onClick={handleSidebarOpen}
                  >
                      <i className="ri-menu-line"></i> {location.state.project.name}
                  </h1>

                  {/* Messages */}
                  <div className="h-full w-full flex flex-col gap-2 py-5 overflow-y-auto">
                      {/* Left-aligned message */}
                      <div className="flex">
                          <div className="bg-[#0f172a] w-fit px-4 py-2 rounded-r-3xl rounded-b-3xl">
                              <p>wrsdv iug <br />ugtccgcgcgyc</p>
                          </div>
                      </div>
                      {/* Right-aligned message */}
                      <div className="flex justify-end">
                          <div className="bg-[#0f172a] w-fit px-4 py-2 rounded-l-3xl rounded-b-3xl">
                              <p>wrsdv iug <br />ugtccgcgcgyc</p>
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
  )
}
