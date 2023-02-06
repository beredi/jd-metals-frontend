import axios from "axios";
import { API_BASE_URL } from "../config";

export const useFetch = () => {
  const authToken = localStorage.getItem("jwtToken");
  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
};
