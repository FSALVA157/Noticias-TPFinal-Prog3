import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/user-context/AuthContext'
import { Login } from '../../auth/components/Login'

export const ProtectedRoutes = ({children}) => {
  const {authState} = useContext(AuthContext)
  const {logged} = authState
  const [isVisibleLogin, setisVisibleLogin] = useState(!logged);

  const toggleLogin = () => {
    setisVisibleLogin(!isVisibleLogin);
  };  

  
  return (
    <>
      {logged? children : <h1> Debes Logearte </h1>}
       <Login
       isVisibleLogin={isVisibleLogin}
       setisVisibleLogin={setisVisibleLogin}
       toggleLogin={toggleLogin}
     />
    </>
  )
}
