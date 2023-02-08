import { Box, useTheme } from "@mui/material";
import { Header } from "./Header";
import { tokens } from "../theme";

interface Props {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}
export const DetailContainer = ({ title, subtitle, children }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box>
        <Header title={title} subtitle={subtitle} />

        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            backgroundColor: `${colors.greenAccent[900]}`,
            minHeight: "75vh",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
