import { Box, Typography } from "@mui/material";
import { SubHeader } from "../../components/SubHeader";
import { useTranslation } from "react-i18next";
import { useProjectFetch } from "./hooks/useProjectFetch";
import { useEffect, useState } from "react";
import { initialProjectType, ProjectType } from "./types/Project";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { CustomDataGrid } from "../../components/CustomDataGrid";
import { useNotificationsContext } from "../../hooks/useNotificationsContext";
import {
  CustomGridToolbar,
  CustomMenuItem,
} from "../../components/CustomGridToolbar";
import { Add, Edit, Remove } from "@mui/icons-material";
import { ProjectTypeDialog } from "./components/ProjectTypeDialog";

export const ProjectTypes = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setNotification } = useNotificationsContext();
  const [projectTypes, setProjectTypes] = useState<ProjectType[] | undefined>(
    undefined
  );
  const { getAllProjectTypes, bulkDeleteProjectTypes } = useProjectFetch();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<GridSelectionModel>([]);

  const loadProjectTypes = () => {
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
  };

  useEffect(() => {
    loadProjectTypes();
  }, []);

  const deleteProjectTypes = (ids: number[]) => {
    setIsLoading(true);
    bulkDeleteProjectTypes(ids)
      .then((response) => {
        if (response.status === 204) {
          setNotification("success", t("bulkDeleteSuccess"));
          loadProjectTypes();
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

  const columns: GridColDef[] = [
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
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
      title: t("deleteSelected") ?? "",
      icon: <Remove />,
      action: () => deleteProjectTypes(selectedItems as number[]),
      disabled: selectedItems.length === 0,
    },
  ];

  const handleClose = (refresh: boolean) => {
    openEditDialog ? setOpenEditDialog(false) : setOpenDialog(false);
    refresh && loadProjectTypes();
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <>
      <Box>
        <SubHeader title={t("projectTypes")} />
        {projectTypes ? (
          <CustomDataGrid
            columns={columns}
            rows={projectTypes}
            checkbox={true}
            components={{
              Toolbar: CustomGridToolbar,
            }}
            componentsProps={{
              toolbar: {
                selectedItems,
                menuItems,
                noSelectedActions: true,
              },
            }}
            selectionModel={selectedItems}
            onSelectionModelChange={(newItems: GridSelectionModel) => {
              setSelectedItems(newItems);
            }}
          />
        ) : (
          <Typography variant="h3">{t("projectTypesNoLoaded")}</Typography>
        )}
      </Box>
      <ProjectTypeDialog
        title={t("addNewProjectType")}
        open={openDialog}
        onClose={handleClose}
        projectTypeData={initialProjectType}
      />
      {selectedItems.length === 1 && (
        <ProjectTypeDialog
          title={t("editProjectType")}
          open={openEditDialog}
          onClose={handleClose}
          projectTypeData={
            projectTypes?.filter(
              (projectType) => projectType.id === selectedItems[0]
            )[0] ?? initialProjectType
          }
        />
      )}
    </>
  );
};
