import { useEffect } from "react";
import { useUserAuth, useUserData } from "../context";
import { axiosInstance } from "../utils/utils";
export const useAuthPersist = () => {
  const {
    userProfile,
    isUserLoggedIn,
    setIsUserLoggedIn,
    setUserProfile,
    setLoading,
  } = useUserAuth();

  const { userDispatch } = useUserData();
  useEffect(() => {
    if (isUserLoggedIn && userProfile?._id) {
      (async () => {
        const {
          data: { success, userPosts, timeLine, bookMark },
        } = await axiosInstance.get(`/userData/${userProfile._id}`);
        if (success) {
          userDispatch({
            type: "INITIALIZE_DATA",
            payload: {
              userPosts,
              timeLine,
              bookMark,
            },
          });
        }
      })();
    }
  }, [userProfile]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const login = await JSON.parse(localStorage.getItem("login"));
      const user = await JSON.parse(localStorage.getItem("user"));
      if (login !== undefined && user !== undefined) {
        setIsUserLoggedIn(login);
        setUserProfile(user);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await localStorage.setItem("login", isUserLoggedIn);
      await localStorage.setItem("user", JSON.stringify(userProfile));
      setLoading(false);
    })();
  }, [isUserLoggedIn, userProfile]);
};
