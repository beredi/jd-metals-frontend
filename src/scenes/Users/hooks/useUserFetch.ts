import { useFetch } from "../../../hooks/useFetch";

export const useUserFetch = () => {
  const axiosInstance = useFetch();
  const getAllUsers = () => {
    return axiosInstance.get("api/users");
  };

  return { getAllUsers };
};
