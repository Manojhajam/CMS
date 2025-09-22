import React, { useContext } from 'react'
import { AuthContext } from '../context/authContext'
import { Navigate, Outlet } from 'react-router'

const ProtectedRoutes = () => {
    const {user} = useContext(AuthContext)
  
    
          if(user){
              return <Outlet/>
    }
          else {
              return <Navigate to={"/login"} replace />
    }

  
}

export default ProtectedRoutes
