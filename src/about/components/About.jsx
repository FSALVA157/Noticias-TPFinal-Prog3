import React from 'react'
import  '../../index.css'

export const About = () => {
  return (
    <>

  <div className="columns is-desktop">
  <div className="column"> 
    <p>Acerca de Coffee Break News</p>
  <p> Coffee Break News es tu espacio de referencia para noticias, ideas e inspiración. 
  Perfecto para tus momentos de pausa, nuestro blog ofrece contenido variado que te 
  mantendrá informado y motivado. Desde las últimas tendencias hasta reflexiones inspiradoras, 
  te acompañamos en tu día a día con una lectura enriquecedora que puedes disfrutar
  junto a una buena taza de café. Únete a nuestra comunidad y descubre un mundo de 
  conocimiento e inspiración a tu alcance.</p>
    </div>
  <div className="column is-8" id="about-image">
  <img style={{width:'100%'}} src="https://cdn.pixabay.com/photo/2016/12/15/20/21/texture-1909992_1280.jpg" />
  </div>

</div>
    
    </>
  )
}
