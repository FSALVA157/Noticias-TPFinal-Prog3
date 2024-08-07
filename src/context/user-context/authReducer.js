import { types } from "../../types/types";


export const authReducer = (state={}, action) => {
  switch (action.type) {
    case types.login:        
        return {
            ...state,
            logged:true,
            username: action.payload.username,
            token: action.payload.token
        };
    case types.logout:
        return {
            ...state,
            logged:false,
            username: null,
            token: null,
            idUser: null,
        };
  
    default:
        return state;
  }
}
