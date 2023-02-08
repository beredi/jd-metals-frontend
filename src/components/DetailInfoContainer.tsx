import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { Box } from "@mui/material";

interface Props {
  children: React.ReactNode;
}
export const DetailInfoContainer = ({ children }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      gridColumn={"span 1"}
      sx={{
        backgroundColor: `${colors.greenAccent[800]}`,
        padding: 2,
      }}
    >
      {children}
    </Box>
  );
};
