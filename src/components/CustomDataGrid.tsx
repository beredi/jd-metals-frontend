import { DataGrid, GridColumns } from "@mui/x-data-grid";
import { Box, SxProps, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { GridRowsProp } from "@mui/x-data-grid/models/gridRows";
import { Theme } from "@mui/material/styles";
import { useState } from "react";

interface Props {
  columns: GridColumns;
  rows: GridRowsProp;
  customSx?: Object;
  checkboxSelection?: boolean;
  componentsProps?: Object;
  objectSx?: SxProps<Theme>;
  [x: string]: any;
}
export const CustomDataGrid = ({
  rows,
  columns,
  customSx,
  checkbox = false,
  componentsProps,
  objectSx,
  ...props
}: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [pageSize, setPageSize] = useState<number>(10);
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
        "& .MuiCheckbox-root.MuiCheckbox-colorPrimary": {
          color: `${colors.primary[100]} !important`,
        },
        ...customSx,
      }}
    >
      <DataGrid
        rowsPerPageOptions={[5, 10, 20]}
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        density="comfortable"
        rows={rows}
        columns={columns}
        checkboxSelection={checkbox}
        componentsProps={{
          panel: {
            sx: {
              "& .MuiButton-root": {
                color: `${colors.grey[200]} !important`,
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: `${colors.primary[300]} !important`,
              },
            },
          },
          ...componentsProps,
        }}
        sx={{
          "& button.MuiButtonBase-root": {
            color: `${colors.greenAccent[400]} !important`,
          },
          ...objectSx,
        }}
        {...props}
      />
    </Box>
  );
};
