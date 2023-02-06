import { ProjectTypes } from "./ProjectTypes";
import { Header } from "../../components/Header";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

export const ProjectConfig = () => {
  const { t } = useTranslation();
  return (
    <Box m="20px">
      <Header title={t("projectConfig")} subtitle={t("projectConfigSub")} />
      <ProjectTypes />
    </Box>
  );
};
