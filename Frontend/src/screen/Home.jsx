import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../config/axios'


export default function Home() {

  const [text, setText] = React.useState([])
  const [projectName, setrPojectName] = React.useState([])

  useEffect(() =>{
        const fetchUser = async () => {
          try {
            const response = await axios.get('/projects/getall')
            setrPojectName(response.data)
            
          } catch (error) {
            console.error('Error fetching user:', error)
          }
        }
        fetchUser()
  }, []
  )

  const navigate = useNavigate()

  const login = localStorage.getItem('token')
  const hendle = (e) => {
    e.preventDefault()
    axios.post('/projects/create', {
      name: text,
    })
      .then((res) => {
        document.getElementById('modal').classList.add('hidden')
        setText('')
      })
  }
  return (
    <div className='bg-[#0f172a] '>
      {login ? (
        <main className='max-w-[1200px] mx-auto flex flex-col  p-10 min-h-screen relative overflow-hidden'>

          <div>
            <button
              className="bg-white text-[#0f172a] font-extrabold flex justify-center items-center gap-2 px-2 py-1 rounded-md"
              onClick={() => document.getElementById('modal').classList.remove('hidden')}
            >Create New Project
              <i className="ri-links-line text-[#0f172a] font-bold text-2xl" ></i>
            </button>

            <div
              id="modal"
              className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-xl font-bold mb-4">Create Project</h2>
                <form onSubmit={hendle}>
                  <div className="mb-4">
                    <label
                      htmlFor="projectName"
                      className="block text-gray-700 font-medium mb-2"
                    >
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={text}
                      id="projectName"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter project name"
                    />
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-2"
                      onClick={() => document.getElementById('modal').classList.add('hidden')}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-10">
            <h2 className="text-2xl font-bold text-white mb-4">Your Projects</h2>
            <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {projectName.map((project) => (
                  <div key={project._id} className="bg-white p-4 rounded-lg shadow-md hover:scale-105 hover:bg-blue-gray-100  transition-transform duration-200"
                  onClick={() => navigate(`/project`, {
                    state: { project } 
                  })}>
                  <div className="flex flex-row items-center justify-between  mb-2">
                    <h3 className="text-2xl font-bold">{project.name}</h3>
                    <p className='text-sm font-bold text-blue-600/80'><i className="ri-group-3-fill text-base"></i> {project.users.length}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      ) : (
        <div className='flex flex-col items-center justify-center min-h-screen bg-[#0f172a] relative overflow-hidden'>
          <h1 className='text-4xl font-bold text-white'>Please Login or Register</h1><br />
          <button className='text-xl font-bold  underline text-light-blue-200'>
            <Link to={'/login'}>Login</Link>
          </button>
        </div>
      )
      }
    </div >
  )
}
