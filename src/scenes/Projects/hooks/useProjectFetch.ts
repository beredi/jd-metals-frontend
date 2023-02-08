import { useFetch } from "../../../hooks/useFetch";
import { ProjectType } from "../types/Project";

export const useProjectFetch = () => {
  const axiosInstance = useFetch();
  const getAllProjects = () => {
    return axiosInstance.get("api/projects");
  };
  const getAllProjectTypes = () => {
    return axiosInstance.get("api/project-types");
  };

  const createProjectType = (projectType: ProjectType) => {
    return axiosInstance.post("api/project-types", projectType);
  };

  const bulkDeleteProjectTypes = (ids: number[]) => {
    return axiosInstance.post("api/project-types/bulkDelete", { ids: ids });
  };

  const updateProjectType = (projectType: ProjectType) => {
    const body = {
      _method: "PUT",
      ...projectType,
    };

    return axiosInstance.post(`api/project-types/${projectType.id}`, body);
  };

  const bulkDeleteProjects = (ids: number[]) => {
    return axiosInstance.post("api/projects/bulkDelete", { ids: ids });
  };

  return {
    getAllProjects,
    getAllProjectTypes,
    bulkDeleteProjects,
    createProjectType,
    bulkDeleteProjectTypes,
    updateProjectType,
  };
};
