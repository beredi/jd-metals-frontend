import { Box, Button, Menu, MenuItem, useTheme } from "@mui/material";
import { DetailMenuItem, DetailMenuItemType } from "./DetailMenuItem";
import { MoreVert } from "@mui/icons-material";
import React, { useState } from "react";
import { tokens } from "../theme";
interface Props {
  menuItems: DetailMenuItemType[];
}
export const DetailMenu = ({ menuItems }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [anchorElMenu, setAnchorElMenu] = useState<HTMLButtonElement | null>(
    null
  );
  const openMenu = Boolean(anchorElMenu);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
      }}
    >
      {menuItems
        .filter((newItem) => newItem.hidden !== true)
        .map((item, key) => {
          return (
            <DetailMenuItem
              key={key}
              icon={item.icon}
              text={item.text}
              onClick={item.onClick}
            />
          );
        })}

      {menuItems.filter((item) => item.hidden === true).length > 0 && (
        <Button
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorElMenu(event.currentTarget);
          }}
          sx={{
            color: `${colors.greenAccent[100]}`,
            backgroundColor: "transparent",
            "&:hover": {
              color: `${colors.greenAccent[200]}`,
              backgroundColor: `${colors.greenAccent[800]}`,
            },
          }}
        >
          <MoreVert />
        </Button>
      )}
      <Menu
        id="menu-options"
        anchorEl={anchorElMenu}
        open={openMenu}
        onClose={() => setAnchorElMenu(null)}
        sx={{
          marginRight: 2,
          "& .MuiMenu-list": {
            backgroundColor: `${colors.grey[900]}`,
          },
          "& .MuiMenu-paper": {
            marginRight: 2,
          },
        }}
      >
        {menuItems
          .filter((newItem) => newItem.hidden === true)
          .map((item, key) => {
            return (
              <MenuItem
                key={key}
                onClick={item.onClick}
                sx={{
                  padding: 2,
                  backgroundColor: `${colors.grey[900]}}`,
                }}
              >
                {item.icon} {item.text}
              </MenuItem>
            );
          })}
      </Menu>
    </Box>
  );
};
