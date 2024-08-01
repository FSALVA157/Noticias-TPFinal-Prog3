import React, { useContext } from 'react'
import { UserContext } from '../../context/user-context/UserContext'

const Home = () => {
  const{user, setUser} =  useContext(UserContext);

  return (
    <>
      <h1 className="title">{user.email}</h1 >
      <h2 className="subtitle">{user.password}</h2>
    </>
    
  )
}

export default Home
