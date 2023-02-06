import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { GridRowsProp } from "@mui/x-data-grid/models/gridRows";

interface Props {
  columns: GridColumns;
  rows: GridRowsProp;
  customSx?: Object;
}
export const CustomDataGrid = ({ rows, columns, customSx }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box
      sx={{
        m: "40px 0 0 0",
        height: "75vh",
        "& .MuiDataGrid-root": { border: "none" },
        "& .MuiDataGrid-cell": {
          borderBottom: "none",
          color: colors.primary[100],
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: colors.greenAccent[900],
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: colors.greenAccent[800],
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: colors.greenAccent[900],
        },
        ...customSx,
      }}
    >
      <DataGrid rows={rows} columns={columns} />
    </Box>
  );
};
