import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import React, { useState } from "react";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import { LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import { useAuthContext } from "../../hooks/useAuthContext";
import { navItems } from "./constants/navItems";
import { NavItem } from "./components/NavItem";
import { useSiteConfigContext } from "../../hooks/useSiteConfigContext";

export const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Dashboard");
  const { siteConfig } = useSiteConfigContext();
  const { logOut, user } = useAuthContext();
  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.greenAccent[900]} !important}`,
        },
        "& .pro-sidebar.collapsed": {
          width: "100px !important",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: `${colors.greenAccent[700]} !important`,
        },
        "& .pro-menu-item.active": {
          color: `${colors.greenAccent[600]} !important`,
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlined /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  m1: "15px",
                }}
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  {siteConfig && siteConfig.name}
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlined />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box sx={{ mb: "25px" }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={`../../assets/user.jpg`}
                  alt="user"
                  width="80"
                  height="80"
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign={"center"}>
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{
                    m: "10px 0 0 0",
                  }}
                >
                  {user?.name}
                </Typography>
              </Box>
            </Box>
          )}

          <Box
            sx={{
              paddingLeft: isCollapsed ? undefined : 1,
              paddingRight: isCollapsed ? "10%" : undefined,
            }}
          >
            {navItems.map((item, key) => {
              return (
                <Box key={"group" + key}>
                  {item.showGroupName && (
                    <Typography
                      variant="h6"
                      color={colors.grey[300]}
                      sx={{
                        m: "10px 0 5px 20px",
                      }}
                    >
                      {item.groupName}
                    </Typography>
                  )}
                  {item.items.map((navItem, key) => {
                    return (
                      <NavItem
                        key={"item" + key}
                        title={navItem.title}
                        to={navItem.to ?? undefined}
                        onClick={navItem.onClick ?? undefined}
                        icon={navItem.icon}
                        selected={selected}
                        setSelected={setSelected}
                      />
                    );
                  })}
                </Box>
              );
            })}
            <Box sx={{ marginTop: "25px" }}>
              <NavItem
                title="Logout"
                icon={<LogoutOutlined />}
                onClick={logOut}
              />
            </Box>
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
