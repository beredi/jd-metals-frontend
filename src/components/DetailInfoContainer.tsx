import { Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props {
  children: React.ReactNode;
}
export const DetailInfoContainer = ({ children }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();

  return (
    <Box
      gridColumn={"span 1"}
      sx={{
        backgroundColor: `${colors.greenAccent[800]}`,
        padding: 2,
      }}
    >
      <Typography
        variant="h3"
        color={colors.greenAccent[100]}
        sx={{
          marginBottom: 3,
        }}
      >
        {t("details")}
      </Typography>
      {children}
    </Box>
  );
};
