import ReactDOM from "react-dom";
import "../../index.css";
import { useCallback, useEffect, useState } from "react";

const initialState = {
  username: "",
  password: "",
}

export const Login = ({ isVisibleLogin, setisVisibleLogin, toggleLogin }) => {
  const [user, setUser] = useState(initialState)
  const [isLoading, setisLoading] = useState(false);
  const base_url = import.meta.env.VITE_API_BASE_URL;
  

  const fetchLogin = useCallback(
    async() => {
      try {
        const res = await fetch(`${base_url}/api-auth/`, {
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });
        console.log("HEY RES",res.ok)

        if (!res.ok) {
          const message = `An error has occured: ${res.status}`;
          throw new Error(message);
        }
        const data = await res.json();
        console.log(data);
        
      } catch (error) {
        console.log(error)
      }
      
    },
    [user],
  )
  

  useEffect(() => {
    
  }, [])
  

const handleChange = (e) => {
  setUser({
    ...user,
    [e.target.name]: e.target.value
  })
}

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user)
    fetchLogin();

  };

  return ReactDOM.createPortal(
    <>
      <div className={`modal ${isVisibleLogin ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input 
                  className="input"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                   />
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
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                />
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
          </form>
        </div>
        <button
          type="submit"
          className="modal-close is-large"
          aria-label="close"
          onClick={toggleLogin}
        ></button>
      </div>
    </>,
    document.getElementById("modal")
  );
};
