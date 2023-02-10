import { Project } from "../types/Project";
import { DetailItem } from "../../../components/DetailItem";
import { useTranslation } from "react-i18next";
import { customDateFormat } from "../../../helpers/dateFunctions";
import { CustomerDetailInfo } from "../../Customers/components/CustomerDetailInfo";
import { DetailAccordion } from "../../../components/DetailAccordion";

interface Props {
  project: Project;
}

export const ProjectDetailInfo = ({ project }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      {project.id && (
        <DetailItem keyString={"id"} value={project.id?.toString()} />
      )}
      <DetailItem keyString={t("name")!} value={project.name} />
      {project.project_type && (
        <DetailItem
          keyString={t("projectType")!}
          value={project.project_type.name}
        />
      )}
      {project.description && (
        <DetailItem keyString={t("description")!} value={project.description} />
      )}
      {project.planned_start && (
        <DetailItem
          keyString={t("plannedStart")!}
          value={customDateFormat(new Date(project.planned_start))}
        />
      )}
      {project.planned_end && (
        <DetailItem
          keyString={t("plannedEnd")!}
          value={customDateFormat(new Date(project.planned_end))}
        />
      )}
      {project.real_start && (
        <DetailItem
          keyString={t("realStart")!}
          value={customDateFormat(new Date(project.real_start))}
        />
      )}
      {project.real_end && (
        <DetailItem
          keyString={t("realEnd")!}
          value={customDateFormat(new Date(project.real_end))}
        />
      )}
      {project.customer && (
        <DetailAccordion title={t("customer") ?? ""}>
          <CustomerDetailInfo customer={project.customer} />
        </DetailAccordion>
      )}
    </>
  );
};
