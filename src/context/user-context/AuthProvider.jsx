import { useReducer, useState } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'
import { types } from '../../types/types'

//Estado Inicial de usuario.
const userInitState={    
    logged: false,
    username:'',
    token:null,
    idUser: null,
}

//Funcion que inicializa el estado de autenticacion.
const init = () => {
    return JSON.parse(localStorage.getItem('authState')) || userInitState    
}
export const AuthProvider = ({children}) => {
    const [authState, dispatchAuthState] = useReducer(authReducer, userInitState, init);

    const login = (objeto) => {        
        dispatchAuthState(objeto)
    }
    const logout = () => {
      dispatchAuthState({type: types.logout})
      localStorage.clear();
    }

  return (
    <AuthContext.Provider value={{authState, login, logout}}>
      {children}
    </AuthContext.Provider>
  )
}
