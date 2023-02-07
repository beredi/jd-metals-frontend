import {
  GridSelectionModel,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { tokens } from "../theme";

export type CustomMenuItem = {
  title?: string;
  icon?: React.ReactNode;
  action?: () => void;
  separator?: boolean;
  disabled?: boolean;
};
interface Props {
  selectedItems: GridSelectionModel;
  noSelectedActions?: boolean;
  menuItems: CustomMenuItem[];
}
export const CustomGridToolbar = ({
  selectedItems,
  noSelectedActions = false,
  menuItems,
}: Props) => {
  const [anchorElMenu, setAnchorElMenu] = useState<HTMLButtonElement | null>(
    null
  );
  const openMenu = Boolean(anchorElMenu);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <GridToolbarContainer>
      <Grid
        sx={{
          "& .Mui-disabled.MuiButton-text": {
            color: `${colors.greenAccent[900]} !important`,
          },
        }}
      >
        <Button
          variant="text"
          size="small"
          disabled={noSelectedActions ? false : selectedItems.length === 0}
          startIcon={<MoreVert />}
          onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
            setAnchorElMenu(event.currentTarget);
          }}
        >
          MENU {selectedItems.length > 0 && `(${selectedItems.length})`}
        </Button>
        <Menu
          id="menu-options"
          anchorEl={anchorElMenu}
          open={openMenu}
          onClose={() => setAnchorElMenu(null)}
        >
          {menuItems.map((menuItem, key) => {
            return menuItem.separator ? (
              <MenuItem key={key}>
                <hr
                  style={{
                    width: "90%",
                    border: `1px solid ${colors.grey[900]}`,
                  }}
                />
              </MenuItem>
            ) : (
              <MenuItem
                key={key}
                onClick={menuItem.action ?? undefined}
                disabled={menuItem.disabled ?? false}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {menuItem.icon ?? ""}
                  {menuItem.title && (
                    <Typography sx={{ marginLeft: 1 }}>
                      {menuItem.title}
                    </Typography>
                  )}
                </Box>
              </MenuItem>
            );
          })}
        </Menu>
      </Grid>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
};
