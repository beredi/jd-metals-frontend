import { Box } from "@mui/material";
import { Header } from "../../components/Header";
import { useTranslation } from "react-i18next";
import { useSiteConfigContext } from "../../hooks/useSiteConfigContext";

export const Dashboard = () => {
  const { t } = useTranslation();
  const { siteConfig } = useSiteConfigContext();
  let subtitle = siteConfig?.name;
  if (siteConfig && siteConfig.description) {
    subtitle = subtitle + " - " + siteConfig.description;
  }
  return (
    <Box m="20px">
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Header title={t("dashboard")} subtitle={subtitle ?? ""} />
      </Box>
    </Box>
  );
};
