import { useEffect, useState } from "react";
import { useProjectFetch } from "./hooks/useProjectFetch";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { Project } from "./types/Project";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { useTranslation } from "react-i18next";
import { CustomDataGrid } from "../../components/CustomDataGrid";
import { useNotificationsContext } from "../../hooks/useNotificationsContext";
import {
  CustomGridToolbar,
  CustomMenuItem,
} from "../../components/CustomGridToolbar";
import { AddNewProjectDialog } from "./components/AddNewProjectDialog";
import { Add, Remove } from "@mui/icons-material";

export const Projects = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);
  const { setNotification } = useNotificationsContext();
  const { getAllProjects, bulkDeleteProjects } = useProjectFetch();
  const [selectedItems, setSelectedItems] = useState<GridSelectionModel>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  const loadProjects = () => {
    setIsLoading(true);
    getAllProjects()
      .then((response) => {
        const projects = response.data.data as Project[];
        setProjects(projects);
      })
      .catch((error) => {
        console.log(error);
        setNotification("error", t("loadFailed"));
      })
      .finally(() => setIsLoading(false));
  };

  const deleteProjects = (ids: number[]) => {
    setIsLoading(true);
    bulkDeleteProjects(ids)
      .then((response) => {
        if (response.status === 204) {
          setNotification("success", t("bulkDeleteSuccess"));
          loadProjects();
        } else {
          setNotification("error", t("deleteFailed"));
        }
      })
      .catch((error) => {
        console.log(error);
        setNotification("error", t("deleteFailed"));
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
        return <Typography>{project_type.name}</Typography>;
      },
    },
  ];

  const menuItems: CustomMenuItem[] = [
    {
      title: t("addNew") ?? "",
      icon: <Add />,
      action: () => setOpenDialog(true),
    },
    {
      separator: true,
    },
    {
      title: "Delete selected",
      icon: <Remove />,
      action: () => deleteProjects(selectedItems as number[]),
      disabled: selectedItems.length === 0,
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
          components={{
            Toolbar: CustomGridToolbar,
          }}
          componentsProps={{
            toolbar: {
              selectedItems,
              noSelectedActions: true,
              menuItems,
            },
          }}
          selectionModel={selectedItems}
          onSelectionModelChange={(newItems: GridSelectionModel) => {
            setSelectedItems(newItems);
          }}
        />
      ) : (
        <Typography variant="h3">{t("projectsNoLoaded")}</Typography>
      )}
      <AddNewProjectDialog
        title={t("addNewProject")}
        open={openDialog}
        onClose={() => {
          setOpenDialog(false);
        }}
      />
    </Box>
  );
};
