import React from "react";
import {
  CalendarTodayOutlined,
  ContactsOutlined,
  HelpOutlined,
  HomeOutlined,
  ListOutlined,
  PeopleAltOutlined,
  PeopleOutlined,
  PersonOutlined,
  ReceiptOutlined,
  SettingsOutlined,
} from "@mui/icons-material";

type navItemType = {
  title: string;
  icon: React.ReactNode;
  to?: string;
  onClick?: () => void;
};

type navGroupType = {
  groupName: string;
  showGroupName?: boolean;
  items: navItemType[];
};

export const navItems: navGroupType[] = [
  {
    groupName: "Dashboard",
    items: [
      {
        title: "Dashboard",
        to: "/",
        icon: <HomeOutlined />,
      },
    ],
  },
  {
    groupName: "Projects",
    showGroupName: true,
    items: [
      {
        title: "Projects",
        to: "/projects",
        icon: <ListOutlined />,
      },
      {
        title: "Configuration",
        to: "/project-config",
        icon: <SettingsOutlined />,
      },
    ],
  },
  {
    groupName: "Customers",
    showGroupName: true,
    items: [
      {
        title: "Customers",
        to: "/customers",
        icon: <PeopleAltOutlined />,
      },
    ],
  },
  {
    groupName: "Admin",
    showGroupName: true,
    items: [
      {
        title: "Users",
        to: "/users",
        icon: <PeopleOutlined />,
      },
    ],
  },
];
