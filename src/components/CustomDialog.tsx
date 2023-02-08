import { Box, Button, Dialog, Typography, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import { tokens } from "../theme";

interface Props {
  title: string;
  open: boolean;
  children: React.ReactNode;
  onClose: () => void;
}
export const CustomDialog = ({ children, title, open, onClose }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Dialog open={open} onClose={onClose} fullWidth={true}>
      <Box>
        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: `${colors.greenAccent[500]}`,
          }}
        >
          <Typography variant="h4" color={colors.grey[900]}>
            {title}
          </Typography>
          <Button
            onClick={onClose}
            variant="contained"
            sx={{
              backgroundColor: `${colors.redAccent[500]}`,
              borderRadius: 20,
              padding: 1,
              "&:hover": {
                backgroundColor: `${colors.redAccent[300]}`,
              },
            }}
          >
            <Close />
          </Button>
        </Box>
        <Box
          sx={{
            padding: 2,
            minHeight: "30vh",
            backgroundColor: `${colors.greenAccent[800]}`,
          }}
        >
          {children}
        </Box>
      </Box>
    </Dialog>
  );
};
