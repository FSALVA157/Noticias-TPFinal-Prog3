import React, { useContext } from 'react'
import { UserContext } from '../../context/user-context/UserContext'

export const NewArticle = () => {
  const {authState} =  useContext(UserContext)
  

  console.log(authState)

  return (
    <>
      <h1>{authState.username}</h1>
    </>
  )
}
