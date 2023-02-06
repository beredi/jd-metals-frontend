import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

interface Props {
  title: string;
  subtitle?: string;
}

export const SubHeader = ({ title, subtitle }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box sx={{ mb: "30px" }}>
      <Typography
        variant="h4"
        color={colors.grey[100]}
        fontWeight="bold"
        sx={{
          mb: "5px",
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="h6" color={colors.greenAccent[400]}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};
