import { Box, CircularProgress, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useTranslation } from "react-i18next";

export const LoadingIndicator = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <CircularProgress />
      <Typography variant="h6" color={colors.grey[400]}>
        {t("loading")}
      </Typography>
    </Box>
  );
};
