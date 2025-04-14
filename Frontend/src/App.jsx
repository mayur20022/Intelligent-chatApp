import React from 'react'
import AppRoutes from './routes/Routes'
import { UserProvider } from './context/UserContext'

const App = () => {
  return (
    <div>
      <UserProvider>

      <AppRoutes />
      </UserProvider>
      
    </div>
  )
}

export default App
