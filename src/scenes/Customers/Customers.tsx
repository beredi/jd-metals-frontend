import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { GridColDef, GridSelectionModel } from "@mui/x-data-grid";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { Box, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { CustomDataGrid } from "../../components/CustomDataGrid";
import { Customer } from "./types/Customer";
import {
  Add,
  Edit,
  FactoryOutlined,
  PersonOutlined,
  Remove,
} from "@mui/icons-material";
import { useCustomersFetch } from "./hooks/useCustomersFetch";
import { useNotificationsContext } from "../../hooks/useNotificationsContext";
import {
  CustomGridToolbar,
  CustomMenuItem,
} from "../../components/CustomGridToolbar";
import { AddNewCustomerDialog } from "./components/AddNewCustomerDialog";
import { initialCustomer } from "./types/Customer";
import { useNavigate } from "react-router-dom";

export const Customers = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customers, setCustomers] = useState<Customer[] | undefined>(undefined);
  const { setNotification } = useNotificationsContext();
  const { getAllCustomers, bulkDeleteCustomers } = useCustomersFetch();
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [selectedItems, setSelectedItems] = useState<GridSelectionModel>([]);
  const navigate = useNavigate();

  const loadCustomers = () => {
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
  };

  const deleteCustomers = (ids: number[]) => {
    setIsLoading(true);
    bulkDeleteCustomers(ids)
      .then((response) => {
        if (response.status === 204) {
          setNotification("success", t("bulkDeleteSuccess"));
          loadCustomers();
        } else {
          setNotification("error", t("deleteFailed"));
        }
      })
      .catch((error) => {
        console.log(error);
        setNotification("error", t("deleteFailed"));
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadCustomers();
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

  const menuItems: CustomMenuItem[] = [
    {
      title: t("addNew") ?? "",
      icon: <Add />,
      action: () => setOpenDialog(true),
    },
    {
      separator: true,
    },
    {
      title: t("edit") ?? "",
      icon: <Edit />,
      action: () => setOpenEditDialog(true),
      disabled: selectedItems.length !== 1,
    },
    {
      title: t("deleteSelected") ?? "",
      icon: <Remove />,
      action: () => deleteCustomers(selectedItems as number[]),
      disabled: selectedItems.length === 0,
    },
  ];

  const handleClose = (refresh: boolean) => {
    openEditDialog ? setOpenEditDialog(false) : setOpenDialog(false);
    if (refresh) {
      loadCustomers();
    }
  };

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <>
      <Box m="20px">
        <Header title={t("customers")} subtitle={t("customersSub")} />
        {customers ? (
          <CustomDataGrid
            columns={columns}
            rows={customers}
            checkbox={true}
            components={{
              Toolbar: CustomGridToolbar,
            }}
            componentsProps={{
              toolbar: {
                selectedItems,
                noSelectedActions: true,
                menuItems,
              },
            }}
            onRowDoubleClick={(rowData: Customer) =>
              navigate(`/customers/${rowData.id}`)
            }
            selectionModel={selectedItems}
            onSelectionModelChange={(newItems: GridSelectionModel) => {
              setSelectedItems(newItems);
            }}
          />
        ) : (
          <Typography variant="h3">{t("customersNoLoaded")}</Typography>
        )}
      </Box>
      <AddNewCustomerDialog
        title={t("addNewCustomer")}
        open={openDialog}
        onClose={handleClose}
        customerData={initialCustomer}
      />
      {selectedItems.length === 1 && (
        <AddNewCustomerDialog
          title={t("editCustomer")}
          open={openEditDialog}
          onClose={handleClose}
          customerData={
            customers?.filter(
              (customer) => customer.id === selectedItems[0]
            )[0] ?? initialCustomer
          }
        />
      )}
    </>
  );
};
