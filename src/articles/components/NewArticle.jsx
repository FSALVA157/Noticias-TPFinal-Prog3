import React, { useContext } from 'react'
import { AuthContext } from '../../context/user-context/AuthContext'
import '../../App.css'

export const NewArticle = () => {
  const {authState} =  useContext(AuthContext)
  

  console.log(authState)

  return (
    <>
      <h1>{authState.username}</h1>
    </>
  )
}
