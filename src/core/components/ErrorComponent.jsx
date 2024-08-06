import React from 'react'
import { NavLink } from 'react-router-dom'

const ErrorComponent = () => {
  return (
    
    <>

    <div className="box">
      <div className="field">
        <div className="" />
        <h1 className="">404</h1>
        <p className="">Oops, the page you are looking for could not be found.</p>
        <div className="mt-6">
          <NavLink
          to="/"
            className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            prefetch={false}
          >
            Go to Homepage
          </NavLink>
        </div>
      </div>
    </div>

    </>
  )
}

export default ErrorComponent
