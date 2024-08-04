import { useReducer, useState } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'
import { types } from '../../types/types'

const userInitState={    
    logged: false,
    username:'',
    token:null
}

export const AuthProvider = ({children}) => {
    const [authState, dispatchAuthState] = useReducer(authReducer, userInitState);

    const login = (objeto) => {
        
        dispatchAuthState(objeto)
    }

  return (
    <AuthContext.Provider value={{authState, login}}>
      {children}
    </AuthContext.Provider>
  )
}
