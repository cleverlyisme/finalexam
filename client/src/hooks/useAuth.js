import { useEffect, useState } from "react";

import { login, checkAuth } from "../services/auth.service";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);

  const checkAuthentication = async () => {
    try {
      const response = await checkAuth();
      const user = response.data.user;

      setUser(user);
    } catch (err) {
      setUser(null);
      localStorage.removeItem("accessToken");
    }
    setIsInitialized(true);
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  const signIn = async (data) => {
    const response = await login(data);

    setUser(response.data.user);
    localStorage.setItem("accessToken", response.data.token);
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
  };

  return { user, setUser, signIn, signOut, isInitialized };
};

export default useAuth;
