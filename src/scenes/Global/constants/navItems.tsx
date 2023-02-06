import React from "react";
import {
  CalendarTodayOutlined,
  ContactsOutlined,
  HelpOutlined,
  HomeOutlined,
  ListOutlined,
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
    groupName: "Data",
    showGroupName: true,
    items: [
      {
        title: "Manage Team",
        to: "/team",
        icon: <PeopleOutlined />,
      },
      {
        title: "Contacts Information",
        to: "/contacts",
        icon: <ContactsOutlined />,
      },
      {
        title: "Invoices Balances",
        to: "/invoices",
        icon: <ReceiptOutlined />,
      },
    ],
  },
  {
    groupName: "Pages",
    showGroupName: true,
    items: [
      {
        title: "Profile Form",
        to: "/form",
        icon: <PersonOutlined />,
      },
      {
        title: "Calendar",
        to: "/calendar",
        icon: <CalendarTodayOutlined />,
      },
      {
        title: "FAQ Page",
        to: "/faq",
        icon: <HelpOutlined />,
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
