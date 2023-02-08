import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import React from "react";

export type DetailMenuItemType = {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
  hidden?: boolean;
};
interface Props {
  icon: React.ReactNode;
  text: string;
  onClick: () => void;
}
export const DetailMenuItem = ({ icon, text, onClick }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
        backgroundColor: "transparent",
        color: `${colors.greenAccent[100]}`,
        "&:hover": {
          color: `${colors.greenAccent[200]}`,
          backgroundColor: `${colors.greenAccent[800]}`,
          cursor: "pointer",
        },
      }}
      onClick={onClick}
    >
      {icon}
      <Typography
        sx={{
          fontSize: "10px",
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};
