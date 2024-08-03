import React from "react";
import ReactDOM from "react-dom";
import "../../index.css";

export const Login = ({ isVisibleLogin, setisVisibleLogin, toggleLogin }) => {
  return ReactDOM.createPortal(
    <>
      <div className={`modal ${isVisibleLogin ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <div className="field">
            <p className="control has-icons-left has-icons-right">
              <input className="input" type="email" placeholder="Email" />
              <span className="icon is-small is-left">
                <i className="fas fa-envelope"></i>
              </span>
              <span className="icon is-small is-right">
                <i className="fas fa-check"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control has-icons-left">
              <input className="input" type="password" placeholder="Password" />
              <span className="icon is-small is-left">
                <i className="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div className="field">
            <p className="control">
              <button className="button is-warning">Login</button>
            </p>
          </div>
        </div>
        <button
          className="modal-close is-large"
          aria-label="close"
          onClick={toggleLogin}
        ></button>
      </div>
    </>,
    document.getElementById("modal")
  );
};
