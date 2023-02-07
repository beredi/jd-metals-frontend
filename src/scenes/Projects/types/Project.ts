import { Customer } from "../../../types/Customer";

export type Project = {
  id: number;
  name: string;
  description?: string;
  planned_start?: Date;
  planned_end?: Date;
  real_start?: Date;
  real_end?: Date;
  project_type: ProjectType;
  customer?: Customer;
};
export type ProjectType = {
  name: string;
};