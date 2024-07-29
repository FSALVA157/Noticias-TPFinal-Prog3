import React from "react";
import ReactDOM from "react-dom";

export const Login = ({ isVisibleLogin, setisVisibleLogin, toggleLogin }) => {
  return ReactDOM.createPortal(
    <>
      <div class={`modal ${isVisibleLogin ? "is-active" : ""}`}>
        <div class="modal-background"></div>
        <div class="modal-content">
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
              <button className="button is-success">Login</button>
            </p>
          </div>
        </div>
        <button
          class="modal-close is-large"
          aria-label="close"
          onClick={toggleLogin}
        ></button>
      </div>
    </>,
    document.getElementById("modal")
  );
};
