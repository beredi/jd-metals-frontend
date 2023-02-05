import { useEffect, useState } from "react";
import { AuthContext } from "../../data/authContext";
import { LoginForm, LoginResponse } from "../../types/Login";
import { User } from "../../types/User";
import axios from "axios";
import { API_BASE_URL } from "../../config";

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);

  const logIn = (loginCredentials: LoginForm) => {
    setIsLoading(true);
    axios
      .post(`${API_BASE_URL}/api/login`, {
        email: loginCredentials.email,
        password: loginCredentials.password,
      })
      .then((response) => {
        console.log(response);
        const data = response.data as unknown as LoginResponse;
        if (loginCredentials.remember) {
          localStorage.setItem("jwtToken", data.AccessToken);
          localStorage.setItem("userEmail", data.User.email);
        }
        setIsAuthenticated(true);
        setUser(data.User);
        if (loginError) {
          setLoginError(false);
        }
      })
      .catch((error) => {
        console.log(error);
        setLoginError(true);
      })
      .finally(() => setIsLoading(false));
  };

  const logOut = () => {
    localStorage.removeItem("jwtToken");
    setIsAuthenticated(false);
    setUser(null);
    setAuthToken(null);
  };

  const checkLoggedIn = () => {
    const token = localStorage.getItem("jwtToken");
    if (token !== null && token !== undefined && token !== "") {
      setAuthToken(token);
      setIsAuthenticated(true);
      //TODO: Get user by email
    }
  };

  useEffect(() => {
    checkLoggedIn();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        authToken,
        user,
        isLoading,
        loginError,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
