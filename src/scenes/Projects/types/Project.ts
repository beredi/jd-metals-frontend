import { Customer } from "../../Customers/types/Customer";

export type Project = {
  id?: number;
  name: string;
  description?: string;
  planned_start?: Date;
  planned_end?: Date;
  real_start?: Date;
  real_end?: Date;
  project_type?: ProjectType;
  customer?: Customer;
};

export type ProjectCreate = {
  id?: number;
  name: string;
  description?: string;
  planned_start?: Date;
  planned_end?: Date;
  real_start?: Date;
  real_end?: Date;
  project_type_id?: number;
  customer_id?: number;
};

export const initialProjectType = {
  name: "",
};

export type ProjectType = {
  id?: number;
  name: string;
};

export const initialProject: ProjectCreate = {
  name: "",
  description: "",
};

export const getProjectForEdit = (project: Project): ProjectCreate => {
  return {
    id: project.id,
    name: project.name,
    description: project.description,
    planned_end: project.planned_end,
    planned_start: project.planned_start,
    real_end: project.real_end,
    real_start: project.real_start,
    customer_id: project.customer?.id,
    project_type_id: project.project_type?.id,
  };
};
