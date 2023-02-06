import {
  AdminPanelSettingsOutlined,
  LockOpenOutlined,
  SecurityOutlined,
} from "@mui/icons-material";
import { Box, Typography, useTheme } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { Header } from "../../components/Header";
import { mockDataTeam } from "../../data/mockData";
import { tokens } from "../../theme";
import { CustomDataGrid } from "../../components/CustomDataGrid";

export const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "name",
      headerName: "NAME",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "AGE",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "PHONE NUMBER",
      flex: 1,
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 1,
    },
    {
      field: "access",
      headerName: "ACCESS LEVEL",
      flex: 1,
      renderCell: ({ row: { access } }) => {
        return (
          <Box
            sx={{
              width: "60%",
              m: "0 auto",
              p: "5px",
              display: "flex",
              justifyConent: "center",
              backgroundColor:
                access === "admin"
                  ? colors.greenAccent[600]
                  : colors.greenAccent[700],
              borderRadius: "4px",
            }}
          >
            {access === "admin" && <AdminPanelSettingsOutlined />}
            {access === "manager" && <SecurityOutlined />}
            {access === "user" && <LockOpenOutlined />}
            <Typography
              color={colors.grey[100]}
              sx={{
                ml: "5px",
              }}
            >
              {access}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the team members" />
      <CustomDataGrid
        columns={columns}
        rows={mockDataTeam}
        customSx={{
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
        }}
      />
    </Box>
  );
};
