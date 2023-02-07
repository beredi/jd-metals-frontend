import { useFetch } from "../../../hooks/useFetch";

export const useProjectFetch = () => {
  const axiosInstance = useFetch();
  const getAllProjects = () => {
    return axiosInstance.get("api/projects");
  };
  const getAllProjectTypes = () => {
    return axiosInstance.get("api/project-types");
  };

  const bulkDeleteProjects = (ids: number[]) => {
    return axiosInstance.post("api/projects/bulkDelete", { ids: ids });
  };

  return { getAllProjects, getAllProjectTypes, bulkDeleteProjects };
};
