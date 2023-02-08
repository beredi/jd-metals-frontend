import { useEffect, useState } from "react";
import { AuthContext } from "../../data/authContext";
import { LoginForm, LoginResponse } from "../../types/Login";
import { User } from "../../types/User";
import axios from "axios";
import { API_BASE_URL } from "../../config";
import { useNotificationsContext } from "../../hooks/useNotificationsContext";
import { useTranslation } from "react-i18next";

interface AuthProviderProps {
  children: React.ReactNode;
}
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<boolean>(false);
  const { setNotification } = useNotificationsContext();
  const { t } = useTranslation();

  const logIn = (loginCredentials: LoginForm) => {
    setIsLoading(true);
    axios
      .post(`${API_BASE_URL}/api/login`, {
        email: loginCredentials.email,
        password: loginCredentials.password,
      })
      .then((response) => {
        const data = response.data as unknown as LoginResponse;
        if (loginCredentials.remember) {
          localStorage.setItem("jwtToken", data.AccessToken);
          localStorage.setItem("userEmail", data.User.email);
        }
        setIsAuthenticated(true);
        setUser(data.User);
        setAuthToken(data.AccessToken);
        if (loginError) {
          setLoginError(false);
        }
        setNotification("success", t("loggedInSuccess"));
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

  const getUserByEmail = (email: string, token: string) => {
    setIsLoading(true);
    axios
      .post(
        "api/getUserByEmail",
        { email: email },
        {
          baseURL: API_BASE_URL,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const data = response.data.data as unknown as User;
        setUser(data);
      })
      .catch((error) => {
        console.log(error);
        setNotification("error", "Couldn't get user");
      })
      .finally(() => setIsLoading(false));
  };

  const checkLoggedIn = () => {
    const token = localStorage.getItem("jwtToken");
    const email = localStorage.getItem("userEmail");

    if (
      token !== null &&
      token !== undefined &&
      token !== "" &&
      email !== null &&
      email !== undefined &&
      email !== ""
    ) {
      setAuthToken(token);
      setIsAuthenticated(true);
      setNotification("success", t("loggedInSuccess"));
      getUserByEmail(email, token);
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
