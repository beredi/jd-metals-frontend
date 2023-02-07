import { Box, Typography } from "@mui/material";
import { SubHeader } from "../../components/SubHeader";
import { useTranslation } from "react-i18next";
import { useProjectFetch } from "./hooks/useProjectFetch";
import { useEffect, useState } from "react";
import { ProjectType } from "./types/Project";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { GridColDef } from "@mui/x-data-grid";
import { CustomDataGrid } from "../../components/CustomDataGrid";
import { useNotificationsContext } from "../../hooks/useNotificationsContext";

export const ProjectTypes = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setNotification } = useNotificationsContext();
  const [projectTypes, setProjectTypes] = useState<ProjectType[] | undefined>(
    undefined
  );
  const { getAllProjectTypes } = useProjectFetch();

  useEffect(() => {
    setIsLoading(true);
    getAllProjectTypes()
      .then((response) => {
        const projectTypes = response.data.data as ProjectType[];
        setProjectTypes(projectTypes);
      })
      .catch((error) => {
        console.log(error);
        setNotification("error", t("loadFailed"));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
    },
  ];

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <Box>
      <SubHeader title={t("projectTypes")} />
      {projectTypes ? (
        <CustomDataGrid columns={columns} rows={projectTypes} checkbox={true} />
      ) : (
        <Typography variant="h3">{t("projectTypesNoLoaded")}</Typography>
      )}
    </Box>
  );
};
