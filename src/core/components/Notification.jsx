import React, { useContext } from "react";
import { AuthContext } from "../../context/user-context/AuthContext";

export const Notification = () => {
  const {authState} = useContext(AuthContext)
  

  return (
    <div className="notification is-info">
      <button className="delete"></button>
      <h1 className="title">Bienvenido {authState.username}!!</h1>
    </div>
  );
};
