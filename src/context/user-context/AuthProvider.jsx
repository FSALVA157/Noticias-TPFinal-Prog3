import { useReducer, useState } from 'react'
import { AuthContext } from './AuthContext'
import { authReducer } from './authReducer'

const userInitState={    
    logged: false,
    username:'',
    token:null
}

export const AuthProvider = ({children}) => {
    const [authState, dispatch] = useReducer(authReducer, userInitState);

  return (
    <AuthContext.Provider value={{authState, dispatch}}>
      {children}
    </AuthContext.Provider>
  )
}
