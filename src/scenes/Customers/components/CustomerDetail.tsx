import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import { useCustomersFetch } from "../hooks/useCustomersFetch";
import { useEffect, useState } from "react";
import { Customer } from "../types/Customer";
import { useNotificationsContext } from "../../../hooks/useNotificationsContext";
import { LoadingIndicator } from "../../../components/LoadingIndicator";
import { CustomerDetailInfo } from "./CustomerDetailInfo";
import { DetailContainer } from "../../../components/DetailContainer";
import { DetailInfoContainer } from "../../../components/DetailInfoContainer";
import { DetailBody } from "../../../components/DetailBody";
import { AddNewCustomerDialog } from "./AddNewCustomerDialog";
import { DetailMenuItemType } from "../../../components/DetailMenuItem";
import { Edit, Info, List, Remove } from "@mui/icons-material";
import { ProjectsForCustomer } from "./ProjectsForCustomer";

export const CustomerDetail = () => {
  const { customerId } = useParams();
  const { getCustomer, deleteCustomer } = useCustomersFetch();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer | undefined>(undefined);
  const { setNotification } = useNotificationsContext();
  const [showDetail, setShowDetail] = useState<boolean>(true);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showCustomerProjects, setShowCustomerProjects] =
    useState<boolean>(false);
  const navigate = useNavigate();

  const loadCustomer = () => {
    if (customerId) {
      setIsLoading(true);
      getCustomer(parseInt(customerId))
        .then((response) => {
          if (response.status === 200) {
            setCustomer(response.data.data as Customer);
          } else {
            setNotification("error", t("loadFailed"));
          }
        })
        .catch((error) => {
          console.log(error);
          setNotification("error", t("loadFailed"));
        })
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    loadCustomer();
  }, []);

  const handleCloseDialog = (refresh: boolean) => {
    setShowDialog(false);
    refresh && loadCustomer();
  };

  const handleDeleteCustomer = (customerId: number) => {
    setIsLoading(true);
    deleteCustomer(customerId)
      .then((response) => {
        if (response.status === 204) {
          setNotification("success", t("deleteSuccess"));
          navigate("/customers");
        } else {
          setNotification("error", t("deleteFailed"));
        }
      })
      .catch((error) => {
        console.log(error);
        setNotification("error", "deleteFailed");
      })
      .finally(() => setIsLoading(false));
  };

  const menuItems: DetailMenuItemType[] = [
    {
      hidden: true,
      text: t("edit"),
      icon: <Edit />,
      onClick: () => setShowDialog(true),
    },
    {
      hidden: true,
      text: t("delete"),
      icon: <Remove />,
      onClick: () => handleDeleteCustomer(parseInt(customerId!)),
    },
    {
      text: "Show / Hide Projects",
      icon: <List />,
      onClick: () => setShowCustomerProjects((prevState) => !prevState),
    },
    {
      text: t("showHideDetails") ?? "",
      icon: <Info />,
      onClick: () => setShowDetail((prevState) => !prevState),
    },
  ];

  return isLoading ? (
    <LoadingIndicator />
  ) : customer ? (
    <>
      <DetailContainer
        title={`${t("customerDetail")} ${
          customer.is_company === 1 ? customer.company_name : customer.name
        }`}
        subtitle={t("customerInfo")}
      >
        {showDetail && (
          <DetailInfoContainer>
            <CustomerDetailInfo customer={customer} />
          </DetailInfoContainer>
        )}
        <DetailBody showDetail={showDetail} customMenuItems={menuItems}>
          {showCustomerProjects && (
            <ProjectsForCustomer customerId={customer.id!} />
          )}
        </DetailBody>
      </DetailContainer>
      <AddNewCustomerDialog
        title={t("editCustomer")}
        open={showDialog}
        onClose={handleCloseDialog}
        customerData={customer}
      />
    </>
  ) : (
    <Typography variant="h5">No user found or loading failed.</Typography>
  );
};
