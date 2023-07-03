import { useUserAuth, useUserData } from "../context";
import { axiosInstance } from "../utils/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export const useAuth = () => {
  const {
    setLoading,
    setIsUserLoggedIn,
    setUserProfile,
  } = useUserAuth();
  const navigate = useNavigate();
  const { userDispatch } = useUserData();
  const signUpUser = async ({ username, email, password }, redirectPath) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/register", {
        username,
        email,
        password,
      });
      const { success, message, user } = response.data;
      if (success) {
        toast.success(message);
        setIsUserLoggedIn(true);
        setUserProfile(user);
        const path = redirectPath || "/";
        navigate(path);
      } else {
        throw new Error(message);
      }
    } catch (error) {
      toast.error(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };
  
  const logInUser = async ({ email, password }, redirectPath) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post("/auth/login", {
        email,
        password,
      });
  
      const { success, message, user } = response.data;
  
      if (success) {
        setIsUserLoggedIn(true);
        setUserProfile(user);
        toast.success(message);
        const path = redirectPath || "/";
        navigate(path);
      } else {
        throw new Error(message);
      }
    } catch (error) {
      toast.error(error.message);
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };
  

  
  const logUserOut = () => {
    setIsUserLoggedIn(false);
    userDispatch({
      type: "FLUSH_DATA"
    });
    setUserProfile({});
    navigate("/signin");
  };
  return {
    signUpUser,
    logInUser,
    logUserOut
  };
};
