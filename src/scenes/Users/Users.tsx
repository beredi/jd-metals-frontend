import { useEffect, useState } from "react";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import { GridColDef } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import { Header } from "../../components/Header";
import { useTranslation } from "react-i18next";
import { CustomDataGrid } from "../../components/CustomDataGrid";
import { useUserFetch } from "./hooks/useUserFetch";
import { User } from "../../types/User";
import { useNotificationsContext } from "../../hooks/useNotificationsContext";

export const Users = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [users, setUsers] = useState<User[] | undefined>(undefined);
  const { setNotification } = useNotificationsContext();
  const { getAllUsers } = useUserFetch();

  useEffect(() => {
    setIsLoading(true);
    getAllUsers()
      .then((response) => {
        const users = response.data.data as User[];
        setUsers(users);
      })
      .catch((error) => {
        console.log(error);
        setNotification("error", t("loadFailed"));
      })
      .finally(() => setIsLoading(false));
  }, []);

  const columns: GridColDef[] = [
    { field: "name", headerName: "NAME", flex: 1 },
    {
      field: "email",
      headerName: "email",
      flex: 1,
    },
  ];

  return isLoading ? (
    <LoadingIndicator />
  ) : (
    <Box m="20px">
      <Header title={t("projects")} subtitle={t("projectsSubtitle")} />
      {users ? (
        <CustomDataGrid columns={columns} rows={users} checkbox={true} />
      ) : (
        <Typography variant="h3">{t("projectsNoLoaded")}</Typography>
      )}
    </Box>
  );
};
