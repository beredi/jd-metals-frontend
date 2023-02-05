import { AuthContext } from "./../data/authContext";
import { useContext } from "react";
export const useAuthContext = () => {
  return useContext(AuthContext);
};
