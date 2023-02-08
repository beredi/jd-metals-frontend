import { Button, useTheme } from "@mui/material";
import { tokens } from "../theme";
import React from "react";

interface Props {
  icon?: React.ReactNode;
  title: string;
  onClick: () => void;
}
export const SubmitSuccessButton = ({ title, icon, onClick }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Button
      variant="contained"
      onClick={onClick}
      startIcon={icon ? icon : undefined}
      sx={{
        padding: "10px 15px",
        backgroundColor: `${colors.greenAccent[300]}`,
      }}
    >
      {title}
    </Button>
  );
};
