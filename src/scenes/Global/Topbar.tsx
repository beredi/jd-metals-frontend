import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import {
  PersonOutlined,
  SettingsOutlined,
  LightModeOutlined,
  DarkModeOutlined,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlined />
          ) : (
            <LightModeOutlined />
          )}
        </IconButton>
        <Link to={"/site-config"}>
          <IconButton>
            <SettingsOutlined />
          </IconButton>
        </Link>
        <IconButton>
          <PersonOutlined />
        </IconButton>
      </Box>
    </Box>
  );
};
