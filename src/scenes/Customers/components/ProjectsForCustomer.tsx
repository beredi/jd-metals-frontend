import { CustomDataGrid } from "../../../components/CustomDataGrid";
import { GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useCustomersFetch } from "../hooks/useCustomersFetch";
import { useEffect, useState } from "react";
import { Project } from "../../Projects/types/Project";
import { useNotificationsContext } from "../../../hooks/useNotificationsContext";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { useNavigate } from "react-router-dom";

interface Props {
  customerId: number;
}
export const ProjectsForCustomer = ({ customerId }: Props) => {
  const { getProjectForCustomer } = useCustomersFetch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);
  const { setNotification } = useNotificationsContext();
  const navigate = useNavigate();

  const loadProjects = () => {
    setIsLoading(true);
    getProjectForCustomer(customerId)
      .then((response) => {
        if (response.status === 200) {
          setNotification("success", t("loadSuccess"));
          setProjects(response.data.data as Project[]);
        } else {
          setNotification("error", t("loadFailed"));
        }
      })
      .catch((error) => {
        console.log(error);

        setNotification("error", t("loadFailed"));
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadProjects();
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
        return <Typography>{project_type && project_type.name}</Typography>;
      },
    },
  ];

  return isLoading ? (
    <LoadingIndicator />
  ) : projects ? (
    <Box
      sx={{
        padding: 2,
      }}
    >
      <CustomDataGrid
        columns={columns}
        rows={projects}
        onRowDoubleClick={(rowData: Project) =>
          navigate(`/projects/${rowData.id}`)
        }
      />
    </Box>
  ) : (
    <Typography variant="h3">{t("projectsNoLoaded")}</Typography>
  );
};
