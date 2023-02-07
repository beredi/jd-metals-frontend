import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { GridColDef, GridToolbar } from "@mui/x-data-grid";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { Box, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { CustomDataGrid } from "../../components/CustomDataGrid";
import { Customer } from "../../types/Customer";
import { FactoryOutlined, PersonOutlined } from "@mui/icons-material";
import { useCustomersFetch } from "./hooks/useCustomersFetch";
import { useNotificationsContext } from "../../hooks/useNotificationsContext";

export const Customers = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[] | undefined>(undefined);
  const { setNotification } = useNotificationsContext();
  const { getAllCustomers } = useCustomersFetch();

  useEffect(() => {
    setIsLoading(true);
    getAllCustomers()
      .then((response) => {
        const customers = response.data.data as Customer[];
        setCustomers(customers);
      })
      .catch((error) => {
        console.log(error);
        setNotification("error", t("loadFailed"));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const columns: GridColDef[] = [
    {
      field: "is_company",
      headerName: "Type",
      renderCell: ({ row: { is_company } }) => {
        return is_company ? <FactoryOutlined /> : <PersonOutlined />;
      },
    },
    {
      field: "company_name",
      headerName: "COMPANY NAME",
      flex: 1,
    },
    {
      field: "name",
      headerName: "FULL NAME",
      flex: 1,
      renderCell: ({ row: { name, lastname } }) => {
        return (
          <Typography>
            {name} {lastname}
          </Typography>
        );
      },
    },
    {
      field: "email",
      headerName: "EMAIL",
      flex: 1,
    },
    {
      field: "address",
      headerName: "ADDRESS",
      flex: 1,
    },
    {
      field: "phone",
      headerName: "PHONE",
      flex: 1,
    },
    {
      field: "pib",
      headerName: "PIB",
      flex: 1,
    },
    {
      field: "maticni_broj",
      headerName: "COMPANY NUM",
      flex: 1,
    },
  ];

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <Box m="20px">
      <Header title={t("customers")} subtitle={t("customersSub")} />
      {customers ? (
        <CustomDataGrid
          columns={columns}
          rows={customers}
          checkbox={true}
          components={{ Toolbar: GridToolbar }}
        />
      ) : (
        <Typography variant="h3">{t("customersNoLoaded")}</Typography>
      )}
    </Box>
  );
};
