import { LoginForm } from "../types/Login";
import { createContext } from "react";
import { User } from "../types/User";
interface AuthContextProps {
  isAuthenticated: boolean;
  authToken: string | null;
  user: User | null;
  isLoading: boolean;
  loginError: boolean;
  logIn: (loginCredentials: LoginForm) => void;
  logOut: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  authToken: null,
  user: null,
  isLoading: false,
  loginError: false,
  logIn: () => {},
  logOut: () => {},
});
