import { useFetch } from "../../../hooks/useFetch";

export const useProjectFetch = () => {
  const axiosInstance = useFetch();
  const getAllProjects = () => {
    return axiosInstance.get("api/projects");
  };

  return { getAllProjects };
};
