import '../../index.css'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/user-context/AuthContext'

const Home = () => {
  return (
    <>
    <div className= "home-background">
      <div className="home-content">
        <div className='text-home is-size-1'>
          <p> Bienvenidos a Coffee Break News </p>
    <img src="https://img1.wallspic.com/crops/1/3/6/8/28631/28631-morado-textura-bombilla_de_luz_incandescente-la_luz_electrica-luminaria-1920x1080.jpg" alt="imagen de fondo"/>
    </div>
    </div>
    </div>
    </>
  )
}

export default Home
