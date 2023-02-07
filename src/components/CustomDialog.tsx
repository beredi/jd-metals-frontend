import { Box, Button, Dialog, Typography, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";
import { tokens } from "../theme";

interface Props {
  title: string;
  open: boolean;
  children: React.ReactNode;
  setOpen: (newOpen: boolean) => void;
}
export const CustomDialog = ({ children, title, open, setOpen }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Dialog
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      fullWidth={true}
    >
      <Box>
        <Box
          sx={{
            padding: 2,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: `${colors.greenAccent[300]}`,
          }}
        >
          <Typography variant="h4" color={colors.grey[900]}>
            {title}
          </Typography>
          <Button
            onClick={() => setOpen(false)}
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
          }}
        >
          {children}
        </Box>
      </Box>
    </Dialog>
  );
};
