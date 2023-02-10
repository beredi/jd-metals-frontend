import { useCallback, useEffect, useState } from "react";
import { useProjectFetch } from "./hooks/useProjectFetch";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { getProjectForEdit, initialProject, Project } from "./types/Project";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { Box, Tooltip, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { useTranslation } from "react-i18next";
import { CustomDataGrid } from "../../components/CustomDataGrid";
import { useNotificationsContext } from "../../hooks/useNotificationsContext";
import {
  CustomGridToolbar,
  CustomMenuItem,
} from "../../components/CustomGridToolbar";
import { AddNewProjectDialog } from "./components/AddNewProjectDialog";
import { Add, Edit, Remove } from "@mui/icons-material";
import { getCustomerTitleLabel } from "../Customers/types/Customer";
import { useNavigate } from "react-router-dom";

export const Projects = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[] | undefined>(undefined);
  const { setNotification } = useNotificationsContext();
  const { getAllProjects, bulkDeleteProjects } = useProjectFetch();
  const [selectedItems, setSelectedItems] = useState<GridSelectionModel>([]);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const navigate = useNavigate();

  const loadProjects = useCallback(() => {
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
  }, []);

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
  }, [loadProjects]);

  const columns: GridColDef[] = [
    { field: "name", headerName: "NAME", width: 200 },
    {
      field: "description",
      headerName: "DESCRIPTION",
      flex: 1,
      renderCell: ({ row: { description } }) => {
        return (
          <Tooltip title={description}>
            <Typography>{description}</Typography>
          </Tooltip>
        );
      },
    },
    {
      field: "customer",
      headerName: "CUSTOMER",
      width: 300,
      renderCell: ({ row: { customer } }) => {
        return (
          <Typography>{customer && getCustomerTitleLabel(customer)}</Typography>
        );
      },
    },
    {
      field: "planned_start",
      headerName: "PLANNED START",
    },
    {
      field: "planned_end",
      headerName: "PLANNED END",
    },
    {
      field: "real_start",
      headerName: "REAL START",
    },
    {
      field: "real_end",
      headerName: "REAL END",
    },
    {
      field: "project_type",
      headerName: "TYPE",
      renderCell: ({ row: { project_type } }) => {
        return <Typography>{project_type && project_type.name}</Typography>;
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
      title: t("edit") ?? "",
      icon: <Edit />,
      action: () => setOpenEditDialog(true),
      disabled: selectedItems.length !== 1,
    },
    {
      title: "Delete selected",
      icon: <Remove />,
      action: () => deleteProjects(selectedItems as number[]),
      disabled: selectedItems.length === 0,
    },
  ];

  const handleClose = (refresh: boolean) => {
    openEditDialog ? setOpenEditDialog(false) : setOpenDialog(false);
    refresh && loadProjects();
  };

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
          onRowDoubleClick={(rowData: Project) =>
            navigate(`/projects/${rowData.id}`)
          }
        />
      ) : (
        <Typography variant="h3">{t("projectsNoLoaded")}</Typography>
      )}
      <AddNewProjectDialog
        title={t("addNewProject")}
        open={openDialog}
        onClose={handleClose}
        projectData={initialProject}
      />
      {selectedItems.length === 1 && (
        <AddNewProjectDialog
          title={t("editProject")}
          open={openEditDialog}
          onClose={handleClose}
          projectData={
            getProjectForEdit(
              projects?.filter((project) => project.id === selectedItems[0])[0]!
            ) ?? initialProject
          }
        />
      )}
    </Box>
  );
};
