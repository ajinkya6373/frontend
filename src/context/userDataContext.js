import {createContext,useReducer,useContext}from 'react'
import {userReducer} from "../reducer"

const INITIAL_STATE = {
    timeLine:[],
    userPosts:[],
    bookMark:[]
  };

export const userContext = createContext();

export const UserContextProvider =({children})=> {
    const [userData,userDispatch]= useReducer(userReducer,INITIAL_STATE)
    return (
        <userContext.Provider value={{userData,userDispatch}}>
            {children}
        </userContext.Provider>
    )
}
export const useUserData = ()=> useContext(userContext)