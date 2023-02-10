import { useFetch } from "../../../hooks/useFetch";
import { ProjectCreate, ProjectType } from "../types/Project";

export const useProjectFetch = () => {
  const axiosInstance = useFetch();
  const getAllProjects = () => {
    return axiosInstance.get("api/projects");
  };
  const getAllProjectTypes = () => {
    return axiosInstance.get("api/project-types");
  };

  const getProject = (projectId: number) => {
    return axiosInstance.get(`api/projects/${projectId}`);
  };

  const createProject = (project: ProjectCreate) => {
    return axiosInstance.post("api/projects", project);
  };

  const updateProject = (project: ProjectCreate) => {
    const body = {
      _method: "PUT",
      ...project,
    };

    return axiosInstance.post(`api/projects/${project.id}`, body);
  };

  const deleteProject = (projectId: number) => {
    return axiosInstance.post(`api/projects/${projectId}`, {
      _method: "DELETE",
    });
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
    createProject,
    updateProject,
    getProject,
    deleteProject,
  };
};
