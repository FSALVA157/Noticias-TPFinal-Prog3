import React from 'react'
import { NavLink } from 'react-router-dom'

const ErrorComponent = () => {
    return (
    <>
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

    </>
)
}

export default ErrorComponent
