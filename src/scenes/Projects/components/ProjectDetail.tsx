import { useNavigate, useParams } from "react-router-dom";
import { useProjectFetch } from "../hooks/useProjectFetch";
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { getProjectForEdit, Project } from "../types/Project";
import { useNotificationsContext } from "../../../hooks/useNotificationsContext";
import { DetailMenuItemType } from "../../../components/DetailMenuItem";
import { Edit, Info, Remove } from "@mui/icons-material";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { DetailContainer } from "../../../components/DetailContainer";
import { DetailInfoContainer } from "../../../components/DetailInfoContainer";
import { ProjectDetailInfo } from "./ProjectDetailInfo";
import { Typography } from "@mui/material";
import { DetailBody } from "../../../components/DetailBody";
import { AddNewProjectDialog } from "./AddNewProjectDialog";

export const ProjectDetail = () => {
  const { projectId } = useParams();
  const { getProject, deleteProject } = useProjectFetch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [project, setProject] = useState<Project | null>(null);
  const navigate = useNavigate();
  const [showDetail, setShowDetail] = useState<boolean>(true);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const { setNotification } = useNotificationsContext();

  const loadProject = useCallback(() => {
    if (projectId) {
      setIsLoading(true);

      getProject(parseInt(projectId))
        .then((response) => {
          if (response.status === 200) {
            setProject(response.data.data as Project);
          } else {
            setNotification("error", t("loadFailed"));
          }
        })
        .catch((error) => {
          console.log(error);
          setNotification("error", t("loadFailed"));
        })
        .finally(() => setIsLoading(false));
    }
  }, []);

  useEffect(() => {
    loadProject();
  }, [loadProject]);

  const handleCloseDialog = (refresh: boolean) => {
    setShowDialog(false);
    refresh && loadProject();
  };

  const handleDeleteProject = (projectId: number) => {
    setIsLoading(true);
    deleteProject(projectId)
      .then((response) => {
        if (response.status === 204) {
          setNotification("success", t("deleteSuccess"));
          navigate("/projects");
        } else {
          setNotification("error", t("deleteFailed"));
        }
      })
      .catch((error) => {
        console.log(error);
        setNotification("error", "deleteFailed");
      })
      .finally(() => setIsLoading(false));
  };

  const menuItems: DetailMenuItemType[] = [
    {
      hidden: true,
      text: t("edit"),
      icon: <Edit />,
      onClick: () => setShowDialog(true),
    },
    {
      hidden: true,
      text: t("delete"),
      icon: <Remove />,
      onClick: () => handleDeleteProject(parseInt(projectId!)),
    },
    {
      text: t("showHideDetails") ?? "",
      icon: <Info />,
      onClick: () => setShowDetail((prevState) => !prevState),
    },
  ];

  return isLoading ? (
    <LoadingIndicator />
  ) : project ? (
    <>
      <DetailContainer
        title={`${t("projectDetail")} ${project.name}`}
        subtitle={t("projectInfo")}
      >
        {showDetail && (
          <DetailInfoContainer>
            <ProjectDetailInfo project={project} />
          </DetailInfoContainer>
        )}
        <DetailBody
          showDetail={showDetail}
          customMenuItems={menuItems}
        ></DetailBody>
      </DetailContainer>
      <AddNewProjectDialog
        title={t("editProject")}
        open={showDialog}
        onClose={handleCloseDialog}
        projectData={getProjectForEdit(project)}
      />
    </>
  ) : (
    <Typography variant="h5">{t("noProjectLoaded")}</Typography>
  );
};
