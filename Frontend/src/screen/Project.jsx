import React from 'react'
import { useLocation } from 'react-router-dom';

export default function Project() {
    const location = useLocation()
    
  return (
    <div>
          {location.state ? (
            <div className='bg-[#0f172a] text-white flex justify-center items-center h-screen'>
                <h1 className='text-3xl font-bold'>{location.state.project.name}</h1>
            </div>
          ) : (
            <div className='bg-[#0f172a] text-white flex justify-center items-center h-screen'>
                <h1 className='text-3xl font-bold'>No Project Selected</h1>
            </div>
          )}
    </div>
  )
}
