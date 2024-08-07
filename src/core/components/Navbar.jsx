import React, { useContext, useState } from "react";
import { Login } from "../../auth/components/Login";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/user-context/AuthContext";
import logoSvg from "../../assets/logo.svg"

export const Navbar = () => {
  const [isVisibleLogin, setisVisibleLogin] = useState(false);
  const {authState, logout} = useContext(AuthContext)
  const{username} = authState;

  /**
   <div className="modal">
  <div className="modal-background"></div>
  <div className="modal-content">
    <Login />
  </div>
  <button className="modal-close is-large" aria-label="close"></button>
</div>
   * esta pensado para usar en boton login o cancel de login
   * @return {void} No return value.
   */
  const toggleLogin = () => {
    setisVisibleLogin(!isVisibleLogin);
  };

  const handleOnClickLogin = () => {
    toggleLogin();
    document.getElementById("modal").style.display = "block";
  };

  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <NavLink to="/" className="navbar-item" >
           <img src={logoSvg} alt="foto de logo" /> 
          </NavLink>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <NavLink to="/" className="navbar-item">
              Home
            </NavLink>

            <NavLink to="/about" className="navbar-item">
              About
            </NavLink>

            <NavLink to="/articles" className="navbar-item">
              Articles
            </NavLink>

            <NavLink to="/write" className="navbar-item">
              Write
            </NavLink>
          </div>
          

          <div className="navbar-end">
            
              {
                authState.logged && (
                  <div className="navbar-item">
                <span 
                style={{
                  fontWeight: 'bold'    
                }}
                className="tag is-link is-large">
                   <i className="fas fa-user" 
                   style={{marginRight:'10px'}}
                   aria-hidden="true"></i>
                  {username.split(' ')[0]}
                </span>
                <a className="button is-light" onClick={logout}>
                  <strong>Logout</strong>
                </a>
                </div>
                
                )
              }            
              {
                !authState.logged && (
                  <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <button className="button is-light" onClick={toggleLogin}>
                  Log in
                </button>
              </div>
            </div>      
                )}
            
            
          </div>
        </div>
      </nav>
      
      <Login
        isVisibleLogin={isVisibleLogin}
        setisVisibleLogin={setisVisibleLogin}
        toggleLogin={toggleLogin}
      />
      
      {/* <div className={`modal ${isVisibleLogin ? 'is-active' : ''}`}  >
  <div className="modal-background"></div>
  <div className="modal-content">
  </div>
  <button className="modal-close is-large" aria-label="close" onClick={toggleLogin}></button>
</div> */}
    </>
  );
};
