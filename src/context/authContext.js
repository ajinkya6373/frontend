
import { createContext,useContext,useState} from "react";
const AuthContext = createContext();
export const AuthProvider =({children}) =>{
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(JSON.parse(localStorage.getItem("login")));
    const [userProfile, setUserProfile] = useState(JSON.parse(localStorage.getItem("user")));
    const [ loading, setLoading ] = useState(true);
    const [toastMsg, setToastMsg] =useState("")
    const [toastType, setToastType] =useState("")
    return (
        <AuthContext.Provider value={{
            isUserLoggedIn,
            setIsUserLoggedIn,
            userProfile,
            setUserProfile,
            loading, 
            setLoading,
            setToastMsg,
            setToastType,
            toastMsg,
            toastType,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useUserAuth =()=>useContext(AuthContext)
