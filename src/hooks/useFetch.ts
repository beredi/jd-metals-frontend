import axios from "axios";
import { API_BASE_URL } from "../config";
import { useAuthContext } from "./useAuthContext";

export const useFetch = () => {
  const { authToken } = useAuthContext();
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};
