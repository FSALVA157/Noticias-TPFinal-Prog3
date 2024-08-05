import React, { useContext } from 'react'
import { AuthContext } from '../../context/user-context/AuthContext'

export const ProtectedRoutes = ({children}) => {
  const {authState} = useContext(AuthContext)
  const {logged} = authState
  
  return (
    <>
      {logged? children : <h1> Debes Logearte </h1>}
    </>
  )
}
