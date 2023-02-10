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
