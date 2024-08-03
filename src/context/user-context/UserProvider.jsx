import React, { useReducer, useState } from 'react'
import { UserContext } from './UserContext'
import { userReducer } from './userReducer'

const userInitState={    
    logged: false,
    username:'Anita@123',
    token:null
}

export const UserProvider = ({children}) => {
    const [authState, dispatch] = useReducer(userReducer, userInitState);

  return (
    <UserContext.Provider value={{authState, dispatch}}>
      {children}
    </UserContext.Provider>
  )
}
