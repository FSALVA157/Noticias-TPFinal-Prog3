import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/user-context/AuthContext'
import { Login } from '../../auth/components/Login'
import { useLocation } from 'react-router-dom'

export const ProtectedRoutes = ({children}) => {
  const {authState} = useContext(AuthContext)
  const {logged} = authState
  const [isVisibleLogin, setisVisibleLogin] = useState(!logged);
  const location = useLocation();

  const toggleLogin = () => {
    setisVisibleLogin(!isVisibleLogin);
  };  

  // const handleOnClickLogin = () => {
  //   setisVisibleLogin(!logged)
  //   document.getElementById("modal").style.display = "block";
  // };

  useEffect(() => {
    if(!logged){
      setisVisibleLogin(true)
    }
    
  }, [location, logged])

  
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
