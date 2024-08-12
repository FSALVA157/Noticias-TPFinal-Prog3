import ReactDOM from "react-dom";
import "../../index.css";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/user-context/AuthContext";
import { types } from "../../types/types";
import { Notification } from "../../core/components/Notification";

const initialState = {
  username: "",
  password: "",
}

export const Login = ({ isVisibleLogin, setisVisibleLogin, toggleLogin }) => {
  const [user, setUser] = useState(initialState)
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false)
  const {login} = useContext(AuthContext);

  const base_url = import.meta.env.VITE_API_BASE_URL;

  
//Proceso de Autenticacion
  const fetchLogin = useCallback(
    async() => {
      setisLoading(true);
      try {
        const res = await fetch(`${base_url}/api-auth/`, {
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
        });


        if (!res.ok) {
          const message = `Error al obtener token: ${res.status}`;
          throw new Error(message);
        }
        const data = await res.json();
        const userToken = data.token
        /*console.log(userToken);*/
        //comenzamos a trabajar la peticion que trae los datos del usuario
        
        const res2 = await fetch(`${base_url}/users/profiles/profile_data/`, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${userToken}`
          },
          method: "GET",          
        })

        if(!res2.ok) {  
          const message = `Error al obtener los datos del usuario: ${res2.status}`;
          throw new Error(message);
        }

        const dataUser = await res2.json();
        
        const newAuthState = {
          logged: true,
          username: dataUser.first_name,
          token: userToken,
          idUser: dataUser.user__id
        }
        //accion de login en el contexto
        login({type: types.login, payload: newAuthState})        
        //guardamos el estado de login en el localStorage
        localStorage.setItem("authState", JSON.stringify(newAuthState))


        setSuccess(true);
        setInterval(() => {
          setSuccess(false);
          setisVisibleLogin(false);
        }, 1000);
        
      } catch (error) {
        console.log(error)
      }finally {
        setisLoading(false);
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
    fetchLogin();

  };

  return ReactDOM.createPortal(
    <>
      <div className={`modal ${isVisibleLogin ? "is-active" : ""}`}>
        <div className="modal-background"></div>
        <div className="modal-content">
          {success && <Notification />}
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
                <button className={`button is small is-link is-outlined ${isLoading ? "is-loading" : ""}`}>Login</button>
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
