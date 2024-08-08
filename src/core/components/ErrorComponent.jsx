import React from 'react'
import { NavLink } from 'react-router-dom'
import logoTristeza from '../../assets/tristeza.webp'

const ErrorComponent = () => {
    return (
    <>
    <div className="columns">
        <div className="column is-half is-offset-one-quarter">
            <img src={logoTristeza} alt="foto error" />
        </div>
       
        <div className="column">
        <div className="box">
        <div className="field">
            <strong className="error" style ={{fontSize: '2rem'}}>404</strong>
        </div>
        <div className="field">
            <p className="">Oops, the page you are looking for could not be found.</p>
        </div>
        <div className="field">
            <NavLink
                to="/"
                className="button is-link is-medium"
                prefetch={false}
        >
            Go to Homepage
        </NavLink>
        </div>
    </div>
        </div>
    </div>
    

    </>
)
}

export default ErrorComponent
