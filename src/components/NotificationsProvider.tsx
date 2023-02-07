import { NotificationsContext } from "../data/notificationsContext";
import { useEffect, useState } from "react";
import { AlertColor } from "@mui/material";

interface NotificationsProviderProps {
  children: React.ReactNode;
}
export const NotificationsProvider = ({
  children,
}: NotificationsProviderProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [severity, setSeverity] = useState<AlertColor>("info");

  const setNotification = (
    customSeverity: AlertColor,
    customMessage: string
  ) => {
    setSeverity(customSeverity);
    setMessage(customMessage);
  };

  useEffect(() => {
    if (message !== "") {
      setOpen(true);
    }
  }, [message]);

  const handleClose = () => {
    setOpen(false);
    setMessage("");
  };

  return (
    <NotificationsContext.Provider
      value={{ open, message, severity, setNotification, handleClose }}
    >
      {children}
    </NotificationsContext.Provider>
  );
};
