import { useEffect, useState } from "react";
import { useProjectFetch } from "./hooks/useProjectFetch";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { Project } from "./types/Project";
import { GridColDef, GridToolbar } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { useTranslation } from "react-i18next";
import { CustomDataGrid } from "../../components/CustomDataGrid";

export const Projects = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);
  const { getAllProjects } = useProjectFetch();

  useEffect(() => {
    setIsLoading(true);
    getAllProjects()
      .then((response) => {
        const projects = response.data.data as Project[];
        setProjects(projects);
      })
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  }, []);

  const columns: GridColDef[] = [
    { field: "name", headerName: "NAME", flex: 1 },
    {
      field: "description",
      headerName: "DESCRIPTION",
      flex: 1,
    },
    {
      field: "planned_start",
      headerName: "PLANNED START",
      flex: 1,
    },
    {
      field: "planned_end",
      headerName: "PLANNED END",
      flex: 1,
    },
    {
      field: "real_start",
      headerName: "REAL START",
      flex: 1,
    },
    {
      field: "real_end",
      headerName: "REAL END",
      flex: 1,
    },
    {
      field: "project_type",
      headerName: "TYPE",
      flex: 1,
      renderCell: ({ row: { project_type } }) => {
        return <Typography>{project_type.name}</Typography>;
      },
    },
  ];

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <Box m="20px">
      <Header title={t("projects")} subtitle={t("projectsSubtitle")} />
      {projects ? (
        <CustomDataGrid
          columns={columns}
          rows={projects}
          checkbox={true}
          components={{ Toolbar: GridToolbar }}
        />
      ) : (
        <Typography variant="h3">{t("projectsNoLoaded")}</Typography>
      )}
    </Box>
  );
};
