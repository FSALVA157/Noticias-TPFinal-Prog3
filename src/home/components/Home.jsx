import '../../index.css'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/user-context/AuthContext'

const Home = () => {
  return (
    <>
    <div className= "home-background">
      <div className="home-content">
        <div className='text-home is-size-1 has-text-primary-bold'>
          <p> Bienvenidos a Coffee Break News </p>
    <img src="https://img3.wallspic.com/previews/1/4/1/0/30141/30141-world-fractal_art-brain-art-creative_arts-x750.jpg" style={{borderRadius:'5%'}}/>
    </div>
    </div>
    </div>
    </>
  )
}

export default Home
