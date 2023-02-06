import { useFetch } from "../../../hooks/useFetch";

export const useProjectFetch = () => {
  const axiosInstance = useFetch();
  const getAllProjects = () => {
    return axiosInstance.get("api/projects");
  };
  const getAllProjectTypes = () => {
    return axiosInstance.get("api/project-types");
  };

  return { getAllProjects, getAllProjectTypes };
};
