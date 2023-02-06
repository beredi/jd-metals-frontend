import React from "react";
import { Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

type ItemProps = {
  title: string;
  to?: string;
  icon: React.ReactNode;
  selected?: string;
  setSelected?: (selected: string) => void;
  onClick?: () => void;
};
export const NavItem = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  onClick,
}: ItemProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={setSelected ? () => setSelected(title) : onClick}
      icon={icon}
    >
      <Typography>{title}</Typography>
      {to && <Link to={to} />}
    </MenuItem>
  );
};
